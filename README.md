# 🚀 CrackTheTest.ai

**AI-gestützter Test-Generator mit automatischer Schwierigkeitserkennung**

🎯 **Live Demo:** [https://crack-the-test.vercel.app/](https://crack-the-test.vercel.app/)
🧩 **Status:** Frontend live • Backend (FastAPI + ML, optional) in Entwicklung

---

## Features

- 🧠 AI-generierte Fragen (OpenAI API)
- 🤖 Schwierigkeitsprediction (Logistic Regression, optionales Python-Backend)
- 💻 Modernes Next.js Fullstack-Frontend (App Router, Tailwind, DaisyUI, TypeScript)
- 💾 Supabase für Auth & Datenbank (direkt aus Next.js)
- 🔒 Premium-Bereich mit Dashboard & Stripe (in Planung)

---

## Tech Stack

- **Frontend & Backend:** Next.js (App Router, API-Routen, Server Actions)
- **Auth & DB:** Supabase (PostgreSQL, Auth)
- **Styling:** Tailwind CSS, DaisyUI, Framer Motion
- **AI/ML:** OpenAI API, optional FastAPI-Backend für ML

---

## Architektur

Next.js (Frontend + API) ↔ Supabase (DB & Auth)
Optional: Next.js ↔ FastAPI (ML) ↔ Supabase

---

## Premium-Bereich

- Authentifizierung & User-Management via Supabase (direkt im Next.js-Frontend)
- Premium-Dashboard mit geschützten Routen
- Stripe-Integration für Premium-Features (in Planung)

![Premium Dashboard Vorschau](https://github.com/user-attachments/assets/81934d99-8b7a-44aa-aa72-30ac951823d8)

---

**Moderner Fullstack-Testgenerator mit Next.js, Supabase und AI – alles in einer App!**

**Backend Repo (ML, optional):**
[Giorgiod91/CrackTheTest-Backend-With-ML](https://github.com/Giorgiod91/CrackTheTest-Backend-With-ML)
- Parameter initialization (`w`, `b`)  
- **Sigmoid** activation  
- **Forward propagation**  
- **Cost computation** using binary cross-entropy  
- **Backward propagation** (calculating `dw` and `db`)  
- **Gradient descent updates:**  
  \[
  w := w - \alpha \cdot dw, \quad b := b - \alpha \cdot db
  \]

This gave me a clear understanding of how every line of ML code maps to the underlying math.

### 2️⃣ Integrating with Real Data  

I used `TfidfVectorizer` to convert text into feature vectors,  
then connected my model to a FastAPI route for real-time predictions — allowing the app to estimate whether a generated question is *Leicht* or *Schwer*.

---

## 🧑‍💻 What I Learned  

- Implemented **logistic regression** completely from scratch  
- Understood **forward/backward propagation** at the equation level  
- Learned how **gradient descent** actually updates model parameters  
- Connected ML inference to a **FastAPI backend**  
- Worked with **OpenAI’s API** for generating custom test content  
- Built a **modern, animated frontend** with Next.js  
- Managed database connections using **Supabase (PostgreSQL)**  

---

## 🎨 Prototype UI  

| Landing Page | Flow | Result |
|---------------|------|---------|
| <img src="https://github.com/user-attachments/assets/ad26f75f-761e-45cc-b2a6-23966be6eccd" width="400" /> | <img src="https://github.com/user-attachments/assets/23a070b4-c2ba-466d-b802-6cdadb41ebf7" width="400" /> | <img src="https://github.com/user-attachments/assets/ef2fd387-462e-40f2-b712-20fc7a74b32f" width="400" /> |

| System Flow | Price | Footer |
|--------------|--------|---------|
| <img width="1405" height="1071" alt="image" src="https://github.com/user-attachments/assets/046585ec-0f64-4fea-8aca-b4d9d3bde42e" /> | <!-- add Price screenshot here --> | <!-- add Footer screenshot here --> |

---

## 🧭 Next Steps  

- ✅ Improve ML pipeline and fix cost function edge cases  
- ✅ Integrate with OpenAI for question generation  
- 🚀 Add UI control for adjusting difficulty dynamically  
- 📈 Extend model to multi-class (`Leicht`, `Mittel`, `Schwer`)  
- 📊 Collect a larger labeled dataset
- create Premium user Dashboard and so on
- 🌐 Deploy  
  - Frontend → **Vercel**  
  - Backend → **Render / Railway**  
  

---

## ⭐️ Summary  

CrackTheTest.ai is a **full-stack AI application** that demonstrates how **deep learning fundamentals** can be turned into a **real product**.  
It combines **AI content generation**, **custom machine learning**, and **modern UI design** in one cohesive system.


### 🏷️ GitHub Project Description  

> **AI-powered test generator with a custom logistic regression model for difficulty prediction — built from scratch with NumPy and inspired by Andrew Ng’s Deep Learning course.**
