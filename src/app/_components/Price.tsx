import React from "react";

// price winner color bg-gradient-to-br from-[#FF705B]/10 to-[#FFB457]/10
// price outside bg-[#2B2B3C]

function Price() {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          {" "}
          Wähle deinen Plan
        </h1>
        <p>
          Starte kostenlos und aboniere sobald du auf das neachste lvl kommen
          moechtest
        </p>
      </div>

      {/*price plans kostenlos pro und premoum */}

      <div className="mt-10 flex flex-col items-stretch gap-6 md:flex-row md:items-end md:justify-center">
        {/* Kostenlos Plan */}
        <div className="flex flex-col rounded-2xl border border-white/10 bg-[#2B2B3C] p-6 shadow-lg backdrop-blur-md transition hover:brightness-105 md:w-72">
          <h2 className="mb-2 text-xl font-bold text-white/80">Kostenlos</h2>
          <p className="mb-5 text-sm text-white/50">Ideal zum Ausprobieren</p>
          <div className="mb-5">
            <span className="text-4xl font-extrabold text-white">0€</span>
            <span className="text-sm text-white/50"> / Monat</span>
          </div>
          <ul className="mb-6 space-y-3 text-sm text-white/60">
            <li className="flex items-center gap-2"><span className="text-orange-400">✓</span> Zugang zu Basisfragen</li>
            <li className="flex items-center gap-2"><span className="text-orange-400">✓</span> 5 Tests pro Monat</li>
            <li className="flex items-center gap-2"><span className="text-orange-400">✓</span> Grundlegende Auswertung</li>
          </ul>
          <button className="mt-auto cursor-pointer rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-white/70 transition hover:border-white/40 hover:text-white">
            Loslegen
          </button>
        </div>

        {/* Pro Plan – highlighted */}
        <div className="relative flex flex-col rounded-2xl border-2 border-[#FFB457] bg-gradient-to-b from-[#2B2B3C] to-[#1a1a2e] p-7 shadow-2xl shadow-orange-500/20 ring-1 ring-[#FFB457]/30 backdrop-blur-md transition hover:brightness-105 md:w-80 md:-translate-y-4">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <span className="rounded-full bg-gradient-to-br from-[#FF705B] to-[#FFB457] px-5 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
              ⭐ Beliebteste Wahl
            </span>
          </div>

          <h2 className="mb-2 text-2xl font-extrabold text-white">Pro</h2>
          <p className="mb-5 text-sm text-white/60">Für ambitionierte Lerner</p>
          <div className="mb-5">
            <span className="bg-gradient-to-br from-[#FF705B] to-[#FFB457] bg-clip-text text-5xl font-extrabold text-transparent">9.99€</span>
            <span className="text-sm text-white/50"> / Monat</span>
          </div>
          <ul className="mb-7 space-y-3 text-sm text-white/80">
            <li className="flex items-center gap-2"><span className="text-orange-400 font-bold">✓</span> Alle automatisch generierten Tests</li>
            <li className="flex items-center gap-2"><span className="text-orange-400 font-bold">✓</span> Unbegrenzte Testversuche</li>
            <li className="flex items-center gap-2"><span className="text-orange-400 font-bold">✓</span> Sofortige Auswertung & Ergebnisse</li>
            <li className="flex items-center gap-2"><span className="text-orange-400 font-bold">✓</span> Schwierigkeit anpassbar</li>
          </ul>
          <button className="mt-auto cursor-pointer rounded-full bg-gradient-to-br from-[#FF705B] to-[#FFB457] px-6 py-3 font-bold text-white shadow-lg shadow-orange-500/30 transition hover:scale-105 hover:brightness-110">
            Jetzt Abonnieren
          </button>
        </div>

        {/* Premium Plan */}
        <div className="flex flex-col rounded-2xl border border-white/10 bg-[#2B2B3C] p-6 shadow-lg backdrop-blur-md transition hover:brightness-105 md:w-72">
          <h2 className="mb-2 text-xl font-bold text-white/80">Premium</h2>
          <p className="mb-5 text-sm text-white/50">Für Profis und Teams</p>
          <div className="mb-5">
            <span className="text-4xl font-extrabold text-white">19.99€</span>
            <span className="text-sm text-white/50"> / Monat</span>
          </div>
          <ul className="mb-6 space-y-3 text-sm text-white/60">
            <li className="flex items-center gap-2"><span className="text-orange-400">✓</span> Alle Pro-Funktionen</li>
            <li className="flex items-center gap-2"><span className="text-orange-400">✓</span> Tests für mehrere Nutzer</li>
            <li className="flex items-center gap-2"><span className="text-orange-400">✓</span> Erweiterte Analyse & Statistiken</li>
            <li className="flex items-center gap-2"><span className="text-orange-400">✓</span> Export für Tests und Ergebnisse</li>
          </ul>
          <button className="mt-auto cursor-pointer rounded-full border border-[#FFB457]/40 px-6 py-2.5 text-sm font-semibold text-[#FFB457] transition hover:bg-[#FFB457]/10">
            Jetzt Abonnieren
          </button>
        </div>
      </div>
    </div>
  );
}

export default Price;
