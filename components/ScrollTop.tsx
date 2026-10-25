"use client";

import { useEffect, useState } from "react";

/**
 * Floating scroll-to-top, bottom-right. Appears softly once the page
 * has moved past the first viewport, scrolls straight home on tap.
 */
export default function ScrollTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-5 z-[80] grid h-14 w-14 place-items-center rounded-full border border-cream/15 bg-bark/85 text-cream shadow-[0_12px_34px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-500 hover:border-gold/50 hover:text-gold md:right-6 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
        <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
