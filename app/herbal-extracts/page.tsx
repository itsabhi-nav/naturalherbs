import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import EntryExplorer from "@/components/EntryExplorer";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { EXTRACTS } from "@/lib/data";
import { SITE_URL, breadcrumb, itemBuilder } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Botanical & Herbal Extracts, 60+ Standardized Actives",
  description:
    "Powder & liquid botanical extracts, 60+ standardized actives from Ashwagandha to Zingiber, backed by full certifications. Wholesale manufacturer and exporter from India.",
  alternates: { canonical: `${SITE_URL}/herbal-extracts` },
};

export default function HerbalExtractsPage() {
  const items = EXTRACTS.map((e) => ({ name: e.name, sub: e.actives, note: e.benefit }));

  return (
    <>
      <JsonLd id="ld-extracts-bc" data={breadcrumb([{ name: "Herbal Extracts", path: "/herbal-extracts" }])} />
      <JsonLd id="ld-extracts-list" data={itemBuilder("extracts")} />
      <PageHero
        eyebrow="The Herbal Extracts"
        title="Powder & liquid botanical extracts"
        copy="Sixty-plus standardized botanical extracts, every batch backed by essential certifications for quality and compliance, ready for formulations worldwide."
        img="https://images.unsplash.com/photo-1506368249639-73a05d6f6488?q=80&w=2400&auto=format&fit=crop"
      />

      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <EntryExplorer eyebrow="Extracts" items={items} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
