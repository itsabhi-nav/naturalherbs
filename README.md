# NaturalHerbs India — Rebuilt

A ground-up rebuild of natural-herbs.in in **Next.js (App Router) + Tailwind CSS v4 + Framer Motion + Lenis**, themed as *Dark Botanical Luxe* — deep forest canvas, cream serif typography, gold accents, aurora glows, glass panels and film grain. All content was scraped from the original site (60 extracts, 24 raw herbs, 19 oils, soapnuts business data, henna/indigo, contact details, T&Cs).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Pages

| Route | What's inside |
|---|---|
| `/` | Cinematic hero (parallax + word-reveal), latin-name ticker, about + animated counters, 6 product cards (3D tilt), signature range, pillars, director quote, shipments, 80+ countries orbit visual |
| `/herbal-extracts` | 60 extracts — sticky glass control bar with **live search + category chips** |
| `/raw-herbs` | 24 raw herbs with latin names, same dynamic explorer |
| `/oils` | 19 aromatic oils as animated cards |
| `/soapnuts` | Services, legacy, COA/MSDS concentrate cards, reverse dual marquees |
| `/henna` | Henna + Indigo panels with feature bullets |
| `/contact` | Mailto-preparing glass form (zero backend), channel cards, both offices |
| `/terms-conditions` | Typographic terms |
| 404 | Custom "lost in the wilderness" |

## Motion / engineering notes (the senior-engineer bits)

- **Smooth scrolling** via Lenis, wired to intercept `#anchor` links and run inside one RAF loop, cleaned up on unmount.
- **Scroll-linked parallax** (`useScroll`/`useTransform`) on every hero; heroes fade + drift as you scroll away.
- **Word-mask stagger reveals** for display headlines, blur-to-sharp `Reveal` for content blocks (fires once, `-12%` viewport margin).
- **Magnetic buttons** (spring physics), **3D tilt cards** with cursor sheen, animated count-ups, scroll progress hairline, pulsing WhatsApp float.
- **Zero layout-shift images**: `next/image` with `SmartImage` wrapper that falls back to a deterministic picsum seed if an Unsplash photo ever dies.
- Grid list morphs with `AnimatePresence` + `layout` when you filter/search; sticky filing uses transform-only animations.
- Static-pre-rendered to the max (all routes `○`), ~166 kB first load on `/`.

## Files of interest

- `lib/data.ts` — entire catalog as typed data (edit content here)
- `app/globals.css` — design tokens (`@theme`), aurora/grain/sheen utilities
- `components/` — Navbar (glass-on-scroll + circular-reveal mobile menu), Hero, PageHero, EntryExplorer, TiltCard, Magnetic, Counter, Marquee, SmartImage, ContactForm…
