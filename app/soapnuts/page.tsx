import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import SmartImage from "@/components/SmartImage";
import Marquee from "@/components/Marquee";
import CtaBand from "@/components/CtaBand";
import Magnetic from "@/components/Magnetic";
import JsonLd from "@/components/JsonLd";
import { SOAPNUT_SERVICES, SOAPNUT_CONCENTRATES, SOAPNUT_LEGACY } from "@/lib/data";
import { SITE_URL, breadcrumb, itemBuilder } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Soapnuts Export, Bulk Shells, Liquid Extract & Custom Packing",
  description:
    "Sustainable soapnut solutions powering global businesses since 2005, bulk shells, liquid extracts and custom packing with 90% buyer retention. Leading organic soapnut exporter from India.",
  alternates: { canonical: `${SITE_URL}/soapnuts` },
};

function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm leading-relaxed text-sage">
      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-leaf/40 text-[0.6rem] text-leaf">
        ✦
      </span>
      {children}
    </li>
  );
}

export default function SoapnutsPage() {
  return (
    <>
      <JsonLd id="ld-soapnuts-bc" data={breadcrumb([{ name: "Soapnuts", path: "/soapnuts" }])} />
      <JsonLd id="ld-soapnuts-list" data={itemBuilder("soapnuts")} />
      <PageHero
        eyebrow="Soapnuts Export"
        title="Sustainable soapnut solutions"
        copy="Since 2005 we've been a leading soapnut exporter, delivering best-in-class solutions to bulk clients worldwide, with quality, reliability and customer satisfaction at the core."
        img="https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=2400&auto=format&fit=crop"
      />

      {/* Business services */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <Reveal className="mb-10 md:mb-14">
            <p className="eyebrow mb-4">Business services</p>
            <h2 className="max-w-2xl font-[family-name:var(--font-display)] text-3xl leading-[1.08] tracking-tight md:text-6xl">
              What we ship, <span className="gold-text italic">at scale</span>
            </h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {SOAPNUT_SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <TiltCard className="h-full" max={4}>
                  <article className="group h-full overflow-hidden rounded-3xl border border-cream/8 bg-pine transition-colors duration-500 hover:border-gold/30">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <SmartImage
                        src={s.img}
                        alt={s.title}
                        fill
                        sizes="(min-width:768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-pine via-pine/25 to-transparent" />
                      <span className="absolute right-4 top-4 font-[family-name:var(--font-display)] text-sm text-cream/85">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="p-6 md:p-8">
                      <h3 className="font-[family-name:var(--font-display)] text-2xl text-cream md:text-3xl">
                        {s.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-sage">{s.copy}</p>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About / legacy */}
      <section className="relative border-t border-cream/8 bg-moss/60 py-12 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-10 lg:grid-cols-2 lg:gap-24">
          <div className="space-y-10">
            <Reveal>
              <div>
                <p className="eyebrow mb-4">About us</p>
                <h3 className="mb-4 font-[family-name:var(--font-display)] text-3xl text-cream md:text-4xl">
                  Export of soapnut products
                </h3>
                <p className="leading-relaxed text-sage">
                  We are the largest supplier of soapnuts across the globe from India, highest quality organic
                  certified soapnuts, plus manufacturing of Soapnut Extracts, Reetha, Indian Soapberry,
                  Saponaria, Washnut, Ritha, Aritha, Sapindus mukorossi & Bale Soapnut since 2005.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <p className="eyebrow mb-4">Collaborations, 20 years of legacy</p>
                <p className="leading-relaxed text-sage">
                  A thriving supply chain across Europe, the USA, the United Kingdom and Japan, exporting over{" "}
                  <span className="text-cream">100 tons every year</span> while maintaining a{" "}
                  <span className="text-cream">90% buyer retention rate</span>. We eagerly seek new opportunities to
                  build enduring partnerships.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="space-y-3">
                {["Soapnut Shells", "Soapnut Liquid Extract", "Soapnut Soft Extract", "Soapnut Dry Extract"].map(
                  (p) => (
                    <li key={p} className="flex items-center gap-3 rounded-xl border border-cream/8 bg-bark px-5 py-3 text-sm text-cream/90">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                      {p}
                    </li>
                  )
                )}
              </ul>
            </Reveal>
          </div>

          {/* Concentrates */}
          <div className="space-y-6">
            {SOAPNUT_CONCENTRATES.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.12}>
                <article className="group overflow-hidden rounded-3xl border border-cream/8">
                  <div className="relative h-52 overflow-hidden">
                    <SmartImage
                      src={c.img}
                      alt={c.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[1.8s] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-moss via-transparent to-transparent" />
                    <span className="absolute left-5 top-5 flex items-center gap-2 text-[0.58rem] font-medium uppercase tracking-[0.28em] text-cream/90">
                      <span className="h-1 w-6 bg-gold/80" />
                      COA & MSDS on request
                    </span>
                  </div>
                  <div className="bg-pine p-7">
                    <h4 className="font-[family-name:var(--font-display)] text-2xl text-cream">{c.title}</h4>
                    <p className="mt-3 text-sm leading-relaxed text-sage">{c.copy}</p>
                    <Magnetic strength={0.2} className="mt-6">
                      <Link
                        href={`mailto:naturalherbs555@gmail.com?subject=${encodeURIComponent(`COA / MSDS request, ${c.title}`)}`}
                        className="group inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold-soft transition-colors hover:text-gold"
                      >
                        Contact now
                        <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </Link>
                    </Magnetic>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Legacy marquee */}
      <section className="grain relative flex flex-col items-center gap-8 overflow-hidden py-12 md:py-20">
        <p className="eyebrow">Shaping mastery</p>
        <Marquee words={SOAPNUT_LEGACY} serif className="opacity-90" />
        <Marquee words={[...SOAPNUT_LEGACY].reverse()} serif className="opacity-40 [animation-direction:reverse]" />
      </section>

      <CtaBand
        title="Bulk soapnuts, delivered right"
        copy="Request a quote, COA or MSDS, we respond within one business day."
      />
    </>
  );
}
