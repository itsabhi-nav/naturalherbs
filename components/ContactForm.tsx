"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BRAND } from "@/lib/data";

type Status = "idle" | "sent";

/** Zero-backend contact: composes a rich mailto: draft (with WhatsApp fallback). */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", product: "Herbal Extracts", message: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New enquiry, ${form.product} | ${form.name || "Website"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nProduct interest: ${form.product}\n\n${form.message}`
    );
    window.location.href = `mailto:${BRAND.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
  };

  const field =
    "w-full rounded-xl border border-cream/10 bg-bark/60 px-4 py-3.5 text-sm text-cream outline-none transition-all placeholder:text-sage/40 focus:border-gold/60 focus:ring-2 focus:ring-gold/20";

  return (
    <form onSubmit={submit} className="glass rounded-3xl p-6 md:p-9">
      {status === "sent" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-14 text-center"
        >
          <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full border border-leaf/50 bg-leaf/10">
            <svg viewBox="0 0 24 24" className="h-7 w-7 text-leaf" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m4.5 12.5 5 5 10-11" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="font-[family-name:var(--font-display)] text-3xl">Your draft is ready</h3>
          <p className="mx-auto mt-3 max-w-sm text-sm text-sage">
            Your email app should now be open with the message pre-filled. Didn’t work? Reach us instantly on
            WhatsApp.
          </p>
          <a
            href={BRAND.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block rounded-full bg-[#25d366] px-7 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-transform hover:-translate-y-0.5"
          >
            Message on WhatsApp
          </a>
        </motion.div>
      ) : (
        <>
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl">Drop us a line</h3>
            <span className="hidden text-[0.62rem] uppercase tracking-[0.3em] text-sage md:block">
              Replies within 24h
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <input required placeholder="Name *" value={form.name} onChange={set("name")} className={field} />
            <input
              required
              type="email"
              placeholder="Email *"
              value={form.email}
              onChange={set("email")}
              className={field}
            />
            <input
              type="tel"
              placeholder="Phone"
              value={form.phone}
              onChange={set("phone")}
              className={`${field} md:col-span-2`}
            />
            <select value={form.product} onChange={set("product")} className={`${field} md:col-span-2 appearance-none`}>
              {["Herbal Extracts", "Raw Herbs", "Soapnuts", "Henna & Indigo", "Essential Oils", "Foxnuts", "Other"].map(
                (p) => (
                  <option key={p} className="bg-moss">
                    {p}
                  </option>
                )
              )}
            </select>
            <textarea
              rows={4}
              placeholder="Tell us what you’re sourcing, quantities, grades, destination markets…"
              value={form.message}
              onChange={set("message")}
              className={`${field} resize-none md:col-span-2`}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="group relative mt-6 inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-cream py-4 text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-bark"
          >
            Send enquiry
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-gold-soft via-gold to-gold-soft transition-transform duration-500 group-hover:translate-x-0"
            />
          </motion.button>
          <p className="mt-4 text-center text-[0.68rem] text-sage/60">
            Prefer instant answers?{" "}
            <a href={BRAND.whatsapp} target="_blank" rel="noreferrer" className="text-gold-soft underline-offset-2 hover:underline">
              Message us on WhatsApp
            </a>
          </p>
        </>
      )}
    </form>
  );
}
