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
    icon: <DocumentTextIcon className="h-10 w-10 text-base-content" />,
    number: "01",
    title: "Thema & Ziel wählen",
    description:
      "Wähle das Fachgebiet, die Zielgruppe und das Schwierigkeitsniveau deines Tests.",
  },
  {
    icon: <Cog6ToothIcon className="h-10 w-10 text-base-content" />,
    number: "02",
    title: "Test generieren",
    description:
      "Unsere KI erstellt automatisch passende Fragen inklusive Antworten & Lösungen.",
  },
  {
    icon: <ArrowUpTrayIcon className="h-10 w-10 text-base-content" />,
    number: "03",
    title: "Teilen oder exportieren",
    description: "Nutze den Test online oder exportiere ihn als PDF.",
  },
  {
    icon: <ChartBarIcon className="h-10 w-10 text-base-content" />,
    number: "04",
    title: "Ergebnisse analysieren",
    description:
      "Erhalte direkt Feedback & Auswertungen zur Performance – perfekt zur Vorbereitung.",
  },
];

function Tutorial() {
  return (
    <section className="bg-base-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <motion.h2
          className="text-4xl font-extrabold tracking-tight sm:text-5xl"
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
          className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-300"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          In nur vier Schritten zur perfekten Eignungsprüfung – KI-gestützt,
          flexibel und schnell.
        </motion.p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-start rounded-2xl border border-white/10 bg-gradient-to-br from-[#FF705B]/10 to-[#FFB457]/10 p-6 text-left shadow-lg backdrop-blur-md transition hover:border-orange-400/50 hover:shadow-xl hover:shadow-orange-300/20"
            >
              <div className="mb-4 flex w-full items-center justify-between">
                <div className="rounded-xl bg-gradient-to-br from-[#FF705B] to-[#FFB457] p-2.5">
                  {step.icon}
                </div>
                <span className="text-3xl font-black text-orange-400/20">
                  {step.number}
                </span>
              </div>
              <h3 className="text-base-content text-lg font-semibold">
                {step.title}
              </h3>
              <p className="text-base-content/60 mt-2 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Tutorial;
