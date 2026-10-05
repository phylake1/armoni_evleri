# Armoni Evleri

`armoni.mesbyyapi.com` için Mesby Yapı'nın Armoni Evleri proje sayfası.
Next.js 16 (App Router) + Tailwind CSS 4. Backend yok, tamamen statik.

## Çalıştırma

```bash
npm install
npm run dev
```

## İçerik klasör düzeni

Görseller dosya adı kuralıyla **otomatik** bulunur, kodda yol yazmaya gerek yok.
Dosya adlarını küçük harf ve tire ile yazın (boşluk ve Türkçe karakter kullanmayın).

```
public/
  fonts/
    Stapel-Light.ttf, Stapel-Regular.ttf,
    Stapel-Medium.ttf, Stapel-Bold.ttf     <- mesby_web/app/fonts içinden kopyalayın
  armoni/
    katalog.pdf                            <- varsa "Kataloğu İndir" bölümü görünür
    renders/
      01-cephe.jpg, 02-salon.jpg, ...      <- hero slider; dosya adı sırasına göre
    plans/
      kat-1.jpg  kat-2.jpg  kat-3.jpg  kat-4.jpg  cati.jpg   <- kat planları
      kat-1-daire-1.jpg  kat-1-daire-2.jpg ...               <- daire planları (opsiyonel)
```

Kabul edilen uzantılar: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`.

## Veri

- `lib/project.ts`: proje adı, açıklama, genel durum, ek bilgiler (konum, teslim vb.)
- `lib/plans.ts`: katlar ve daireler (tip, brüt/net m², balkon, cephe, Müsait/Satıldı)
- `lib/site.ts`: domain ve iletişim bilgileri

Boş bırakılan alanlar sayfada gösterilmez. Daire için görsel eklemek istiyorsanız
`lib/plans.ts` içindeki daire `id` değeriyle aynı adda bir dosya koyun
(örn. `id: "kat-1-daire-1"` -> `public/armoni/plans/kat-1-daire-1.jpg`).

## Yayına alma

1. Vercel'de bu repoyu yeni proje olarak bağlayın.
2. Vercel > Settings > Domains: `armoni.mesbyyapi.com` ekleyin.
3. DNS: `armoni` için CNAME kaydı, Vercel'in verdiği hedefe (genelde `cname.vercel-dns.com`).
