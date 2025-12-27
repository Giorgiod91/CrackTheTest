import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

type User = {
  email: string;
  real_member_id: string;
  premium?: boolean;
};

export async function POST(req: Request) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) return new Response("No signature", { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Webhook error:", err.message);
    }
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email ?? "unknown";
    const amount = (session.amount_total ?? 0) / 100;

    const { data: user, error } = await supabase
      .from("users")
      .select("email, real_member_id")
      .eq("email", email)
      .single();

    if (error || !user) {
      console.log(`USER NOT FOUND: Creating user for ${email}`);
      const { data: newUser, error: insertError } = await supabase
        .from("users")
        .insert({ email, premium: true })
        .select()
        .single();

      if (insertError) {
        console.log(`DB ERROR: Could not create user for ${email}`);
      }
    } else {
      const { error: updateError } = await supabase
        .from("users")
        .update({ premium: true })
        .eq("real_member_id", user.real_member_id);

      if (updateError) {
        console.log(`DB ERROR: Could not activate premium for ${email}`);
      } else {
        console.log(
          `PREMIUM ACTIVATED: ${email} (User ID: ${user.real_member_id}) paid $${amount}`,
        );
      }
    }
  }

  return new Response("OK", { status: 200 });
}
