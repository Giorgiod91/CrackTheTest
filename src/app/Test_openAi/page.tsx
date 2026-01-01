export default function Page() {
  let Fortschritt = 0;

  return (
    <main className="bg-base-100 text-base-content relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(255,112,91,0.16),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(255,180,87,0.18),transparent_28%),radial-gradient(circle_at_50%_78%,rgba(255,112,91,0.12),transparent_34%)]" />

      <section className="relative mx-auto flex max-w-5xl flex-col gap-10 px-6 py-12 lg:py-16">
        <header className="flex flex-col gap-4 rounded-2xl border border-orange-200/40 bg-white/70 p-6 shadow-2xl shadow-orange-200/40 backdrop-blur">
          <p className="text-xs font-semibold tracking-[0.25em] text-orange-500/90 uppercase">
            Matching Practice
          </p>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                Übe dein Test-Set in Ruhe
              </h1>
              <p className="max-w-2xl text-base text-neutral-700 sm:text-lg">
                Schnelles Matching, klares Feedback. Starte, prüfe deine
                Antworten und sammle Routine.
              </p>
            </div>
            <div className="flex gap-2">
              <button className="rounded-full border border-orange-200 bg-gradient-to-r from-[#FF705B] to-[#FFB457] px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-orange-300/50">
                Neuer Durchlauf
              </button>
              <button className="rounded-full border border-orange-200/60 bg-white/70 px-4 py-2 text-sm font-semibold text-neutral-800 transition hover:-translate-y-0.5 hover:border-orange-300 hover:bg-white">
                Letzte Session
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-neutral-700 sm:text-sm">
            <span className="rounded-full border border-orange-100 bg-white/80 px-3 py-1">
              Fortschritt: 0%
            </span>
            <span className="rounded-full border border-orange-100 bg-white/80 px-3 py-1">
              Fehler: 0
            </span>
            <span className="rounded-full border border-orange-100 bg-white/80 px-3 py-1">
              Streak: 0
            </span>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl border border-orange-100 bg-white/80 p-5 shadow-xl shadow-orange-200/40 backdrop-blur">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF705B]/20 via-[#FF8C73]/12 to-[#FFB457]/8 opacity-80 blur-3xl" />
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Prompts</p>
                <h2 className="text-xl font-semibold text-neutral-900">
                  Zuordnen
                </h2>
              </div>
              <span className="rounded-full border border-orange-100 bg-white/70 px-3 py-1 text-xs text-neutral-800">
                8 Karten
              </span>
            </div>
            <div className="relative z-10 mt-4 grid gap-3">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={`prompt-${idx}`}
                  className="rounded-xl border border-orange-100 bg-white/80 px-4 py-3 text-sm text-neutral-900 transition hover:-translate-y-0.5 hover:border-orange-200 hover:bg-white"
                >
                  Prompt {idx + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-orange-100 bg-white/80 p-5 shadow-xl shadow-orange-200/40 backdrop-blur">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFB457]/18 via-[#FF8C73]/12 to-[#FF705B]/10 opacity-80 blur-3xl" />
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Antworten</p>
                <h2 className="text-xl font-semibold text-neutral-900">
                  Finde die beste Beschreibung
                </h2>
              </div>
              <span className="rounded-full border border-orange-100 bg-white/70 px-3 py-1 text-xs text-neutral-800">
                8 Karten
              </span>
            </div>
            <div className="relative z-10 mt-4 grid gap-3">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={`answer-${idx}`}
                  className="rounded-xl border border-orange-100 bg-white/80 px-4 py-3 text-sm text-neutral-900 transition hover:-translate-y-0.5 hover:border-orange-200 hover:bg-white"
                >
                  Antwort {idx + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer className="flex flex-col gap-3 rounded-2xl border border-orange-100 bg-white/80 p-4 text-sm text-neutral-700 shadow-lg shadow-orange-200/40 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="font-semibold text-neutral-900">Tipp</span>
            <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
              <span className="rounded-full border border-orange-100 bg-white/80 px-3 py-1">
                Klarer Fokus
              </span>
              <span className="rounded-full border border-orange-100 bg-white/80 px-3 py-1">
                Kurze Sessions
              </span>
              <span className="rounded-full border border-orange-100 bg-white/80 px-3 py-1">
                Streak aufbauen
              </span>
            </div>
          </div>
          <p>
            Wenn du deine eigenen Fragen nutzt, ersetze die Platzhalter oben.
            Wenig Ablenkung, schnelle Wiederholungen.
          </p>
        </footer>
      </section>
    </main>
  );
}
