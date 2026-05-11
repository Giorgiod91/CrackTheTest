"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Features",  href: "#tutorial"           },
  { label: "Dashboard", href: "#dashboard-preview"  },
  { label: "Firmen",    href: "#companies"           },
  { label: "Preise",    href: "#price"               },
];

function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-orange-100/60 bg-white/95 shadow-sm shadow-orange-100/40 backdrop-blur-md"
          : "border-b border-transparent bg-white/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">

        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF705B] to-[#FFB457] shadow-sm shadow-orange-300/40">
            <Zap className="h-4 w-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-slate-800">
            Crack
            <span className="bg-gradient-to-br from-[#FF705B] to-[#FFB457] bg-clip-text text-transparent">
              TheTest
            </span>
          </span>
        </button>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-1 sm:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-orange-50 hover:text-orange-500"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-2 sm:flex">
          <button
            onClick={() => router.push("/auth/login")}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/auth/signup")}
            className="rounded-xl bg-gradient-to-br from-[#FF705B] to-[#FFB457] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-orange-300/30 transition hover:brightness-110 hover:-translate-y-px"
          >
            Kostenlos starten →
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 sm:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Menü öffnen"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-orange-100 bg-white/95 backdrop-blur-md sm:hidden"
          >
            <ul className="flex flex-col px-5 py-3 gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-500"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="mt-2 flex flex-col gap-2">
                <button
                  onClick={() => { setMenuOpen(false); router.push("/auth/login"); }}
                  className="w-full rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700"
                >
                  Login
                </button>
                <button
                  onClick={() => { setMenuOpen(false); router.push("/auth/signup"); }}
                  className="w-full rounded-xl bg-gradient-to-br from-[#FF705B] to-[#FFB457] py-2.5 text-sm font-semibold text-white"
                >
                  Kostenlos starten →
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
