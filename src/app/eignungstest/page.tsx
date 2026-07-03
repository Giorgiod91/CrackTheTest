import { type Metadata } from "next";
import Link from "next/link";
import { firmen } from "./_data/firmen";
import Footer from "~/app/_components/Footer";

export const metadata: Metadata = {
  title: "Eignungstest üben – Vorbereitung für VW, Bahn, Polizei & mehr",
  description:
    "Bereite dich kostenlos auf Eignungs- und Einstellungstests vor: VW, Continental, Deutsche Bahn, Polizei, Bundeswehr und mehr. Mit KI-generierten Übungstests.",
  alternates: {
    canonical: "https://crack-the-test.vercel.app/eignungstest",
  },
};

export default function EignungstestHubPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <nav className="mb-8 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-300">
            Startseite
          </Link>
          {" / "}
          <span className="text-slate-300">Eignungstests</span>
        </nav>

        <h1 className="text-3xl font-extrabold text-white md:text-4xl">
          Eignungstest üben – wähle deinen Test
        </h1>
        <p className="mt-4 leading-relaxed text-slate-300">
          Egal ob Ausbildung bei VW, Karriere bei der Polizei oder Quereinstieg
          bei der Deutschen Bahn: Fast jedes Auswahlverfahren beginnt mit einem
          Eignungstest. Hier findest du für jeden Test eine Übersicht der
          geprüften Themen, den Ablauf und kostenlose Beispielaufgaben.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {firmen.map((f) => (
            <Link
              key={f.slug}
              href={`/eignungstest/${f.slug}`}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-orange-400/50 hover:bg-white/10"
            >
              <h2 className="text-lg font-bold text-white">
                {f.name} Eignungstest
              </h2>
              <p className="mt-2 line-clamp-2 text-sm text-slate-400">
                {f.beschreibung}
              </p>
              <span className="mt-3 inline-block text-sm font-semibold text-orange-400">
                Zur Vorbereitung →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-orange-400/40 bg-gradient-to-br from-[#FF705B]/15 to-[#FFB457]/15 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">
            Dein Test ist nicht dabei?
          </h2>
          <p className="mt-3 text-slate-300">
            Mit CrackTheTest erstellst du dir KI-generierte Übungstests zu
            jedem Thema — einfach Thema und Schwierigkeit wählen.
          </p>
          <Link
            href="/auth/signup"
            className="mt-5 inline-block rounded-full bg-gradient-to-br from-[#FF705B] to-[#FFB457] px-8 py-3 font-bold text-white shadow-lg transition hover:scale-105"
          >
            Kostenlos starten →
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
