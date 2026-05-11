"use client";
import { motion } from "framer-motion";
import {
  LayoutDashboard, FileText, BarChart2, Settings,
  Users, TrendingUp, CheckCircle2, Plus, Download,
  ShieldCheck, Sparkles, BrainCircuit, Lock,
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────

const BAR_HEIGHTS = [30, 55, 42, 78, 50, 95, 70, 62, 85, 45, 68, 90, 74, 88];

const TESTS = [
  { name: "VW Einstellungstest",     score: 87, cat: "Technik",  diff: "Mittel",   date: "Heute"    },
  { name: "Telekom Assessment",       score: 94, cat: "Logik",    diff: "Schwer",   date: "Gestern"  },
  { name: "Textverständnis Basic",    score: 78, cat: "Sprache",  diff: "Einfach",  date: "2 Tage"   },
  { name: "Mathe & Zahlenreihen",     score: 91, cat: "Mathe",    diff: "Mittel",   date: "3 Tage"   },
  { name: "Siemens Eignungstest",     score: 83, cat: "Technik",  diff: "Schwer",   date: "5 Tage"   },
];

const METRICS = [
  { label: "Avg. Schwierigkeit", value: "6.8/10", icon: <BrainCircuit className="h-4 w-4 text-violet-400" /> },
  { label: "Übungssessions",     value: "124",    icon: <TrendingUp    className="h-4 w-4 text-emerald-400" /> },
  { label: "Aktive Nutzer",      value: "1.254",  icon: <Users         className="h-4 w-4 text-blue-400"    /> },
];

const FEATURES = [
  {
    icon: <Sparkles   className="h-5 w-5 text-orange-400" />,
    title: "KI-generierte Tests",
    desc:  "Unbegrenzt Tests zu jedem Thema, Schwierigkeitsgrad und Unternehmen — in Sekunden generiert.",
  },
  {
    icon: <BarChart2  className="h-5 w-5 text-blue-400"   />,
    title: "Erweiterte Analytik",
    desc:  "Sieh deinen Fortschritt über Zeit, identifiziere Schwächen und verfolge deine Verbesserungen.",
  },
  {
    icon: <Users      className="h-5 w-5 text-violet-400" />,
    title: "Multi-User & Teams",
    desc:  "Verwalte mehrere Nutzer, teile Tests und sieh alle Ergebnisse in einem Dashboard.",
  },
  {
    icon: <Download   className="h-5 w-5 text-emerald-400"/>,
    title: "Export-Funktion",
    desc:  "Exportiere Tests und Ergebnisse als PDF oder CSV — perfekt für Präsentationen.",
  },
];

// ── Mini Dashboard UI ──────────────────────────────────────────────────────

function DashSidebar() {
  const items = [
    { icon: <LayoutDashboard className="h-4 w-4" />, label: "Dashboard",    active: true  },
    { icon: <FileText        className="h-4 w-4" />, label: "Meine Tests",  active: false },
    { icon: <BarChart2       className="h-4 w-4" />, label: "Analytik",     active: false },
    { icon: <Users           className="h-4 w-4" />, label: "Nutzer",       active: false },
    { icon: <Settings        className="h-4 w-4" />, label: "Einstellungen",active: false },
  ];
  return (
    <div className="flex w-44 shrink-0 flex-col border-r border-white/5 bg-[#12112a]">
      <div className="border-b border-white/5 px-4 py-4">
        <p className="text-xs font-bold text-orange-400">CrackTheTest.ai</p>
        <div className="mt-1.5 flex items-center gap-1.5">
          <span className="rounded-full bg-gradient-to-r from-[#FF705B] to-[#FFB457] px-2 py-0.5 text-[10px] font-bold text-white">
            ⭐ Premium
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
          <Plus className="h-3.5 w-3.5" /> Test erstellen
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
          <h2 className="text-sm font-bold text-white">Guten Morgen, Max 👋</h2>
          <p className="text-xs text-white/40">Du hast heute 3 Tests abgeschlossen</p>
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
          { label: "Tests erstellt",  value: "24",   delta: "+3",  color: "text-white"     },
          { label: "Ø Score",         value: "86%",  delta: "+4%", color: "text-orange-300"},
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
          <p className="text-xs font-semibold text-white/60">Test-Aktivität (14 Tage)</p>
          <p className="text-[10px] text-white/30">Klicks auf Test erstellen</p>
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
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-white/30">Letzte Tests</p>
        <div className="space-y-1">
          {TESTS.map((t) => (
            <div key={t.name} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/3 px-3 py-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-orange-500/10 text-[10px]">
                  {t.cat === "Technik" ? "⚙️" : t.cat === "Logik" ? "🧠" : t.cat === "Mathe" ? "📐" : "📝"}
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
        {["Test erstellen", "Exportieren", "Einstellungen"].map((action) => (
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
            Premium Dashboard
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Wisse, was du bekommst —{" "}
            <span className="bg-gradient-to-br from-[#FF705B] to-[#FFB457] bg-clip-text text-transparent">
              bevor du kaufst.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-500">
            Kein Rätsel über das Premium-Erlebnis. Hier ist dein Dashboard — mit KI-Tests, Analytik und Team-Verwaltung.
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
                <span className="truncate text-xs text-white/40">app.crackthetest.ai/dashboard</span>
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
            Premium freischalten · ab 9,99 € / Monat
          </a>
          <p className="text-sm text-slate-400">
            <Lock className="mr-1 inline h-3.5 w-3.5" />
            Keine Mindestlaufzeit · Jederzeit kündbar
          </p>
        </motion.div>
      </div>
    </section>
  );
}
