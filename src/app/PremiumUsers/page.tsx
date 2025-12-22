"use client";
import React, { useEffect, useState } from "react";
import Get_ML_Model_Result from "../_components/Get_ML_Model_Result";
import PremiumDahsboard from "../_components/PremiumDahsboard";
import { LifeBuoy, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { AuthClient, type User } from "@supabase/supabase-js";
import CreateDbUser from "../_components/CreateDbUser";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

type Props = {};
export default function PremiumPage() {
  const [member, setMember] = useState<string>("");
  const [premiumdata, setPremiumdata] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
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
      const { data: premiumData, error: fetchError } = await supabase
        .from("users")
        .select("*")
        .eq("real_member_id", user?.id)
        .single();

      if (fetchError) {
        console.error("Error fetching premium data:", fetchError);
      } else {
        setPremiumdata(premiumData?.premium || false);
        setUsername(premiumData.username);
      }
    };
    fetchUser();
  }, []);

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

  //if (!user) return <p>Loading...</p>;
  const currentPlan = "Pro";

  return (
    <div className="w-full">
      {/* Hero */}
      <div className="mx-auto max-w-7xl p-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#FF705B] to-[#FFB457] p-8 text-white shadow-lg">
          <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-white/20 opacity-30 blur-3xl" />
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h1 className="text-4xl font-extrabold md:text-5xl">
                Welcome back, {member}
              </h1>
              <p className="mt-2 max-w-xl text-lg opacity-90">
                You have access to advanced AI models, priority support and team
                features — everything you need to build faster and smarter.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <a href="/premium/manage" className="btn btn-neutral btn-sm">
                  Manage subscription
                </a>
                <a href="/premium/billing" className="btn btn-ghost btn-sm">
                  Billing
                </a>
                <a className="btn btn-ghost btn-sm">Docs</a>

                <button
                  onClick={handleLogout}
                  className="btn btn-neutral btn-sm"
                >
                  Logout
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-44 rounded-xl bg-white/10 p-4 text-center text-white">
                <div className="text-sm opacity-80">Next billing</div>
                <div className="mt-1 text-xl font-bold">Jan 12, 2026</div>
              </div>
              <div className="w-44 rounded-xl bg-white/10 p-4 text-center text-white">
                <div className="text-sm opacity-80">Priority replies</div>
                <div className="mt-1 text-xl font-bold">~1h</div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits for Premium members */}
        <div id="plans" className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="bg-base-100 flex items-start gap-3 rounded-lg border p-6 transition hover:shadow-lg">
            <Check className="mt-1 h-6 w-6 text-[#FF705B]" />
            <div>
              <div className="text-lg font-semibold">Advanced Models</div>
              <p className="text-muted-foreground mt-1 text-sm">
                Access to tuned ML prompts and generation settings for higher
                quality outputs.
              </p>
            </div>
          </div>

          <div className="bg-base-100 flex items-start gap-3 rounded-lg border p-6 transition hover:shadow-lg">
            <Check className="mt-1 h-6 w-6 text-[#FF705B]" />
            <div>
              <div className="text-lg font-semibold">Priority Support</div>
              <p className="text-muted-foreground mt-1 text-sm">
                Fast response from our support team and dedicated help when
                needed.
              </p>
            </div>
          </div>

          <div className="bg-base-100 flex items-start gap-3 rounded-lg border p-6 transition hover:shadow-lg">
            <Check className="mt-1 h-6 w-6 text-[#FF705B]" />
            <div>
              <div className="text-lg font-semibold">Export & Team</div>
              <p className="text-muted-foreground mt-1 text-sm">
                Export data, manage users, and collaborate with your team
                seamlessly.
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard container */}
        <div className="mt-8">
          <div className="bg-base-100 rounded-xl border p-4 shadow transition hover:shadow-lg">
            <PremiumDahsboard />
          </div>
        </div>

        {/* Support floating button */}
        <a
          href="mailto:support@crackthetest.example"
          className="fixed right-6 bottom-6 z-50 hidden items-center gap-3 rounded-full border bg-white px-4 py-2 shadow-lg transition hover:shadow-2xl md:flex"
        >
          <LifeBuoy className="text-[#FF705B]" />
          <span className="font-medium">Support</span>
        </a>
      </div>
    </div>
  );
}
