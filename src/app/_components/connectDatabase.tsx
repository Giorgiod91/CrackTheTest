import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yoqaywxcpimzcawxyade.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY || "";
if (!supabaseKey) {
  throw new Error("SUPABASE_KEY is not defined in the environment variables.");
}
const supabase = createClient(supabaseUrl, supabaseKey);
