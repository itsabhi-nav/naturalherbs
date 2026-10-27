import Link from "next/link";

/** Clean light header for interior pages — text only, no banner image. */
export default function PageHero({
  eyebrow,
  title,
  copy,
  children,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-fern bg-moss/60">
      <div className="mx-auto w-full max-w-7xl px-5 pb-6 pt-32 md:px-10 md:pb-8 md:pt-40">
        <p className="eyebrow mb-5 flex items-center gap-2 text-[0.7rem]">
          <Link href="/" className="transition-colors hover:text-gold-soft">
            Home
          </Link>
          <span className="text-sage/50">/</span>
          {eyebrow}
        </p>

        <h1 className="mb-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
          {title}
        </h1>

        {copy && (
          <p className="max-w-2xl text-base leading-relaxed text-sage md:text-lg">{copy}</p>
        )}
        {children}
      </div>
    </section>
  );
}
