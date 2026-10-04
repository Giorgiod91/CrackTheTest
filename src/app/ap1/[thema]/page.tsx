import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TOPICS, TOPIC_BY_SLUG, PRICE_LABEL, isTopicSlug } from "@/lib/ap1/topics";
import { formatSolution } from "@/lib/ap1/types";
import { SITE } from "@/lib/site";
import { questionsForTopic } from "~/server/ap1/questions";
import Footer from "~/app/_components/Footer";

const SAMPLE_COUNT = 2;

export function generateStaticParams() {
  return TOPICS.map((t) => ({ thema: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ thema: string }>;
}): Promise<Metadata> {
  const { thema } = await params;
  const t = TOPIC_BY_SLUG[thema];
  if (!t) return {};
  return {
    title: `AP1 ${t.title}: Aufgaben, Lösungen & Prüfungstipps`,
    description: `${t.title} für die AP1 Fachinformatiker üben: ${t.short}. Beispielaufgaben mit Rechenweg und Tipps von jemandem, der die Prüfung bestanden hat.`,
    alternates: { canonical: `${SITE.url}/ap1/${t.slug}` },
  };
}

export default async function Ap1TopicPage({
  params,
}: {
  params: Promise<{ thema: string }>;
}) {
  const { thema } = await params;
  if (!isTopicSlug(thema)) notFound();
  const t = TOPIC_BY_SLUG[thema]!;
  const all = questionsForTopic(thema);
  const samples = all.slice(0, SAMPLE_COUNT);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <article className="mx-auto max-w-3xl px-6 py-12">
        <nav className="mb-8 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-300">Startseite</Link>
          {" / "}
          <Link href="/ap1" className="hover:text-slate-300">AP1-Themen</Link>
          {" / "}
          <span className="text-slate-300">{t.title}</span>
        </nav>

        <span className="text-4xl">{t.emoji}</span>
        <h1 className="mt-3 text-3xl font-extrabold text-white md:text-4xl">AP1 {t.title}</h1>
        <p className="mt-4 leading-relaxed text-slate-300">{t.short}. Das wird in der AP1 typischerweise abgefragt:</p>
        <ul className="mt-4 space-y-2 text-slate-300">
          {t.inhalte.map((i) => (
            <li key={i} className="flex gap-2"><span className="text-orange-400">✓</span>{i}</li>
          ))}
        </ul>

        <h2 className="mt-12 text-2xl font-bold text-white">Beispielaufgaben mit Lösung</h2>
        <div className="mt-6 space-y-6">
          {samples.map((q, i) => (
            <section key={q.id} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs font-semibold tracking-wider text-orange-400 uppercase">Aufgabe {i + 1}</p>
              <p className="mt-2 font-semibold text-white">{q.prompt}</p>
              {q.code && (
                <pre className="mt-3 overflow-x-auto rounded-xl bg-black/30 p-4 font-mono text-xs text-orange-100/90">{q.code}</pre>
              )}
              {q.kind === "mc" && (
                <ol className="mt-3 space-y-1 text-sm text-slate-300">
                  {q.options.map((o, k) => <li key={k}>{String.fromCharCode(65 + k)}) {o}</li>)}
                </ol>
              )}
              <details className="mt-4 rounded-xl bg-white/5 p-4">
                <summary className="cursor-pointer text-sm font-semibold text-emerald-300">Lösung anzeigen</summary>
                <p className="mt-2 text-sm font-semibold text-white">Lösung: {formatSolution(q)}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">{q.explanation}</p>
                {q.tipp && <p className="mt-3 text-sm text-orange-200">💡 Prüfungstipp: {q.tipp}</p>}
              </details>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-orange-400/40 bg-gradient-to-br from-[#FF705B]/15 to-[#FFB457]/15 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">
            {all.length - samples.length} weitere Aufgaben zu {t.title}
          </h2>
          <p className="mt-3 text-slate-300">
            Mit Fortschrittsanzeige, Prüfungstipps und 90-Minuten-Simulation. Alles für {PRICE_LABEL} einmalig, kein Abo.
          </p>
          <Link
            href="/auth/signup"
            className="mt-5 inline-block rounded-full bg-gradient-to-br from-[#FF705B] to-[#FFB457] px-8 py-3 font-bold text-white shadow-lg transition hover:scale-105"
          >
            Für {PRICE_LABEL} freischalten →
          </Link>
        </div>
      </article>
      <Footer />
    </main>
  );
}
