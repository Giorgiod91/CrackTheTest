import { auth } from "~/app/auth";
import { api, HydrateClient } from "~/trpc/server";
import LandingPage from "./_components/LandingPage";
import Navbar from "./_components/Navbar";
import PremiumPreview from "./_components/PremiumPreview";
import Tutorial from "./_components/Tutorial";
import BannerLeft from "./_components/BannerLeft";
import BannerRight from "./_components/BannerRight";
import Price from "./_components/Price";
import AuthorSection from "./_components/AuthorSection";
import Ap1Topics from "./_components/Ap1Topics";
import Faq from "./_components/Faq";
import Footer from "./_components/Footer";
import { SITE } from "@/lib/site";
import { PRICE_EUR } from "@/lib/ap1/topics";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    inLanguage: "de-DE",
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "AP1 Ready Prüfungspaket",
    description:
      "AP1 Prüfungsvorbereitung für Fachinformatiker: alle Themen mit Rechenwegen und Prüfungstipps, Fortschritt pro Thema, Notenprognose und 90-Minuten-Prüfungssimulation.",
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "Offer",
      price: PRICE_EUR.toFixed(2),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/#price`,
    },
  },
];

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="mx-auto flex min-h-screen max-w-[100rem] flex-col gap-5">
        <section className="flex justify-center">
          <Navbar />
        </section>

        <section className="flex min-h-screen justify-center">
          <LandingPage />
        </section>

        <section className="py-16">
          <AuthorSection />
        </section>

        <section id="dashboard-preview" className="py-20">
          <PremiumPreview />
        </section>

        <section id="tutorial" className="">
          <Tutorial />
        </section>

        <section id="themen" className="py-20">
          <Ap1Topics />
        </section>

        <section className="overflow-hidden py-20">
          <div className="flex flex-col gap-8 px-6 lg:px-8">
            <BannerLeft />
            <BannerRight />
          </div>
        </section>

        <section id="price" className="py-20">
          <Price />
        </section>

        <section id="faq" className="py-20">
          <Faq />
        </section>

        <section className="py-20">
          <Footer />
        </section>
      </main>
    </HydrateClient>
  );
}
