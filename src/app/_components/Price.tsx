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

      <div className="mt-8 flex flex-col space-y-8 md:flex-row md:justify-center md:space-y-0 md:space-x-8">
        {/* Kostenlos Plan */}
        <div className="flex flex-col rounded-2xl border border-[#FF705B] bg-[#2B2B3C] p-6 shadow-xl backdrop-blur-md hover:brightness-105 md:w-1/4">
          <h2 className="mb-4 text-2xl font-bold text-white">Kostenlos</h2>
          <p className="mb-6 text-white/70">Ideal zum Ausprobieren</p>
          <div className="mb-6">
            <span className="text-4xl font-extrabold text-white">0€</span>
            <span className="text-white/70"> / Monat</span>
          </div>
          <ul className="mb-6 space-y-4 text-white/70">
            <li>🔹 Zugang zu Basisfragen</li>
            <li>🔹 5 Tests pro Monat</li>
            <li>🔹 Grundlegende Auswertung</li>
          </ul>
          <button className="bg-base-300 mt-auto cursor-pointer rounded-full px-6 py-3 font-semibold text-white hover:brightness-105">
            Loslegen
          </button>
        </div>

        {/* Pro Plan */}
        <div className="relative flex scale-105 flex-col rounded-2xl border-4 border-[#FFB457] bg-[#2B2B3C] p-6 shadow-xl backdrop-blur-md hover:brightness-105 md:w-1/4">
          {/* just learned that u can move the actual starting point with left-1/2 and then center it with translate x*/}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="rounded-full bg-gradient-to-br from-[#FF705B] to-[#FFB457] px-4 py-1 text-sm font-semibold text-white shadow-lg">
              Am häufigsten gekauft
            </span>
          </div>

          <h2 className="mb-4 text-2xl font-bold text-white">Pro</h2>
          <p className="mb-6 text-white/70">Für ambitionierte Lerner</p>
          <div className="mb-6">
            <span className="text-4xl font-extrabold text-white">9.99€</span>
            <span className="text-white/70"> / Monat</span>
          </div>
          <ul className="mb-6 space-y-4 text-white/70">
            <li>🔹 Zugang zu allen automatisch generierten Tests</li>
            <li>🔹 Unbegrenzte Testversuche</li>
            <li>🔹 Sofortige Auswertung & Ergebnisse</li>
            <li>🔹 Test-Schwierigkeit anpassbar</li>
          </ul>
          <button className="mt-auto cursor-pointer rounded-full bg-gradient-to-br from-[#FF705B] to-[#FFB457] px-6 py-3 font-semibold text-white hover:brightness-105">
            Jetzt Abonnieren
          </button>
        </div>

        {/* Premium Plan */}
        <div className="flex flex-col rounded-2xl border border-[#FF705B] bg-[#2B2B3C] p-6 shadow-xl backdrop-blur-md hover:brightness-105 md:w-1/4">
          <h2 className="mb-4 text-2xl font-bold text-white">Premium</h2>
          <p className="mb-6 text-white/70">Für Profis und Teams</p>
          <div className="mb-6">
            <span className="text-4xl font-extrabold text-white">19.99€</span>
            <span className="text-white/70"> / Monat</span>
          </div>
          <ul className="mb-6 space-y-4 text-white/70">
            <li>🔹 Alle Pro-Funktionen</li>
            <li>🔹 Tests für mehrere Nutzer gleichzeitig</li>
            <li>🔹 Erweiterte Analyse & Statistiken</li>
            <li>🔹 Exportfunktion für Tests und Ergebnisse</li>
          </ul>
          <button className="mt-auto cursor-pointer rounded-full bg-gradient-to-br from-[#FF705B] to-[#FFB457] px-6 py-3 font-semibold text-white hover:brightness-105">
            Jetzt Abonnieren
          </button>
        </div>
      </div>
    </div>
  );
}

export default Price;
