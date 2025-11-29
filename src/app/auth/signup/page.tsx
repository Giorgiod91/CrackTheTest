"use client";

import { useState } from "react";
import { supabase } from "../../../../utils/supabase/server";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSignup(e: any) {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) return setError(error.message);

    window.location.href = "/auth/login";
  }

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-4">
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

      <button className="rounded bg-green-600 py-2 text-white">Sign Up</button>
    </form>
  );
}
