"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, Clock, Loader2, Lock, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { PRICE_LABEL } from "@/lib/ap1/topics";
import { ihkNote, noteColor } from "@/lib/ap1/grading";
import { isAnswerCorrect, type Exam } from "@/lib/ap1/types";
import QuestionCard from "../_ap1/QuestionCard";

type Phase = "loading" | "locked" | "error" | "intro" | "running" | "saving" | "result";

const fmt = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

export default function ExamClient() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [exam, setExam] = useState<Exam | null>(null);
  const [part, setPart] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [secondsLeft, setSecondsLeft] = useState(0);
  const startedAt = useRef(0);

  const supabase = getSupabaseBrowserClient();
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/auth/login"); return; }
      const res = await fetch("/api/ap1/exam");
      if (res.status === 403) { setPhase("locked"); return; }
      if (!res.ok) { setPhase("error"); return; }
      const data = (await res.json()) as Exam;
      setExam(data);
      setSecondsLeft(data.durationMinutes * 60);
      setPhase("intro");
    };
    void load();
  }, [supabase, router]);

  const allQuestions = exam?.parts.flatMap((p) => p.questions) ?? [];
  const partPoints = (exam?.parts ?? []).map((p) =>
    p.questions.reduce((sum, q) => sum + (isAnswerCorrect(q, answers[q.id]) ? q.points : 0), 0),
  );
  const totalPoints = partPoints.reduce((a, b) => a + b, 0);

  const submit = useCallback(async () => {
    if (!exam) return;
    setPhase("saving");
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const questions = exam.parts.flatMap((p) => p.questions);
      const points = exam.parts.reduce(
        (sum, p) => sum + p.questions.reduce((s, q) => s + (isAnswerCorrect(q, answers[q.id]) ? q.points : 0), 0),
        0,
      );
      await Promise.all([
        supabase.from("ap1_exams").insert({
          user_id: user.id,
          points,
          note: ihkNote(points).note,
          duration_seconds: Math.round((Date.now() - startedAt.current) / 1000),
          parts_json: exam.parts.map((p) => ({
            title: p.title,
            points: p.questions.reduce((s, q) => s + (isAnswerCorrect(q, answers[q.id]) ? q.points : 0), 0),
          })),
        }),
        // Exam answers count towards topic progress as well.
        supabase.from("ap1_answers").insert(
          questions
            .filter((q) => answers[q.id] !== undefined && answers[q.id] !== "")
            .map((q) => ({
              user_id: user.id, question_id: q.id, topic: q.topic,
              correct: isAnswerCorrect(q, answers[q.id]), source: "exam",
            })),
        ),
      ]);
    }
    setPhase("result");
    window.scrollTo({ top: 0 });
  }, [exam, answers, supabase]);

  // Countdown; auto-submit when time is up.
  useEffect(() => {
    if (phase !== "running") return;
    if (secondsLeft <= 0) { void submit(); return; }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, secondsLeft, submit]);

  // Warn before leaving a running exam.
  useEffect(() => {
    if (phase !== "running") return;
    const handler = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [phase]);

  const answeredCount = allQuestions.filter((q) => answers[q.id]).length;

  const confirmSubmit = () => {
    const open = allQuestions.length - answeredCount;
    if (open > 0 && !window.confirm(`${open} Aufgabe(n) sind noch offen. Trotzdem abgeben?`)) return;
    void submit();
  };

  const center = (children: React.ReactNode) => (
    <div className="flex min-h-screen items-center justify-center bg-[#1a1835] p-6 text-white">{children}</div>
  );

  if (phase === "loading" || phase === "saving") {
    return center(<Loader2 className="h-8 w-8 animate-spin text-orange-400" />);
  }
  if (phase === "error" || !exam && phase !== "locked") {
    return center(<p className="text-white/60">Simulation konnte nicht geladen werden.</p>);
  }
  if (phase === "locked") {
    return center(
      <div className="max-w-md rounded-3xl border border-white/10 bg-[#12112a] p-8 text-center">
        <Lock className="mx-auto mb-4 h-10 w-10 text-orange-400" />
        <h1 className="text-xl font-bold">Die Prüfungssimulation ist im Prüfungspaket</h1>
        <p className="mt-2 text-sm text-white/60">90 Minuten, 4 Handlungsschritte, Note nach IHK-Schlüssel. Beliebig oft wiederholbar.</p>
        <button onClick={() => router.push("/ManageSubscription")} className="mt-6 w-full rounded-2xl bg-gradient-to-r from-[#FF705B] to-[#FFB457] py-3.5 font-bold text-white">
          Freischalten · {PRICE_LABEL} einmalig
        </button>
      </div>,
    );
  }
  if (!exam) return null;

  if (phase === "intro") {
    return center(
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#12112a] p-8">
        <GraduationCap className="mb-4 h-10 w-10 text-orange-400" />
        <h1 className="text-2xl font-bold">AP1 Prüfungssimulation</h1>
        <p className="mt-4 text-sm leading-relaxed text-white/70">{exam.scenario}</p>
        <ul className="mt-5 space-y-1.5 text-sm text-white/60">
          <li>⏱️ {exam.durationMinutes} Minuten, der Timer läuft ab Start</li>
          <li>📝 {exam.parts.length} Handlungsschritte à 25 Punkte, alle sind zu bearbeiten</li>
          <li>🧮 Taschenrechner erlaubt, wie in der echten Prüfung</li>
          <li>🎓 Auswertung nach IHK-Notenschlüssel, ab 50 Punkten bestanden</li>
        </ul>
        <div className="mt-8 flex gap-3">
          <button onClick={() => router.push("/PremiumUsers")} className="flex-1 rounded-2xl border border-white/10 py-3 text-sm text-white/60 hover:bg-white/5">
            Abbrechen
          </button>
          <button
            onClick={() => { startedAt.current = Date.now(); setPhase("running"); }}
            className="flex-1 rounded-2xl bg-gradient-to-r from-[#FF705B] to-[#FFB457] py-3 text-sm font-bold text-white hover:brightness-110"
          >
            Prüfung starten
          </button>
        </div>
      </div>,
    );
  }

  if (phase === "result") {
    const n = ihkNote(totalPoints);
    return (
      <div className="min-h-screen bg-[#1a1835] px-4 py-8 text-white">
        <div className="mx-auto max-w-2xl">
          <button onClick={() => router.push("/PremiumUsers")} className="mb-6 flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80">
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </button>
          <div className="rounded-3xl border border-white/10 bg-[#12112a] p-8 text-center">
            <p className="text-sm text-white/50">Dein Ergebnis</p>
            <p className="mt-2 text-5xl font-black">{totalPoints.toLocaleString("de-DE")} <span className="text-2xl text-white/40">/ 100</span></p>
            <p className="mt-2 text-xl font-bold" style={{ color: noteColor(n.note) }}>Note {n.note} · {n.label}</p>
            <p className="mt-1 text-sm text-white/50">{totalPoints >= 50 ? "Bestanden ✅" : "Noch nicht bestanden. Schau dir die Lösungen unten genau an."}</p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {exam.parts.map((p, i) => (
                <div key={p.nr} className="rounded-2xl bg-white/5 p-3">
                  <p className="text-[10px] text-white/40">HS {p.nr}</p>
                  <p className="text-lg font-bold">{partPoints[i]} / 25</p>
                </div>
              ))}
            </div>
          </div>

          <h2 className="mt-10 mb-4 text-lg font-bold">Lösungen & Erklärungen</h2>
          {exam.parts.map((p) => (
            <div key={p.nr} className="mb-8">
              <p className="mb-3 text-sm font-semibold text-orange-300">Handlungsschritt {p.nr}: {p.title}</p>
              <div className="space-y-4">
                {p.questions.map((q) => (
                  <div key={q.id} className="rounded-3xl border border-white/[0.08] bg-[#12112a] p-6">
                    <p className="mb-2 text-[11px] text-white/40">{q.points} Punkte</p>
                    <QuestionCard q={q} value={answers[q.id]} onChange={() => undefined} reveal />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // running
  const current = exam.parts[part]!;
  return (
    <div className="min-h-screen bg-[#1a1835] text-white">
      <header className="sticky top-0 z-10 border-b border-white/5 bg-[#12112a]/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
          <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-bold tabular-nums ${
            secondsLeft < 600 ? "bg-red-500/15 text-red-300" : "bg-white/5 text-white/80"
          }`}>
            <Clock className="h-4 w-4" /> {fmt(secondsLeft)}
          </div>
          <span className="text-xs text-white/50">{answeredCount}/{allQuestions.length} bearbeitet</span>
          <button onClick={confirmSubmit} className="rounded-xl bg-gradient-to-r from-[#FF705B] to-[#FFB457] px-4 py-2 text-xs font-bold text-white">
            Abgeben
          </button>
        </div>
        <div className="mx-auto flex max-w-3xl gap-1 overflow-x-auto px-4 pb-2">
          {exam.parts.map((p, i) => (
            <button
              key={p.nr}
              onClick={() => { setPart(i); window.scrollTo({ top: 0 }); }}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold ${
                i === part ? "bg-orange-500/20 text-orange-300" : "text-white/50 hover:bg-white/5"
              }`}
            >
              HS {p.nr} · {p.questions.filter((q) => answers[q.id]).length}/{p.questions.length}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6">
        <h1 className="text-lg font-bold">Handlungsschritt {current.nr}: {current.title}</h1>
        <p className="mt-2 mb-6 rounded-2xl border border-white/[0.08] bg-white/5 p-4 text-sm leading-relaxed text-white/70">
          {current.situation}
        </p>
        <div className="space-y-4">
          {current.questions.map((q, i) => (
            <div key={q.id} className="rounded-3xl border border-white/[0.08] bg-[#12112a] p-6">
              <p className="mb-2 text-[11px] text-white/40">Aufgabe {current.nr}.{i + 1} · {q.points} Punkte</p>
              <QuestionCard
                q={q}
                value={answers[q.id]}
                onChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))}
                reveal={false}
              />
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-between">
          <button
            disabled={part === 0}
            onClick={() => { setPart(part - 1); window.scrollTo({ top: 0 }); }}
            className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white/60 disabled:opacity-30"
          >
            ← Zurück
          </button>
          {part < exam.parts.length - 1 ? (
            <button
              onClick={() => { setPart(part + 1); window.scrollTo({ top: 0 }); }}
              className="rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold hover:bg-white/15"
            >
              Nächster Handlungsschritt →
            </button>
          ) : (
            <button onClick={confirmSubmit} className="rounded-xl bg-gradient-to-r from-[#FF705B] to-[#FFB457] px-5 py-2.5 text-sm font-bold text-white">
              Prüfung abgeben
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
