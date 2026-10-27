import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[90svh] flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow mb-6">404</p>
      <h1 className="text-5xl font-bold leading-none md:text-7xl">
        Lost in the <span className="gold-text">wilderness</span>
      </h1>
      <p className="mt-6 max-w-md text-sage md:text-lg">
        The page you're looking for doesn't exist, but the botany is still thriving.
      </p>
      <Link
        href="/"
        className="mt-10 rounded-full bg-gold px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-gold-soft"
      >
        Back to the roots
      </Link>
    </section>
  );
}
