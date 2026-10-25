"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";

export type Entry = {
  name: string;
  sub: string;
  note: string;
};

const CATEGORIES = ["All", "Diabetes", "Skin & Hair", "Digestion", "Immunity & Detox", "Mind & Nerve", "Heart & Joints", "Women's Health", "General"];

function categorize(e: Entry): string {
  const t = `${e.note} ${e.sub}`.toLowerCase();
  if (/(diabet|hypo|glycem|blood sugar)/.test(t)) return "Diabetes";
  if (/(skin|hair|scalp|dermat|pityriasis|eruption)/.test(t)) return "Skin & Hair";
  if (/(digest|carmin|laxat|purgat|cholera|dysenter|stomach)/.test(t)) return "Digestion";
  if (/(immun|detox|anti ?oxid|hepat|purif|tox)/.test(t)) return "Immunity & Detox";
  if (/(memory|nerve|mind|parkinson|brain|tussive|respirat|bronch|expector)/.test(t)) return "Mind & Nerve";
  if (/(cardio|arthri|rheuma|cholester|hypertens)/.test(t)) return "Heart & Joints";
  if (/(women|galact|emmen|menstru|lactation)/.test(t)) return "Women's Health";
  return "General";
}

/**
 * Dynamic catalog explorer, instant search + category chips,
 * with animated staggered grid. Used by Extracts, Raw Herbs & Oils pages.
 */
export default function EntryExplorer({
  eyebrow,
  items,
  columns = "table",
}: {
  eyebrow: string;
  items: Entry[];
  columns?: "table" | "cards";
}) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");

  const cats = useMemo(() => {
    const present = new Map<string, number>();
    items.forEach((it) => {
      const c = categorize(it);
      present.set(c, (present.get(c) ?? 0) + 1);
    });
    return ["All", ...CATEGORIES.slice(1).filter((c) => present.has(c))];
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((it) => {
      const matchQ = !q || `${it.name} ${it.sub} ${it.note}`.toLowerCase().includes(q);
      const matchC = cat === "All" || categorize(it) === cat;
      return matchQ && matchC;
    });
  }, [items, query, cat]);

  return (
    <div>
      {/* Control bar */}
      <Reveal className="sticky top-[60px] md:top-[58px] z-40 -mx-5 mb-8 px-3 py-3 md:-mx-10 md:px-6">
        <div className="rounded-2xl border border-cream/10 bg-bark/95 p-3 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.85)] backdrop-blur-xl md:p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <label className="relative flex-1">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sage"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${items.length} ${eyebrow.toLowerCase()}…`}
                className="w-full rounded-xl border border-cream/10 bg-bark/60 py-3 pl-11 pr-4 text-sm text-cream outline-none transition-all placeholder:text-sage/50 focus:border-gold/60 focus:ring-2 focus:ring-gold/20"
              />
            </label>
            <span className="hidden text-xs uppercase tracking-[0.2em] text-sage md:block">
              {filtered.length} / {items.length}
            </span>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`shrink-0 border px-3.5 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.12em] transition-all duration-300 rounded-[3px] ${
                  cat === c
                    ? "border-gold/70 bg-gold/10 text-gold-soft"
                    : "border-cream/10 text-sage hover:border-cream/25 hover:text-cream"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Results */}
      {columns === "cards" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((it, i) => (
              <motion.article
                layout
                key={it.name + it.sub}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, delay: Math.min(i * 0.03, 0.4), ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-cream/8 bg-pine p-6 transition-colors duration-300 hover:border-gold/30"
              >
                <div
                  aria-hidden
                  className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-leaf/10 blur-2xl transition-all duration-500 group-hover:bg-gold/15"
                />
                <p className="mb-3 text-[0.62rem] uppercase tracking-[0.3em] text-gold/80">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-[family-name:var(--font-display)] text-2xl text-cream">{it.name}</h3>
                <p className="mt-0.5 text-xs italic text-sage/80">{it.sub}</p>
                <p className="mt-4 text-sm leading-relaxed text-sage">{it.note}</p>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="space-y-px">
          <AnimatePresence mode="popLayout">
            {filtered.map((it, i) => (
              <motion.div
                layout
                key={it.name + it.sub}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.02, 0.35), ease: [0.22, 1, 0.36, 1] }}
                className="group grid grid-cols-[2.6rem_1fr] items-baseline gap-4 rounded-xl border border-transparent px-4 py-4 transition-all duration-300 hover:border-cream/10 hover:bg-cream/[0.03] md:grid-cols-[3.4rem_1.4fr_1fr_1.2fr] md:gap-6"
              >
                <span className="font-[family-name:var(--font-display)] text-lg text-gold/70 transition-colors group-hover:text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-xl text-cream transition-colors group-hover:text-gold-soft">
                  {it.name}
                </h3>
                <p className="text-sm text-sage">{it.sub}</p>
                <p className="col-start-2 text-sm text-sage/90 md:col-start-4">{it.note}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {filtered.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-20 text-center font-[family-name:var(--font-display)] text-2xl text-sage"
        >
          Nothing sprouted for “{query}”.
          <span className="mt-2 block text-sm text-sage/60">Try another name or clear the filters.</span>
          <button
            onClick={() => {
              setQuery("");
              setCat("All");
            }}
            className="mt-6 border border-gold/40 px-6 py-2 text-xs uppercase tracking-[0.2em] text-gold-soft rounded-[3px] transition-colors hover:bg-gold/15"
          >
            Reset
          </button>
        </motion.p>
      )}
    </div>
  );
}
