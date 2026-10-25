import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "NaturalHerbs",
    description:
      "Botanical extracts, raw herbs, soapnuts, henna and essential oils, exported to 80+ countries since 2005.",
    start_url: "/",
    display: "standalone",
    background_color: "#04100b",
    theme_color: "#04100b",
    lang: "en",
    categories: ["business", "health"],
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
