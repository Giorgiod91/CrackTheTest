import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return new Response("No signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Webhook error:", error.message);
    } else {
      console.error("Unknown webhook error");
    }
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const email = session.customer_details?.email ?? "unknown";
    const amount = (session.amount_total ?? 0) / 100;

    // Primary: use userId from metadata (set by our checkout API)
    const userId = session.metadata?.userId;

    if (userId) {
      const { error: updateError } = await supabase
        .from("users")
        .update({ premium: true })
        .eq("real_member_id", userId);

      if (updateError) {
        console.error(
          `DB ERROR: Could not activate premium for userId ${userId}`,
          updateError,
        );
      } else {
        console.log(
          `PREMIUM ACTIVATED via userId: ${userId} (${email}) paid $${amount}`,
        );
      }
      return new Response("OK", { status: 200 });
    }

    // Fallback: match by email (legacy / manual payments)
    const { data: user, error } = await supabase
      .from("users")
      .select("email, real_member_id")
      .eq("email", email)
      .single();

    if (error ?? !user) {
      console.log(
        `USER NOT FOUND: No user with email ${email}. Creating new user.`,
      );

      const { error: insertError } = await supabase.from("users").insert({
        email,
        premium: true,
      });

      if (insertError) {
        console.error(
          `DB ERROR: Could not create user for ${email}`,
          insertError,
        );
      }
    } else {
      const { error: updateError } = await supabase
        .from("users")
        .update({ premium: true })
        .eq("real_member_id", user.real_member_id);

      if (updateError) {
        console.error(
          `DB ERROR: Could not activate premium for ${email}`,
          updateError,
        );
      } else {
        console.log(
          `PREMIUM ACTIVATED via email: ${email} (User ID: ${user.real_member_id}) paid $${amount}`,
        );
      }
    }
  }

  // Handle subscription cancellation
  if (
    event.type === "customer.subscription.deleted" ||
    event.type === "customer.subscription.updated"
  ) {
    const subscription = event.data.object as Stripe.Subscription;
    if (
      event.type === "customer.subscription.deleted" ||
      subscription.status === "canceled" ||
      subscription.status === "unpaid"
    ) {
      const customerId =
        typeof subscription.customer === "string"
          ? subscription.customer
          : subscription.customer.id;

      // Look up customer email from Stripe
      const customer = await stripe.customers.retrieve(customerId);
      if (customer.deleted) {
        return new Response("OK", { status: 200 });
      }
      const customerEmail = (customer as Stripe.Customer).email;

      if (customerEmail) {
        await supabase
          .from("users")
          .update({ premium: false })
          .eq("email", customerEmail);
        console.log(`PREMIUM DEACTIVATED: ${customerEmail}`);
      }
    }
  }

  return new Response("OK", { status: 200 });
}
