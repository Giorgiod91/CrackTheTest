import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

// Map plan IDs to Stripe Price IDs
// Env vars override hardcoded values (set in Vercel for flexibility)
const PRICE_IDS: Record<string, string | undefined> = {
  starter: process.env.STRIPE_PRICE_STARTER ?? "price_1TbH4QLwhF7s81bJ0tCj6kRS",
  pro:     process.env.STRIPE_PRICE_PRO     ?? "price_1TbH4wLwhF7s81bJzGohnZbW",
  enterprise: process.env.STRIPE_PRICE_ENTERPRISE, // coming soon
};

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const supabase = await createSupabaseServerClient();

  // Verify user is authenticated via cookie session
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError ?? !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as { planId: string };
  const { planId } = body;

  const priceId = PRICE_IDS[planId];
  if (!priceId) {
    return NextResponse.json(
      {
        error: `Price not configured for plan "${planId}". Set STRIPE_PRICE_${planId.toUpperCase()} in your environment variables.`,
      },
      { status: 400 },
    );
  }

  // Get user email from our users table
  const { data: dbUser } = await supabase
    .from("users")
    .select("email")
    .eq("real_member_id", user.id)
    .maybeSingle<{ email: string | null }>();

  const customerEmail = dbUser?.email ?? user.email ?? undefined;
  // Priority: explicit env var → auto Vercel URL → production domain → localhost
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NODE_ENV === "production"
        ? "https://crack-the-test.vercel.app"
        : "http://localhost:3000");

  // Create Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: customerEmail ?? undefined,
    // Pass userId in metadata so webhook can reliably activate premium
    metadata: {
      userId: user.id,
      planId,
    },
    success_url: `${appUrl}/PremiumUsers?checkout=success`,
    cancel_url: `${appUrl}/ManageSubscription?checkout=canceled`,
  });

  return NextResponse.json({ url: session.url });
}
