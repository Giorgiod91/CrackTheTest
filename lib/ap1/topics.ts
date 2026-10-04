// AP1 Fachinformatiker – "Einrichten eines IT-gestützten Arbeitsplatzes".
// Public metadata only (safe for client bundles). The question bank itself
// lives in src/server/ap1/questions.ts and is only served via API.

export type TopicSlug =
  | "projektmanagement"
  | "wirtschaftlichkeit"
  | "hardware"
  | "speicher-uebertragung"
  | "energie"
  | "netzwerk"
  | "it-sicherheit"
  | "programmierung"
  | "kunden-qualitaet";

export interface Topic {
  slug: TopicSlug;
  title: string;
  emoji: string;
  short: string;
  /** What typically shows up in the exam for this topic. */
  inhalte: string[];
  /** Relative weight in the AP1, used for the "Prüfungsreife" score. */
  weight: number;
}

export const TOPICS: Topic[] = [
  {
    slug: "netzwerk",
    title: "Netzwerktechnik",
    emoji: "🌐",
    short: "Subnetting, IPv4/IPv6, OSI-Modell, DHCP und DNS",
    inhalte: [
      "Netz- und Broadcastadresse berechnen",
      "Anzahl nutzbarer Hosts, CIDR und Subnetzmaske",
      "IPv6 Adressen kürzen",
      "OSI-Schichten und Netzwerkgeräte zuordnen",
      "DHCP, DNS und private Adressbereiche",
    ],
    weight: 14,
  },
  {
    slug: "wirtschaftlichkeit",
    title: "Angebote & Wirtschaftlichkeit",
    emoji: "💶",
    short: "Angebotsvergleich, Skonto, Nutzwertanalyse, Break-even",
    inhalte: [
      "Bezugspreis mit Rabatt, Skonto und Bezugskosten",
      "Nutzwertanalyse mit gewichteten Kriterien",
      "Break-even-Menge",
      "Kauf oder Leasing vergleichen",
      "Netto, Brutto und Umsatzsteuer",
    ],
    weight: 14,
  },
  {
    slug: "it-sicherheit",
    title: "IT-Sicherheit & Datenschutz",
    emoji: "🔐",
    short: "Schutzziele, Backup, Verschlüsselung, DSGVO, TOM",
    inhalte: [
      "Schutzziele und Schutzbedarfskategorien",
      "Backupstrategien (voll, inkrementell, differenziell, 3-2-1)",
      "Symmetrische und asymmetrische Verschlüsselung",
      "Phishing, Ransomware, Multi-Faktor-Authentifizierung",
      "DSGVO und technisch-organisatorische Maßnahmen",
    ],
    weight: 14,
  },
  {
    slug: "hardware",
    title: "Hardware & Arbeitsplatz",
    emoji: "🖥️",
    short: "RAID, SSD/HDD, Schnittstellen, USV, Ergonomie",
    inhalte: [
      "RAID-Level und nutzbare Kapazität",
      "Speichermedien und Schnittstellen vergleichen",
      "USV-Klassen",
      "Ergonomie am Bildschirmarbeitsplatz",
    ],
    weight: 12,
  },
  {
    slug: "speicher-uebertragung",
    title: "Speicher & Übertragung berechnen",
    emoji: "📦",
    short: "KB vs. KiB, Bildgrößen, Übertragungszeiten",
    inhalte: [
      "Dezimal- und Binärpräfixe (GB vs. GiB)",
      "Speicherbedarf von Bildern, Audio und Video",
      "Übertragungsdauer bei gegebener Bandbreite",
      "Speicherbedarf von Backups",
    ],
    weight: 12,
  },
  {
    slug: "energie",
    title: "Energie & Nachhaltigkeit",
    emoji: "⚡",
    short: "Stromkosten, Einsparung, Amortisation, Green IT",
    inhalte: [
      "Stromkosten pro Jahr berechnen",
      "Einsparung durch effizientere Geräte",
      "Amortisationszeit",
      "Umweltsiegel und ElektroG",
    ],
    weight: 10,
  },
  {
    slug: "programmierung",
    title: "Programmierung & Logik",
    emoji: "🧮",
    short: "Pseudocode, Zahlensysteme, Logik, Tabellenkalkulation",
    inhalte: [
      "Pseudocode und Struktogramme lesen",
      "Binär, Dezimal und Hexadezimal umrechnen",
      "Logische Verknüpfungen auswerten",
      "Datentypen und Arrays",
      "Formeln in der Tabellenkalkulation",
    ],
    weight: 10,
  },
  {
    slug: "projektmanagement",
    title: "Projektmanagement",
    emoji: "📋",
    short: "Netzplan, kritischer Pfad, Lasten- und Pflichtenheft",
    inhalte: [
      "Netzplan: Projektdauer und Puffer",
      "Kritischer Pfad",
      "Magisches Dreieck und SMART-Ziele",
      "Lastenheft vs. Pflichtenheft",
      "Gantt-Diagramm",
    ],
    weight: 8,
  },
  {
    slug: "kunden-qualitaet",
    title: "Kunden, Verträge & Qualität",
    emoji: "🤝",
    short: "Kommunikation, Vertragsarten, Lizenzen, SLA, PDCA",
    inhalte: [
      "Vier-Seiten-Modell und Fragetechniken",
      "Kauf-, Werk- und Dienstvertrag",
      "Softwarelizenzen (OEM, Open Source)",
      "SLA und Verfügbarkeit berechnen",
      "PDCA-Zyklus",
    ],
    weight: 6,
  },
];

export const TOPIC_BY_SLUG: Record<string, Topic | undefined> = Object.fromEntries(
  TOPICS.map((t) => [t.slug, t]),
);

export function isTopicSlug(value: string): value is TopicSlug {
  return value in TOPIC_BY_SLUG;
}

/** AP1 frame data shown on the landing page and in the exam simulation. */
export const AP1_FACTS = {
  dauerMinuten: 90,
  maxPunkte: 100,
  handlungsschritte: 4,
  gewichtung: "20 % der Abschlussprüfung",
};

export const PRICE_EUR = 15;
export const PRICE_LABEL = "15 €";
