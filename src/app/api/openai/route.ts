import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { checkRateLimit, rateLimitResponse } from "@/lib/rate-limit";

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

  // ── 2. Prüfungspaket required ────────────────────────────────────────────
  const { data: dbUser } = await supabase
    .from("users").select("premium")
    .eq("real_member_id", user.id)
    .maybeSingle<{ premium: boolean | null }>();

  if (dbUser?.premium !== true) {
    return NextResponse.json(
      { error: "KI-Tests sind Teil des Prüfungspakets.", code: "PREMIUM_REQUIRED" },
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
    const prompt = `Du bist ein erfahrener IHK-Prüfer für die AP1 der Fachinformatiker ("Einrichten eines IT-gestützten Arbeitsplatzes").

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

Erstelle ${anzahl} abwechslungsreiche, realistische Fragen im Stil der AP1: praxisnahe Situationen aus einem IT-Betrieb, gerne mit Rechenaufgaben (z. B. Subnetting, Bezugspreis, Stromkosten, Datenmengen). Bei Rechenaufgaben müssen die vier Antwortoptionen Zahlenwerte sein, genau eine davon korrekt.
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

    return NextResponse.json(
      { test_text: testText, questions },
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
