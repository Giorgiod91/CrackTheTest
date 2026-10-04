import React from "react";
import { PRICE_LABEL } from "@/lib/ap1/topics";

export const FAQ = [
  {
    q: "Für wen ist AP1 Ready?",
    a: "Für alle Azubis, die Teil 1 der gestreckten Abschlussprüfung schreiben: Fachinformatiker für Anwendungsentwicklung, Systemintegration, Daten- und Prozessanalyse und Digitale Vernetzung. Die AP1 ist für alle Fachrichtungen gleich.",
  },
  {
    q: "Wie ist die AP1 aufgebaut?",
    a: "90 Minuten, eine durchgehende Ausgangssituation, vier Handlungsschritte mit zusammen 100 Punkten. Das Ergebnis zählt 20 % der Gesamtnote. Genau so ist auch unsere Prüfungssimulation aufgebaut.",
  },
  {
    q: `Was bekomme ich für ${PRICE_LABEL}?`,
    a: "Alle neun AP1-Themen mit Erklärungen und Prüfungstipps, unbegrenzt viele Prüfungssimulationen mit Note nach IHK-Schlüssel, deinen persönlichen Fortschritt pro Thema und unbegrenzte KI-Zusatzaufgaben. Einmal zahlen, kein Abo.",
  },
  {
    q: "Kann ich mir vorher Aufgaben ansehen?",
    a: "Ja. Auf den Themenseiten unter /ap1 findest du zu jedem Thema Beispielaufgaben mit Lösung und Prüfungstipp. So siehst du genau, wie die Aufgaben aufgebaut sind, bevor du kaufst.",
  },
  {
    q: "Sind das echte IHK-Prüfungsaufgaben?",
    a: "Nein. Die Original-Prüfungen sind urheberrechtlich geschützt. Alle Aufgaben hier sind selbst erstellt und orientieren sich an den Aufgabentypen, die in der AP1 regelmäßig vorkommen.",
  },
];

export default function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-6">
      <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">Häufige Fragen</h2>
      <div className="mt-10 space-y-3">
        {FAQ.map((f) => (
          <details key={f.q} className="group rounded-2xl border border-orange-100 bg-white p-5 shadow-sm dark:bg-white/5">
            <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
              {f.q}
              <span className="ml-4 text-orange-500 transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{f.a}</p>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </section>
  );
}
