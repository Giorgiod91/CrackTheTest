"use client";
import nextDynamic from "next/dynamic";

const PremiumPageClient = nextDynamic(() => import("./_premium-client"), {
  ssr: false,
});

export default function PremiumLoader() {
  return <PremiumPageClient />;
}
