# 🚀 CrackTheTest.ai

**Prototype Landing Page + AI-powered Test Generator**

Generate personalized tests automatically, analyze results, and classify difficulty using a small custom **ML model** — built with **Python** & **Hugging Face Transformers**.

---

## 🧠 Overview

**CrackTheTest.ai** helps users create **AI-generated tests** tailored to their goals and skill level.  
It integrates **OpenAI** for content generation and a **custom ML classifier** to rate each question’s difficulty (`Leicht`, `Mittel`, `Schwer`).

---

## 🎯 Motivation – Why I Built This

I had to take multiple online assessments while applying for jobs — but most preparation tools were expensive and not personalized.  
So I decided to build my own platform using **OpenAI** and **Machine Learning**, making it possible for anyone to:

- 🧩 Generate realistic tests based on their desired topic  
- ⚙️ Automatically analyze and classify question difficulty  
- 🚀 Learn efficiently without wasting time or money  

---

## 🧩 Features

- 🧠 **AI-generated test questions** (via OpenAI API)  
- ⚙️ **ML-based difficulty classification** using Hugging Face Transformers  
- 💾 **PostgreSQL database** via Supabase for user data & test storage  
- 🔄 **FastAPI backend** to handle API routes and ML inference  
- 🪄 **Modern animated UI** with Framer Motion + DaisyUI + Aceternity components  
- 🔐 **NextAuth**, **Prisma**, and **tRPC** ready for future integration  

---

## 🧰 Tech Stack (T3-style)

### 🖥️ Frontend
- **Next.js (TypeScript)**
- **Tailwind CSS + DaisyUI**
- **Framer Motion** for smooth animations

### ⚙️ Backend
- **Python + FastAPI**
- **Supabase (PostgreSQL)**
- **Pydantic** for schema validation
- **Hugging Face Transformers** for ML classification

### 🤖 Machine Learning
- Fine-tuned **BERT (German)** model → [`dbmdz/bert-base-german-cased`](https://huggingface.co/dbmdz/bert-base-german-cased)
- Text classification with three difficulty levels:
  - `0 → Leicht`
  - `1 → Mittel`
  - `2 → Schwer`
- Based on: [Learn Hugging Face – Text Classification Tutorial](https://www.learnhuggingface.com/notebooks/hugging_face_text_classification_tutorial)

---

## 🤖 ML Model Details

- Small **proof-of-concept** model trained on sample questions  
- Integrated into backend for **real-time difficulty analysis**  
- Will later be extended with a larger dataset for improved accuracy  

📂 **Related Repository:**  
➡️ [CrackTheTest-Backend-With-ML](https://github.com/Giorgiod91/CrackTheTest-Backend-With-ML)

---

## 🧑‍💻 What I Learned

- Building and connecting a **Python backend** to a **Next.js frontend**  
- Working with **CORS**, **Pydantic models**, and **FastAPI routes**  
- Creating custom **ML pipelines** with Hugging Face  
- Structuring **full-stack communication** between services  
- Deploying and managing **Supabase (PostgreSQL)**  
- Designing **modern, animated UIs** with Framer Motion  

---

## 🎨 Prototype UI

| LandingPage | Wie Funktioniert es | Banner |
|------------|-------------------|--------|
| <img src="https://github.com/user-attachments/assets/ad26f75f-761e-45cc-b2a6-23966be6eccd" width="400" /> | <img src="https://github.com/user-attachments/assets/23a070b4-c2ba-466d-b802-6cdadb41ebf7" width="400" /> | <img src="https://github.com/user-attachments/assets/ef2fd387-462e-40f2-b712-20fc7a74b32f" width="400" /> |

| System Flow | Price | Footer |
|------------|--------|--------|
|<img width="1238" height="1044" alt="image" src="https://github.com/user-attachments/assets/84278bb4-8535-493f-9a39-856d750a63d6" />
 | <!-- add Price screenshot here --> | <!-- add Footer screenshot here --> |

---

## 🧭 Next Steps

- ✅ Finalize ML dataset and training script  
- 🚀 Connect OpenAI API for automatic question generation  
- 💬 Add real-time user feedback (via backend)  
- 🌐 Deploy frontend on **Vercel** and backend on **Render** / **Railway**  

---

## ⭐️ Summary

CrackTheTest.ai is a full-stack experiment combining:  
**AI generation**, **ML classification**, and **modern frontend design** — built from scratch to explore how intelligent testing can become smarter, faster, and more accessible.  
