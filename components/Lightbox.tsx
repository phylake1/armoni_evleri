"use client";

import { useEffect, useState } from "react";

export default function Lightbox({
  src,
  title,
  onClose,
}: {
  src: string;
  title: string;
  onClose: () => void;
}) {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[60] flex flex-col bg-black/95 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 text-white sm:px-6">
        <p className="truncate text-sm font-medium">{title}</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setZoomed((z) => !z)}
            className="rounded-full border border-white/30 px-4 py-1.5 text-xs font-semibold transition-colors hover:bg-white/10"
          >
            {zoomed ? "Sığdır" : "Yakınlaştır"}
          </button>
          <button
            type="button"
            aria-label="Kapat"
            onClick={onClose}
            autoFocus
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-lg transition-colors hover:bg-white/10"
          >
            ×
          </button>
        </div>
      </div>

      <div
        className="min-h-0 flex-1 overflow-auto p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={title}
          className={
            zoomed
              ? "mx-auto w-[220%] max-w-none rounded-lg bg-white sm:w-[160%]"
              : "mx-auto max-w-full rounded-lg bg-white object-contain"
          }
          style={zoomed ? undefined : { maxHeight: "calc(100vh - 6.5rem)" }}
        />
      </div>
    </div>
  );
}
