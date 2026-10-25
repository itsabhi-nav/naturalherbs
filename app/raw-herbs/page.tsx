import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import EntryExplorer from "@/components/EntryExplorer";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { RAW_HERBS } from "@/lib/data";
import { SITE_URL, breadcrumb, itemBuilder } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Raw Medicinal Herbs & Powders, Ashwagandha to Bhringraj",
  description:
    "Export of raw medicinal herbs & herbal powders, Ashwagandha, Moringa, Turmeric, Giloy and more, sourced directly from origin. Wholesale Ayurvedic herbs supplier from India.",
  alternates: { canonical: `${SITE_URL}/raw-herbs` },
};

export default function RawHerbsPage() {
  const items = RAW_HERBS.map((h) => ({ name: h.name, sub: h.latin, note: h.copy }));

  return (
    <>
      <JsonLd id="ld-rawherbs-bc" data={breadcrumb([{ name: "Raw Herbs", path: "/raw-herbs" }])} />
      <JsonLd id="ld-rawherbs-list" data={itemBuilder("raw-herbs")} />
      <PageHero
        eyebrow="The Raw Herbs"
        title="Raw medicinal herbs & powders"
        copy="Sourced directly from their place of origin, each batch is carefully selected and exported to ensure lasting freshness, from Ayurvedic classics to modern superfoods."
        img="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2400&auto=format&fit=crop"
      />

      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <EntryExplorer eyebrow="Herbs" items={items} columns="table" />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
