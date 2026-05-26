import { Suspense } from "react";
import TestPracticeClient from "./_test-practice-client";

export default function TestPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-[#1a1835]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-400 border-t-transparent" />
      </div>
    }>
      <TestPracticeClient testId={params.id} />
    </Suspense>
  );
}
