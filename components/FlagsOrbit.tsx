/**
 * Rotating orbit of destination-country flags with a calm counter-rotation
 * so every flag stays upright while the ring turns. Purely CSS driven,
 * so it costs nothing and pauses for reduced-motion users.
 */
const FLAGS = ["🇮🇳", "🇺🇸", "🇬🇧", "🇪🇺", "🇯🇵", "🇦🇪", "🇩🇪", "🇫🇷"];

export default function FlagsOrbit({ className = "" }: { className?: string }) {
  // root carries no position class of its own; positioning stays with the caller
  return (
    <div className={`h-32 w-32 md:h-36 md:w-36 ${className}`}>
      <div className="absolute inset-0 rounded-full border border-cream/15 bg-bark/75 backdrop-blur-md" />
      <div aria-hidden className="absolute inset-0 rounded-full border border-gold/10 scale-90" />

      {/* orbiting flags */}
      <div aria-hidden className="animate-spin-slow absolute inset-0">
        {FLAGS.map((f, i) => (
          <span
            key={f}
            className="absolute left-1/2 top-1/2"
            style={{ transform: `translate(-50%, -50%) rotate(${(360 / FLAGS.length) * i}deg) translateY(-3.55rem)` }}
          >
            <span className="animate-spin-s-rev grid h-7 w-7 place-items-center rounded-full border border-cream/10 bg-pine text-[0.8rem] shadow-[0_4px_14px_rgba(0,0,0,0.45)] md:h-8 md:w-8 md:text-base">
              {f}
            </span>
          </span>
        ))}
      </div>

      {/* centre claim */}
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="font-[family-name:var(--font-display)] text-2xl leading-none text-cream md:text-3xl">
            80<span className="gold-text">+</span>
          </p>
          <p className="mt-1 text-[0.52rem] uppercase tracking-[0.28em] text-sage md:text-[0.58rem]">
            Countries
          </p>
        </div>
      </div>
    </div>
  );
}
