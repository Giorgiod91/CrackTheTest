import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { createClient } from "@supabase/supabase-js";
import { checkRateLimit, rateLimitResponse } from "@/lib/rate-limit";

interface FeedbackBody {
  category: string;
  rating: number;
  message: string;
}

const VALID_CATEGORIES = ["bug", "feature", "general", "praise"];

export async function POST(req: Request) {
  // ── 1. Auth check ────────────────────────────────────────────────────────
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError ?? !user) {
    return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });
  }

  // ── 2. Rate limit (5 per hour) ────────────────────────────────────────────
  const rl = await checkRateLimit(user.id, "feedback");
  if (!rl.allowed) {
    return rateLimitResponse(rl);
  }

  // ── 3. Validate input ────────────────────────────────────────────────────
  let body: FeedbackBody;
  try {
    body = (await req.json()) as FeedbackBody;
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 400 });
  }

  const { category, rating, message } = body;

  if (!VALID_CATEGORIES.includes(category)) {
    return NextResponse.json(
      { error: "Ungültige Kategorie." },
      { status: 400 },
    );
  }
  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return NextResponse.json(
      { error: "Rating muss zwischen 1 und 5 liegen." },
      { status: 400 },
    );
  }
  if (!message?.trim() || message.length > 2000) {
    return NextResponse.json(
      { error: "Nachricht ist erforderlich (max. 2000 Zeichen)." },
      { status: 400 },
    );
  }

  // ── 4. Insert into Supabase (service role — bypasses RLS) ────────────────
  const adminClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { error: insertError } = await adminClient.from("feedback").insert({
    user_id: user.id,
    category,
    rating,
    message: message.trim(),
  });

  if (insertError) {
    console.error("Feedback insert error:", insertError);
    return NextResponse.json(
      { error: "Feedback konnte nicht gespeichert werden." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
