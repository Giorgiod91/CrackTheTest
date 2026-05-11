"use client";
import React from "react";
import { motion } from "framer-motion";

function BannerRight() {
  return (
    <motion.div
      initial={{ x: "60%", opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="mx-auto flex w-full max-w-4xl flex-col justify-center gap-2 rounded-2xl border border-[#FFB457]/50 bg-gradient-to-br from-[#2B2B3C]/90 to-[#1E1E2F]/90 px-8 py-8 shadow-xl shadow-orange-500/10 backdrop-blur-md"
    >
      <div className="flex items-center gap-3">
        <span className="rounded-xl bg-gradient-to-br from-[#FF705B] to-[#FFB457] p-2 text-2xl shadow-md">📊</span>
        <h3 className="text-2xl font-bold text-white/90">
          Ergebnisse analysieren & optimieren ⚡
        </h3>
      </div>
      <p className="pl-14 text-base text-white/70">
        Stärken, Schwächen und Schwierigkeitsgrade direkt erkennen.
      </p>
      <p className="pl-14 text-sm font-medium text-orange-400">
        🧠 ML-Klassifizierer bewertet die Schwierigkeit automatisch
      </p>
    </motion.div>
  );
}

export default BannerRight;
