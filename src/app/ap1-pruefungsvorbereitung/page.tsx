import { type Metadata } from "next";
import Link from "next/link";
import { TOPICS, AP1_FACTS, PRICE_LABEL } from "@/lib/ap1/topics";
import { SITE, AUTHOR } from "@/lib/site";
import Footer from "~/app/_components/Footer";

const PATH = "/ap1-pruefungsvorbereitung";

export const metadata: Metadata = {
  title: "AP1 Prüfungsvorbereitung Fachinformatiker: Lernplan, Themen & Tipps",
  description:
    "So bereitest du dich auf die AP1 Fachinformatiker vor: Aufbau der Prüfung, alle Themen, 4-Wochen-Lernplan, typische Fehler und Tipps von jemandem, der die AP1 bestanden hat.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title: "AP1 Prüfungsvorbereitung Fachinformatiker: Lernplan, Themen & Tipps",
    url: `${SITE.url}${PATH}`,
    type: "article",
  },
};

const LERNPLAN = [
  {
    woche: "Woche 1",
    titel: "Stand ermitteln & Rechenthemen",
    text: "Eine Probeprüfung schreiben, ohne vorher zu lernen. Danach weißt du, wo du stehst. Den Rest der Woche Rechenaufgaben: Bezugspreis, Speicher und Übertragung, Stromkosten. Die bringen sichere Punkte.",
  },
  {
    woche: "Woche 2",
    titel: "Netzwerk & IT-Sicherheit",
    text: "Subnetting so lange üben, bis Netz- und Broadcastadresse in unter einer Minute sitzen. Dazu Schutzziele, Backupstrategien, Verschlüsselung und DSGVO.",
  },
  {
    woche: "Woche 3",
    titel: "Hardware, Projekt & Kunden",
    text: "RAID, USV, Schnittstellen, Netzplan mit Puffern, Lasten- vs. Pflichtenheft, Vertragsarten und Lizenzen. Viel davon ist Auswendiglernen, also gut für kurze Einheiten.",
  },
  {
    woche: "Woche 4",
    titel: "Simulationen & Schwächen",
    text: "Zwei bis drei komplette 90-Minuten-Simulationen unter Zeitdruck. Nach jeder Simulation die falschen Aufgaben gezielt im jeweiligen Thema wiederholen.",
  },
];

const FEHLER = [
  { titel: "MB und MiB verwechseln", text: "Dezimal (1000) und binär (1024) sauber trennen. Die Aufgabe sagt fast immer, welches gemeint ist." },
  { titel: "Bit und Byte verwechseln", text: "Leitungen werden in Bit/s angegeben, Dateien in Byte. Ohne den Faktor 8 ist das Ergebnis falsch." },
  { titel: "Rabatt und Skonto in falscher Reihenfolge", text: "Erst Rabatt, dann Skonto, dann Bezugskosten. Wer die Reihenfolge tauscht, verliert Punkte." },
  { titel: "Watt nicht in Kilowatt umrechnen", text: "Strompreise sind pro kWh. Erst durch 1000 teilen, dann mit Stunden und Preis multiplizieren." },
  { titel: "Rechenweg weglassen", text: "Bei offenen Aufgaben gibt es Teilpunkte für einen nachvollziehbaren Rechenweg, auch wenn das Endergebnis falsch ist." },
  { titel: "Zu lange an einer Aufgabe hängen", text: "Bei 90 Minuten für 100 Punkte hast du knapp eine Minute pro Punkt. Unklare Aufgaben markieren und später zurückkommen." },
];

const FAQ = [
  {
    q: "Wie lange sollte ich für die AP1 lernen?",
    a: "Die meisten kommen mit vier bis sechs Wochen gezielter Vorbereitung gut hin, wenn sie täglich 30 bis 60 Minuten üben. Wichtiger als die Dauer ist, die Aufgabentypen wirklich gerechnet zu haben.",
  },
  {
    q: "Wann findet die AP1 statt?",
    a: "Die AP1 wird bundesweit im Frühjahr und im Herbst geschrieben, meist in der Mitte der Ausbildung. Den genauen Termin bekommst du von deiner IHK.",
  },
  {
    q: "Welche Hilfsmittel sind in der AP1 erlaubt?",
    a: "In der Regel ein nicht programmierbarer Taschenrechner. Welche Hilfsmittel genau zugelassen sind, steht in der Hilfsmittelliste deiner IHK.",
  },
  {
    q: "Ist die AP1 für alle Fachinformatiker gleich?",
    a: "Ja. Anwendungsentwicklung, Systemintegration, Daten- und Prozessanalyse und Digitale Vernetzung schreiben dieselbe AP1 zum Thema Einrichten eines IT-gestützten Arbeitsplatzes.",
  },
  {
    q: "Was passiert, wenn ich die AP1 nicht bestehe?",
    a: "Die AP1 kann nicht einzeln wiederholt werden, das Ergebnis fließt mit 20 % in die Gesamtnote ein. Ein schwaches Ergebnis musst du also in der AP2 ausgleichen. Umso wichtiger ist eine gute Vorbereitung.",
  },
];

