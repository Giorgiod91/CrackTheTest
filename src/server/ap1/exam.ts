import "server-only";
import type { Exam } from "@/lib/ap1/types";
import type { TopicSlug } from "@/lib/ap1/topics";
import { QUESTIONS } from "./questions";

// Aufbau wie in der echten AP1: eine Ausgangssituation, 4 Handlungsschritte
// à 25 Punkte, 90 Minuten.
const PARTS: { title: string; situation: string; topics: TopicSlug[] }[] = [
  {
    title: "Arbeitsplätze planen und beschaffen",
    situation:
      "Die Geschäftsleitung möchte zehn neue Arbeitsplätze einrichten. Du holst Angebote ein, vergleichst sie und planst das Projekt.",
    topics: ["wirtschaftlichkeit", "projektmanagement", "kunden-qualitaet"],
  },
  {
    title: "Hardware auswählen und Ressourcen berechnen",
    situation:
      "Für die neuen Arbeitsplätze und den Fileserver müssen Komponenten ausgewählt sowie Speicherbedarf und Energiekosten berechnet werden.",
    topics: ["hardware", "speicher-uebertragung", "energie"],
  },
  {
    title: "Netzwerk einrichten und absichern",
    situation:
      "Die Arbeitsplätze werden in ein eigenes Subnetz eingebunden. Außerdem überarbeitest du das Sicherheits- und Backupkonzept.",
    topics: ["netzwerk", "it-sicherheit"],
  },
  {
    title: "Abläufe automatisieren",
    situation:
      "Ein Kollege hat ein kleines Skript und eine Auswertungstabelle vorbereitet. Du prüfst die Logik und ergänzt fehlende Teile.",
    topics: ["programmierung"],
  },
];

const QUESTIONS_PER_PART = 5;
const POINTS_PER_PART = 25;

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

export function buildExam(): Exam {
  const points = POINTS_PER_PART / QUESTIONS_PER_PART;

  return {
    scenario:
      "Du bist Auszubildende*r bei der NordData IT-Service GmbH, einem IT-Systemhaus mit 45 Mitarbeitenden. Ein Kunde, die Kanzlei Weber & Partner, zieht in neue Büroräume. Du begleitest die Einrichtung der IT-Arbeitsplätze von der Planung bis zur Übergabe.",
    durationMinutes: 90,
    parts: PARTS.map((p, i) => {
      const pool = QUESTIONS.filter((q) => p.topics.includes(q.topic));
      // Round-robin across topics so every part mixes its themes.
      const byTopic = p.topics.map((t) => shuffle(pool.filter((q) => q.topic === t)));
      const picked = [];
      for (let k = 0; picked.length < QUESTIONS_PER_PART && k < pool.length; k++) {
        const q = byTopic[k % byTopic.length]!.shift();
        if (q) picked.push({ ...q, points });
      }
      return { nr: i + 1, title: p.title, situation: p.situation, questions: picked };
    }),
  };
}
