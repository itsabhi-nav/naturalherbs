"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BRAND } from "@/lib/data";
import SmartImage from "./SmartImage";
import Marquee from "./Marquee";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Editorial light hero: strong typography on a warm canvas, a framed
 * botanical visual with a product inset, and the botanical index pinned
 * to the bottom of the first screen so it is visible on load.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <section
      ref={ref}
      className="relative flex flex-col overflow-hidden bg-gradient-to-b from-moss/80 via-bark to-bark lg:min-h-[100svh]"
    >
      {/* soft botanical wash — depth without noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_85%_10%,rgba(46,107,69,0.10),transparent_65%),radial-gradient(ellipse_50%_40%_at_0%_100%,rgba(46,107,69,0.06),transparent_70%)]"
      />
      {/* botanical sprig watermark */}
      <svg
        aria-hidden
        viewBox="0 0 320 320"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        className="pointer-events-none absolute -left-16 -top-12 h-[17rem] w-[17rem] text-gold opacity-[0.08] md:-left-20 md:-top-14 md:h-[22rem] md:w-[22rem] md:opacity-[0.09] lg:h-[34rem] lg:w-[34rem]"
        style={{
          maskImage: "linear-gradient(to bottom, #000 55%, transparent 96%)",
          WebkitMaskImage: "linear-gradient(to bottom, #000 55%, transparent 96%)",
        }}
      >
        <path d="M160 300c0-60-4-118-28-172C114 92 92 62 60 34" />
        <path d="M132 128c-30-8-56-30-66-62 32 8 56 30 66 62Z" />
        <path d="M142 176c-32-2-62-20-78-48 34 4 62 22 78 48Z" />
        <path d="M150 228c-28 2-56-10-76-34 30-2 58 10 76 34Z" />
        <path d="M146 104c28-14 48-38 54-68-30 10-50 36-54 68Z" />
        <path d="M152 152c30-8 54-28 66-58-32 4-58 26-66 58Z" />
        <path d="M158 204c28-4 52-22 64-50-30 2-56 22-64 50Z" />
      </svg>

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pt-24 md:px-10 md:pt-32">
        <div className="grid flex-1 items-start gap-9 py-7 md:items-center md:gap-14 md:py-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          {/* ---------------- text ---------------- */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.1 }}
              className="eyebrow mb-5 md:mb-6"
            >
              NaturalHerbs Global · Estd 2005
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
              className="max-w-2xl text-[clamp(2.35rem,6vw,5rem)] font-bold leading-[1.05] tracking-tight"
            >
              From{" "}
              <span className="relative inline-block">
                <span aria-hidden className="absolute inset-x-0 bottom-1.5 -z-10 h-[0.28em] bg-gold/20" />
                nature
              </span>
              ,<br />
              for you.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.35 }}
              className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-sage md:mt-6 md:text-lg"
            >
              Authentic herbal solutions for ultimate wellness. Botanical extracts, raw herbs and oils,
              shipped worldwide with certified purity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.5 }}
              className="mt-8 flex flex-wrap gap-4 md:mt-9"
            >
              <a
                href="#product-line"
                className="inline-flex items-center gap-3 rounded-full bg-gold px-6 py-3 text-sm font-bold text-white shadow-[0_12px_28px_-12px_rgba(46,107,69,0.55)] transition-colors duration-200 hover:bg-gold-soft md:px-8 md:py-3.5"
              >
                Explore the range
                <span aria-hidden>→</span>
              </a>
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-cream/25 bg-pine px-6 py-3 text-sm font-bold text-cream transition-colors duration-200 hover:border-gold hover:text-gold md:px-8 md:py-3.5"
              >
                Talk to us
              </a>
            </motion.div>
          </div>

          {/* ---------------- visual ---------------- */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease, delay: 0.3 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            {/* offset frame accent behind the photo */}
            <div
              aria-hidden
              className="absolute -right-4 -top-4 hidden h-full w-full rounded-2xl border border-gold/30 md:block"
            />
            <div className="relative h-[220px] overflow-hidden rounded-2xl border border-fern shadow-[0_24px_60px_-30px_rgba(30,43,34,0.35)] sm:h-[310px] lg:h-[clamp(340px,46vh,500px)]">
              <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
                <SmartImage
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1600&auto=format&fit=crop"
                  alt="Deep green forest with soft light"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </motion.div>
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
            <div className="glass absolute right-3 top-3 rounded-lg px-3 py-2 shadow-[0_12px_30px_-15px_rgba(30,43,34,0.3)] md:right-4 md:top-4 md:rounded-xl md:px-4 md:py-3">
              <p className="text-[0.72rem] font-bold text-cream md:text-sm">Certified &amp; lab-tested</p>
              <p className="mt-0.5 text-[0.55rem] font-bold uppercase tracking-[0.14em] text-sage md:text-[0.62rem]">
                COA with every batch
              </p>
            </div>
          </motion.div>
        </div>

        {/* botanical index — pinned to the bottom of the first screen */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="border-t border-fern"
        >
          <div className="flex items-center gap-7">
            <p className="hidden shrink-0 py-4 text-[0.6rem] font-bold uppercase tracking-[0.22em] text-gold md:block md:py-5">
              Botanical index
            </p>
            <span aria-hidden className="hidden h-4 w-px shrink-0 bg-fern md:block" />
            <div className="ticker-mask relative min-w-0 flex-1 overflow-hidden py-4 md:py-5">
              <Marquee />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
