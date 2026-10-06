"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import Lightbox from "./Lightbox";
import { GEOMETRY } from "@/lib/plan-geometry";
import { whatsappLink } from "@/lib/site";
import {
  PLANS,
  TYPE_IDS,
  fmt,
  unitNumbers,
  unitStatus,
  type PlanKey,
  type TypeId,
} from "@/lib/units";
import type { Img } from "@/lib/assets";

const HASH = /^#plan=(normal|roof)(?:-([A-F]))?$/;

function Badge({ id, active, small }: { id: TypeId; active?: boolean; small?: boolean }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full text-paper transition-colors ${
        small ? "h-7 w-7 text-sm" : "h-10 w-10 text-lg"
      } ${active ? "bg-cacao" : "bg-[#3b3633]"}`}
    >
      {id}
    </span>
  );
}

export default function PlanExplorer({ images }: { images: Record<string, Img> }) {
  const [plan, setPlan] = useState<PlanKey>("normal");
  const [selected, setSelected] = useState<TypeId | null>(null);
  const [hover, setHover] = useState<TypeId | null>(null);
  const [zoom, setZoom] = useState<{ src: string; title: string } | null>(null);
  const maskId = `veil-${useId().replace(/:/g, "")}`;
  const panelRef = useRef<HTMLDivElement>(null);
  const closeZoom = useCallback(() => setZoom(null), []);

  // Paylaşılan bağlantıdan açılış: #plan=normal-A
  useEffect(() => {
    const apply = () => {
      const m = window.location.hash.match(HASH);
      if (!m) return;
      setPlan(m[1] as PlanKey);
      setSelected((m[2] as TypeId) ?? null);
      document.getElementById("kat-planlari")?.scrollIntoView();
    };
    apply();
  }, []);

  const data = PLANS[plan];
  const geo = GEOMETRY[plan];
  // Bir tip seçiliyken vurgu hep o tiptir; hover yalnızca seçim yokken önizleme verir.
  const active = selected ?? hover;
  const planImage = images[data.imageKey];
  const type = selected ? data.types.find((t) => t.id === selected)! : null;
  const typeImage = type ? images[type.imageKey] : undefined;

  function choose(id: TypeId | null) {
    setSelected(id);
    if (!id) setHover(null);
    window.history.replaceState(null, "", id ? `#plan=${plan}-${id}` : "#kat-planlari");
    if (id && window.matchMedia("(max-width: 1023px)").matches) {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function switchPlan(key: PlanKey) {
    setPlan(key);
    setSelected(null);
    setHover(null);
    window.history.replaceState(null, "", "#kat-planlari");
  }

  const waLink = (text: string) => whatsappLink(`Merhaba, Armoni Evleri ${text} hakkında bilgi almak istiyorum.`);

  return (
    <section id="kat-planlari" className="bg-paper py-24 lg:py-36">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <h2 className="text-[clamp(2.1rem,4.4vw,3.75rem)] font-light leading-[1.06] tracking-[-0.025em]">
              Kat planları
            </h2>
            <p className="mt-4 max-w-md text-walnut">
              Planda bir daire tipine dokunun, oda ölçülerini ve metrekarelerini görün.
            </p>
          </div>
          <div role="tablist" aria-label="Kat seçimi" className="inline-flex self-start border border-cacao/30">
            {(Object.keys(PLANS) as PlanKey[]).map((key) => {
              const on = key === plan;
              return (
                <button
                  key={key}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  onClick={() => switchPlan(key)}
                  className={`min-w-36 px-5 py-3 text-left transition-colors ${
                    on ? "bg-cacao text-paper" : "hover:bg-cacao/5"
                  }`}
                >
                  <span className="block text-[0.95rem]">{PLANS[key].label}</span>
                  <span className={`block text-xs ${on ? "text-paper/70" : "text-walnut"}`}>
                    {PLANS[key].sublabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-8">
            <div className="lg:sticky lg:top-24">
              <svg
                viewBox={geo.viewBox}
                role="group"
                aria-label={`${data.label} planı`}
                className="block h-auto w-full select-none"
              >
                <defs>
                  <mask id={maskId}>
                    <rect x="0" y="0" width={geo.width} height={geo.height} fill="white" />
                    {active && (
                      <path d={geo.units[active].path} fill="black" fillRule="evenodd" />
                    )}
                  </mask>
                </defs>
                {planImage && (
                  <image
                    href={planImage.src}
                    x="0"
                    y="0"
                    width={geo.width}
                    height={geo.height}
                    preserveAspectRatio="none"
                  />
                )}
                <rect
                  x="0"
                  y="0"
                  width={geo.width}
                  height={geo.height}
                  fill="#f4f4ec"
                  opacity={active ? 0.76 : 0}
                  mask={`url(#${maskId})`}
                  pointerEvents="none"
                  style={{ transition: "opacity .35s ease" }}
                />
                {TYPE_IDS.map((id) => {
                  const t = data.types.find((x) => x.id === id)!;
                  return (
                    <path
                      key={id}
                      d={geo.units[id].path}
                      fillRule="evenodd"
                      fill="rgba(0,0,0,0)"
                      role="button"
                      tabIndex={0}
                      aria-pressed={selected === id}
                      aria-label={`${id} tipi, ${t.layout}, net ${fmt(t.net)} metrekare`}
                      className="cursor-pointer outline-none"
                      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(id)}
                      onPointerLeave={(e) => e.pointerType === "mouse" && setHover(null)}
                      onFocus={() => setHover(id)}
                      onBlur={() => setHover(null)}
                      onClick={() => choose(selected === id ? null : id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          choose(selected === id ? null : id);
                        }
                      }}
                    />
                  );
                })}
                {active && (
                  <path
                    d={geo.units[active].path}
                    fill="none"
                    fillRule="evenodd"
                    stroke="#603018"
                    strokeWidth={3}
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    pointerEvents="none"
                  />
                )}
                {TYPE_IDS.map((id) => {
                  const [bx, by] = geo.units[id].badge;
                  return (
                    <g
                      key={`badge-${id}`}
                      transform={`translate(${bx} ${by})`}
                      className="cursor-pointer"
                      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(id)}
                      onPointerLeave={(e) => e.pointerType === "mouse" && setHover(null)}
                      onClick={() => choose(selected === id ? null : id)}
                    >
                      <circle
                        r={44}
                        fill={active === id ? "#603018" : "#f4f4ec"}
                        stroke="#603018"
                        strokeWidth={4}
                        style={{ transition: "fill .25s" }}
                      />
                      <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={44}
                        fill={active === id ? "#f4f4ec" : "#603018"}
                        style={{ fontFamily: "inherit" }}
                      >
                        {id}
                      </text>
                    </g>
                  );
                })}
              </svg>
              {planImage && (
                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setZoom({ src: planImage.src, title: `${data.label} planı` })}
                    className="text-sm underline underline-offset-4 hover:text-copper"
                  >
                    Planı büyüt
                  </button>
                </div>
              )}
            </div>
          </div>

          <div ref={panelRef} className="lg:col-span-4">
            <div key={`${plan}-${selected ?? "liste"}`} className="panel-in">
              {!type ? (
                <>
                  <h3 className="text-2xl font-light tracking-tight">Daire tipleri</h3>
                  <p className="mt-2 text-sm text-walnut">
                    {plan === "normal"
                      ? "Her normal katta 6 daire var, tamamı 2+1."
                      : "Çatı katında 6 daire var, tamamı 2+1."}
                  </p>
                  <ul className="mt-6 border-t border-stone">
                    {data.types.map((t) => (
                      <li key={t.id}>
                        <button
                          type="button"
                          onClick={() => choose(t.id)}
                          onPointerEnter={(e) => e.pointerType === "mouse" && setHover(t.id)}
                          onPointerLeave={(e) => e.pointerType === "mouse" && setHover(null)}
                          className="flex w-full items-center gap-4 border-b border-stone py-4 text-left transition-colors hover:bg-linen"
                        >
                          <Badge id={t.id} active={hover === t.id} />
                          <span className="flex-1">
                            <span className="block">{t.id} tipi</span>
                            <span className="block text-sm text-walnut">{t.layout}</span>
                          </span>
                          <span className="text-right">
                            <span className="block text-lg font-light tabular-nums">
                              {fmt(t.net)} m²
                            </span>
                            <span className="block text-xs text-walnut">
                              {fmt(t.gross)} m² brüt
                            </span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => choose(null)}
                    className="text-sm text-walnut underline-offset-4 hover:underline"
                  >
                    Tüm tipler
                  </button>
                  <div className="mt-4 flex items-end gap-3">
                    <span className="text-6xl font-light leading-none tracking-tight">{type.id}</span>
                    <span className="pb-1 text-xl">tipi</span>
                    <span className="ml-auto pb-1 text-xl font-light">{type.layout}</span>
                  </div>

                  <dl className="mt-6 grid grid-cols-2 border-y border-stone">
                    <div className="py-4 pr-4">
                      <dt className="text-sm text-walnut">Net alan</dt>
                      <dd className="mt-1 text-3xl font-light tabular-nums">{fmt(type.net)} m²</dd>
                    </div>
                    <div className="border-l border-stone py-4 pl-5">
                      <dt className="text-sm text-walnut">Brüt alan</dt>
                      <dd className="mt-1 text-3xl font-light tabular-nums">{fmt(type.gross)} m²</dd>
                    </div>
                  </dl>

                  {typeImage && (
                    <button
                      type="button"
                      onClick={() =>
                        setZoom({
                          src: typeImage.src,
                          title: `${data.label}, ${type.id} tipi planı`,
                        })
                      }
                      aria-label={`${type.id} tipi planını büyüt`}
                      className="relative mt-6 block w-full border border-stone bg-white"
                      style={{
                        aspectRatio: typeImage.width ? `${typeImage.width} / ${typeImage.height}` : "4 / 3",
                      }}
                    >
                      <Image
                        src={typeImage.src}
                        alt={`${type.id} tipi daire planı`}
                        fill
                        sizes="(min-width: 1024px) 380px, 100vw"
                        className="object-contain p-3"
                      />
                    </button>
                  )}

                  <h4 className="mt-8 text-base font-medium">Oda ölçüleri</h4>
                  <table className="mt-2 w-full text-sm">
                    <tbody>
                      {type.rooms.map((r) => (
                        <tr key={r.name} className="border-b border-stone">
                          <th scope="row" className="py-2.5 text-left font-normal">
                            {r.name}
                          </th>
                          <td className="py-2.5 text-right tabular-nums">{fmt(r.m2)} m²</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <h4 className="mt-8 text-base font-medium">
                    {plan === "normal" ? "Bu tipteki daireler" : "Bu tipteki daire"}
                  </h4>
                  <ul className="mt-2 border-t border-stone">
                    {unitNumbers(plan, type.id).map((u) => {
                      const free = unitStatus(u.number) === "musait";
                      return (
                        <li
                          key={u.number}
                          className="flex items-center gap-4 border-b border-stone py-3 text-sm"
                        >
                          <span className="w-20 font-medium">Daire {u.number}</span>
                          <span className="flex-1 text-walnut">{u.floor}</span>
                          <span className={`inline-flex items-center gap-2 ${free ? "" : "text-walnut"}`}>
                            <span
                              className={`h-2 w-2 rounded-full ${
                                free ? "bg-cacao" : "border border-walnut"
                              }`}
                            />
                            {free ? "Müsait" : "Satıldı"}
                          </span>
                          {free && (
                            <a
                              href={waLink(`${u.number} numaralı daire (${data.label}, ${type.id} tipi)`)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline underline-offset-4 hover:text-copper"
                            >
                              Bilgi al
                            </a>
                          )}
                        </li>
                      );
                    })}
                  </ul>

                  <a
                    href={waLink(`${data.label} ${type.id} tipi (${type.layout}) daireler`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex w-full items-center justify-center gap-2 bg-cacao px-6 py-4 text-paper transition-colors hover:bg-espresso"
                  >
                    <FaWhatsapp size={18} />
                    {type.id} tipi için WhatsApp&apos;tan yazın
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {zoom && <Lightbox src={zoom.src} title={zoom.title} onClose={closeZoom} />}
    </section>
  );
}
