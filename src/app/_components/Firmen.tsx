"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

function Firmen() {
  const arrowContentCompanies = [
    {
      arrow: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          style={{ fill: "#FD7E14" }}
        >
          <path d="M 20.738281 5.9941406 A 1.250125 1.250125 0 0 0 19.878906 6.3730469 L 9 17.234375 L 4.1152344 12.361328 A 1.250125 1.250125 0 1 0 2.3496094 14.130859 L 8.1171875 19.884766 A 1.250125 1.250125 0 0 0 9.8828125 19.884766 L 21.644531 8.140625 A 1.250125 1.250125 0 0 0 20.738281 5.9941406 z"></path>
        </svg>
      ),
      line: "Schnell & Einfach",
    },
    {
      arrow: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          style={{ fill: "#FD7E14" }}
        >
          <path d="M 20.738281 5.9941406 A 1.250125 1.250125 0 0 0 19.878906 6.3730469 L 9 17.234375 L 4.1152344 12.361328 A 1.250125 1.250125 0 1 0 2.3496094 14.130859 L 8.1171875 19.884766 A 1.250125 1.250125 0 0 0 9.8828125 19.884766 L 21.644531 8.140625 A 1.250125 1.250125 0 0 0 20.738281 5.9941406 z"></path>
        </svg>
      ),
      line: "Tests für alle Firmen",
    },
    {
      arrow: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          style={{ fill: "#FD7E14" }}
        >
          <path d="M 20.738281 5.9941406 A 1.250125 1.250125 0 0 0 19.878906 6.3730469 L 9 17.234375 L 4.1152344 12.361328 A 1.250125 1.250125 0 1 0 2.3496094 14.130859 L 8.1171875 19.884766 A 1.250125 1.250125 0 0 0 9.8828125 19.884766 L 21.644531 8.140625 A 1.250125 1.250125 0 0 0 20.738281 5.9941406 z"></path>
        </svg>
      ),
      line: "Individuelles Feedback",
    },
  ];
  const logos = [
    {
      name: "VW",
      src: "/Volkswagen.png",
    },
    { name: "Continental", src: "/conti.png" },
    { name: "Telekom", src: "/Telekom.png" },
    { name: "Rossmann", src: "/rossmann.png" },
    { name: "HDI", src: "/HDI.png" },
    { name: "Bundeswehr", src: "/Bundeswehr.png" },
    { name: "DB", src: "/DB.png" },
    { name: "Siemens", src: "/Siemens.png" },
  ];
  return (
    <div className="flex flex-col items-center justify-center space-y-8 rounded-2xl bg-gradient-to-br from-[#FF705B]/10 to-[#FFB457]/10 py-16 shadow-2xl">
      <div className="sapce-y-2 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Übe für Firmen Einstellungstests
        </h1>
        <p className="text-sm text-black/90">
          übe speziell nach Beruf und Firma
        </p>
      </div>

      {/* Logos */}
      <div className="animate-scroll mt-6 flex flex-row flex-wrap justify-center gap-8">
        {logos.map((logo, i) => (
          <div
            key={i}
            className="relative h-16 w-32 p-2 backdrop-blur-md transition-transform duration-300 hover:scale-105"
          >
            <Image
              src={logo.src}
              alt={logo.name}
              title={logo.name}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        ))}
      </div>

      {/* Arrow Features */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {arrowContentCompanies.map((arrow, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -44 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            className="flex items-center gap-2 rounded-2xl bg-[#2B2B3C]/80 p-4 shadow-lg backdrop-blur-md transition-discrete hover:scale-105 hover:border-[#FF705B] hover:shadow-xl"
          >
            {arrow.arrow}
            <p className="text-sm font-semibold text-white">{arrow.line}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Firmen;
