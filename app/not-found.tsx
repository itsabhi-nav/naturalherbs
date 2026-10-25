import Link from "next/link";
import Aurora from "@/components/Aurora";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[90svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <Aurora />
      <p className="eyebrow mb-6">404</p>
      <h1 className="font-[family-name:var(--font-display)] text-5xl font-medium leading-none md:text-9xl">
        Lost in the <span className="gold-text italic">wilderness</span>
      </h1>
      <p className="mt-6 max-w-md text-sage md:text-lg">
        The page you’re looking for doesn’t exist, but the botany is still thriving.
      </p>
      <Link
        href="/"
        className="mt-10 rounded-full bg-cream px-8 py-4 text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-bark transition-transform hover:-translate-y-0.5"
      >
        Back to the roots
      </Link>
    </section>
  );
}
