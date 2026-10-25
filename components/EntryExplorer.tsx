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
}: {
  eyebrow: string;
  items: Entry[];
}) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  // layout animations (re-measure + FLIP across 60 rows) cost real GPU time
  // on phones, keep them desktop-only and let phones do simple fades
  const fine = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches,
    []
  );

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
      <div className="space-y-2.5 md:space-y-px">
        <AnimatePresence mode="popLayout">
          {filtered.map((it, i) => (
            <motion.div
              layout={fine ? true : undefined}
              key={it.name + it.sub}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={fine ? { duration: 0.4, delay: Math.min(i * 0.02, 0.35), ease: [0.22, 1, 0.36, 1] } : { duration: 0.25 }}
              className="group grid rounded-2xl border border-cream/8 bg-gradient-to-br from-pine/90 to-moss/25 px-4 py-4 shadow-[0_22px_50px_-30px_rgba(0,0,0,0.9)] transition-all duration-300 hover:border-gold/25 md:rounded-xl md:border-transparent md:bg-none md:shadow-none md:grid-cols-[3.4rem_1.4fr_1fr_1.2fr] md:items-baseline md:gap-6 md:px-4 md:hover:border-cream/10 md:hover:bg-cream/[0.03]"
            >
              {/* mobile: capsule card — name row over a hairline, then a gold
                  kicker + italic serif line; md:contents re-attaches each
                  piece to the desktop grid untouched */}
              <div className="flex items-baseline gap-3 border-b border-cream/[0.06] pb-2.5 md:contents">
                <span className="shrink-0 font-[family-name:var(--font-display)] text-sm text-gold-soft md:text-lg md:text-gold/70 md:transition-colors md:group-hover:text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="min-w-0 font-[family-name:var(--font-display)] text-lg leading-snug text-cream md:text-xl md:transition-colors md:group-hover:text-gold-soft">
                  {it.name}
                </h3>
              </div>
              <div className="pt-3 md:pt-0 md:contents">
                <span className="flex items-center gap-2.5 text-[0.6rem] font-medium uppercase tracking-[0.24em] text-gold-soft md:text-sm md:font-normal md:normal-case md:tracking-normal md:text-sage">
                  <span aria-hidden className="h-px w-5 shrink-0 bg-gold/60 md:hidden" />
                  {it.sub}
                </span>
                <span className="mt-1.5 block font-[family-name:var(--font-display)] text-[0.82rem] italic leading-relaxed text-sage/90 md:mt-0 md:text-sm md:font-normal md:leading-normal md:not-italic md:text-sage/90">
                  {it.note}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

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
