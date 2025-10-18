# 🚀 CrackTheTest.ai

**Prototyp Landing Page + KI-gestützter Testgenerator**

Erstelle personalisierte Tests automatisch, analysiere Ergebnisse und klassifiziere die Schwierigkeit mit einem kleinen **ML-Modell** — gebaut mit **Python** & **Hugging Face Transformers**.

---

## 🧠 Übersicht

**CrackTheTest.ai** hilft Nutzern, **KI-generierte Tests** zu erstellen, die auf ihre Ziele und ihr Skill-Level zugeschnitten sind.  
Es integriert **OpenAI** zur Inhaltserstellung und einen **custom ML-Klassifikator**, um die Schwierigkeit jeder Frage zu bewerten (`Leicht`, `Mittel`, `Schwer`).

---

## 🎯 Motivation – Warum ich es gebaut habe

Ich musste mehrere Online-Tests im Rahmen von Bewerbungen absolvieren, aber die meisten Vorbereitungstools waren teuer und unpersonalisiert.  
Deshalb habe ich beschlossen, meine eigene Plattform zu bauen, die **OpenAI** und **Machine Learning** nutzt, sodass jeder:

- 🧩 Realistische Tests zu gewünschten Themen generieren kann  
- ⚙️ Automatisch die Schwierigkeit der Fragen analysiert und klassifiziert  
- 🚀 Effizient lernen kann, ohne Zeit und Geld zu verschwenden  

---

## 🧩 Funktionen

- 🧠 **KI-generierte Testfragen** (über OpenAI API)  
- ⚙️ **ML-basierte Schwierigkeitsklassifikation** mit Hugging Face Transformers  
- 💾 **PostgreSQL Datenbank** über Supabase für Nutzer- & Testergebnisse  
- 🔄 **FastAPI Backend** für API-Routen und ML-Inferenz  
- 🪄 **Modernes, animiertes UI** mit Framer Motion + DaisyUI + Aceternity Komponenten  
- 🔐 **NextAuth**, **Prisma** und **tRPC** bereit für zukünftige Integration  

---

## 🧰 Tech Stack (T3-Style)

### 🖥️ Frontend
- **Next.js (TypeScript)**  
- **Tailwind CSS + DaisyUI**  
- **Framer Motion** für flüssige Animationen  

### ⚙️ Backend
- **Python + FastAPI**  
- **Supabase (PostgreSQL)**  
- **Pydantic** für Schema-Validierung  
- **Hugging Face Transformers** für ML-Klassifikation  

### 🤖 Machine Learning
- Feinjustiertes **BERT (Deutsch)** Modell → [`dbmdz/bert-base-german-cased`](https://huggingface.co/dbmdz/bert-base-german-cased)  
- Textklassifikation mit drei Schwierigkeitsstufen:  
  - `0 → Leicht`  
  - `1 → Mittel`  
  - `2 → Schwer`  
- Basierend auf: [Learn Hugging Face – Text Classification Tutorial](https://www.learnhuggingface.com/notebooks/hugging_face_text_classification_tutorial)  

---

## 🤖 ML-Modell Details

- Kleines **Proof-of-Concept**-Modell, trainiert auf Beispiel-Fragen  
- In Backend integriert für **Echtzeit-Schwierigkeitsanalyse**  
- Wird später mit größerem Datensatz erweitert, um Genauigkeit zu verbessern  

📂 **Verwandtes Repository:**  
➡️ [CrackTheTest-Backend-With-ML](https://github.com/Giorgiod91/CrackTheTest-Backend-With-ML)

---

## 🧑‍💻 Was ich gelernt habe

- Aufbau und Verbindung eines **Python Backends** mit einem **Next.js Frontend**  
- Arbeiten mit **CORS**, **Pydantic Modellen** und **FastAPI-Routen**  
- Erstellen von **ML-Pipelines** mit Hugging Face  
- Strukturierung der **Full-Stack-Kommunikation** zwischen Diensten  
- Deployment und Verwaltung von **Supabase (PostgreSQL)**  
- Designen von **modernen, animierten UIs** mit Framer Motion  

---

## 🎨 Prototyp UI

| LandingPage | Wie Funktioniert es | Banner |
|------------|-------------------|--------|
| <img src="https://github.com/user-attachments/assets/ad26f75f-761e-45cc-b2a6-23966be6eccd" width="400" /> | <img src="https://github.com/user-attachments/assets/23a070b4-c2ba-466d-b802-6cdadb41ebf7" width="400" /> | <img src="https://github.com/user-attachments/assets/ef2fd387-462e-40f2-b712-20fc7a74b32f" width="400" /> |

| System Flow | Price | Footer |
|------------|--------|--------|
| <img width="1238" height="1044" alt="image" src="https://github.com/user-attachments/assets/84278bb4-8535-493f-9a39-856d750a63d6" /> | <!-- add Price screenshot here --> | <!-- add Footer screenshot here --> |

---

## 🧭 Nächste Schritte

- ✅ ML-Datensatz und Trainingsskript finalisieren  
- 🚀 OpenAI API für automatische Fragengenerierung verbinden  
- 💬 Echtzeit-Nutzerfeedback (über Backend) hinzufügen  
- 🌐 Frontend auf **Vercel** und Backend auf **Render** / **Railway** deployen  

---

## ⭐️ Zusammenfassung

CrackTheTest.ai ist ein Full-Stack-Experiment, das **KI-Generierung**, **ML-Klassifikation** und **modernes Frontend-Design** kombiniert — von Grund auf gebaut, um zu zeigen, wie intelligentes Testen schneller, smarter und zugänglicher werden kann.
