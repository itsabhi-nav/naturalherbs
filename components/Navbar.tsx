"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS, BRAND } from "@/lib/data";
import { Logo } from "./Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-[90] border-b transition-all duration-500 ${
          scrolled
            ? "border-cream/10 bg-bark/85 shadow-[0_8px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 md:px-10">
          <Logo />

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.filter((l) => l.label !== "Contact").map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative text-[0.78rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
                    active ? "text-gold-soft" : "text-cream/70 hover:text-cream"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-300 ${
                      active ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="rounded-full border border-gold/40 bg-gold/10 px-5 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-gold-soft transition-all duration-300 hover:bg-gold/25"
            >
              Contact
            </Link>
          </nav>

          {/* burger */}
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="relative z-[100] grid h-11 w-11 place-items-center rounded-full border border-cream/15 lg:hidden"
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 top-0 h-px w-full bg-cream transition-all duration-300 ${
                  open ? "top-1/2 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-px w-full bg-cream transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 bottom-0 h-px w-full bg-cream transition-all duration-300 ${
                  open ? "bottom-[calc(50%-1px)] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </motion.header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 90% 6%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 90% 6%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 90% 6%)" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[80] flex flex-col overflow-y-auto bg-moss/98 px-6 pb-8 pt-24 backdrop-blur-xl md:px-8"
            onClick={() => setOpen(false)}
          >
            <nav
              className="flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.45, ease: "easeOut" }}
                >
                  <Link
                    href={l.href}
                    className={`group flex items-center justify-between py-3.5 transition-colors ${
                      i === NAV_LINKS.length - 1 ? "" : "border-b border-cream/[0.07]"
                    }`}
                  >
                    <span
                      className={`font-[family-name:var(--font-display)] text-[1.45rem] leading-snug transition-colors duration-300 group-active:text-gold-soft ${
                        pathname === l.href ? "gold-text" : "text-cream"
                      }`}
                    >
                      {l.label}
                    </span>
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="h-3.5 w-3.5 shrink-0 text-gold/50"
                    >
                      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-8 space-y-1 text-xs text-sage"
            >
              <p className="eyebrow text-[0.58rem]">Talk to us</p>
              <a href={BRAND.phoneIndiaHref} className="block font-medium text-cream">
                {BRAND.phoneIndia}
              </a>
              <a href={`mailto:${BRAND.email}`} className="block break-all text-cream/85">
                {BRAND.email}
              </a>
              <p className="pt-2.5 text-[0.64rem] leading-relaxed text-sage/60">{BRAND.addressIndia}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
