import { BRAND } from "@/lib/data";
import SmartImage from "./SmartImage";

/**
 * Editorial light hero: strong typography on a warm canvas, with the
 * botanical photo presented as a framed visual on the right.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-moss/80 via-bark to-bark">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 pb-20 pt-32 md:px-10 md:pb-28 md:pt-40 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        {/* ---------------- text ---------------- */}
        <div>
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-gold" aria-hidden />
            Estd 2005, NaturalHerbs Global
          </p>

          <h1 className="max-w-2xl text-[clamp(2.7rem,6vw,5rem)] font-bold leading-[1.05] tracking-tight">
            From <span className="text-gold">nature</span>,<br />
            for you.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-sage md:text-lg">
            Authentic herbal solutions for ultimate wellness. Botanical extracts, raw herbs, oils and
            cosmeceuticals, exported to 80+ countries with certified purity.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#product-line"
              className="inline-flex items-center gap-3 rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_28px_-12px_rgba(46,107,69,0.55)] transition-colors duration-200 hover:bg-gold-soft md:px-8"
            >
              Explore the range
              <span aria-hidden>→</span>
            </a>
            <a
              href={BRAND.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-cream/25 bg-pine px-7 py-3.5 text-sm font-bold text-cream transition-colors duration-200 hover:border-gold hover:text-gold md:px-8"
            >
              Talk to us
            </a>
          </div>

          {/* stats row */}
          <div className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-fern pt-7">
            <div>
              <p className="text-2xl font-bold text-cream md:text-3xl">80+</p>
              <p className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-sage">
                Countries
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-cream md:text-3xl">20+</p>
              <p className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-sage">
                Years
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-cream md:text-3xl">90%</p>
              <p className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-sage">
                Buyer retention
              </p>
            </div>
          </div>
        </div>

        {/* ---------------- visual ---------------- */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* offset frame accent behind the photo */}
          <div
            aria-hidden
            className="absolute -right-4 -top-4 hidden h-full w-full rounded-2xl border border-gold/30 md:block"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-fern shadow-[0_24px_60px_-30px_rgba(30,43,34,0.35)]">
            <SmartImage
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1600&auto=format&fit=crop"
              alt="Deep green forest with soft light"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
          {/* floating chip */}
          <div className="glass absolute -bottom-6 left-6 rounded-xl px-5 py-3.5 shadow-[0_12px_30px_-15px_rgba(30,43,34,0.3)]">
            <p className="text-sm font-bold text-cream">Certified &amp; lab-tested</p>
            <p className="mt-0.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-sage">
              COA with every batch
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
