import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import LandingPage from "./_components/LandingPage";
import Navbar from "./_components/Navbar";
import Tutorial from "./_components/Tutorial";
import BannerContent from "./_components/BannerContent";

import Forfun from "./_components/Forfun";
import BannerLeft from "./_components/BannerLeft";
import BannerRight from "./_components/BannerRight";
import Price from "./_components/Price";
import Compare from "./_components/Compare";
import MachineLearning from "./_components/MachineLearning";
import Companies from "./_components/Companies";

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

        <section id="tutorial" className="">
          {" "}
          <Tutorial />
        </section>
        <section className="">
          <div className="flex h-180 flex-col space-y-10">
            {" "}
            <BannerLeft />
            <BannerRight />
          </div>
        </section>
        <section className="h-screen">
          <MachineLearning />
        </section>
        <section>
          <Companies />
        </section>
      </main>
    </HydrateClient>
  );
}
