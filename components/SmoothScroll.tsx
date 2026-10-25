"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Buttery inertial scrolling (Lenis) on desktop only.
 * On touch devices native scroll is left completely alone, phones get
 * zero scroll interference, no third-party raf loop, no jank possible.
 * Also handles in-page anchors on desktop.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return; // phones: native

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1.02,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -80 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
