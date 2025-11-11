# 🚀 CrackTheTest.ai  

**AI-powered Test Generator + Difficulty Classifier (Custom Binary Logistic Regression Model)**  
🎯 **Live Demo:** [https://crack-the-test.vercel.app/](https://crack-the-test.vercel.app/)  
🧩 **Status:** Frontend prototype live — backend (FastAPI + ML) in development  

Backend part  https://github.com/Giorgiod91/CrackTheTest-Backend-With-ML

Create personalized tests with **OpenAI**, automatically predict their difficulty (`Leicht` or `Schwer`) using a **custom logistic regression model built entirely with NumPy**, and explore how core machine learning concepts translate into real-world applications.

This project was built to connect **Andrew Ng’s Deep Learning Specialization** theory with **hands-on implementation**.

---

## 🧠 Overview  

**CrackTheTest.ai** allows users to generate AI-created questions and instantly predict how difficult they are — powered by a simple but explainable machine learning model.  

It combines:  
- **OpenAI API** → to generate domain-specific test questions  
- **Custom logistic regression model** → written from scratch using NumPy  
- **TF-IDF vectorization** → to convert text into numerical features  
- **FastAPI backend** → to expose the model as an API  
- **Next.js frontend** → for a clean and modern user experience  

---

## 🎯 Motivation – Why I Built This  

Most online aptitude tools are generic, limited, or expensive.  
I wanted to build a **personalized learning assistant** that uses AI and ML to create adaptive tests.  

At the same time, I wanted to **practice and understand the fundamentals** of machine learning by implementing everything manually — no PyTorch, no TensorFlow — just NumPy, math, and Andrew Ng’s lectures.  

This helped me truly grasp *how* models learn, not just *how to use them*.

---

## 🧩 Core Features  

- 🧠 **AI-generated test questions** via OpenAI  
- ⚙️ **Custom logistic regression classifier** (NumPy implementation)  
- 🧩 **Binary difficulty prediction:**  
  - `0 → Leicht`  
  - `1 → Schwer`  
- 🔡 **TF-IDF text vectorization** using `scikit-learn`  
- ⚙️ **FastAPI backend** for prediction routes  
- 💻 **Modern Next.js frontend** with Tailwind + Framer Motion  
- 💾 **Supabase (PostgreSQL)** database integration  

---

## ⚙️ Tech Stack  

### 🖥️ Frontend  
- **Next.js (TypeScript)**  
- **Tailwind CSS + DaisyUI**  
- **Framer Motion** for animations  

### ⚙️ Backend  
- **Python + FastAPI**  
- **Supabase (PostgreSQL)**  
- **Pydantic** for validation  
- **OpenAI API** for content generation  

### 🤖 Machine Learning  
- **Type:** Binary Logistic Regression (from scratch)  
- **Libraries:** `NumPy`, `scikit-learn` (for TF-IDF only)  
- **Activation:** Sigmoid function  
- **Loss:** Binary cross-entropy  
- **Optimization:** Gradient descent (manual implementation)  
- **Goal:** Classify test questions into *Leicht* or *Schwer*  

---

## 🧠 ML Implementation Journey  

### 1️⃣ Building From Scratch  

Following **Andrew Ng’s Deep Learning Specialization**, I manually implemented:
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
