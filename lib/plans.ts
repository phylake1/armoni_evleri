// Kat ve daire verileri. Görseller bu dosyada tanımlanmaz; dosya adı kuralıyla
// otomatik bulunur (bkz. README):
//   public/armoni/plans/<kat-key>.(jpg|png|webp)        -> kat planı
//   public/armoni/plans/<daire-id>.(jpg|png|webp)       -> daire planı
//
// Daire eklemek için ilgili katın `apartments` dizisine kayıt ekleyin.

export type AptStatus = "musait" | "satildi";

export type Apartment = {
  id: string; // dosya adı da budur, örn. "kat-1-daire-1"
  name: string; // örn. "Daire 1"
  type?: string; // örn. "2+1"
  status: AptStatus;
  grossM2?: number;
  netM2?: number;
  balconyM2?: number;
  facing?: string; // örn. "Güney"
};

export type FloorDef = {
  key: string; // plan dosya adı: kat-1, kat-2, ..., cati
  label: string;
  tabLabel: string;
  apartments: Apartment[];
};

export const FLOORS: FloorDef[] = [
  { key: "kat-1", label: "1. Kat", tabLabel: "1. Kat", apartments: [] },
  { key: "kat-2", label: "2. Kat", tabLabel: "2. Kat", apartments: [] },
  { key: "kat-3", label: "3. Kat", tabLabel: "3. Kat", apartments: [] },
  { key: "kat-4", label: "4. Kat", tabLabel: "4. Kat", apartments: [] },
  { key: "cati", label: "Çatı Katı", tabLabel: "Çatı", apartments: [] },
];

// Örnek daire kaydı:
// {
//   id: "kat-1-daire-1",
//   name: "Daire 1",
//   type: "2+1",
//   status: "musait",
//   grossM2: 110,
//   netM2: 95,
//   balconyM2: 8,
//   facing: "Güney",
// },
