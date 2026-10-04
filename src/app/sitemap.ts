import { type MetadataRoute } from "next";
import { TOPICS } from "@/lib/ap1/topics";
import { SITE } from "@/lib/site";

const baseUrl = SITE.url;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/ap1-pruefungsvorbereitung`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/ap1`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...TOPICS.map((t) => ({
      url: `${baseUrl}/ap1/${t.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...["impressum", "datenschutz", "agb", "widerruf"].map((path) => ({
      url: `${baseUrl}/${path}`,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
}
