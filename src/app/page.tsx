import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import LandingPage from "./_components/LandingPage";
import Navbar from "./_components/Navbar";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col gap-5 pr-20 pl-20">
        <Navbar />
        <section className="flex min-h-screen w-full justify-center">
          <LandingPage />
        </section>
      </main>
    </HydrateClient>
  );
}
