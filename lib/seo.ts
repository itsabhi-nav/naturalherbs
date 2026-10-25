/* ------------------------------------------------------------------ */
/*  SEO core, structured data (schema.org) + shared constants          */
/* ------------------------------------------------------------------ */

import { EXTRACTS, RAW_HERBS, OILS, SOAPNUT_CONCENTRATES, BRAND } from "./data";

export const SITE_URL = "https://natural-herbs.in";
export const SITE_NAME = "NaturalHerbs India";

type Json = Record<string, unknown>;

/** Render any schema graph as safe JSON. */
export function toJsonLd(data: Json | Json[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/* ------------------------- site-wide graph ------------------------- */

export function siteGraph(): Json[] {
  const elo = "https://schema.org";

  return [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: BRAND.name,
      alternateName: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.jpg`,
        width: 1375,
        height: 632,
      },
      slogan: BRAND.tagline,
      foundingDate: "2005",
      sameAs: BRAND.socials.map((s) => s.href),
      address: {
        "@type": "PostalAddress",
        streetAddress: "C-9 Dayal Bagh, Dayal Bagh Colony",
        addressLocality: "Faridabad",
        addressRegion: "Haryana",
        postalCode: "121004",
        addressCountry: "IN",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-8285330983",
          contactType: "sales",
          email: BRAND.email,
          areaServed: "Worldwide",
          availableLanguage: ["English", "Hindi"],
        },
        {
          "@type": "ContactPoint",
          telephone: "+1-437-577-7874",
          contactType: "customer support",
          email: BRAND.emailCanada,
          areaServed: ["CA", "US"],
          availableLanguage: "English",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description:
        "Botanical extracts, raw herbs, soapnuts, henna and essential oils, exported to 80+ countries since 2005.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
      copyrightYear: new Date().getFullYear(),
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#hq-india`,
      name: "NaturalHerbs, India Headquarters",
      image: `${SITE_URL}/logo.jpg`,
      url: SITE_URL,
      telephone: "+91-8285330983",
      email: BRAND.email,
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      address: {
        "@type": "PostalAddress",
        streetAddress: "C-9 Dayal Bagh, Dayal Bagh Colony",
        addressLocality: "Faridabad",
        addressRegion: "Haryana",
        postalCode: "121004",
        addressCountry: "IN",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#office-canada`,
      name: "NaturalHerbs, Canada Office",
      image: `${SITE_URL}/logo.jpg`,
      url: SITE_URL,
      telephone: "+1-437-577-7874",
      email: BRAND.emailCanada,
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      address: {
        "@type": "PostalAddress",
        streetAddress: "205 Dolph St North",
        addressLocality: "Cambridge",
        addressRegion: "Ontario",
        postalCode: "N3H 2A6",
        addressCountry: "CA",
      },
    },
    // product collection landing points (strong sitelink targets)
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/#collections`,
      name: "Herbal product catalog",
      url: SITE_URL,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      hasPart: [
        `${SITE_URL}/herbal-extracts`,
        `${SITE_URL}/raw-herbs`,
        `${SITE_URL}/oils`,
        `${SITE_URL}/soapnuts`,
        `${SITE_URL}/henna`,
      ].map((u) => ({ "@type": "WebPage", url: u })),
    },
  ];
}

/* --------------------------- breadcrumbs --------------------------- */

export function breadcrumb(items: Array<{ name: string; path: string }>): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      ...items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: it.name,
        item: `${SITE_URL}${it.path}`,
      })),
    ],
  };
}

/* ----------------------- product ItemLists ------------------------- */

function listItems(names: string[], path: string) {
  return names.map((name, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Product",
      name,
      category: path.split("/").filter(Boolean).pop() as string,
      url: `${SITE_URL}${path}`,
      brand: { "@type": "Brand", name: BRAND.name },
      manufacturer: { "@id": `${SITE_URL}/#organization` },
    },
  }));
}

export function itemBuilder(page: "extracts" | "raw-herbs" | "oils" | "soapnuts"): Json {
  const maps = {
    extracts: {
      path: "/herbal-extracts",
      name: "Botanical Extracts Catalog",
      names: EXTRACTS.map((e) => `${e.name} Extract`),
    },
    "raw-herbs": {
      path: "/raw-herbs",
      name: "Raw Herbs Catalog",
      names: RAW_HERBS.map((h) => h.name),
    },
    oils: {
      path: "/oils",
      name: "Essential Oils Catalog",
      names: OILS.map((o) => o.name),
    },
    soapnuts: {
      path: "/soapnuts",
      name: "Soapnut Product Catalog",
      names: SOAPNUT_CONCENTRATES.map((c) => c.title),
    },
  } as const;
  const m = maps[page];
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: m.name,
    url: `${SITE_URL}${m.path}`,
    numberOfItems: m.names.length,
    itemListElement: listItems(m.names, m.path),
  };
}

/* -------------------- shared SEO description copy ------------------- */

export const SEO_SUMMARY =
  "Authentic herbal solutions for ultimate wellness. Botanical extracts, raw herbs, soapnuts, henna and essential oils, exported to 80+ countries since 2005.";
