import "server-only";
import type { Question } from "@/lib/ap1/types";

// Prüfungsnahe Fragen: eigene Formulierungen und Zahlen, aufgebaut nach den Aufgabentypen,
// die in den AP1-Prüfungen H21 bis F26 wiederholt vorkamen. Keine Originalaufgaben übernehmen
// (Urheberrecht der Prüfungsersteller). IDs niemals ändern: Fortschritt wird pro ID gespeichert.
// MC-Fragen werden mit der richtigen Antwort an Index 0 notiert und beim Laden gemischt.
export const PRUEFUNGSNAHE_QUESTIONS: Question[] = [
  // ── Netzwerktechnik ────────────────────────────────────────────────────────
  {
    id: "nw-11", topic: "netzwerk", level: 2, kind: "mc",
    prompt: "Ein neu angeschlossener PC zeigt bei ipconfig die Adresse 169.254.23.7. Was ist die wahrscheinlichste Ursache?",
    options: [
      "Der PC hat keine Antwort von einem DHCP-Server erhalten (APIPA-Adresse)",
      "Der DNS-Server ist falsch eingetragen",
      "Der PC hat eine öffentliche IP-Adresse vom Provider erhalten",
      "Das Standardgateway ist doppelt vergeben",
    ],
    correct: 0,
    explanation: "169.254.0.0/16 ist der APIPA-Bereich. Windows vergibt sich diese Adresse selbst, wenn kein DHCP-Server antwortet, z. B. weil das Kabel steckt, aber die Netzwerkdose nicht gepatcht ist.",
    tipp: "Erst Kabel und Dose prüfen (Link-LED, Patchfeld), dann DHCP. In der Prüfung gibt es Punkte für eine sinnvolle Reihenfolge der Schritte.",
  },
  {
    id: "nw-12", topic: "netzwerk", level: 1, kind: "mc",
    prompt: "Mit welchem Befehl zeigst du unter Windows die MAC-Adresse aller Netzwerkadapter an?",
    options: ["ipconfig /all", "ping -a", "nslookup", "tracert"],
    correct: 0,
    explanation: "ipconfig /all zeigt pro Adapter die physische Adresse (MAC). Alternativ geht getmac /v. Unter Linux nutzt man ip a (früher ifconfig).",
  },
  {
    id: "nw-13", topic: "netzwerk", level: 2, kind: "mc",
    prompt: "Ein Mitarbeiter kann 8.8.8.8 anpingen, aber keine Webseite über ihren Namen aufrufen. Wo liegt der Fehler am wahrscheinlichsten?",
    options: ["Bei der Namensauflösung (DNS)", "Beim Netzwerkkabel", "Bei der IP-Adresse des PCs", "Beim Standardgateway"],
    correct: 0,
    explanation: "Der Ping auf eine externe IP klappt, also funktionieren Kabel, IP-Konfiguration und Gateway. Nur die Übersetzung von Namen in IP-Adressen fehlt. Mit nslookup lässt sich das prüfen.",
  },
  {
    id: "nw-14", topic: "netzwerk", level: 2, kind: "number",
    prompt: "Ein Unternehmen erhält vom Provider das IPv6-Präfix 2001:db8:5f2d::/48 und bildet daraus /64-Subnetze. Wie viele Subnetze sind möglich?",
    answer: 65536,
    explanation: "Zwischen /48 und /64 liegen 16 Bit für die Subnetz-ID: 2¹⁶ = 65.536 Subnetze.",
    tipp: "Bei IPv6 rechnest du nie Netz- und Broadcastadresse ab, IPv6 kennt keinen Broadcast.",
  },
  {
    id: "nw-15", topic: "netzwerk", level: 2, kind: "mc",
    prompt: "Ein Client hat nur die IPv6-Adresse fe80::62eb:69ff:fed2:d2a6. Was bedeutet das?",
    options: [
      "Er hat nur eine Link-Local-Adresse und keine globale Adresse erhalten",
      "Er ist korrekt mit dem Internet verbunden",
      "Er nutzt eine private IPv4-Adresse im IPv6-Format",
      "Er ist die Loopback-Schnittstelle",
    ],
    correct: 0,
    explanation: "fe80::/10 ist Link-Local. Diese Adresse bildet jedes Gerät selbst und gilt nur im lokalen Segment. Fehlt eine globale Adresse, kam kein Router Advertisement bzw. keine DHCPv6-Zuteilung an.",
  },
  {
    id: "nw-16", topic: "netzwerk", level: 1, kind: "mc",
    prompt: "Mit welchem Befehl prüfst du, ob der IPv6-Stack des eigenen Rechners funktioniert?",
    options: ["ping ::1", "ping fe80::1", "ping 127.0.0.0", "ping ff02::1"],
    correct: 0,
    explanation: "::1 ist die IPv6-Loopback-Adresse (entspricht 127.0.0.1 bei IPv4). Antwortet sie, ist der Protokollstapel lokal in Ordnung.",
  },
  {
    id: "nw-17", topic: "netzwerk", level: 2, kind: "mc",
    prompt: "Eine Firewall blockiert den TCP-Port 443. Auf welcher OSI-Schicht liegt das Problem?",
    options: ["Schicht 4 – Transportschicht", "Schicht 3 – Vermittlungsschicht", "Schicht 2 – Sicherungsschicht", "Schicht 7 – Anwendungsschicht"],
    correct: 0,
    explanation: "Ports gehören zu TCP und UDP und damit zur Transportschicht. IP-Adressen liegen auf Schicht 3, MAC-Adressen auf Schicht 2, Protokolle wie HTTP oder SMTP auf Schicht 7.",
    tipp: "Typische Prüfungsaufgabe: Fehlerbild einer Schicht zuordnen. Lern zu jeder Schicht ein Beispiel (Kabel ab, falsche MAC, falsche IP, Port zu, falsches Protokoll).",
  },
  {
    id: "nw-18", topic: "netzwerk", level: 2, kind: "mc",
    prompt: "Welcher Vorteil spricht für WPA2/WPA3-Enterprise gegenüber dem Personal-Modus mit gemeinsamem Schlüssel (PSK)?",
    options: [
      "Jeder Nutzer meldet sich mit eigenen Zugangsdaten an, beim Austritt wird nur sein Konto gesperrt",
      "Es wird kein Server für die Anmeldung benötigt",
      "Die Einrichtung ist für kleine Büros einfacher",
      "Das WLAN braucht keine SSID mehr",
    ],
    correct: 0,
    explanation: "Enterprise authentifiziert über einen RADIUS-Server mit individuellen Zugangsdaten. Verlässt jemand die Firma, muss nicht der WLAN-Schlüssel für alle geändert werden. Nachteil: mehr Aufwand, lohnt sich eher für größere Unternehmen.",
  },
  {
    id: "nw-19", topic: "netzwerk", level: 2, kind: "mc",
    prompt: "Welche Aussage zum Unterschied zwischen IPv4 und IPv6 ist richtig?",
    options: [
      "IPv6 kennt keinen Broadcast und nutzt stattdessen Multicast",
      "IPv6-Adressen werden dezimal in vier Oktetten geschrieben",
      "IPv4 bietet einen größeren Adressraum als IPv6",
      "IPv4 und IPv6 können nicht gleichzeitig auf einem Gerät laufen",
    ],
    correct: 0,
    explanation: "IPv6 ersetzt Broadcast durch Multicast. IPv6 ist hexadezimal (8 × 16 Bit), hat 128 statt 32 Bit, und mit Dual-Stack laufen beide Protokolle parallel.",
  },
  {
    id: "nw-20", topic: "netzwerk", level: 2, kind: "mc",
    prompt: "Eine IP-Kamera soll über PoE+ versorgt werden. Welcher Standard ist dafür am Switch nötig?",
    options: ["IEEE 802.3at", "IEEE 802.3af", "IEEE 802.11ac", "IEEE 802.1Q"],
    correct: 0,
    explanation: "802.3af (PoE) liefert bis ca. 15,4 W am Port, 802.3at (PoE+) bis ca. 30 W. 802.11ac ist WLAN, 802.1Q ist VLAN-Tagging.",
  },
  {
    id: "nw-21", topic: "netzwerk", level: 2, kind: "mc",
    prompt: "Warum ist eine IP-Kamera mit der Adresse 192.168.16.52 nicht direkt aus dem Internet erreichbar?",
    options: [
      "Es ist eine private Adresse, die im Internet nicht geroutet wird",
      "Die Adresse ist eine Broadcastadresse",
      "Kameras dürfen grundsätzlich keine IP-Adresse haben",
      "Die Adresse liegt im IPv6-Bereich",
    ],
    correct: 0,
    explanation: "192.168.0.0/16 ist ein privater Bereich nach RFC 1918. Für Zugriff von außen braucht man z. B. ein VPN oder eine Portweiterleitung am Router, wobei VPN die sicherere Lösung ist.",
  },

  // ── Wirtschaftlichkeit ─────────────────────────────────────────────────────
  {
    id: "wi-09", topic: "wirtschaftlichkeit", level: 2, kind: "number",
    prompt: "Angebot für einen Monitor: Listenpreis 1.150,00 €, 15 % Liefererrabatt, 2 % Skonto, Bezugskosten 12,00 €. Wie hoch ist der Bezugspreis?",
    answer: 969.95, unit: "€",
    explanation: "1.150 − 15 % = 977,50 € (Zieleinkaufspreis). − 2 % Skonto = 957,95 € (Bareinkaufspreis). + 12,00 € Bezugskosten = 969,95 €.",
    tipp: "Schema auswendig: Listenpreis → − Rabatt → Zieleinkaufspreis → − Skonto → Bareinkaufspreis → + Bezugskosten → Bezugspreis. Zwischenergebnisse hinschreiben gibt Teilpunkte.",
  },
  {
    id: "wi-10", topic: "wirtschaftlichkeit", level: 2, kind: "number",
    prompt: "Eine Serverausstattung kostet beim Kauf 18.000 €. Ein Leasingangebot verlangt 420 € pro Monat über 48 Monate. Wie viel teurer ist Leasing über die Laufzeit?",
    answer: 2160, unit: "€",
    explanation: "420 € × 48 = 20.160 €. 20.160 € − 18.000 € = 2.160 € Mehrkosten. Dafür bleibt beim Leasing die Liquidität erhalten.",
  },
  {
    id: "wi-11", topic: "wirtschaftlichkeit", level: 3, kind: "number",
    prompt: "Für neue Hardware wird ein Ratendarlehen über 9.000 € aufgenommen: Laufzeit 3 Jahre, jährlich gleiche Tilgung, 5 % Zinsen auf die Restschuld zu Jahresbeginn. Wie hoch sind die Zinsen insgesamt?",
    answer: 900, unit: "€",
    explanation: "Tilgung 3.000 €/Jahr. Zinsen: Jahr 1: 5 % von 9.000 = 450 €, Jahr 2: 5 % von 6.000 = 300 €, Jahr 3: 5 % von 3.000 = 150 €. Summe 900 €.",
    tipp: "Bei Ratendarlehen sinken die Zinsen jedes Jahr. Am besten als Tabelle mit Restschuld, Zinsen, Tilgung und Zahlung aufschreiben.",
  },
  {
    id: "wi-12", topic: "wirtschaftlichkeit", level: 3, kind: "number",
    prompt: "Ein Mitarbeiter kostet die Firma 120.000 € im Jahr. Von 260 Arbeitstagen fallen 30 Urlaubstage, 8 Krankheitstage und 10 Feiertage weg, ein Tag hat 8 Stunden. Wie hoch ist der Stundensatz?",
    answer: 70.75, unit: "€/h",
    explanation: "260 − 30 − 8 − 10 = 212 Tage × 8 h = 1.696 h. 120.000 € ÷ 1.696 h = 70,75 €/h.",
  },
  {
    id: "wi-13", topic: "wirtschaftlichkeit", level: 1, kind: "number",
    prompt: "25 Arbeitsplätze werden auf ein neues Betriebssystem migriert. Pro Arbeitsplatz rechnet man 1,5 Stunden zu je 85 €. Wie hoch sind die Arbeitskosten?",
    answer: 3187.5, unit: "€",
    explanation: "25 × 1,5 h = 37,5 h. 37,5 h × 85 € = 3.187,50 €.",
  },
  {
    id: "wi-14", topic: "wirtschaftlichkeit", level: 2, kind: "number",
    prompt: "Ein Angebot enthält 55 Softwarelizenzen zu je 48 € und einen Server für 2.100 € (alles netto). Wie hoch ist der Bruttobetrag bei 19 % USt?",
    answer: 5640.6, unit: "€",
    explanation: "55 × 48 € = 2.640 €. + 2.100 € = 4.740 € netto. × 1,19 = 5.640,60 € brutto.",
  },
  {
    id: "wi-15", topic: "wirtschaftlichkeit", level: 1, kind: "mc",
    prompt: "Auf einem Markt gibt es nur wenige Anbieter, aber sehr viele Nachfrager. Wie heißt diese Marktform?",
    options: ["Angebotsoligopol", "Polypol", "Angebotsmonopol", "Nachfragemonopol"],
    correct: 0,
    explanation: "Wenige Anbieter = Oligopol, ein Anbieter = Monopol, viele Anbieter und viele Nachfrager = Polypol.",
  },
  {
    id: "wi-16", topic: "wirtschaftlichkeit", level: 1, kind: "mc",
    prompt: "Welcher Vorteil spricht für Leasing statt Kauf von IT-Geräten?",
    options: [
      "Die Liquidität bleibt erhalten, weil keine hohe Einmalzahlung anfällt",
      "Der Leasingnehmer wird sofort Eigentümer",
      "Leasing ist über die Laufzeit immer günstiger als Kauf",
      "Der Leasingnehmer darf die Geräte beliebig umbauen",
    ],
    correct: 0,
    explanation: "Leasing verteilt die Kosten auf planbare Monatsraten, die Geräte bleiben aktuell. Eigentümer bleibt der Leasinggeber, und meist ist Leasing in Summe teurer als Kauf.",
  },
  {
    id: "wi-17", topic: "wirtschaftlichkeit", level: 2, kind: "number",
    prompt: "Nutzwertanalyse für einen Thin Client. Gewichtung: Preis 40 %, Wartung 35 %, Platzbedarf 25 %. Punkte: Preis 3, Wartung 4, Platzbedarf 5. Wie hoch ist der Nutzwert?",
    answer: 3.85,
    explanation: "0,40 × 3 + 0,35 × 4 + 0,25 × 5 = 1,20 + 1,40 + 1,25 = 3,85.",
    tipp: "Prüf immer, ob die Gewichte zusammen 100 % ergeben. Falls nicht, hast du dich verlesen.",
  },

  // ── IT-Sicherheit ──────────────────────────────────────────────────────────
  {
    id: "is-11", topic: "it-sicherheit", level: 2, kind: "mc",
    prompt: "Vor der Installation einer Software wird ihr Hashwert mit dem Wert auf der Herstellerseite verglichen. Welches Schutzziel wird damit geprüft?",
    options: ["Integrität", "Vertraulichkeit", "Verfügbarkeit", "Anonymität"],
    correct: 0,
    explanation: "Ein passender Hashwert zeigt, dass die Datei unverändert ist. Unverfälschtheit ist Integrität.",
  },
  {
    id: "is-12", topic: "it-sicherheit", level: 1, kind: "mc",
    prompt: "Die Festplatten aller Notebooks werden verschlüsselt. Welches Schutzziel steht dabei im Vordergrund?",
    options: ["Vertraulichkeit", "Verfügbarkeit", "Integrität", "Authentizität"],
    correct: 0,
    explanation: "Bei Diebstahl oder Verlust können Unbefugte die Daten nicht lesen. Das schützt die Vertraulichkeit.",
  },
  {
    id: "is-13", topic: "it-sicherheit", level: 1, kind: "mc",
    prompt: "Was versteht man unter der Härtung eines Betriebssystems?",
    options: [
      "Angriffsfläche verkleinern, z. B. unnötige Dienste und Ports abschalten und Updates einspielen",
      "Das Betriebssystem auf eine SSD installieren",
      "Den Rechner in ein stoßfestes Gehäuse einbauen",
      "Alle Benutzer zu Administratoren machen",
    ],
    correct: 0,
    explanation: "Härtung heißt: nur das Nötigste aktiv lassen, Patches einspielen, sichere Kennwörter und Rechte vergeben. Hinweise dazu gibt das BSI.",
  },
  {
    id: "is-14", topic: "it-sicherheit", level: 2, kind: "mc",
    prompt: "Eine Firma sichert jeden Freitag ihre Daten auf eine zweite Partition derselben Festplatte. Was ist das größte Risiko?",
    options: [
      "Fällt die Festplatte aus, sind Original und Sicherung gleichzeitig verloren",
      "Die Sicherung ist zu schnell fertig",
      "Partitionen können keine Dateien speichern",
      "Die Sicherung verstößt gegen die DSGVO",
    ],
    correct: 0,
    explanation: "Eine Partition auf demselben Datenträger ist keine Sicherung gegen Hardwaredefekt, Diebstahl oder Ransomware. Besser: externes Medium, 3-2-1-Regel und z. B. Großvater-Vater-Sohn-Rotation.",
  },
  {
    id: "is-15", topic: "it-sicherheit", level: 2, kind: "mc",
    prompt: "Was beschreibt das Großvater-Vater-Sohn-Prinzip bei der Datensicherung?",
    options: [
      "Rotation von täglichen, wöchentlichen und monatlichen Sicherungsmedien",
      "Drei Kopien an drei verschiedenen Standorten",
      "Sicherung nur der seit der letzten Vollsicherung geänderten Daten",
      "Spiegelung der Daten auf zwei Festplatten",
    ],
    correct: 0,
    explanation: "Söhne = Tagessicherungen, Väter = Wochensicherungen, Großväter = Monatssicherungen. So kann man auf verschiedene Zeitpunkte zurückgreifen, ohne unendlich viele Medien zu brauchen.",
  },
  {
    id: "is-16", topic: "it-sicherheit", level: 2, kind: "mc",
    prompt: "Ein Lager führt Videoüberwachung ein. Welche Pflicht ergibt sich aus dem Datenschutz?",
    options: [
      "Mit einem Hinweisschild vor Betreten des überwachten Bereichs informieren",
      "Die Aufnahmen öffentlich zugänglich machen",
      "Die Aufnahmen unbegrenzt speichern",
      "Auch den öffentlichen Gehweg vor dem Gebäude filmen",
    ],
    correct: 0,
    explanation: "Betroffene müssen vorab über die Überwachung informiert werden. Öffentliche Bereiche sind auszusparen, Speicherdauer und Zweck müssen begrenzt und festgelegt sein.",
  },
  {
    id: "is-17", topic: "it-sicherheit", level: 1, kind: "mc",
    prompt: "Eine neue IP-Kamera ist mit dem Standardpasswort des Herstellers erreichbar. Was ist die wichtigste Sofortmaßnahme?",
    options: [
      "Das Standardpasswort durch ein sicheres, individuelles Passwort ersetzen",
      "Die Kamera in ein anderes Gehäuse einbauen",
      "Die Auflösung der Kamera reduzieren",
      "Das Passwort auf die Kamera kleben",
    ],
    correct: 0,
    explanation: "Standardpasswörter sind öffentlich bekannt und werden von Angreifern automatisiert ausprobiert. Ohne Änderung besteht praktisch kein Zugriffsschutz.",
  },
  {
    id: "is-18", topic: "it-sicherheit", level: 2, kind: "mc",
    prompt: "Welches Risiko entsteht durch BYOD (Bring Your Own Device)?",
    options: [
      "Schadsoftware von privaten Geräten kann ins Firmennetz gelangen",
      "Die Firma muss keine Geräte mehr kaufen",
      "Mitarbeiter arbeiten mit vertrauten Geräten",
      "Die Geräte sind immer auf dem neuesten Stand",
    ],
    correct: 0,
    explanation: "Private Geräte entziehen sich oft der zentralen Verwaltung (Updates, Virenschutz). Gegenmaßnahmen sind ein getrenntes Gast-LAN/WLAN und Mobile-Device-Management.",
  },
  {
    id: "is-19", topic: "it-sicherheit", level: 2, kind: "mc",
    prompt: "Wozu werden Gruppenrichtlinien (GPO) in einer Windows-Domäne eingesetzt?",
    options: [
      "Um Einstellungen wie Kennwortregeln oder USB-Sperren zentral auf viele Clients zu verteilen",
      "Um Benutzergruppen in Microsoft Teams anzulegen",
      "Um Druckaufträge zu beschleunigen",
      "Um die Hardware der Clients zu inventarisieren",
    ],
    correct: 0,
    explanation: "Mit GPOs legt der Administrator Regeln einmal fest und sie gelten für alle zugeordneten Rechner bzw. Benutzer, z. B. Kennwortrichtlinien, Laufwerkszuordnungen oder gesperrte Speichermedien.",
  },
  {
    id: "is-20", topic: "it-sicherheit", level: 2, kind: "mc",
    prompt: "In einer Arztpraxis werden Patientendaten verarbeitet. Welchen Schutzbedarf hat die Integrität dieser Daten?",
    options: [
      "Sehr hoch, weil falsche Daten zu Behandlungsfehlern und Gefahr für Leib und Leben führen können",
      "Normal, weil Patienten ihre Daten selbst kennen",
      "Keinen, weil nur die Vertraulichkeit zählt",
      "Niedrig, weil die Daten ohnehin gesichert werden",
    ],
    correct: 0,
    explanation: "Bei der Schutzbedarfsfeststellung immer die Folgen begründen: Werden Diagnosen oder Medikationen verfälscht, drohen Personenschäden. Das ist die Kategorie „sehr hoch“.",
    tipp: "Eine Kategorie ohne Begründung bringt in der Prüfung kaum Punkte. Immer „weil …“ mit einer konkreten Folge schreiben.",
  },

  // ── Hardware & Systeme ─────────────────────────────────────────────────────
  {
    id: "hw-08", topic: "hardware", level: 1, kind: "number",
    prompt: "Ein Prozessor ist mit 3,6 GHz getaktet. Wie viele Hertz sind das?",
    answer: 3600000000, unit: "Hz",
    explanation: "Giga = 10⁹. 3,6 × 1.000.000.000 = 3.600.000.000 Hz.",
  },
  {
    id: "hw-09", topic: "hardware", level: 1, kind: "mc",
    prompt: "Welche Aufgabe hat Wärmeleitpaste zwischen CPU und Kühler?",
    options: [
      "Sie füllt Unebenheiten aus und verbessert die Wärmeübertragung zum Kühler",
      "Sie klebt den Kühler dauerhaft fest",
      "Sie isoliert die CPU elektrisch vom Mainboard",
      "Sie ersetzt den Lüfter",
    ],
    correct: 0,
    explanation: "Zwischen Heatspreader und Kühlerboden bleiben winzige Lufteinschlüsse. Luft leitet Wärme schlecht, die Paste schließt diese Lücken.",
  },
  {
    id: "hw-10", topic: "hardware", level: 2, kind: "mc",
    prompt: "Ein Kunde will ein DDR4-Modul und ein DDR5-Modul zusammen in einen PC einbauen. Was stimmt?",
    options: [
      "Das geht nicht, DDR4 und DDR5 sind mechanisch und elektrisch nicht kompatibel",
      "Das geht, beide laufen dann mit DDR5-Takt",
      "Das geht, der PC nutzt dann Dual-Channel",
      "Das geht nur mit einem BIOS-Update",
    ],
    correct: 0,
    explanation: "Jedes Mainboard unterstützt nur eine DDR-Generation, die Kerbe sitzt an anderer Stelle. Bei zwei Modulen gleicher Generation mit unterschiedlichem Takt laufen beide mit dem langsameren Takt.",
  },
  {
    id: "hw-11", topic: "hardware", level: 2, kind: "mc",
    prompt: "Zwei identische RAM-Module sollen im Dual-Channel-Betrieb laufen. Wie gehst du vor?",
    options: [
      "Im Mainboard-Handbuch nachsehen und die Module in die angegebenen Bänke verschiedener Kanäle stecken (z. B. A2 und B2)",
      "Beide Module direkt nebeneinander in A1 und A2 stecken",
      "Ein Modul in einen beliebigen Slot stecken und das zweite weglassen",
      "Die Module in jeden zweiten Slot stecken, egal welcher Kanal",
    ],
    correct: 0,
    explanation: "Dual-Channel braucht je ein Modul pro Kanal. Welche Bänke das sind, steht im Handbuch, oft A2 und B2.",
  },
  {
    id: "hw-12", topic: "hardware", level: 2, kind: "mc",
    prompt: "Welcher Vorteil spricht für eine M.2-NVMe-SSD gegenüber einer 2,5-Zoll-SATA-SSD?",
    options: [
      "Deutlich höhere Datenrate über PCIe und kein Kabel nötig",
      "Sie ist immer günstiger pro GB",
      "Sie wird im Betrieb nie warm",
      "Sie passt in jedes ältere Notebook",
    ],
    correct: 0,
    explanation: "NVMe nutzt PCIe-Lanes und ist damit ein Vielfaches schneller als SATA (max. ca. 600 MB/s). Nachteil: Die Wärme entsteht direkt auf dem Mainboard, oft ist ein Kühlkörper sinnvoll.",
  },
  {
    id: "hw-13", topic: "hardware", level: 1, kind: "mc",
    prompt: "Welcher Nachteil gilt für einen Thin Client gegenüber einem Desktop-PC?",
    options: [
      "Ohne Server und Netzwerkverbindung kann er nicht sinnvoll arbeiten",
      "Er braucht mehr Platz auf dem Schreibtisch",
      "Er verbraucht mehr Strom",
      "Er ist schwerer zu warten",
    ],
    correct: 0,
    explanation: "Ein Thin Client zeigt nur an, was auf einem Server läuft (z. B. VDI). Er ist günstig, sparsam und leicht zu warten, aber nicht als Insellösung nutzbar.",
  },
  {
    id: "hw-14", topic: "hardware", level: 2, kind: "mc",
    prompt: "Wozu dient der Cache (L1, L2, L3) eines Prozessors?",
    options: [
      "Er puffert häufig genutzte Daten und Befehle, weil der Arbeitsspeicher viel langsamer ist als die CPU",
      "Er speichert das BIOS",
      "Er ersetzt den Arbeitsspeicher vollständig",
      "Er speichert Daten dauerhaft nach dem Ausschalten",
    ],
    correct: 0,
    explanation: "L1 ist am kleinsten und schnellsten, L3 am größten. Ohne Cache müsste die CPU ständig auf den langsameren RAM warten.",
  },
  {
    id: "hw-15", topic: "hardware", level: 2, kind: "mc",
    prompt: "Der Task-Manager zeigt bei einer CPU mit 8 Kernen 16 logische Prozessoren. Woran liegt das?",
    options: [
      "Hyper-Threading / SMT: Jeder physische Kern führt zwei Threads parallel aus",
      "Die CPU hat in Wahrheit 16 physische Kerne",
      "Windows zählt jeden Kern doppelt aus Lizenzgründen",
      "Der Arbeitsspeicher wird als Prozessor mitgezählt",
    ],
    correct: 0,
    explanation: "Durch SMT erscheint jeder Kern dem Betriebssystem als zwei logische Prozessoren. Die Leistung verdoppelt sich dadurch aber nicht.",
  },
  {
    id: "hw-16", topic: "hardware", level: 3, kind: "mc",
    prompt: "Drei Monitore sollen per DisplayPort hintereinander (Daisy Chain) an einem Notebook-Anschluss betrieben werden. Was ist Voraussetzung?",
    options: [
      "Grafikkarte und Monitore müssen DisplayPort MST unterstützen",
      "Alle Monitore brauchen einen HDMI-Eingang",
      "Die Monitore müssen per VGA verbunden sein",
      "Es funktioniert nur mit USB-A",
    ],
    correct: 0,
    explanation: "Multi-Stream Transport (MST) überträgt mehrere Bildsignale über ein Kabel. Vorteil: weniger Kabel am Rechner.",
  },
  {
    id: "hw-17", topic: "hardware", level: 2, kind: "number",
    prompt: "Ein JBOD-Verbund besteht aus zwei 3-TB- und drei 2-TB-Festplatten. Wie viel Speicher steht zur Verfügung?",
    answer: 12, unit: "TB",
    explanation: "JBOD hängt die Platten einfach aneinander: 2 × 3 TB + 3 × 2 TB = 12 TB. Es gibt keine Redundanz, dafür sind unterschiedliche Größen kein Problem.",
  },
  {
    id: "hw-18", topic: "hardware", level: 2, kind: "mc",
    prompt: "Welche Aussage zu RAID 0 ist richtig?",
    options: [
      "Daten werden auf mindestens zwei Platten verteilt (Striping), fällt eine aus, sind alle Daten verloren",
      "Daten werden gespiegelt, eine Platte darf ausfallen",
      "Es braucht mindestens drei Platten und speichert Parität",
      "Es halbiert die nutzbare Kapazität",
    ],
    correct: 0,
    explanation: "RAID 0 bringt hohe Lese- und Schreibgeschwindigkeit, aber keinerlei Redundanz. RAID 1 spiegelt, RAID 5 nutzt Parität ab drei Platten.",
  },
  {
    id: "hw-19", topic: "hardware", level: 1, kind: "mc",
    prompt: "Welcher Vorteil spricht bei der Inventarisierung für RFID-Etiketten gegenüber QR-Codes?",
    options: [
      "Sie können ohne Sichtkontakt per Funk erfasst werden",
      "Sie sind günstiger in der Herstellung",
      "Sie lassen sich mit jeder Smartphone-Kamera auslesen",
      "Sie brauchen keine Lesegeräte",
    ],
    correct: 0,
    explanation: "RFID funktioniert per Funkfeld, auch mehrere Tags gleichzeitig. Nachteile: Tags und Lesegeräte kosten mehr. QR-Codes sind billig und per Handy lesbar, brauchen aber freie Sicht.",
  },

  // ── Speicher & Übertragung ─────────────────────────────────────────────────
  {
    id: "sp-08", topic: "speicher-uebertragung", level: 3, kind: "number",
    prompt: "Eine Kamera nimmt 1280 × 720 Pixel mit 24 Bit Farbtiefe und 25 Bildern pro Sekunde auf. Die Kompression reduziert die Datenmenge auf 20 %. Wie hoch ist die Datenrate in Mbit/s (1 Mbit = 10⁶ Bit)?",
    answer: 110.59, tolerance: 0.1, unit: "Mbit/s",
    explanation: "1280 × 720 × 24 Bit × 25 = 552.960.000 Bit/s. × 0,2 = 110.592.000 Bit/s ≈ 110,59 Mbit/s.",
    tipp: "Erst unkomprimiert ausrechnen, dann den Kompressionsfaktor anwenden. Einheiten bei jedem Zwischenschritt mitschreiben.",
  },
  {
    id: "sp-09", topic: "speicher-uebertragung", level: 3, kind: "number",
    prompt: "Drei Kameras zeichnen jeweils 24 Stunden mit 100 Mbit/s (10⁶) auf. Wie viel Speicher wird in TiB benötigt? (auf zwei Nachkommastellen)",
    answer: 2.95, tolerance: 0.01, unit: "TiB",
    explanation: "3 × 24 × 3.600 s × 100.000.000 Bit/s = 25.920.000.000.000 Bit. ÷ 8 = 3,24 × 10¹² Byte. ÷ 1024⁴ ≈ 2,95 TiB.",
    tipp: "Dezimale Bitrate (10⁶) und binäre Speichergröße (1024⁴) werden in der AP1 gern gemischt. Lies genau, welche Einheit gefragt ist.",
  },
  {
    id: "sp-10", topic: "speicher-uebertragung", level: 2, kind: "number",
    prompt: "Eine Datei mit 250 MiB wird über eine Upload-Leitung mit 50 Mbit/s (10⁶) hochgeladen. Wie viele Sekunden dauert das (ohne Overhead)?",
    answer: 41.94, tolerance: 0.05, unit: "s",
    explanation: "250 × 1024 × 1024 × 8 = 2.097.152.000 Bit. ÷ 50.000.000 Bit/s ≈ 41,94 s.",
  },
  {
    id: "sp-11", topic: "speicher-uebertragung", level: 2, kind: "number",
    prompt: "Ein Dokument von 8 × 10 Zoll wird mit 300 dpi und 24 Bit Farbtiefe gescannt. Wie groß ist die Datei in MiB? (auf eine Nachkommastelle)",
    answer: 20.6, tolerance: 0.05, unit: "MiB",
    explanation: "8 × 300 = 2.400 und 10 × 300 = 3.000 Pixel. 2.400 × 3.000 × 3 Byte = 21.600.000 Byte. ÷ 1024² ≈ 20,6 MiB.",
  },

  // ── Energie & Nachhaltigkeit ───────────────────────────────────────────────
  {
    id: "en-08", topic: "energie", level: 2, kind: "number",
    prompt: "Wie viel Leistung darf an einer Steckdosenleiste mit 230 V und 16 A Absicherung maximal angeschlossen werden?",
    answer: 3680, unit: "W",
    explanation: "P = U × I = 230 V × 16 A = 3.680 W. Hängen z. B. drei PCs, ein Laserdrucker, ein Wasserkocher und ein Heizlüfter daran, ist diese Grenze schnell überschritten.",
  },
  {
    id: "en-09", topic: "energie", level: 2, kind: "number",
    prompt: "Ein neuer PC kostet 164 € mehr als das günstigere Modell, spart aber Strom: 5,10 € statt 9,20 € pro Monat. Nach wie vielen Monaten hat sich der Aufpreis amortisiert?",
    answer: 40, unit: "Monate",
    explanation: "Ersparnis 9,20 € − 5,10 € = 4,10 € pro Monat. 164 € ÷ 4,10 € = 40 Monate.",
  },
  {
    id: "en-10", topic: "energie", level: 1, kind: "number",
    prompt: "Ein PoE-Gerät arbeitet mit 48 V und nimmt 0,35 A auf. Welche Leistung zieht es?",
    answer: 16.8, unit: "W",
    explanation: "P = U × I = 48 V × 0,35 A = 16,8 W. Das ist mehr als PoE (802.3af) sicher liefert, hier braucht es PoE+ (802.3at).",
  },
  {
    id: "en-11", topic: "energie", level: 1, kind: "mc",
    prompt: "Wie spart eine Master-Slave-Steckdosenleiste Energie?",
    options: [
      "Wird das Master-Gerät ausgeschaltet, trennt sie die Slave-Geräte automatisch vom Strom",
      "Sie wandelt Wechselstrom in Gleichstrom um",
      "Sie schaltet den PC nachts automatisch ein",
      "Sie erhöht die Spannung für effizientere Netzteile",
    ],
    correct: 0,
    explanation: "Schaltet man den PC (Master) aus, gehen Monitor, Drucker und Lautsprecher (Slaves) mit aus und verbrauchen keinen Standby-Strom mehr.",
  },

  // ── Programmierung & Daten ─────────────────────────────────────────────────
  {
    id: "pr-10", topic: "programmierung", level: 1, kind: "mc",
    prompt: "Die Tabelle Vertrag hat die Spalte Summe. Welche SQL-Abfrage liefert die durchschnittliche Versicherungssumme?",
    options: [
      "SELECT AVG(Summe) FROM Vertrag;",
      "SELECT SUM(Summe) FROM Vertrag;",
      "SELECT COUNT(Summe) FROM Vertrag;",
      "SELECT Summe FROM Vertrag ORDER BY AVG;",
    ],
    correct: 0,
    explanation: "AVG bildet den Durchschnitt, SUM die Summe, COUNT zählt Zeilen.",
  },
  {
    id: "pr-11", topic: "programmierung", level: 2, kind: "mc",
    prompt: "Welche Abfrage zählt alle Aufträge der Tabelle Auftrag mit Material = 'Wellpappe' und Dicke = 2?",
    options: [
      "SELECT COUNT(*) FROM Auftrag WHERE Material = 'Wellpappe' AND Dicke = 2;",
      "SELECT COUNT(*) FROM Auftrag WHERE Material = 'Wellpappe' OR Dicke = 2;",
      "SELECT * FROM Auftrag GROUP BY Material = 'Wellpappe';",
      "COUNT Auftrag WHERE Material IS 'Wellpappe', Dicke = 2;",
    ],
    correct: 0,
    explanation: "Beide Bedingungen müssen gelten, also AND. OR würde auch Aufträge mit anderem Material, aber Dicke 2 mitzählen.",
  },
  {
    id: "pr-12", topic: "programmierung", level: 1, kind: "mc",
    prompt: "Was unterscheidet einen Compiler von einem Interpreter?",
    options: [
      "Der Compiler übersetzt den gesamten Quellcode vor der Ausführung, der Interpreter Zeile für Zeile zur Laufzeit",
      "Der Interpreter erzeugt immer eine .exe-Datei",
      "Der Compiler führt den Code nur im Browser aus",
      "Es gibt keinen Unterschied",
    ],
    correct: 0,
    explanation: "Kompilierte Programme starten schneller, interpretierte Programme sind plattformunabhängiger und leichter zu testen.",
  },
  {
    id: "pr-13", topic: "programmierung", level: 3, kind: "number",
    prompt: "Führe einen Schreibtischtest durch. Welchen Gesamtpreis gibt die Funktion für die Pakete (3 kg, normal), (12 kg, express) und (7 kg, express) zurück?",
    code: `funktion versandkosten(pakete)
  summe = 0
  für jedes p in pakete
    wenn p.gewicht <= 10 dann
      preis = 4,99
    sonst
      preis = 8,99
    wenn p.express dann
      preis = preis + 3,50
    summe = summe + preis
  rückgabe summe`,
    answer: 25.97, unit: "€",
    explanation: "Paket 1: 4,99. Paket 2: 8,99 + 3,50 = 12,49. Paket 3: 4,99 + 3,50 = 8,49. Summe 25,97 €.",
    tipp: "Beim Schreibtischtest eine Tabelle mit einer Spalte pro Variable anlegen und jede Zeile abarbeiten. Genau das wird bewertet.",
  },
  {
    id: "pr-14", topic: "programmierung", level: 1, kind: "mc",
    prompt: "Was bedeutet das Minuszeichen vor einem Attribut im UML-Klassendiagramm, z. B. „- maxGewicht : double“?",
    options: ["Das Attribut ist private", "Das Attribut ist public", "Das Attribut ist statisch", "Das Attribut ist negativ"],
    correct: 0,
    explanation: "UML-Sichtbarkeiten: - private, + public, # protected, ~ package.",
  },
  {
    id: "pr-15", topic: "programmierung", level: 2, kind: "mc",
    prompt: "Was beschreibt Vererbung in der objektorientierten Programmierung?",
    options: [
      "Eine Unterklasse übernimmt Attribute und Methoden der Oberklasse und kann sie erweitern",
      "Ein Objekt wird in eine Datei gespeichert",
      "Zwei Klassen tauschen ihre Methoden aus",
      "Eine Variable wird an eine Funktion übergeben",
    ],
    correct: 0,
    explanation: "Beispiel: Die Klasse Kfz-Versicherung erbt von Versicherungsobjekt. Gemeinsamer Code steht nur einmal in der Oberklasse, das spart Aufwand und macht Erweiterungen einfacher.",
  },
  {
    id: "pr-16", topic: "programmierung", level: 2, kind: "mc",
    prompt: "Ein Kunde kann viele Bestellungen haben, jede Bestellung gehört zu genau einem Kunden. Wo steht im relationalen Modell der Fremdschlüssel?",
    options: [
      "In der Tabelle Bestellung (Spalte KundenID)",
      "In der Tabelle Kunde (Spalte BestellID)",
      "In einer eigenen Zwischentabelle",
      "Es wird kein Fremdschlüssel benötigt",
    ],
    correct: 0,
    explanation: "Bei 1:n kommt der Fremdschlüssel auf die n-Seite. Eine Zwischentabelle braucht man erst bei m:n.",
  },
  {
    id: "pr-17", topic: "programmierung", level: 2, kind: "number",
    prompt: "Der Code soll einen Anteil in Prozent berechnen, enthält aber einen Fehler. Welchen Wert müsste er für teil = 30 und gesamt = 120 korrekt ausgeben?",
    code: `anteil = teil / gesamt * 1000
ausgabe anteil + " %"`,
    answer: 25, unit: "%",
    explanation: "Richtig ist * 100: 30 ÷ 120 × 100 = 25 %. Mit * 1000 kämen fälschlich 250 heraus.",
  },

  // ── Projektmanagement ──────────────────────────────────────────────────────
  {
    id: "pm-08", topic: "projektmanagement", level: 1, kind: "mc",
    prompt: "Welches ist KEIN typisches Merkmal eines Projekts?",
    options: ["Dauerhafte Wiederholung derselben Tätigkeit", "Einmaligkeit", "Zeitliche Begrenzung", "Begrenzte Ressourcen und Budget"],
    correct: 0,
    explanation: "Projekte sind einmalig, zeitlich begrenzt, haben ein konkretes Ziel und begrenzte Ressourcen. Wiederkehrende Tätigkeiten sind Routine, kein Projekt.",
  },
  {
    id: "pm-09", topic: "projektmanagement", level: 2, kind: "number",
    prompt: "Netzplan: A (2 Tage), B (4 Tage, nach A), C (3 Tage, nach A), D (5 Tage, nach B), E (2 Tage, nach C), F (3 Tage, nach D und E). Wie lange dauert das Projekt?",
    answer: 14, unit: "Tage",
    explanation: "Pfad A-B-D-F: 2 + 4 + 5 + 3 = 14. Pfad A-C-E-F: 2 + 3 + 2 + 3 = 10. Der längste Pfad bestimmt die Dauer.",
  },
  {
    id: "pm-10", topic: "projektmanagement", level: 3, kind: "number",
    prompt: "Wie groß ist im gleichen Netzplan der Gesamtpuffer von Vorgang E?",
    answer: 4, unit: "Tage",
    explanation: "Vorwärts: E beginnt frühestens an Tag 5 (FAZ) und endet an Tag 7 (FEZ). F beginnt frühestens an Tag 11. Rückwärts: E muss spätestens an Tag 11 enden (SEZ), also SAZ = 9. Gesamtpuffer = SAZ − FAZ = 9 − 5 = 4.",
    tipp: "In der Prüfung wird gern ein ausgefüllter Netzplan mit einem Fehler gezeigt. Rechne FAZ/FEZ vorwärts und SAZ/SEZ rückwärts selbst nach.",
  },
  {
    id: "pm-11", topic: "projektmanagement", level: 2, kind: "mc",
    prompt: "Was gehört typischerweise in das Pflichtenheft, aber nicht ins Lastenheft?",
    options: [
      "Wie der Auftragnehmer die Anforderungen umsetzt und testet",
      "Die Wünsche des Kunden an das Produkt",
      "Der vom Kunden gewünschte Liefertermin",
      "Die Ausgangssituation beim Kunden",
    ],
    correct: 0,
    explanation: "Lastenheft = WAS und WOFÜR, erstellt vom Auftraggeber. Pflichtenheft = WIE und WOMIT, erstellt vom Auftragnehmer, inklusive Testvorgehen und Abnahmekriterien.",
  },
  {
    id: "pm-12", topic: "projektmanagement", level: 2, kind: "mc",
    prompt: "Ein neues Lagersystem wird per Sofortumstellung statt im Parallelbetrieb eingeführt. Was ist der Hauptnachteil?",
    options: [
      "Bei Fehlern gibt es kein funktionierendes Altsystem als Rückfallebene",
      "Die Mitarbeiter müssen zwei Systeme gleichzeitig pflegen",
      "Die Einführung dauert länger",
      "Die Daten werden doppelt erfasst",
    ],
    correct: 0,
    explanation: "Beim Parallelbetrieb laufen alt und neu nebeneinander, das ist sicherer, aber aufwendiger. Bei der Sofortumstellung kann ein kleiner Fehler den ganzen Betrieb lahmlegen.",
  },
  {
    id: "pm-13", topic: "projektmanagement", level: 1, kind: "mc",
    prompt: "Wozu dient die Ist-Analyse zu Beginn eines Projekts?",
    options: [
      "Sie erfasst den aktuellen Zustand als Ausgangspunkt für das Soll-Konzept",
      "Sie legt die Abnahmekriterien fest",
      "Sie bewertet den Projekterfolg nach Abschluss",
      "Sie berechnet den kritischen Pfad",
    ],
    correct: 0,
    explanation: "Reihenfolge: Ist-Analyse → Soll-Konzept → Planung → Umsetzung → Kontrolle der Zielerreichung.",
  },
  {
    id: "pm-14", topic: "projektmanagement", level: 2, kind: "mc",
    prompt: "Welches Interesse haben die Mitarbeitenden typischerweise als Stakeholder eines IT-Projekts?",
    options: [
      "Ein System, das ihre Arbeit erleichtert, und rechtzeitige Einbindung und Schulung",
      "Eine möglichst hohe Rendite auf das eingesetzte Kapital",
      "Möglichst viele Folgeaufträge",
      "Die Einhaltung von Steuerfristen",
    ],
    correct: 0,
    explanation: "Ohne Akzeptanz der Mitarbeitenden scheitert die Einführung. Anteilseigner achten auf Rendite und Finanzierung, Lieferanten auf Realisierbarkeit und Folgeaufträge.",
  },

  // ── Kunden & Qualität ──────────────────────────────────────────────────────
  {
    id: "kq-09", topic: "kunden-qualitaet", level: 2, kind: "mc",
    prompt: "Was ist ein Nachteil von Fernwartung (Remote-Support) gegenüber der Vor-Ort-Wartung?",
    options: [
      "Ohne funktionierende Internetverbindung ist keine Hilfe möglich und Hardware lässt sich nicht anfassen",
      "Es entstehen hohe Anfahrtskosten",
      "Die Reaktionszeit ist länger",
      "Der Techniker muss immer vor Ort sein",
    ],
    correct: 0,
    explanation: "Fernwartung spart Anfahrt und ist schnell. Hardwaredefekte oder ein ausgefallenes Netz lassen sich so aber nicht beheben.",
  },
  {
    id: "kq-10", topic: "kunden-qualitaet", level: 1, kind: "mc",
    prompt: "Welche formale Angabe muss ein Angebot enthalten?",
    options: ["Die Gültigkeitsdauer (Bindefrist) des Angebots", "Das Geburtsdatum des Ansprechpartners", "Die Gehälter der Mitarbeitenden", "Den Gewinnaufschlag"],
    correct: 0,
    explanation: "Zu einem Angebot gehören u. a. Ansprechpartner, Leistungsbeschreibung, Preise, Zahlungs- und Lieferbedingungen und die Gültigkeitsdauer.",
  },
  {
    id: "kq-11", topic: "kunden-qualitaet", level: 2, kind: "mc",
    prompt: "Welcher Nachteil spricht gegen eine Cloud-Software im Vergleich zur On-Premises-Installation?",
    options: [
      "Abhängigkeit vom Anbieter, z. B. bei Preiserhöhungen oder Insolvenz",
      "Hohe Investitionskosten für eigene Server",
      "Kein Zugriff von unterwegs",
      "Updates müssen selbst eingespielt werden",
    ],
    correct: 0,
    explanation: "Cloud: geringe Anfangsinvestition, standortunabhängig, Updates durch den Anbieter. Dafür Abhängigkeit vom Anbieter und von der Internetverbindung sowie Datenschutzfragen zum Speicherort.",
  },
  {
    id: "kq-12", topic: "kunden-qualitaet", level: 1, kind: "mc",
    prompt: "Welcher Vorteil spricht aus Unternehmenssicht für einen KI-Chatbot im Kundenservice?",
    options: [
      "Er beantwortet Standardanfragen rund um die Uhr und viele gleichzeitig",
      "Seine Antworten müssen nie überprüft werden",
      "Er verursacht keine laufenden Kosten",
      "Er ersetzt den Datenschutz",
    ],
    correct: 0,
    explanation: "Vorteile: 24/7 erreichbar, entlastet Mitarbeitende bei einfachen Fragen. Nachteile: Kosten für Betrieb und Tokens, fehlerhafte Antworten, Entscheidungen müssen geprüft werden.",
  },
  {
    id: "kq-13", topic: "kunden-qualitaet", level: 2, kind: "mc",
    prompt: "Neue Mitarbeitende sollen eine Software lernen und Inhalte bei Bedarf wiederholen können. Welche Schulungsform passt am besten?",
    options: ["Video-Tutorials", "Einmaliges Live-Webinar ohne Aufzeichnung", "Mündliche Weitergabe unter Kollegen", "Ausgedrucktes Handbuch ohne Beispiele"],
    correct: 0,
    explanation: "Videos lassen sich jederzeit und beliebig oft abspielen. Nachteil: Rückfragen sind nicht direkt möglich, dafür eignen sich Webinare oder Schulungen am Arbeitsplatz.",
  },
  {
    id: "kq-14", topic: "kunden-qualitaet", level: 2, kind: "mc",
    prompt: "Welche Funktion bietet ein Software-Management-System für die Client-Verwaltung?",
    options: [
      "Automatische Verteilung von Software und Updates auf viele Rechner",
      "Physische Reparatur defekter Festplatten",
      "Ersatz des Betriebssystems durch eine Cloud",
      "Erstellung von Rechnungen für Kunden",
    ],
    correct: 0,
    explanation: "Typische Funktionen: automatische Installation, Patch-Verteilung, Lizenzverwaltung und Inventarisierung der Geräte.",
  },
];
