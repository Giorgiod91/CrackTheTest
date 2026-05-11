"use client";
import React from "react";
import { motion } from "framer-motion";

function BannerLeft() {
  return (
    <motion.div
      initial={{ x: "-60%", opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="mx-auto flex w-full max-w-4xl flex-col justify-center gap-2 rounded-2xl border border-orange-300/40 bg-gradient-to-br from-[#FF705B]/10 to-[#FFB457]/10 px-8 py-8 shadow-xl backdrop-blur-md"
    >
      <div className="flex items-center gap-3">
        <span className="rounded-xl bg-gradient-to-br from-[#FF705B] to-[#FFB457] p-2 text-2xl shadow-md">🤖</span>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          Automatisch generierte Fragen und Antworten 📝
        </h3>
      </div>
      <p className="pl-14 text-base text-gray-600 dark:text-gray-300">
        Erstelle Tests automatisch für jedes Fachgebiet und Schwierigkeitsniveau.
      </p>
      <p className="pl-14 text-sm font-medium text-orange-500">
        💡 Spar Zeit und erhalte sofort fertige Testsets
      </p>
    </motion.div>
  );
}

export default BannerLeft;
