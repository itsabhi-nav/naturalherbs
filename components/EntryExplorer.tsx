"use client";

import { useMemo, useState } from "react";

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
 * Catalog explorer: instant search + category chips.
 * Used by Extracts, Raw Herbs & Oils pages.
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
      <div className="sticky top-[60px] z-40 -mx-5 mb-3 border-b border-fern bg-bark/95 px-5 py-3 backdrop-blur-lg md:-mx-10 md:px-10">
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
              className="w-full rounded-lg border border-fern bg-pine py-3 pl-11 pr-4 text-sm text-cream outline-none transition-all placeholder:text-sage/60 focus:border-gold focus:ring-2 focus:ring-gold/15"
            />
          </label>
          <span className="hidden text-xs text-sage md:block">
            {filtered.length} / {items.length}
          </span>
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 ${
                cat === c
                  ? "border-gold bg-gold text-white"
                  : "border-fern text-sage hover:border-gold/50 hover:text-cream"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-2 md:space-y-px">
        {filtered.map((it, i) => (
          <div
            key={it.name + it.sub}
            className="group grid rounded-xl border border-fern bg-pine px-4 py-4 transition-colors duration-200 hover:border-gold/40 md:grid-cols-[3.4rem_1.4fr_1fr_1.2fr] md:items-baseline md:gap-6 md:rounded-lg md:border-transparent md:px-4 md:hover:border-fern md:hover:bg-moss/70"
          >
            <div className="flex items-baseline gap-3 border-b border-fern pb-2.5 md:contents">
              <span className="shrink-0 text-sm font-bold text-gold md:text-lg">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="min-w-0 text-lg font-bold leading-snug text-cream md:text-xl">
                {it.name}
              </h3>
            </div>
            <div className="pt-3 md:pt-0 md:contents">
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-gold md:text-sm md:font-normal md:normal-case md:tracking-normal md:text-sage">
                {it.sub}
              </span>
              <span className="mt-1.5 block text-sm leading-relaxed text-sage md:mt-0">
                {it.note}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-2xl font-bold text-sage">
            Nothing found for “{query}”.
          </p>
          <p className="mt-2 text-sm text-sage">Try another name or clear the filters.</p>
          <button
            onClick={() => {
              setQuery("");
              setCat("All");
            }}
            className="mt-6 rounded-full border border-gold px-6 py-2 text-xs font-bold uppercase tracking-[0.14em] text-gold transition-colors hover:bg-gold hover:text-white"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
