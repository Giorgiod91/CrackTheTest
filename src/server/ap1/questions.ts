import "server-only";
import type { Question } from "@/lib/ap1/types";
import type { TopicSlug } from "@/lib/ap1/topics";
import { PRUEFUNGSNAHE_QUESTIONS } from "./questions-pruefungsnah";

// Kuratierte AP1-Fragenbank. IDs niemals ändern: Fortschritt wird pro ID gespeichert.
// MC-Fragen werden mit der richtigen Antwort an Index 0 notiert und unten gemischt.
const BASE_QUESTIONS: Question[] = [
  // ── Netzwerktechnik ────────────────────────────────────────────────────────
  {
    id: "nw-01", topic: "netzwerk", level: 1, kind: "number",
    prompt: "Wie viele nutzbare Hostadressen stehen in einem /26-Netz zur Verfügung?",
    answer: 62,
    explanation: "/26 lässt 32 − 26 = 6 Hostbits übrig: 2⁶ = 64 Adressen. Netz- und Broadcastadresse abziehen: 64 − 2 = 62.",
    tipp: "Merk dir die Reihe 2, 6, 14, 30, 62, 126, 254 für /30 bis /24. Spart in der Prüfung jedes Mal eine Minute.",
  },
  {
    id: "nw-02", topic: "netzwerk", level: 2, kind: "mc",
    prompt: "Wie lautet die Netzadresse des Hosts 192.168.10.77/27?",
    options: ["192.168.10.64", "192.168.10.77", "192.168.10.32", "192.168.10.95"],
    correct: 0,
    explanation: "/27 → Blockgröße 32 im letzten Oktett (0, 32, 64, 96 …). 77 liegt im Block 64–95, also ist 192.168.10.64 die Netzadresse.",
    tipp: "Blockgröße = 256 − letzter Maskenwert (/27 → 255.255.255.224 → 256 − 224 = 32). Dann einfach in Blöcken zählen.",
  },
  {
    id: "nw-03", topic: "netzwerk", level: 2, kind: "mc",
    prompt: "Wie lautet die Broadcastadresse von 172.16.5.130/25?",
    options: ["172.16.5.255", "172.16.5.127", "172.16.5.128", "172.16.5.254"],
    correct: 0,
    explanation: "/25 → Blockgröße 128. 130 liegt im Block 128–255. Die letzte Adresse des Blocks, 172.16.5.255, ist der Broadcast.",
  },
  {
    id: "nw-04", topic: "netzwerk", level: 1, kind: "mc",
    prompt: "Welche Subnetzmaske entspricht dem Präfix /22?",
    options: ["255.255.252.0", "255.255.255.252", "255.255.248.0", "255.255.254.0"],
    correct: 0,
    explanation: "/22 = 8 + 8 + 6 Einsen. Sechs Einsen im dritten Oktett: 11111100 = 252 → 255.255.252.0.",
  },
  {
    id: "nw-05", topic: "netzwerk", level: 1, kind: "mc",
    prompt: "Auf welcher OSI-Schicht arbeitet ein klassischer Router?",
    options: ["Schicht 3 – Vermittlungsschicht", "Schicht 2 – Sicherungsschicht", "Schicht 1 – Bitübertragungsschicht", "Schicht 4 – Transportschicht"],
    correct: 0,
    explanation: "Router leiten anhand von IP-Adressen weiter, das ist Schicht 3. Switches arbeiten mit MAC-Adressen auf Schicht 2, Hubs auf Schicht 1.",
    tipp: "Eselsbrücke von unten: „Please Do Not Throw Salami Pizza Away“ (Physical, Data Link, Network, Transport, Session, Presentation, Application).",
  },
  {
    id: "nw-06", topic: "netzwerk", level: 1, kind: "mc",
    prompt: "In welcher Reihenfolge laufen die DHCP-Nachrichten bei einer neuen Adressvergabe ab?",
    options: ["Discover, Offer, Request, Acknowledge", "Request, Offer, Discover, Acknowledge", "Discover, Request, Offer, Acknowledge", "Offer, Discover, Acknowledge, Request"],
    correct: 0,
    explanation: "DORA: Client sucht (Discover), Server bietet an (Offer), Client fordert an (Request), Server bestätigt (Acknowledge).",
  },
  {
    id: "nw-07", topic: "netzwerk", level: 1, kind: "number",
    prompt: "Wie viele Bit umfasst eine IPv6-Adresse?",
    answer: 128, unit: "Bit",
    explanation: "IPv6 nutzt 128 Bit, dargestellt als 8 Blöcke à 16 Bit in Hexadezimal. IPv4 hat 32 Bit.",
  },
  {
    id: "nw-08", topic: "netzwerk", level: 2, kind: "mc",
    prompt: "Welche Schreibweise ist die korrekte Kurzform von 2001:0db8:0000:0000:0000:ff00:0042:8329?",
    options: ["2001:db8::ff00:42:8329", "2001:db8:::ff00:42:8329", "2001:db8::ff00::42:8329", "2001:db8:0:ff00:42:8329"],
    correct: 0,
    explanation: "Führende Nullen je Block dürfen weg, und genau EINE zusammenhängende Gruppe von Null-Blöcken darf durch :: ersetzt werden.",
    tipp: "Zwei Mal :: in einer Adresse ist immer falsch. Das ist eine beliebte Falle in der Auswahlantwort.",
  },
  {
    id: "nw-09", topic: "netzwerk", level: 2, kind: "mc",
    prompt: "Welche der folgenden Adressen ist eine private IPv4-Adresse nach RFC 1918?",
    options: ["10.200.3.4", "172.32.0.5", "192.169.1.1", "100.64.0.1"],
    correct: 0,
    explanation: "Private Bereiche: 10.0.0.0/8, 172.16.0.0/12 (172.16 bis 172.31) und 192.168.0.0/16. 172.32 und 192.169 liegen knapp daneben, 100.64.0.0/10 ist Carrier-Grade-NAT.",
  },
  {
    id: "nw-10", topic: "netzwerk", level: 1, kind: "mc",
    prompt: "Welche Aufgabe übernimmt DNS?",
    options: ["Auflösung von Hostnamen in IP-Adressen", "Automatische Vergabe von IP-Adressen", "Verschlüsselung des Datenverkehrs", "Zuordnung von IP-Adressen zu MAC-Adressen"],
    correct: 0,
    explanation: "DNS übersetzt Namen wie www.example.de in IP-Adressen. Adressvergabe macht DHCP, IP zu MAC macht ARP.",
  },

  // ── Angebote & Wirtschaftlichkeit ─────────────────────────────────────────
  {
    id: "wi-01", topic: "wirtschaftlichkeit", level: 1, kind: "number",
    prompt: "Ein Notebook kostet laut Liste 1.200,00 €. Der Händler gewährt 10 % Rabatt und 2 % Skonto. Wie hoch ist der Bareinkaufspreis?",
    answer: 1058.4, unit: "€",
    explanation: "1.200 € − 10 % = 1.080 €. Davon 2 % Skonto: 1.080 € × 0,98 = 1.058,40 €.",
    tipp: "Reihenfolge immer Rabatt vor Skonto, Bezugskosten zum Schluss. Genau dieses Schema wird in fast jeder AP1 abgefragt.",
  },
  {
    id: "wi-02", topic: "wirtschaftlichkeit", level: 2, kind: "number",
    prompt: "Listenpreis 800,00 €, 5 % Rabatt, 3 % Skonto, Versandkosten 15,00 €. Berechne den Bezugspreis.",
    answer: 752.2, unit: "€",
    explanation: "800 × 0,95 = 760,00 € (Zieleinkaufspreis). 760 × 0,97 = 737,20 € (Bareinkaufspreis). + 15 € = 752,20 € Bezugspreis.",
  },
  {
    id: "wi-03", topic: "wirtschaftlichkeit", level: 1, kind: "mc",
    prompt: "Wozu dient eine Nutzwertanalyse?",
    options: [
      "Alternativen anhand gewichteter, auch nicht monetärer Kriterien vergleichen",
      "Den Gewinn eines Projekts exakt berechnen",
      "Die Abschreibung eines Wirtschaftsguts ermitteln",
      "Die Liquidität des Unternehmens planen",
    ],
    correct: 0,
    explanation: "Die Nutzwertanalyse macht qualitative Kriterien wie Service oder Bedienbarkeit vergleichbar, indem jedes Kriterium gewichtet und bepunktet wird.",
  },
  {
    id: "wi-04", topic: "wirtschaftlichkeit", level: 2, kind: "number",
    prompt: "Gewichtung: Preis 40 %, Leistung 35 %, Service 25 %. Angebot A erhält Preis 8, Leistung 6, Service 9 Punkte. Wie hoch ist der Nutzwert von Angebot A?",
    answer: 7.55,
    explanation: "0,40 × 8 + 0,35 × 6 + 0,25 × 9 = 3,2 + 2,1 + 2,25 = 7,55.",
    tipp: "Prüfe immer, ob die Gewichte zusammen 100 % ergeben. Wenn nicht, hast du dich verlesen.",
  },
  {
    id: "wi-05", topic: "wirtschaftlichkeit", level: 2, kind: "number",
    prompt: "Fixkosten 6.000 €, Verkaufspreis 50 € pro Stück, variable Kosten 20 € pro Stück. Ab welcher Menge ist die Gewinnschwelle (Break-even) erreicht?",
    answer: 200, unit: "Stück",
    explanation: "Deckungsbeitrag pro Stück = 50 € − 20 € = 30 €. Break-even = 6.000 € ÷ 30 € = 200 Stück.",
  },
  {
    id: "wi-06", topic: "wirtschaftlichkeit", level: 1, kind: "number",
    prompt: "Ein Server kostet beim Kauf 3.600 €. Alternativ: Leasing für 110 € im Monat über 36 Monate. Wie viel teurer ist das Leasing insgesamt?",
    answer: 360, unit: "€",
    explanation: "110 € × 36 = 3.960 €. 3.960 € − 3.600 € = 360 € Mehrkosten.",
  },
  {
    id: "wi-07", topic: "wirtschaftlichkeit", level: 1, kind: "number",
    prompt: "Ein Angebot lautet 2.500,00 € netto zzgl. 19 % USt. Wie hoch ist der Bruttobetrag?",
    answer: 2975, unit: "€",
    explanation: "2.500 € × 1,19 = 2.975,00 €.",
  },
  {
    id: "wi-08", topic: "wirtschaftlichkeit", level: 1, kind: "mc",
    prompt: "Was versteht man unter Skonto?",
    options: [
      "Preisnachlass bei Zahlung innerhalb einer bestimmten Frist",
      "Mengenrabatt ab einer Mindestabnahme",
      "Zuschlag für Expresslieferung",
      "Nachlass für Wiederverkäufer",
    ],
    correct: 0,
    explanation: "Skonto belohnt schnelle Zahlung, z. B. „2 % Skonto bei Zahlung innerhalb von 10 Tagen“. Mengenrabatt und Wiederverkäuferrabatt sind Rabattarten.",
  },

  // ── IT-Sicherheit & Datenschutz ───────────────────────────────────────────
  {
    id: "is-01", topic: "it-sicherheit", level: 1, kind: "mc",
    prompt: "Welche drei Schutzziele gelten als die klassischen Grundwerte der Informationssicherheit?",
    options: [
      "Vertraulichkeit, Integrität, Verfügbarkeit",
      "Verschlüsselung, Firewall, Backup",
      "Authentizität, Anonymität, Archivierung",
      "Datenschutz, Datensicherung, Datenlöschung",
    ],
    correct: 0,
    explanation: "Vertraulichkeit (nur Berechtigte), Integrität (unverändert, korrekt), Verfügbarkeit (nutzbar, wenn benötigt). Auf Englisch: CIA.",
    tipp: "In der Prüfung sollst du oft einer Maßnahme das Schutzziel zuordnen. RAID → Verfügbarkeit, Hashwert → Integrität, Verschlüsselung → Vertraulichkeit.",
  },
  {
    id: "is-02", topic: "it-sicherheit", level: 1, kind: "mc",
    prompt: "Was besagt die 3-2-1-Backupregel?",
    options: [
      "3 Kopien der Daten, auf 2 verschiedenen Medien, 1 Kopie außer Haus",
      "3 Vollbackups pro Woche, 2 inkrementelle, 1 differenzielles",
      "3 Admins, 2 Passwörter, 1 Backupserver",
      "Backups 3 Monate, 2 Jahre und 1 Jahrzehnt aufbewahren",
    ],
    correct: 0,
    explanation: "Drei Kopien (Original + 2 Sicherungen), zwei unterschiedliche Medientypen, mindestens eine Kopie räumlich getrennt, z. B. offsite oder in der Cloud.",
  },
  {
    id: "is-03", topic: "it-sicherheit", level: 2, kind: "mc",
    prompt: "Was sichert ein differenzielles Backup?",
    options: [
      "Alle Änderungen seit dem letzten Vollbackup",
      "Nur die Änderungen seit dem letzten Backup beliebiger Art",
      "Immer den kompletten Datenbestand",
      "Nur Systemdateien des Betriebssystems",
    ],
    correct: 0,
    explanation: "Differenziell = Bezug immer auf das letzte Vollbackup, wächst also täglich. Inkrementell = Bezug auf das letzte Backup jeglicher Art.",
    tipp: "Wiederherstellung differenziell: Vollbackup + letztes Differenzielles. Inkrementell: Vollbackup + ALLE Inkremente danach.",
  },
  {
    id: "is-04", topic: "it-sicherheit", level: 2, kind: "mc",
    prompt: "Anna möchte Bernd vertraulich eine E-Mail mit asymmetrischer Verschlüsselung senden. Mit welchem Schlüssel verschlüsselt Anna?",
    options: ["Mit Bernds öffentlichem Schlüssel", "Mit Annas privatem Schlüssel", "Mit Bernds privatem Schlüssel", "Mit Annas öffentlichem Schlüssel"],
    correct: 0,
    explanation: "Verschlüsselt wird mit dem öffentlichen Schlüssel des Empfängers. Nur Bernd kann mit seinem privaten Schlüssel entschlüsseln. Signieren funktioniert umgekehrt mit dem eigenen privaten Schlüssel.",
  },
  {
    id: "is-05", topic: "it-sicherheit", level: 1, kind: "mc",
    prompt: "Welche Kombination ist eine echte Zwei-Faktor-Authentifizierung?",
    options: [
      "Passwort und Einmalcode aus einer Authenticator-App",
      "Passwort und PIN",
      "Zwei unterschiedliche Passwörter",
      "Benutzername und Passwort",
    ],
    correct: 0,
    explanation: "Die Faktoren müssen aus verschiedenen Kategorien stammen: Wissen (Passwort), Besitz (Smartphone/Token), Inhärenz (Fingerabdruck). Passwort + PIN ist zweimal Wissen.",
  },
  {
    id: "is-06", topic: "it-sicherheit", level: 1, kind: "mc",
    prompt: "Eine Schadsoftware verschlüsselt alle Dateien und fordert Lösegeld. Wie heißt diese Art von Malware?",
    options: ["Ransomware", "Spyware", "Adware", "Rootkit"],
    correct: 0,
    explanation: "Ransomware erpresst Lösegeld (ransom). Bester Schutz: aktuelle Offline-Backups, Patches, Mitarbeiterschulung.",
  },
  {
    id: "is-07", topic: "it-sicherheit", level: 2, kind: "mc",
    prompt: "Welche Maßnahme ist eine technisch-organisatorische Maßnahme (TOM) zur Zutrittskontrolle?",
    options: [
      "Elektronisches Schließsystem für den Serverraum",
      "Passwortrichtlinie für Benutzerkonten",
      "Verschlüsselung der Festplatten",
      "Protokollierung von Datenänderungen",
    ],
    correct: 0,
    explanation: "Zutritt = physischer Zugang zu Räumen. Passwörter regeln den Zugang zu Systemen, Rechte den Zugriff auf Daten, Protokollierung gehört zur Eingabekontrolle.",
    tipp: "Zutritt (Raum), Zugang (System), Zugriff (Daten). Diese drei werden gern vertauscht.",
  },
  {
    id: "is-08", topic: "it-sicherheit", level: 1, kind: "mc",
    prompt: "Welche Angabe ist ein personenbezogenes Datum im Sinne der DSGVO?",
    options: [
      "Name und private E-Mail-Adresse eines Kunden",
      "Die Umsatzzahlen des letzten Quartals",
      "Die Seriennummer eines Lagerartikels",
      "Die Öffnungszeiten der Filiale",
    ],
    correct: 0,
    explanation: "Personenbezogen sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen.",
  },
  {
    id: "is-09", topic: "it-sicherheit", level: 1, kind: "mc",
    prompt: "Welche Schutzbedarfskategorien verwendet der BSI IT-Grundschutz?",
    options: ["normal, hoch, sehr hoch", "niedrig, mittel, hoch", "grün, gelb, rot", "A, B, C"],
    correct: 0,
    explanation: "Der BSI-Standard 200-2 unterscheidet die Kategorien normal, hoch und sehr hoch.",
  },
  {
    id: "is-10", topic: "it-sicherheit", level: 1, kind: "mc",
    prompt: "Ein Mitarbeiter erhält eine E-Mail „Ihr Konto wird gesperrt – bitte sofort hier anmelden“. Um welchen Angriff handelt es sich wahrscheinlich?",
    options: ["Phishing", "DDoS", "Brute Force", "Man-in-the-Middle über ARP"],
    correct: 0,
    explanation: "Phishing setzt auf Zeitdruck und gefälschte Absender, um Zugangsdaten abzugreifen. Gegenmaßnahmen: Schulung, Absender prüfen, MFA.",
  },

  // ── Hardware & Arbeitsplatz ───────────────────────────────────────────────
  {
    id: "hw-01", topic: "hardware", level: 1, kind: "mc",
    prompt: "Welche Aussage zu RAID 1 ist richtig?",
    options: [
      "Daten werden gespiegelt, nutzbar ist die Kapazität einer Platte",
      "Daten werden ohne Redundanz verteilt, die Geschwindigkeit steigt",
      "Es werden mindestens drei Festplatten benötigt",
      "RAID 1 ersetzt ein Backup",
    ],
    correct: 0,
    explanation: "RAID 1 spiegelt auf zwei (oder mehr) Platten. Fällt eine aus, laufen die Daten weiter. Gegen Löschen oder Ransomware hilft RAID nicht, daher kein Backup-Ersatz.",
    tipp: "„RAID ist kein Backup“ gibt in Freitextaufgaben fast immer einen Punkt.",
  },
  {
    id: "hw-02", topic: "hardware", level: 2, kind: "number",
    prompt: "Ein RAID 5 besteht aus 4 Festplatten mit je 2 TB. Wie viel Speicherplatz ist nutzbar?",
    answer: 6, unit: "TB",
    explanation: "RAID 5 verliert die Kapazität einer Platte für Parität: (4 − 1) × 2 TB = 6 TB.",
    tipp: "RAID 6: (n − 2) × Größe. RAID 10: n ÷ 2 × Größe. RAID 0: n × Größe.",
  },
  {
    id: "hw-03", topic: "hardware", level: 1, kind: "mc",
    prompt: "Welche Aussage zu SSDs im Vergleich zu HDDs ist richtig?",
    options: [
      "SSDs haben keine beweglichen Teile und deutlich kürzere Zugriffszeiten",
      "SSDs sind bei gleicher Kapazität grundsätzlich günstiger",
      "SSDs speichern Daten magnetisch",
      "SSDs müssen regelmäßig defragmentiert werden",
    ],
    correct: 0,
    explanation: "Flash-Speicher ohne Mechanik: schneller, leiser, stoßfester. HDDs sind pro TB meist günstiger. Defragmentieren schadet einer SSD eher.",
  },
  {
    id: "hw-04", topic: "hardware", level: 2, kind: "mc",
    prompt: "Welche USV-Klasse bietet den höchsten Schutz, weil die Last dauerhaft über den Wechselrichter versorgt wird?",
    options: ["VFI (Online/Doppelwandler)", "VFD (Offline/Standby)", "VI (Line-Interactive)", "Alle Klassen sind gleichwertig"],
    correct: 0,
    explanation: "VFI = Voltage and Frequency Independent: Die Ausgangsspannung ist komplett vom Netz entkoppelt, ohne Umschaltzeit. Ideal für Server.",
  },
  {
    id: "hw-05", topic: "hardware", level: 1, kind: "mc",
    prompt: "Welche Aussage zur Ergonomie am Bildschirmarbeitsplatz ist richtig?",
    options: [
      "Die Oberkante des Bildschirms liegt etwa auf oder leicht unter Augenhöhe",
      "Der Bildschirm steht direkt vor einem Fenster",
      "Der Sehabstand sollte etwa 20 cm betragen",
      "Der Bildschirm steht seitlich im 90°-Winkel zum Benutzer",
    ],
    correct: 0,
    explanation: "Blick leicht nach unten, Sehabstand ca. 50–80 cm, Blickrichtung parallel zum Fenster, um Blendung und Spiegelung zu vermeiden.",
  },
  {
    id: "hw-06", topic: "hardware", level: 1, kind: "mc",
    prompt: "Über welche Schnittstelle kann ein Notebook Bild, Daten und Strom über nur ein Kabel mit einer Dockingstation austauschen?",
    options: ["USB-C mit Thunderbolt bzw. DisplayPort Alt Mode", "VGA", "DVI-D", "SATA"],
    correct: 0,
    explanation: "USB-C kann mit Power Delivery Strom liefern und per Alt Mode/Thunderbolt Bildsignale und Daten übertragen.",
  },
  {
    id: "hw-07", topic: "hardware", level: 2, kind: "mc",
    prompt: "Wofür steht ECC beim Arbeitsspeicher und wo wird er typischerweise eingesetzt?",
    options: [
      "Error Correcting Code, erkennt und korrigiert Bitfehler, typisch in Servern",
      "Extended Cache Control, erhöht den Takt, typisch in Gaming-PCs",
      "Energy Consumption Class, kennzeichnet sparsamen RAM in Notebooks",
      "External Clock Connector, verbindet RAM mit der Grafikkarte",
    ],
    correct: 0,
    explanation: "ECC-RAM erkennt und korrigiert Einzelbitfehler. Das erhöht die Betriebssicherheit, daher in Servern und Workstations.",
  },

  // ── Speicher & Übertragung ────────────────────────────────────────────────
  {
    id: "sp-01", topic: "speicher-uebertragung", level: 2, kind: "number",
    prompt: "Ein unkomprimiertes Bild hat 1920 × 1080 Pixel bei 24 Bit Farbtiefe. Wie groß ist die Datei in MiB? (2 Nachkommastellen)",
    answer: 5.93, tolerance: 0.01, unit: "MiB",
    explanation: "1920 × 1080 = 2.073.600 Pixel × 3 Byte = 6.220.800 Byte. 6.220.800 ÷ 1024 ÷ 1024 ≈ 5,93 MiB.",
    tipp: "24 Bit = 3 Byte pro Pixel. Bei MiB durch 1024² teilen, bei MB durch 1000². Genau auf das „i“ achten!",
  },
  {
    id: "sp-02", topic: "speicher-uebertragung", level: 2, kind: "number",
    prompt: "Eine Datei von 1,5 GB (dezimal) wird über eine 100-Mbit/s-Leitung übertragen. Wie viele Sekunden dauert die Übertragung (ohne Overhead)?",
    answer: 120, unit: "s",
    explanation: "1,5 GB = 1,5 × 10⁹ Byte × 8 = 12 × 10⁹ Bit. 12 × 10⁹ ÷ (100 × 10⁶ Bit/s) = 120 s.",
    tipp: "Fehlerquelle Nr. 1: Byte und Bit. Leitungen in Bit/s, Dateien in Byte. Also immer × 8.",
  },
  {
    id: "sp-03", topic: "speicher-uebertragung", level: 2, kind: "number",
    prompt: "Eine Festplatte wird mit 1 TB (Herstellerangabe, dezimal) verkauft. Wie viele GiB zeigt das Betriebssystem ungefähr an? (ganze Zahl)",
    answer: 931, tolerance: 1, unit: "GiB",
    explanation: "1 TB = 10¹² Byte. 10¹² ÷ 2³⁰ ≈ 931,32 GiB. Deshalb „fehlen“ scheinbar rund 69 GB.",
  },
  {
    id: "sp-04", topic: "speicher-uebertragung", level: 1, kind: "number",
    prompt: "Ein Video läuft 10 Minuten mit einer konstanten Datenrate von 8 Mbit/s. Wie groß ist es in MB (dezimal)?",
    answer: 600, unit: "MB",
    explanation: "600 s × 8 Mbit/s = 4.800 Mbit. 4.800 Mbit ÷ 8 = 600 MB.",
  },
  {
    id: "sp-05", topic: "speicher-uebertragung", level: 1, kind: "mc",
    prompt: "Wie viele Byte sind 1 KiB?",
    options: ["1024", "1000", "1048", "8192"],
    correct: 0,
    explanation: "Binärpräfix: 1 KiB = 2¹⁰ = 1024 Byte. 1 kB (dezimal) = 1000 Byte.",
  },
  {
    id: "sp-06", topic: "speicher-uebertragung", level: 2, kind: "number",
    prompt: "Ein Fileserver hat 400 GB Daten. Sonntags läuft ein Vollbackup, Mo–Sa je ein inkrementelles Backup. Täglich ändern sich 5 % der Daten. Wie viel Speicher (GB) braucht eine Woche Backups?",
    answer: 520, unit: "GB",
    explanation: "Vollbackup 400 GB + 6 × (5 % von 400 GB = 20 GB) = 400 + 120 = 520 GB.",
  },
  {
    id: "sp-07", topic: "speicher-uebertragung", level: 3, kind: "number",
    prompt: "Unkomprimiertes Audio in CD-Qualität (44.100 Hz, 16 Bit, Stereo) läuft 1 Minute. Wie groß ist die Datei in MB (dezimal, 2 Nachkommastellen)?",
    answer: 10.58, tolerance: 0.01, unit: "MB",
    explanation: "44.100 × 2 Byte × 2 Kanäle × 60 s = 10.584.000 Byte ≈ 10,58 MB.",
  },

  // ── Energie & Nachhaltigkeit ──────────────────────────────────────────────
  {
    id: "en-01", topic: "energie", level: 1, kind: "number",
    prompt: "Ein PC nimmt 120 W auf und läuft 8 h pro Tag an 220 Arbeitstagen. Der Strompreis beträgt 0,30 €/kWh. Wie hoch sind die jährlichen Stromkosten?",
    answer: 63.36, unit: "€",
    explanation: "0,12 kW × 8 h × 220 = 211,2 kWh. 211,2 kWh × 0,30 € = 63,36 €.",
    tipp: "Watt immer zuerst in kW umrechnen (÷ 1000). Danach ist es nur noch kW × h × Tage × Preis.",
  },
  {
    id: "en-02", topic: "energie", level: 2, kind: "number",
    prompt: "20 Monitore verbrauchen im Standby je 0,5 W, 16 h am Tag, 365 Tage im Jahr. Strompreis 0,32 €/kWh. Wie hoch sind die Standby-Kosten pro Jahr? (2 Nachkommastellen)",
    answer: 18.69, tolerance: 0.01, unit: "€",
    explanation: "20 × 0,5 W = 10 W. 10 W × 16 h = 160 Wh = 0,16 kWh pro Tag. × 365 = 58,4 kWh. × 0,32 € = 18,69 €.",
  },
  {
    id: "en-03", topic: "energie", level: 2, kind: "number",
    prompt: "Ein alter Server (450 W) wird durch einen neuen (300 W) ersetzt. Beide laufen 24/7 (8.760 h/Jahr). Strompreis 0,28 €/kWh. Wie viel Euro spart der Betrieb pro Jahr?",
    answer: 367.92, unit: "€",
    explanation: "Differenz 150 W = 0,15 kW. 0,15 kW × 8.760 h = 1.314 kWh. × 0,28 € = 367,92 €.",
  },
  {
    id: "en-04", topic: "energie", level: 1, kind: "number",
    prompt: "Eine Investition in effizientere Hardware kostet 1.800 € und spart 450 € Stromkosten pro Jahr. Nach wie vielen Jahren hat sie sich amortisiert?",
    answer: 4, unit: "Jahre",
    explanation: "Amortisationszeit = Investition ÷ jährliche Einsparung = 1.800 € ÷ 450 €/Jahr = 4 Jahre.",
  },
  {
    id: "en-05", topic: "energie", level: 1, kind: "mc",
    prompt: "Was regelt das Elektro- und Elektronikgerätegesetz (ElektroG) in Deutschland?",
    options: [
      "Rücknahme und umweltgerechte Entsorgung von Elektroaltgeräten",
      "Die maximale Leistungsaufnahme von Servern",
      "Die Ergonomie von Bildschirmarbeitsplätzen",
      "Die Lizenzierung von Betriebssystemen",
    ],
    correct: 0,
    explanation: "Das ElektroG setzt die WEEE-Richtlinie um: Hersteller müssen Altgeräte zurücknehmen, Altgeräte gehören nicht in den Hausmüll.",
  },
  {
    id: "en-06", topic: "energie", level: 1, kind: "mc",
    prompt: "Welches deutsche Umweltzeichen kennzeichnet besonders umweltfreundliche und energiesparende IT-Geräte?",
    options: ["Blauer Engel", "CE-Kennzeichen", "GS-Zeichen", "RoHS"],
    correct: 0,
    explanation: "Der Blaue Engel ist das Umweltzeichen der Bundesregierung. CE ist eine Konformitätserklärung, GS steht für geprüfte Sicherheit, RoHS beschränkt gefährliche Stoffe.",
  },
  {
    id: "en-07", topic: "energie", level: 1, kind: "number",
    prompt: "Ein Netzteil wird an 230 V betrieben und nimmt einen Strom von 2 A auf. Wie groß ist die Leistung in Watt?",
    answer: 460, unit: "W",
    explanation: "P = U × I = 230 V × 2 A = 460 W.",
  },

  // ── Programmierung & Logik ────────────────────────────────────────────────
  {
    id: "pr-01", topic: "programmierung", level: 1, kind: "mc",
    prompt: "Wie lautet die Dezimalzahl 173 im Binärsystem?",
    options: ["1010 1101", "1011 0101", "1010 1011", "1100 1101"],
    correct: 0,
    explanation: "173 = 128 + 32 + 8 + 4 + 1 → Bits für 128, 32, 8, 4, 1 gesetzt: 1010 1101.",
  },
  {
    id: "pr-02", topic: "programmierung", level: 1, kind: "number",
    prompt: "Welchen Dezimalwert hat die Hexadezimalzahl 3F?",
    answer: 63,
    explanation: "3 × 16 + F (15) = 48 + 15 = 63.",
  },
  {
    id: "pr-03", topic: "programmierung", level: 2, kind: "number",
    prompt: "Welchen Wert gibt der folgende Pseudocode aus?",
    code: "summe ← 0\nFÜR i ← 1 BIS 5\n    WENN i MOD 2 = 1 DANN\n        summe ← summe + i\n    ENDE WENN\nENDE FÜR\nAUSGABE summe",
    answer: 9,
    explanation: "Nur ungerade i werden addiert: 1 + 3 + 5 = 9.",
    tipp: "Mach bei Pseudocode immer eine Schreibtischtest-Tabelle mit allen Variablen. Kostet 30 Sekunden, verhindert Flüchtigkeitsfehler.",
  },
  {
    id: "pr-04", topic: "programmierung", level: 2, kind: "number",
    prompt: "Welchen Wert gibt der folgende Pseudocode aus?",
    code: "x ← 1\nSOLANGE x < 50\n    x ← x * 3\nENDE SOLANGE\nAUSGABE x",
    answer: 81,
    explanation: "x: 1 → 3 → 9 → 27 → 81. Bei 81 ist x < 50 falsch, die Schleife endet.",
  },
  {
    id: "pr-05", topic: "programmierung", level: 1, kind: "mc",
    prompt: "Welcher Datentyp eignet sich für die Speicherung eines Preises wie 19,99?",
    options: ["Dezimal- bzw. Gleitkommazahl", "Integer", "Boolean", "Char"],
    correct: 0,
    explanation: "Preise haben Nachkommastellen. Für Geldbeträge nimmt man in der Praxis einen exakten Dezimaltyp (z. B. DECIMAL), alternativ Cent als Integer.",
  },
  {
    id: "pr-06", topic: "programmierung", level: 1, kind: "mc",
    prompt: "Was kennzeichnet eine kopfgesteuerte Schleife?",
    options: [
      "Die Bedingung wird vor jedem Durchlauf geprüft, der Rumpf läuft eventuell nie",
      "Der Rumpf läuft immer mindestens einmal",
      "Die Anzahl der Durchläufe ist unbegrenzt",
      "Sie kann nur mit Zahlen arbeiten",
    ],
    correct: 0,
    explanation: "Kopfgesteuert (SOLANGE … ) prüft zuerst. Fußgesteuert (WIEDERHOLE … BIS) läuft mindestens einmal.",
  },
  {
    id: "pr-07", topic: "programmierung", level: 2, kind: "mc",
    prompt: "Es gilt A = 1 und B = 0. Was ergibt (A UND B) ODER (NICHT B)?",
    options: ["1 (wahr)", "0 (falsch)"],
    correct: 0,
    explanation: "A UND B = 0. NICHT B = 1. 0 ODER 1 = 1.",
  },
  {
    id: "pr-08", topic: "programmierung", level: 1, kind: "mc",
    prompt: "In Zelle B2 steht die Punktzahl. Welche Formel gibt ab 50 Punkten „Bestanden“ aus, sonst „Nicht bestanden“?",
    options: [
      '=WENN(B2>=50;"Bestanden";"Nicht bestanden")',
      '=WENN(B2>50;"Bestanden";"Nicht bestanden")',
      '=SVERWEIS(B2;50;"Bestanden")',
      '=WENN("Bestanden";B2>=50;"Nicht bestanden")',
    ],
    correct: 0,
    explanation: "WENN(Prüfung; Dann; Sonst). „Ab 50“ heißt einschließlich 50, also >=.",
  },
  {
    id: "pr-09", topic: "programmierung", level: 1, kind: "number",
    prompt: "Gegeben ist das Array zahlen = [4, 8, 15, 16, 23, 42]. Die Indizierung beginnt bei 0. Was ergibt zahlen[3] + zahlen[5]?",
    answer: 58,
    explanation: "zahlen[3] = 16, zahlen[5] = 42 → 58.",
  },

  // ── Projektmanagement ─────────────────────────────────────────────────────
  {
    id: "pm-01", topic: "projektmanagement", level: 1, kind: "mc",
    prompt: "Welche drei Größen bilden das magische Dreieck des Projektmanagements?",
    options: ["Zeit, Kosten, Qualität (Leistung)", "Zeit, Personal, Risiko", "Budget, Kunde, Technik", "Qualität, Risiko, Umfang"],
    correct: 0,
    explanation: "Zeit, Kosten und Qualität beeinflussen sich gegenseitig: Wer eine Größe verbessert, muss meist bei einer anderen nachgeben.",
  },
  {
    id: "pm-02", topic: "projektmanagement", level: 1, kind: "mc",
    prompt: "Was unterscheidet das Lastenheft vom Pflichtenheft?",
    options: [
      "Lastenheft: WAS der Auftraggeber will. Pflichtenheft: WIE der Auftragnehmer es umsetzt",
      "Lastenheft: vom Auftragnehmer. Pflichtenheft: vom Auftraggeber",
      "Beide sind identisch, nur der Name ist anders",
      "Das Pflichtenheft wird erst nach Projektende erstellt",
    ],
    correct: 0,
    explanation: "Der Auftraggeber schreibt das Lastenheft (Anforderungen), der Auftragnehmer antwortet mit dem Pflichtenheft (Umsetzungskonzept).",
    tipp: "Eselsbrücke: Lastenheft = Lasten des Kunden, Pflichtenheft = Pflichten des Dienstleisters.",
  },
  {
    id: "pm-03", topic: "projektmanagement", level: 2, kind: "number",
    prompt: "Netzplan: A (3 Tage), B (5 Tage, nach A), C (2 Tage, nach A), D (4 Tage, nach B und C). Wie lange dauert das Projekt mindestens?",
    code: "Vorgang | Dauer | Vorgänger\nA       | 3     | –\nB       | 5     | A\nC       | 2     | A\nD       | 4     | B, C",
    answer: 12, unit: "Tage",
    explanation: "Vorwärtsrechnung: A endet an Tag 3, B an Tag 8, C an Tag 5. D startet nach dem späteren Vorgänger (8) und endet an Tag 12.",
  },
  {
    id: "pm-04", topic: "projektmanagement", level: 3, kind: "number",
    prompt: "Wie groß ist im gleichen Netzplan der Gesamtpuffer von Vorgang C?",
    code: "Vorgang | Dauer | Vorgänger\nA       | 3     | –\nB       | 5     | A\nC       | 2     | A\nD       | 4     | B, C",
    answer: 3, unit: "Tage",
    explanation: "C: FAZ 3, FEZ 5. Rückwärts: D muss spätestens an Tag 8 starten, also SEZ von C = 8, SAZ = 6. Gesamtpuffer = SAZ − FAZ = 6 − 3 = 3 Tage.",
    tipp: "GP = SAZ − FAZ (oder SEZ − FEZ). Vorgänge mit GP = 0 bilden den kritischen Pfad, hier A → B → D.",
  },
  {
    id: "pm-05", topic: "projektmanagement", level: 1, kind: "mc",
    prompt: "Was ist der kritische Pfad?",
    options: [
      "Die Folge von Vorgängen ohne Puffer, jede Verzögerung verschiebt das Projektende",
      "Der Vorgang mit den höchsten Kosten",
      "Die Liste aller Risiken des Projekts",
      "Der kürzeste Weg durch den Netzplan",
    ],
    correct: 0,
    explanation: "Auf dem kritischen Pfad ist der Gesamtpuffer 0. Er ist der längste Weg durch den Netzplan und bestimmt die Projektdauer.",
  },
  {
    id: "pm-06", topic: "projektmanagement", level: 1, kind: "mc",
    prompt: "Wofür steht das „M“ bei SMART-Zielen?",
    options: ["Messbar", "Machbar", "Modern", "Minimal"],
    correct: 0,
    explanation: "SMART: spezifisch, messbar, attraktiv/akzeptiert, realistisch, terminiert.",
  },
  {
    id: "pm-07", topic: "projektmanagement", level: 1, kind: "mc",
    prompt: "Welche Darstellung zeigt Vorgänge als Balken entlang einer Zeitachse?",
    options: ["Gantt-Diagramm", "Netzplan", "Ishikawa-Diagramm", "Organigramm"],
    correct: 0,
    explanation: "Das Gantt- oder Balkendiagramm zeigt Dauer und Lage der Vorgänge auf der Zeitachse. Abhängigkeiten sieht man besser im Netzplan.",
  },

  // ── Kunden, Verträge & Qualität ───────────────────────────────────────────
  {
    id: "kq-01", topic: "kunden-qualitaet", level: 1, kind: "mc",
    prompt: "Welche vier Seiten einer Nachricht unterscheidet Schulz von Thun?",
    options: [
      "Sachinhalt, Selbstoffenbarung, Beziehung, Appell",
      "Sender, Empfänger, Kanal, Rauschen",
      "Frage, Antwort, Lob, Kritik",
      "Inhalt, Form, Ton, Lautstärke",
    ],
    correct: 0,
    explanation: "Jede Nachricht hat einen Sachinhalt, verrät etwas über den Sender (Selbstoffenbarung), zeigt die Beziehung und enthält einen Appell.",
  },
  {
    id: "kq-02", topic: "kunden-qualitaet", level: 1, kind: "mc",
    prompt: "Wofür steht der PDCA-Zyklus im Qualitätsmanagement?",
    options: ["Plan, Do, Check, Act", "Prepare, Deploy, Control, Archive", "Plan, Develop, Code, Analyze", "Prüfen, Durchführen, Controllen, Abschließen"],
    correct: 0,
    explanation: "Der Deming-Kreis: planen, umsetzen, überprüfen, handeln/verbessern. Danach beginnt der Zyklus erneut (kontinuierliche Verbesserung).",
  },
  {
    id: "kq-03", topic: "kunden-qualitaet", level: 2, kind: "mc",
    prompt: "Ein IT-Dienstleister richtet für einen Kunden ein funktionsfähiges Netzwerk zu einem Festpreis ein. Welche Vertragsart liegt vor?",
    options: ["Werkvertrag", "Dienstvertrag", "Kaufvertrag", "Mietvertrag"],
    correct: 0,
    explanation: "Beim Werkvertrag wird ein Erfolg geschuldet (funktionierendes Netzwerk). Beim Dienstvertrag nur die Tätigkeit, z. B. Support nach Stunden.",
    tipp: "Frage dich: Wird ein Ergebnis geschuldet? Ja → Werkvertrag. Nur Arbeitszeit → Dienstvertrag.",
  },
  {
    id: "kq-04", topic: "kunden-qualitaet", level: 1, kind: "mc",
    prompt: "Was kennzeichnet eine OEM-Lizenz?",
    options: [
      "Sie ist an die Hardware gebunden, mit der sie ausgeliefert wurde",
      "Sie darf auf beliebig vielen Geräten installiert werden",
      "Sie ist immer kostenlos",
      "Sie erlaubt die Weitergabe des Quellcodes",
    ],
    correct: 0,
    explanation: "OEM-Software wird mit einem Gerät verkauft und ist an dieses gebunden, meist ohne Herstellersupport.",
  },
  {
    id: "kq-05", topic: "kunden-qualitaet", level: 2, kind: "mc",
    prompt: "Was bedeutet „Copyleft“ bei der GPL?",
    options: [
      "Veränderte Versionen dürfen nur unter derselben Lizenz weitergegeben werden",
      "Die Software darf nicht verändert werden",
      "Die Software darf nur privat genutzt werden",
      "Der Quellcode muss geheim bleiben",
    ],
    correct: 0,
    explanation: "Copyleft sorgt dafür, dass abgeleitete Werke frei bleiben. Freizügige Lizenzen wie MIT haben diese Pflicht nicht.",
  },
  {
    id: "kq-06", topic: "kunden-qualitaet", level: 2, kind: "number",
    prompt: "Ein SLA garantiert 99,5 % Verfügbarkeit pro Jahr (365 Tage). Wie viele Stunden Ausfall sind maximal erlaubt?",
    answer: 43.8, unit: "h",
    explanation: "365 × 24 h = 8.760 h. 0,5 % davon = 8.760 × 0,005 = 43,8 h.",
    tipp: "Immer mit der Nicht-Verfügbarkeit (100 % − SLA) rechnen, nicht mit den 99,5 %.",
  },
  {
    id: "kq-07", topic: "kunden-qualitaet", level: 1, kind: "mc",
    prompt: "Welche Frage ist im Beratungsgespräch eine offene Frage?",
    options: [
      "Welche Anwendungen nutzen Sie im Arbeitsalltag?",
      "Nutzen Sie Microsoft Office?",
      "Soll das Gerät unter 1.000 € kosten?",
      "Möchten Sie ein Notebook oder einen PC?",
    ],
    correct: 0,
    explanation: "Offene Fragen (W-Fragen) lassen sich nicht mit Ja/Nein beantworten und liefern mehr Informationen für die Bedarfsanalyse.",
  },
  {
    id: "kq-08", topic: "kunden-qualitaet", level: 2, kind: "mc",
    prompt: "Ein gekaufter Monitor ist bei Lieferung defekt. Was kann der Käufer nach BGB zuerst verlangen?",
    options: [
      "Nacherfüllung (Reparatur oder Ersatzlieferung)",
      "Sofort Rücktritt vom Vertrag",
      "Schadensersatz in doppelter Höhe",
      "Gar nichts, da Gewährleistung erst nach 6 Monaten greift",
    ],
    correct: 0,
    explanation: "Vorrang hat die Nacherfüllung. Erst wenn diese scheitert, verweigert wird oder unzumutbar ist, folgen Rücktritt, Minderung oder Schadensersatz.",
  },
];

/** Deterministic per-ID option order, so the solution isn't always A but stays stable across requests. */
function shuffleOptions(q: Question): Question {
  if (q.kind !== "mc") return q;
  let seed = 2166136261;
  for (const ch of q.id) seed = Math.imul(seed ^ ch.charCodeAt(0), 16777619);
  const order = q.options.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    seed = Math.imul(seed ^ (seed >>> 15), 2246822507) >>> 0;
    const j = seed % (i + 1);
    [order[i], order[j]] = [order[j]!, order[i]!];
  }
  return { ...q, options: order.map((i) => q.options[i]!), correct: order.indexOf(q.correct) };
}

export const QUESTIONS: Question[] = [...BASE_QUESTIONS, ...PRUEFUNGSNAHE_QUESTIONS].map(shuffleOptions);

export function questionsForTopic(topic: TopicSlug) {
  return QUESTIONS.filter((q) => q.topic === topic);
}

export function questionCounts() {
  const counts: Partial<Record<TopicSlug, number>> = {};
  for (const q of QUESTIONS) counts[q.topic] = (counts[q.topic] ?? 0) + 1;
  return counts;
}
