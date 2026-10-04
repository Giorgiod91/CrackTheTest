import { Suspense } from "react";
import { notFound } from "next/navigation";
import { isTopicSlug } from "@/lib/ap1/topics";
import PracticeClient from "./_practice-client";

export default async function PracticePage({
  params,
}: {
  params: Promise<{ thema: string }>;
}) {
  const { thema } = await params;
  if (!isTopicSlug(thema)) notFound();

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#1a1835]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-400 border-t-transparent" />
        </div>
      }
    >
      <PracticeClient topic={thema} />
    </Suspense>
  );
}
