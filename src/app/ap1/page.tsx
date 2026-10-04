import { type Metadata } from "next";
import Link from "next/link";
import { TOPICS, AP1_FACTS, PRICE_LABEL } from "@/lib/ap1/topics";
import { SITE } from "@/lib/site";
import Footer from "~/app/_components/Footer";

export const metadata: Metadata = {
  title: "AP1 Fachinformatiker: alle Prüfungsthemen mit Übungsaufgaben",
  description:
    "Alle Themen der AP1 Fachinformatiker (Einrichten eines IT-gestützten Arbeitsplatzes): Subnetting, Wirtschaftlichkeit, IT-Sicherheit, Hardware, Energie, Pseudocode. Mit Beispielaufgaben und Lösungen.",
  alternates: { canonical: `${SITE.url}/ap1` },
};

export default function Ap1HubPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <nav className="mb-8 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-300">Startseite</Link>
          {" / "}
          <span className="text-slate-300">AP1-Themen</span>
        </nav>

        <h1 className="text-3xl font-extrabold text-white md:text-4xl">
          AP1 Fachinformatiker: alle Prüfungsthemen im Überblick
        </h1>
        <p className="mt-4 leading-relaxed text-slate-300">
          Teil 1 der gestreckten Abschlussprüfung heißt „Einrichten eines IT-gestützten Arbeitsplatzes“
          und ist für alle Fachrichtungen gleich. Du hast {AP1_FACTS.dauerMinuten} Minuten für{" "}
          {AP1_FACTS.handlungsschritte} Handlungsschritte mit zusammen {AP1_FACTS.maxPunkte} Punkten,
          das Ergebnis zählt {AP1_FACTS.gewichtung}. Hier findest du jedes Thema mit den typischen
          Aufgabentypen und Beispielaufgaben mit Lösung.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {TOPICS.map((t) => (
            <Link
              key={t.slug}
              href={`/ap1/${t.slug}`}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-orange-400/50 hover:bg-white/10"
            >
              <span className="text-2xl">{t.emoji}</span>
              <h2 className="mt-2 text-lg font-bold text-white">{t.title}</h2>
              <p className="mt-2 text-sm text-slate-400">{t.short}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-orange-400">Beispielaufgaben →</span>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-orange-400/40 bg-gradient-to-br from-[#FF705B]/15 to-[#FFB457]/15 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">Wissen, wo du stehst</h2>
          <p className="mt-3 text-slate-300">
            Fortschritt pro Thema, Notenprognose und 90-Minuten-Prüfungssimulation.
            Alles für {PRICE_LABEL} einmalig, kein Abo.
          </p>
          <Link
            href="/auth/signup"
            className="mt-5 inline-block rounded-full bg-gradient-to-br from-[#FF705B] to-[#FFB457] px-8 py-3 font-bold text-white shadow-lg transition hover:scale-105"
          >
            Für {PRICE_LABEL} freischalten →
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
