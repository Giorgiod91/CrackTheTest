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
    <section className="bg-base-100 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            className="text-base-content text-4xl font-extrabold tracking-tight sm:text-5xl"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Übe für{" "}
            <span className="bg-gradient-to-br from-[#FF705B] to-[#FFB457] bg-clip-text text-transparent">
              Firmen
            </span>{" "}
            Einstellungstests
          </motion.h2>
          <motion.p
            className="mt-6 text-lg text-neutral-600 dark:text-neutral-300"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Übe speziell nach Beruf und Firma – mit KI-generierten Tests für
            Top-Unternehmen
          </motion.p>
        </div>

        {/* Company Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16"
        >
          <p className="text-base-content/60 mb-8 text-center text-xs tracking-widest uppercase">
            Vertraut von führenden Unternehmen
          </p>
          <div className="relative overflow-hidden">
            <div className="animate-scroll flex gap-8">
              {/* First set of logos */}
              {logos.map((logo, i) => (
                <div
                  key={i}
                  className="group bg-base-200/40 hover:bg-base-200/60 relative flex h-16 w-32 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 p-4 backdrop-blur transition hover:border-orange-300/30"
                >
                  <div className="relative h-8 w-20 opacity-70 transition-opacity group-hover:opacity-100">
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      title={logo.name}
                      fill
                      style={{ objectFit: "contain" }}
                      className="grayscale filter transition-all duration-300 group-hover:grayscale-0"
                    />
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {logos.map((logo, i) => (
                <div
                  key={`duplicate-${i}`}
                  className="group bg-base-200/40 hover:bg-base-200/60 relative flex h-16 w-32 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 p-4 backdrop-blur transition hover:border-orange-300/30"
                >
                  <div className="relative h-8 w-20 opacity-70 transition-opacity group-hover:opacity-100">
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      title={logo.name}
                      fill
                      style={{ objectFit: "contain" }}
                      className="grayscale filter transition-all duration-300 group-hover:grayscale-0"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }

          .animate-scroll {
            animation: scroll 20s linear infinite;
            width: calc(256px * ${logos.length});
          }

          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>

        {/* Features */}
        <div className="mt-16 flex flex-wrap justify-center gap-6">
          {arrowContentCompanies.map((arrow, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-gradient-to-br from-[#FF705B]/10 to-[#FFB457]/10 p-4 shadow-lg backdrop-blur-md transition hover:border-black/80 hover:shadow-xl hover:shadow-orange-300/40 dark:shadow-indigo-700/20"
            >
              {arrow.arrow}
              <p className="text-base-content text-sm font-semibold">
                {arrow.line}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href="#price"
              className="btn bg-gradient-to-br from-[#FF705B] to-[#FFB457] px-6 py-3 text-lg font-semibold shadow-xl transition-transform duration-200 hover:scale-105 hover:brightness-110"
            >
              Firmentests starten 🏢
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Firmen;
