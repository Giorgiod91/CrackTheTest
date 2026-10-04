import React from "react";
import Link from "next/link";
import { TOPICS, AP1_FACTS } from "@/lib/ap1/topics";

export default function Ap1Topics() {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="text-center">
        <p className="mb-3 text-xs font-semibold tracking-widest text-orange-500 uppercase">Prüfungsstoff</p>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
          Alle{" "}
          <span className="bg-gradient-to-br from-[#FF705B] to-[#FFB457] bg-clip-text text-transparent">AP1-Themen</span>{" "}
          an einem Ort
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-300">
          „Einrichten eines IT-gestützten Arbeitsplatzes“: {AP1_FACTS.dauerMinuten} Minuten,{" "}
          {AP1_FACTS.handlungsschritte} Handlungsschritte, {AP1_FACTS.maxPunkte} Punkte, {AP1_FACTS.gewichtung}.
          Gilt für alle Fachrichtungen.{" "}
          <Link href="/ap1-pruefungsvorbereitung" className="font-semibold text-orange-500 underline-offset-4 hover:underline">
            Zum Lernplan für die AP1 Prüfungsvorbereitung →
          </Link>
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TOPICS.map((t) => (
          <Link
            key={t.slug}
            href={`/ap1/${t.slug}`}
            className="group rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-lg dark:bg-white/5"
          >
            <span className="text-3xl">{t.emoji}</span>
            <h3 className="mt-3 text-lg font-bold">{t.title}</h3>
            <p className="mt-1 text-sm text-neutral-500">{t.short}</p>
            <span className="mt-3 inline-block text-sm font-semibold text-orange-500 group-hover:text-orange-600">
              Beispielaufgaben ansehen →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
