import Link from "next/link";
import { BRAND } from "@/lib/data";
import SmartImage from "./SmartImage";

const SUPPLY_LINKS = [
  { label: "Herbal Extracts", href: "/herbal-extracts" },
  { label: "Raw Herbs", href: "/raw-herbs" },
  { label: "Essential Oils", href: "/oils" },
  { label: "Soapnuts", href: "/soapnuts" },
  { label: "Henna & Indigo", href: "/henna" },
];

/**
 * Editorial light hero: strong typography on a warm canvas, a framed
 * botanical visual with a product inset, and a compact supply strip.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-moss/80 via-bark to-bark">
      <div className="mx-auto w-full max-w-7xl px-5 pt-32 md:px-10 md:pt-40">
        <div className="grid items-center gap-14 pb-20 md:pb-24 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          {/* ---------------- text ---------------- */}
          <div>
            <p className="eyebrow mb-6">NaturalHerbs Global · Estd 2005</p>

            <h1 className="max-w-2xl text-[clamp(2.8rem,6.5vw,5.4rem)] font-bold leading-[1.04] tracking-tight">
              From{" "}
              <span className="relative inline-block">
                <span aria-hidden className="absolute inset-x-0 bottom-1.5 -z-10 h-[0.28em] bg-gold/20" />
                nature
              </span>
              ,<br />
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

            {/* product inset — adds depth and shows the actual goods */}
            <div className="absolute -bottom-8 -left-4 hidden w-36 overflow-hidden rounded-xl border-4 border-bark shadow-[0_18px_40px_-20px_rgba(30,43,34,0.45)] md:block lg:-left-8 lg:w-44">
              <div className="relative aspect-square">
                <SmartImage
                  src="https://images.unsplash.com/photo-1506368249639-73a05d6f6488?q=80&w=600&auto=format&fit=crop"
                  alt="Botanical powders and extracts"
                  fill
                  sizes="176px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* floating chip */}
            <div className="glass absolute right-4 top-4 rounded-xl px-4 py-3 shadow-[0_12px_30px_-15px_rgba(30,43,34,0.3)]">
              <p className="text-sm font-bold text-cream">Certified &amp; lab-tested</p>
              <p className="mt-0.5 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-sage">
                COA with every batch
              </p>
            </div>
          </div>
        </div>

        {/* supply strip — grounds the hero and gives it purpose */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-fern py-6">
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-sage">
            What we supply
          </span>
          {SUPPLY_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group inline-flex items-center gap-1.5 text-sm font-bold text-cream transition-colors hover:text-gold"
            >
              {l.label}
              <span
                aria-hidden
                className="text-xs text-sage transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-gold"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
