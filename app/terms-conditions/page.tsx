import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { TERMS } from "@/lib/data";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Order, pricing, payment, shipping and refund terms for NaturalHerbs Global exports.",
  alternates: { canonical: `${SITE_URL}/terms-conditions` },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & conditions"
        copy="The fine print, written plainly, how orders, pricing, payment and shipping work at NaturalHerbs."
      />
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-4xl space-y-4 px-5 md:px-10">
          {TERMS.map((t) => (
            <Reveal key={t.n}>
              <article className="grid gap-4 rounded-2xl border border-fern bg-pine p-6 md:grid-cols-[5rem_1fr] md:p-10">
                <span className="text-2xl font-bold text-gold">
                  {t.n}
                </span>
                <div>
                  <h2 className="text-xl font-bold text-cream md:text-2xl">{t.title}</h2>
                  <p className="mt-3 leading-relaxed text-sage">{t.copy}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
