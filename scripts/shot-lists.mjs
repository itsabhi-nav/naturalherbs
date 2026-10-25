/** Screenshot phone views of the redesigned lists + homepage cards. */
import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = "http://localhost:3100";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });

// extracts list top + a bit down
await page.goto(BASE + "/herbal-extracts", { waitUntil: "domcontentloaded" });
await sleep(1500);
await page.screenshot({ path: "/tmp/x-extracts.png" });
await page.evaluate(() => window.scrollTo({ top: 900 }));
await sleep(500);
await page.screenshot({ path: "/tmp/x-extracts-mid.png" });

// raw herbs (same engine)
await page.goto(BASE + "/raw-herbs", { waitUntil: "domcontentloaded" });
await sleep(1400);
await page.evaluate(() => window.scrollTo({ top: 900 }));
await sleep(500);
await page.screenshot({ path: "/tmp/x-rawherbs.png" });

// oils compact cards
await page.goto(BASE + "/oils", { waitUntil: "domcontentloaded" });
await sleep(1400);
await page.evaluate(() => window.scrollTo({ top: 900 }));
await sleep(500);
await page.screenshot({ path: "/tmp/x-oils.png" });

// homepage product line cards (the ↗ icon)
await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
await sleep(1600);
await page.evaluate(() => document.querySelector("#product-line")?.scrollIntoView());
await sleep(500);
await page.evaluate(() => window.scrollBy({ top: 350 }));
await sleep(500);
await page.screenshot({ path: "/tmp/x-productline.png" });

// overflow sanity on all three pages
for (const p of ["/herbal-extracts", "/raw-herbs", "/oils"]) {
  await page.goto(BASE + p, { waitUntil: "domcontentloaded" });
  await sleep(1000);
  const o = await page.evaluate(() => ({
    h: document.documentElement.scrollWidth - window.innerWidth,
  }));
  console.log(`${p}: horizontal overflow = ${o.h}px`);
}

await browser.close();
console.log("done");
