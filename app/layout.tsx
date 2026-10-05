import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

// Türkçe karakterler (ğ, ş, İ, ı) için "latin-ext" alt kümesi gereklidir.
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const DESCRIPTION =
  "Mesby Yapı'nın Armoni Evleri projesi: kat planları, daire planları ve güncel satış durumu.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Armoni Evleri | Mesby Yapı",
    template: "%s | Armoni Evleri",
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: "Armoni Evleri | Mesby Yapı",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Armoni Evleri | Mesby Yapı",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={montserrat.variable}>
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
