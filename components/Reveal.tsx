"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-triggered reveal, rebuilt for phones:
 *  - server renders content FULLY VISIBLE (no framer initial-hidden SSR),
 *    so there is never a blank page before hydration
 *  - after mount, only elements sitting below the viewport get pre-hidden
 *    one frame, then a tiny IntersectionObserver fades them in with plain
 *    CSS transitions (GPU cheap, no framer on the hot path)
 *  - reduced-motion users just see plain content
 * Props are dropped-in compatible with the old framer Reveal.
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
  const ref = useRef<HTMLElement | null>(null);
  const Tag = as as React.ElementType;

  useEffect(() => {
    const el = ref.current as HTMLElement | null;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // only elements still below the viewport actually need a reveal
    if (el.getBoundingClientRect().top > window.innerHeight * 0.92) {
      el.classList.add("rv-hidden");
      el.style.setProperty("--rvd", `${Math.round(delay * 1000)}ms`);

      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            const el = e.target as HTMLElement;
            if (e.isIntersecting || e.boundingClientRect.bottom < 0) {
              // visible now, or the user already scrolled past it: show
              // instantly, never trap fast-scrolled content in a ghost hide
              el.dataset.rvShow = "";
              io.unobserve(el);
            }
          }
        },
        { rootMargin: "0px 0px -10% 0px" }
      );
      io.observe(el);
      return () => io.disconnect();
    }
  }, [delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
