"use client";
import React, { useEffect } from "react";
import Get_ML_Model_Result from "../_components/Get_ML_Model_Result";
import PremiumDahsboard from "../_components/PremiumDahsboard";

import { useState } from "react";
import { supabase } from "../../../utils/supabase/server";
import type { User } from "@supabase/supabase-js";

type Props = {};
export default function PremiumPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        window.location.href = "/auth/login";
      } else {
        setUser(data.user);
      }
    });
  }, []);

  if (!user) return <p>Loading...</p>;
  return (
    <div className="flex flex-col items-center justify-center gap-10 py-10">
      <h1 className="text-7xl">Premium</h1>
      <PremiumDahsboard />
    </div>
  );
}
