"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, BookOpen, Timer, Sparkles, Settings, LogOut,
  Lock, Flame, Target, CheckCircle2, CalendarDays, Trash2, ChevronRight,
  GraduationCap, Trophy,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, ReferenceLine,
} from "recharts";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { TOPICS, PRICE_LABEL, type TopicSlug } from "@/lib/ap1/topics";
import {
  ihkNote, noteColor, pruefungsreife, streakDays, topicProgress,
  type AnswerRow,
} from "@/lib/ap1/grading";

type NavItem = "uebersicht" | "themen" | "pruefung" | "ki-tests" | "einstellungen";

interface ExamRow {
  id: string;
  points: number;
  note: number;
  duration_seconds: number;
  completed_at: string;
}

interface KiTest {
  id: string;
  title: string;
  subject?: string | null;
  created_at: string;
}

const CORRECT = "#34d399";
const WRONG = "#f87171";
const tooltipStyle = {
  contentStyle: { background: "#12112a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 11 },
  labelStyle: { color: "rgba(255,255,255,0.6)" },
};

export default function Ap1Dashboard({ isPremium }: { isPremium: boolean }) {
  const [nav, setNav] = useState<NavItem>("uebersicht");
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("du");
  const [examDate, setExamDate] = useState<string>("");
  const [counts, setCounts] = useState<Partial<Record<TopicSlug, number>>>({});
  const [answers, setAnswers] = useState<AnswerRow[]>([]);
  const [exams, setExams] = useState<ExamRow[]>([]);
  const [kiTests, setKiTests] = useState<KiTest[]>([]);
  const [savingDate, setSavingDate] = useState(false);
  const [notice, setNotice] = useState("");

  const supabase = getSupabaseBrowserClient();
  const router = useRouter();

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/auth/login"); return; }

    const [meta, { data: dbUser }, { data: answerRows }, { data: examRows }, { data: testRows }] =
      await Promise.all([
        fetch("/api/ap1/questions").then((r) => r.json() as Promise<{ counts?: Partial<Record<TopicSlug, number>> }>),
        supabase.from("users").select("username, exam_date").eq("real_member_id", user.id)
          .maybeSingle<{ username: string | null; exam_date: string | null }>(),
        supabase.from("ap1_answers").select("question_id, topic, correct, answered_at")
          .eq("user_id", user.id).order("answered_at", { ascending: false }).limit(5000),
        supabase.from("ap1_exams").select("id, points, note, duration_seconds, completed_at")
          .eq("user_id", user.id).order("completed_at", { ascending: false }).limit(50),
        supabase.from("tests").select("id, title, subject, created_at")
          .eq("authorid", user.id).order("created_at", { ascending: false }),
      ]);

    setCounts(meta.counts ?? {});
    setUsername(dbUser?.username ?? "du");
    setExamDate(dbUser?.exam_date ?? "");
    setAnswers((answerRows as AnswerRow[] | null) ?? []);
    setExams(((examRows as ExamRow[] | null) ?? []).map((e) => ({ ...e, points: Number(e.points) })));
    setKiTests((testRows as KiTest[] | null) ?? []);
    setLoading(false);
  }, [supabase, router]);

  useEffect(() => { void fetchData(); }, [fetchData]);

  // ── derived ───────────────────────────────────────────────────────────────
  const progress = useMemo(() => topicProgress(answers, counts), [answers, counts]);
  const reife = pruefungsreife(progress);
  const prognose = ihkNote(reife);
  const streak = streakDays(answers.map((a) => a.answered_at));
  const accuracy = answers.length > 0
    ? Math.round((answers.filter((a) => a.correct).length / answers.length) * 100)
    : 0;
  const bestExam = exams.length > 0 ? exams.reduce((b, e) => (e.points > b.points ? e : b)) : null;

  const daysLeft = examDate
    ? Math.ceil((new Date(examDate).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) / 86400000)
    : null;

  const nextTopic = [...progress]
    .filter((p) => p.total > 0)
    .sort((a, b) => a.mastery - b.mastery)[0];

  const activity = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 14 }, (_, i) => {
      const d = new Date(now);
      d.setDate(now.getDate() - (13 - i));
      const key = d.toDateString();
      const day = answers.filter((a) => new Date(a.answered_at).toDateString() === key);
      return {
        date: d.toLocaleDateString("de-DE", { day: "numeric", month: "short" }),
        Richtig: day.filter((a) => a.correct).length,
        Falsch: day.filter((a) => !a.correct).length,
      };
    });
  }, [answers]);

  const examChart = [...exams].reverse().map((e, i) => ({
    name: `#${i + 1}`,
    Punkte: e.points,
  }));

  // ── actions ───────────────────────────────────────────────────────────────
  const saveExamDate = async (value: string) => {
    setExamDate(value);
    setSavingDate(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase.from("users")
        .update({ exam_date: value || null }).eq("real_member_id", user.id);
      setNotice(error ? "Termin konnte nicht gespeichert werden." : "Prüfungstermin gespeichert.");
    }
    setSavingDate(false);
  };

  const resetProgress = async () => {
    if (!window.confirm("Wirklich den gesamten Übungsfortschritt löschen?")) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("ap1_answers").delete().eq("user_id", user.id);
    setAnswers([]);
    setNotice("Fortschritt zurückgesetzt.");
  };

  const deleteKiTest = async (id: string) => {
    await supabase.from("tests").delete().eq("id", id);
    setKiTests((p) => p.filter((t) => t.id !== id));
  };

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  const navItems: { id: NavItem; icon: React.ReactNode; label: string }[] = [
    { id: "uebersicht", icon: <LayoutDashboard className="h-4 w-4" />, label: "Übersicht" },
    { id: "themen", icon: <BookOpen className="h-4 w-4" />, label: "Themen üben" },
    { id: "pruefung", icon: <Timer className="h-4 w-4" />, label: "Prüfungssimulation" },
    { id: "ki-tests", icon: <Sparkles className="h-4 w-4" />, label: "KI-Tests" },
    { id: "einstellungen", icon: <Settings className="h-4 w-4" />, label: "Einstellungen" },
  ];

  const card = "rounded-2xl border border-white/[0.06] bg-white/5 p-5";

  return (
    <div className="flex min-h-screen bg-[#1a1835] font-sans text-white">
      {/* ── SIDEBAR (desktop) ── */}
      <aside className="hidden w-56 shrink-0 flex-col border-r border-white/5 bg-[#12112a] md:flex">
        <div className="border-b border-white/5 px-4 py-4">
          <p className="text-sm font-bold text-orange-400">AP1 Ready</p>
          <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
            isPremium ? "bg-gradient-to-r from-[#FF705B] to-[#FFB457] text-white" : "bg-white/10 text-white/60"
          }`}>
            {isPremium ? "⭐ Prüfungspaket" : "Nicht freigeschaltet"}
          </span>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setNav(item.id)}
              className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-medium transition-all ${
                nav === item.id
                  ? "bg-gradient-to-r from-[#FF705B]/20 to-[#FFB457]/10 text-orange-300"
                  : "text-white/50 hover:bg-white/5 hover:text-white/80"
              }`}
            >
              {item.icon}
              {item.label}
              {nav === item.id && <ChevronRight className="ml-auto h-3 w-3 opacity-60" />}
            </button>
          ))}
        </nav>
        <div className="space-y-2 border-t border-white/5 p-3">
          {!isPremium && (
            <button
              onClick={() => router.push("/ManageSubscription")}
              className="w-full rounded-xl bg-gradient-to-r from-[#FF705B] to-[#FFB457] py-2.5 text-xs font-bold text-white shadow-md shadow-orange-500/20 hover:brightness-110"
            >
              Alles freischalten · {PRICE_LABEL}
            </button>
          )}
          <button
            onClick={() => void logout()}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-white/5 py-2 text-xs text-white/50 hover:bg-white/10 hover:text-white/80"
          >
            <LogOut className="h-3.5 w-3.5" /> Abmelden
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="flex min-w-0 flex-1 flex-col">
        {/* Mobile nav */}
        <div className="flex gap-1 overflow-x-auto border-b border-white/5 bg-[#12112a] px-3 py-2 md:hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setNav(item.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs ${
                nav === item.id ? "bg-orange-500/15 text-orange-300" : "text-white/50"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        <div className="mx-auto w-full max-w-5xl flex-1 p-4 sm:p-6">
          {/* Header */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold">
                {nav === "uebersicht" && `Hey ${username} 👋`}
                {nav === "themen" && "Themen üben"}
                {nav === "pruefung" && "Prüfungssimulation"}
                {nav === "ki-tests" && "KI-Tests"}
                {nav === "einstellungen" && "Einstellungen"}
              </h1>
              <p className="mt-0.5 text-xs text-white/50">
                {daysLeft === null
                  ? "Trag deinen Prüfungstermin ein, dann planen wir rückwärts."
                  : daysLeft > 0
                    ? `Noch ${daysLeft} Tage bis zur AP1`
                    : daysLeft === 0 ? "Heute ist Prüfungstag. Viel Erfolg! 🍀" : "Prüfung vorbei. Trag den nächsten Termin ein."}
              </p>
            </div>
            {!isPremium && (
              <button
                onClick={() => router.push("/ManageSubscription")}
                className="rounded-full border border-orange-400/40 bg-orange-500/10 px-4 py-2 text-xs font-semibold text-orange-300 hover:bg-orange-500/20"
              >
                🔓 Alle 9 Themen + Simulation · {PRICE_LABEL} einmalig
              </button>
            )}
          </div>

          {notice && (
            <p className="mb-4 rounded-xl bg-emerald-500/10 px-4 py-2 text-xs text-emerald-300" onClick={() => setNotice("")}>
              {notice}
            </p>
          )}

          {/* ── ÜBERSICHT ── */}
          {nav === "uebersicht" && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
              {/* Prüfungsreife hero */}
              <div className="grid gap-4 lg:grid-cols-3">
                <div className={`${card} lg:col-span-2`}>
                  <div className="flex flex-wrap items-center gap-6">
                    <div className="relative h-32 w-32 shrink-0">
                      <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                        <circle
                          cx="18" cy="18" r="15.9" fill="none" stroke="url(#reifeGrad)" strokeWidth="3"
                          strokeLinecap="round" strokeDasharray={`${reife} 100`}
                        />
                        <defs>
                          <linearGradient id="reifeGrad"><stop offset="0%" stopColor="#FF705B" /><stop offset="100%" stopColor="#FFB457" /></linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-black">{loading ? "…" : `${reife}%`}</span>
                        <span className="text-[10px] text-white/50">Prüfungsreife</span>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-white/50">Prognose nach IHK-Schlüssel</p>
                      <p className="mt-1 text-2xl font-bold">
                        Note {prognose.note}{" "}
                        <span className="text-base font-semibold" style={{ color: noteColor(prognose.note) }}>
                          ({prognose.label})
                        </span>
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-white/50">
                        Gewichtet nach Themen, so wie sie in der AP1 drankommen. Zählt die Fragen, deren letzte Antwort richtig war.
                      </p>
                      {nextTopic && (
                        <button
                          onClick={() => router.push(`/PremiumUsers/ueben/${nextTopic.slug}`)}
                          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#FF705B] to-[#FFB457] px-4 py-2 text-xs font-bold text-white hover:brightness-110"
                        >
                          <Target className="h-3.5 w-3.5" />
                          Nächster Schritt: {TOPICS.find((t) => t.slug === nextTopic.slug)?.title}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
                  {[
                    { label: "Lernserie", value: `${streak} ${streak === 1 ? "Tag" : "Tage"}`, icon: <Flame className="h-4 w-4 text-orange-400" /> },
                    { label: "Trefferquote", value: answers.length ? `${accuracy}%` : "–", icon: <CheckCircle2 className="h-4 w-4 text-emerald-400" /> },
                  ].map((s) => (
                    <div key={s.label} className={card}>
                      <div className="mb-1 flex items-center justify-between">
                        <p className="text-[11px] text-white/50">{s.label}</p>
                        {s.icon}
                      </div>
                      <p className="text-2xl font-bold">{loading ? "–" : s.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: "Fragen beantwortet", value: String(answers.length) },
                  { label: "Themen begonnen", value: `${progress.filter((p) => p.answered > 0).length}/${TOPICS.length}` },
                  { label: "Simulationen", value: String(exams.length) },
                  { label: "Beste Simulation", value: bestExam ? `${bestExam.points} P.` : "–" },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-white/[0.06] bg-white/5 p-4">
                    <p className="text-[11px] text-white/50">{s.label}</p>
                    <p className="mt-1 text-xl font-bold">{loading ? "–" : s.value}</p>
                  </div>
                ))}
              </div>

              {/* Activity chart */}
              <div className={card}>
                <p className="mb-1 text-sm font-semibold text-white/80">Lernaktivität der letzten 14 Tage</p>
                <p className="mb-4 text-[11px] text-white/40">Beantwortete Fragen pro Tag</p>
                <div className="h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activity} margin={{ top: 0, right: 0, left: -28, bottom: 0 }}>
                      <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="date" tick={{ fontSize: 9, fill: "rgba(255,255,255,0.4)" }} tickLine={false} axisLine={false} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 9, fill: "rgba(255,255,255,0.4)" }} tickLine={false} axisLine={false} />
                      <Tooltip {...tooltipStyle} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                      <Legend wrapperStyle={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }} iconType="circle" iconSize={8} />
                      <Bar dataKey="Richtig" stackId="a" fill={CORRECT} stroke="#1a1835" strokeWidth={2} />
                      <Bar dataKey="Falsch" stackId="a" fill={WRONG} stroke="#1a1835" strokeWidth={2} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Topic mastery */}
              <div className={card}>
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-white/80">Stand pro Thema</p>
                  <button onClick={() => setNav("themen")} className="text-[11px] text-orange-400 hover:text-orange-300">
                    Alle Themen →
                  </button>
                </div>
                <div className="space-y-3">
                  {TOPICS.map((t) => {
                    const p = progress.find((x) => x.slug === t.slug);
                    const locked = !isPremium;
                    return (
                      <button
                        key={t.slug}
                        onClick={() => router.push(locked ? "/ManageSubscription" : `/PremiumUsers/ueben/${t.slug}`)}
                        className="flex w-full items-center gap-3 text-left"
                      >
                        <span className="w-6 text-center">{t.emoji}</span>
                        <span className="w-40 shrink-0 truncate text-xs text-white/70 sm:w-52">{t.title}</span>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#FF705B] to-[#FFB457]"
                            style={{ width: `${p?.mastery ?? 0}%` }}
                          />
                        </div>
                        <span className="w-12 shrink-0 text-right text-xs font-semibold text-white/70">
                          {locked ? <Lock className="ml-auto h-3.5 w-3.5 text-white/30" /> : `${p?.mastery ?? 0}%`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── THEMEN ── */}
          {nav === "themen" && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TOPICS.map((t) => {
                const p = progress.find((x) => x.slug === t.slug);
                const locked = !isPremium;
                return (
                  <div key={t.slug} className={`${card} flex flex-col`}>
                    <div className="mb-3 flex items-start justify-between">
                      <span className="text-2xl">{t.emoji}</span>
                      {locked && <Lock className="h-4 w-4 text-white/30" />}
                    </div>
                    <p className="font-semibold">{t.title}</p>
                    <p className="mt-1 text-xs text-white/50">{t.short}</p>
                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <div className="h-full rounded-full bg-gradient-to-r from-[#FF705B] to-[#FFB457]" style={{ width: `${p?.mastery ?? 0}%` }} />
                    </div>
                    <p className="mt-1.5 text-[11px] text-white/40">
                      {p?.mastered ?? 0} von {p?.total ?? 0} Fragen sicher · {p?.mastery ?? 0}%
                    </p>
                    <button
                      onClick={() => router.push(locked ? "/ManageSubscription" : `/PremiumUsers/ueben/${t.slug}`)}
                      className={`mt-4 rounded-xl py-2 text-xs font-bold transition ${
                        locked
                          ? "border border-white/10 text-white/50 hover:bg-white/5"
                          : "bg-gradient-to-r from-[#FF705B] to-[#FFB457] text-white hover:brightness-110"
                      }`}
                    >
                      {locked ? `Im Prüfungspaket · ${PRICE_LABEL}` : (p?.answered ?? 0) > 0 ? "Weiter üben →" : "Starten →"}
                    </button>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* ── PRÜFUNG ── */}
          {nav === "pruefung" && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
              <div className={`${card} flex flex-col gap-5 sm:flex-row sm:items-center`}>
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF705B] to-[#FFB457]">
                  <GraduationCap className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-bold">AP1 unter Echtbedingungen</p>
                  <p className="mt-1 text-sm text-white/60">
                    90 Minuten · 4 Handlungsschritte à 25 Punkte · eine durchgehende Ausgangssituation ·
                    Bewertung nach IHK-Notenschlüssel. Jede Simulation ist neu zusammengestellt.
                  </p>
                </div>
                <button
                  onClick={() => router.push(isPremium ? "/PremiumUsers/pruefung" : "/ManageSubscription")}
                  className="shrink-0 rounded-xl bg-gradient-to-r from-[#FF705B] to-[#FFB457] px-5 py-3 text-sm font-bold text-white hover:brightness-110"
                >
                  {isPremium ? "Simulation starten →" : `🔒 Freischalten · ${PRICE_LABEL}`}
                </button>
              </div>

              {examChart.length >= 2 && (
                <div className={card}>
                  <p className="mb-1 text-sm font-semibold text-white/80">Punkte pro Simulation</p>
                  <p className="mb-4 text-[11px] text-white/40">Gestrichelt: 50 Punkte = bestanden</p>
                  <div className="h-44">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={examChart} margin={{ top: 8, right: 8, left: -28, bottom: 0 }}>
                        <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="name" tick={{ fontSize: 9, fill: "rgba(255,255,255,0.4)" }} tickLine={false} axisLine={false} />
                        <YAxis domain={[0, 100]} tick={{ fontSize: 9, fill: "rgba(255,255,255,0.4)" }} tickLine={false} axisLine={false} />
                        <Tooltip {...tooltipStyle} />
                        <ReferenceLine y={50} stroke="rgba(255,255,255,0.3)" strokeDasharray="4 4" />
                        <Line type="monotone" dataKey="Punkte" stroke="#FFB457" strokeWidth={2} dot={{ r: 4, fill: "#FFB457", stroke: "#1a1835", strokeWidth: 2 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              <div className={card}>
                <p className="mb-3 text-sm font-semibold text-white/80">Bisherige Simulationen</p>
                {exams.length === 0 ? (
                  <p className="text-xs text-white/40">Noch keine Simulation abgeschlossen.</p>
                ) : (
                  <div className="space-y-2">
                    {exams.map((e) => (
                      <div key={e.id} className="flex items-center gap-3 rounded-xl bg-white/[0.03] px-4 py-2.5">
                        <Trophy className="h-4 w-4 shrink-0 text-orange-400/70" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-white/70">
                            {new Date(e.completed_at).toLocaleDateString("de-DE", { day: "numeric", month: "short", year: "numeric" })}
                          </p>
                          <p className="text-[10px] text-white/40">{Math.round(e.duration_seconds / 60)} Min.</p>
                        </div>
                        <span className="text-sm font-bold">{e.points} / 100</span>
                        <span className="w-24 text-right text-xs font-semibold" style={{ color: noteColor(e.note) }}>
                          Note {e.note}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ── KI-TESTS ── */}
          {nav === "ki-tests" && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className={`${card} flex flex-wrap items-center justify-between gap-3`}>
                <p className="text-sm text-white/60">
                  Lass dir von der KI zusätzliche Aufgaben zu einem AP1-Thema erstellen.
                </p>
                <button
                  onClick={() => router.push("/Test_openAi")}
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#FF705B] to-[#FFB457] px-4 py-2 text-xs font-bold text-white"
                >
                  <Sparkles className="h-3.5 w-3.5" /> KI-Test erstellen
                </button>
              </div>
              {kiTests.length === 0 ? (
                <p className="text-xs text-white/40">Noch keine KI-Tests gespeichert.</p>
              ) : (
                kiTests.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => router.push(`/PremiumUsers/test/${t.id}`)}
                    className="group flex cursor-pointer items-center justify-between rounded-2xl border border-white/[0.06] bg-white/5 px-4 py-3 hover:border-orange-500/20"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white/85">{t.title}</p>
                      <p className="text-[11px] text-white/40">
                        {new Date(t.created_at).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); void deleteKiTest(t.id); }}
                      className="rounded-lg p-2 text-white/30 hover:bg-red-500/15 hover:text-red-400"
                      aria-label="Test löschen"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))
              )}
            </motion.div>
          )}

          {/* ── EINSTELLUNGEN ── */}
          {nav === "einstellungen" && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className={`${card} flex flex-wrap items-center justify-between gap-3`}>
                <div>
                  <p className="flex items-center gap-2 text-sm font-semibold"><CalendarDays className="h-4 w-4 text-orange-400" /> Prüfungstermin</p>
                  <p className="text-xs text-white/50">Für deinen Countdown im Dashboard</p>
                </div>
                <input
                  type="date"
                  value={examDate}
                  disabled={savingDate}
                  onChange={(e) => void saveExamDate(e.target.value)}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white [color-scheme:dark]"
                />
              </div>
              <div className={`${card} flex flex-wrap items-center justify-between gap-3`}>
                <div>
                  <p className="text-sm font-semibold">Prüfungspaket</p>
                  <p className="text-xs text-white/50">
                    {isPremium ? "Aktiv. Dauerhafter Zugang, kein Abo." : `Alle Themen, Simulationen und unbegrenzte KI-Tests für ${PRICE_LABEL} einmalig.`}
                  </p>
                </div>
                {!isPremium && (
                  <button
                    onClick={() => router.push("/ManageSubscription")}
                    className="rounded-xl bg-gradient-to-r from-[#FF705B] to-[#FFB457] px-4 py-2 text-xs font-bold text-white"
                  >
                    Freischalten
                  </button>
                )}
              </div>
              <div className={`${card} flex flex-wrap items-center justify-between gap-3`}>
                <div>
                  <p className="text-sm font-semibold">Fortschritt zurücksetzen</p>
                  <p className="text-xs text-white/50">Löscht alle beantworteten Übungsfragen. Simulationen bleiben.</p>
                </div>
                <button onClick={() => void resetProgress()} className="rounded-xl bg-red-500/15 px-4 py-2 text-xs font-bold text-red-400 hover:bg-red-500/25">
                  Zurücksetzen
                </button>
              </div>
              <div className={`${card} flex flex-wrap items-center justify-between gap-3`}>
                <p className="text-sm font-semibold">Abmelden</p>
                <button onClick={() => void logout()} className="rounded-xl bg-white/10 px-4 py-2 text-xs font-bold text-white/70 hover:bg-white/15">
                  Abmelden
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
