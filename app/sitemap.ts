import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const fmt = (priority: number, changeFrequency: "daily" | "weekly" | "monthly" | "yearly") => ({
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    { url: SITE_URL, ...fmt(1, "weekly") },
    { url: `${SITE_URL}/herbal-extracts`, ...fmt(0.9, "weekly") },
    { url: `${SITE_URL}/raw-herbs`, ...fmt(0.9, "weekly") },
    { url: `${SITE_URL}/oils`, ...fmt(0.9, "weekly") },
    { url: `${SITE_URL}/soapnuts`, ...fmt(0.9, "weekly") },
    { url: `${SITE_URL}/henna`, ...fmt(0.8, "monthly") },
    { url: `${SITE_URL}/contact`, ...fmt(0.8, "monthly") },
    { url: `${SITE_URL}/terms-conditions`, ...fmt(0.3, "yearly") },
  ];
}
