import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { firmen, getFirma } from "../_data/firmen";
import Footer from "~/app/_components/Footer";

export function generateStaticParams() {
  return firmen.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const firma = getFirma(slug);
  if (!firma) return {};
  return {
    title: firma.titel,
    description: firma.beschreibung,
    alternates: {
      canonical: `https://crack-the-test.vercel.app/eignungstest/${firma.slug}`,
    },
    openGraph: {
      title: firma.titel,
      description: firma.beschreibung,
      type: "article",
      locale: "de_DE",
    },
  };
}

export default async function EignungstestFirmaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const firma = getFirma(slug);
  if (!firma) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: firma.fragen.map((f) => ({
      "@type": "Question",
      name: f.frage,
      acceptedAnswer: {
        "@type": "Answer",
        text: `${f.optionen[f.antwort]} – ${f.erklaerung}`,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-6 py-12">
        <nav className="mb-8 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-300">
            Startseite
          </Link>
          {" / "}
          <Link href="/eignungstest" className="hover:text-slate-300">
            Eignungstests
          </Link>
          {" / "}
          <span className="text-slate-300">{firma.name}</span>
        </nav>

        <h1 className="text-3xl font-extrabold text-white md:text-4xl">
          {firma.name} Eignungstest üben
        </h1>

        <div className="mt-6 space-y-4">
          {firma.intro.map((p) => (
            <p key={p.slice(0, 40)} className="leading-relaxed text-slate-300">
              {p}
            </p>
          ))}
        </div>

        {/* CTA top */}
        <div className="mt-8 rounded-2xl border border-orange-400/40 bg-gradient-to-br from-[#FF705B]/15 to-[#FFB457]/15 p-6 text-center">
          <p className="font-semibold text-white">
            Übe jetzt mit KI-generierten Tests, die sich deinem Niveau anpassen
          </p>
          <Link
            href="/auth/signup"
            className="mt-4 inline-block rounded-full bg-gradient-to-br from-[#FF705B] to-[#FFB457] px-8 py-3 font-bold text-white shadow-lg transition hover:scale-105"
          >
            Kostenlos Übungstest starten →
          </Link>
          <p className="mt-3 text-xs text-slate-400">
            3 Tests gratis · keine Kreditkarte nötig
          </p>
        </div>

        <h2 className="mt-12 text-2xl font-bold text-white">
          Diese Themen werden geprüft
        </h2>
        <ul className="mt-4 space-y-3">
          {firma.themen.map((t) => (
            <li key={t} className="flex items-start gap-3 text-slate-300">
              <span className="mt-1 text-orange-400">✓</span>
              {t}
            </li>
          ))}
        </ul>

        <h2 className="mt-12 text-2xl font-bold text-white">
          So läuft das Auswahlverfahren ab
        </h2>
        <ol className="mt-4 space-y-3">
          {firma.ablauf.map((s, i) => (
            <li key={s} className="flex items-start gap-3 text-slate-300">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-orange-400">
                {i + 1}
              </span>
              {s}
            </li>
          ))}
        </ol>

        <h2 className="mt-12 text-2xl font-bold text-white">
          Beispielaufgaben zum Üben
        </h2>
        <div className="mt-4 space-y-4">
          {firma.fragen.map((f, i) => (
            <details
              key={f.frage}
              className="group rounded-xl border border-white/10 bg-white/5 p-5"
            >
              <summary className="cursor-pointer font-semibold text-white">
                Aufgabe {i + 1}: {f.frage}
              </summary>
              <ul className="mt-4 space-y-2">
                {f.optionen.map((o, oi) => (
                  <li
                    key={o}
                    className={
                      oi === f.antwort
                        ? "font-semibold text-green-400"
                        : "text-slate-300"
                    }
                  >
                    {String.fromCharCode(65 + oi)}) {o}
                    {oi === f.antwort && " ✓"}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-slate-400">{f.erklaerung}</p>
            </details>
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-bold text-white">
          Tipps für den Testtag
        </h2>
        <ul className="mt-4 space-y-3">
          {firma.tipps.map((t) => (
            <li key={t} className="flex items-start gap-3 text-slate-300">
              <span className="mt-1 text-orange-400">→</span>
              {t}
            </li>
          ))}
        </ul>

        {/* CTA bottom */}
        <div className="mt-12 rounded-2xl border border-orange-400/40 bg-gradient-to-br from-[#FF705B]/15 to-[#FFB457]/15 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">
            Bereit für deinen {firma.name} Test?
          </h2>
          <p className="mt-3 text-slate-300">
            Mit CrackTheTest übst du unbegrenzt mit KI-generierten Aufgaben —
            inklusive sofortiger Auswertung und Schwierigkeitsanalyse.
          </p>
          <Link
            href="/auth/signup"
            className="mt-5 inline-block rounded-full bg-gradient-to-br from-[#FF705B] to-[#FFB457] px-8 py-3 font-bold text-white shadow-lg transition hover:scale-105"
          >
            Jetzt kostenlos üben →
          </Link>
        </div>

        {/* Other companies */}
        <h2 className="mt-12 text-xl font-bold text-white">
          Weitere Eignungstests
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {firmen
            .filter((f) => f.slug !== firma.slug)
            .map((f) => (
              <Link
                key={f.slug}
                href={`/eignungstest/${f.slug}`}
                className="rounded-full border border-white/20 px-4 py-2 text-sm text-slate-300 transition hover:border-white/40 hover:text-white"
              >
                {f.name}
              </Link>
            ))}
        </div>

        <p className="mt-12 text-xs text-slate-600">
          Hinweis: CrackTheTest steht in keiner Verbindung zu {firma.name}. Die
          Übungsaufgaben dienen der allgemeinen Vorbereitung und sind keine
          offiziellen Testinhalte.
        </p>
      </div>
      <Footer />
    </main>
  );
}
