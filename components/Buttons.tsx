import Link from "next/link";

export function PrimaryButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-cream px-5 py-3 md:px-7 md:py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-bark transition-transform duration-300 hover:-translate-y-0.5 ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-gold-soft via-gold to-gold-soft transition-transform duration-500 ease-out group-hover:translate-x-0"
      />
    </Link>
  );
}

export function GhostButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-3 rounded-full border border-cream/20 px-5 py-3 md:px-7 md:py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-cream/90 backdrop-blur transition-all duration-300 hover:border-gold/70 hover:text-gold-soft hover:-translate-y-0.5 ${className}`}
    >
      {children}
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}

export function GlassButton({
  href,
  children,
  className = "",
  external,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`inline-flex items-center gap-3 rounded-full border border-gold/40 bg-gold/10 px-5 py-3 md:px-7 md:py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-gold-soft backdrop-blur transition-all duration-300 hover:bg-gold/20 hover:-translate-y-0.5 ${className}`}
    >
      {children}
    </a>
  );
}
