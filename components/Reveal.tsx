"use client";

import { motion, type Variants } from "framer-motion";

const FINE = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

/**
 * Scroll-triggered reveal wrapper: fade + rise (+ de-blur on desktop).
 * On touch devices we skip the blur filter, it is costly on phone GPUs
 * and causes the "freeze for a second" feel on cheaper phones.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const variants: Variants = {
    hidden: FINE()
      ? { opacity: 0, y: 28, filter: "blur(6px)" }
      : { opacity: 0, y: 18 },
    show: (d: number = 0) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, delay: d, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px" }}
      custom={delay}
    >
      {children}
    </Comp>
  );
}
