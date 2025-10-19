"use client";
import React from "react";
import { motion } from "framer-motion";

type Props = {};

function BannerRight({}: Props) {
  return (
    <motion.div
      initial={{ x: 550, opacity: 0 }}
      whileInView={{ x: 300, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex h-64 w-[1000px] flex-col justify-center rounded-2xl border border-[#FFB457] bg-gradient-to-br from-[#2B2B3C]/90 to-[#1E1E2F]/90 p-6 text-center shadow-xl backdrop-blur-md hover:brightness-105"
    >
      <h1 className="text-3xl font-bold text-white/90">
        📊 Ergebnisse analysieren & optimieren ⚡
      </h1>
      <p className="mt-2 text-sm text-white/70">
        Stärken, Schwächen und Schwierigkeitsgrade direkt erkennen.
      </p>
      <small className="mt-4 text-white/50">
        🧠 ML-Klassifizierer bewertet die Schwierigkeit automatisch
      </small>
    </motion.div>
  );
}

export default BannerRight;
