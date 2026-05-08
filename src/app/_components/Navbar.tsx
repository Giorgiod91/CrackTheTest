"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const userLogin = () => {
    router.push("/auth/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-base-200 bg-base-100/80 backdrop-blur-md">
      <div className="navbar mx-auto max-w-7xl px-4">
        {/* Logo */}
        <div className="flex-1">
          <a className="btn btn-ghost text-xl font-bold">
            Crack
            <span className="bg-gradient-to-br from-[#FF705B] to-[#FFB457] bg-clip-text text-transparent">
              TheTest
            </span>
          </a>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-2 sm:flex">
          <a href="#price" className="btn btn-ghost btn-sm">
            Preis
          </a>
          <button
            onClick={userLogin}
            className="btn btn-sm bg-gradient-to-br from-[#FF705B] to-[#FFB457] font-semibold text-white shadow-md hover:brightness-110"
          >
            Login
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="btn btn-ghost btn-sm sm:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Menü öffnen"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="border-t border-base-200 bg-base-100 px-4 py-3 sm:hidden">
          <ul className="flex flex-col gap-2">
            <li>
              <a
                href="#price"
                className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-base-200"
                onClick={() => setMenuOpen(false)}
              >
                Preis
              </a>
            </li>
            <li>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  userLogin();
                }}
                className="btn btn-sm w-full bg-gradient-to-br from-[#FF705B] to-[#FFB457] font-semibold text-white"
              >
                Login
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Navbar;
