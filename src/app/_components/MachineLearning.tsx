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
      desc: "User interacts with app & submits a question/test.",
    },
    {
      icon: <FaPython className="text-2xl text-yellow-400" />,
      title: "Backend (FastAPI / Flask)",
      desc: "Receives data and routes to AI services.",
    },
    {
      icon: <SiOpenai className="text-2xl text-green-400" />,
      title: "OpenAI API",
      desc: "Generates explanations, hints, or question text.",
    },
    {
      icon: <SiTensorflow className="text-2xl text-orange-400" />,
      title: "ML Model",
      desc: "Classifies question difficulty (Leicht / Mittel / Schwer).",
    },
    {
      icon: <SiMongodb className="text-2xl text-emerald-500" />,
      title: "Database",
      desc: "Stores user progress & results.",
    },
    {
      icon: <FaReact className="text-2xl text-sky-400" />,
      title: "Frontend",
      desc: "Displays difficulty and recommendations visually.",
    },
  ];

  const Schwierigkeit = "Mittel";
  return (
    <div className="mx-auto max-w-6xl rounded-2xl bg-gradient-to-br from-[#2B2B3C]/90 to-[#1E1E2F]/90 p-8 font-mono text-gray-100 shadow-2xl">
      <h2 className="mb-8 text-center text-2xl font-bold text-[#FFB457]">
        🔍 CrackTheTest.ai – System Flow
      </h2>

      <div className="flex flex-col items-center space-y-6">
        {steps.map((step, i) => (
          <div>
            <motion.div
              key={i}
              className="flex w-full max-w-3xl items-center space-x-4 rounded-xl border border-white/10 bg-[#2B2B3C] px-5 py-3 shadow-md hover:scale-104"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              {step.icon}
              <div>
                <p className="text-lg font-semibold text-white">{step.title}</p>
                <p className="text-sm text-gray-400">{step.desc}</p>
              </div>
            </motion.div>
            <ArrowDown className="h-9 w-9 animate-bounce text-[#FF705B]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MachineLearning;
