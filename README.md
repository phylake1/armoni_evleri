# Armoni Evleri

`armoni.mesbyyapi.com` için Mesby Yapı'nın Armoni Evleri proje sayfası.
Next.js 16 (App Router) + Tailwind CSS 4. Backend yok, tamamen statik.

## Çalıştırma

```bash
npm install
npm run dev      # önce görselleri optimize eder, sonra dev sunucusunu açar
npm run build
```

## İçerik klasörü

```
public/
  fonts/Stapel-Regular.ttf        "MESBY YAPI" yazısı (footer)
  armoni/
    pdf/mesby-armoni.pdf          "Kataloğu indir" bu dosyayı verir
    renders/*.png|jpg             hero; dosya adı sırasıyla (1.png, 3.png, ...)
    plans/normal/normal.png       1-2-3-4. kat genel planı
    plans/normal/A-tip.png ... F-tip.png
    plans/roof/roof.png           çatı katı genel planı
    plans/roof/roof-A-tip.png ... roof-F-tip.png
```

Orijinal görseller çok büyük olabilir (normal.png yaklaşık 40 MB). `scripts/build-assets.mjs`
bunları `npm run dev` ve `npm run build` öncesinde `public/armoni/_web` altına optimize
WebP olarak üretir (git'e girmez), site yalnızca bunları kullanır. Vercel'de orijinaller
dağıtıma alınmaz.

## Veri

- `lib/units.ts`: daire tipleri, oda m² değerleri (katalogdan), `SOLD_UNITS` (satılan daire numaraları)
- `lib/plan-geometry.ts`: plan üzerindeki A-F bölgeleri (plan görseli değişirse yeniden üretilmeli)
- `lib/site.ts`: domain ve iletişim bilgileri

Daire numaraları plan üzerinde yazılıdır: normal katlar 1-24 (kat n, tip i için `(n-1)*6 + i`),
çatı katı 25-30. Bir daire satıldığında numarasını `SOLD_UNITS` dizisine ekleyin.

Net alan, oda alanlarının toplamından hesaplanır. Katalogda çatı C (75,27) ve çatı E (65,57)
net değerleri oda toplamından (74,97 ve 65,47) farklı basılmıştır.

## Logo

ARMONİ EVLERİ logosu, kataloğun vektör çizimlerinden SVG olarak alınmıştır
(`components/ArmoniLogo.tsx`); font dosyası gerekmez.

## Yayına alma

Vercel'de repo bağlıdır. Domain: Vercel > Settings > Domains > `armoni.mesbyyapi.com`, DNS'te
`armoni` için CNAME (genelde `cname.vercel-dns.com`).
