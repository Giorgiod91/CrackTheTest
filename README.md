# AP1 Ready

**AP1 Prüfungsvorbereitung für Fachinformatiker (IHK)** · [Live](https://crack-the-test.vercel.app/)

AP1 Ready bereitet Azubis auf die Abschlussprüfung Teil 1 „Einrichten eines IT-gestützten Arbeitsplatzes“ vor, für alle Fachrichtungen. Die Fragen sind nach den Aufgabentypen aufgebaut, die in den AP1-Prüfungen der letzten Jahre immer wieder vorkamen, jeweils mit Rechenweg und Prüfungstipp.

<img width="1322" height="882" alt="Dashboard" src="https://github.com/user-attachments/assets/c549d2d3-1ead-4666-9e02-fa04f553857e" />

## Funktionen

- **9 AP1-Themen**: Netzwerktechnik, Wirtschaftlichkeit, IT-Sicherheit, Hardware, Speicher & Übertragung, Energie, Programmierung & Daten, Projektmanagement, Kunden & Qualität
- **Fragenbank mit über 140 Aufgaben**: Multiple Choice und Rechenaufgaben mit Toleranz, Erklärung und Tipp
- **Übungsmodus pro Thema** mit gespeichertem Fortschritt
- **90-Minuten-Prüfungssimulation** im AP1-Format (4 Handlungsschritte) mit Notenprognose
- **KI-Übungstests**: 3 kostenlose Tests, serverseitig begrenzt
- **Öffentliche Themenseiten** (`/ap1/[thema]`) mit Beispielfragen für SEO
- **Prüfungspaket**: 15 € einmalig über Stripe, kein Abo

## Tech-Stack

Alles läuft in einer Next.js-App auf Vercel, ohne separaten Backend-Server.

| Bereich | Technik |
|---|---|
| Framework | Next.js 15 (App Router, Server Components, Route Handlers) |
| Sprache / UI | TypeScript, Tailwind CSS 4, DaisyUI |
| Auth & Datenbank | Supabase (Auth, PostgreSQL, Row Level Security) |
| Zahlungen | Stripe Checkout + Webhook |
| KI | Anthropic Claude API |
| Hosting | Vercel (inkl. Cron für Supabase-Keepalive) |

## Projektstruktur

```
src/app/
  page.tsx                      Landingpage
  ap1/, ap1-pruefungsvorbereitung/   öffentliche SEO-Seiten
  PremiumUsers/                 Dashboard, Übungsmodus, Prüfungssimulation
  Test_openAi/                  KI-Übungstests
  api/
    ap1/questions, ap1/exam     Fragen und Prüfung (Premium-Check serverseitig)
    openai/                     KI-Testgenerierung
    stripe/checkout, webhook/stripe   Bezahlung
    feedback/, keepalive/       Feedback, Cron gegen Supabase-Pausierung
src/server/ap1/                 Fragenbank und Prüfungsgenerator (nur serverseitig)
lib/ap1/                        Themen, Typen, Bewertung
lib/supabase/                   Supabase-Clients
supabase/migrations/            SQL-Migrationen
```

## Lokal starten

```bash
npm install
cp .env.example .env   # Werte eintragen
npm run dev
```

Die SQL-Dateien in `supabase/migrations/` im Supabase SQL Editor ausführen.

### Umgebungsvariablen

| Variable | Zweck |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase-Client |
| `SUPABASE_SERVICE_ROLE_KEY` | Serverseitige Updates (z. B. Premium nach Zahlung) |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | Stripe Checkout und Webhook (`/api/webhook/stripe`) |
| `NEXT_PUBLIC_APP_URL` | Basis-URL für Stripe-Redirects |
| `ANTHROPIC_API_KEY` | KI-Übungstests |
| `CRON_SECRET` | Absicherung des Keepalive-Crons |

## Fragen pflegen

- Fragen liegen in `src/server/ap1/questions.ts` und `src/server/ap1/questions-pruefungsnah.ts`.
- **IDs nie ändern**, der Lernfortschritt wird pro ID gespeichert.
- Bei Multiple-Choice-Fragen steht die richtige Antwort an Index 0. Die Reihenfolge wird beim Laden pro Frage fest gemischt.
- Keine Original-Prüfungsaufgaben übernehmen (Urheberrecht der Prüfungsersteller). Nur eigene Formulierungen und Zahlen verwenden.

## Scripts

| Befehl | Zweck |
|---|---|
| `npm run dev` | Entwicklungsserver |
| `npm run build` | Produktions-Build |
| `npm run typecheck` | TypeScript prüfen |
| `npm run lint` | ESLint |
