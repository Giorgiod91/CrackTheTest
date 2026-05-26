"use client";
import React, { useEffect, useState } from "react";
import { Check, Zap, Sparkles, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

// Direct Stripe Payment Links (fallback / quick pay)
const PAYMENT_LINKS: Record<string, string> = {
  starter: "https://buy.stripe.com/6oUaEY3Obckp34dd7U3VC01",
  pro:     "https://buy.stripe.com/bJe6oI1G30BH6gp9VI3VC00",
};

export default function ManageSubscription() {
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");
  const [isLoading, setIsLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");

  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("checkout") === "canceled") {
      setErrorMsg("Checkout abgebrochen. Du kannst jederzeit erneut starten.");
    }
  }, [searchParams]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/auth/login"); return; }

      // Get email for payment link pre-fill
      const { data } = await supabase
        .from("users")
        .select("email")
        .eq("real_member_id", user.id)
        .maybeSingle<{ email: string | null }>();

      setUserEmail(data?.email ?? user.email ?? "");
      setIsLoading(false);
    };
    void checkAuth();
  }, [router, supabase]);

  // Start checkout via our API (passes userId → reliable premium activation)
  const handleCheckout = async (planId: string) => {
    // Guard: ensure user is logged in before calling API
    const { data: { user } } = await getSupabaseBrowserClient().auth.getUser();
    if (!user) {
      router.push("/auth/login?redirect=/ManageSubscription");
      return;
    }

    setCheckoutLoading(planId);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });

      // Safe JSON parse — avoids "Unexpected end of JSON input"
      const text = await res.text();
      const data = text ? (JSON.parse(text) as { url?: string; error?: string }) : {};

      if (!res.ok || !data.url) throw new Error(data.error ?? "Checkout fehlgeschlagen.");
      window.location.href = data.url;
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Fehler. Bitte versuche den direkten Link unten."
      );
      setCheckoutLoading(null);
    }
  };

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "4,99€",
      period: "/Monat",
      description: "Perfekt für den Einstieg",
      features: [
        "30 KI-generierte Tests pro Monat",
        "ML Schwierigkeitsvorhersage",
        "Dashboard & Analytics",
        "Tests speichern & verwalten",
        "Community Support",
      ],
      icon: <Sparkles className="h-6 w-6" />,
      popular: false,
      color: "from-blue-500 to-cyan-500",
      available: true,
    },
    {
      id: "pro",
      name: "Pro",
      price: "9,99€",
      period: "/Monat",
      description: "Beliebteste Wahl",
      features: [
        "100 KI-generierte Tests pro Monat",
        "Erweiterte ML Schwierigkeitsvorhersage",
        "Vollständiges Analytics Dashboard",
        "Priority Support",
        "Export als PDF",
        "Eigene Schwierigkeitsstufen",
      ],
      icon: <Zap className="h-6 w-6" />,
      popular: true,
      color: "from-orange-500 to-pink-500",
      available: true,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="flex items-center gap-3 text-white">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Laden...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <button
            onClick={() => router.push("/PremiumUsers")}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-slate-400 transition hover:border-white/40 hover:text-white"
          >
            ← Zurück zum Dashboard
          </button>
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            Wähle deinen Plan
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Starte noch heute mit KI-gestützter Testerstellung
          </p>
        </div>

        {/* Error */}
        {errorMsg && (
          <div className="mb-8 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center text-red-300">
            {errorMsg}
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => plan.available && setSelectedPlan(plan.id)}
              className={`relative rounded-2xl border transition-all duration-300 ${
                !plan.available
                  ? "cursor-not-allowed border-white/5 bg-white/3 opacity-50"
                  : selectedPlan === plan.id
                    ? "cursor-pointer border-white/40 bg-white/10 ring-2 ring-white/50 backdrop-blur-xl"
                    : "cursor-pointer border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 hover:bg-white/8"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && plan.available && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className={`bg-gradient-to-r ${plan.color} rounded-full px-4 py-1 text-sm font-semibold text-white shadow-lg`}>
                    ⭐ Beliebteste Wahl
                  </div>
                </div>
              )}

              {/* Coming Soon badge */}
              {!plan.available && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold text-white/60">
                    Demnächst
                  </div>
                </div>
              )}

              <div className={`p-8 ${plan.popular ? "pt-12" : plan.available ? "" : "pt-10"}`}>
                {/* Icon */}
                <div className={`mb-4 inline-flex rounded-lg bg-gradient-to-r ${plan.color} p-3 text-white`}>
                  {plan.icon}
                </div>

                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                <p className="mt-2 text-sm text-slate-400">{plan.description}</p>

                {/* Price */}
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="text-slate-400">{plan.period}</span>}
                </div>

                {/* Main CTA */}
                {plan.available ? (
                  <button
                    onClick={(e) => { e.stopPropagation(); void handleCheckout(plan.id); }}
                    disabled={checkoutLoading !== null}
                    className={`mt-6 flex w-full items-center justify-center gap-2 rounded-lg py-3 font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${
                      selectedPlan === plan.id
                        ? `bg-gradient-to-r ${plan.color} text-white shadow-lg hover:shadow-xl`
                        : "border border-white/20 text-white hover:border-white/40 hover:bg-white/5"
                    }`}
                  >
                    {checkoutLoading === plan.id ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Weiterleitung...</>
                    ) : (
                      "Jetzt abonnieren →"
                    )}
                  </button>
                ) : (
                  <button
                    disabled
                    className="mt-6 w-full cursor-not-allowed rounded-lg border border-white/10 py-3 text-sm font-semibold text-white/30"
                  >
                    Bald verfügbar
                  </button>
                )}

                {/* Features */}
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

        {/* Secure badge */}
        <div className="mt-10 flex items-center justify-center gap-2 text-slate-500">
          <span>🔒</span>
          <span className="text-sm">
            Sichere Zahlung über Stripe · Jederzeit kündbar · Keine versteckten Kosten
          </span>
        </div>

        {/* Direct payment links – fallback / alternative */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
          <p className="mb-4 text-sm text-slate-400">
            Direkter Stripe-Link (alternative Zahlungsmethode):
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {Object.entries(PAYMENT_LINKS).map(([planId, link]) => (
              <a
                key={planId}
                href={`${link}?prefilled_email=${encodeURIComponent(userEmail)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
              >
                {planId === "starter" ? "Starter – 4,99€/Mo" : "Pro – 9,99€/Mo"} ↗
              </a>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-600">
            ⚠️ Beim direkten Link bitte dieselbe Email verwenden wie bei der Registrierung: <strong className="text-slate-500">{userEmail}</strong>
          </p>
        </div>

        {/* FAQ */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <h2 className="mb-6 text-2xl font-bold text-white">Häufige Fragen</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold text-white">Kann ich jederzeit kündigen?</h3>
              <p className="text-sm text-slate-400">Ja, jederzeit. Die Kündigung wird zum Ende der Abrechnungsperiode wirksam.</p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-white">Welche Zahlungsmethoden gibt es?</h3>
              <p className="text-sm text-slate-400">Kreditkarte, Debitkarte, Apple Pay, Google Pay und SEPA-Lastschrift.</p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-white">Wann wird mein Premium aktiviert?</h3>
              <p className="text-sm text-slate-400">Sofort nach erfolgreicher Zahlung — automatisch über Stripe Webhook.</p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-white">Gibt es eine kostenlose Testphase?</h3>
              <p className="text-sm text-slate-400">Starte kostenlos mit dem Free-Plan und upgrade wenn du mehr brauchst.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
