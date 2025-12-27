"use client";
import React from "react";
import { motion } from "framer-motion";

function Price() {
  return (
    <section className="bg-base-100 py-20 sm:py-28" id="price">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            className="text-base-content text-4xl font-extrabold tracking-tight sm:text-5xl"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Wähle deinen{" "}
            <span className="bg-gradient-to-br from-[#FF705B] to-[#FFB457] bg-clip-text text-transparent">
              Plan
            </span>
          </motion.h2>
          <motion.p
            className="mt-6 text-lg text-neutral-600 dark:text-neutral-300"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Starte kostenlos und upgrade sobald du bereit fürs nächste Level
            bist
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 flex flex-col space-y-8 lg:flex-row lg:justify-center lg:space-y-0 lg:space-x-8">
          {/* Kostenlos Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-base-200/40 flex flex-col rounded-2xl border border-white/10 p-6 backdrop-blur lg:w-80"
          >
            <h3 className="text-base-content mb-4 text-2xl font-bold">
              Kostenlos
            </h3>
            <p className="text-base-content/70 mb-6">Ideal zum Ausprobieren</p>
            <div className="mb-6">
              <span className="text-base-content text-4xl font-extrabold">
                0€
              </span>
              <span className="text-base-content/70"> / Monat</span>
            </div>
            <ul className="text-base-content/70 mb-8 space-y-3">
              <li className="flex items-center">
                <svg
                  className="mr-3 h-5 w-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Zugang zu Basisfragen
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-5 w-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                5 Tests pro Monat
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-5 w-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Grundlegende Auswertung
              </li>
            </ul>
            <button className="bg-base-300 text-base-content hover:bg-base-300/80 mt-auto rounded-xl border border-white/10 px-6 py-3 font-semibold transition-colors">
              Loslegen
            </button>
          </motion.div>

          {/* Pro Plan - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative flex scale-105 transform flex-col rounded-2xl border-2 border-[#FF705B] bg-gradient-to-br from-[#FF705B]/10 to-[#FFB457]/10 p-8 shadow-2xl shadow-orange-500/25 backdrop-blur lg:w-96"
          >
            {/* Enhanced Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="flex items-center space-x-2 rounded-full bg-gradient-to-r from-[#FF705B] to-[#FFB457] px-6 py-2 shadow-lg">
                <svg
                  className="h-4 w-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-bold text-white">
                  BELIEBTESTE WAHL
                </span>
              </div>
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-[#FF705B]/20 to-[#FFB457]/20 blur-xl"></div>

            <div className="mt-4">
              <h3 className="text-base-content mb-4 text-3xl font-bold">Pro</h3>
              <p className="text-base-content/70 mb-6">
                Für ambitionierte Lerner
              </p>
              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="bg-gradient-to-br from-[#FF705B] to-[#FFB457] bg-clip-text text-5xl font-extrabold text-transparent">
                    9.99€
                  </span>
                  <span className="text-base-content/70 ml-2">/ Monat</span>
                </div>
                <p className="mt-1 text-sm font-medium text-green-600">
                  ✨ Beste Preis-Leistung
                </p>
              </div>
              <ul className="text-base-content/70 mb-8 space-y-4">
                <li className="flex items-start">
                  <svg
                    className="mt-0.5 mr-3 h-5 w-5 text-[#FF705B]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <strong className="text-base-content">
                      Alle automatisch generierten Tests
                    </strong>
                    <p className="text-sm">
                      Zugang zur kompletten Testbibliothek
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg
                    className="mt-0.5 mr-3 h-5 w-5 text-[#FF705B]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <strong className="text-base-content">
                      Unbegrenzte Tests
                    </strong>
                    <p className="text-sm">So oft üben wie du willst</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg
                    className="mt-0.5 mr-3 h-5 w-5 text-[#FF705B]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <strong className="text-base-content">KI-Auswertung</strong>
                    <p className="text-sm">Sofortige Analyse & Feedback</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg
                    className="mt-0.5 mr-3 h-5 w-5 text-[#FF705B]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <strong className="text-base-content">
                      Anpassbare Schwierigkeit
                    </strong>
                    <p className="text-sm">Tests nach deinem Level</p>
                  </div>
                </li>
              </ul>
              <button className="w-full rounded-xl bg-gradient-to-r from-[#FF705B] to-[#FFB457] px-6 py-4 text-lg font-bold text-white shadow-xl transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/40">
                Jetzt Pro werden 🚀
              </button>
              <p className="text-base-content/60 mt-3 text-center text-xs">
                30 Tage Geld-zurück-Garantie
              </p>
            </div>
          </motion.div>

          {/* Premium Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-base-200/40 flex flex-col rounded-2xl border border-white/10 p-6 backdrop-blur lg:w-80"
          >
            <h3 className="text-base-content mb-4 text-2xl font-bold">
              Premium
            </h3>
            <p className="text-base-content/70 mb-6">Für Profis und Teams</p>
            <div className="mb-6">
              <span className="text-base-content text-4xl font-extrabold">
                19.99€
              </span>
              <span className="text-base-content/70"> / Monat</span>
            </div>
            <ul className="text-base-content/70 mb-8 space-y-3">
              <li className="flex items-center">
                <svg
                  className="mr-3 h-5 w-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Alle Pro-Funktionen
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-5 w-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Multi-User Support
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-5 w-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Erweiterte Analytics
              </li>
              <li className="flex items-center">
                <svg
                  className="mr-3 h-5 w-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Export-Funktionen
              </li>
            </ul>
            <button className="mt-auto rounded-xl bg-gradient-to-r from-[#FF705B] to-[#FFB457] px-6 py-3 font-semibold text-white transition-all hover:brightness-110">
              Premium wählen
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Price;
