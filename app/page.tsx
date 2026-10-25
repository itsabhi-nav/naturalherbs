import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import TiltCard from "@/components/TiltCard";
import SmartImage from "@/components/SmartImage";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";
import Magnetic from "@/components/Magnetic";
import Aurora from "@/components/Aurora";
import FlagsOrbit from "@/components/FlagsOrbit";
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
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-cream/8 bg-cream/8 md:grid-cols-4">
      {STATS.map((s) => (
        <div key={s.label} className="group relative bg-moss p-5 text-center transition-colors duration-500 hover:bg-pine md:p-9">
          <div className="font-[family-name:var(--font-display)] text-3xl font-medium text-cream md:text-5xl">
            {s.raw ? <span className="gold-text">{s.value}</span> : <Counter value={s.value} suffix={s.suffix} />}
          </div>
          <p className="mt-2 text-[0.58rem] uppercase tracking-[0.25em] text-sage md:text-[0.68rem]">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------- page -------------------------------- */

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Latin-name ticker */}
      <div className="relative z-10 border-y border-cream/8 bg-bark py-6">
        <Marquee />
      </div>

      {/* ------------------------------ ABOUT ------------------------------ */}
      <section className="relative overflow-hidden py-14 md:py-24">
        <Aurora variant="gold" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
            <div>
              <SectionHeading
                eyebrow="About us"
                title={
                  <>
                    Welcome to the <span className="gold-text italic">origin</span> of purity
                  </>
                }
              />
              <Reveal delay={0.2}>
                <p className="mt-7 max-w-lg text-lg leading-relaxed text-sage">
                  Established in 2005 with a noble belief in nature’s healing power, NaturalHerbs Global began
                  as a humble vision to reconnect the world with ancient botanical wisdom.
                </p>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-sage">
                  Today, we stand as a global leader in natural wellness, offering a{" "}
                  <span className="text-cream">regal range of botanical extracts and herbs</span>.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <Magnetic className="mt-9" strength={0.25}>
                  <Link
                    href="/herbal-extracts"
                    className="group inline-flex items-center gap-4 text-sm font-medium uppercase tracking-[0.2em] text-gold-soft"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/40 transition-all duration-300 group-hover:bg-gold/15">
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                    </span>
                    Discover the catalogue
                  </Link>
                </Magnetic>
              </Reveal>
            </div>

            <Reveal delay={0.15} className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-cream/10">
                <SmartImage
                  src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1400&auto=format&fit=crop"
                  alt="Fresh botanical sprout"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[2.5s] ease-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bark/70 via-transparent to-transparent" />
                <div className="glass absolute bottom-5 left-5 right-5 rounded-2xl p-5">
                  <p className="font-[family-name:var(--font-display)] text-xl text-cream">
                    “Ancient botanical wisdom, engineered for modern shelves.”
                  </p>
                </div>
              </div>
              {/* floating badge */}
              <div className="glass absolute left-3 top-3 rounded-2xl px-5 py-3 md:-left-10 md:-top-6 md:px-6 md:py-4">
                <p className="font-[family-name:var(--font-display)] text-3xl text-gold">20<span className="gold-text">+</span></p>
                <p className="text-[0.62rem] uppercase tracking-[0.28em] text-sage">Years of legacy</p>
              </div>
              {/* rotating world reach badge */}
              <FlagsOrbit className="absolute -right-3 top-6 z-10 md:-right-9 md:top-2" />
            </Reveal>
          </div>

          <Reveal delay={0.1} className="mt-12 md:mt-16">
            <StatBlock />
          </Reveal>
        </div>
      </section>

      {/* ---------------------------- PRODUCT LINE ---------------------------- */}
      <section id="product-line" className="relative border-t border-cream/8 bg-moss/60 py-14 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Product line" title={<>Six crafts,<br /><span className="gold-text italic">one root</span></>} />
            <Reveal delay={0.2}>
              <p className="max-w-sm text-sage">
                Every category is cultivated, processed and quality-checked in-house, then exported with
                certification.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCT_LINE.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 0.08}>
                <TiltCard className="h-full">
                  <Link
                    href={p.href}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-cream/8 bg-pine transition-colors duration-500 hover:border-gold/30"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <SmartImage
                        src={p.img}
                        alt={p.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-pine via-pine/30 to-transparent" />
                      <span className="absolute left-4 top-4 flex items-center gap-2 text-[0.58rem] font-medium uppercase tracking-[0.28em] text-cream/85">
                        <span className="h-1 w-6 bg-gold/80" />
                        {p.tag}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5 pt-4 md:p-7 md:pt-5">
                      <h3 className="flex items-start justify-between gap-3 font-[family-name:var(--font-display)] text-xl text-cream transition-colors group-hover:text-gold-soft md:text-2xl">
                        {p.title}
                        {/* refined vector arrow badge: frosted disc, gold hover,
                            arrow nudges outward on hover */}
                        <span
                          aria-hidden
                          className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-cream/12 bg-cream/[0.03] transition-all duration-500 group-hover:border-gold/50 group-hover:bg-gold/10 md:mt-0 md:h-10 md:w-10"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="h-3.5 w-3.5 text-sage transition-all duration-500 group-hover:-translate-y-[1.5px] group-hover:translate-x-[1.5px] group-hover:text-gold md:h-4 md:w-4"
                          >
                            <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-sage md:mt-3">{p.copy}</p>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------- SIGNATURE RANGE --------------------------- */}
      <section className="relative py-14 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeading align="center" eyebrow="Signature range" title={<>The crown <span className="gold-text italic">jewels</span></>} className="mb-16" />

          <div className="space-y-16 md:space-y-24">
            {SIGNATURE_RANGE.map((s, i) => (
              <div
                key={s.title}
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <Reveal className="relative">
                  <div className="relative aspect-[16/11] overflow-hidden rounded-3xl border border-cream/10">
                    <SmartImage
                      src={s.img}
                      alt={s.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[2s] ease-out hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-bark/10" />
                  </div>
                </Reveal>
                <div>
                  <Reveal>
                    <p className="eyebrow mb-4">{s.kicker}</p>
                  </Reveal>
                  <Reveal delay={0.08}>
                    <h3 className="font-[family-name:var(--font-display)] text-4xl leading-tight text-cream md:text-6xl">
                      {s.title.split(" ")[0]}{" "}
                      <span className="gold-text italic">{s.title.split(" ").slice(1).join(" ")}</span>
                    </h3>
                  </Reveal>
                  <Reveal delay={0.16}>
                    <p className="mt-5 max-w-md text-lg leading-relaxed text-sage">{s.copy}</p>
                  </Reveal>
                  <Reveal delay={0.24}>
                    <Link
                      href={s.href}
                      className="group mt-8 inline-flex items-center gap-4 text-sm font-medium uppercase tracking-[0.2em] text-gold-soft"
                    >
                      <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/40 transition-all duration-300 group-hover:bg-gold/15">
                        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
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
      <section className="relative border-t border-cream/8 bg-moss/60 py-14 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeading
            eyebrow="Why choose us?"
            title={
              <>
                Rooted in logic,
                <br />
                <span className="gold-text italic">grown with care</span>
              </>
            }
            className="mb-12 md:mb-16"
          />
          <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-14">
            <div className="relative">
              <Reveal className="lg:sticky lg:top-28">
                <figure className="relative overflow-hidden rounded-3xl border border-cream/8">
                  <div className="relative aspect-[4/3] lg:aspect-[4/5]">
                    <SmartImage
                      src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop"
                      alt="The NaturalHerbs team celebrating a collaboration"
                      fill
                      sizes="(min-width:1024px) 40vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bark/85 via-transparent to-bark/10" />
                  </div>
                  <figcaption className="absolute inset-x-4 bottom-4 rounded-2xl border border-cream/10 bg-bark/70 p-4 backdrop-blur-md md:inset-x-5 md:bottom-5 md:p-5">
                    <p className="font-[family-name:var(--font-display)] text-lg text-cream md:text-xl">
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
                      i < PILLARS.length - 1 ? "border-b border-cream/8" : ""
                    }`}
                  >
                    <span className="w-10 shrink-0 pt-1 font-[family-name:var(--font-display)] text-2xl leading-none text-gold md:w-16 md:text-4xl">
                      {p.n}
                    </span>
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-2xl text-cream md:text-4xl">
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
      <section className="grain relative overflow-hidden py-14 md:py-24">
        <Aurora variant="gold" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-center lg:gap-16">
            <Reveal>
              <figure className="relative mx-auto max-w-md lg:max-w-none">
                <div
                  aria-hidden
                  className="absolute -bottom-4 -right-4 h-full w-full rounded-3xl border border-gold/30 md:-bottom-6 md:-right-6"
                />
                <div className="relative overflow-hidden rounded-3xl border border-cream/10">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src="/rochya.jpg"
                      alt="Rochya Singh, Director of NaturalHerbs"
                      fill
                      sizes="(min-width:1024px) 40vw, 90vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bark/75 via-transparent to-transparent" />
                  </div>
                  <figcaption className="absolute inset-x-4 bottom-4 rounded-2xl border border-cream/10 bg-bark/70 p-4 backdrop-blur-md md:inset-x-5 md:bottom-5">
                    <p className="font-[family-name:var(--font-display)] text-lg text-cream md:text-xl">Rochya Singh</p>
                    <p className="mt-0.5 text-[0.65rem] uppercase tracking-[0.25em] text-gold md:text-xs">
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
                <blockquote className="font-[family-name:var(--font-display)] text-3xl font-medium leading-[1.22] tracking-tight text-cream md:text-[2.5rem] md:leading-[1.2]">
                  {`"${DIRECTOR_QUOTE.split(" ").slice(0, -3).join(" ")} `}
                  <span className="gold-text italic">{`${DIRECTOR_QUOTE.split(" ").slice(-3).join(" ")}"`}</span>
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
                  <span className="border-b border-gold/40 pb-1 text-sm text-cream transition-colors duration-300 group-hover:border-gold md:text-base">
                    Connect with Rochya on LinkedIn
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 text-gold transition-transform duration-300 group-hover:translate-x-1"
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
      <section className="relative border-t border-cream/8 py-14 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Shipments" title={<>Sealed like a <span className="gold-text italic">treasure</span></>} />
            <Reveal delay={0.2}>
              <p className="max-w-sm text-sage">
                Your goods travel first-class, protected, checked and handled by the best in logistics.
              </p>
            </Reveal>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {SHIPMENTS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <article className="group h-full overflow-hidden rounded-3xl border border-cream/8 bg-pine transition-colors duration-500 hover:border-leaf/30">
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
                    <h3 className="font-[family-name:var(--font-display)] text-xl text-cream md:text-2xl">{s.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-sage md:mt-3">{s.copy}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------- ROOTED TRUST ---------------------------- */}
      <section className="relative overflow-hidden border-t border-cream/8 bg-pine/40 py-14 md:py-24">
        <Aurora />
        <div className="relative mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Rooted trust"
                title={
                  <>
                    Worldwide presence,<br /><span className="gold-text italic">world-class trust</span>
                  </>
                }
                copy="NaturalHerbs exports to 80+ countries, serving top global markets with pure, certified botanical ingredients."
              />
              <div className="mt-10 space-y-4">
                {TRUST_BULLETS.map((b, i) => (
                  <Reveal key={b} delay={i * 0.08}>
                    <div className="flex items-center gap-4 rounded-2xl border border-cream/8 bg-bark/40 px-6 py-4 backdrop-blur transition-colors duration-300 hover:border-gold/30">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold/40 text-xs text-gold">
                        ✦
                      </span>
                      <p className="text-cream/90">{b}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            {/* orbiting globe-ish visual */}
            <Reveal delay={0.15} className="relative mx-auto aspect-square w-full max-w-[19rem] md:max-w-md">
              <div className="absolute inset-0 rounded-full border border-cream/10" />
              <div className="absolute inset-[12%] rounded-full border border-dashed border-gold/25" />
              <div className="absolute inset-[26%] rounded-full border border-cream/8" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="glass grid place-items-center rounded-full text-center h-28 w-28 md:h-40 md:w-40">
                  <div>
                    <p className="font-[family-name:var(--font-display)] text-4xl text-gold md:text-5xl"><Counter value={80} suffix="+" /></p>
                    <p className="mt-1 text-[0.55rem] uppercase tracking-[0.3em] text-sage md:text-[0.6rem]">Countries</p>
                  </div>
                </div>
              </div>
              {/* satellites, typographic, not capsules */}
              {[
                { t: "Europe", c: "left-[6%] top-[16%]", d: "0s" },
                { t: "USA", c: "right-[4%] top-[34%]", d: "-4s" },
                { t: "UK", c: "left-[12%] bottom-[14%]", d: "-8s" },
                { t: "Japan", c: "right-[10%] bottom-[8%]", d: "-6s" },
              ].map((s) => (
                <p
                  key={s.t}
                  className={`absolute ${s.c} animate-drift-slow flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.3em] text-cream/85 md:text-[0.68rem]`}
                  style={{ animationDuration: "18s", animationDelay: s.d }}
                >
                  <span className="h-1 w-4 bg-gold/80" />
                  {s.t}
                </p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
