import { Suspense } from "react";
import TestPracticeClient from "./_test-practice-client";

export default async function TestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#1a1835]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-400 border-t-transparent" />
        </div>
      }
    >
      <TestPracticeClient testId={id} />
    </Suspense>
  );
}
