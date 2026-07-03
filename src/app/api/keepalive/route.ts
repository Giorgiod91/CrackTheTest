import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Called daily by Vercel Cron to keep the Supabase free-tier project
// from being paused (pauses after 7 days without activity).
export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
    const { error } = await supabase
      .from("users")
      .select("real_member_id")
      .limit(1);

    if (error) throw error;
    return NextResponse.json({ ok: true, pingedAt: new Date().toISOString() });
  } catch (err) {
    console.error("Keepalive ping failed:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
