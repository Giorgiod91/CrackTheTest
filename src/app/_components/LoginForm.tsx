"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Shield, ArrowRight } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

type LoginFormProps = {
  user: User | null;
};
type Mode = "login" | "signup";

export default function LoginForm({ user }: LoginFormProps) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const supabase = getSupabaseBrowserClient();

  // the submit handler
  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setStatus("");

    try {
      if (mode === "signup") {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) {
          setError(signUpError.message);
        } else {
          setStatus("Check your email for the login link!");
        }
      } else {
        const { data, error: signInError } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });
        if (signInError) {
          setError(signInError.message);
        } else {
          // Erfolgreicher Login
          router.push("/PremiumUsers");
          router.refresh();
        }
      }
    } catch (err) {
      setError("Ein Fehler ist aufgetreten");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="from-base-100 to-base-200 flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Shield className="text-primary h-8 w-8" />
            <h1 className="text-3xl font-bold">
              Crack
              <span className="bg-gradient-to-br from-[#FF705B] to-[#FFB457] bg-clip-text text-transparent">
                TheTest
              </span>
            </h1>
          </div>
          <p className="text-base-content/60 text-sm">
            Sicherer Zugang zu deinem Premium-Konto
          </p>
        </div>

        {/* Card */}
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body">
            {/* Security Badge */}
            <div className="bg-success/10 border-success/20 mb-6 flex items-center gap-2 rounded-lg border p-3">
              <Shield className="text-success h-4 w-4" />
              <span className="text-success text-xs font-medium">
                Sichere verschlüsselte Verbindung
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              {/* Email Input */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">E-Mail</span>
                </label>
                <div className="relative">
                  <Mail className="text-base-content/40 absolute top-3.5 left-3 h-5 w-5" />
                  <input
                    type="email"
                    placeholder="deine@email.de"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input input-bordered focus:ring-primary w-full pl-10 focus:border-transparent focus:ring-2 focus:outline-none"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">Passwort</span>
                </label>
                <div className="relative">
                  <Lock className="text-base-content/40 absolute top-3.5 left-3 h-5 w-5" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input input-bordered focus:ring-primary w-full pl-10 focus:border-transparent focus:ring-2 focus:outline-none"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="alert alert-error rounded-lg p-3">
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-block mt-2 gap-2 font-medium"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    Wird angemeldet...
                  </>
                ) : (
                  <>
                    Login
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="divider my-2"></div>

              {/* Signup Link */}

              <p className="text-base-content/60 text-center text-sm">
                {mode === "login" ? (
                  <>
                    Noch kein Account?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("signup")}
                      className="link link-primary font-medium"
                    >
                      Hier registrieren
                    </button>
                  </>
                ) : (
                  <>
                    Bereits registriert?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("login")}
                      className="link link-primary font-medium"
                    >
                      Zum Login
                    </button>
                  </>
                )}
              </p>
            </form>
          </div>
        </div>

        {/* Security Info Footer */}
        <div className="text-base-content/50 mt-6 space-y-1 text-center text-xs">
          <p>🔒 Daten werden verschlüsselt übertragen</p>
          <p>✓ SSL/TLS Sicherheit</p>
        </div>
      </div>
    </div>
  );
}
