import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { checkRateLimit, rateLimitResponse } from "@/lib/rate-limit";

const FREE_TEST_LIMIT = 3;

interface CreateTestBody {
  title: string;
  content: string;
  subject: string;
  anzahl: number;
}

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request: NextRequest) {
  // ── 1. Auth ───────────────────────────────────────────────────────────────
  const supabase = await createSupabaseServerClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError ?? !user) {
    return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });
  }

  // ── 2. Premium or free tier (3 free tests total) ─────────────────────────
  const { data: dbUser } = await supabase
    .from("users").select("premium, free_tests_used")
    .eq("real_member_id", user.id)
    .maybeSingle<{ premium: boolean | null; free_tests_used: number | null }>();

  const isPremium = dbUser?.premium === true;
  const freeUsed = dbUser?.free_tests_used ?? 0;

  if (!isPremium && freeUsed >= FREE_TEST_LIMIT) {
    return NextResponse.json(
      {
        error:
          "Deine 3 kostenlosen Tests sind aufgebraucht. Schalte das Prüfungspaket frei, um unbegrenzt zu üben.",
        code: "FREE_LIMIT_REACHED",
      },
      { status: 403 },
    );
  }

  // ── 3. Rate limit ─────────────────────────────────────────────────────────
  const rl = await checkRateLimit(user.id, "openai");
  if (!rl.allowed) return rateLimitResponse(rl);

  // ── 4. Validate ───────────────────────────────────────────────────────────
  let data: CreateTestBody;
  try {
    data = (await request.json()) as CreateTestBody;
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 400 });
  }

  if (!data.title?.trim() || !data.subject?.trim()) {
    return NextResponse.json(
      { error: "Titel und Fach sind erforderlich." },
      { status: 400 },
    );
  }

  const anzahl = Math.min(Math.max(1, data.anzahl ?? 10), 50);

  // ── 5. Claude API ─────────────────────────────────────────────────────────
  try {
    const prompt = `Du bist ein Experte für Einstellungstests und Eignungsprüfungen.

Erstelle einen professionellen Test mit genau ${anzahl} Fragen.

Test-Titel: ${data.title}
Fach / Thema: ${data.subject}
${data.content ? `Zusätzliche Anforderungen: ${data.content}` : ""}

Format für jede Frage:
**Frage [Nummer]:** [Fragetext]
A) [Antwort A]
B) [Antwort B]
C) [Antwort C]
D) [Antwort D]
✓ Richtige Antwort: [Buchstabe]

Erstelle ${anzahl} abwechslungsreiche, realistische Fragen die einem echten Einstellungstest entsprechen.
Antworte NUR mit den Fragen, keine Einleitung oder Schlusstext.`;

    const message = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 4000,
      messages: [{ role: "user", content: prompt }],
    });

    const testText =
      message.content[0]?.type === "text" ? message.content[0].text : "";

    // Extract individual questions for difficulty prediction
    const questions = testText
      .split(/\*\*Frage \d+:\*\*/)
      .slice(1)
      .map((q) => q.split("\n")[0]?.trim() ?? "")
      .filter(Boolean);

    // Count the free test after successful generation (service role: RLS-safe)
    let freeRemaining: number | null = null;
    if (!isPremium) {
      const admin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
      );
      const { error: countError } = await admin
        .from("users")
        .update({ free_tests_used: freeUsed + 1 })
        .eq("real_member_id", user.id);
      if (countError) {
        console.error("Could not increment free_tests_used:", countError);
      }
      freeRemaining = Math.max(0, FREE_TEST_LIMIT - (freeUsed + 1));
    }

    return NextResponse.json(
      { test_text: testText, questions, free_remaining: freeRemaining },
      {
        headers: {
          "X-RateLimit-Remaining": String(rl.remaining),
          "X-RateLimit-Limit": String(rl.limit),
        },
      },
    );
  } catch (error) {
    console.error("Claude API error:", error);
    return NextResponse.json(
      { error: "Test konnte nicht generiert werden. Prüfe den ANTHROPIC_API_KEY." },
      { status: 500 },
    );
  }
}
