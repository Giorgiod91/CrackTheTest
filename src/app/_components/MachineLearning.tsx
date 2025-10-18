"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaPython, FaReact } from "react-icons/fa";
import { SiOpenai, SiMongodb, SiTensorflow } from "react-icons/si";
import { ArrowDown, ArrowRight } from "lucide-react";

type Props = {};

function MachineLearning({}: Props) {
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

  //TODO: add cool animation
  return (
    <div className="mx-auto max-w-6xl rounded-2xl bg-gradient-to-br from-[#2B2B3C]/90 to-[#1E1E2F]/90 p-8 font-mono text-gray-100 shadow-2xl">
      <h2 className="mb-8 text-center text-2xl font-bold text-[#FFB457]">
        🔍 CrackTheTest.ai – System Flow
      </h2>

      <div className="flex flex-col items-center space-y-2">
        {steps.map((step, index) => (
          <div className="flex flex-col items-center space-y-6">
            <motion.div
              key={index}
              className="flex min-h-[90px] w-full max-w-3xl min-w-3xl items-center space-x-4 rounded-xl border border-[#FFB457] bg-[#2B2B3C] px-5 py-3 shadow-md hover:scale-104 hover:border-[#FF705B] hover:shadow-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              {step.icon}
              <div>
                <p className="text-lg font-semibold text-white">{step.title}</p>
                <p className="text-sm text-gray-400">{step.desc}</p>
              </div>
            </motion.div>
            {index < steps.length - 1 ? (
              <ArrowDown className="h-9 w-9 animate-bounce text-[#FF705B]" />
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MachineLearning;
