import Reveal from "./Reveal";

/** Editorial section header: gold eyebrow + big serif line + optional copy. */
export default function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
  className = "",
}: {
  eyebrow: string;
  title: React.ReactNode;
  copy?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}>
      <Reveal>
        <p className="eyebrow mb-4 flex items-center gap-3">
          {centered && <span className="h-px w-8 bg-gold/60" aria-hidden />}
          {eyebrow}
          <span className="h-px w-8 bg-gold/60" aria-hidden />
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-medium leading-[1.08] tracking-tight text-cream md:text-6xl">
          {title}
        </h2>
      </Reveal>
      {copy && (
        <Reveal delay={0.16}>
          <p className={`mt-5 text-base leading-relaxed text-sage md:text-lg ${centered ? "mx-auto max-w-xl" : ""}`}>
            {copy}
          </p>
        </Reveal>
      )}
    </div>
  );
}
