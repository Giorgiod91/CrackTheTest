import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { checkRateLimit, rateLimitResponse } from "@/lib/rate-limit";

interface PredictBody {
  text: string;
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
      { error: "Nicht eingeloggt." },
      { status: 401 },
    );
  }

  // ── 2. Rate limit ─────────────────────────────────────────────────────────
  const rl = await checkRateLimit(user.id, "predict-difficulty");
  if (!rl.allowed) {
    return rateLimitResponse(rl);
  }

  // ── 3. Validate input ────────────────────────────────────────────────────
  let data: PredictBody;
  try {
    data = (await request.json()) as PredictBody;
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 400 });
  }

  if (!data.text?.trim()) {
    return NextResponse.json(
      { error: "Text ist erforderlich." },
      { status: 400 },
    );
  }

  // ── 4. Forward to FastAPI backend ────────────────────────────────────────
  try {
    const backendUrl =
      process.env.FASTAPI_BACKEND_URL ?? "http://localhost:8000";

    const response = await fetch(`${backendUrl}/predict-difficulty`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: data.text }),
    });

    if (!response.ok) {
      throw new Error(`FastAPI returned ${response.status}`);
    }

    const result: unknown = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Predict difficulty error:", error);
    return NextResponse.json(
      { error: "Schwierigkeitsvorhersage fehlgeschlagen." },
      { status: 500 },
    );
  }
}
