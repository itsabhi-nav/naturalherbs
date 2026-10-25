"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Aurora from "./Aurora";
import SmartImage from "./SmartImage";

const ease = [0.22, 1, 0.36, 1] as const;

/** Compact cinematic header for interior pages. */
export default function PageHero({
  eyebrow,
  title,
  copy,
  img,
  children,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  img?: string;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="grain relative flex min-h-[58svh] items-end overflow-hidden pb-14 pt-36 md:min-h-[68svh]">
      {img && (
        <motion.div style={{ y: imgY }} className="absolute inset-0 -z-10 h-[125%]">
          <SmartImage src={img} alt={title} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-bark/80 via-bark/60 to-bark" />
        </motion.div>
      )}
      {!img && <Aurora />}
      <div className="grain absolute inset-0 z-0 hidden md:block" aria-hidden />

      <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
          className="eyebrow mb-5 flex items-center gap-3"
        >
          <Link href="/" className="transition-colors hover:text-gold-soft">
            Home
          </Link>
          <span className="text-cream/30">/</span>
          {eyebrow}
        </motion.p>

        <h1 className="mb-6 max-w-4xl font-[family-name:var(--font-display)] text-4xl font-medium leading-[1.04] tracking-tight md:text-8xl">
          {title.split(" ").map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
              <motion.span
                className={`inline-block ${i % 3 === 1 ? "gold-text italic" : ""}`}
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.25 + i * 0.06 }}
              >
                {w}
              </motion.span>
              {i < title.split(" ").length - 1 && <span>&nbsp;</span>}
            </span>
          ))}
        </h1>

        {copy && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.55 }}
            className="max-w-2xl text-base leading-relaxed text-sage md:text-lg"
          >
            {copy}
          </motion.p>
        )}
        {children}
      </motion.div>

      {/* soft bottom fade into the page */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-bark to-transparent" />
    </section>
  );
}
