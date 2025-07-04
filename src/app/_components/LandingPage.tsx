"use client";
import React from "react";
import { motion } from "framer-motion";
import { CardStackDemo } from "./CardStacks";

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

function LandingPage({}: Props) {
  return (
    <section className="bg-base-100 py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:items-center lg:gap-24 lg:px-8">
        {/* Left Content */}
        <div className="space-y-6">
          <motion.h1
            className="text-base-content text-4xl font-extrabold tracking-tight sm:text-5xl"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Crack
            <span className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
              {" "}
              The Test{" "}
            </span>{" "}
            mit AI Präzision 🧠
          </motion.h1>

          <motion.p
            className="text-base-content/70 max-w-xl text-base sm:text-lg"
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
              className="btn btn-primary px-6 py-3 text-lg font-semibold"
            >
              Jetzt starten 🚀
            </a>
          </motion.div>
        </div>

        {/* Right CardStack or Image */}
        <motion.div
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <CardStackDemo />
        </motion.div>
      </div>
      <div className="mt-16 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Cards.map((item, index) => (
          <div
            key={index}
            className="flex flex-col rounded-2xl bg-gradient-to-br from-blue-900/20 via-indigo-900/20 to-purple-900/20 p-6 shadow-lg backdrop-blur-md transition hover:shadow-xl dark:shadow-indigo-700/20"
          >
            <div className="text-primary mb-3 text-3xl font-bold">
              {item.logo}
            </div>
            <h3 className="text-base-content text-lg font-semibold">
              {item.Heading}
            </h3>
            <p className="text-base-content/70 mt-2 text-sm">{item.Text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LandingPage;
