"use client";

import Image from "next/image";
import { useCallback, useState, type KeyboardEvent } from "react";
import { FaWhatsapp } from "react-icons/fa";
import Lightbox from "./Lightbox";
import SectionHeader from "./SectionHeader";
import { PROJECT } from "@/lib/project";
import { whatsappLink } from "@/lib/site";
import type { ResolvedApartment, ResolvedFloor } from "@/lib/floors";

function StatusBadge({ status }: { status: ResolvedApartment["status"] }) {
  const available = status === "musait";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        available ? "bg-emerald-50 text-emerald-700" : "bg-neutral-900 text-white"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          available ? "bg-emerald-500" : "bg-white/70"
        }`}
      />
      {available ? "Müsait" : "Satıldı"}
    </span>
  );
}

function PlanFrame({
  src,
  alt,
  onOpen,
  className = "",
}: {
  src?: string;
  alt: string;
  onOpen: () => void;
  className?: string;
}) {
  if (!src) {
    return (
      <div
        className={`flex items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-6 text-center text-sm text-neutral-400 ${className}`}
      >
        Plan görseli yakında eklenecek
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${alt} - büyüt`}
      className={`group relative block overflow-hidden rounded-2xl border border-neutral-200 bg-white ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 720px, 100vw"
        className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <span className="absolute bottom-3 right-3 rounded-full bg-neutral-950/80 px-3 py-1 text-xs font-semibold text-white sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
        Büyüt
      </span>
    </button>
  );
}

function ApartmentCard({
  apt,
  floorLabel,
  onOpenPlan,
}: {
  apt: ResolvedApartment;
  floorLabel: string;
  onOpenPlan: (src: string, title: string) => void;
}) {
  const sold = apt.status === "satildi";
  const title = `${floorLabel} · ${apt.name}`;

  const details: { label: string; value: string }[] = [];
  if (apt.grossM2 != null) details.push({ label: "Brüt", value: `${apt.grossM2} m²` });
  if (apt.netM2 != null) details.push({ label: "Net", value: `${apt.netM2} m²` });
  if (apt.balconyM2 != null) details.push({ label: "Balkon", value: `${apt.balconyM2} m²` });
  if (apt.facing) details.push({ label: "Cephe", value: apt.facing });

  return (
    <article
      className={`rounded-2xl border border-neutral-200 bg-white p-5 ${
        sold ? "opacity-80" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-lg font-bold text-neutral-950">{apt.name}</h4>
          {apt.type && <p className="text-sm text-neutral-500">{apt.type}</p>}
        </div>
        <StatusBadge status={apt.status} />
      </div>

      {apt.image && (
        <PlanFrame
          src={apt.image}
          alt={`${title} planı`}
          onOpen={() => onOpenPlan(apt.image!, `${title} planı`)}
          className="mt-4 aspect-[4/3] w-full"
        />
      )}

      {details.length > 0 ? (
        <dl className="mt-4 grid grid-cols-2 gap-3">
          {details.map((d) => (
            <div key={d.label} className="rounded-xl bg-neutral-50 px-3 py-2">
              <dt className="text-xs text-neutral-500">{d.label}</dt>
              <dd className="text-sm font-semibold text-neutral-950">{d.value}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="mt-4 text-sm text-neutral-500">
          Metrekare ve detaylar için WhatsApp&apos;tan bize ulaşın.
        </p>
      )}

      {!sold && (
        <a
          href={whatsappLink(
            `Merhaba, ${PROJECT.name} ${floorLabel} ${apt.name} hakkında bilgi almak istiyorum.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
        >
          <FaWhatsapp size={18} />
          Bilgi Al
        </a>
      )}
    </article>
  );
}

export default function FloorPlans({ floors }: { floors: ResolvedFloor[] }) {
  const [activeKey, setActiveKey] = useState(floors[0]?.key);
  const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  if (floors.length === 0) return null;

  const active = floors.find((f) => f.key === activeKey) ?? floors[0];
  const total = active.apartments.length;
  const available = active.apartments.filter((a) => a.status === "musait").length;

  function onTabKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const i = floors.findIndex((f) => f.key === active.key);
    const nextIndex =
      e.key === "ArrowRight"
        ? (i + 1) % floors.length
        : (i - 1 + floors.length) % floors.length;
    setActiveKey(floors[nextIndex].key);
    document.getElementById(`tab-${floors[nextIndex].key}`)?.focus();
  }

  return (
    <section id="kat-planlari" className="bg-neutral-50 py-20 lg:py-28">
      <div className="container-page">
        <SectionHeader
          kicker="Kat Planları"
          title="Katları ve Daireleri İnceleyin"
          description="Kat sekmelerinden planı seçin, görsele tıklayarak büyütün."
        />

        <div
          role="tablist"
          aria-label="Katlar"
          onKeyDown={onTabKeyDown}
          className="scrollbar-none -mx-6 mt-10 flex gap-2 overflow-x-auto px-6 pb-2 lg:mx-0 lg:px-0"
        >
          {floors.map((floor) => {
            const selected = floor.key === active.key;
            return (
              <button
                key={floor.key}
                id={`tab-${floor.key}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${floor.key}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveKey(floor.key)}
                className={`shrink-0 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${
                  selected
                    ? "bg-neutral-950 text-white"
                    : "border border-neutral-300 bg-white text-neutral-600 hover:border-neutral-950"
                }`}
              >
                {floor.tabLabel}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`panel-${active.key}`}
          aria-labelledby={`tab-${active.key}`}
          className="mt-8 grid gap-8 lg:grid-cols-5"
        >
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <PlanFrame
                src={active.image}
                alt={`${active.label} planı`}
                onOpen={() =>
                  active.image &&
                  setLightbox({ src: active.image, title: `${active.label} planı` })
                }
                className="aspect-[4/3] w-full"
              />
              <p className="mt-3 text-sm text-neutral-500">
                {active.label} planı
                {active.image && " · büyütmek için görsele tıklayın"}
              </p>
            </div>
          </div>

          <div className="space-y-5 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-neutral-950">{active.label}</h3>
              {total > 0 && (
                <span className="text-sm text-neutral-500">
                  {total} daire · {available} müsait
                </span>
              )}
            </div>

            {total > 0 ? (
              active.apartments.map((apt) => (
                <ApartmentCard
                  key={apt.id}
                  apt={apt}
                  floorLabel={active.label}
                  onOpenPlan={(src, title) => setLightbox({ src, title })}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                <p className="text-sm text-neutral-500">
                  Bu kata ait daire bilgileri yakında eklenecek. Detaylar için
                  WhatsApp&apos;tan bize ulaşabilirsiniz.
                </p>
                <a
                  href={whatsappLink(
                    `Merhaba, ${PROJECT.name} ${active.label} hakkında bilgi almak istiyorum.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
                >
                  <FaWhatsapp size={18} />
                  WhatsApp ile Bilgi Al
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {lightbox && (
        <Lightbox src={lightbox.src} title={lightbox.title} onClose={closeLightbox} />
      )}
    </section>
  );
}
