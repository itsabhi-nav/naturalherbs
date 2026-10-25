"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Aurora from "./Aurora";
import SmartImage from "./SmartImage";
import Magnetic from "./Magnetic";
import { BRAND } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;
const LINE_1 = ["From", "nature,"];
const LINE_2 = ["for", "you."];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const word = (w: string, i: number) => (
    <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
      <motion.span
        className={`inline-block ${w === "nature," || w === "you." ? "gold-text italic" : ""}`}
        initial={{ y: "115%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease, delay: 0.35 + i * 0.09 }}
      >
        {w}
      </motion.span>
      <span>&nbsp;</span>
    </span>
  );

  return (
    <section ref={ref} className="grain relative flex min-h-[84svh] items-center overflow-hidden md:min-h-[100svh]">
      {/* botanical backdrop with parallax */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 -z-10 h-[115%]">
        <SmartImage
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2400&auto=format&fit=crop"
          alt="Deep green forest with soft light"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-bark/78" />
        <div className="absolute inset-0 bg-gradient-to-b from-bark/40 via-transparent to-bark" />
      </motion.div>
      <Aurora />

      <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-24 md:px-10 md:pt-28">
        {/* ESTD, typographic line, no capsule */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className="eyebrow mb-6 flex items-center gap-4 md:mb-7 md:gap-5"
        >
          <span className="h-px w-8 bg-gold/70 md:w-12" />
          Estd 2005, NaturalHerbs Global
        </motion.p>

        <h1 className="max-w-5xl font-[family-name:var(--font-display)] text-[clamp(2.9rem,10vw,8.5rem)] font-medium leading-[0.98] tracking-tight">
          <span className="block">{LINE_1.map((w, i) => word(w, i))}</span>
          <span className="block">{LINE_2.map((w, i) => word(w, LINE_1.length + i))}</span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.9 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-sage md:mt-7 md:text-xl"
        >
          Authentic herbal solutions for ultimate wellness. Botanical extracts, raw herbs, oils
          and cosmeceuticals, exported to{" "}
          <span className="text-cream">80+ countries</span> with certified purity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 1.05 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Magnetic>
            <a
              href="#product-line"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-cream px-5 py-3 md:px-8 md:py-4 text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-bark transition-transform duration-300 hover:-translate-y-0.5"
            >
              Explore the range
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-gold-soft via-gold to-gold-soft transition-transform duration-500 group-hover:translate-x-0"
              />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={BRAND.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-cream/20 px-5 py-3 md:px-8 md:py-4 text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-cream/90 backdrop-blur transition-all duration-300 hover:border-gold/60 hover:text-gold-soft"
            >
              Talk to us
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[0.6rem] uppercase tracking-[0.4em] text-sage/70">Scroll</span>
          <div className="h-12 w-px overflow-hidden bg-cream/15">
            <motion.div
              className="h-5 w-px bg-gold"
              animate={{ y: [-20, 48] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
