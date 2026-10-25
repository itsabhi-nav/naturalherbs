"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Gold reading-progress hairline pinned to the top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[100] h-[2px] origin-left bg-gradient-to-r from-leaf via-gold to-gold-soft"
      style={{ scaleX }}
    />
  );
}
