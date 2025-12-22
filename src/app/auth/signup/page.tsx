"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Shield, ArrowRight } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setStatus("");

    if (password !== confirmPassword) {
      setError("Passwörter stimmen nicht überein.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Passwort muss mindestens 6 Zeichen lang sein.");
      setLoading(false);
      return;
    }

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      // hier drekt die user data nehmen damit ich gleich in der users tabelle einen eintrag machen kann
      const user = data.user;
      if (!user) {
        setError("User konnte nicht erstellt werden.");
        setLoading(false);
        return;
      }

      // hier erfolgt der eintrag damit ich speat premium hanbdlen kann
      const { error: insertError } = await supabase.from("users").insert([
        {
          email,
          username,
          real_member_id: user.id,
          premium: false,
        },
      ]);

      if (insertError) {
        setError("Fehler beim Erstellen des User-Profils.");
        setLoading(false);
        return;
      }

      setStatus(
        "✅ Registrierung erfolgreich! Prüfe deine E-Mails für die Bestätigung.",
      );

      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("Ein Fehler ist aufgetreten. Bitte versuche es erneut.");
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
            Erstelle dein sicheres Premium-Konto
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
            <form onSubmit={handleSignup} className="flex flex-col gap-4">
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
                  <input
                    type="text"
                    placeholder="name weahlen"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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

              {/* Confirm Password Input */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium">
                    Passwort bestätigen
                  </span>
                </label>
                <div className="relative">
                  <Lock className="text-base-content/40 absolute top-3.5 left-3 h-5 w-5" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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

              {/* Success Message */}
              {status && (
                <div className="alert alert-success rounded-lg p-3">
                  <span className="text-sm">{status}</span>
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
                    Account wird erstellt...
                  </>
                ) : (
                  <>
                    Registrieren
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="divider my-2"></div>

              {/* Login Link */}
              <p className="text-base-content/60 text-center text-sm">
                Bereits registriert?{" "}
                <a href="/auth/login" className="link link-primary font-medium">
                  Hier anmelden
                </a>
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
