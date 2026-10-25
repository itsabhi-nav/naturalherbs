import Link from "next/link";
import { NAV_LINKS, BRAND } from "@/lib/data";
import { Logo } from "./Logo";

function SocialIcon({ label }: { label: string }) {
  const paths: Record<string, string> = {
    Instagram: "M12 8.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8Zm0-2A5.2 5.2 0 1 1 6.8 12 5.2 5.2 0 0 1 12 6.8Zm6.5-.6a1.2 1.2 0 1 1-1.2-1.2 1.2 1.2 0 0 1 1.2 1.2ZM12 4.2c-2.1 0-2.4 0-3.3 0a4.4 4.4 0 0 0-3.5 3.5c0 .9 0 1.2 0 3.3s0 2.4 0 3.3a4.4 4.4 0 0 0 3.5 3.5c.9 0 1.2 0 3.3 0s2.4 0 3.3 0a4.4 4.4 0 0 0 3.5-3.5c0-.9 0-1.2 0-3.3s0-2.4 0-3.3a4.4 4.4 0 0 0-3.5-3.5c-.9 0-1.2 0-3.3 0Zm0-1.9c2.2 0 2.5 0 3.4 0a5.1 5.1 0 0 1 4.2 4.2c0 .9 0 1.2 0 3.4s0 2.5 0 3.4a5.1 5.1 0 0 1-4.2 4.2c-.9 0-1.2 0-3.4 0s-2.5 0-3.4 0a5.1 5.1 0 0 1-4.2-4.2c0-.9 0-1.2 0-3.4s0-2.5 0-3.4a5.1 5.1 0 0 1 4.2-4.2c.9 0 1.2 0 3.4 0Z",
    Facebook: "M13.5 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.2-1.4 1.4-1.4h1.5V5.5a20 20 0 0 0-2.2-.1 3.4 3.4 0 0 0-3.7 3.8v2H8.1V14h2.4v7Z",
    LinkedIn: "M6.9 8.6H4.2V20h2.7ZM5.6 4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Zm7 6.3a2.3 2.3 0 0 0-2 1.1V9.3H7.9V20h2.7v-5.3c0-1.4.6-2.3 1.9-2.3s1.7 1 1.7 2.3V20H17v-6.4c0-2.8-1.5-4-3.7-4Z",
    X: "M17.8 4h2.7l-6 6.8L21.5 20h-5.6l-4.3-5.6L6.6 20H3.9l6.4-7.3L3.5 4h5.7l3.9 5.1Zm-1 14.3h1.5L8.4 5.6H6.8Z",
  };
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[1.05rem] w-[1.05rem]" aria-hidden>
      <path d={paths[label]} />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-cream/8 bg-moss">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[130%] -translate-x-1/2 rounded-[100%] bg-leaf/6 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-5 py-12 md:px-10 md:py-16">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr] md:gap-20">
          <div className="space-y-6">
            <Logo />
            <p className="max-w-md font-[family-name:var(--font-display)] text-2xl leading-snug text-cream/90 md:text-3xl">
              {BRAND.tagline}{" "}
              <span className="text-sage">Authentic herbal solutions for ultimate wellness, since 2005.</span>
            </p>
            <div className="flex gap-3">
              {BRAND.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-cream/12 text-cream/60 transition-all duration-300 hover:border-gold/60 hover:text-gold-soft hover:-translate-y-0.5"
                >
                  <SocialIcon label={s.label} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="eyebrow mb-5">Explore</p>
              <ul className="space-y-2.5 text-sm">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-cream/70 transition-colors hover:text-gold-soft">
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/terms-conditions" className="text-cream/70 transition-colors hover:text-gold-soft">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-5">Reach us</p>
              <div className="space-y-4 text-sm text-cream/70">
                <p>
                  <span className="block text-cream">India</span>
                  {BRAND.addressIndia}
                  <br />
                  <a href={BRAND.phoneIndiaHref} className="hover:text-gold-soft">
                    {BRAND.phoneIndia}
                  </a>
                </p>
                <p>
                  <span className="block text-cream">Canada</span>
                  {BRAND.addressCanada}
                  <br />
                  <a href={BRAND.phoneCanadaHref} className="hover:text-gold-soft">
                    {BRAND.phoneCanada}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-cream/8 pt-7 text-xs text-sage/70 md:flex-row">
          <p>© 2026 NaturalHerbs, All Rights Reserved.</p>
          <p className="tracking-[0.2em] uppercase">From nature, for you</p>
        </div>
      </div>
    </footer>
  );
}
