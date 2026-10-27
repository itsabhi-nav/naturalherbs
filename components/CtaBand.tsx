import Link from "next/link";

/** Full-bleed conversion band shared by pages. */
export default function CtaBand({
  title = "Looking for something extraordinary?",
  copy = "We're confident we've got the perfect solution for you. Get in touch and let's make it happen.",
}: {
  title?: string;
  copy?: string;
}) {
  return (
    <section className="bg-gold">
      <div className="mx-auto max-w-5xl px-5 py-16 text-center md:px-10 md:py-24">
        <p className="mb-4 text-[0.75rem] font-bold uppercase tracking-[0.18em] text-white/70">
          Let's build together
        </p>
        <h2 className="text-3xl font-bold leading-[1.08] tracking-tight text-white md:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-white/80 md:text-lg">{copy}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-gold-soft transition-colors duration-200 hover:bg-moss md:px-8"
          >
            Start a conversation
          </Link>
          <a
            href="https://wa.me/918285330983"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-white/40 px-7 py-3.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-white/10 md:px-8"
          >
            WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}
