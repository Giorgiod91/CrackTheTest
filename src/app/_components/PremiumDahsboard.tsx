"use client";
import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, FileText, BarChart2, Settings,
  Users, TrendingUp, Plus, LogOut, Sparkles,
  Trash2, ExternalLink, Bell, ChevronRight,
} from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { useRouter } from "next/navigation";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";

type Test = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  authorid: string;
  subject?: string;
};

type NavItem = "dashboard" | "tests" | "analytics" | "settings";

type TestResult = {
  id: string;
  test_id: string;
  score: number;
  correct_count: number;
  total_count: number;
  completed_at: string;
};

const CAT_EMOJI: Record<string, string> = {
  Technik: "⚙️", Logik: "🧠", Mathe: "📐",
  Sprache: "📝", default: "📄",
};

export default function PremiumDahsboard() {
  const [tests, setTests]           = useState<Test[]>([]);
  const [results, setResults]       = useState<TestResult[]>([]);
  const [loading, setLoading]       = useState(true);
  const [nav, setNav]               = useState<NavItem>("dashboard");
  const [username, setUsername]     = useState("User");
  const [showModal, setShowModal]   = useState(false);
  const [formData, setFormData]     = useState({ title: "", content: "", subject: "" });
  const [error, setError]           = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const supabase = getSupabaseBrowserClient();
  const router   = useRouter();

  // ── fetch ──────────────────────────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/auth/login"); return; }

    const [{ data: dbUser }, { data: testsData }, { data: resultsData }] = await Promise.all([
      supabase.from("users").select("username").eq("real_member_id", user.id).maybeSingle<{ username: string | null }>(),
      supabase.from("tests").select("*").eq("authorid", user.id).order("created_at", { ascending: false }),
      supabase.from("test_results").select("*").eq("user_id", user.id).order("completed_at", { ascending: false }).limit(50),
    ]);

    setUsername(dbUser?.username ?? "User");
    setTests(testsData ?? []);
    setResults(resultsData ?? []);
    setLoading(false);
  }, [supabase, router]);

  useEffect(() => { void fetchData(); }, [fetchData]);

  // ── create ─────────────────────────────────────────────────────────────────
  const createTest = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Titel und Inhalt sind erforderlich."); return;
    }
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error: e } = await supabase.from("tests").insert([{
      title: formData.title, content: formData.content, authorid: user.id,
    }]);
    if (e) { setError("Fehler beim Erstellen."); return; }
    setFormData({ title: "", content: "", subject: "" });
    setShowModal(false);
    void fetchData();
  };

  // ── delete ─────────────────────────────────────────────────────────────────
  const deleteTest = async (id: string) => {
    setDeletingId(id);
    await supabase.from("tests").delete().eq("id", id);
    setTests((p) => p.filter((t) => t.id !== id));
    setDeletingId(null);
  };

  // ── logout ─────────────────────────────────────────────────────────────────
  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  // ── chart data ─────────────────────────────────────────────────────────────
  const chartData = (() => {
    const now = new Date();
    return Array.from({ length: 14 }, (_, i) => {
      const d = new Date(now);
      d.setDate(now.getDate() - (13 - i));
      d.setHours(0, 0, 0, 0);
      const dateStr = d.toLocaleDateString("de-DE", { day: "numeric", month: "short" });
      const count = tests.filter((t) => {
        const td = new Date(t.created_at); td.setHours(0, 0, 0, 0);
        return td.getTime() === d.getTime();
      }).length;
      return { date: dateStr, count };
    });
  })();

  // ── nav items ──────────────────────────────────────────────────────────────
  const navItems = [
    { id: "dashboard" as NavItem, icon: <LayoutDashboard className="h-4 w-4" />, label: "Dashboard"    },
    { id: "tests"     as NavItem, icon: <FileText        className="h-4 w-4" />, label: "Meine Tests"  },
    { id: "analytics" as NavItem, icon: <BarChart2       className="h-4 w-4" />, label: "Analytik"     },
    { id: "settings"  as NavItem, icon: <Settings        className="h-4 w-4" />, label: "Einstellungen"},
  ];

  // ── recent 5 tests ─────────────────────────────────────────────────────────
  const recent = tests.slice(0, 5);

  return (
    <div className="flex h-screen min-h-[600px] overflow-hidden rounded-3xl bg-[#1a1835] font-sans text-white">

      {/* ── SIDEBAR ── */}
      <aside className="flex w-52 shrink-0 flex-col border-r border-white/5 bg-[#12112a]">
        {/* Logo */}
        <div className="border-b border-white/5 px-4 py-4">
          <p className="text-xs font-bold text-orange-400">CrackTheTest</p>
          <span className="mt-1 inline-block rounded-full bg-gradient-to-r from-[#FF705B] to-[#FFB457] px-2 py-0.5 text-[10px] font-bold text-white">
            ⭐ Premium
          </span>
        </div>

        {/* Nav */}
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setNav(item.id)}
              className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-medium transition-all ${
                nav === item.id
                  ? "bg-gradient-to-r from-[#FF705B]/20 to-[#FFB457]/10 text-orange-300"
                  : "text-white/40 hover:bg-white/5 hover:text-white/70"
              }`}
            >
              {item.icon}
              {item.label}
              {nav === item.id && <ChevronRight className="ml-auto h-3 w-3 opacity-60" />}
            </button>
          ))}
        </nav>

        {/* Create + Logout */}
        <div className="border-t border-white/5 p-3 space-y-2">
          <button
            onClick={() => router.push("/Test_openAi")}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#FF705B] to-[#FFB457] py-2.5 text-xs font-bold text-white shadow-md shadow-orange-500/20 transition hover:brightness-110"
          >
            <Plus className="h-3.5 w-3.5" /> KI-Test erstellen
          </button>
          <button
            onClick={() => void logout()}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-white/5 py-2 text-xs text-white/40 transition hover:bg-white/10 hover:text-white/70"
          >
            <LogOut className="h-3.5 w-3.5" /> Abmelden
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="flex flex-1 flex-col overflow-y-auto bg-[#1a1835] p-6">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-white">
              {nav === "dashboard"  && `Guten Tag, ${username} 👋`}
              {nav === "tests"      && "Meine Tests"}
              {nav === "analytics"  && "Analytik"}
              {nav === "settings"   && "Einstellungen"}
            </h1>
            <p className="mt-0.5 text-xs text-white/40">
              {tests.length} Test{tests.length !== 1 ? "s" : ""} insgesamt
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1.5 text-[11px] font-semibold text-emerald-400">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Premium aktiv
            </div>
            <button className="rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10">
              <Bell className="h-4 w-4 text-white/50" />
            </button>
          </div>
        </div>

        {/* ── DASHBOARD VIEW ── */}
        {nav === "dashboard" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-5"
          >
            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Tests erstellt",  value: String(tests.length), delta: "gesamt",        color: "text-white",       icon: <FileText    className="h-4 w-4 text-orange-400" /> },
                { label: "Diese Woche",     value: String(tests.filter(t => (Date.now() - new Date(t.created_at).getTime()) < 7 * 86400000).length), delta: "letzte 7 Tage", color: "text-orange-300", icon: <TrendingUp  className="h-4 w-4 text-orange-400" /> },
                { label: "Heute",           value: String(tests.filter(t => new Date(t.created_at).toDateString() === new Date().toDateString()).length), delta: new Date().toLocaleDateString("de-DE"), color: "text-amber-300",  icon: <Sparkles   className="h-4 w-4 text-amber-400"  /> },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/6 bg-white/5 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-[11px] text-white/40">{s.label}</p>
                    {s.icon}
                  </div>
                  <p className={`text-3xl font-bold ${s.color}`}>{loading ? "—" : s.value}</p>
                  <p className="mt-1 text-[10px] text-white/25">{s.delta}</p>
                </div>
              ))}
            </div>

            {/* Activity chart */}
            <div className="rounded-2xl border border-white/6 bg-white/5 p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-semibold text-white/60">Test-Aktivität (14 Tage)</p>
                <p className="text-[10px] text-white/25">Erstellte Tests pro Tag</p>
              </div>
              <div className="h-28">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="date" tick={{ fontSize: 9, fill: "rgba(255,255,255,0.25)" }} tickLine={false} axisLine={false} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 9, fill: "rgba(255,255,255,0.25)" }} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ background: "#12112a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 11 }}
                      labelStyle={{ color: "rgba(255,255,255,0.6)" }}
                      cursor={{ fill: "rgba(255,112,91,0.08)" }}
                    />
                    <Bar dataKey="count" name="Tests" fill="url(#barGrad)" radius={[4, 4, 0, 0]} />
                    <defs>
                      <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFB457" />
                        <stop offset="100%" stopColor="#FF705B" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent tests */}
            <div className="rounded-2xl border border-white/6 bg-white/5 p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold text-white/60">Letzte Tests</p>
                <button onClick={() => setNav("tests")} className="text-[10px] text-orange-400 hover:text-orange-300">
                  Alle anzeigen →
                </button>
              </div>
              {loading ? (
                <p className="text-xs text-white/30">Laden…</p>
              ) : recent.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-8 text-center">
                  <p className="text-sm text-white/30">Noch keine Tests erstellt.</p>
                  <button
                    onClick={() => router.push("/Test_openAi")}
                    className="rounded-xl bg-gradient-to-r from-[#FF705B] to-[#FFB457] px-5 py-2 text-xs font-bold text-white"
                  >
                    Ersten Test erstellen →
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {recent.map((t) => (
                    <div
                      key={t.id}
                      className="group flex cursor-pointer items-center justify-between rounded-xl border border-white/5 bg-white/3 px-4 py-3 transition hover:bg-white/6 hover:border-orange-500/20"
                      onClick={() => router.push(`/PremiumUsers/test/${t.id}`)}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-sm">
                          {CAT_EMOJI[t.subject ?? ""] ?? CAT_EMOJI.default}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-white/85">{t.title}</p>
                          <p className="text-[10px] text-white/30">
                            {t.subject && `${t.subject} · `}
                            {new Date(t.created_at).toLocaleDateString("de-DE", { day: "numeric", month: "short", year: "numeric" })}
                          </p>
                        </div>
                      </div>
                      <div className="ml-3 flex shrink-0 items-center gap-1 opacity-0 transition group-hover:opacity-100">
                        <span className="rounded-lg bg-orange-500/10 px-2 py-1 text-[9px] font-semibold text-orange-400">
                          Üben →
                        </span>
                        <button
                          onClick={(e) => { e.stopPropagation(); void deleteTest(t.id); }}
                          disabled={deletingId === t.id}
                          className="rounded-lg p-1.5 text-white/20 hover:bg-red-500/20 hover:text-red-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ── TESTS VIEW ── */}
        {nav === "tests" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs text-white/40">{tests.length} Tests gefunden</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60 transition hover:bg-white/10 hover:text-white"
                >
                  <Plus className="h-3.5 w-3.5" /> Manuell erstellen
                </button>
                <button
                  onClick={() => router.push("/Test_openAi")}
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#FF705B] to-[#FFB457] px-3 py-2 text-xs font-bold text-white"
                >
                  <Sparkles className="h-3.5 w-3.5" /> KI-Test erstellen
                </button>
              </div>
            </div>

            {loading ? (
              <p className="text-xs text-white/30">Laden…</p>
            ) : tests.length === 0 ? (
              <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/6 bg-white/5 py-16 text-center">
                <p className="text-white/30">Noch keine Tests vorhanden.</p>
                <button
                  onClick={() => router.push("/Test_openAi")}
                  className="rounded-xl bg-gradient-to-r from-[#FF705B] to-[#FFB457] px-6 py-2.5 text-sm font-bold text-white"
                >
                  Ersten Test mit KI erstellen →
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {tests.map((t, i) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="group flex cursor-pointer items-start justify-between rounded-2xl border border-white/6 bg-white/5 p-4 transition hover:bg-white/8 hover:border-orange-500/20"
                    onClick={() => router.push(`/PremiumUsers/test/${t.id}`)}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-base">
                        {CAT_EMOJI[t.subject ?? ""] ?? CAT_EMOJI.default}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white/85">{t.title}</p>
                        <p className="mt-0.5 text-[11px] text-white/35">
                          {t.subject && <span className="mr-2 rounded-full bg-orange-500/10 px-2 py-0.5 text-orange-400">{t.subject}</span>}
                          {new Date(t.created_at).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/30">{t.content?.slice(0, 120)}…</p>
                      </div>
                    </div>
                    <div className="ml-4 flex shrink-0 items-center gap-1 opacity-0 transition group-hover:opacity-100">
                      <button
                        onClick={(e) => { e.stopPropagation(); router.push(`/PremiumUsers/test/${t.id}`); }}
                        className="flex items-center gap-1 rounded-xl bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-orange-400 hover:bg-orange-500/20"
                      >
                        <ExternalLink className="h-3 w-3" /> Üben
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); void deleteTest(t.id); }}
                        disabled={deletingId === t.id}
                        className="rounded-lg p-2 text-white/30 hover:bg-red-500/15 hover:text-red-400"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* ── ANALYTICS VIEW ── */}
        {nav === "analytics" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-5"
          >
            {/* Stat cards row 1 — tests */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Gesamt Tests",   value: tests.length,          unit: "Tests"     },
                { label: "Diese Woche",    value: tests.filter(t => (Date.now() - new Date(t.created_at).getTime()) < 7 * 86400000).length, unit: "in 7 Tagen" },
                { label: "Diesen Monat",   value: tests.filter(t => new Date(t.created_at).getMonth() === new Date().getMonth()).length, unit: "im Monat" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/6 bg-white/5 p-5">
                  <p className="text-[11px] text-white/40">{s.label}</p>
                  <p className="mt-2 text-4xl font-bold text-white">{loading ? "—" : s.value}</p>
                  <p className="mt-1 text-[10px] text-white/25">{s.unit}</p>
                </div>
              ))}
            </div>

            {/* Stat cards row 2 — scores */}
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  label: "Test-Versuche",
                  value: results.length,
                  unit: "gesamt",
                  color: "text-white",
                },
                {
                  label: "Bestes Ergebnis",
                  value: results.length > 0 ? `${Math.max(...results.map(r => r.score))}%` : "—",
                  unit: "aller Zeit",
                  color: "text-emerald-400",
                },
                {
                  label: "Ø Ergebnis",
                  value: results.length > 0 ? `${Math.round(results.reduce((a, r) => a + r.score, 0) / results.length)}%` : "—",
                  unit: "Durchschnitt",
                  color: "text-orange-400",
                },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/6 bg-white/5 p-5">
                  <p className="text-[11px] text-white/40">{s.label}</p>
                  <p className={`mt-2 text-4xl font-bold ${s.color}`}>{loading ? "—" : s.value}</p>
                  <p className="mt-1 text-[10px] text-white/25">{s.unit}</p>
                </div>
              ))}
            </div>

            {/* Activity chart */}
            <div className="rounded-2xl border border-white/6 bg-white/5 p-5">
              <p className="mb-4 text-xs font-semibold text-white/60">Test-Aktivität (14 Tage)</p>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: "rgba(255,255,255,0.3)" }} tickLine={false} axisLine={false} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: "rgba(255,255,255,0.3)" }} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ background: "#12112a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, fontSize: 12 }}
                      labelStyle={{ color: "rgba(255,255,255,0.6)" }}
                      cursor={{ fill: "rgba(255,112,91,0.08)" }}
                    />
                    <Bar dataKey="count" name="Tests erstellt" fill="url(#barGrad2)" radius={[6, 6, 0, 0]} />
                    <defs>
                      <linearGradient id="barGrad2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFB457" />
                        <stop offset="100%" stopColor="#FF705B" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent results */}
            {results.length > 0 && (
              <div className="rounded-2xl border border-white/6 bg-white/5 p-5">
                <p className="mb-3 text-xs font-semibold text-white/60">Letzte Ergebnisse</p>
                <div className="space-y-2">
                  {results.slice(0, 8).map((r) => {
                    const testTitle = tests.find(t => t.id === r.test_id)?.title ?? "Test";
                    const pct = r.score;
                    const col = pct >= 80 ? "bg-emerald-500" : pct >= 60 ? "bg-yellow-500" : pct >= 40 ? "bg-orange-500" : "bg-red-500";
                    const textCol = pct >= 80 ? "text-emerald-400" : pct >= 60 ? "text-yellow-400" : pct >= 40 ? "text-orange-400" : "text-red-400";
                    return (
                      <div key={r.id} className="flex items-center gap-3 rounded-xl bg-white/3 px-4 py-2.5">
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-xs font-medium text-white/70">{testTitle}</p>
                          <p className="text-[10px] text-white/25">
                            {new Date(r.completed_at).toLocaleDateString("de-DE", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                        <div className="shrink-0 text-right">
                          <span className={`text-sm font-bold ${textCol}`}>{pct}%</span>
                          <p className="text-[10px] text-white/25">{r.correct_count}/{r.total_count}</p>
                        </div>
                        <div className="w-16 shrink-0">
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                            <div className={`h-full rounded-full ${col}`} style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* ── SETTINGS VIEW ── */}
        {nav === "settings" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-4"
          >
            {[
              { label: "Subscription verwalten", desc: "Plan ändern oder kündigen", action: () => router.push("/ManageSubscription"), btn: "Öffnen" },
              { label: "KI-Test erstellen",      desc: "Neuen Test mit KI generieren", action: () => router.push("/Test_openAi"),        btn: "Starten" },
              { label: "Abmelden",               desc: "Aus deinem Account ausloggen", action: () => void logout(),                       btn: "Abmelden", danger: true },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between rounded-2xl border border-white/6 bg-white/5 px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-white/80">{s.label}</p>
                  <p className="text-xs text-white/35">{s.desc}</p>
                </div>
                <button
                  onClick={s.action}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                    s.danger
                      ? "bg-red-500/15 text-red-400 hover:bg-red-500/25"
                      : "bg-gradient-to-r from-[#FF705B] to-[#FFB457] text-white hover:brightness-110"
                  }`}
                >
                  {s.btn}
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </main>

      {/* ── RIGHT PANEL ── */}
      <aside className="hidden w-52 shrink-0 flex-col gap-3 border-l border-white/5 bg-[#12112a] p-4 lg:flex">
        {/* User */}
        <div className="rounded-2xl border border-white/5 bg-white/5 p-3 text-center">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#FF705B] to-[#FFB457] text-sm font-bold text-white">
            {username.charAt(0).toUpperCase()}
          </div>
          <p className="text-xs font-semibold text-white/80">{username}</p>
          <p className="text-[10px] text-emerald-400">Premium ✓</p>
        </div>

        {/* Metrics */}
        {[
          { label: "Gesamt Tests",  value: loading ? "—" : String(tests.length), icon: <FileText className="h-3.5 w-3.5 text-orange-400" /> },
          { label: "Diese Woche",   value: loading ? "—" : String(tests.filter(t => (Date.now() - new Date(t.created_at).getTime()) < 7 * 86400000).length), icon: <TrendingUp className="h-3.5 w-3.5 text-emerald-400" /> },
          { label: "Aktive User",   value: "1.254",  icon: <Users className="h-3.5 w-3.5 text-blue-400" /> },
        ].map((m) => (
          <div key={m.label} className="rounded-2xl border border-white/5 bg-white/5 p-3">
            <div className="mb-1.5 flex items-center gap-1.5">
              {m.icon}
              <p className="text-[9px] text-white/35">{m.label}</p>
            </div>
            <p className="text-lg font-bold text-white">{m.value}</p>
          </div>
        ))}

        {/* Quick Actions */}
        <div className="rounded-2xl border border-white/5 bg-white/5 p-3">
          <p className="mb-2 text-[9px] font-semibold uppercase tracking-wider text-white/25">Quick Actions</p>
          {[
            { label: "KI-Test erstellen", action: () => router.push("/Test_openAi") },
            { label: "Manuell erstellen", action: () => setShowModal(true) },
            { label: "Subscription",      action: () => router.push("/ManageSubscription") },
          ].map((a) => (
            <button
              key={a.label}
              onClick={a.action}
              className="mb-1.5 flex w-full items-center gap-2 rounded-lg bg-white/5 px-2.5 py-1.5 text-[10px] text-white/45 transition hover:bg-white/10 hover:text-white/75"
            >
              <ChevronRight className="h-3 w-3 text-orange-400/50" />
              {a.label}
            </button>
          ))}
        </div>
      </aside>

      {/* ── CREATE MODAL ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#1a1835] p-6 shadow-2xl"
          >
            <h3 className="mb-5 bg-gradient-to-r from-[#FF705B] to-[#FFB457] bg-clip-text text-xl font-bold text-transparent">
              Test manuell erstellen
            </h3>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-white/50">Titel</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="z.B. VW Einstellungstest"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-white/50">Fach / Kategorie</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="z.B. Mathe, Logik, Technik…"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-white/50">Inhalt</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Testinhalt, Fragen oder Notizen…"
                  rows={4}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20"
                />
              </div>
              {error && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-400">{error}</p>}
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => { setShowModal(false); setError(""); }}
                className="flex-1 rounded-xl border border-white/10 py-2.5 text-sm text-white/50 transition hover:bg-white/5"
              >
                Abbrechen
              </button>
              <button
                onClick={() => void createTest()}
                className="flex-1 rounded-xl bg-gradient-to-r from-[#FF705B] to-[#FFB457] py-2.5 text-sm font-bold text-white transition hover:brightness-110"
              >
                Erstellen ✓
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
