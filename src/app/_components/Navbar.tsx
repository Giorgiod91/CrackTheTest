"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  User,
  Settings,
  Menu,
  BookOpen,
  Sparkles,
  X,
} from "lucide-react";

function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const userLogin = () => {
    router.push("/auth/login");
  };

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Tutorial", href: "#tutorial" },
    { name: "Preise", href: "#price" },
    { name: "Für Unternehmen", href: "#firmen" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-base-100/95 border-b border-white/10 shadow-lg backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF705B] to-[#FFB457]">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-base-content text-xl font-bold">
              Crack
              <span className="bg-gradient-to-br from-[#FF705B] to-[#FFB457] bg-clip-text text-transparent">
                The
              </span>
              Test
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-base-content/80 hover:text-base-content group relative text-sm font-medium transition-colors"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-[#FF705B] to-[#FFB457] transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden items-center space-x-4 md:flex">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={userLogin}
              className="text-base-content/80 hover:text-base-content text-sm font-medium transition-colors"
            >
              Anmelden
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={userLogin}
              className="rounded-xl bg-gradient-to-r from-[#FF705B] to-[#FFB457] px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:shadow-orange-500/25"
            >
              Kostenlos testen
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-base-content/80 hover:bg-base-200 hover:text-base-content rounded-lg p-2 transition-colors md:hidden"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-base-100/95 border-t border-white/10 backdrop-blur-md md:hidden"
          >
            <div className="mx-auto max-w-7xl px-6 py-4">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-base-content/80 hover:text-base-content text-base font-medium transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ))}
                <div className="space-y-3 border-t border-white/10 pt-4">
                  <button
                    onClick={() => {
                      userLogin();
                      setIsMenuOpen(false);
                    }}
                    className="text-base-content/80 hover:text-base-content block w-full text-left text-base font-medium transition-colors"
                  >
                    Anmelden
                  </button>
                  <button
                    onClick={() => {
                      userLogin();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full rounded-xl bg-gradient-to-r from-[#FF705B] to-[#FFB457] px-4 py-3 text-center font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl"
                  >
                    Kostenlos testen
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
