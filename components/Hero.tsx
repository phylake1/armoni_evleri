"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ArmoniLogo from "./ArmoniLogo";
import type { Img } from "@/lib/assets";

const ALTS = ["Armoni Evleri cephe görünümü", "Armoni Evleri köşe görünümü"];

export default function Hero({ images }: { images: Img[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % images.length), 8000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section
      id="top"
      aria-label="Armoni Evleri"
      className="relative h-[100svh] min-h-[620px] overflow-hidden bg-espresso text-paper"
    >
      {images.map((img, i) => (
        <div
          key={img.src}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={img.src}
            alt={ALTS[i] ?? "Armoni Evleri"}
            fill
            priority={i === 0}
            sizes="100vw"
            placeholder={img.blur ? "blur" : "empty"}
            blurDataURL={img.blur}
            className="object-cover"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/10 to-espresso/40" />

      <div className="container-page relative z-10 flex h-full flex-col justify-end pb-14 sm:pb-20">
        <h1 className="sr-only">Armoni Evleri</h1>
        <ArmoniLogo className="hero-logo w-[min(88vw,640px)] text-paper" />
        <p className="hero-tagline mt-6 text-[1.4rem] font-light tracking-[0.01em] text-paper/90 sm:text-[1.7rem]">
          Bir evden fazlası
        </p>
      </div>

      <dl className="absolute bottom-14 right-6 z-10 hidden text-right text-sm text-paper/85 lg:bottom-20 lg:right-12 lg:block">
        <div>
          <dt className="text-paper/60">Konum</dt>
          <dd>Arnavutköy, İstanbul</dd>
        </div>
        <div className="mt-4">
          <dt className="text-paper/60">Daireler</dt>
          <dd>30 adet, tamamı 2+1</dd>
        </div>
      </dl>
    </section>
  );
}
