/**
 * First-load fast-scroll race test.
 * A: desktop (fine pointer) — scroll instantly to deep content BEFORE
 *    hydration; after hydration nothing below may stay hidden.
 * B: phone (REAL coarse pointer via CDP emulation) — same scenario plus
 *    hydration during scroll; sections must be visible immediately after,
 *    and aurora blobs must be display:none.
 */
import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = "http://localhost:3100";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox"] });

async function sampleVisible(page) {
  return page.evaluate(() => {
    const secs = [...document.querySelectorAll("section")];
    return secs.map((s, i) => {
      const r = s.getBoundingClientRect();
      const near = r.top < window.innerHeight && r.bottom > 0;
      return {
        i,
        near,
        opacity: Number(getComputedStyle(s).opacity),
        styleOpacity: s.style.opacity,
        hidden: s.classList.contains("rv-hidden") && !s.hasAttribute("data-rv-show"),
      };
    });
  });
}

/* ------------------------- A: desktop fast-scroll race ------------------------- */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
  await sleep(150); // user starts scrolling before hydration
  await page.evaluate(() => window.scrollTo({ top: 1600 }));
  await sleep(80);
  await page.evaluate(() => window.scrollTo({ top: 2600 })); // fly past content
  // let hydration + chunks finish
  await sleep(3500);
  const vis = await sampleVisible(page);
  const ghost = vis.filter((s) => s.hidden && s.near);
  console.log("A(desktop) ghost-hidden sections in view:", ghost.length ? JSON.stringify(ghost) : "NONE");
  const sampled = vis.filter((s) => s.near).map((s) => `s${s.i}:${s.opacity}`);
  console.log("A(desktop) visible sections:", sampled.join(" "));
  await page.screenshot({ path: "/tmp/fs-desktop.png" });
  await page.close();
}

/* --------------------- B: phone, real coarse pointer --------------------- */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  const cdp = await page.createCDPSession();
  await cdp.send("Emulation.setEmulatedMedia", {
    features: [{ name: "pointer", value: "coarse" }, { name: "hover", value: "none" }],
  });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 6 });
  await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 150,
    downloadThroughput: (1.6 * 1024 * 1024) / 8,
    uploadThroughput: (750 * 1024) / 8,
  });

  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
  await sleep(250); // scroll while still un-hydrated
  await page.evaluate(() => window.scrollTo({ top: 1400 }));
  await sleep(120);
  await page.evaluate(() => window.scrollTo({ top: 2400 }));
  await sleep(4500); // hydration lands mid-scroll

  const vis = await sampleVisible(page);
  const ghost = vis.filter((s) => s.hidden && s.near);
  console.log("B(phone) ghost-hidden sections in view:", ghost.length ? JSON.stringify(ghost) : "NONE");
  console.log("B(phone) visible sections:", vis.filter((s) => s.near).map((s) => `s${s.i}:${s.opacity}`).join(" "));

  const aurora = await page.evaluate(() => {
    const a = document.querySelector(".aurora");
    return a ? getComputedStyle(a).display : "no-aurora";
  });
  console.log("B(phone) aurora display:", aurora, "(none = correct)");

  // keep swiping down: smoothness proxy = every step lands & content visible
  for (const y of [3200, 4000, 4800, 5600]) {
    await page.evaluate((yy) => window.scrollTo({ top: yy }), y);
    await sleep(300);
    const v = await sampleVisible(page);
    const bad = v.filter((s) => s.near && s.opacity < 1);
    console.log(`B(phone) swipe ${y}:`, bad.length ? "BLANK SECTIONS: " + JSON.stringify(bad) : "all visible");
  }
  await page.screenshot({ path: "/tmp/fs-phone.png" });
  await page.close();
}

await browser.close();
console.log("done");
