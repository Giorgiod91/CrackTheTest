export type BeispielFrage = {
  frage: string;
  optionen: string[];
  antwort: number;
  erklaerung: string;
};

export type FirmaEintrag = {
  slug: string;
  name: string;
  titel: string;
  beschreibung: string;
  intro: string[];
  themen: string[];
  ablauf: string[];
  tipps: string[];
  fragen: BeispielFrage[];
};

const logikFrage: BeispielFrage = {
  frage: "Setze die Zahlenreihe fort: 3, 6, 12, 24, ...",
  optionen: ["36", "40", "48", "56"],
  antwort: 2,
  erklaerung:
    "Jede Zahl wird verdoppelt: 3 → 6 → 12 → 24 → 48. Zahlenreihen mit Verdopplung gehören zu den häufigsten Aufgaben in Eignungstests.",
};

const prozentFrage: BeispielFrage = {
  frage:
    "Ein Bauteil kostet 80€. Der Preis steigt um 15%. Wie viel kostet es danach?",
  optionen: ["92€", "95€", "88€", "90€"],
  antwort: 0,
  erklaerung:
    "15% von 80€ sind 12€. 80€ + 12€ = 92€. Prozentrechnung kommt in fast jedem Einstellungstest vor.",
};

const wuerfelFrage: BeispielFrage = {
  frage:
    "Welches Wort passt nicht in die Reihe: Schraube, Nagel, Dübel, Hammer?",
  optionen: ["Schraube", "Nagel", "Dübel", "Hammer"],
  antwort: 3,
  erklaerung:
    "Schraube, Nagel und Dübel sind Befestigungsmittel — der Hammer ist ein Werkzeug. Solche Kategorisierungsaufgaben testen logisches Denken.",
};

