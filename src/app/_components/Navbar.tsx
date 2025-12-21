"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, User, Settings, Menu, BookOpen, Sparkles } from "lucide-react";

function Navbar() {
  const router = useRouter();

  /// function to login so the user will get pushed to auth login

  const userLogin = () => {
    router.push("/auth/login");
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">
          Crack{" "}
          <span className="bg-gradient-to-br from-[#FF705B] to-[#FFB457] bg-clip-text text-transparent">
            TheTest
          </span>{" "}
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>
              {" "}
              <button onClick={(e) => userLogin()}>Login</button>
            </a>
          </li>
          <li>
            <details>
              <summary>Info</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li>
                  <a href="#price">Preis</a>
                </li>
                <li>
                  <a>AI</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
