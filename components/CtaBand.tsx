import Link from "next/link";
import Reveal from "./Reveal";
import Marquee from "./Marquee";
import Magnetic from "./Magnetic";

/** Full-bleed conversion band shared by pages. */
export default function CtaBand({
  title = "Looking for something extraordinary?",
  copy = "We’re confident we’ve got the perfect solution for you. Get in touch and let’s make it happen.",
}: {
  title?: string;
  copy?: string;
}) {
  return (
    <section className="relative overflow-hidden border-y border-cream/8 bg-pine">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center opacity-[0.05] select-none"
      >
        <Marquee serif words={["wholesale", "botanicals", "certified", "export", "since 2005", "pure"]} />
      </div>
      <div className="relative mx-auto max-w-5xl px-5 py-24 text-center md:px-10 md:py-32">
        <Reveal>
          <p className="eyebrow mb-5">Let’s build together</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-[family-name:var(--font-display)] text-4xl font-medium leading-[1.05] tracking-tight md:text-7xl">
            {title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="gold-text italic">{title.split(" ").slice(-1)}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-xl text-sage md:text-lg">{copy}</p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 rounded-full bg-cream px-5 py-3 md:px-8 md:py-4 text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-bark transition-transform duration-300 hover:-translate-y-0.5"
              >
                Start a conversation
              </Link>
            </Magnetic>
            <Magnetic>
              <a
                href="https://wa.me/918285330983"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-cream/20 px-5 py-3 md:px-8 md:py-4 text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-cream/90 transition-all duration-300 hover:border-gold/60 hover:text-gold-soft"
              >
                WhatsApp us
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
