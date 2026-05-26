"use client";
import React, { useEffect, useState } from "react";
import { Check, Zap, Crown, Sparkles, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

export default function ManageSubscription() {
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");
  const [isLoading, setIsLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check for redirect back from Stripe
  useEffect(() => {
    const checkout = searchParams.get("checkout");
    if (checkout === "canceled") {
      setErrorMsg("Checkout wurde abgebrochen. Du kannst jederzeit erneut abonnieren.");
    }
  }, [searchParams]);

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
      setIsLoading(false);
    };

    void checkAuth();
  }, [router, supabase]);

  // Start Stripe checkout via our API
  const handleCheckout = async (planId: string) => {
    setCheckoutLoading(planId);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });

      const data = (await res.json()) as { url?: string; error?: string };

      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Checkout konnte nicht gestartet werden");
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Ein Fehler ist aufgetreten. Bitte versuche es erneut.",
      );
      setCheckoutLoading(null);
    }
  };

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "9,99€",
      period: "/Monat",
      description: "Perfekt für den Einstieg",
      features: [
        "10 KI-generierte Tests/Monat",
        "Basis Schwierigkeitsvorhersage",
        "Einfache Auswertung",
        "Community Support",
      ],
      icon: <Sparkles className="h-6 w-6" />,
      popular: false,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "pro",
      name: "Pro",
      price: "19,99€",
      period: "/Monat",
      description: "Beliebteste Wahl für Professionals",
      features: [
        "100 KI-generierte Tests/Monat",
        "Erweiterte ML Schwierigkeitsvorhersage",
        "Detailliertes Analytics Dashboard",
        "Priority Support",
        "Export als PDF/Excel",
        "Eigene Schwierigkeitsstufen",
      ],
      icon: <Zap className="h-6 w-6" />,
      popular: true,
      color: "from-orange-500 to-pink-500",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "49,99€",
      period: "/Monat",
      description: "Für Teams & Organisationen",
      features: [
        "Unbegrenzte KI-Tests",
        "Echtzeit ML Schwierigkeitsvorhersage",
        "Erweitertes Analytics & Reporting",
        "Dedicated Account Manager",
        "API Zugang",
        "Custom Integrationen",
        "Team Kollaboration",
      ],
      icon: <Crown className="h-6 w-6" />,
      popular: false,
      color: "from-purple-500 to-pink-500",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
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

        {/* Error / Success Messages */}
        {errorMsg && (
          <div className="mb-8 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center text-red-300">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="mb-8 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-center text-green-300">
            {successMsg}
          </div>
        )}

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
                    ⭐ Beliebteste Wahl
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
                  onClick={(e) => {
                    e.stopPropagation();
                    void handleCheckout(plan.id);
                  }}
                  disabled={checkoutLoading !== null}
                  className={`mt-6 flex w-full items-center justify-center gap-2 rounded-lg py-3 font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${
                    selectedPlan === plan.id
                      ? `bg-gradient-to-r ${plan.color} text-white shadow-lg hover:shadow-xl`
                      : "border border-white/20 text-white hover:border-white/40 hover:bg-white/5"
                  }`}
                >
                  {checkoutLoading === plan.id ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Weiterleitung...
                    </>
                  ) : (
                    "Jetzt abonnieren →"
                  )}
                </button>

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

        {/* Secure checkout badge */}
        <div className="mt-12 flex items-center justify-center gap-3 text-slate-500">
          <span>🔒</span>
          <span className="text-sm">
            Sichere Zahlung über Stripe · Jederzeit kündbar · Keine versteckten Kosten
          </span>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <h2 className="mb-6 text-2xl font-bold text-white">
            Häufige Fragen
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold text-white">
                Kann ich den Plan wechseln?
              </h3>
              <p className="text-sm text-slate-400">
                Ja! Du kannst jederzeit upgraden oder downgraden. Änderungen
                werden im nächsten Abrechnungszeitraum wirksam.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-white">
                Gibt es eine kostenlose Testphase?
              </h3>
              <p className="text-sm text-slate-400">
                Starte kostenlos mit dem Free-Plan und upgrade wenn du mehr
                Features benötigst.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-white">
                Welche Zahlungsmethoden werden akzeptiert?
              </h3>
              <p className="text-sm text-slate-400">
                Kreditkarte, Debitkarte und alle von Stripe unterstützten
                Zahlungsmethoden.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-white">
                Wie kündige ich?
              </h3>
              <p className="text-sm text-slate-400">
                Einfach im Dashboard unter &quot;Subscription verwalten&quot;
                kündigen. Kein versteckter Prozess.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
