"use client";

import { useEffect, useState } from "react";
import ArmoniLogo from "./ArmoniLogo";

const LINKS = [
  { href: "#genel-bakis", label: "Proje" },
  { href: "#kat-planlari", label: "Kat planları" },
  { href: "#katalog", label: "Katalog" },
  { href: "#iletisim", label: "İletişim" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const solid = scrolled || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          solid
            ? "bg-paper/95 text-cacao shadow-[0_1px_0_0_var(--stone)] backdrop-blur"
            : "text-paper"
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between">
          <a href="#top" aria-label="Armoni Evleri, sayfa başı">
            <ArmoniLogo className="h-[17px] w-auto sm:h-[19px]" />
          </a>
          <nav className="hidden items-center gap-10 text-sm lg:flex" aria-label="Ana menü">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="opacity-85 transition-opacity hover:opacity-100">
                {l.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobil-menu"
            onClick={() => setOpen((v) => !v)}
            className="text-sm lg:hidden"
          >
            {open ? "Kapat" : "Menü"}
          </button>
        </div>
      </header>

      <div
        id="mobil-menu"
        inert={!open}
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-paper px-6 pt-24 text-cacao transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col" aria-label="Mobil menü">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-stone py-5 text-3xl font-light tracking-tight"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
