"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaPython, FaReact } from "react-icons/fa";
import { SiOpenai, SiMongodb, SiTensorflow } from "react-icons/si";
import { ArrowDown, ArrowRight } from "lucide-react";

function MachineLearning() {
  const [analysieren, setAnalysieren] = React.useState(false);

  const steps = [
    {
      icon: <FaReact className="text-2xl text-sky-400" />,
      title: "Frontend (CrackTheTest.ai)",
      desc: "Der Benutzer interagiert mit der App und reicht eine Frage/einen Test ein.",
    },
    {
      icon: <FaPython className="text-2xl text-yellow-400" />,
      title: "Backend (FastAPI / Flask)",
      desc: "Empfängt die Daten und leitet sie an die KI-Services weiter.",
    },
    {
      icon: <SiOpenai className="text-2xl text-green-400" />,
      title: "OpenAI API",
      desc: "Generiert Erklärungen, Hinweise oder Frageinhalte.",
    },
    {
      icon: <SiTensorflow className="text-2xl text-orange-400" />,
      title: "ML-Modell",
      desc: "Klassifiziert die Schwierigkeit der Fragen (Leicht / Mittel / Schwer).",
    },
    {
      icon: <SiMongodb className="text-2xl text-emerald-500" />,
      title: "Datenbank",
      desc: "Speichert Benutzerfortschritte und Ergebnisse.",
    },
    {
      icon: <FaReact className="text-2xl text-sky-400" />,
      title: "Frontend",
      desc: "Zeigt die Schwierigkeit und Empfehlungen visuell an.",
    },
  ];

  const Schwierigkeit = "Mittel";

  return (
    <div className="mx-auto max-w-5xl px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center"
      >
        <span className="mb-3 inline-block rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-1 text-sm font-medium text-orange-400">
          Wie es funktioniert
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          <span className="bg-gradient-to-br from-[#FF705B] to-[#FFB457] bg-clip-text text-transparent">CrackTheTest.ai</span> – KI im Einsatz
        </h2>
      </motion.div>

      <div className="relative flex flex-col items-center">
        {/* vertical line */}
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-[#FF705B]/40 via-[#FFB457]/40 to-transparent" />

        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="relative z-10 mb-4 w-full max-w-xl"
          >
            <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-[#2B2B3C] px-5 py-4 shadow-lg transition hover:border-[#FF705B]/50 hover:shadow-orange-500/10">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF705B]/20 to-[#FFB457]/20 shadow-inner">
                {step.icon}
              </div>
              <div>
                <p className="font-semibold text-white">{step.title}</p>
                <p className="mt-0.5 text-sm text-gray-400">{step.desc}</p>
              </div>
              <span className="ml-auto shrink-0 text-xs font-bold text-white/20">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="my-1 flex justify-center">
                <ArrowDown className="h-5 w-5 text-[#FF705B]/60" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default MachineLearning;
