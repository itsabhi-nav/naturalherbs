import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";
import {
  BRAND,
  STATS,
  PRODUCT_LINE,
  SIGNATURE_RANGE,
  PILLARS,
  SHIPMENTS,
  TRUST_BULLETS,
  DIRECTOR_QUOTE,
  DIRECTOR_PARA,
} from "@/lib/data";

/* ---------------------------- reuse pieces ---------------------------- */

function StatBlock() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-fern bg-fern md:grid-cols-4">
      {STATS.map((s) => (
        <div key={s.label} className="bg-pine p-6 text-center md:p-9">
          <div className="text-3xl font-bold text-cream md:text-4xl">
            {s.raw ? <span className="gold-text">{s.value}</span> : <span>{s.value.toLocaleString()}{s.suffix}</span>}
          </div>
          <p className="mt-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-sage md:text-[0.7rem]">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------- page -------------------------------- */

/* key export markets, shown as clean tags */
const MARKETS = ["USA", "Canada", "Europe", "United Kingdom", "Japan", "UAE", "Australia", "Southeast Asia"];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ------------------------------ ABOUT ------------------------------ */}
      <section className="relative py-14 md:py-24">
        <div className="relative mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
            <div>
              <SectionHeading
                eyebrow="About us"
                title={
                  <>
                    Welcome to the <span className="gold-text">origin</span> of purity
                  </>
                }
              />
              <Reveal delay={0.2}>
                <p className="mt-7 max-w-lg text-lg leading-relaxed text-sage">
                  Established in 2005 with a noble belief in nature's healing power, NaturalHerbs Global began
                  as a humble vision to reconnect the world with ancient botanical wisdom.
                </p>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-sage">
                  Today, we stand as a global leader in natural wellness, offering a{" "}
                  <span className="font-bold text-cream">regal range of botanical extracts and herbs</span>.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <Link
                  href="/herbal-extracts"
                  className="group mt-9 inline-flex items-center gap-4 text-sm font-bold uppercase tracking-[0.14em] text-gold"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/40 transition-colors duration-200 group-hover:bg-gold/10">
                    <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </span>
                  Discover the catalogue
                </Link>
              </Reveal>
            </div>

            <Reveal delay={0.15} className="relative lg:order-first">
              <figure className="overflow-hidden rounded-2xl border border-fern bg-pine shadow-[0_24px_60px_-35px_rgba(30,43,34,0.35)]">
                <div className="relative aspect-[4/3]">
                  <SmartImage
                    src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1400&auto=format&fit=crop"
                    alt="Fresh botanical sprout"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="flex items-start gap-4 p-5 md:p-6">
                  <span aria-hidden className="mt-1 h-8 w-1 shrink-0 rounded-full bg-gold/60" />
                  <div>
                    <p className="text-base font-bold leading-snug text-cream md:text-lg">
                      "Ancient botanical wisdom, engineered for modern shelves."
                    </p>
                    <p className="mt-2 flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-sage">
                      <span className="text-gold">20+</span> years of legacy
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="mt-12 md:mt-16">
            <StatBlock />
          </Reveal>
        </div>
      </section>

      {/* ---------------------------- PRODUCT LINE ---------------------------- */}
      <section id="product-line" className="border-t border-fern bg-moss/60 py-14 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Product line" title={<>Six crafts,<br /><span className="gold-text">one root</span></>} />
            <Reveal delay={0.2}>
              <p className="max-w-sm text-sage">
                Every category is cultivated, processed and quality-checked in-house, then exported with
                certification.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCT_LINE.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 0.08} className="h-full">
                <Link
                  href={p.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-fern bg-pine transition-colors duration-300 hover:border-gold/50"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <SmartImage
                      src={p.img}
                      alt={p.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="flex items-start justify-between gap-3 text-xl font-bold text-cream transition-colors group-hover:text-gold md:text-2xl">
                      {p.title}
                      <span
                        aria-hidden
                        className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-fern transition-colors duration-200 group-hover:border-gold/50 md:mt-0 md:h-10 md:w-10"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="h-3.5 w-3.5 text-sage transition-all duration-200 group-hover:-translate-y-[1.5px] group-hover:translate-x-[1.5px] group-hover:text-gold md:h-4 md:w-4"
                        >
                          <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-sage md:mt-3">{p.copy}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------- SIGNATURE RANGE --------------------------- */}
      <section className="py-14 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeading align="center" eyebrow="Signature range" title={<>The crown <span className="gold-text">jewels</span></>} className="mb-16" />

          <div className="space-y-16 md:space-y-24">
            {SIGNATURE_RANGE.map((s, i) => (
              <div
                key={s.title}
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <Reveal className="relative">
                  <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-fern">
                    <SmartImage
                      src={s.img}
                      alt={s.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </Reveal>
                <div>
                  <Reveal>
                    <p className="eyebrow mb-4">{s.kicker}</p>
                  </Reveal>
                  <Reveal delay={0.08}>
                    <h3 className="text-3xl font-bold leading-tight text-cream md:text-5xl">
                      {s.title}
                    </h3>
                  </Reveal>
                  <Reveal delay={0.16}>
                    <p className="mt-5 max-w-md text-lg leading-relaxed text-sage">{s.copy}</p>
                  </Reveal>
                  <Reveal delay={0.24}>
                    <Link
                      href={s.href}
                      className="group mt-8 inline-flex items-center gap-4 text-sm font-bold uppercase tracking-[0.14em] text-gold"
                    >
                      <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/40 transition-colors duration-200 group-hover:bg-gold/10">
                        <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                      </span>
                      Explore {s.title.toLowerCase()}
                    </Link>
                  </Reveal>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------- WHY CHOOSE US ---------------------------- */}
      <section className="border-t border-fern bg-moss/60 py-14 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeading
            eyebrow="Why choose us?"
            title={
              <>
                Rooted in logic,
                <br />
                <span className="gold-text">grown with care</span>
              </>
            }
            className="mb-12 md:mb-16"
          />
          <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-14">
            <div className="relative">
              <Reveal className="lg:sticky lg:top-28">
                <figure className="relative overflow-hidden rounded-2xl border border-fern">
                  <div className="relative aspect-[4/3] lg:aspect-[4/5]">
                    <SmartImage
                      src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop"
                      alt="The NaturalHerbs team celebrating a collaboration"
                      fill
                      sizes="(min-width:1024px) 40vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="border-t border-fern bg-pine p-5">
                    <p className="text-lg font-bold text-cream md:text-xl">
                      Every order is personal to us
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-sage md:text-sm">
                      Precision, care and flexibility in every partnership we build.
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            </div>
            <div>
              {PILLARS.map((p, i) => (
                <Reveal key={p.n} delay={i * 0.08}>
                  <div
                    className={`flex gap-5 py-7 md:gap-8 md:py-10 ${
                      i < PILLARS.length - 1 ? "border-b border-fern" : ""
                    }`}
                  >
                    <span className="w-10 shrink-0 pt-1 text-2xl font-bold leading-none text-gold md:w-16 md:text-4xl">
                      {p.n}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-cream md:text-3xl">
                        {p.title}
                      </h3>
                      <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-sage md:mt-4 md:text-base">{p.copy}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------- DIRECTOR ---------------------------- */}
      <section className="py-14 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-center lg:gap-16">
            <Reveal>
              <figure className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative overflow-hidden rounded-2xl border border-fern">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src="/rochya.jpg"
                      alt="Rochya Singh, Director of NaturalHerbs"
                      fill
                      sizes="(min-width:1024px) 40vw, 90vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="border-t border-fern bg-pine p-5">
                    <p className="text-lg font-bold text-cream md:text-xl">Rochya Singh</p>
                    <p className="mt-0.5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-gold md:text-xs">
                      Director, NaturalHerbs Global
                    </p>
                  </figcaption>
                </div>
              </figure>
            </Reveal>
            <div>
              <Reveal>
                <p className="eyebrow mb-6 md:mb-8">From the Director</p>
              </Reveal>
              <Reveal delay={0.08}>
                <blockquote className="text-2xl font-bold leading-[1.25] tracking-tight text-cream md:text-4xl">
                  {`"${DIRECTOR_QUOTE}"`}
                </blockquote>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-6 max-w-2xl text-sm leading-relaxed text-sage md:mt-8 md:text-base">{DIRECTOR_PARA}</p>
              </Reveal>
              <Reveal delay={0.24}>
                <a
                  href={BRAND.socials.find((s) => s.label === "LinkedIn")?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 inline-flex items-center gap-3"
                >
                  <span className="border-b border-gold/40 pb-1 text-sm font-bold text-cream transition-colors duration-200 group-hover:border-gold md:text-base">
                    Connect with Rochya on LinkedIn
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 text-gold transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------- SHIPMENTS ---------------------------- */}
      <section className="border-t border-fern py-14 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Shipments" title={<>Sealed like a <span className="gold-text">treasure</span></>} />
            <Reveal delay={0.2}>
              <p className="max-w-sm text-sage">
                Your goods travel first-class, protected, checked and handled by the best in logistics.
              </p>
            </Reveal>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {SHIPMENTS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1} className="h-full">
                <article className="group h-full overflow-hidden rounded-2xl border border-fern bg-pine transition-colors duration-300 hover:border-leaf/60">
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
                    <h3 className="text-xl font-bold text-cream md:text-2xl">{s.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-sage md:mt-3">{s.copy}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------- ROOTED TRUST ---------------------------- */}
      <section className="border-t border-fern bg-moss/60 py-14 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Rooted trust"
                title={
                  <>
                    Worldwide presence,<br /><span className="gold-text">world-class trust</span>
                  </>
                }
                copy="NaturalHerbs exports to 80+ countries, serving top global markets with pure, certified botanical ingredients."
              />
              <div className="mt-10 space-y-4">
                {TRUST_BULLETS.map((b, i) => (
                  <Reveal key={b} delay={i * 0.08}>
                    <div className="flex items-center gap-4 rounded-xl border border-fern bg-pine px-6 py-4 transition-colors duration-200 hover:border-gold/50">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold/10">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 text-gold">
                          <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <p className="text-cream/90">{b}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            {/* export markets panel */}
            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-fern bg-pine p-8 md:p-12">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-sage">
                  Key export markets
                </p>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {MARKETS.map((m) => (
                    <span
                      key={m}
                      className="rounded-full border border-fern bg-moss/70 px-4 py-2 text-sm font-medium text-cream"
                    >
                      {m}
                    </span>
                  ))}
                </div>
                <p className="mt-8 border-t border-fern pt-6 text-sm leading-relaxed text-sage">
                  Serving importers, formulators and private-label brands across five continents, with
                  documentation and compliance support on every shipment.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
