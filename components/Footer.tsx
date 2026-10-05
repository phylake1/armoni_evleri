import Link from "next/link";
import { CONTACT, PARENT } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white/70">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-stapel text-2xl tracking-wide text-white">
            <span className="font-medium">ARMONİ </span>
            <span className="font-light">EVLERİ</span>
          </p>
          <p className="mt-4 max-w-xs text-sm">
            Mesby Yapı&apos;nın konut projesi. Kat planları ve güncel satış
            durumu bu sayfada.
          </p>
          <a
            href={PARENT.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block text-sm font-semibold text-white underline-offset-4 hover:underline"
          >
            {PARENT.name} →
          </a>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white">
            Hızlı Bağlantılar
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/#genel-bakis" className="hover:text-white">
                Genel Bakış
              </Link>
            </li>
            <li>
              <Link href="/#kat-planlari" className="hover:text-white">
                Kat Planları
              </Link>
            </li>
            <li>
              <Link href="/#iletisim" className="hover:text-white">
                İletişim
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white">
            İletişim
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>{CONTACT.address}</li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="hover:text-white">
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a href={CONTACT.phoneHref} className="hover:text-white">
                {CONTACT.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs">
        © {new Date().getFullYear()} {PARENT.name}. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
