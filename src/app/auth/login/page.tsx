import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import LoginForm from "../../_components/LoginForm";

export default async function LoginPage() {
  // initialize supabase client
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <LoginForm user={user} />;
}
