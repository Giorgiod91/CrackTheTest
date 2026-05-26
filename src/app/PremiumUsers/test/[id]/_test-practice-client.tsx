"use client";
import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle,
  RotateCcw, Trophy, BookOpen, ChevronLeft,
  Target, Loader2, AlertCircle,
} from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { useRouter } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ParsedQuestion {
  number: number;
  text: string;
  options: { label: string; text: string }[];
  correct: string; // "A" | "B" | "C" | "D"
}

interface TestRecord {
  id: string;
  title: string;
  content: string;
  subject: string | null;
  created_at: string;
}

type Phase = "loading" | "error" | "practice" | "review" | "results";

// ─── Parser ───────────────────────────────────────────────────────────────────
function parseQuestions(raw: string): ParsedQuestion[] {
  const questions: ParsedQuestion[] = [];

  // Split on question headers like **Frage 1:** or **Frage 12:**
  const blocks = raw.split(/\*\*Frage\s+(\d+):\*\*/);

  for (let i = 1; i < blocks.length; i += 2) {
    const num = parseInt(blocks[i] ?? "0");
    const body = blocks[i + 1] ?? "";
    const lines = body.split("\n").map((l) => l.trim()).filter(Boolean);

    const text = lines[0] ?? "";
    const options: { label: string; text: string }[] = [];
    let correct = "";

    for (const line of lines.slice(1)) {
      // Option lines: A) ..., B) ..., C) ..., D) ...
      const optMatch = /^([A-D])\)\s*(.+)$/.exec(line);
      if (optMatch) {
        options.push({ label: optMatch[1]!, text: optMatch[2]! });
        continue;
      }
      // Correct answer line: ✓ Richtige Antwort: A  or  Richtige Antwort: A
      const ansMatch = /(?:✓\s*)?[Rr]ichtige\s+[Aa]ntwort[:\s]+([A-D])/.exec(line);
      if (ansMatch) {
        correct = ansMatch[1]!;
      }
    }

    if (text && options.length >= 2 && correct) {
      questions.push({ number: num, text, options, correct });
    }
  }

  return questions;
}

