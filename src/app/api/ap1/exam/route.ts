import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { buildExam } from "~/server/ap1/exam";

// GET /api/ap1/exam → a fresh 90-minute AP1 simulation (Prüfungspaket only)
export async function GET() {
  const supabase = await createSupabaseServerClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError ?? !user) {
    return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });
  }

  const { data: dbUser } = await supabase
    .from("users").select("premium")
    .eq("real_member_id", user.id)
    .maybeSingle<{ premium: boolean | null }>();

  if (dbUser?.premium !== true) {
    return NextResponse.json(
      { error: "Die Prüfungssimulation ist Teil des Prüfungspakets.", code: "PREMIUM_REQUIRED" },
      { status: 403 },
    );
  }

  return NextResponse.json(buildExam());
}
