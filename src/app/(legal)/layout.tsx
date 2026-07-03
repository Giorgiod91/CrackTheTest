import Link from "next/link";

export default function LegalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-slate-400 transition hover:border-white/40 hover:text-white"
        >
          ← Zurück zur Startseite
        </Link>
        <article className="legal-article mt-6">
          {children}
        </article>
      </div>
    </div>
  );
}