// ─── Score colour helper ──────────────────────────────────────────────────────
function scoreColor(pct: number) {
  if (pct >= 80) return { text: "text-emerald-400", bg: "bg-emerald-500", label: "Sehr gut! 🎉" };
  if (pct >= 60) return { text: "text-yellow-400",  bg: "bg-yellow-500",  label: "Gut gemacht! 👍" };
  if (pct >= 40) return { text: "text-orange-400",  bg: "bg-orange-500",  label: "Noch mehr üben 💪" };
  return            { text: "text-red-400",    bg: "bg-red-500",    label: "Weiter lernen! 📚" };
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function TestPracticeClient({ testId }: { testId: string }) {
  const [phase, setPhase]           = useState<Phase>("loading");
  const [test, setTest]             = useState<TestRecord | null>(null);
  const [questions, setQuestions]   = useState<ParsedQuestion[]>([]);
  const [current, setCurrent]       = useState(0);
  const [answers, setAnswers]       = useState<Record<number, string>>({});
  const [saving, setSaving]         = useState(false);
  const [errorMsg, setErrorMsg]     = useState("");

  const supabase = getSupabaseBrowserClient();
  const router   = useRouter();

  // ── Load test ──────────────────────────────────────────────────────────────
  const loadTest = useCallback(async () => {
    setPhase("loading");
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/auth/login"); return; }

    const { data, error } = await supabase
      .from("tests")
      .select("*")
      .eq("id", testId)
      .eq("authorid", user.id)
      .maybeSingle<TestRecord>();

    if (error ?? !data) {
      setErrorMsg("Test nicht gefunden oder kein Zugriff.");
      setPhase("error");
      return;
    }

    const parsed = parseQuestions(data.content);
    if (parsed.length === 0) {
      setErrorMsg("Keine Fragen konnten aus diesem Test gelesen werden.");
      setPhase("error");
      return;
    }

    setTest(data);
    setQuestions(parsed);
    setCurrent(0);
    setAnswers({});
    setPhase("practice");
  }, [supabase, router, testId]);

  useEffect(() => { void loadTest(); }, [loadTest]);

  // ── Select answer ──────────────────────────────────────────────────────────
  const selectAnswer = (qIdx: number, label: string) => {
    setAnswers((prev) => ({ ...prev, [qIdx]: label }));
  };

  // ── Submit quiz ────────────────────────────────────────────────────────────
  const submitQuiz = async () => {
    setSaving(true);
    const correct = questions.filter((q, i) => answers[i] === q.correct).length;
    const score   = Math.round((correct / questions.length) * 100);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Save result — ignore error if table doesn't exist yet
        await supabase.from("test_results").insert([{
          test_id:      testId,
          user_id:      user.id,
          score,
          correct_count: correct,
          total_count:  questions.length,
          answers_json: answers,
        }]).select();
      }
    } catch { /* non-critical */ }

    setSaving(false);
    setPhase("results");
  };

  // ── Helpers ────────────────────────────────────────────────────────────────
  const answered     = Object.keys(answers).length;
  const totalQ       = questions.length;
  const progressPct  = totalQ > 0 ? (answered / totalQ) * 100 : 0;
  const q            = questions[current];

  const correctCount = questions.filter((q, i) => answers[i] === q.correct).length;
  const score        = totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0;
  const sc           = scoreColor(score);

  // ─────────────────────────────────────────────────────────────────────────────
  // LOADING
  // ─────────────────────────────────────────────────────────────────────────────
  if (phase === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1a1835]">
        <Loader2 className="h-8 w-8 animate-spin text-orange-400" />
      </div>
    );
  }

  // ERROR
  if (phase === "error") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#1a1835] p-6 text-center">
        <AlertCircle className="h-12 w-12 text-red-400" />
        <p className="text-lg font-semibold text-white">{errorMsg}</p>
        <button
          onClick={() => router.push("/PremiumUsers")}
          className="rounded-xl bg-white/10 px-6 py-2.5 text-sm text-white/70 hover:bg-white/15"
        >
          ← Zurück zum Dashboard
        </button>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // RESULTS
  // ─────────────────────────────────────────────────────────────────────────────
  if (phase === "results") {
    return (
      <div className="min-h-screen bg-[#1a1835] p-4 md:p-8">
        {/* Back */}
        <button
          onClick={() => router.push("/PremiumUsers")}
          className="mb-6 flex items-center gap-2 text-sm text-white/40 hover:text-white/70"
        >
          <ChevronLeft className="h-4 w-4" /> Dashboard
        </button>

        <div className="mx-auto max-w-2xl">
          {/* Score card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 rounded-3xl border border-white/8 bg-[#12112a] p-8 text-center"
          >
            <Trophy className="mx-auto mb-4 h-12 w-12 text-orange-400" />
            <h1 className="mb-1 text-2xl font-bold text-white">{test?.title}</h1>
            <p className="mb-6 text-sm text-white/40">Test abgeschlossen</p>

            {/* Big score */}
            <div className="mb-4 inline-flex h-32 w-32 items-center justify-center rounded-full border-4 border-orange-500/30 bg-orange-500/10">
              <span className={`text-4xl font-black ${sc.text}`}>{score}%</span>
            </div>

            <p className={`mb-2 text-lg font-bold ${sc.text}`}>{sc.label}</p>
            <p className="text-sm text-white/50">
              {correctCount} von {totalQ} Fragen richtig
            </p>

            {/* Progress bar */}
            <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${sc.bg}`}
                style={{ width: `${score}%` }}
              />
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setAnswers({});
                  setCurrent(0);
                  setPhase("practice");
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 py-3 text-sm text-white/60 hover:bg-white/5"
              >
                <RotateCcw className="h-4 w-4" /> Nochmal
              </button>
              <button
                onClick={() => setPhase("review")}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF705B] to-[#FFB457] py-3 text-sm font-bold text-white"
              >
                <BookOpen className="h-4 w-4" /> Lösungen ansehen
              </button>
            </div>
          </motion.div>

          {/* Quick breakdown */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Richtig",  value: correctCount,           color: "text-emerald-400" },
              { label: "Falsch",   value: totalQ - correctCount,  color: "text-red-400"     },
              { label: "Gesamt",   value: totalQ,                 color: "text-white"       },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/6 bg-white/5 p-4 text-center">
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="mt-1 text-[11px] text-white/35">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // REVIEW (all questions with correct/wrong highlighted)
  // ─────────────────────────────────────────────────────────────────────────────
  if (phase === "review") {
    return (
      <div className="min-h-screen bg-[#1a1835] p-4 md:p-8">
        {/* Back */}
        <button
          onClick={() => setPhase("results")}
          className="mb-6 flex items-center gap-2 text-sm text-white/40 hover:text-white/70"
        >
          <ChevronLeft className="h-4 w-4" /> Zurück zu Ergebnissen
        </button>

        <div className="mx-auto max-w-2xl">
          <h1 className="mb-6 text-xl font-bold text-white">📖 Lösungen — {test?.title}</h1>

          <div className="space-y-4">
            {questions.map((q, idx) => {
              const userAns  = answers[idx] ?? null;
              const isRight  = userAns === q.correct;
              const skipped  = userAns === null;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className={`rounded-2xl border p-5 ${
                    skipped ? "border-white/8 bg-white/5" :
                    isRight  ? "border-emerald-500/20 bg-emerald-500/5" :
                               "border-red-500/20 bg-red-500/5"
                  }`}
                >
                  {/* Question header */}
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/8 text-[10px] font-bold text-white/40">
                        {idx + 1}
                      </span>
                      <p className="text-sm font-medium leading-snug text-white/80">{q.text}</p>
                    </div>
                    {!skipped && (
                      isRight
                        ? <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                        : <XCircle className="h-5 w-5 shrink-0 text-red-400" />
                    )}
                    {skipped && <span className="shrink-0 text-[10px] text-white/25">Übersprungen</span>}
                  </div>

                  {/* Options */}
                  <div className="space-y-1.5 pl-9">
                    {q.options.map((opt) => {
                      const isCorrect = opt.label === q.correct;
                      const isUser    = opt.label === userAns;
                      const isWrong   = isUser && !isCorrect;

                      return (
                        <div
                          key={opt.label}
                          className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs ${
                            isCorrect ? "bg-emerald-500/15 text-emerald-300 font-semibold" :
                            isWrong   ? "bg-red-500/15 text-red-300" :
                                        "text-white/30"
                          }`}
                        >
                          <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                            isCorrect ? "bg-emerald-500/30 text-emerald-300" :
                            isWrong   ? "bg-red-500/30 text-red-300" :
                                        "bg-white/8 text-white/30"
                          }`}>
                            {opt.label}
                          </span>
                          {opt.text}
                          {isCorrect && <CheckCircle2 className="ml-auto h-3.5 w-3.5 text-emerald-400" />}
                          {isWrong   && <XCircle      className="ml-auto h-3.5 w-3.5 text-red-400"     />}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Done button */}
          <button
            onClick={() => router.push("/PremiumUsers")}
            className="mt-8 w-full rounded-2xl bg-gradient-to-r from-[#FF705B] to-[#FFB457] py-3.5 font-bold text-white"
          >
            Zurück zum Dashboard
          </button>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // PRACTICE (main quiz view)
  // ─────────────────────────────────────────────────────────────────────────────
  if (!q) return null;

  const selectedAnswer = answers[current] ?? null;
  const allAnswered    = answered === totalQ;

  return (
    <div className="flex min-h-screen flex-col bg-[#1a1835]">

      {/* ── TOP BAR ── */}
      <header className="flex items-center justify-between border-b border-white/5 bg-[#12112a] px-5 py-3.5">
        <button
          onClick={() => router.push("/PremiumUsers")}
          className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70"
        >
          <ArrowLeft className="h-4 w-4" /> Dashboard
        </button>

        <div className="text-center">
          <p className="text-xs font-semibold text-white/70 truncate max-w-[200px]">{test?.title}</p>
          <p className="text-[10px] text-white/30">{test?.subject}</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-white/40">{answered}/{totalQ}</span>
          <Target className="h-4 w-4 text-orange-400/60" />
        </div>
      </header>

      {/* ── PROGRESS BAR ── */}
      <div className="h-1 w-full bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-[#FF705B] to-[#FFB457]"
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* ── QUESTION AREA ── */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-xl">

          {/* Question counter */}
          <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-widest text-white/25">
            Frage {current + 1} von {totalQ}
          </p>

          {/* Question card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25 }}
            >
              {/* Question text */}
              <div className="mb-6 rounded-2xl border border-white/8 bg-[#12112a] p-6">
                <p className="text-base font-semibold leading-relaxed text-white/90">
                  {q.text}
                </p>
              </div>

              {/* Answer options */}
              <div className="space-y-3">
                {q.options.map((opt) => {
                  const chosen = selectedAnswer === opt.label;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => selectAnswer(current, opt.label)}
                      className={`flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left text-sm transition-all ${
                        chosen
                          ? "border-orange-400/50 bg-orange-500/10 text-white"
                          : "border-white/8 bg-white/5 text-white/60 hover:border-white/15 hover:bg-white/8 hover:text-white/80"
                      }`}
                    >
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                        chosen
                          ? "bg-gradient-to-br from-[#FF705B] to-[#FFB457] text-white"
                          : "bg-white/8 text-white/40"
                      }`}>
                        {opt.label}
                      </span>
                      <span className="leading-snug">{opt.text}</span>
                      {chosen && (
                        <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-orange-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── NAV BUTTONS ── */}
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              disabled={current === 0}
              className="flex items-center gap-1.5 rounded-xl border border-white/8 bg-white/5 px-4 py-2.5 text-sm text-white/50 disabled:opacity-30 hover:bg-white/8"
            >
              <ArrowLeft className="h-4 w-4" /> Zurück
            </button>

            <div className="flex flex-1 items-center justify-center gap-1">
              {questions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === current
                      ? "w-6 bg-orange-400"
                      : answers[idx] !== undefined
                        ? "w-2 bg-emerald-500/60"
                        : "w-2 bg-white/15 hover:bg-white/30"
                  }`}
                />
              ))}
            </div>

            {current < totalQ - 1 ? (
              <button
                onClick={() => setCurrent((c) => Math.min(totalQ - 1, c + 1))}
                className="flex items-center gap-1.5 rounded-xl border border-white/8 bg-white/5 px-4 py-2.5 text-sm text-white/50 hover:bg-white/8"
              >
                Weiter <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={() => void submitQuiz()}
                disabled={saving}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                  allAnswered
                    ? "bg-gradient-to-r from-[#FF705B] to-[#FFB457] text-white hover:brightness-110"
                    : "border border-white/8 bg-white/5 text-white/40 hover:bg-white/8"
                }`}
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    {allAnswered ? "Auswerten ✓" : "Abgeben"}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            )}
          </div>

          {/* Skip reminder */}
          {!allAnswered && current === totalQ - 1 && (
            <p className="mt-3 text-center text-[11px] text-white/25">
              {totalQ - answered} Frage{totalQ - answered !== 1 ? "n" : ""} noch nicht beantwortet
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
