"use client";
import React from "react";
import { motion } from "framer-motion";

function BannerLeft() {
  return (
    <motion.div
      initial={{ x: -250, opacity: 0 }}
      whileInView={{ x: 300, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex h-64 w-[1000px] flex-col justify-center rounded-2xl border border-black/80 bg-gradient-to-br from-[#FF705B]/10 to-[#FFB457]/10 p-6 text-center shadow-xl backdrop-blur-md"
    >
      <h3 className="text-3xl font-bold text-gray-900">
        🤖 Automatisch generierte Fragen und Antworten 📝
      </h3>
      <p className="mt-2 text-sm text-gray-600">
        Erstelle Tests automatisch für jedes Fachgebiet und
        Schwierigkeitsniveau.
      </p>
      <small className="mt-2 block text-gray-500">
        💡 Spar Zeit und erhalte sofort fertige Testsets
      </small>
    </motion.div>
  );
}

export default BannerLeft;
