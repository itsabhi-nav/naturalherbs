import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import CtaBand from "@/components/CtaBand";
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
      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-leaf/10">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3 text-leaf">
          <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
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
      />

      {/* Business services */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <Reveal className="mb-10 md:mb-14">
            <p className="eyebrow mb-4">Business services</p>
            <h2 className="max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight md:text-5xl">
              What we ship, <span className="gold-text">at scale</span>
            </h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {SOAPNUT_SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1} className="h-full">
                <article className="group h-full overflow-hidden rounded-2xl border border-fern bg-pine transition-colors duration-300 hover:border-gold/50">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <SmartImage
                      src={s.img}
                      alt={s.title}
                      fill
                      sizes="(min-width:768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute right-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-cream">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl font-bold text-cream md:text-2xl">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-sage">{s.copy}</p>
                  </div>
                </article>
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
                <h3 className="mb-4 text-2xl font-bold text-cream md:text-3xl">
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
                    <h4 className="text-xl font-bold text-cream md:text-2xl">{c.title}</h4>
                    <p className="mt-3 text-sm leading-relaxed text-sage">{c.copy}</p>
                    <Link
                      href={`mailto:naturalherbs555@gmail.com?subject=${encodeURIComponent(`COA / MSDS request, ${c.title}`)}`}
                      className="group mt-6 inline-flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-gold transition-colors hover:text-gold-soft"
                    >
                      Contact now
                      <span aria-hidden className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Legacy statement */}
      <section className="flex flex-col items-center gap-8 border-t border-fern bg-moss/60 py-12 md:py-20">
        <p className="eyebrow">Shaping mastery</p>
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-4 text-center">
          {SOAPNUT_LEGACY.map((w) => (
            <span key={w} className="text-2xl font-bold text-cream/80 md:text-4xl">
              {w}
            </span>
          ))}
        </div>
      </section>

      <CtaBand
        title="Bulk soapnuts, delivered right"
        copy="Request a quote, COA or MSDS, we respond within one business day."
      />
    </>
  );
}
