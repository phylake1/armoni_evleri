import { FaWhatsapp } from "react-icons/fa";
import FloorPlans from "@/components/FloorPlans";
import HeroSlider from "@/components/HeroSlider";
import SectionHeader from "@/components/SectionHeader";
import { listPublicImages, publicFileExists } from "@/lib/assets";
import { resolveFloors } from "@/lib/floors";
import { PROJECT } from "@/lib/project";
import { CONTACT, mapsDirectionsUrl, whatsappLink } from "@/lib/site";

// public/ altındaki dosyalar build sırasında okunur; sayfa statik kalmalı.
export const dynamic = "force-static";

export default function Home() {
  const renders = listPublicImages("armoni/renders");
  const floors = resolveFloors();
  const hasCatalog = publicFileExists("armoni/katalog.pdf");

  const allApartments = floors.flatMap((f) => f.apartments);
  const stats: { label: string; value: string }[] = [];
  if (allApartments.length > 0) {
    stats.push({ label: "Toplam Daire", value: String(allApartments.length) });
    stats.push({
      label: "Müsait Daire",
      value: String(allApartments.filter((a) => a.status === "musait").length),
    });
  }
  stats.push(...PROJECT.facts);

  return (
    <>
      <HeroSlider
        images={renders}
        kicker="Mesby Yapı"
        title={PROJECT.name}
        text={PROJECT.tagline}
        primary={{ href: "/#kat-planlari", label: "Kat Planlarını İnceleyin" }}
        secondary={{
          href: whatsappLink(`Merhaba, ${PROJECT.name} hakkında bilgi almak istiyorum.`),
          label: "WhatsApp ile Bilgi Alın",
          external: true,
        }}
      />

      <section id="genel-bakis" className="py-20 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <SectionHeader
              kicker="Genel Bakış"
              title={PROJECT.name}
              description={PROJECT.description}
            />
            {PROJECT.generalStatus && (
              <div className="mt-8 inline-flex items-start gap-3 rounded-2xl border border-neutral-200 px-5 py-4">
                <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                    Projenin Genel Durumu
                  </p>
                  <p className="mt-1 font-semibold text-neutral-950">
                    {PROJECT.generalStatus.label}
                  </p>
                  {PROJECT.generalStatus.note && (
                    <p className="text-sm text-neutral-500">
                      {PROJECT.generalStatus.note}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {stats.length > 0 && (
            <dl className="grid grid-cols-2 gap-4 lg:col-span-2">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl bg-neutral-50 p-5">
                  <dt className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                    {s.label}
                  </dt>
                  <dd className="mt-2 text-2xl font-bold text-neutral-950">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      <FloorPlans floors={floors} />

      {hasCatalog && (
        <section className="py-16">
          <div className="container-page">
            <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-neutral-950 px-8 py-10 text-white sm:flex-row sm:items-center">
              <div>
                <h2 className="text-2xl font-bold">Proje Kataloğu</h2>
                <p className="mt-2 text-white/70">
                  Tüm plan ve detaylar için kataloğu PDF olarak indirin.
                </p>
              </div>
              <a
                href="/armoni/katalog.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-neutral-200"
              >
                Kataloğu İndir (PDF)
              </a>
            </div>
          </div>
        </section>
      )}

      <section id="iletisim" className="bg-neutral-950 py-20 text-white lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              tone="dark"
              kicker="İletişim"
              title="Daire bilgisi için bizimle iletişime geçin"
              description="Müsait daireler, metrekare detayları ve satış koşulları için WhatsApp üzerinden hemen yazabilirsiniz."
            />
            <a
              href={whatsappLink(`Merhaba, ${PROJECT.name} hakkında bilgi almak istiyorum.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-neutral-200"
            >
              <FaWhatsapp size={18} />
              WhatsApp ile Yazın
            </a>
          </div>

          <dl className="space-y-6 text-sm">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-white/60">
                Telefon
              </dt>
              <dd className="mt-1">
                <a href={CONTACT.phoneHref} className="hover:underline">
                  {CONTACT.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-white/60">
                E-posta
              </dt>
              <dd className="mt-1">
                <a href={`mailto:${CONTACT.email}`} className="hover:underline">
                  {CONTACT.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-white/60">
                Adres
              </dt>
              <dd className="mt-1">
                <a
                  href={mapsDirectionsUrl(CONTACT.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {CONTACT.address}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-white/60">
                Çalışma Saatleri
              </dt>
              <dd className="mt-1">{CONTACT.workingHours}</dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
