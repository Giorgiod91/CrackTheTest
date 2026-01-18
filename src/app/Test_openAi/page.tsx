"use client";
import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  MessageSquare,
  Calendar,
  Bell,
  PlusCircle,
} from "lucide-react";

export default function page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  // anzahl der Fragen kann der User wahelern aber default ist 20
  const [anzahl, setAnzahl] = useState(20);
  const [displayData, setDisplayData] = useState<string>("Create Test");

  const [mlprediction, setMlprediction] = useState<
    Array<{ difficulty: string; confidence: number }>
  >([]);

  const [error, setError] = useState<string | null>(null);

  // the tests that come back from the backend will be saved here for now
  const [test, setTest] = useState<string>("");

  const sendTest = async (title: string, content: string, subject: string) => {
    try {
      // Step 1: Get the test from backend
      const response = await fetch("../api/openai/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          subject: subject,
          content: content,
          anzahl: anzahl,
        }),
      });
      if (!response.ok) {
        throw new Error("Error creating Test");
      }
      const data = await response.json();
      setTest(data.test_text);

      // Step 2: Predict difficulty for each question using the separate API
      const questions = data.questions || [];
      const predictions = [];

      for (const question of questions) {
        const predictionResponse = await fetch("/api/predict-difficulty", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: question,
          }),
        });

        if (predictionResponse.ok) {
          const prediction = await predictionResponse.json();
          predictions.push(prediction);
        }
      }

      setMlprediction(predictions);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="bg-gradient-to-r from-[#FF705B] to-[#FFB457] bg-clip-text text-4xl font-bold text-transparent">
            Create Test
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            ✨ Generate AI-powered tests instantly
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn btn-circle btn-ghost hover:bg-[#FF705B]/10">
            <Bell className="text-[#FF705B]" />
          </button>
          <button
            className="btn btn-circle btn-ghost hover:bg-[#FF705B]/10"
            onClick={() => (window.location.href = "/PremiumUsers")}
          >
            Dashboard
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
          {/* Sidebar */}

          {/* Main Content */}
          <main className="col-span-12 md:col-span-10">
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <form className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Test Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTitle(e.target.value)
                    }
                    placeholder="e.g. Volkswagen Aptitude Test"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all outline-none focus:border-[#FF705B] focus:bg-white focus:ring-2 focus:ring-[#FF705B]/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSubject(e.target.value)
                    }
                    value={subject}
                    placeholder="e.g. IT Application Development"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all outline-none focus:border-[#FF705B] focus:bg-white focus:ring-2 focus:ring-[#FF705B]/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Specific Content Requirements
                  </label>
                  <textarea
                    value={content}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setContent(e.target.value)
                    }
                    placeholder="e.g. Include questions about Java loops, SQL joins, and logical reasoning puzzles."
                    className="min-h-[120px] w-full resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all outline-none focus:border-[#FF705B] focus:bg-white focus:ring-2 focus:ring-[#FF705B]/20"
                  />
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-bold text-gray-700">
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setAnzahl(parseInt(e.target.value))
                    }
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
                    onClick={() => sendTest(title, subject, content)}
                    className="w-full transform rounded-xl bg-gradient-to-r from-[#FF705B] to-[#FFB457] px-6 py-4 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
                  >
                    Generate Test
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
                  <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
                    <div className="border-b border-gray-100 bg-gray-50/50 px-8 py-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">
                          📝 Generated Test
                        </h2>
                        <button className="rounded-lg bg-[#FF705B]/10 px-4 py-2 text-sm font-bold text-[#FF705B] transition hover:bg-[#FF705B]/20">
                          Download PDF
                        </button>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="prose prose-lg max-w-none">
                        <div className="font-serif leading-relaxed whitespace-pre-wrap text-gray-700">
                          {test}
                        </div>
                      </div>
                    </div>
                  </div>

                  {mlprediction && mlprediction.length > 0 && (
                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
                      <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                          🎯 Difficulty Analysis
                        </h2>
                        <p className="mt-1 text-sm font-medium text-gray-500">
                          AI-powered assessment of question complexity
                        </p>
                      </div>
                      <div className="p-8">
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {mlprediction.map((prediction, index) => (
                            <div
                              key={index}
                              className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:border-[#FF705B]/30 hover:shadow-md"
                            >
                              <div className="mb-4 flex items-center justify-between">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-600 transition-colors group-hover:bg-[#FF705B]/10 group-hover:text-[#FF705B]">
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
                                  Confidence
                                </span>
                                <span className="text-2xl font-bold text-gray-900">
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
                              ></div>
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
