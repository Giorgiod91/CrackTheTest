"use client";
import React, { useEffect, useState } from "react";
import { Check, Zap, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

const PAKET_FEATURES = [
  "Unbegrenzte KI-generierte Übungstests",
  "ML Schwierigkeitsanalyse",
  "Vollständiges Analytics Dashboard",
  "Tests speichern & verwalten",
  "Sofortige Auswertung & Ergebnisse",
  "Schwierigkeit anpassbar",
  "Priority Support",
];

export default function ManageSubscription() {
  const [isLoading, setIsLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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

  const handleCheckout = async () => {
    const {
      data: { user },
    } = await getSupabaseBrowserClient().auth.getUser();
    if (!user) {
      router.push("/auth/login?redirect=/ManageSubscription");
      return;
    }

    setCheckoutLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: "paket" }),
      });

      // Safe JSON parse — avoids "Unexpected end of JSON input"
      const text = await res.text();
      const data = text
        ? (JSON.parse(text) as { url?: string; error?: string })
        : {};

      if (!res.ok || !data.url)
        throw new Error(data.error ?? "Checkout fehlgeschlagen.");
      window.location.href = data.url;
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Fehler beim Checkout. Bitte versuche es erneut.",
      );
      setCheckoutLoading(false);
    }
  };

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
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <button
            onClick={() => router.push("/PremiumUsers")}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-slate-400 transition hover:border-white/40 hover:text-white"
          >
            ← Zurück zum Dashboard
          </button>
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            Hol dir das Prüfungspaket
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Einmal zahlen, dauerhaft Zugang — kein Abo, keine Kündigung nötig
          </p>
        </div>

        {/* Error */}
        {errorMsg && (
          <div className="mb-8 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center text-red-300">
            {errorMsg}
          </div>
        )}

        {/* One-time purchase card */}
        <div className="relative rounded-2xl border-2 border-orange-400/60 bg-white/10 ring-2 ring-orange-400/30 backdrop-blur-xl">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <div className="rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-4 py-1 text-sm font-semibold text-white shadow-lg">
              ⭐ Einmalzahlung — kein Abo
            </div>
          </div>

          <div className="p-8 pt-12">
            <div className="mb-4 inline-flex rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 p-3 text-white">
              <Zap className="h-6 w-6" />
            </div>

            <h3 className="text-2xl font-bold text-white">Prüfungspaket</h3>
            <p className="mt-2 text-sm text-slate-400">
              Alles, was du für deinen Eignungstest brauchst
            </p>

            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">14,99€</span>
              <span className="text-slate-400">einmalig</span>
            </div>

            <button
              onClick={() => void handleCheckout()}
              disabled={checkoutLoading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {checkoutLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Weiterleitung...
                </>
              ) : (
                "Jetzt freischalten →"
              )}
            </button>

            <div className="mt-8 space-y-4 border-t border-white/10 pt-8">
              {PAKET_FEATURES.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                  <span className="text-sm text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Secure badge */}
        <div className="mt-10 flex items-center justify-center gap-2 text-slate-500">
          <span>🔒</span>
          <span className="text-sm">
            Sichere Zahlung über Stripe · Einmalzahlung · Keine versteckten
            Kosten
          </span>
        </div>

        {/* FAQ */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <h2 className="mb-6 text-2xl font-bold text-white">Häufige Fragen</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold text-white">
                Ist das ein Abo?
              </h3>
              <p className="text-sm text-slate-400">
                Nein. Du zahlst einmalig 14,99€ und behältst dauerhaft Zugang —
                es gibt keine wiederkehrenden Kosten.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-white">
                Welche Zahlungsmethoden gibt es?
              </h3>
              <p className="text-sm text-slate-400">
                Kreditkarte, Debitkarte, Apple Pay, Google Pay und
                SEPA-Lastschrift.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-white">
                Wann wird mein Zugang aktiviert?
              </h3>
              <p className="text-sm text-slate-400">
                Sofort nach erfolgreicher Zahlung — automatisch über Stripe.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-white">
                Kann ich vorher testen?
              </h3>
              <p className="text-sm text-slate-400">
                Ja, mit dem kostenlosen Basiszugang kannst du die Plattform
                ausprobieren, bevor du kaufst.
              </p>
            </div>
          </div>
        </div>

        {/* Legal links */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-slate-500">
          <a href="/agb" className="hover:text-slate-300">
            AGB
          </a>
          <a href="/widerruf" className="hover:text-slate-300">
            Widerrufsbelehrung
          </a>
          <a href="/datenschutz" className="hover:text-slate-300">
            Datenschutz
          </a>
          <a href="/impressum" className="hover:text-slate-300">
            Impressum
          </a>
        </div>
      </div>
    </div>
  );
}
