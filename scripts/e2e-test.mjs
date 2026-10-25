/**
 * REAL browser E2E test, mobile emulation, uses system Chrome (no download).
 * Checks: console errors, scroll behavior, blank-content check, hamburger,
 * deep pages, image loads.
 */
import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = "http://localhost:3100";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
await page.setUserAgent(
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
);

const errors = [];
page.on("console", (m) => {
  if (["error", "warning"].includes(m.type())) errors.push(`[console.${m.type()}] ${m.text().slice(0, 160)}`);
});
page.on("pageerror", (e) => errors.push(`[pageerror] ${String(e).slice(0, 200)}`));
page.on("requestfailed", (r) => errors.push(`[requestfailed] ${r.url().slice(0, 90)} ${r.failure()?.errorText}`));

console.log("== 1. HOMEPAGE LOAD (cold, mobile emulation) ==");
const t0 = Date.now();
await page.goto(BASE + "/", { waitUntil: "domcontentloaded", timeout: 30000 });
console.log(`domcontentloaded in ${Date.now() - t0}ms`);

// wait for hydration + preloader to finish
await sleep(2500);

const preloaderGone = await page.evaluate(() => {
  const el = document.querySelector('[aria-hidden][class*="z-[200]"]');
  return !el || getComputedStyle(el).pointerEvents === "none";
});
console.log("preloader curtain: gone or pointer-events-none =>", preloaderGone);

// hero visible right away?
const heroVisible = await page.evaluate(() => {
  const h1 = document.querySelector("h1");
  if (!h1) return false;
  const r = h1.getBoundingClientRect();
  const opacity = getComputedStyle(h1).opacity;
  return r.top < window.innerHeight && Number(opacity) > 0.3;
});
console.log("hero visible immediately =>", heroVisible);
await page.screenshot({ path: "/tmp/phone-hero.png" });

console.log("\n== 2. SCROLL TEST (the main complaint) ==");
for (const y of [800, 1600, 2400, 3200, 4000, 4800]) {
  const t = Date.now();
  await page.evaluate((yy) => window.scrollTo({ top: yy }), y);
  await sleep(450);
  const res = await page.evaluate((yy) => {
    const actual = Math.round(window.scrollY);
    // sample what's on screen: real content or blank?
    const el = document.elementFromPoint(195, 400);
    const vis = el ? getComputedStyle(el).opacity : "no-element";
    return { actual, target: yy, visible: vis };
  }, y);
  console.log(`scroll ${y}: reached ${res.actual}, element opacity at mid-screen: ${res.visible}, took ${Date.now() - t}ms`);
}
await page.screenshot({ path: "/tmp/phone-midscroll.png" });

console.log("\n== 3. BOTTOM REACH ==");
await page.evaluate(() => window.scrollTo({ top: 999999 }));
await sleep(600);
const bottom = await page.evaluate(() => ({
  y: Math.round(window.scrollY),
  max: Math.round(document.documentElement.scrollHeight - window.innerHeight),
  footerVisible: (() => {
    const f = document.querySelector("footer");
    return f ? f.getBoundingClientRect().top < window.innerHeight : false;
  })(),
}));
console.log(`bottom: ${bottom.y}/${bottom.max}, footer visible => ${bottom.footerVisible}`);
await page.screenshot({ path: "/tmp/phone-footer.png" });

console.log("\n== 4. HAMBURGER MENU ==");
const burgerSel = 'button[aria-label="Toggle menu"]';
const burger = await page.$(burgerSel);
if (burger) {
  await page.evaluate(() => window.scrollTo({ top: 0 }));
  await sleep(400);
  await burger.click();
  await sleep(900);
  const menuOpen = await page.evaluate(() => {
    const overlay = document.querySelector('[class*="bg-moss/98"], [class*="bg-moss\\/98"]');
    return !!overlay;
  });
  console.log("menu overlay open =>", menuOpen);
  const canClose = await page.$(burgerSel);
  const visible = await page.evaluate((sel) => {
    const b = document.querySelector(sel);
    if (!b) return false;
    const r = b.getBoundingClientRect();
    const topEl = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
    return b.contains(topEl) || topEl === b;
  }, burgerSel);
  console.log("burger (close X) tappable at top-right =>", visible);
  await page.screenshot({ path: "/tmp/phone-menu.png" });
  await canClose?.click();
  await sleep(800);
  const menuClosed = await page.evaluate(() => {
    const overlay = document.querySelector('[class*="bg-moss/98"], [class*="bg-moss\\/98"]');
    return !overlay;
  });
  console.log("menu closes via X =>", menuClosed);
} else console.log("burger NOT FOUND");

console.log("\n== 5. OTHER PAGES LOAD ==");
for (const p of ["/herbal-extracts", "/raw-herbs", "/oils", "/soapnuts", "/henna", "/contact", "/terms-conditions"]) {
  const t = Date.now();
  await page.goto(BASE + p, { waitUntil: "domcontentloaded", timeout: 30000 });
  await sleep(1200);
  const status = await page.evaluate(() => ({
    title: document.title.slice(0, 50),
    h1: document.querySelector("h1")?.textContent?.slice(0, 40) || "NO H1",
    bodyBlank: document.body.innerText.replace(/\s+/g, "").length < 50,
  }));
  console.log(`${p} (${Date.now() - t}ms): h1="${status.h1}" blankPage=${status.bodyBlank}`);
}

console.log("\n== 6. CONTACT PAGE MOBILE OVERFLOW CHECK ==");
await page.goto(BASE + "/contact", { waitUntil: "domcontentloaded" });
await sleep(1500);
const overflow = await page.evaluate(() => ({
  horizontalScroll: document.documentElement.scrollWidth > window.innerWidth + 2,
  scrollWidth: document.documentElement.scrollWidth,
  innerWidth: window.innerWidth,
}));
console.log(overflow);

console.log("\n== ERRORS (console/page/request) ==");
console.log(errors.length ? errors.slice(0, 20).join("\n") : "NONE 🎉");

await browser.close();
