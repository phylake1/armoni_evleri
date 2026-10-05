// Sunucu tarafı yardımcılar: public/ klasöründeki dosyaları dosya adı
// kuralına göre bulur. Yalnızca server component'lerden çağrılmalıdır.
import fs from "node:fs";
import path from "node:path";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGE_EXTENSIONS = [".webp", ".jpg", ".jpeg", ".png", ".avif"];

function toPublicUrl(relativePath: string) {
  return encodeURI(`/${relativePath}`);
}

// "armoni/plans/kat-1" -> "/armoni/plans/kat-1.jpg" (uzantı otomatik bulunur)
export function findPublicImage(baseWithoutExt: string): string | undefined {
  for (const ext of IMAGE_EXTENSIONS) {
    if (fs.existsSync(path.join(PUBLIC_DIR, baseWithoutExt + ext))) {
      return toPublicUrl(baseWithoutExt + ext);
    }
  }
  return undefined;
}

// Klasördeki tüm görselleri dosya adına göre doğal sırada listeler.
export function listPublicImages(dir: string): string[] {
  const absolute = path.join(PUBLIC_DIR, dir);
  if (!fs.existsSync(absolute)) return [];

  return fs
    .readdirSync(absolute)
    .filter((file) => IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "tr", { numeric: true }))
    .map((file) => toPublicUrl(`${dir}/${file}`));
}

export function publicFileExists(relativePath: string): boolean {
  return fs.existsSync(path.join(PUBLIC_DIR, relativePath));
}
