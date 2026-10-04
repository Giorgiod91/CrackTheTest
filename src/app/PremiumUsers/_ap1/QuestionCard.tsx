"use client";
import React from "react";
import { CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import { formatSolution, isAnswerCorrect, type Question } from "@/lib/ap1/types";

interface Props {
  q: Question;
  value: string | undefined;
  onChange: (value: string) => void;
  /** Show correct/wrong state, solution and explanation. */
  reveal: boolean;
}

/** Shared question renderer for topic practice and the exam simulation. */
export default function QuestionCard({ q, value, onChange, reveal }: Props) {
  const correct = isAnswerCorrect(q, value);

  return (
    <div>
      <p className="text-base leading-relaxed font-semibold text-white/90">{q.prompt}</p>
      {q.code && (
        <pre className="mt-3 overflow-x-auto rounded-xl border border-white/10 bg-black/30 p-4 font-mono text-xs leading-relaxed text-orange-100/90">
          {q.code}
        </pre>
      )}

      <div className="mt-5">
        {q.kind === "mc" ? (
          <div className="space-y-2.5">
            {q.options.map((opt, i) => {
              const chosen = value === String(i);
              const isSolution = reveal && i === q.correct;
              const isWrongPick = reveal && chosen && i !== q.correct;
              return (
                <button
                  key={i}
                  disabled={reveal}
                  onClick={() => onChange(String(i))}
                  className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-sm transition ${
                    isSolution
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-100"
                      : isWrongPick
                        ? "border-red-500/40 bg-red-500/10 text-red-100"
                        : chosen
                          ? "border-orange-400/50 bg-orange-500/10 text-white"
                          : "border-white/[0.08] bg-white/5 text-white/70 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                    chosen || isSolution ? "bg-gradient-to-br from-[#FF705B] to-[#FFB457] text-white" : "bg-white/10 text-white/50"
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="leading-snug">{opt}</span>
                  {isSolution && <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-emerald-400" />}
                  {isWrongPick && <XCircle className="ml-auto h-4 w-4 shrink-0 text-red-400" />}
                </button>
              );
            })}
          </div>
        ) : (
          <label className="block">
            <span className="mb-1.5 block text-xs text-white/50">Deine Lösung{q.unit ? ` in ${q.unit}` : ""}</span>
            <div className="flex items-center gap-2">
              <input
                inputMode="decimal"
                value={value ?? ""}
                disabled={reveal}
                onChange={(e) => onChange(e.target.value)}
                placeholder="z. B. 12,5"
                className={`w-full max-w-xs rounded-xl border bg-white/5 px-4 py-3 text-base text-white outline-none focus:ring-2 focus:ring-orange-500/30 ${
                  reveal ? (correct ? "border-emerald-500/50" : "border-red-500/50") : "border-white/10 focus:border-orange-400/50"
                }`}
              />
              {q.unit && <span className="text-sm text-white/50">{q.unit}</span>}
            </div>
          </label>
        )}
      </div>

      {reveal && (
        <div className="mt-5 space-y-3">
          <div className={`rounded-2xl border p-4 ${correct ? "border-emerald-500/20 bg-emerald-500/[0.06]" : "border-red-500/20 bg-red-500/[0.06]"}`}>
            <p className={`mb-1 flex items-center gap-2 text-sm font-bold ${correct ? "text-emerald-300" : "text-red-300"}`}>
              {correct ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              {correct ? "Richtig!" : `Lösung: ${formatSolution(q)}`}
            </p>
            <p className="text-sm leading-relaxed text-white/70">{q.explanation}</p>
          </div>
          {q.tipp && (
            <div className="rounded-2xl border border-orange-400/20 bg-orange-500/[0.06] p-4">
              <p className="mb-1 flex items-center gap-2 text-xs font-bold tracking-wide text-orange-300 uppercase">
                <Lightbulb className="h-3.5 w-3.5" /> Prüfungstipp
              </p>
              <p className="text-sm leading-relaxed text-white/70">{q.tipp}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
