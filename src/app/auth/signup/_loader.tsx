"use client";
import nextDynamic from "next/dynamic";

const SignupForm = nextDynamic(() => import("./_signup-form"), { ssr: false });

export default function SignupLoader() {
  return <SignupForm />;
}
