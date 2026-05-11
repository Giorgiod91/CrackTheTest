"use client";
import { motion } from "framer-motion";
import {
  LayoutDashboard, FileText, BarChart2, Settings,
  Users, TrendingUp, CheckCircle2, Plus,
} from "lucide-react";

const BAR_HEIGHTS = [38, 62, 48, 80, 55, 92, 68];

const RECENT_TESTS = [
  { name: "VW Einstellungstest",    score: 87, date: "Heute",    cat: "Technik"  },
  { name: "Logik & Konzentration",  score: 92, date: "Gestern",  cat: "Logik"    },
  { name: "Sprache & Textverst.",   score: 78, date: "3 Tage",   cat: "Sprache"  },
];

function MiniSidebar() {
  const items = [
    { icon: <LayoutDashboard className="h-3 w-3" />, label: "Dashboard", active: true  },
    { icon: <FileText          className="h-3 w-3" />, label: "Tests",     active: false },
    { icon: <BarChart2         className="h-3 w-3" />, label: "Analytik",  active: false },
    { icon: <Users             className="h-3 w-3" />, label: "Nutzer",    active: false },
    { icon: <Settings          className="h-3 w-3" />, label: "Einstellungen", active: false },
  ];
  return (
    <div className="flex w-28 flex-col border-r border-white/5 bg-[#12112a]">
      <div className="border-b border-white/5 px-3 py-2.5">
        <p className="text-[9px] font-bold text-orange-400 uppercase tracking-wider">CrackTheTest</p>
        <p className="mt-0.5 text-[8px] text-white/30">Premium Plan</p>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 p-2">
        {items.map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[9px] font-medium ${
              item.active
                ? "bg-gradient-to-r from-[#FF705B]/20 to-[#FFB457]/10 text-orange-300"
                : "text-white/35"
            }`}
          >
            {item.icon}
            {item.label}
          </div>
        ))}
      </nav>
      <div className="border-t border-white/5 p-2">
        <button className="flex w-full items-center justify-center gap-1 rounded-md bg-gradient-to-r from-[#FF705B] to-[#FFB457] py-1.5 text-[9px] font-bold text-white">
          <Plus className="h-2.5 w-2.5" /> Test erstellen
        </button>
      </div>
    </div>
  );
}

function MiniMain() {
  return (
    <div className="flex-1 overflow-hidden bg-[#1a1835] p-3">
      {/* Stat cards */}
      <div className="mb-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-white/5 bg-white/5 p-2">
          <p className="text-[8px] text-white/40">Tests erstellt</p>
          <p className="text-sm font-bold text-white">24</p>
          <p className="mt-0.5 flex items-center gap-0.5 text-[8px] text-emerald-400">
            <TrendingUp className="h-2 w-2" /> +3 diese Woche
          </p>
        </div>
        <div className="rounded-lg border border-orange-500/20 bg-orange-500/10 p-2">
          <p className="text-[8px] text-white/40">Ø Score</p>
          <p className="text-sm font-bold text-orange-300">86%</p>
          <p className="mt-0.5 flex items-center gap-0.5 text-[8px] text-emerald-400">
            <CheckCircle2 className="h-2 w-2" /> Über Durchschnitt
          </p>
        </div>
      </div>

      {/* Mini bar chart */}
      <div className="mb-3 rounded-lg border border-white/5 bg-white/5 p-2">
        <p className="mb-1.5 text-[8px] text-white/40">Tests diese Woche</p>
        <div className="flex h-10 items-end gap-1">
          {BAR_HEIGHTS.map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.5, ease: "easeOut" }}
              className="flex-1 rounded-sm bg-gradient-to-t from-[#FF705B] to-[#FFB457]"
            />
          ))}
        </div>
        <div className="mt-1 flex justify-between text-[7px] text-white/20">
          {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
      </div>

      {/* Recent tests */}
      <p className="mb-1.5 text-[8px] font-semibold text-white/40 uppercase tracking-wider">Letzte Tests</p>
      {RECENT_TESTS.map((t) => (
        <div key={t.name} className="flex items-center justify-between border-b border-white/5 py-1.5">
          <div className="min-w-0">
            <p className="truncate text-[9px] font-medium text-white/80">{t.name}</p>
            <p className="text-[7px] text-white/30">{t.cat} · {t.date}</p>
          </div>
          <span className="ml-2 shrink-0 rounded-full bg-orange-400/15 px-1.5 py-0.5 text-[8px] font-bold text-orange-300">
            {t.score}%
          </span>
        </div>
      ))}
    </div>
  );
}

export function HeroBrowserMockup() {
  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-full max-w-[440px]"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-[#FF705B]/20 via-[#FFB457]/15 to-transparent blur-2xl" />

      {/* Browser chrome */}
      <div className="overflow-hidden rounded-2xl border border-white/20 shadow-2xl shadow-orange-400/10 ring-1 ring-white/10">
        {/* Title bar */}
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#1E1E2F] px-3 py-2.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
          <div className="ml-2 flex flex-1 items-center gap-1.5 overflow-hidden rounded-md bg-white/8 px-2.5 py-0.5">
            <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
            <span className="truncate text-[10px] text-white/35">app.crackthetest.ai/dashboard</span>
          </div>
        </div>

        {/* App UI */}
        <div className="flex" style={{ height: 300 }}>
          <MiniSidebar />
          <MiniMain />
        </div>
      </div>

      {/* Floating Premium badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        className="absolute -right-4 -top-4 flex items-center gap-1.5 rounded-full bg-gradient-to-br from-[#FF705B] to-[#FFB457] px-3 py-1.5 text-[11px] font-bold text-white shadow-lg shadow-orange-400/40"
      >
        ⭐ Premium
      </motion.div>

      {/* Floating score pill */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="absolute -bottom-3 -left-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-700 shadow-md"
      >
        <span className="text-emerald-500">✓</span> 92% Score – Logiktest
      </motion.div>
    </motion.div>
  );
}
