import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, breadcrumb } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Henna & Indigo Powder Export, Natural Hair Colour",
  description:
    "Herbal henna with deep, long-lasting colour, conditioning, strengthening, chemical-free. Plus premium Indigo powder exported to renowned brands worldwide, natural hair dye supplier India.",
  alternates: { canonical: `${SITE_URL}/henna` },
};

const HENNA_FEATURES = [
  { t: "Deep, long-lasting colour", c: "Rich release that holds wash after wash." },
  { t: "Conditions the scalp", c: "A natural conditioner with every application." },
  { t: "Strengthens hair", c: "Hair feels thicker, smoother, resilient." },
  { t: "Prevents dandruff", c: "Botanical care that keeps flakes away." },
  { t: "100% natural", c: "Zero chemicals, safe, pure application." },
];

export default function HennaPage() {
  return (
    <>
      <JsonLd id="ld-henna-bc" data={breadcrumb([{ name: "Henna & Indigo", path: "/henna" }])} />
      <PageHero
        eyebrow="Henna"
        title="Herbal henna & indigo"
        copy="NaturalHerbs herbal henna offers deep, long-lasting colour while conditioning the scalp, strengthening hair and preventing dandruff, crafted with 100% natural ingredients for safe, chemical-free application."
      />

      {/* Henna panel */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <figure className="overflow-hidden rounded-2xl border border-fern bg-pine">
                <div className="relative aspect-[4/3]">
                  <SmartImage
                    src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1400&auto=format&fit=crop"
                    alt="Herbal henna leaves"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="flex items-center justify-between gap-4 border-t border-fern p-5">
                  <div>
                    <p className="font-bold text-cream">Lawsonia inermis</p>
                    <p className="mt-0.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-sage">
                      Natural henna, premium grade
                    </p>
                  </div>
                  <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold/10 text-gold">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
                      <path d="M12 3c-3.5 2-6 4.5-6 8a6 6 0 0 0 12 0c0-3.5-2.5-6-6-8Z" strokeLinejoin="round" />
                    </svg>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
            <div>
              <SectionHeading eyebrow="Herbal henna" title={<>Nature's <span className="gold-text">hair dye</span></>} />
              <div className="mt-10 space-y-3">
                {HENNA_FEATURES.map((f, i) => (
                  <Reveal key={f.t} delay={i * 0.07}>
                    <div className="group flex items-start gap-4 rounded-xl border border-fern bg-pine px-6 py-4 transition-colors duration-200 hover:border-gold/50">
                      <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/10">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3 text-gold">
                          <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <div>
                        <p className="font-bold text-cream">{f.t}</p>
                        <p className="text-sm text-sage">{f.c}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Indigo panel */}
      <section className="relative border-t border-cream/8 bg-moss/60 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="order-2 lg:order-1">
              <SectionHeading eyebrow="Indigo" title={<>The <span className="gold-text">pioneer</span> of deep blue</>} />
              <Reveal delay={0.2}>
                <p className="mt-7 max-w-lg text-lg leading-relaxed text-sage">
                  NaturalHerbs is the ultimate pioneer in exporting the highest quality Indigo Powder to renowned
                  brands worldwide, with an unmatched commitment to purity and deep, long-lasting colour.
                </p>
              </Reveal>
              <Reveal delay={0.28}>
                <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {["Indigofera tinctoria", "Single-origin crop", "Stone-ground purity"].map((b) => (
                    <div key={b} className="rounded-2xl border border-cream/8 bg-bark px-5 py-4 text-sm text-cream/90">
                      {b}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
            <Reveal className="order-1 lg:order-2">
              <figure className="overflow-hidden rounded-2xl border border-fern bg-pine">
                <div className="relative aspect-[4/3]">
                  <SmartImage
                    src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1400&auto=format&fit=crop"
                    alt="Indigo powder"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="flex items-center justify-between gap-4 border-t border-fern p-5">
                  <div>
                    <p className="font-bold text-cream">Indigofera tinctoria</p>
                    <p className="mt-0.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-sage">
                      Indigo powder, export grade
                    </p>
                  </div>
                  <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold/10 text-gold">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
                      <path d="M12 3c-3.5 2-6 4.5-6 8a6 6 0 0 0 12 0c0-3.5-2.5-6-6-8Z" strokeLinejoin="round" />
                    </svg>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand title="Ask for a henna sample" copy="Bulk packs, private labelling and export documentation, all available." />
    </>
  );
}
