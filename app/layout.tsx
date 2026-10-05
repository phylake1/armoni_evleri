import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

// Stapel yalnızca "MESBY YAPI" yazısında kullanılır. Gövde metni Helvetica'dır
// (bkz. globals.css), ARMONİ EVLERİ logosu ise SVG'dir.
const stapel = localFont({
  src: "../public/fonts/Stapel-Regular.ttf",
  variable: "--font-stapel-face",
  weight: "400",
  display: "swap",
});

const TITLE = "Armoni Evleri | Arnavutköy'de 2+1 daireler, kat planları";
const DESCRIPTION =
  "Mesby Yapı'nın Arnavutköy'deki projesi Armoni Evleri: her katta 6 daire, 30 adet 2+1. Kat planlarını, daire tiplerini ve m² bilgilerini inceleyin.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s | Armoni Evleri" },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/armoni/_web/og.jpg", width: 1200, height: 630, alt: "Armoni Evleri" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/armoni/_web/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={stapel.variable}>
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
