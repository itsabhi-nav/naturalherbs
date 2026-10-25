import Image from "next/image";
import Link from "next/link";

export function Logo({ className = "", imgSize = 36 }: { className?: string; imgSize?: number }) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-3 ${className}`}>
      <span className="relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full border border-cream/15 bg-white transition-transform duration-500 group-hover:rotate-6">
        <Image
          src="/logo-mark.png"
          alt="NaturalHerbs leaf emblem"
          width={imgSize}
          height={imgSize}
          className="h-full w-full object-contain p-0.5"
          priority
        />
      </span>
      <span className="leading-none">
        <span className="block font-[family-name:var(--font-display)] text-[1.12rem] font-medium tracking-[0.01em] text-cream">
          NaturalHerbs
        </span>
        <span className="mt-1 block text-[0.52rem] font-medium uppercase tracking-[0.45em] text-gold/90">
          Estd 2005
        </span>
      </span>
    </Link>
  );
}
