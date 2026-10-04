"use client";
import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2, Lock, RotateCcw, Trophy } from "lucide-react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { TOPIC_BY_SLUG, PRICE_LABEL, type TopicSlug } from "@/lib/ap1/topics";
import { isAnswerCorrect, type Question } from "@/lib/ap1/types";
import QuestionCard from "../../_ap1/QuestionCard";

type Phase = "loading" | "locked" | "error" | "practice" | "done";

export default function PracticeClient({ topic }: { topic: TopicSlug }) {
  const meta = TOPIC_BY_SLUG[topic]!;
  const [phase, setPhase] = useState<Phase>("loading");
  const [queue, setQueue] = useState<Question[]>([]);
  const [idx, setIdx] = useState(0);
  const [value, setValue] = useState<string | undefined>();
  const [revealed, setRevealed] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  const supabase = getSupabaseBrowserClient();
  const router = useRouter();

  const load = useCallback(async () => {
    setPhase("loading");
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/auth/login"); return; }
    setUserId(user.id);

    const res = await fetch(`/api/ap1/questions?topic=${topic}`);
    if (res.status === 403) { setPhase("locked"); return; }
    if (!res.ok) { setPhase("error"); return; }
    const { questions } = (await res.json()) as { questions: Question[] };

    // Weak spots first: never answered or last answer wrong, then the rest.
    const { data: rows } = await supabase
      .from("ap1_answers").select("question_id, correct, answered_at")
      .eq("user_id", user.id).eq("topic", topic)
      .order("answered_at", { ascending: false });
    const latest = new Map<string, boolean>();
    for (const r of (rows as { question_id: string; correct: boolean }[] | null) ?? []) {
      if (!latest.has(r.question_id)) latest.set(r.question_id, r.correct);
    }
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    const open = shuffled.filter((q) => latest.get(q.id) !== true);
    const sure = shuffled.filter((q) => latest.get(q.id) === true);

    setQueue([...open, ...sure]);
    setIdx(0);
    setValue(undefined);
    setRevealed(false);
    setResults([]);
    setPhase("practice");
  }, [supabase, router, topic]);

  useEffect(() => { void load(); }, [load]);

  const q = queue[idx];

  const check = async () => {
    if (!q || value === undefined || value === "") return;
    const correct = isAnswerCorrect(q, value);
    setRevealed(true);
    setResults((r) => [...r, correct]);
    if (userId) {
      await supabase.from("ap1_answers").insert({
        user_id: userId, question_id: q.id, topic: q.topic, correct, source: "practice",
      });
    }
  };

  const next = () => {
    if (idx + 1 >= queue.length) { setPhase("done"); return; }
    setIdx(idx + 1);
    setValue(undefined);
    setRevealed(false);
  };

  const shell = (children: React.ReactNode) => (
    <div className="flex min-h-screen flex-col bg-[#1a1835] text-white">
      <header className="flex items-center justify-between border-b border-white/5 bg-[#12112a] px-5 py-3.5">
        <button onClick={() => router.push("/PremiumUsers")} className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80">
          <ArrowLeft className="h-4 w-4" /> Dashboard
        </button>
        <p className="text-sm font-semibold">{meta.emoji} {meta.title}</p>
        <span className="w-20 text-right text-xs text-white/50">
          {phase === "practice" ? `${idx + 1}/${queue.length}` : ""}
        </span>
      </header>
      {phase === "practice" && (
        <div className="h-1 w-full bg-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-[#FF705B] to-[#FFB457]"
            animate={{ width: `${((idx + (revealed ? 1 : 0)) / Math.max(queue.length, 1)) * 100}%` }}
          />
        </div>
      )}
      <main className="flex flex-1 justify-center overflow-y-auto px-4 py-8">
        <div className="w-full max-w-2xl">{children}</div>
      </main>
    </div>
  );

  if (phase === "loading") {
    return shell(<div className="flex justify-center pt-20"><Loader2 className="h-8 w-8 animate-spin text-orange-400" /></div>);
  }

  if (phase === "error") {
    return shell(<p className="pt-20 text-center text-white/60">Fragen konnten nicht geladen werden. Bitte später erneut versuchen.</p>);
  }

  if (phase === "locked") {
    return shell(
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-[#12112a] p-8 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF705B] to-[#FFB457]">
          <Lock className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-xl font-bold">{meta.title} ist im Prüfungspaket</h1>
        <p className="mt-2 text-sm text-white/60">
          Schalte alle 9 AP1-Themen, die 90-Minuten-Prüfungssimulation und unbegrenzte KI-Tests frei.
        </p>
        <button
          onClick={() => router.push("/ManageSubscription")}
          className="mt-6 w-full rounded-2xl bg-gradient-to-r from-[#FF705B] to-[#FFB457] py-3.5 font-bold text-white hover:brightness-110"
        >
          Freischalten · {PRICE_LABEL} einmalig
        </button>
      </div>,
    );
  }

  if (phase === "done") {
    const right = results.filter(Boolean).length;
    const pct = results.length ? Math.round((right / results.length) * 100) : 0;
    return shell(
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-[#12112a] p-8 text-center">
        <Trophy className="mx-auto mb-3 h-10 w-10 text-orange-400" />
        <h1 className="text-xl font-bold">Runde geschafft!</h1>
        <p className="mt-2 text-4xl font-black">{pct}%</p>
        <p className="mt-1 text-sm text-white/60">{right} von {results.length} richtig</p>
        <p className="mt-4 text-xs text-white/50">
          Falsche Fragen kommen in der nächsten Runde zuerst dran. So wird aus jedem Fehler ein sicherer Punkt.
        </p>
        <div className="mt-6 flex gap-3">
          <button onClick={() => void load()} className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl border border-white/10 py-3 text-sm text-white/70 hover:bg-white/5">
            <RotateCcw className="h-4 w-4" /> Neue Runde
          </button>
          <button onClick={() => router.push("/PremiumUsers")} className="flex-1 rounded-2xl bg-gradient-to-r from-[#FF705B] to-[#FFB457] py-3 text-sm font-bold text-white">
            Zum Dashboard
          </button>
        </div>
      </div>,
    );
  }

  if (!q) return null;

  return shell(
    <>
      <p className="mb-3 text-center text-[11px] font-semibold tracking-widest text-white/40 uppercase">
        Frage {idx + 1} von {queue.length} · {["", "Basis", "Prüfungsniveau", "Anspruchsvoll"][q.level]}
      </p>
      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.2 }}
          className="rounded-3xl border border-white/[0.08] bg-[#12112a] p-6"
        >
          <QuestionCard q={q} value={value} onChange={setValue} reveal={revealed} />
        </motion.div>
      </AnimatePresence>
      <div className="mt-5 flex justify-end">
        {revealed ? (
          <button onClick={next} className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#FF705B] to-[#FFB457] px-5 py-3 text-sm font-bold text-white hover:brightness-110">
            {idx + 1 >= queue.length ? "Auswertung" : "Nächste Frage"} <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={() => void check()}
            disabled={value === undefined || value === ""}
            className="rounded-xl bg-gradient-to-r from-[#FF705B] to-[#FFB457] px-5 py-3 text-sm font-bold text-white hover:brightness-110 disabled:opacity-40"
          >
            Antwort prüfen
          </button>
        )}
      </div>
    </>,
  );
}
