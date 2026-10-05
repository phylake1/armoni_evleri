"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const INTERVAL = 6500;

export default function HeroSlider({
  images,
  kicker,
  title,
  text,
  primary,
  secondary,
}: {
  images: string[];
  kicker: string;
  title: string;
  text: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string; external?: boolean };
}) {
  const count = images.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (count < 2 || paused) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL);
    return () => clearInterval(timer);
  }, [count, paused]);

  const prev = () => setIndex((i) => (i - 1 + count) % count);
  const next = () => setIndex((i) => (i + 1) % count);

  function onTouchEnd(clientX: number) {
    if (touchStartX.current == null || count < 2) return;
    const dx = clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) > 50) {
      if (dx < 0) next();
      else prev();
    }
  }

  return (
    <section
      aria-label={`${title} render görselleri`}
      className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-neutral-950"
      onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setPaused(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => onTouchEnd(e.changedTouches[0].clientX)}
    >
      {count === 0 ? (
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-600" />
      ) : (
        images.map((src, i) => (
          <div
            key={src}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt={`${title} render ${i + 1}`}
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover motion-safe:transition-transform motion-safe:duration-[8000ms] motion-safe:ease-out ${
                i === index ? "scale-100" : "scale-105"
              }`}
            />
          </div>
        ))
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/45" />

      <div className="container-page relative z-10 flex h-full flex-col justify-end pb-28 sm:pb-32">
        <div className="animate-fade-in max-w-3xl">
          <span className="inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white/90">
            {kicker}
          </span>
          <h1 className="mt-6 text-balance font-stapel text-5xl font-medium uppercase leading-tight tracking-wide text-white sm:text-7xl">
            {title}
          </h1>
          <p className="mt-5 max-w-lg text-base text-white/80 sm:text-lg">
            {text}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={primary.href}
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-neutral-200"
            >
              {primary.label}
            </Link>
            <a
              href={secondary.href}
              {...(secondary.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {secondary.label}
            </a>
          </div>
        </div>
      </div>

      {count > 1 && (
        <div className="absolute inset-x-0 bottom-8 z-10">
          <div className="container-page flex items-center gap-6 text-white">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold tabular-nums tracking-widest">
                {String(index + 1).padStart(2, "0")}
                <span className="text-white/50">
                  {" "}
                  / {String(count).padStart(2, "0")}
                </span>
              </span>
              <div className="flex items-center gap-2">
                {images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    aria-label={`${i + 1}. görsel`}
                    aria-current={i === index}
                    onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index ? "w-8 bg-white" : "w-3 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="hidden items-center gap-3 sm:flex">
              <button
                type="button"
                aria-label="Önceki görsel"
                onClick={prev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white/10"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Sonraki görsel"
                onClick={next}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white/10"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
