import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import LandingPage from "./_components/LandingPage";
import Navbar from "./_components/Navbar";
import Tutorial from "./_components/Tutorial";
import BannerContent from "./_components/BannerContent";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="mx-auto flex min-h-screen max-w-[100rem] flex-col gap-5">
        <section className="flex justify-center">
          <Navbar />
        </section>

        <section className="flex min-h-screen justify-center">
          <LandingPage />
        </section>
        <section id="tutorial">
          {" "}
          <Tutorial />
        </section>
        <section>
          <div className="bg-base-200 grid h-[140px] w-full grid-cols-2 border-2">
            <div className="flex">
              <BannerContent />
            </div>
          </div>
        </section>
        <section></section>
      </main>
    </HydrateClient>
  );
}
