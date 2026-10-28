"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/** Clean light header for interior pages — text only, no banner image. */
export default function PageHero({
  eyebrow,
  title,
  copy,
  children,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-fern bg-moss/60">
      <div className="mx-auto w-full max-w-7xl px-5 pb-6 pt-32 md:px-10 md:pb-8 md:pt-40">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.05 }}
          className="eyebrow mb-5 flex items-center gap-2 text-[0.7rem]"
        >
          <Link href="/" className="transition-colors hover:text-gold-soft">
            Home
          </Link>
          <span className="text-sage/50">/</span>
          {eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.12 }}
          className="mb-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl"
        >
          {title}
        </motion.h1>

        {copy && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.25 }}
            className="max-w-2xl text-base leading-relaxed text-sage md:text-lg"
          >
            {copy}
          </motion.p>
        )}
        {children}
      </div>
    </section>
  );
}
