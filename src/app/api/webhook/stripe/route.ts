import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

// Supabase admin client (simple version)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);
// boilerplate to handle stripe webhooks from stripe itself

export async function POST(req: Request) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) return new Response("No signature", { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: any) {
    console.error(" Webhook error:", err?.message);
    return new Response("Invalid signature", { status: 400 });
  }

  // check who bought the plan
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email || "unknown";
    const amount = session.amount_total ? session.amount_total / 100 : 0;

    // Find which user this email belongs to
    const { data: user, error } = await supabase
      .from("users")
      .select("email, real_member_id")
      .eq("email", email)
      .single();
    // If no user found, create one
    if (error || !user) {
      console.log(
        ` USER NOT FOUND: No user with email ${email} found in DB. user will be created now `,
      );
      // here is the supabase insert code function to create a new user i set the email to be the amail obatined from stripe
      const { data: newUser, error: insertError } = await supabase
        .from("users")
        .insert({ email: email, premium: true })
        .select()
        .single();
      if (insertError) {
        console.log(` DB ERROR: Could not create user for ${email}`);
      }
    } else {
      // Email matches - activate premium
      const { error: updateError } = await supabase
        .from("users")
        .update({ premium: true })
        .eq("real_member_id", user.real_member_id);

      if (updateError) {
        console.log(` DB ERROR: Could not activate premium for ${email}`);
      } else {
        console.log(
          ` PREMIUM ACTIVATED: ${email} (User ID: ${user.real_member_id}) paid $${amount}`,
        );
      }
    }
  }

  return new Response("OK", { status: 200 });
}
