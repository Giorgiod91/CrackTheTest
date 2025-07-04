"use client";
import React from "react";
import { motion } from "framer-motion";
import { CardStackDemo } from "./CardStacks";

type Props = {};

function LandingPage({}: Props) {
  return (
    <section className="relative mx-auto flex w-full flex-col justify-between overflow-x-hidden px-6 pt-8 pb-10 sm:px-8 sm:pt-12 lg:flex-row lg:gap-20 lg:pb-20">
      {/* Left Section */}
      <div className="pt-50 lg:w-1/2">
        <motion.h1
          className="text-base-content mb-6 text-3xl leading-snug font-black sm:text-6xl"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ color: "hsl(var(--p))", transition: { duration: 0.3 } }}
        >
          Crack The Test mit{" "}
          <span
            className="text-primary bg-base-100 inline-block"
            style={{
              transform: "skewX(-10deg)",
              padding: "0 10px",
            }}
          >
            AI-Präzision
          </span>{" "}
          <motion.span
            className="inline-block"
            whileHover={{
              rotate: [0, 10, 20, 30, 40, 50, 60],
              x: [0, 10, 20, 30, 40, 50, 60],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            🧠
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-base-content/70 mb-6 text-lg"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          ✅ Tests automatisch erstellen mit <strong>CrackTheTest.ai</strong>
          <br />
          🧠 KI-gestützte Test-Generierung für Unternehmen, Bildung und
          Eignungsprüfungen.
          <br />
          🔍 Analysiere Wissen. Erstelle Prüfungen. Spare Zeit –
          vollautomatisch.
        </motion.p>

        <motion.a
          href="#get-started"
          className="btn btn-primary px-6 py-3 text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Jetzt starten 🚀
        </motion.a>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center pb-40 lg:w-1/2">
        <CardStackDemo />
      </div>
    </section>
  );
}

export default LandingPage;
