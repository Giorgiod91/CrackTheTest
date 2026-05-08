"use client";
import nextDynamic from "next/dynamic";

const SubscriptionClient = nextDynamic(
  () => import("./_subscription-client"),
  { ssr: false },
);

export default function SubscriptionLoader() {
  return <SubscriptionClient />;
}
