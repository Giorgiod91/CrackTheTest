import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// function to get environment variables with error handling

function getEnvVariable() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase env vars missing: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
    );
  }

  return { supabaseUrl, supabaseAnonKey };
}

export async function createSupabaseServerClient() {
  const { supabaseUrl, supabaseAnonKey } = getEnvVariable();
  const cookieStore = await cookies();
  // create will return a configured superbase client that can communicate with the backend(auth supabase)
  // pass 3 things to it: url, anon key, cookies handlers
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      // read all the cookies from the request
      getAll() {
        return cookieStore.getAll();
      },
      // update those cookies
      setAll(cookiesToSet: any[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set({ name, value, ...options });
          });
        } catch (error) {
          console.error("Error setting cookies:", error);
        }
      },
    },
  });
}
