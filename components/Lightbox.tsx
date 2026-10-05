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
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[60] flex flex-col bg-espresso/95 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 text-paper sm:px-6">
        <p className="truncate text-sm">{title}</p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setZoomed((z) => !z)}
            className="border border-paper/40 px-4 py-1.5 text-xs transition-colors hover:bg-paper/10"
          >
            {zoomed ? "Sığdır" : "Yakınlaştır"}
          </button>
          <button
            type="button"
            aria-label="Kapat"
            onClick={onClose}
            autoFocus
            className="flex h-9 w-9 items-center justify-center border border-paper/40 text-lg leading-none transition-colors hover:bg-paper/10"
          >
            ×
          </button>
        </div>
      </div>
      <div
        className="min-h-0 flex-1 overflow-auto p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={title}
          className={
            zoomed
              ? "mx-auto w-[230%] max-w-none bg-white sm:w-[165%]"
              : "mx-auto max-w-full bg-white object-contain"
          }
          style={zoomed ? undefined : { maxHeight: "calc(100vh - 6.5rem)" }}
        />
      </div>
    </div>
  );
}
