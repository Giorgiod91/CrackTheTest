"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { PRICE_LABEL } from "@/lib/ap1/topics";

function Price() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Weniger als eine Nachhilfestunde
        </h2>
        <p className="mt-3 text-white/60">
          Ein Preis, alles drin. Kein Abo, keine Kündigung.
        </p>
      </div>

      <div className="mt-10 flex flex-col items-stretch gap-6 md:flex-row md:justify-center">
        {/* Prüfungspaket – highlighted */}
        <div className="relative flex flex-col rounded-2xl border-2 border-[#FFB457] bg-gradient-to-b from-[#2B2B3C] to-[#1a1a2e] p-7 shadow-2xl ring-1 shadow-orange-500/20 ring-[#FFB457]/30 backdrop-blur-md transition hover:brightness-105 md:w-96">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <span className="rounded-full bg-gradient-to-br from-[#FF705B] to-[#FFB457] px-5 py-1.5 text-xs font-bold tracking-wide break-keep whitespace-nowrap text-white uppercase shadow-lg">
              ⭐ Einmalzahlung — kein Abo
            </span>
          </div>

          <h2 className="mb-2 text-2xl font-extrabold text-white">
            Prüfungspaket
          </h2>
          <p className="mb-5 text-sm text-white/60">
            Alles für deine AP1
          </p>
          <div className="mb-5">
            <span className="bg-gradient-to-br from-[#FF705B] to-[#FFB457] bg-clip-text text-5xl font-extrabold text-transparent">
              {PRICE_LABEL}
            </span>
            <span className="text-sm text-white/50"> einmalig</span>
          </div>
          <ul className="mb-7 space-y-3 text-sm text-white/80">
            <li className="flex items-center gap-2">
              <span className="font-bold text-orange-400">✓</span> Alle 9
              AP1-Themen mit Prüfungstipps
            </li>
            <li className="flex items-center gap-2">
              <span className="font-bold text-orange-400">✓</span> Unbegrenzte
              90-Min-Prüfungssimulationen
            </li>
            <li className="flex items-center gap-2">
              <span className="font-bold text-orange-400">✓</span> Notenprognose
              nach IHK-Schlüssel
            </li>
            <li className="flex items-center gap-2">
              <span className="font-bold text-orange-400">✓</span> Fortschritt
              &amp; Prüfungscountdown
            </li>
            <li className="flex items-center gap-2">
              <span className="font-bold text-orange-400">✓</span> Unbegrenzte
              KI-Zusatzaufgaben
            </li>
            <li className="flex items-center gap-2">
              <span className="font-bold text-orange-400">✓</span> Dauerhafter
              Zugang, kein Abo
            </li>
          </ul>
          <button
            onClick={() => router.push("/ManageSubscription")}
            className="mt-auto cursor-pointer rounded-full bg-gradient-to-br from-[#FF705B] to-[#FFB457] px-6 py-3 font-bold text-white shadow-lg shadow-orange-500/30 transition hover:scale-105 hover:brightness-110"
          >
            Jetzt freischalten →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Price;
