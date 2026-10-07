"use client";
import React from "react";
import { motion } from "framer-motion";
import { AUTHOR } from "@/lib/site";

const POINTS = [
  { emoji: "🎯", title: "Nur was drankommt", text: "Keine Lehrbuchkapitel, sondern die Aufgabentypen, die in der AP1 regelmäßig auftauchen." },
  { emoji: "🧮", title: "Rechenwege, die sitzen", text: "Subnetting, Stromkosten, Bezugspreis, Datenmengen. Schritt für Schritt erklärt, so wie man es in der Prüfung aufschreibt." },
  { emoji: "💡", title: "Prüfungstipps aus erster Hand", text: "Wo die Fallen liegen (MB vs. MiB, Bit vs. Byte, Zutritt vs. Zugang) und womit man schnell Punkte sammelt." },
];

export default function AuthorSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 lg:px-8">
      <div className="grid gap-10 rounded-3xl border border-orange-200/60 bg-gradient-to-br from-[#FF705B]/10 to-[#FFB457]/10 p-8 sm:p-12 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2"
        >
          <p className="mb-3 text-xs font-semibold tracking-widest text-orange-500 uppercase">Von jemandem, der den Weg schon gegangen ist</p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Gebaut von jemandem, der die AP1{" "}
            <span className="bg-gradient-to-br from-[#FF705B] to-[#FFB457] bg-clip-text text-transparent">schon hinter sich hat.</span>
          </h2>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#FF705B] to-[#FFB457] text-xl font-bold text-white shadow-lg">
              💻
            </div>
            <div>
              <p className="font-bold">{AUTHOR.name}</p>
              <p className="text-sm text-neutral-500">{AUTHOR.role} · AP1 {AUTHOR.ap1Result}</p>
            </div>
          </div>
          <blockquote className="mt-6 border-l-4 border-orange-400 pl-4 text-base leading-relaxed text-neutral-600 italic dark:text-neutral-300">
            „{AUTHOR.quote}“
          </blockquote>
        </motion.div>

        <div className="space-y-4 lg:col-span-3">
          {POINTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex gap-4 rounded-2xl border border-white/40 bg-white/70 p-5 shadow-sm dark:bg-white/5"
            >
              <span className="text-3xl">{p.emoji}</span>
              <div>
                <h3 className="font-bold">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{p.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
