"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
      <header
        className={`fixed inset-x-0 top-0 z-[90] border-b transition-all duration-300 ${
          scrolled || open
            ? "border-fern bg-bark/90 shadow-[0_1px_20px_rgba(30,43,34,0.06)] backdrop-blur-lg"
            : "border-transparent bg-transparent"
        }`}
      >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-3 md:px-10">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.filter((l) => l.label !== "Contact").map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative py-1 text-[0.82rem] font-medium tracking-[0.06em] transition-colors duration-200 ${
                  active ? "text-gold" : "text-cream/75 hover:text-cream"
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-0.5 bg-gold transition-all duration-300 ${
                    active ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="rounded-full bg-gold px-5 py-2.5 text-[0.82rem] font-bold text-white transition-colors duration-200 hover:bg-gold-soft"
          >
            Contact
          </Link>
        </nav>

        {/* burger */}
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-[100] grid h-11 w-11 place-items-center rounded-full border border-fern bg-pine lg:hidden"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-full bg-cream transition-all duration-300 ${
                open ? "top-1/2 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-0.5 w-full bg-cream transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 bottom-0 h-0.5 w-full bg-cream transition-all duration-300 ${
                open ? "bottom-[calc(50%-2px)] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      </header>

      {/* Full-screen mobile menu — sibling of <header> so the header's
          backdrop-blur can't collapse its fixed positioning */}
      {open && (
        <div className="fixed inset-x-0 bottom-0 top-[61px] z-[80] overflow-y-auto border-t border-fern bg-bark px-6 pb-10 pt-6 md:px-8 lg:hidden">
          <nav className="flex flex-col">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`flex items-center justify-between border-b border-fern py-4 text-lg font-bold transition-colors ${
                  pathname === l.href ? "text-gold" : "text-cream"
                }`}
              >
                {l.label}
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-3.5 w-3.5 shrink-0 text-sage"
                >
                  <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            ))}
          </nav>
          <div className="mt-8 space-y-1 text-sm text-sage">
            <p className="eyebrow mb-3 text-[0.65rem]">Talk to us</p>
            <a href={BRAND.phoneIndiaHref} className="block font-medium text-cream">
              {BRAND.phoneIndia}
            </a>
            <a href={`mailto:${BRAND.email}`} className="block break-all text-cream/85">
              {BRAND.email}
            </a>
            <p className="pt-2.5 text-xs leading-relaxed text-sage">{BRAND.addressIndia}</p>
          </div>
        </div>
      )}
    </>
  );
}
