"use client";
import React, { useState } from "react";
import { MessageSquarePlus, X, Star, Loader2, CheckCircle2 } from "lucide-react";

type Category = "bug" | "feature" | "general" | "praise";

const CATEGORIES: { value: Category; label: string; emoji: string }[] = [
  { value: "bug", label: "Bug melden", emoji: "🐛" },
  { value: "feature", label: "Feature-Wunsch", emoji: "💡" },
  { value: "general", label: "Allgemein", emoji: "💭" },
  { value: "praise", label: "Lob", emoji: "🌟" },
];

export default function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<Category>("general");
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setCategory("general");
    setRating(0);
    setHoverRating(0);
    setMessage("");
    setError(null);
    setSubmitted(false);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(reset, 300); // reset after close animation
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      setError("Bitte gib eine Bewertung ab (1–5 Sterne).");
      return;
    }
    if (!message.trim()) {
      setError("Bitte schreib eine kurze Nachricht.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, rating, message }),
      });

      const data = (await res.json()) as { success?: boolean; error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? "Unbekannter Fehler");
      }

      setSubmitted(true);
      setTimeout(() => handleClose(), 3000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Fehler beim Senden. Bitte erneut versuchen.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full border border-[#FF705B]/30 bg-white px-4 py-3 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-[#FF705B] hover:shadow-[0_0_20px_rgba(255,112,91,0.25)] dark:bg-gray-800"
        title="Feedback geben"
      >
        <MessageSquarePlus className="h-5 w-5 text-[#FF705B]" />
        <span className="hidden text-sm font-semibold text-gray-700 md:block dark:text-gray-200">
          Feedback
        </span>
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={handleClose}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed bottom-20 left-6 z-50 w-[min(360px,calc(100vw-3rem))] overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300 dark:bg-gray-800 ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-[#FF705B] to-[#FFB457] px-5 py-4">
          <div className="flex items-center gap-2">
            <MessageSquarePlus className="h-5 w-5 text-white" />
            <h3 className="font-bold text-white">Dein Feedback</h3>
          </div>
          <button
            onClick={handleClose}
            className="rounded-full p-1 text-white/80 transition hover:bg-white/20 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5">
          {submitted ? (
            /* ── Success state ── */
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <div className="rounded-full bg-green-100 p-4 dark:bg-green-900/30">
                <CheckCircle2 className="h-10 w-10 text-green-500" />
              </div>
              <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                Danke für dein Feedback!
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Das hilft uns, CrackTheTest besser zu machen. 🚀
              </p>
            </div>
          ) : (
            /* ── Form ── */
            <div className="space-y-4">
              {/* Category */}
              <div>
                <label className="mb-2 block text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                  Kategorie
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => setCategory(c.value)}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                        category === c.value
                          ? "border-[#FF705B] bg-[#FF705B]/10 text-[#FF705B]"
                          : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                      }`}
                    >
                      <span>{c.emoji}</span>
                      <span>{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Star Rating */}
              <div>
                <label className="mb-2 block text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                  Bewertung
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-7 w-7 transition-colors ${
                          star <= (hoverRating || rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                  Nachricht
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Was denkst du? Was fehlt noch? Was ist super?"
                  maxLength={2000}
                  rows={4}
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#FF705B] focus:bg-white focus:ring-2 focus:ring-[#FF705B]/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:bg-gray-700"
                />
                <div className="mt-1 text-right text-xs text-gray-400">
                  {message.length}/2000
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                onClick={() => void handleSubmit()}
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF705B] to-[#FFB457] py-3 font-bold text-white shadow-md transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Wird gesendet...
                  </>
                ) : (
                  "Feedback senden 🚀"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
