"use client";
import React from "react";
import { motion } from "framer-motion";

type Props = {};

function BannerRight({}: Props) {
  return (
    <motion.div
      initial={{ x: 250, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex h-64 w-full flex-col justify-center rounded-2xl border border-black/80 bg-gradient-to-br from-[#FF705B]/10 to-[#FFB457]/10 p-6 text-center shadow-xl backdrop-blur-md"
    >
      <h1 className="text-3xl font-bold text-gray-900">
        📊 Ergebnisse analysieren & optimieren ⚡
      </h1>
      <p className="mt-2 text-sm text-gray-600">
        Stärken, Schwächen und Schwierigkeitsgrade direkt erkennen.
      </p>
      <small className="text-gray-500">
        🧠 ML-Klassifizierer bewertet die Schwierigkeit automatisch
      </small>
    </motion.div>
  );
}

export default BannerRight;
