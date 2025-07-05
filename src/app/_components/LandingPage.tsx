"use client";
import React from "react";
import { motion } from "framer-motion";
import { CardStackDemo } from "./CardStacks";
import { array } from "zod";

type Props = {};
const Cards = [
  {
    logo: "📊",
    Heading: "Testanalyse in Sekunden",
    Text: "Unsere KI erkennt Muster und Schwächen sofort – bereit zur Optimierung.",
  },
  {
    logo: "🧠",
    Heading: "Intelligente Fragensets",
    Text: "Erstelle passgenaue Tests basierend auf Thema, Niveau und Zielgruppe.",
  },
  {
    logo: "🚀",
    Heading: "Schnell & Skalierbar",
    Text: "Ob Einzelperson oder 1000 Mitarbeiter – dein Test ist in Sekunden fertig.",
  },
  {
    logo: "🛠️",
    Heading: "Anpassbar auf dein Ziel",
    Text: "Wähle Schwierigkeit, Kategorie und Dauer – die KI erstellt passende Tests.",
  },
];
// splitting the array cause i want them to animate seperate
const firstHalf = Cards.slice(0, Math.ceil(Cards.length / 2));
const secondHalf = Cards.slice(Math.ceil(Cards.length / 2));

function LandingPage({}: Props) {
  return (
    <section className="bg-base-100 py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:items-center lg:gap-24 lg:px-8">
        {/* Left Content */}
        <div className="space-y-6">
          <motion.h1
            className="text-base-content text-5xl leading-tight font-extrabold tracking-tight sm:text-6xl"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Crack
            <span className="bg-gradient-to-br from-[#FF705B] to-[#FFB457] bg-clip-text text-transparent">
              {" "}
              The Test{" "}
            </span>{" "}
            mit AI Präzision 🧠
          </motion.h1>

          <motion.p
            className="max-w-xl text-lg text-neutral-600 dark:text-neutral-300"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Mit <strong>CrackTheTest.ai</strong> erstellst du Tests automatisch
            – ideal für Unternehmen, Bildungseinrichtungen und
            Eignungsprüfungen. Spare Zeit und gewinne Erkenntnisse mit KI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href="#get-started"
              className="btn bg-gradient-to-br from-[#FF705B] to-[#FFB457] px-6 py-3 text-lg font-semibold transition-transform duration-200 hover:scale-105 hover:brightness-110"
            >
              Jetzt starten 🚀
            </a>
          </motion.div>
        </div>

        {/* Right side component */}
        <motion.div
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <CardStackDemo />
        </motion.div>
      </div>
      {/* made another section with a grid */}
      <div className="mt-16 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {firstHalf.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            key={index}
            className="flex flex-col rounded-2xl border border-white/10 bg-gradient-to-br from-[#FF705B]/10 to-[#FFB457]/10 p-6 shadow-lg backdrop-blur-md transition hover:border-black/80 hover:shadow-xl hover:shadow-orange-300/40 dark:shadow-indigo-700/20"
          >
            <div className="text-primary mb-3 text-3xl font-bold">
              {item.logo}
            </div>
            <h3 className="text-base-content text-lg font-semibold">
              {item.Heading}
            </h3>
            <p className="text-base-content/70 mt-2 text-sm">{item.Text}</p>
          </motion.div>
        ))}

        {secondHalf.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            key={index}
            className="flex flex-col rounded-2xl border border-white/10 bg-gradient-to-br from-[#FF705B]/10 to-[#FFB457]/10 p-6 shadow-lg backdrop-blur-md transition hover:border-black/80 hover:shadow-xl hover:shadow-orange-300/40 dark:shadow-indigo-700/20"
          >
            <div className="text-primary mb-3 text-3xl font-bold">
              {item.logo}
            </div>
            <h3 className="text-base-content text-lg font-semibold">
              {item.Heading}
            </h3>
            <p className="text-base-content/70 mt-2 text-sm">{item.Text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default LandingPage;
