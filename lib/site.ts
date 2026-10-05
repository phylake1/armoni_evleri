// Armoni Evleri alt alan adı (production). Vercel'e domain bağlandığında
// canonical / OG / sitemap bu adrese göre üretilir.
export const SITE_URL = "https://armoni.mesbyyapi.com";
export const SITE_NAME = "Armoni Evleri";

// Ana şirket (Mesby Yapı) bilgileri.
export const PARENT = {
  name: "Mesby Yapı",
  url: "https://www.mesbyyapi.com",
};

// Satış / iletişim bilgileri (Mesby Yapı ofisi).
export const CONTACT = {
  phoneDisplay: "0 542 122 48 47",
  phoneHref: "tel:+905421224847",
  whatsappNumber: "905421224847",
  email: "info@mesbyyapi.com",
  address: "Cevatpaşa, 100. Yıl Cd No:18, 34100 Bayrampaşa/İstanbul",
  workingHours: "Pazartesi - Cumartesi, 09:00 - 17:00",
  instagram: "https://instagram.com/mesbyyapi",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function mapsDirectionsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
