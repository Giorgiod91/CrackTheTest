"use client";
import React, { useEffect } from "react";
import Get_ML_Model_Result from "../_components/Get_ML_Model_Result";
import PremiumDahsboard from "../_components/PremiumDahsboard";

import { useState } from "react";
import { supabase } from "../../../utils/supabase/server";
import type { User } from "@supabase/supabase-js";
import CreateDbUser from "../_components/CreateDbUser";
import CreateTest from "../_components/CreateTest";

type Props = {};
export default function PremiumPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 py-10">
      <h1 className="text-7xl">Ready to join the Club?</h1>
      <CreateTest />
    </div>
  );
}
