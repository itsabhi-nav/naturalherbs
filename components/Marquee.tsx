import { MARQUEE_WORDS } from "@/lib/data";

/** Infinite latin-name ticker with edge fade. */
export default function Marquee({
  words = MARQUEE_WORDS,
  className = "",
  serif = true,
}: {
  words?: string[];
  className?: string;
  serif?: boolean;
}) {
  const row = [...words, ...words];
  return (
    <div className={`mask-fade-x overflow-hidden ${className}`}>
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap pr-10 hover:[animation-play-state:paused]">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            <span
              className={`text-lg md:text-2xl ${
                serif ? "font-[family-name:var(--font-display)] italic text-cream/35" : "text-sage/60"
              }`}
            >
              {w}
            </span>
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-gold/50">
              <path
                d="M12 19c0-5.5 2.8-9.2 7.4-11-1 6.4-3.7 9.3-7.4 11Zm0 0c0-5.5-2.8-9.2-7.4-11 1 6.4 3.7 9.3 7.4 11Z"
                fill="currentColor"
              />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
