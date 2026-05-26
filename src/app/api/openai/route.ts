import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { checkRateLimit, rateLimitResponse } from "@/lib/rate-limit";

interface CreateTestBody {
  title: string;
  content: string;
  subject: string;
  anzahl: number;
}

export async function POST(request: NextRequest) {
  // ── 1. Auth check ────────────────────────────────────────────────────────
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError ?? !user) {
    return NextResponse.json(
      { error: "Nicht eingeloggt. Bitte melde dich an." },
      { status: 401 },
    );
  }

  // ── 2. Premium check ─────────────────────────────────────────────────────
  const { data: dbUser } = await supabase
    .from("users")
    .select("premium")
    .eq("real_member_id", user.id)
    .maybeSingle<{ premium: boolean | null }>();

  if (!dbUser?.premium) {
    return NextResponse.json(
      { error: "Diese Funktion ist nur für Premium-Mitglieder verfügbar." },
      { status: 403 },
    );
  }

  // ── 3. Rate limit ─────────────────────────────────────────────────────────
  const rl = await checkRateLimit(user.id, "openai");
  if (!rl.allowed) {
    return rateLimitResponse(rl);
  }

  // ── 4. Validate input ────────────────────────────────────────────────────
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

  const anzahl = Math.min(Math.max(1, data.anzahl ?? 10), 100);

  // ── 5. Forward to FastAPI backend ────────────────────────────────────────
  try {
    const backendUrl =
      process.env.FASTAPI_BACKEND_URL ?? "http://localhost:8000";

    const response = await fetch(`${backendUrl}/create_test`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        title: data.title,
        content: data.content ?? "",
        subject: data.subject,
        anzahl,
      }),
    });

    if (!response.ok) {
      throw new Error(`FastAPI returned ${response.status}`);
    }

    const result: unknown = await response.json();
    return NextResponse.json(result, {
      headers: {
        "X-RateLimit-Remaining": String(rl.remaining),
        "X-RateLimit-Limit": String(rl.limit),
      },
    });
  } catch (error) {
    console.error("OpenAI/FastAPI error:", error);
    return NextResponse.json(
      { error: "Test konnte nicht erstellt werden. Bitte versuche es später." },
      { status: 500 },
    );
  }
}
