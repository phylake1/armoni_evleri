// Sunucu tarafı: build sırasında scripts/build-assets.mjs'in ürettiği optimize
// görsellerin kataloğunu okur. Yalnızca server component'lerden çağrılmalıdır.
import fs from "node:fs";
import path from "node:path";

export type Img = { src: string; width: number; height: number; blur?: string };

let cache: Record<string, Img> | null = null;

function manifest(): Record<string, Img> {
  if (cache) return cache;
  try {
    cache = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "public/armoni/_web/manifest.json"), "utf8"),
    );
  } catch {
    cache = {};
  }
  return cache!;
}

// key örn: "renders/1", "plans/normal/A-tip" (public/armoni altındaki yol, uzantısız)
export function getImage(key: string): Img | undefined {
  const hit = manifest()[key];
  if (hit) return hit;
  for (const ext of [".png", ".jpg", ".jpeg", ".webp"]) {
    const rel = `armoni/${key}${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", rel))) {
      return { src: encodeURI(`/${rel}`), width: 0, height: 0 };
    }
  }
  return undefined;
}

export function listImages(dir: string): Img[] {
  return Object.keys(manifest())
    .filter((k) => k.startsWith(`${dir}/`))
    .sort((a, b) => a.localeCompare(b, "tr", { numeric: true }))
    .map((k) => manifest()[k]);
}

export function fileSizeMB(relativePath: string): string | undefined {
  try {
    const bytes = fs.statSync(path.join(process.cwd(), "public", relativePath)).size;
    return (bytes / 1024 / 1024).toLocaleString("tr-TR", { maximumFractionDigits: 1 });
  } catch {
    return undefined;
  }
}
