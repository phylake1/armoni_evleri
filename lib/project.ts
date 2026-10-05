// Proje genel bilgileri. Katalogdan doldurulacak alanlar bilerek boş bırakıldı;
// boş olan alanlar sayfada gösterilmez.

export type GeneralStatus = {
  label: string; // örn. "Satışlar Devam Ediyor"
  note?: string; // örn. "Teslim: 2027 2. çeyrek"
};

export const PROJECT = {
  name: "Armoni Evleri",
  tagline: "Mesby Yapı'nın yeni konut projesi.",
  description:
    "Armoni Evleri'nin kat planlarını, daire detaylarını ve güncel satış durumunu bu sayfadan inceleyebilirsiniz.",

  // Projenin genel durumu (null ise gösterilmez).
  generalStatus: null as GeneralStatus | null,

  // Ek bilgiler: konum, teslim tarihi, kat sayısı vb. (boşsa gösterilmez).
  // Örnek: { label: "Konum", value: "Bayrampaşa, İstanbul" }
  facts: [] as { label: string; value: string }[],
};
