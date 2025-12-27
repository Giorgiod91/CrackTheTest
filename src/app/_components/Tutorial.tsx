"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Cog6ToothIcon,
  DocumentTextIcon,
  ArrowUpTrayIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const steps = [
  {
    icon: <DocumentTextIcon className="h-8 w-8" />,
    title: "1. Thema & Ziel wählen",
    description:
      "Wähle das Fachgebiet, den Bereich und das Schwierigkeitsniveau deines Tests.",
  },
  {
    icon: <Cog6ToothIcon className="h-8 w-8" />,
    title: "2. Test generieren",
    description:
      "Unsere KI erstellt automatisch passende Fragen inklusive Antworten & Lösungen.",
  },
  {
    icon: <ArrowUpTrayIcon className="h-8 w-8" />,
    title: "3. Test teilen oder exportieren",
    description: "Nutze den Test online oder exportiere ihn als PDF",
  },
  {
    icon: <ChartBarIcon className="h-8 w-8" />,
    title: "4. Ergebnisse analysieren",
    description:
      "Erhalte direkt Feedback & Auswertungen zur Performance – perfekt zur Vorbereitung.",
  },
];
//::TODO:  fix the on click to not move other parts

function Tutorial() {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  return (
    <section className="bg-base-100 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            className="text-base-content text-4xl font-extrabold tracking-tight sm:text-5xl"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-gradient-to-br from-[#FF705B] to-[#FFB457] bg-clip-text text-transparent">
              Wie
            </span>{" "}
            funktioniert es?
          </motion.h2>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-300"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            In nur vier Schritten zur perfekten Eignungsprüfung – KI-gestützt,
            flexibel und schnell.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() =>
                setSelectedStep(selectedStep === index ? null : index)
              }
              className="group flex cursor-pointer flex-col rounded-2xl border border-white/10 bg-gradient-to-br from-[#FF705B]/10 to-[#FFB457]/10 p-6 shadow-lg backdrop-blur-md transition hover:border-black/80 hover:shadow-xl hover:shadow-orange-300/40 dark:shadow-indigo-700/20"
            >
              <div className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF705B]/20 to-[#FFB457]/20">
                <span className="text-base-content/90 transition-transform duration-300 group-hover:scale-110">
                  {step.icon}
                </span>
                {selectedStep === index && (
                  <span className="absolute -top-2 -right-2 h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-[#FF705B] to-[#FFB457]"></span>
                )}
              </div>

              <h3 className="text-base-content mb-3 text-lg font-semibold">
                {step.title}
              </h3>

              <p className="text-base-content/70 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Selected step details */}
        {selectedStep !== null && (
          <motion.div
            key={selectedStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mx-auto mt-8 max-w-2xl rounded-2xl border border-white/10 bg-gradient-to-br from-[#FF705B]/10 to-[#FFB457]/10 p-6 backdrop-blur-md"
          >
            <h3 className="text-base-content text-xl font-bold">
              {steps[selectedStep]?.title}
            </h3>
            <p className="text-base-content/70 mt-3">
              {steps[selectedStep]?.description}
            </p>
          </motion.div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href="#price"
              className="btn bg-gradient-to-br from-[#FF705B] to-[#FFB457] px-6 py-3 text-lg font-semibold shadow-xl transition-transform duration-200 hover:scale-105 hover:brightness-110"
            >
              Jetzt starten 🚀
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Tutorial;