export default function PruefungsvorbereitungPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "AP1 Prüfungsvorbereitung Fachinformatiker: Lernplan, Themen & Tipps",
      author: { "@type": "Person", name: AUTHOR.name },
      publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
      mainEntityOfPage: `${SITE.url}${PATH}`,
      inLanguage: "de-DE",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Startseite", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "AP1 Prüfungsvorbereitung", item: `${SITE.url}${PATH}` },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="mx-auto max-w-3xl px-6 py-12 text-slate-300">
        <nav className="mb-8 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-300">Startseite</Link>
          {" / "}
          <span className="text-slate-300">AP1 Prüfungsvorbereitung</span>
        </nav>

        <h1 className="text-3xl font-extrabold text-white md:text-5xl">
          AP1 Prüfungsvorbereitung für Fachinformatiker
        </h1>
        <p className="mt-5 text-lg leading-relaxed">
          Die AP1 ist der erste Teil deiner gestreckten Abschlussprüfung und zählt {AP1_FACTS.gewichtung}.
          Hier erfährst du, wie die Prüfung aufgebaut ist, welche Themen drankommen, wie du dich in vier
          Wochen strukturiert vorbereitest und welche Fehler die meisten Punkte kosten. Geschrieben von{" "}
          {AUTHOR.name}, {AUTHOR.role}, AP1 {AUTHOR.ap1Result}.
        </p>

        <h2 className="mt-12 text-2xl font-bold text-white">So ist die AP1 aufgebaut</h2>
        <ul className="mt-4 space-y-2">
          <li>⏱️ <strong className="text-white">{AP1_FACTS.dauerMinuten} Minuten</strong> Bearbeitungszeit</li>
          <li>📝 <strong className="text-white">{AP1_FACTS.handlungsschritte} Handlungsschritte</strong> mit zusammen {AP1_FACTS.maxPunkte} Punkten, alle sind zu bearbeiten</li>
          <li>🏢 Eine durchgehende <strong className="text-white">Ausgangssituation</strong>, meist ein Unternehmen, das neue IT-Arbeitsplätze einrichtet</li>
          <li>🎓 Thema: <strong className="text-white">„Einrichten eines IT-gestützten Arbeitsplatzes“</strong>, gleich für alle Fachrichtungen</li>
          <li>📊 Bewertung nach dem IHK-Notenschlüssel, ab 50 Punkten ausreichend</li>
        </ul>

        <h2 className="mt-12 text-2xl font-bold text-white">Diese Themen musst du für die AP1 können</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {TOPICS.map((t) => (
            <Link
              key={t.slug}
              href={`/ap1/${t.slug}`}
              className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-orange-400/50"
            >
              <p className="font-semibold text-white">{t.emoji} {t.title}</p>
              <p className="mt-1 text-sm text-slate-400">{t.short}</p>
            </Link>
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-bold text-white">Lernplan: AP1 in 4 Wochen vorbereiten</h2>
        <div className="mt-5 space-y-4">
          {LERNPLAN.map((w) => (
            <section key={w.woche} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-bold tracking-wider text-orange-400 uppercase">{w.woche}</p>
              <h3 className="mt-1 text-lg font-semibold text-white">{w.titel}</h3>
              <p className="mt-2 leading-relaxed">{w.text}</p>
            </section>
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-bold text-white">Die 6 häufigsten Fehler in der AP1</h2>
        <ol className="mt-5 space-y-4">
          {FEHLER.map((f, i) => (
            <li key={f.titel} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500/20 font-bold text-orange-300">{i + 1}</span>
              <div>
                <h3 className="font-semibold text-white">{f.titel}</h3>
                <p className="mt-1 leading-relaxed">{f.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <h2 className="mt-12 text-2xl font-bold text-white">Häufige Fragen zur AP1</h2>
        <div className="mt-5 space-y-3">
          {FAQ.map((f) => (
            <details key={f.q} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <summary className="cursor-pointer font-semibold text-white">{f.q}</summary>
              <p className="mt-2 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-orange-400/40 bg-gradient-to-br from-[#FF705B]/15 to-[#FFB457]/15 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">Deine AP1 Prüfungsvorbereitung an einem Ort</h2>
          <p className="mt-3">
            Alle Themen mit Rechenwegen und Prüfungstipps, Fortschritt pro Thema, Notenprognose und
            unbegrenzte 90-Minuten-Simulationen. {PRICE_LABEL} einmalig, kein Abo.
          </p>
          <Link
            href="/ManageSubscription"
            className="mt-5 inline-block rounded-full bg-gradient-to-br from-[#FF705B] to-[#FFB457] px-8 py-3 font-bold text-white shadow-lg transition hover:scale-105"
          >
            AP1 Ready für {PRICE_LABEL} freischalten →
          </Link>
        </div>
      </article>
      <Footer />
    </main>
  );
}
