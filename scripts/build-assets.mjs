// Orijinal render ve plan görsellerinden (PNG, onlarca MB) web için optimize WebP
// sürümleri üretir ve manifest.json yazar. `npm run dev` ve `npm run build`
// öncesinde otomatik çalışır; çıktı public/armoni/_web altındadır (git'e girmez).
import fs from "node:fs/promises";
import { existsSync, statSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "public/armoni");
const OUT = path.join(SRC, "_web");
const EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);

const JOBS = [
  { dir: "renders", width: 2560, webp: { quality: 80 }, blur: true },
  { dir: "plans", width: 3200, webp: { quality: 90, alphaQuality: 100 }, blur: false },
];

async function walk(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (EXT.has(path.extname(entry.name).toLowerCase())) out.push(full);
  }
  return out.sort((a, b) => a.localeCompare(b, "tr", { numeric: true }));
}

const manifest = {};
const originals = [];
let ogSource = null;

for (const job of JOBS) {
  for (const file of await walk(path.join(SRC, job.dir))) {
    const key = path.relative(SRC, file).split(path.sep).join("/").replace(/\.[^.]+$/, "");
    const out = path.join(OUT, `${key}.webp`);
    await fs.mkdir(path.dirname(out), { recursive: true });
    originals.push(file);
    if (job.dir === "renders" && !ogSource) ogSource = file;

    if (!existsSync(out) || statSync(out).mtimeMs < statSync(file).mtimeMs) {
      await sharp(file, { limitInputPixels: false })
        .rotate()
        .resize({ width: job.width, withoutEnlargement: true })
        .webp(job.webp)
        .toFile(out);
      console.log(`optimize: ${key}`);
    }

    const meta = await sharp(out).metadata();
    const entry = { src: `/armoni/_web/${key}.webp`, width: meta.width, height: meta.height };
    if (job.blur) {
      const buf = await sharp(out).resize(24).blur(1).jpeg({ quality: 55 }).toBuffer();
      entry.blur = `data:image/jpeg;base64,${buf.toString("base64")}`;
    }
    manifest[key] = entry;
  }
}

// Sosyal paylaşım önizlemesi (1200x630 JPEG).
if (ogSource) {
  await sharp(ogSource, { limitInputPixels: false })
    .resize(1200, 630, { fit: "cover", position: "attention" })
    .jpeg({ quality: 82 })
    .toFile(path.join(OUT, "og.jpg"));
}

await fs.writeFile(path.join(OUT, "manifest.json"), JSON.stringify(manifest));
console.log(`build-assets: ${Object.keys(manifest).length} görsel hazır`);

// Vercel'de orijinaller dağıtıma girmesin (yüzlerce MB). Yerelde dokunulmaz.
if (process.env.VERCEL && !process.env.KEEP_ORIGINALS) {
  for (const file of originals) await fs.rm(file, { force: true });
  console.log(`build-assets: ${originals.length} orijinal dağıtımdan çıkarıldı`);
}
