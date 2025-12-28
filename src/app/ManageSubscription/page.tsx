"use client";
import React, { useEffect, useState } from "react";
import { Check, Zap, Crown, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

export default function ManageSubscription() {
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");
  const [userEmail, setUserEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // initialize supabase client
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      // User is logged in
      await getUserData();
      console.log("User is logged in:", user);
      setIsLoading(false);
    };

    checkAuth();
  }, [router, supabase]);

  // get user data from supabase
  async function getUserData() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("No user logged in");
      return null;
    }

    // also get the user email so i can prefill the stripe checkout
    const { data, error } = await supabase
      .from("users")
      .select("email")
      .eq("real_member_id", user?.id)
      .maybeSingle();
    if (error) {
      console.error("Error fetching user email:", error);
      return null;
    }
    setUserEmail(data?.email ?? "");
    return data;
  }

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "$19.90",
      period: "/month",
      description: "Perfect for getting started",
      features: [
        "10 AI-generated questions/month",
        "Basic difficulty prediction",
        "Simple analytics",
        "Community support",
      ],
      icon: <Sparkles className="h-6 w-6" />,
      popular: false,
      color: "from-blue-500 to-cyan-500",
      href: process.env.NEXT_PUBLIC_STRIPE_BASIC_PLAN,
    },
    {
      id: "pro",
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "Most popular for professionals",
      features: [
        "100 AI-generated questions/month",
        "Advanced difficulty prediction (ML)",
        "Detailed analytics dashboard",
        "Priority support",
        "Export to PDF/Excel",
        "Custom difficulty levels",
      ],
      icon: <Zap className="h-6 w-6" />,
      popular: true,
      color: "from-orange-500 to-pink-500",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "For teams & organizations",
      features: [
        "Unlimited AI-generated questions",
        "Real-time ML difficulty prediction",
        "Advanced analytics & reporting",
        "Dedicated account manager",
        "API access",
        "Custom integrations",
        "Team collaboration features",
      ],
      icon: <Crown className="h-6 w-6" />,
      popular: false,
      color: "from-purple-500 to-pink-500",
    },
  ];

  // Loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            Choose Your Plan
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Select the perfect plan for your AI test generation needs
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative cursor-pointer rounded-2xl border transition-all duration-300 ${
                selectedPlan === plan.id
                  ? "border-white/40 bg-white/10 ring-2 ring-white/50 backdrop-blur-xl"
                  : "border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 hover:bg-white/8"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div
                    className={`bg-gradient-to-r ${plan.color} rounded-full px-4 py-1 text-sm font-semibold text-white shadow-lg`}
                  >
                    Most Popular
                  </div>
                </div>
              )}

              <div className={`p-8 ${plan.popular ? "pt-12" : ""}`}>
                {/* Icon */}
                <div
                  className={`mb-4 inline-flex rounded-lg bg-gradient-to-r ${plan.color} p-3 text-white`}
                >
                  {plan.icon}
                </div>

                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                <p className="mt-2 text-sm text-slate-400">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mt-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="text-slate-400">{plan.period}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  className={`mt-6 w-full rounded-lg py-3 font-semibold transition-all duration-300 ${
                    selectedPlan === plan.id
                      ? `bg-gradient-to-r ${plan.color} text-white shadow-lg hover:shadow-xl`
                      : "border border-white/20 text-white hover:border-white/40 hover:bg-white/5"
                  }`}
                >
                  {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                </button>
                <a
                  href={`${plan.href}?prefilled_email=${encodeURIComponent(userEmail)}`}
                >
                  Quick Buy
                </a>

                {/* Features List */}
                <div className="mt-8 space-y-4 border-t border-white/10 pt-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          {selectedPlan && (
            <div className="mt-12 text-center">
              <h2 className="text-2xl font-bold text-white">
                You have selected the {selectedPlan} plan.
              </h2>
              <p className="mt-4 text-slate-400">
                Click the button below to proceed to checkout.
              </p>
              <a
                href={`${plans.find((plan) => plan.id === selectedPlan)?.href}?prefilled_email=${encodeURIComponent(userEmail)}`}
                className="mt-6 inline-block rounded-lg bg-gradient-to-r from-green-400 to-blue-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl"
                onClick={() => {
                  alert(
                    `⚠️ WICHTIG: Benutze EXAKT diese Email beim Checkout: ${userEmail}\n\nNur so wird dein Account automatisch freigeschaltet!`,
                  );
                }}
              >
                Proceed to Checkout
              </a>
              <p className="mt-3 text-sm text-yellow-400">
                ⚠️ Benutze EXAKT die Email: <strong>{userEmail}</strong>
              </p>
            </div>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <h2 className="mb-6 text-2xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold text-white">
                Can I change plans anytime?
              </h3>
              <p className="text-sm text-slate-400">
                Yes! You can upgrade or downgrade your plan at any time. Changes
                take effect on your next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-white">
                Is there a free trial?
              </h3>
              <p className="text-sm text-slate-400">
                Contact our sales team for a 14-day free trial of any plan.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-white">
                What payment methods do you accept?
              </h3>
              <p className="text-sm text-slate-400">
                We accept all major credit cards, PayPal, and bank transfers for
                enterprise plans.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-white">
                Do you offer annual billing?
              </h3>
              <p className="text-sm text-slate-400">
                Yes! Save 20% with annual billing. Contact our team for details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
