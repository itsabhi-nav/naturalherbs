import Image from "next/image";
import Link from "next/link";

export function Logo({ className = "", imgSize = 36 }: { className?: string; imgSize?: number }) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-3 ${className}`}>
      <span className="relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full border border-fern bg-white">
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
        <span className="block text-[1.12rem] font-bold tracking-[0.01em] text-cream">
          NaturalHerbs
        </span>
        <span className="mt-1 block text-[0.52rem] font-bold uppercase tracking-[0.3em] text-gold">
          Estd 2005
        </span>
      </span>
    </Link>
  );
}
