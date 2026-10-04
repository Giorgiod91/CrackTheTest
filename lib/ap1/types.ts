import { parseNumberInput } from "./grading";
import type { TopicSlug } from "./topics";

interface QuestionBase {
  id: string;
  topic: TopicSlug;
  /** 1 = Basis, 2 = prüfungstypisch, 3 = anspruchsvoll */
  level: 1 | 2 | 3;
  prompt: string;
  /** Optional code / table block shown in monospace below the prompt. */
  code?: string;
  explanation: string;
  /** Insider tip from someone who already passed the AP1. */
  tipp?: string;
}

export interface McQuestion extends QuestionBase {
  kind: "mc";
  options: string[];
  correct: number;
}

export interface NumberQuestion extends QuestionBase {
  kind: "number";
  answer: number;
  /** Absolute tolerance, default 0.01. */
  tolerance?: number;
  unit?: string;
}

export type Question = McQuestion | NumberQuestion;

/** MC answers are option indexes as strings, number answers are raw input. */
export function isAnswerCorrect(q: Question, answer: string | undefined) {
  if (answer === undefined || answer === "") return false;
  if (q.kind === "mc") return Number(answer) === q.correct;
  const n = parseNumberInput(answer);
  return n !== null && Math.abs(n - q.answer) <= (q.tolerance ?? 0.01);
}

export function formatSolution(q: Question) {
  if (q.kind === "mc") return q.options[q.correct] ?? "";
  const num = q.answer.toLocaleString("de-DE", { maximumFractionDigits: 2 });
  return q.unit ? `${num} ${q.unit}` : num;
}

export interface ExamPart {
  nr: number;
  title: string;
  situation: string;
  questions: (Question & { points: number })[];
}

export interface Exam {
  scenario: string;
  durationMinutes: number;
  parts: ExamPart[];
}
