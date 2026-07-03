import { type MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/PremiumUsers", "/ManageSubscription", "/auth", "/api"],
    },
    sitemap: "https://crack-the-test.vercel.app/sitemap.xml",
  };
}
