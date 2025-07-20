"use client";

import React, { useState } from "react";
import { dimensionValueTypes, easeInOut, motion } from "framer-motion";
import { Http2ServerRequest } from "http2";
import {
  Cog6ToothIcon,
  DocumentTextIcon,
  ArrowUpTrayIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

type Props = {};

const steps = [
  {
    icon: <DocumentTextIcon className="h-14 w-14 text-black" />,
    title: "1. Thema & Ziel wählen",
    description:
      "Wähle das Fachgebiet, die Zielgruppe und das Schwierigkeitsniveau deines Tests.",
  },
  {
    icon: <Cog6ToothIcon className="h-14 w-14 text-black" />,
    title: "2. Test generieren",
    description:
      "Unsere KI erstellt automatisch passende Fragen inklusive Antworten & Lösungen.",
  },
  {
    icon: <ArrowUpTrayIcon className="h-14 w-14 text-black" />,
    title: "3. Test teilen oder exportieren",
    description:
      "Nutze den Test online oder exportiere ihn als PDF, CSV oder für LMS-Plattformen.",
  },
  {
    icon: <ChartBarIcon className="h-14 w-14 text-black" />,
    title: "4. Ergebnisse analysieren",
    description:
      "Erhalte direkt Feedback & Auswertungen zur Performance – perfekt zur Vorbereitung.",
  },
];
//::TODO:  fix the on click to not move other parts

function Tutorial({}: Props) {
  const [hover, setHover] = useState(false);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
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

        <div>
          <div className="flex flex-row items-start gap-12">
            {steps.map((step, index) => (
              <div
                key={index}
                onClick={() => setSelectedStep(index)}
                className="w-6 cursor-pointer text-3xl opacity-50 transition hover:opacity-100"
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="flex flex-row items-start text-5xl">
                    {step.icon}
                  </div>
                  <p className="text-sm hover:text-amber-100">{step.title}</p>
                </div>

                {selectedStep === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-base-200 mt-4 w-150 rounded-xl p-4 shadow-md"
                  >
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                      {step.description}
                    </p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Tutorial;
