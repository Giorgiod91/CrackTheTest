"use client";
import React, { useState, useEffect } from "react";
import { Bell, Loader2, Save, CheckCircle, Lock } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { useRouter } from "next/navigation";

interface TestResponse {
  test_text: string;
  questions?: string[];
  free_remaining?: number | null;
}

interface PredictionResult {
  difficulty: string;
  confidence: number;
}

export default function CreateTestPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const [anzahl, setAnzahl] = useState(20);
  const [mlprediction, setMlprediction] = useState<PredictionResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [test, setTest] = useState<string>("");
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Auth state
  const [authChecked, setAuthChecked] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [freeRemaining, setFreeRemaining] = useState(3);

  const supabase = getSupabaseBrowserClient();
  const router = useRouter();

  // Auth + premium check on mount
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      const { data } = await supabase
        .from("users")
        .select("premium, free_tests_used")
        .eq("real_member_id", user.id)
        .maybeSingle<{
          premium: boolean | null;
          free_tests_used: number | null;
        }>();

      setIsPremium(data?.premium === true);
      setFreeRemaining(Math.max(0, 3 - (data?.free_tests_used ?? 0)));
      setAuthChecked(true);
    };

    void checkAuth();
  }, [supabase, router]);

  const sendTest = async (t: string, s: string, c: string) => {
    if (!t.trim() || !s.trim()) {
      setError("Titel und Fach sind erforderlich");
      return;
    }
    setGenerating(true);
    setError(null);
    setTest("");
    setMlprediction([]);
    setSaved(false);

    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: t, subject: s, content: c, anzahl }),
      });

      if (!response.ok) {
        const errBody = (await response.json().catch(() => ({}))) as {
          error?: string;
          code?: string;
        };
        if (errBody.code === "FREE_LIMIT_REACHED") {
          setFreeRemaining(0);
        }
        throw new Error(errBody.error ?? "Fehler beim Erstellen des Tests");
      }

      const data = (await response.json()) as TestResponse;
      setTest(data.test_text);
      if (typeof data.free_remaining === "number") {
        setFreeRemaining(data.free_remaining);
      }

      const questions = data.questions ?? [];
      const predictions: PredictionResult[] = [];

      for (const question of questions) {
        const predictionResponse = await fetch("/api/predict-difficulty", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: question }),
        });
        if (predictionResponse.ok) {
          const prediction =
            (await predictionResponse.json()) as PredictionResult;
          predictions.push(prediction);
        }
      }

      setMlprediction(predictions);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
    } finally {
      setGenerating(false);
    }
  };

  // Save the generated test to Supabase
  const saveTest = async () => {
    if (!test || !title.trim()) return;
    setSaving(true);
    setError(null);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Nicht eingeloggt");
        return;
      }

      const { error: insertError } = await supabase.from("tests").insert([
        {
          title: title.trim(),
          content: test,
          authorid: user.id,
        },
      ]);

      if (insertError) throw insertError;

      setSaved(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Fehler beim Speichern des Tests",
      );
    } finally {
      setSaving(false);
    }
  };

  // Loading state
  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Überprüfe Zugriff...</span>
        </div>
      </div>
    );
  }

  // Free limit reached – show upgrade wall
  if (!isPremium && freeRemaining <= 0 && !test) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
        <div className="max-w-md w-full text-center rounded-3xl border border-gray-200 bg-white p-12 shadow-2xl dark:border-gray-700 dark:bg-gray-800">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#FF705B] to-[#FFB457] shadow-2xl">
            <Lock className="h-10 w-10 text-white" />
          </div>
          <h1 className="mb-3 bg-gradient-to-r from-[#FF705B] to-[#FFB457] bg-clip-text text-3xl font-bold text-transparent">
            Deine 3 Gratis-Tests sind aufgebraucht
          </h1>
          <p className="mb-8 text-gray-500 dark:text-gray-400">
            Dir hat das Üben geholfen? Schalte jetzt unbegrenzte KI-Tests,
            Auswertung und Analytics frei — einmal zahlen, kein Abo.
          </p>
          <button
            onClick={() => router.push("/ManageSubscription")}
            className="w-full rounded-full bg-gradient-to-r from-[#FF705B] to-[#FFB457] px-8 py-4 font-bold text-white shadow-lg shadow-orange-500/30 transition hover:scale-105"
          >
            🚀 Freischalten — 14,99€ einmalig
          </button>
          <button
            onClick={() => router.push("/PremiumUsers")}
            className="mt-4 w-full rounded-full border border-gray-200 px-8 py-3 text-sm font-semibold text-gray-600 transition hover:border-gray-400 dark:border-gray-600 dark:text-gray-400"
          >
            ← Zurück zum Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      {/* Free tier counter */}
      {!isPremium && (
        <div className="mb-6 flex flex-col items-center justify-between gap-3 rounded-xl border border-orange-400/40 bg-gradient-to-r from-[#FF705B]/10 to-[#FFB457]/10 p-4 sm:flex-row">
          <p className="text-sm font-semibold">
            🎁 Kostenlose Tests übrig:{" "}
            <span className="text-orange-500">{freeRemaining} von 3</span>
          </p>
          <button
            onClick={() => router.push("/ManageSubscription")}
            className="rounded-full bg-gradient-to-r from-[#FF705B] to-[#FFB457] px-5 py-2 text-sm font-bold text-white shadow transition hover:brightness-110"
          >
            Unbegrenzt üben — 14,99€ einmalig →
          </button>
        </div>
      )}

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="bg-gradient-to-r from-[#FF705B] to-[#FFB457] bg-clip-text text-4xl font-bold text-transparent">
            Test erstellen
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            ✨ KI-generierte Tests in Sekunden
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn btn-circle btn-ghost hover:bg-[#FF705B]/10">
            <Bell className="text-[#FF705B]" />
          </button>
          <button
            className="btn btn-ghost text-sm font-semibold hover:bg-[#FF705B]/10"
            onClick={() => router.push("/PremiumUsers")}
          >
            ← Dashboard
          </button>
          <div className="avatar ring ring-[#FF705B]/30 ring-offset-2">
            <div className="w-10 rounded-full">
              <img
                src="https://img.daisyui.com/images/profile/demo/avatar-1.jpg"
                alt="user avatar"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-xl dark:bg-black/10">
        <div className="grid grid-cols-12 gap-6">
          <main className="col-span-12 md:col-span-10">
            <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-gray-800">
              <form className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">
                    Test Titel
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="z.B. Volkswagen Eignungstest"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all outline-none focus:border-[#FF705B] focus:bg-white focus:ring-2 focus:ring-[#FF705B]/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">
                    Fach / Thema
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="z.B. IT-Anwendungsentwicklung"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all outline-none focus:border-[#FF705B] focus:bg-white focus:ring-2 focus:ring-[#FF705B]/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">
                    Spezifische Inhalte (optional)
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="z.B. Java-Schleifen, SQL Joins, logische Denkaufgaben..."
                    className="min-h-[120px] w-full resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all outline-none focus:border-[#FF705B] focus:bg-white focus:ring-2 focus:ring-[#FF705B]/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                      Anzahl der Fragen
                    </label>
                    <span className="rounded-lg bg-[#FF705B]/10 px-2 py-1 text-sm font-bold text-[#FF705B]">
                      {anzahl} Fragen
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={anzahl}
                    onChange={(e) => setAnzahl(parseInt(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-[#FF705B]"
                  />
                  <div className="mt-1 flex justify-between text-xs text-gray-400">
                    <span>1</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    disabled={generating}
                    onClick={() => sendTest(title, subject, content)}
                    className="flex w-full transform items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#FF705B] to-[#FFB457] px-6 py-4 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {generating ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        KI generiert Test...
                      </>
                    ) : (
                      "✨ Test generieren"
                    )}
                  </button>
                </div>
              </form>

              {error && (
                <div className="mt-6 rounded-xl border border-red-100 bg-red-50 p-4">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              )}

              {test && (
                <div className="animate-in fade-in slide-in-from-bottom-4 mt-8 space-y-8 duration-500">
                  {/* Generated Test */}
                  <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800">
                    <div className="border-b border-gray-100 bg-gray-50/50 px-8 py-6 dark:border-gray-700 dark:bg-gray-700/50">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                          📝 Generierter Test
                        </h2>
                        <div className="flex items-center gap-3">
                          {/* Save button */}
                          {saved ? (
                            <span className="flex items-center gap-2 rounded-lg bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
                              <CheckCircle className="h-4 w-4" />
                              Gespeichert!
                            </span>
                          ) : (
                            <button
                              onClick={() => void saveTest()}
                              disabled={saving}
                              className="flex items-center gap-2 rounded-lg bg-[#FF705B]/10 px-4 py-2 text-sm font-bold text-[#FF705B] transition hover:bg-[#FF705B]/20 disabled:opacity-60"
                            >
                              {saving ? (
                                <>
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                  Speichern...
                                </>
                              ) : (
                                <>
                                  <Save className="h-4 w-4" />
                                  Im Dashboard speichern
                                </>
                              )}
                            </button>
                          )}
                          <button className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-bold text-gray-600 transition hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300">
                            📄 PDF
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="prose prose-lg max-w-none">
                        <div className="font-serif leading-relaxed whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                          {test}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ML Difficulty Analysis */}
                  {mlprediction.length > 0 && (
                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800">
                      <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 dark:border-gray-700 dark:from-gray-700 dark:to-gray-700">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                          🎯 Schwierigkeitsanalyse
                        </h2>
                        <p className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                          KI-gestützte Bewertung der Fragenkomplexität
                        </p>
                      </div>
                      <div className="p-8">
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {mlprediction.map((prediction, index) => (
                            <div
                              key={index}
                              className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:border-[#FF705B]/30 hover:shadow-md dark:border-gray-700 dark:bg-gray-700"
                            >
                              <div className="mb-4 flex items-center justify-between">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-600 transition-colors group-hover:bg-[#FF705B]/10 group-hover:text-[#FF705B] dark:bg-gray-600 dark:text-gray-300">
                                  {index + 1}
                                </div>
                                <span
                                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase ${
                                    prediction.difficulty.toLowerCase() ===
                                      "easy" ||
                                    prediction.difficulty.toLowerCase() ===
                                      "leicht"
                                      ? "bg-green-100 text-green-700"
                                      : prediction.difficulty.toLowerCase() ===
                                            "medium" ||
                                          prediction.difficulty.toLowerCase() ===
                                            "mittel"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-red-100 text-red-700"
                                  }`}
                                >
                                  {prediction.difficulty}
                                </span>
                              </div>
                              <div className="flex items-end justify-between">
                                <span className="text-xs font-medium tracking-wider text-gray-400 uppercase">
                                  Konfidenz
                                </span>
                                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                  {(prediction.confidence * 100).toFixed(0)}
                                  <span className="ml-0.5 text-sm text-gray-400">
                                    %
                                  </span>
                                </span>
                              </div>
                              <div
                                className={`absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 transform transition-all duration-500 group-hover:scale-x-100 ${
                                  prediction.difficulty.toLowerCase() ===
                                    "easy" ||
                                  prediction.difficulty.toLowerCase() ===
                                    "leicht"
                                    ? "bg-green-500"
                                    : prediction.difficulty.toLowerCase() ===
                                          "medium" ||
                                        prediction.difficulty.toLowerCase() ===
                                          "mittel"
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                }`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
