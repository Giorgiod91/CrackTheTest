"use client";
export const dynamic = "force-dynamic";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { CheckCircle2, Loader2 } from "lucide-react";
import Ap1Dashboard from "../_components/Ap1Dashboard";
import FeedbackWidget from "../_components/FeedbackWidget";
import ConsentBanner from "../_components/ConsentBanner";
import { PRICE_LABEL } from "@/lib/ap1/topics";

export default function PremiumPage() {
  const [authChecked, setAuthChecked] = useState(false);
  const [isPremium,   setIsPremium]   = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const supabase     = getSupabaseBrowserClient();
  const router       = useRouter();
  const searchParams = useSearchParams();

  // Show success banner after Stripe redirect
  useEffect(() => {
    if (searchParams.get("checkout") === "success") {
      setShowSuccess(true);
      const t = setTimeout(() => setShowSuccess(false), 8000);
      return () => clearTimeout(t);
    }
  }, [searchParams]);

  // Auth + premium check. Right after a Stripe checkout the webhook may still
  // be on its way, so retry for a few seconds before showing the paywall.
  useEffect(() => {
    let cancelled = false;
    const justPaid = searchParams.get("checkout") === "success";
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/auth/login"); return; }

      for (let attempt = 0; attempt < (justPaid ? 8 : 1); attempt++) {
        if (attempt > 0) await new Promise((r) => setTimeout(r, 2000));
        const { data } = await supabase
          .from("users")
          .select("premium")
          .eq("real_member_id", user.id)
          .maybeSingle<{ premium: boolean | null }>();
        if (cancelled) return;
        if (data?.premium === true) { setIsPremium(true); break; }
      }
      setAuthChecked(true);
    };
    void check();
    return () => { cancelled = true; };
  }, [supabase, router, searchParams]);

  // Loading
  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1a1835]">
        <div className="flex items-center gap-3 text-white/50">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm">Laden…</span>
        </div>
      </div>
    );
  }

  // Paywall: everything is part of the Prüfungspaket
  if (!isPremium) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1a1835] p-6">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#12112a] p-10 text-center shadow-2xl">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF705B] to-[#FFB457] shadow-xl shadow-orange-500/30">
            <span className="text-2xl">🔒</span>
          </div>
          <h1 className="mb-2 bg-gradient-to-r from-[#FF705B] to-[#FFB457] bg-clip-text text-2xl font-bold text-transparent">
            Schalte AP1 Ready frei
          </h1>
          <p className="mb-6 text-sm leading-relaxed text-white/50">
            Einmal {PRICE_LABEL}, danach hast du dauerhaft Zugang zu allem, was du für die AP1 brauchst.
          </p>
          <ul className="mb-8 space-y-2 text-left text-sm text-white/70">
            <li>✓ Alle 9 AP1-Themen mit Rechenwegen und Prüfungstipps</li>
            <li>✓ Unbegrenzte 90-Minuten-Prüfungssimulationen</li>
            <li>✓ Fortschritt pro Thema und Notenprognose</li>
            <li>✓ Unbegrenzte KI-Zusatzaufgaben</li>
          </ul>
          <button
            onClick={() => router.push("/ManageSubscription")}
            className="w-full rounded-2xl bg-gradient-to-r from-[#FF705B] to-[#FFB457] py-3.5 font-bold text-white shadow-lg shadow-orange-500/25 transition hover:brightness-110"
          >
            Jetzt freischalten · {PRICE_LABEL} einmalig
          </button>
          <button
            onClick={() => router.push("/")}
            className="mt-3 w-full rounded-2xl border border-white/10 py-3 text-sm text-white/40 transition hover:bg-white/5"
          >
            ← Zurück zur Startseite
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#1a1835]">
      <ConsentBanner />

      {/* Stripe success banner */}
      {showSuccess && (
        <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          🎉 Zahlung erfolgreich! Dein Prüfungspaket ist freigeschaltet.
        </div>
      )}

      {/* Full-screen dashboard */}
      <div className="flex-1">
        <Ap1Dashboard isPremium={isPremium} />
      </div>

      {/* Feedback widget */}
      <FeedbackWidget />
    </div>
  );
}
