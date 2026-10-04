import { TOPICS, type TopicSlug } from "./topics";

// IHK 100-Punkte-Schlüssel
const NOTEN = [
  { min: 92, note: 1, label: "sehr gut" },
  { min: 81, note: 2, label: "gut" },
  { min: 67, note: 3, label: "befriedigend" },
  { min: 50, note: 4, label: "ausreichend" },
  { min: 30, note: 5, label: "mangelhaft" },
  { min: 0, note: 6, label: "ungenügend" },
] as const;

export function ihkNote(punkte: number) {
  const p = Math.max(0, Math.min(100, Math.round(punkte)));
  return NOTEN.find((n) => p >= n.min) ?? NOTEN[NOTEN.length - 1]!;
}

export function noteColor(note: number) {
  if (note <= 2) return "#34d399";
  if (note === 3) return "#fbbf24";
  if (note === 4) return "#fb923c";
  return "#f87171";
}

export interface AnswerRow {
  question_id: string;
  topic: string;
  correct: boolean;
  answered_at: string;
}

export interface TopicProgress {
  slug: TopicSlug;
  answered: number; // distinct questions answered at least once
  mastered: number; // distinct questions whose latest answer was correct
  total: number;
  mastery: number; // 0..100
}

/**
 * Mastery = share of a topic's questions whose most recent answer is correct.
 * Repeating a question you got wrong and now get right therefore counts.
 */
export function topicProgress(
  answers: AnswerRow[],
  counts: Partial<Record<TopicSlug, number>>,
): TopicProgress[] {
  const latest = new Map<string, AnswerRow>();
  for (const a of answers) {
    const prev = latest.get(a.question_id);
    if (!prev || prev.answered_at < a.answered_at) latest.set(a.question_id, a);
  }

  return TOPICS.map((t) => {
    const rows = [...latest.values()].filter((a) => a.topic === t.slug);
    const total = counts[t.slug] ?? 0;
    const mastered = rows.filter((a) => a.correct).length;
    return {
      slug: t.slug,
      answered: rows.length,
      mastered,
      total,
      mastery: total > 0 ? Math.round((Math.min(mastered, total) / total) * 100) : 0,
    };
  });
}

/** Weighted mastery across all topics, 0..100 (weights from the AP1 profile). */
export function pruefungsreife(progress: TopicProgress[]) {
  const weightBySlug = Object.fromEntries(TOPICS.map((t) => [t.slug, t.weight]));
  let sum = 0;
  let weights = 0;
  for (const p of progress) {
    const w = weightBySlug[p.slug] ?? 0;
    sum += p.mastery * w;
    weights += w;
  }
  return weights > 0 ? Math.round(sum / weights) : 0;
}

/** Consecutive days (ending today or yesterday) with at least one answer. */
export function streakDays(dates: string[]) {
  const days = new Set(dates.map((d) => new Date(d).toDateString()));
  const cursor = new Date();
  if (!days.has(cursor.toDateString())) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (days.has(cursor.toDateString())) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/** Accepts "12,5", "12.5", "1.058,40" or "1058.40 €". */
export function parseNumberInput(raw: string): number | null {
  let s = raw.replace(/[^\d,.\-]/g, "");
  if (!s) return null;
  if (s.includes(",")) s = s.replace(/\./g, "").replace(",", ".");
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}
