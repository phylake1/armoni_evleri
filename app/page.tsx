import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import Hero from "@/components/Hero";
import PlanExplorer from "@/components/PlanExplorer";
import { fileSizeMB, getImage, listImages, type Img } from "@/lib/assets";
import { CONTACT, SITE_URL, mapsDirectionsUrl, whatsappLink } from "@/lib/site";
import { PLANS, TOTAL_UNITS, TYPE_IDS, ranges } from "@/lib/units";

// public/ altındaki dosyalar build sırasında okunur; sayfa statik kalmalı.
export const dynamic = "force-static";

const CATALOG = "armoni/pdf/mesby-armoni.pdf";

export default function Home() {
  const renders = listImages("renders");

  const keys = [
    PLANS.normal.imageKey,
    PLANS.roof.imageKey,
    ...(["normal", "roof"] as const).flatMap((p) => PLANS[p].types.map((t) => t.imageKey)),
  ];
  const planImages: Record<string, Img> = {};
  for (const key of keys) {
    const img = getImage(key);
    if (img) planImages[key] = img;
  }

  const r = ranges();
  const rangeText = (v: readonly [number, number]) => `${Math.round(v[0])} - ${Math.round(v[1])} m²`;
  const specs: [string, string][] = [
    ["Konum", "Arnavutköy, İstanbul"],
    ["Ulaşım", "İstanbul Havalimanı ve Kuzey Marmara Otoyolu'na kolay erişim"],
    ["Daireler", `${TOTAL_UNITS} daire, tamamı 2+1`],
    ["Kat başına", `${TYPE_IDS.length} daire`],
    ["Net alan", rangeText(r.net)],
    ["Brüt alan", rangeText(r.gross)],
    ["Site", "Güvenlikli site, kapalı otopark"],
    ["Bina", "Asansörlü"],
  ];

  const catalogSize = fileSizeMB(CATALOG);
  const catalogImage = getImage("renders/3") ?? renders[renders.length - 1];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: "Armoni Evleri",
    url: SITE_URL,
    numberOfAccommodationUnits: TOTAL_UNITS,
    address: { "@type": "PostalAddress", addressLocality: "Arnavutköy", addressRegion: "İstanbul", addressCountry: "TR" },
    provider: { "@type": "Organization", name: "Mesby Yapı", url: "https://www.mesbyyapi.com" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero images={renders} />

      <section id="genel-bakis" className="bg-white py-24 lg:py-36">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <h2 className="text-balance text-[clamp(2.1rem,4.4vw,3.75rem)] font-light leading-[1.06] tracking-[-0.025em] lg:col-span-7">
              Şehrin içinde, şehrin gürültüsünden uzakta.
            </h2>
            <div className="space-y-5 leading-relaxed text-walnut lg:col-span-4 lg:col-start-9 lg:pt-3">
              <p>
                Arnavutköy&apos;ün gelişen ve değer kazanan lokasyonunda konumlanan Armoni
                Evleri, modern yaşamın ihtiyaçlarını konfor, güvenlik ve prestij ile
                buluşturuyor.
              </p>
              <p>
                İstanbul Havalimanı ve Kuzey Marmara Otoyolu gibi şehrin önemli ulaşım
                akslarına kolay erişim sağlarken sakin ve huzurlu bir yaşam atmosferi
                sunuyor.
              </p>
              <p>
                Her katta yalnızca 6 daire yer alıyor. Bu da yaşam alanlarında daha fazla
                mahremiyet ve sakinlik demek.
              </p>
            </div>
          </div>

          <dl className="mt-20 grid border-t border-stone sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
            {specs.map(([label, value]) => (
              <div key={label} className="border-b border-stone py-6 pr-6">
                <dt className="text-sm text-walnut">{label}</dt>
                <dd className="mt-2 text-lg leading-snug">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <PlanExplorer images={planImages} />

      <section id="katalog" className="bg-espresso text-paper">
        <div className="grid lg:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-24 lg:py-32 lg:pl-[max(3rem,calc((100vw-82rem)/2+3rem))] lg:pr-16">
            <h2 className="text-[clamp(2.1rem,4vw,3.4rem)] font-light leading-[1.06] tracking-[-0.025em]">
              Dijital katalog
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-paper/70">
              Tüm kat planları, daire tipleri, oda ölçüleri ve proje görselleri 26 sayfalık
              katalogda.
            </p>
            <a
              href={`/${CATALOG}`}
              download
              className="mt-10 inline-flex w-fit items-center gap-3 bg-paper px-7 py-4 text-cacao transition-colors hover:bg-white"
            >
              Kataloğu indir
              <span className="text-sm text-walnut">PDF{catalogSize ? `, ${catalogSize} MB` : ""}</span>
            </a>
          </div>
          <div className="relative min-h-[320px] lg:min-h-[520px]">
            {catalogImage && (
              <Image
                src={catalogImage.src}
                alt="Armoni Evleri bina görünümü"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            )}
          </div>
        </div>
      </section>

      <section id="iletisim" className="bg-white py-24 lg:py-36">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="text-balance text-[clamp(2.1rem,4.4vw,3.75rem)] font-light leading-[1.06] tracking-[-0.025em]">
              Daire ve fiyat bilgisi için bize yazın.
            </h2>
            <a
              href={whatsappLink("Merhaba, Armoni Evleri hakkında bilgi almak istiyorum.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-3 bg-cacao px-7 py-4 text-paper transition-colors hover:bg-espresso"
            >
              <FaWhatsapp size={20} />
              WhatsApp ile yazın
            </a>
          </div>
          <dl className="grid gap-8 text-lg lg:col-span-4 lg:col-start-9">
            <div>
              <dt className="text-sm text-walnut">Telefon</dt>
              <dd className="mt-1">
                <a href={CONTACT.phoneHref} className="hover:text-copper">
                  {CONTACT.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-walnut">Satış ofisi</dt>
              <dd className="mt-1 leading-snug">
                <a
                  href={mapsDirectionsUrl(CONTACT.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-copper"
                >
                  {CONTACT.address}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-walnut">Çalışma saatleri</dt>
              <dd className="mt-1">{CONTACT.workingHours}</dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
