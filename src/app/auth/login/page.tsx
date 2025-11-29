"use client";

import { useState } from "react";
import { supabase } from "../../../../utils/supabase/server";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: any) {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    // redirect to premium page
    window.location.href = "/premium";
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <input
        className="border p-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-500">{error}</p>}

      <button type="submit" className="rounded bg-blue-600 py-2 text-white">
        Login
      </button>
    </form>
  );
}
