import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { isTopicSlug } from "@/lib/ap1/topics";
import { questionCounts, questionsForTopic } from "~/server/ap1/questions";

// GET /api/ap1/questions            → { premium, counts }
// GET /api/ap1/questions?topic=slug → { premium, questions }  (Prüfungspaket only)
export async function GET(request: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError ?? !user) {
    return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });
  }

  const { data: dbUser } = await supabase
    .from("users").select("premium")
    .eq("real_member_id", user.id)
    .maybeSingle<{ premium: boolean | null }>();
  const premium = dbUser?.premium === true;

  const topic = request.nextUrl.searchParams.get("topic");
  if (!topic) {
    return NextResponse.json({ premium, counts: questionCounts() });
  }

  if (!isTopicSlug(topic)) {
    return NextResponse.json({ error: "Unbekanntes Thema." }, { status: 404 });
  }
  if (!premium) {
    return NextResponse.json(
      { error: "Dieses Thema ist Teil des Prüfungspakets.", code: "PREMIUM_REQUIRED" },
      { status: 403 },
    );
  }

  return NextResponse.json({ premium, questions: questionsForTopic(topic) });
}
