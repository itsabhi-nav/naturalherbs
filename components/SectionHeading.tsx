import Reveal from "./Reveal";

/** Clean section header: eyebrow + bold heading + optional copy. */
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
        <p className="eyebrow mb-4">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-cream md:text-5xl">
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
