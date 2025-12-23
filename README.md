**Full-Stack AI-Test-Generator** | [Live Demo](https://crack-the-test.vercel.app/)

Erstelle personalisierte Tests mit OpenAI und lass die Schwierigkeit automatisch vorhersagen – mit eigener Full-Stack-Architektur und Premium-Features.

### Was ich gebaut habe

Ein komplettes SaaS-ähnliches Projekt mit:

- 🤖 **OpenAI API** für automatisierte Fragengenerierung
- 🧠 **ML-Modell** (experimentell) zur Schwierigkeitsprediction
- 🔐 **Supabase Auth** (E-Mail/Passwort) mit geschützten Routen & Session-Management
- 💎 **Premium-Bereich** mit Stripe Payment Links (Free → Pro Upgrade)
  - Status-Wechsel in DB (free → pro)
  - Stripe Webhooks für Zahlungsbestätigung
- 📊 **PostgreSQL DB** (Supabase) mit User-spezifischen Daten
  - Row Level Security (RLS) für sichere Datenisolierung
  - Mehrere Tabellen fetchen & joinen (z. B. Tests + User)
- 🎨 **Responsive UI** mit Next.js, Tailwind CSS & DaisyUI
- **Next.js Server Actions** & API Routes für DB-Verbindung & Logik
  - User existiert checken, Daten filtern, Auth prüfen

### Tech Stack & Gelerntes

- Next.js (App Router, Server Actions, API Routes)
- React, TypeScript, Tailwind CSS, DaisyUI
- Supabase (Auth, DB, RLS, Row Level Security)
- Stripe (Payment Links, Webhooks, Status-Wechsel)
- Full-Stack: Frontend → Backend → DB-Verbindung mit Auth & Sicherheit

### Premium Dashboard (Video-Demo)

https://github.com/user-attachments/assets/b581cb41-fef7-4eb4-a75a-f8c0b81f3c91

### Wichtigstes Gelerntes durch das Projekt

- RLS & Auth in Supabase (sichere User-Datenisolierung)
- Stripe Webhooks & Zahlungsstatus in DB
- Next.js Server Actions für sichere DB-Abfragen
- User existiert prüfen, Daten filtern & joinen
- Geschützte Routen & Session-Management

### Demo & Links

- Live: https://crack-the-test.vercel.app/
- GitHub Frontend: https://github.com/Giorgiod91/CrackTheTest
- GitHub Backend: https://github.com/Giorgiod91/CrackTheTest-Backend-With-ML
- Portfolio: https://www.giorgiodettmar.com/
