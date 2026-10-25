/**
 * Brand asset pipeline (v2)
 *
 *  public/logo.jpg          → full trimmed logo (shareable master)
 *  app/icon.png             → favicon 512 (leaf emblem square)
 *  app/apple-icon.png       → iOS icon 180
 *  public/logo-mark.png     → emblem 256 for UI (navbar, preloader)
 *  app/opengraph-image.png  → 1200×630 WhatsApp/IG/Telegram preview
 *
 *  Safe against the sharp extract-vs-trim ordering quirk: every stage
 *  writes to its own buffer first.
 */
import sharp from "sharp";

const SRC = "PHOTO-2026-10-25-03-00-53.jpg";
const WHITE = { r: 255, g: 255, b: 255 };

/* ---------- step 0: trim master once ---------- */
const fullTrimmed = await sharp(SRC).trim({ background: WHITE, threshold: 12 }).toBuffer();
const { width: ftw, height: fth } = await sharp(fullTrimmed).metadata();
console.log(`trimmed master: ${ftw}×${fth}`);

/* ---------- step 1: isolate the leaf emblem ---------- */

// pixel-mapped wordmark mask (measured via column-run scan):
// rows ≥420 → text begins x=434, leaf ends ~405 · rows <420 → pure leaf art
const masked = await sharp(fullTrimmed)
  .composite([
    {
      input: {
        create: {
          width: ftw - 405,
          height: fth - 420,
          channels: 4,
          background: WHITE,
        },
      },
      left: 405,
      top: 420,
    },
  ])
  .trim({ background: WHITE, threshold: 12 })
  .toBuffer({ resolveWithObject: true });

// bbox of the surviving leaf cluster
const { data: md, info: mi } = await sharp(masked.data).raw().toBuffer({ resolveWithObject: true });
const isColored = (x, y) => {
  const i = (y * mi.width + x) * mi.channels;
  return md[i] < 242 || md[i + 1] < 242 || md[i + 2] < 242;
};
let minX = mi.width, maxX = 0, minY = mi.height, maxY = 0;
for (let y = 0; y < mi.height; y++)
  for (let x = 0; x < mi.width; x++)
    if (isColored(x, y)) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
console.log(`emblem bbox: x ${minX}..${maxX}, y ${minY}..${maxY}`);

/* ---------- step 2: square emblem crop ---------- */
const pad = Math.round(Math.max(maxX - minX, maxY - minY) * 0.06);
const box = {
  left: Math.max(0, minX - pad),
  top: Math.max(0, minY - pad),
  width: Math.min(mi.width, maxX - minX + pad * 2),
  height: Math.min(mi.height, maxY - minY + pad * 2),
};
const side = Math.max(box.width, box.height);
const emblemSquare = await sharp(masked.data)
  .extract(box)
  .extend({
    background: WHITE,
    top: Math.max(0, Math.round((side - box.height) / 2)),
    bottom: Math.max(0, Math.round((side - box.height) / 2)),
    left: Math.max(0, Math.round((side - box.width) / 2)),
    right: Math.max(0, Math.round((side - box.width) / 2)),
  })
  .png()
  .toBuffer();

await sharp(emblemSquare).resize(512, 512).png().toFile("app/icon.png");
await sharp(emblemSquare).resize(180, 180).png().toFile("app/apple-icon.png");
await sharp(emblemSquare).resize(256, 256).png().toFile("public/logo-mark.png");

/* ---------- step 3: shareable master ---------- */
await sharp(fullTrimmed).jpeg({ quality: 92, mozjpeg: true }).toFile("public/logo.jpg");

/* ---------- step 4: OG preview 1200×630 ---------- */
await sharp({ create: { width: 1200, height: 630, channels: 4, background: WHITE } })
  .composite([
    {
      input: await sharp(fullTrimmed).resize({ width: 1020, height: 520, fit: "inside" }).png().toBuffer(),
      gravity: "center",
    },
  ])
  .png()
  .toFile("app/opengraph-image.png");

console.log("brand assets generated ✅");
