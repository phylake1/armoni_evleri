import ArmoniLogo from "./ArmoniLogo";
import { CONTACT, PARENT } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-espresso text-paper/70">
      <div className="container-page py-16 lg:py-20">
        <div className="flex flex-wrap items-center gap-6">
          <a
            href={PARENT.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-stapel text-2xl tracking-wide text-paper/85"
          >
            MESBY YAPI
          </a>
          <span aria-hidden className="h-8 w-px bg-paper/30" />
          <ArmoniLogo className="h-5 w-auto text-paper" />
        </div>

        <div className="mt-10 grid gap-10 text-sm leading-relaxed lg:grid-cols-12">
          <p className="max-w-md lg:col-span-5">
            Mesby Yapı, 2016 yılından bu yana Türkiye genelinde konut ve gayrimenkul
            geliştirme alanında faaliyet gösteren bir inşaat firmasıdır. Armoni Evleri
            Mesby Yapı projesidir.
          </p>
          <address className="not-italic lg:col-span-4 lg:col-start-7">
            {CONTACT.address}
            <br />
            <a href={`mailto:${CONTACT.email}`} className="hover:text-paper">
              {CONTACT.email}
            </a>
            <br />
            <a href={CONTACT.phoneHref} className="hover:text-paper">
              {CONTACT.phoneDisplay}
            </a>
          </address>
        </div>

        <p className="mt-14 border-t border-paper/15 pt-6 text-xs">
          © {new Date().getFullYear()} {PARENT.name}. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
