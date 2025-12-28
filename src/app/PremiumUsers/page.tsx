"use client";
import React, { use, useEffect, useState } from "react";

import PremiumDahsboard from "../_components/PremiumDahsboard";
import { LifeBuoy, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { AuthClient, type User } from "@supabase/supabase-js";
import CreateDbUser from "../_components/CreateDbUser";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

export default function PremiumPage() {
  const [member, setMember] = useState<string>("");
  const [premiumdata, setPremiumdata] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [showFeedbackPopup, setShowFeedbackPopup] = useState<boolean>(false);

  // i will create a deplay to show a popou for the feedback buttont and with a timeout to hide it after 10 seconds
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowFeedbackPopup(true);
    }, 3000);

    const hideTimer = setTimeout(() => {
      setShowFeedbackPopup(false);
    }, 10000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);
  // const [user, setUser] = useState<User | null>(null);
  /*
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        window.location.href = "/auth/login";
      } else {
        setUser(data.user);
      }
    });
  }, []); */
  // initialize supabase client
  const supabase = getSupabaseBrowserClient();
  // initialize  router
  const router = useRouter();

  // this function i fetch the User data then i set it to the members state to display the name on the screen
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (!user) {
        return;
      }

      const { data, error: fetchError } = await supabase
        .from("users")
        .select("*")
        .eq("real_member_id", user.id)
        .maybeSingle();

      if (fetchError) {
        console.error("Error fetching user data:", fetchError);
        return;
      }
      setUsername(data?.username ?? "");

      console.log("Fetched user data:", data);
      setPremiumdata(data?.premium ?? false);
    };
    fetchUser();
  }, [router]);

  //  function to logout the user

  async function handleLogout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/auth/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero */}
      <div className="mx-auto max-w-7xl p-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FF705B] via-[#FF8C73] to-[#FFB457] p-10 text-white shadow-2xl">
          <div className="absolute -top-20 -right-20 h-64 w-64 animate-pulse rounded-full bg-white/20 opacity-40 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 opacity-30 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="flex-1">
              <h1 className="text-4xl leading-tight font-extrabold md:text-5xl lg:text-6xl">
                Welcome back,{" "}
                <span className="text-white drop-shadow-lg">
                  {username || "Guest"}
                </span>{" "}
                👋
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed opacity-95">
                It is time to create amazing tests with AI assistance and unlock
                your full potential!
              </p>
              {showFeedbackPopup && (
                <div className="animate-fade-in ml-45 pt-5">
                  <span className="rounded-full bg-white/20 px-4 py-2 text-sm text-white shadow-lg backdrop-blur-sm">
                    Give us your feedback!
                  </span>
                </div>
              )}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="/ManageSubscription"
                  className="btn border-white/30 bg-white/20 text-white shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/30"
                >
                  💳 Manage subscription
                </a>

                <a
                  href="/premium/feedback"
                  className="btn btn-ghost text-white transition-all hover:scale-105 hover:bg-white/10"
                >
                  📄 Feedback
                </a>
                <a className="btn btn-ghost text-white transition-all hover:scale-105 hover:bg-white/10">
                  📚 Docs
                </a>

                <button
                  onClick={handleLogout}
                  className="btn border-white/30 bg-white/20 text-white shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/30"
                >
                  🚪 Logout
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="group relative overflow-hidden rounded-2xl bg-white/15 p-5 text-center text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="text-xs font-medium tracking-wider uppercase opacity-90">
                    Premium Status
                  </div>
                  {premiumdata === true ? (
                    <div className="mt-2 flex items-center justify-center gap-1 text-2xl font-bold">
                      <span className="text-green-400 drop-shadow-lg">✓</span>
                      <span className="text-green-300">Active</span>
                    </div>
                  ) : (
                    <div className="mt-2 flex items-center justify-center gap-1 text-2xl font-bold">
                      <span className="text-red-400 drop-shadow-lg">✗</span>
                      <span className="text-red-300">Inactive</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl bg-white/15 p-5 text-center text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="text-xs font-medium tracking-wider uppercase opacity-90">
                    Next billing
                  </div>
                  <div className="mt-2 text-2xl font-bold drop-shadow-lg">
                    Jan 12, 2026
                  </div>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl bg-white/15 p-5 text-center text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="text-xs font-medium tracking-wider uppercase opacity-90">
                    Priority replies
                  </div>
                  <div className="mt-2 text-2xl font-bold drop-shadow-lg">
                    ~1h ⚡
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits for Premium members */}
        <div id="plans" className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
            <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-gradient-to-br from-[#FF705B]/10 to-transparent"></div>
            <div className="relative flex items-start gap-4">
              <div className="rounded-full bg-gradient-to-br from-[#FF705B] to-[#FFB457] p-3 shadow-md">
                <Check className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  🧠 AI Assistance
                </div>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  Generate, analyze, and optimize tests. The ML model predicts
                  the difficulty
                </p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
            <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-gradient-to-br from-blue-500/10 to-transparent"></div>
            <div className="relative flex items-start gap-4">
              <div className="rounded-full bg-gradient-to-br from-blue-500 to-blue-600 p-3 shadow-md">
                <Check className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  🚀 Priority Support
                </div>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  Fast response from our support team and dedicated help when
                  needed.
                </p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
            <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-gradient-to-br from-purple-500/10 to-transparent"></div>
            <div className="relative flex items-start gap-4">
              <div className="rounded-full bg-gradient-to-br from-purple-500 to-purple-600 p-3 shadow-md">
                <Check className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  👥 Export
                </div>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  Export tests in PDF format for easy sharing and printing.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard container */}
        <div className="mt-8">
          <div className="rounded-3xl border border-gray-200 bg-white p-1 shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
            {premiumdata === true ? (
              <PremiumDahsboard />
            ) : (
              <div className="flex flex-col items-center justify-center gap-6 p-16 text-center">
                <div className="rounded-full bg-gradient-to-br from-[#FF705B] to-[#FFB457] p-6 shadow-2xl">
                  <svg
                    className="h-16 w-16 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="bg-gradient-to-r from-[#FF705B] to-[#FFB457] bg-clip-text text-3xl font-bold text-transparent">
                    Premium Access Required
                  </h1>
                  <p className="text-muted-foreground mt-2 text-lg">
                    Unlock the full dashboard experience with premium features
                  </p>
                </div>
                <button
                  onClick={() => router.push("/ManageSubscription")}
                  className="btn btn-lg border-none bg-gradient-to-r from-[#FF705B] to-[#FFB457] text-white shadow-xl transition-transform hover:scale-110"
                >
                  🚀 Upgrade to Premium
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Support floating button */}
        <a
          href="mailto:support@crackthetest.example"
          className="fixed right-6 bottom-6 z-50 hidden items-center gap-3 rounded-full border-2 border-[#FF705B]/20 bg-white px-6 py-3 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-[#FF705B] hover:shadow-[0_0_30px_rgba(255,112,91,0.3)] md:flex dark:bg-gray-800"
        >
          <LifeBuoy className="h-5 w-5 animate-pulse text-[#FF705B]" />
          <span className="font-bold text-gray-800 dark:text-gray-100">
            Support
          </span>
        </a>
      </div>
    </div>
  );
}
