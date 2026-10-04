"use client";
import { motion } from "framer-motion";
import {
  LayoutDashboard, FileText, BarChart2, Settings,
  Users, TrendingUp, CheckCircle2, Plus,
  ShieldCheck, Sparkles, BrainCircuit, Lock,
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────

const BAR_HEIGHTS = [30, 55, 42, 78, 50, 95, 70, 62, 85, 45, 68, 90, 74, 88];

const TESTS = [
  { name: "Netzwerktechnik",              score: 82, cat: "Netzwerk",   diff: "18/22 sicher", date: "Heute"   },
  { name: "Angebote & Wirtschaftlichkeit", score: 91, cat: "Rechnen",    diff: "16/18 sicher", date: "Gestern" },
  { name: "IT-Sicherheit & Datenschutz",  score: 74, cat: "Sicherheit", diff: "14/19 sicher", date: "2 Tage"  },
  { name: "Speicher & Übertragung",       score: 88, cat: "Rechnen",    diff: "12/14 sicher", date: "3 Tage"  },
  { name: "Programmierung & Logik",       score: 63, cat: "Logik",      diff: "10/16 sicher", date: "5 Tage"  },
];

const METRICS = [
  { label: "Prüfungsreife",     value: "79%",       icon: <BrainCircuit className="h-4 w-4 text-violet-400" /> },
  { label: "Prognose IHK",      value: "Note 3",    icon: <TrendingUp    className="h-4 w-4 text-emerald-400" /> },
  { label: "Tage bis zur AP1",  value: "23",        icon: <Users         className="h-4 w-4 text-blue-400"    /> },
];

const FEATURES = [
  {
    icon: <BarChart2  className="h-5 w-5 text-blue-400"   />,
    title: "Fortschritt pro Thema",
    desc:  "Du siehst für jedes AP1-Thema, wie viel du sicher kannst, und bekommst automatisch dein schwächstes Thema als nächsten Schritt.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-emerald-400"/>,
    title: "Prüfungssimulation",
    desc:  "90 Minuten, 4 Handlungsschritte, 100 Punkte. Ausgewertet nach IHK-Notenschlüssel, beliebig oft wiederholbar.",
  },
  {
    icon: <BrainCircuit className="h-5 w-5 text-violet-400" />,
    title: "Erklärung + Prüfungstipp",
    desc:  "Zu jeder Aufgabe der Rechenweg und ein Tipp, worauf Prüfer achten und wo die typischen Fallen liegen.",
  },
  {
    icon: <Sparkles   className="h-5 w-5 text-orange-400" />,
    title: "KI-Zusatzaufgaben",
    desc:  "Wenn du ein Thema durch hast, erstellt dir die KI beliebig viele neue Aufgaben im AP1-Stil.",
  },
];

// ── Mini Dashboard UI ──────────────────────────────────────────────────────

function DashSidebar() {
  const items = [
    { icon: <LayoutDashboard className="h-4 w-4" />, label: "Dashboard",    active: true  },
    { icon: <FileText        className="h-4 w-4" />, label: "Themen üben",  active: false },
    { icon: <BarChart2       className="h-4 w-4" />, label: "Simulation",   active: false },
    { icon: <Users           className="h-4 w-4" />, label: "KI-Tests",     active: false },
    { icon: <Settings        className="h-4 w-4" />, label: "Einstellungen",active: false },
  ];
  return (
    <div className="flex w-44 shrink-0 flex-col border-r border-white/5 bg-[#12112a]">
      <div className="border-b border-white/5 px-4 py-4">
        <p className="text-xs font-bold text-orange-400">AP1 Ready</p>
        <div className="mt-1.5 flex items-center gap-1.5">
          <span className="rounded-full bg-gradient-to-r from-[#FF705B] to-[#FFB457] px-2 py-0.5 text-[10px] font-bold text-white">
            ⭐ Prüfungspaket
          </span>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 p-3">
        {items.map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium transition-colors ${
              item.active
                ? "bg-gradient-to-r from-[#FF705B]/20 to-[#FFB457]/10 text-orange-300"
                : "text-white/35 hover:bg-white/5 hover:text-white/60"
            }`}
          >
            {item.icon}
            {item.label}
          </div>
        ))}
      </nav>
      <div className="border-t border-white/5 p-3">
        <button className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#FF705B] to-[#FFB457] py-2 text-xs font-bold text-white shadow-md shadow-orange-500/20">
          <Plus className="h-3.5 w-3.5" /> Weiter üben
        </button>
      </div>
    </div>
  );
}

function DashMain() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-[#1a1835] p-5">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-white">Hey Max 👋</h2>
          <p className="text-xs text-white/40">Noch 23 Tage bis zur AP1</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-semibold text-emerald-400">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Live
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="mb-5 grid grid-cols-3 gap-3">
        {[
          { label: "Fragen beantwortet", value: "214", delta: "+31", color: "text-white"     },
          { label: "Trefferquote",    value: "81%",  delta: "+6%", color: "text-orange-300"},
          { label: "Lernstreak",      value: "12 Tage", delta: "🔥", color: "text-amber-300"},
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-white/6 bg-white/5 p-3">
            <p className="text-[10px] text-white/40">{stat.label}</p>
            <p className={`mt-1 text-xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="mt-0.5 flex items-center gap-0.5 text-[10px] text-emerald-400">
              <TrendingUp className="h-2.5 w-2.5" /> {stat.delta}
            </p>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="mb-5 rounded-xl border border-white/6 bg-white/5 p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-semibold text-white/60">Lernaktivität (14 Tage)</p>
          <p className="text-[10px] text-white/30">Beantwortete Fragen pro Tag</p>
        </div>
        <div className="flex h-16 items-end gap-1">
          {BAR_HEIGHTS.map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i, duration: 0.5, ease: "easeOut" }}
              className="flex-1 rounded-sm bg-gradient-to-t from-[#FF705B] to-[#FFB457] opacity-80"
            />
          ))}
        </div>
      </div>

      {/* Recent tests table */}
      <div>
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-white/30">Stand pro Thema</p>
        <div className="space-y-1">
          {TESTS.map((t) => (
            <div key={t.name} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/3 px-3 py-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-orange-500/10 text-[10px]">
                  {t.cat === "Netzwerk" ? "🌐" : t.cat === "Logik" ? "🧮" : t.cat === "Rechnen" ? "💶" : "🔐"}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-medium text-white/80">{t.name}</p>
                  <p className="text-[9px] text-white/30">{t.cat} · {t.diff} · {t.date}</p>
                </div>
              </div>
              <div className="ml-3 flex shrink-0 items-center gap-2">
                <div
                  className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10"
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#FF705B] to-[#FFB457]"
                    style={{ width: `${t.score}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-orange-300">{t.score}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashRight() {
  return (
    <div className="flex w-44 shrink-0 flex-col gap-3 border-l border-white/5 bg-[#12112a] p-3">
      {METRICS.map((m) => (
        <div key={m.label} className="rounded-xl border border-white/5 bg-white/5 p-3">
          <div className="mb-1.5 flex items-center gap-1.5">
            {m.icon}
            <p className="text-[9px] text-white/40">{m.label}</p>
          </div>
          <p className="text-base font-bold text-white">{m.value}</p>
        </div>
      ))}

      <div className="mt-1 rounded-xl border border-white/5 bg-white/5 p-3">
        <p className="mb-2 text-[9px] font-semibold uppercase tracking-wider text-white/30">Quick Actions</p>
        {["Simulation starten", "Schwächstes Thema", "Prüfungstermin"].map((action) => (
          <button
            key={action}
            className="mb-1.5 flex w-full items-center gap-1.5 rounded-lg bg-white/5 px-2 py-1.5 text-[10px] text-white/50 hover:bg-white/10 hover:text-white/80"
          >
            <CheckCircle2 className="h-3 w-3 text-orange-400/60" />
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────

export default function PremiumPreview() {
  return (
    <section id="dashboard-preview" className="overflow-hidden bg-gradient-to-b from-slate-50 to-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-orange-500">
            Dein AP1 Dashboard
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Wisse, was du bekommst —{" "}
            <span className="bg-gradient-to-br from-[#FF705B] to-[#FFB457] bg-clip-text text-transparent">
              bevor du kaufst.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-500">
            Du siehst jederzeit, wo du stehst: Prüfungsreife, Prognose nach IHK-Notenschlüssel und Fortschritt in jedem AP1-Thema.
          </p>
        </motion.div>

        {/* Browser mockup (full) */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mb-16 max-w-5xl"
        >
          {/* Glow */}
          <div className="pointer-events-none absolute -inset-8 rounded-3xl bg-gradient-to-br from-[#FF705B]/12 via-[#FFB457]/8 to-transparent blur-3xl" />

          {/* Browser chrome */}
          <div className="relative overflow-hidden rounded-2xl border border-white/30 shadow-2xl shadow-orange-300/15 ring-1 ring-black/5">
            {/* Title bar */}
            <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#1E1E2F] px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-red-400/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
              <div className="h-3 w-3 rounded-full bg-green-400/80" />
              <div className="ml-3 flex flex-1 items-center gap-2 overflow-hidden rounded-lg bg-white/8 px-3 py-1">
                <div className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                <span className="truncate text-xs text-white/40">AP1 Ready · Dashboard</span>
              </div>
              <div className="ml-3 flex gap-1">
                <div className="h-5 w-12 rounded bg-white/5" />
                <div className="h-5 w-8 rounded bg-white/5" />
              </div>
            </div>

            {/* App */}
            <div className="flex" style={{ minHeight: 440 }}>
              <DashSidebar />
              <DashMain />
              <DashRight />
            </div>
          </div>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
              className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
                {f.icon}
              </div>
              <h3 className="mb-1.5 text-sm font-bold text-slate-800">{f.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-col items-center gap-3 text-center"
        >
          <a
            href="#price"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-br from-[#FF705B] to-[#FFB457] px-8 py-4 text-base font-bold text-white shadow-xl shadow-orange-300/30 transition hover:brightness-110 hover:-translate-y-0.5"
          >
            <ShieldCheck className="h-5 w-5" />
            Prüfungspaket freischalten · 15 € einmalig
          </a>
          <p className="text-sm text-slate-400">
            <Lock className="mr-1 inline h-3.5 w-3.5" />
            Kein Abo · Einmal zahlen, bis zur Prüfung (und danach) nutzen
          </p>
        </motion.div>
      </div>
    </section>
  );
}
