# 🚀 CrackTheTest.ai

**Full-Stack AI Test Generator** | [Live Demo](https://crack-the-test.vercel.app/)

---


## Premium Area – Dashboard for Premium Users

<img width="1322" height="882" alt="image" src="https://github.com/user-attachments/assets/c549d2d3-1ead-4666-9e02-fa04f553857e" />


## What I Built

A complete **Next.js full-stack** test generator featuring:

- 🤖 **OpenAI API** for automatic question generation (handled via a separate Python FastAPI backend)
- 🧠 **ML model** for difficulty prediction (experimental)
- 🔐 **Supabase Auth** with protected routes & session management
- 💎 **Premium area** with Stripe integration (in progress)
  - 📈 Analytics dashboard (DB queries: tests per user, statistics)
  - 🎯 User-specific data fetched from PostgreSQL
- 📊 **PostgreSQL database** for users & tests
- 🎨 **Responsive UI** (Tailwind CSS, DaisyUI)

---

## Tech Stack & Skills

**Full-Stack:** Next.js App Router, Server Actions, API Routes  
**Backend:** Server Components, Middleware, `lib/supabase/server.ts` & `client.ts`  
**Auth:** Supabase Auth, session cookies, protected routes  
**Database:** PostgreSQL (Supabase)  
**Frontend:** TypeScript, Tailwind CSS, DaisyUI  
**Deployment:** Vercel

---

## Demo & Screenshots

### Login & Authentication Flow

**Video Demos:**
- Login / Signup flow
- Premium dashboard
- Test generation

---

## Development Notes

- Focus on clean full-stack architecture and maintainable code
- UI/UX refined iteratively with a focus on clarity and modern design
- AI tools were used as support for styling and layout improvements
- Core application logic, data flow, and architecture were implemented manually
- Plans to implement server-side caching to reuse AI results for identical inputs and reduce API calls
