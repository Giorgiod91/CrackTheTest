import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

// One-time products (no subscription). Prices in cents (EUR).
const PRODUCTS: Record<string, { name: string; amount: number } | undefined> = {
  paket: {
    name: "AP1 Ready Prüfungspaket – dauerhafter Zugang",
    amount: 1500,
  },
};

export async function POST(req: Request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const supabase = await createSupabaseServerClient();

    // Verify user is authenticated via cookie session
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError ?? !user) {
      return NextResponse.json(
        { error: "Nicht eingeloggt. Bitte zuerst anmelden." },
        { status: 401 },
      );
    }

    // Parse body safely
    let body: { planId: string };
    try {
      body = (await req.json()) as { planId: string };
    } catch {
      return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
    }

    const { planId } = body;
    const product = PRODUCTS[planId];

    if (!product) {
      return NextResponse.json(
        { error: `Kein Preis für Plan "${planId}" konfiguriert.` },
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

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : process.env.NODE_ENV === "production"
          ? "https://crack-the-test.vercel.app"
          : "http://localhost:3000");

    // Create Stripe Checkout Session (one-time payment, no subscription).
    // consent_collection + custom_text: required for German law — the buyer
    // must confirm the early loss of the withdrawal right for digital content.
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: product.amount,
            product_data: { name: product.name },
          },
          quantity: 1,
        },
      ],
      customer_email: customerEmail ?? undefined,
      metadata: { userId: user.id, planId },
      consent_collection: { terms_of_service: "required" },
      custom_text: {
        terms_of_service_acceptance: {
          message: `Ich stimme den [AGB](${appUrl}/agb) zu und verlange ausdrücklich, dass mit der Bereitstellung der digitalen Inhalte sofort begonnen wird. Mir ist bekannt, dass mein [Widerrufsrecht](${appUrl}/widerruf) damit erlischt.`,
        },
      },
      success_url: `${appUrl}/PremiumUsers?checkout=success`,
      cancel_url:  `${appUrl}/ManageSubscription?checkout=canceled`,
    });

    return NextResponse.json({ url: session.url });

  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Checkout fehlgeschlagen. Bitte versuche es erneut." },
      { status: 500 },
    );
  }
}
