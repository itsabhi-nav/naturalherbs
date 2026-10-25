import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import EntryExplorer from "@/components/EntryExplorer";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { OILS } from "@/lib/data";
import { SITE_URL, breadcrumb, itemBuilder } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Essential & Aromatic Oils, Peppermint to Vetiver",
  description:
    "Essential and aromatic oils, peppermint, sandalwood, vetiver, lavender and more. Pure, potent, distillery-grade for flavour, fragrance and cosmetics, exported worldwide.",
  alternates: { canonical: `${SITE_URL}/oils` },
};

export default function OilsPage() {
  const items = OILS.map((o) => ({ name: o.name, sub: o.latin, note: o.note }));

  return (
    <>
      <JsonLd id="ld-oils-bc" data={breadcrumb([{ name: "Essential Oils", path: "/oils" }])} />
      <JsonLd id="ld-oils-list" data={itemBuilder("oils")} />
      <PageHero
        eyebrow="The Aromatics"
        title="The essential oils"
        copy="We have been enchanting the world with premium oils, pure, potent, and unrivaled in excellence. Essential grades for flavour, fragrance, cosmetics and wellness."
        img="https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2400&auto=format&fit=crop"
      />

      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <EntryExplorer eyebrow="Aromatics" items={items} columns="cards" />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
