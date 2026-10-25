"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * One-time cinematic intro: brand mark bleeds in, a counter races to 100,
 * then the whole curtain lifts. Plays once per browser session.
 */
export default function Preloader() {
  const [show, setShow] = useState(false);
  const [pct, setPct] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("nh-intro")) return;
    } catch {
      /* private mode, still show once */
    }
    setShow(true);
    document.documentElement.style.overflow = "hidden";

    const start = performance.now();
    const dur = 1500;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      // ease-out curve so the counter feels physical
      setPct(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else {
        window.setTimeout(() => {
          setShow(false);
          document.documentElement.style.overflow = "";
          try {
            sessionStorage.setItem("nh-intro", "1");
          } catch {
            /* noop */
          }
        }, 250);
      }
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf.current);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.85, ease }}
          className="grain fixed inset-0 z-[200] grid place-items-center bg-bark"
        >
          {/* ambient glow */}
          <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-leaf/10 blur-[110px]" />

          <div className="relative flex flex-col items-center gap-6 px-6 text-center">
            <motion.div
              className="relative h-16 w-16 overflow-hidden rounded-full border border-gold/30 bg-white shadow-[0_0_60px_rgba(201,169,104,0.25)]"
              initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, ease }}
            >
              <Image
                src="/logo-mark.png"
                alt="NaturalHerbs"
                width={64}
                height={64}
                className="h-full w-full object-contain p-1"
                priority
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.15 }}
            >
              <p className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-cream md:text-4xl">
                NaturalHerbs
              </p>
              <p className="mt-2 text-[0.6rem] uppercase tracking-[0.5em] text-gold">From nature, for you</p>
            </motion.div>
          </div>

          {/* counter + hairline progress */}
          <div className="absolute bottom-10 left-1/2 w-[min(420px,72vw)] -translate-x-1/2">
            <div className="mb-3 flex items-end justify-between">
              <span className="text-[0.6rem] uppercase tracking-[0.35em] text-sage">Est. 2005, India</span>
              <span className="font-[family-name:var(--font-display)] text-xl text-gold-soft">{pct}%</span>
            </div>
            <div className="h-px w-full bg-cream/10">
              <div
                className="h-px bg-gradient-to-r from-leaf via-gold to-gold-soft transition-[width] duration-100 ease-linear"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
