/**
 * SLOW PHONE test: 6x CPU throttle + Fast 3G network, exactly like a real
 * hotspot browsing session. Proves below-hero content is visible from the
 * very first frame, before React even hydrates, and never goes blank.
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
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await page.emulateCPUThrottling(6);
const cdp = await page.createCDPSession();
await cdp.send("Network.enable");
await cdp.send("Network.emulateNetworkConditions", {
  offline: false,
  latency: 150,
  downloadThroughput: (1.6 * 1024 * 1024) / 8, // ~1.6 Mbps (fast 3G)
  uploadThroughput: (750 * 1024) / 8,
});

const errors = [];
page.on("pageerror", (e) => errors.push(String(e).slice(0, 120)));

console.log("== slow-phone cold load ==");
const t0 = Date.now();
await page.goto(BASE + "/", { waitUntil: "domcontentloaded", timeout: 60000 });
console.log(`html arrived in ${Date.now() - t0}ms`);

// BEFORE hydration completes: sample sections below hero
await sleep(300);
const early = await page.evaluate(() => {
  const sections = [...document.querySelectorAll("section")];
  return sections.slice(1, 5).map((s, i) => {
    const st = getComputedStyle(s);
    return {
      i: i + 1,
      inTitle: s.className.slice(0, 30),
      opacity: st.opacity,
      hasText: (s.innerText || "").replace(/\s+/g, "").length > 20,
    };
  });
});
console.log("early (pre-hydration) sections", JSON.stringify(early, null, 1));
await page.screenshot({ path: "/tmp/slow-early.png" });

// scroll immediately, hard
const t1 = Date.now();
await page.evaluate(() => window.scrollTo({ top: 2000 }));
await sleep(200);
const scrolledEarly = await page.evaluate(() => {
  const s = document.querySelectorAll("section")[3];
  return { scrollY: Math.round(window.scrollY), opacity: getComputedStyle(s).opacity };
});
console.log(`scrolled to 2000 pre-hydration: reached=${scrolledEarly.scrollY}, section opacity=${scrolledEarly.opacity}, ${Date.now() - t1}ms`);

// wait for hydration to complete
await sleep(4000);
const post = await page.evaluate(() => {
  const secs = [...document.querySelectorAll("section")].slice(1, 5).map((s) => Number(getComputedStyle(s).opacity));
  return secs;
});
console.log("post-hydration section opacities:", post.join(", "));

// full scroll sweep now
for (const y of [1200, 2400, 3600, 4800]) {
  await page.evaluate((yy) => window.scrollTo({ top: yy }), y);
  await sleep(350);
  const o = await page.evaluate(() => {
    const els = [...document.querySelectorAll("section")];
    const vis = els.filter((s) => s.getBoundingClientRect().top < window.innerHeight * 0.6);
    return vis.map((s) => Number(getComputedStyle(s).opacity));
  });
  console.log(`scroll ${y}: visible section opacities = [${o}]`);
}
await page.screenshot({ path: "/tmp/slow-late.png" });

console.log("errors:", errors.length ? errors.join(" | ") : "NONE");
await browser.close();
