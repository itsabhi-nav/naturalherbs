import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { BRAND } from "@/lib/data";
import { SITE_URL, SEO_SUMMARY, breadcrumb } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Us, Wholesale Herbal Enquiries, Samples & COA",
  description:
    "Talk to NaturalHerbs, India HQ in Faridabad, Canada office in Cambridge, WhatsApp replies, and enquiries within 24 hours. Request quotes, samples, COA or MSDS.",
  alternates: { canonical: `${SITE_URL}/contact` },
};

const CONTACT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/contact#webpage`,
  url: `${SITE_URL}/contact`,
  name: "Contact NaturalHerbs",
  description: SEO_SUMMARY,
  about: { "@id": `${SITE_URL}/#organization` },
  mainEntity: {
    "@type": "WholesaleStore",
    name: "NaturalHerbs",
    telephone: "+91-8285330983",
    email: BRAND.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "C-9 Dayal Bagh, Dayal Bagh Colony",
      addressLocality: "Faridabad",
      addressRegion: "Haryana",
      addressCountry: "IN",
    },
    makesOffer: [
      "Botanical extracts",
      "Raw herbs",
      "Essential oils",
      "Soapnuts",
      "Henna & indigo",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Product", name },
    })),
  },
};

const CHANNELS = [
  {
    k: "WhatsApp",
    label: "Fastest reply",
    line: "+91 82853 30983",
    href: BRAND.whatsapp,
    cta: "Open chat",
    accent: "leaf" as const,
  },
  {
    k: "Email",
    label: "India",
    line: BRAND.email,
    href: `mailto:${BRAND.email}`,
    cta: "Write to us",
    accent: "gold" as const,
  },
  {
    k: "Phone",
    label: "Canada office",
    line: BRAND.phoneCanada,
    href: BRAND.phoneCanadaHref,
    cta: "Call now",
    accent: "cream" as const,
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd id="ld-contact-page" data={CONTACT_SCHEMA} />
      <JsonLd id="ld-contact-bc" data={breadcrumb([{ name: "Contact", path: "/contact" }])} />
      <PageHero
        eyebrow="Contact us"
        title="Let’s talk botanicals"
        copy="Business hours, real people. Reach out for quotes, samples, COA/MSDS or partnership conversations, we usually reply within one business day."
      />

      <section className="py-12 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          {/* Channel cards + offices */}
          <div className="space-y-8">
            <div className="grid gap-4 md:grid-cols-3">
              {CHANNELS.map((c, i) => (
                <Reveal key={c.k} delay={i * 0.08}>
                  <a
                    href={c.href}
                    {...(c.k === "WhatsApp" ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="group flex h-full min-w-0 flex-col rounded-xl border border-fern bg-pine p-5 transition-colors duration-200 hover:border-gold/50 md:p-6"
                  >
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-sage">{c.k}</p>
                    <p
                      className={`mt-3 break-words text-base font-bold leading-snug md:text-lg ${
                        c.accent === "leaf" ? "text-leaf" : c.accent === "gold" ? "text-gold" : "text-cream"
                      }`}
                    >
                      {c.line}
                    </p>
                    <span className="mt-auto pt-5 text-xs text-sage transition-colors group-hover:text-gold">
                      {c.cta} <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.15}>
              <div className="overflow-hidden rounded-2xl border border-fern">
                <div className="grid md:grid-cols-2">
                  <div className="bg-pine p-6 md:p-8">
                    <p className="eyebrow mb-4">India Headquarters</p>
                    <p className="text-lg font-bold leading-snug text-cream">
                      {BRAND.addressIndia}
                    </p>
                    <p className="mt-4 text-sm text-sage">
                      Business hours, we love our customers, so drop by or call ahead.
                    </p>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=C-9+Dayal+Bagh+Faridabad+India"
                      target="_blank"
                      rel="noreferrer"
                      className="group mt-6 inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-gold transition-colors hover:text-gold-soft"
                    >
                      Get directions
                      <span aria-hidden className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </a>
                  </div>
                  <div className="border-t border-fern bg-moss/70 p-6 md:border-l md:p-8 md:border-t-0">
                    <p className="eyebrow mb-4">Canada Office</p>
                    <p className="text-lg font-bold leading-snug text-cream">
                      {BRAND.addressCanada}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-sage">
                      Serving North America,{" "}
                      <a href={`mailto:${BRAND.emailCanada}`} className="text-cream hover:text-gold">
                        {BRAND.emailCanada}
                      </a>
                    </p>
                    <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                      {BRAND.socials.map((s) => (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-sage transition-colors hover:text-gold"
                        >
                          {s.label}
                          <span aria-hidden className="text-[0.6rem] text-gold/60">↗</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