export const firmen: FirmaEintrag[] = [
  {
    slug: "vw",
    name: "VW (Volkswagen)",
    titel: "VW Eignungstest üben – Ablauf, Aufgaben & Übungstest (2026)",
    beschreibung:
      "Bereite dich auf den VW Einstellungstest für die Ausbildung vor: Ablauf, typische Aufgaben aus Mathe, Logik und Technik – plus kostenlose Beispielaufgaben zum Üben.",
    intro: [
      "Volkswagen gehört zu den beliebtesten Ausbildungsbetrieben Deutschlands – auf einen Ausbildungsplatz kommen oft weit über zehn Bewerber. Der Eignungstest ist deshalb die entscheidende Hürde: Wer hier gut abschneidet, wird zum Vorstellungsgespräch eingeladen.",
      "Der VW-Auswahltest läuft in der Regel als Online-Test ab und prüft Mathematik, logisches Denken, technisches Verständnis und Konzentration. Die gute Nachricht: Alle Aufgabentypen lassen sich gezielt trainieren – und genau dafür ist diese Seite da.",
    ],
    themen: [
      "Mathematik: Grundrechenarten, Prozentrechnung, Dreisatz, Einheiten umrechnen",
      "Logisches Denken: Zahlenreihen, Analogien, Matrizen",
      "Technisches Verständnis: Zahnräder, Hebel, Schaltpläne (v.a. bei technischen Berufen)",
      "Konzentration: Zeichen zählen, Fehler finden unter Zeitdruck",
      "Deutsch: Rechtschreibung und Textverständnis",
    ],
    ablauf: [
      "Online-Bewerbung über das VW-Karriereportal",
      "Einladung zum Online-Eignungstest (ca. 60–90 Minuten)",
      "Bei gutem Ergebnis: Einladung zum Auswahltag mit Vorstellungsgespräch",
      "Je nach Beruf: praktische Übungen oder Assessment-Center",
    ],
    tipps: [
      "Übe unter Zeitdruck – im echten Test hast du pro Aufgabe oft unter einer Minute.",
      "Trainiere Kopfrechnen ohne Taschenrechner, der ist meist nicht erlaubt.",
      "Bei technischen Berufen: Zahnrad- und Hebelaufgaben gezielt üben.",
      "Mache den Test ausgeruht und ungestört – ein Durchlauf, keine zweite Chance.",
    ],
    fragen: [logikFrage, prozentFrage, wuerfelFrage],
  },
  {
    slug: "continental",
    name: "Continental",
    titel: "Continental Eignungstest üben – so bestehst du den Auswahltest",
    beschreibung:
      "Continental Einstellungstest für die Ausbildung: Was wird geprüft, wie läuft der Test ab und wie bereitest du dich am besten vor? Mit kostenlosen Übungsaufgaben.",
    intro: [
      "Continental bildet an Standorten wie Hannover in vielen technischen und kaufmännischen Berufen aus. Vor dem Vorstellungsgespräch steht ein Online-Auswahltest, der die Bewerber vergleichbar macht.",
      "Geprüft werden vor allem logisches Denken, Mathematik und – je nach Ausbildungsberuf – technisches Verständnis. Wer die Aufgabentypen vorher kennt und geübt hat, ist klar im Vorteil.",
    ],
    themen: [
      "Zahlenreihen und logische Schlussfolgerungen",
      "Mathematik: Prozentrechnung, Dreisatz, Textaufgaben",
      "Technisches Verständnis bei gewerblich-technischen Berufen",
      "Konzentrations- und Merkfähigkeit",
      "Englisch-Grundkenntnisse bei kaufmännischen Berufen",
    ],
    ablauf: [
      "Online-Bewerbung über das Continental-Karriereportal",
      "Online-Assessment von zu Hause aus",
      "Auswahltag mit Interview und ggf. praktischen Aufgaben",
    ],
    tipps: [
      "Lies jede Aufgabe genau – Flüchtigkeitsfehler kosten die meisten Punkte.",
      "Übe Zahlenreihen, bis du die gängigen Muster (Addition, Multiplikation, alternierend) sofort erkennst.",
      "Bereite eine ruhige Testumgebung vor: stabiles Internet, keine Unterbrechungen.",
    ],
    fragen: [logikFrage, prozentFrage, wuerfelFrage],
  },
  {
    slug: "ausbildung",
    name: "Ausbildung (allgemein)",
    titel: "Einstellungstest für die Ausbildung üben – kostenlose Übungsaufgaben",
    beschreibung:
      "Einstellungstest für die Ausbildung 2026: typische Aufgaben aus Mathe, Logik, Deutsch und Konzentration – kostenlos üben mit KI-generierten Tests.",
    intro: [
      "Fast jedes größere Unternehmen nutzt heute einen Einstellungstest, um Bewerber für Ausbildungsplätze auszuwählen. Die Tests unterscheiden sich im Detail, prüfen aber fast immer dieselben Grundfähigkeiten.",
      "Das Beste daran: Genau deshalb kannst du dich hervorragend vorbereiten. Wer die typischen Aufgabenformate kennt, verliert im Test keine Zeit mit Verstehen der Aufgabenstellung – und schneidet messbar besser ab.",
    ],
    themen: [
      "Mathematik: Grundrechenarten, Prozent- und Bruchrechnung, Dreisatz",
      "Logik: Zahlenreihen, Sprachanalogien, Figurenreihen",
      "Deutsch: Rechtschreibung, Grammatik, Textverständnis",
      "Konzentration und Merkfähigkeit",
      "Allgemeinwissen (je nach Unternehmen)",
    ],
    ablauf: [
      "Bewerbung mit Anschreiben, Lebenslauf und Zeugnissen",
      "Einladung zum Online-Test oder Testtag vor Ort",
      "Vorstellungsgespräch bei gutem Testergebnis",
    ],
    tipps: [
      "Starte mindestens 2–3 Wochen vor dem Test mit der Vorbereitung.",
      "Übe täglich 20–30 Minuten statt einmal stundenlang – das bringt mehr.",
      "Simuliere den Ernstfall: kompletter Test am Stück, mit Timer.",
    ],
    fragen: [logikFrage, prozentFrage, wuerfelFrage],
  },
  {
    slug: "deutsche-bahn",
    name: "Deutsche Bahn",
    titel: "Deutsche Bahn Einstellungstest üben – Aufgaben & Vorbereitung",
    beschreibung:
      "DB Einstellungstest für Ausbildung und Quereinstieg: Ablauf, typische Aufgaben und die beste Vorbereitung – mit kostenlosen Beispielaufgaben.",
    intro: [
      "Die Deutsche Bahn stellt jedes Jahr tausende Azubis und Quereinsteiger ein – vom Lokführer über Elektroniker bis zur Fachkraft im Fahrbetrieb. Zum Auswahlverfahren gehört ein Eignungstest, bei sicherheitsrelevanten Berufen zusätzlich eine psychologische Eignungsuntersuchung.",
      "Der Test prüft Konzentration, Merkfähigkeit, logisches Denken und Mathematik. Gerade die Konzentrationstests unter Zeitdruck unterschätzen viele Bewerber – sie sind aber gut trainierbar.",
    ],
    themen: [
      "Konzentrationstests: Zeichen vergleichen, Fehler finden unter Zeitdruck",
      "Merkfähigkeit: Zahlen, Wege und Signale einprägen",
      "Mathematik: Grundrechenarten, Dreisatz, Einheiten",
      "Logisches Denken: Zahlenreihen und Schlussfolgerungen",
      "Technisches Verständnis bei technischen Berufen",
    ],
    ablauf: [
      "Online-Bewerbung über das DB-Karriereportal",
      "Online-Test oder Testtag im Auswahlzentrum",
      "Bei sicherheitsrelevanten Berufen: psychologische Untersuchung",
      "Vorstellungsgespräch und ggf. ärztliche Untersuchung",
    ],
    tipps: [
      "Trainiere Konzentrationsaufgaben unter echtem Zeitdruck – das ist der Kern des DB-Tests.",
      "Schlafe vor dem Testtag ausreichend – Konzentrationstests bestrafen Müdigkeit sofort.",
      "Bei Lokführer-Berufen: Merkfähigkeitsübungen (Zahlenfolgen, Wegbeschreibungen) einbauen.",
    ],
    fragen: [logikFrage, prozentFrage, wuerfelFrage],
  },
  {
    slug: "polizei",
    name: "Polizei",
    titel: "Polizei Eignungstest üben – schriftlicher Test & Vorbereitung",
    beschreibung:
      "Polizei Einstellungstest: Diktat, Logik, Konzentration und Allgemeinwissen üben. So bereitest du dich auf den schriftlichen Auswahltest vor.",
    intro: [
      "Der Weg zur Polizei führt über ein mehrstufiges Auswahlverfahren – und der schriftliche Eignungstest ist die erste große Hürde, an der die meisten Bewerber scheitern.",
      "Je nach Bundesland unterscheiden sich die Tests, aber Rechtschreibung (oft als Diktat), logisches Denken, Konzentration und Allgemeinwissen sind fast überall dabei. Mit gezieltem Training lässt sich jeder dieser Bereiche deutlich verbessern.",
    ],
    themen: [
      "Deutsch: Diktat, Rechtschreibung, Grammatik, Textverständnis",
      "Logisches Denken: Zahlenreihen, Sprachanalogien, Schlussfolgerungen",
      "Konzentration und Merkfähigkeit unter Zeitdruck",
      "Allgemeinwissen: Politik, Gesellschaft, Geografie",
      "Mathematik: Grundrechenarten und Textaufgaben",
    ],
    ablauf: [
      "Online-Bewerbung bei der Polizei des Bundeslandes",
      "Schriftlicher Eignungstest (oft am Computer)",
      "Sporttest und ärztliche Untersuchung",
      "Mündliches Auswahlverfahren / Interview",
    ],
    tipps: [
      "Rechtschreibung ist das häufigste K.-o.-Kriterium – übe Diktate und Kommaregeln.",
      "Verfolge aktuelle Nachrichten – Allgemeinwissen wird oft tagesaktuell geprüft.",
      "Informiere dich über die Besonderheiten deines Bundeslandes, die Tests unterscheiden sich.",
    ],
    fragen: [logikFrage, prozentFrage, wuerfelFrage],
  },
  {
    slug: "bundeswehr",
    name: "Bundeswehr",
    titel: "Bundeswehr Einstellungstest üben – CAT-Test Vorbereitung",
    beschreibung:
      "Bundeswehr Eignungstest (CAT-Test) üben: Aufgaben aus Logik, Mathe, Deutsch und Konzentration – mit kostenlosen Beispielaufgaben vorbereiten.",
    intro: [
      "Wer zur Bundeswehr will – ob als Soldat oder Zivilangestellter – durchläuft ein Assessment im Karrierecenter. Herzstück ist der computergestützte CAT-Test (Computer-Assistiertes Testen).",
      "Der Test passt die Schwierigkeit dynamisch an deine Antworten an. Geprüft werden logisches Denken, Mathematik, Deutsch, Konzentration und technisches Verständnis. Eine gezielte Vorbereitung auf die Aufgabentypen zahlt sich hier besonders aus.",
    ],
    themen: [
      "Logisches Denken: Matrizen, Zahlenreihen, Figurenfolgen",
      "Mathematik: Grundrechenarten, Prozent, Klammerrechnung",
      "Deutsch: Rechtschreibung und Wortschatz",
      "Konzentration und Reaktionsfähigkeit",
      "Technisches und physikalisches Grundverständnis",
    ],
    ablauf: [
      "Bewerbung und Einladung ins Karrierecenter der Bundeswehr",
      "CAT-Test am Computer (mehrere Stunden, mit Pausen)",
      "Ärztliche Untersuchung und Sporttest",
      "Abschlussgespräch mit Einplanung",
    ],
    tipps: [
      "Der CAT-Test wird schwerer, je besser du antwortest – lass dich davon nicht verunsichern.",
      "Übe Matrizen- und Figurenaufgaben, die sind für viele ungewohnt.",
      "Plane den ganzen Tag ein und komm ausgeruht – das Assessment dauert mehrere Stunden.",
    ],
    fragen: [logikFrage, prozentFrage, wuerfelFrage],
  },
  {
    slug: "bosch",
    name: "Bosch",
    titel: "Bosch Eignungstest üben – Auswahltest für die Ausbildung",
    beschreibung:
      "Bosch Einstellungstest für die Ausbildung: Ablauf, geprüfte Themen und die beste Vorbereitung – inklusive kostenloser Übungsaufgaben.",
    intro: [
      "Bosch gehört zu den größten Ausbildern Deutschlands und setzt im Auswahlverfahren auf einen Online-Test, bevor Bewerber zum Auswahltag eingeladen werden.",
      "Geprüft werden – abhängig vom Ausbildungsberuf – logisches Denken, Mathematik, technisches Verständnis und Konzentrationsfähigkeit. Die Aufgabentypen sind bekannt und lassen sich gezielt trainieren.",
    ],
    themen: [
      "Logisches Denken: Zahlenreihen, Analogien, räumliches Vorstellungsvermögen",
      "Mathematik: Prozentrechnung, Dreisatz, Einheiten",
      "Technisches Verständnis: Mechanik- und Elektrotechnik-Grundlagen",
      "Konzentration unter Zeitdruck",
    ],
    ablauf: [
      "Online-Bewerbung über das Bosch-Karriereportal",
      "Online-Eignungstest von zu Hause",
      "Auswahltag mit Interview und praktischen Übungen",
    ],
    tipps: [
      "Bei technischen Berufen: Physik-Grundlagen (Hebel, Zahnräder, Stromkreise) auffrischen.",
      "Übe räumliches Denken mit Würfel- und Faltaufgaben.",
      "Zeitmanagement üben: lieber eine schwere Aufgabe überspringen als festhängen.",
    ],
    fragen: [logikFrage, prozentFrage, wuerfelFrage],
  },
];

export function getFirma(slug: string): FirmaEintrag | undefined {
  return firmen.find((f) => f.slug === slug);
}
