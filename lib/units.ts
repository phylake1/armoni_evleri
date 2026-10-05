// Armoni Evleri daire tipleri ve m² verileri (mesby-armoni.pdf kataloğundan).
// Net alan, oda alanlarının toplamından hesaplanır. Katalogda iki tipte (çatı C ve
// çatı E) basılı net değer oda toplamından 0,30 ve 0,10 m² farklıdır; burada oda
// toplamı esas alınmıştır.

export type PlanKey = "normal" | "roof";
export type TypeId = "A" | "B" | "C" | "D" | "E" | "F";
export const TYPE_IDS: TypeId[] = ["A", "B", "C", "D", "E", "F"];

export type Room = { name: string; m2: number };
export type UnitType = {
  id: TypeId;
  layout: string;
  rooms: Room[];
  net: number;
  gross: number;
  imageKey: string;
};

const SALON = "Salon";
const ANTRE = "Antre";
const YATAK = "Yatak odası";
const E_YATAK = "Ebeveyn yatak odası";
const E_BANYO = "Ebeveyn banyosu";
const BANYO = "Banyo";
const MUTFAK = "Mutfak";
const BALKON = "Balkon";

const round2 = (n: number) => Math.round(n * 100) / 100;

function unitType(
  id: TypeId,
  imageKey: string,
  gross: number,
  rows: [string, number][],
): UnitType {
  const rooms = rows.map(([name, m2]) => ({ name, m2 }));
  return {
    id,
    layout: "2+1",
    rooms,
    net: round2(rooms.reduce((sum, r) => sum + r.m2, 0)),
    gross,
    imageKey,
  };
}

const normalImage = (id: TypeId) => `plans/normal/${id}-tip`;
const roofImage = (id: TypeId) => `plans/roof/roof-${id}-tip`;

export const PLANS: Record<
  PlanKey,
  {
    label: string;
    sublabel: string;
    imageKey: string;
    floors: number[];
    types: UnitType[];
  }
> = {
  normal: {
    label: "Normal kat",
    sublabel: "1-2-3-4. katlar",
    imageKey: "plans/normal/normal",
    floors: [1, 2, 3, 4],
    types: [
      unitType("A", normalImage("A"), 76.95, [[SALON, 20.21], [ANTRE, 7.95], [YATAK, 11.3], [E_YATAK, 12.51], [E_BANYO, 2.55], [BANYO, 3.76], [MUTFAK, 10.09], [BALKON, 2.2]]),
      unitType("B", normalImage("B"), 73.74, [[SALON, 19.4], [ANTRE, 9.0], [YATAK, 9.05], [E_YATAK, 14.37], [BANYO, 3.76], [MUTFAK, 7.94], [BALKON, 1.84]]),
      unitType("C", normalImage("C"), 88.48, [[SALON, 24.96], [ANTRE, 10.35], [YATAK, 8.7], [E_YATAK, 13.68], [E_BANYO, 2.65], [BANYO, 4.0], [MUTFAK, 10.73], [BALKON, 3.2]]),
      unitType("D", normalImage("D"), 83.65, [[SALON, 22.77], [ANTRE, 6.16], [YATAK, 11.61], [E_YATAK, 15.62], [E_BANYO, 2.57], [BANYO, 3.8], [MUTFAK, 8.4], [BALKON, 3.1]]),
      unitType("E", normalImage("E"), 73.85, [[SALON, 20.6], [ANTRE, 6.3], [YATAK, 8.64], [E_YATAK, 12.03], [E_BANYO, 2.84], [BANYO, 4.23], [MUTFAK, 7.17], [BALKON, 3.45]]),
      unitType("F", normalImage("F"), 76.4, [[SALON, 19.72], [ANTRE, 8.07], [YATAK, 11.38], [E_YATAK, 12.51], [E_BANYO, 2.55], [BANYO, 3.76], [MUTFAK, 10.09], [BALKON, 2.2]]),
    ],
  },
  roof: {
    label: "Çatı katı",
    sublabel: "6 daire",
    imageKey: "plans/roof/roof",
    floors: [],
    types: [
      unitType("A", roofImage("A"), 78.87, [[SALON, 18.95], [ANTRE, 8.55], [YATAK, 9.53], [E_YATAK, 15.17], [BANYO, 3.76], [MUTFAK, 8.14], [BALKON, 2.86]]),
      unitType("B", roofImage("B"), 74.84, [[SALON, 19.4], [ANTRE, 9.0], [YATAK, 9.05], [E_YATAK, 14.37], [BANYO, 3.76], [MUTFAK, 7.94], [BALKON, 2.47]]),
      unitType("C", roofImage("C"), 89.18, [[SALON, 23.26], [ANTRE, 10.35], [YATAK, 9.0], [E_YATAK, 15.2], [BANYO, 4.0], [MUTFAK, 10.82], [BALKON, 2.34]]),
      unitType("D", roofImage("D"), 84.01, [[SALON, 21.51], [ANTRE, 7.95], [YATAK, 10.52], [E_YATAK, 13.73], [E_BANYO, 2.57], [BANYO, 3.8], [MUTFAK, 9.4], [BALKON, 2.47]]),
      unitType("E", roofImage("E"), 74.62, [[SALON, 17.95], [ANTRE, 6.3], [YATAK, 8.64], [E_YATAK, 15.19], [E_BANYO, 2.84], [BANYO, 4.23], [MUTFAK, 7.2], [BALKON, 3.12]]),
      unitType("F", roofImage("F"), 78.39, [[SALON, 19.72], [ANTRE, 7.95], [YATAK, 11.38], [E_YATAK, 12.51], [BANYO, 3.76], [MUTFAK, 8.14], [BALKON, 2.12]]),
    ],
  },
};

export const TOTAL_UNITS = 30;

// Satılan dairelerin numaralarını buraya yazın; listede olmayan daireler "Müsait" görünür.
// Daire numaraları plan üzerinde yazılı olanlardır (normal katlar 1-24, çatı katı 25-30).
export const SOLD_UNITS: number[] = [];

export type UnitStatus = "musait" | "satildi";
export const unitStatus = (n: number): UnitStatus =>
  SOLD_UNITS.includes(n) ? "satildi" : "musait";

export function unitNumbers(plan: PlanKey, id: TypeId) {
  const idx = TYPE_IDS.indexOf(id);
  if (plan === "roof") return [{ number: 24 + idx + 1, floor: "Çatı katı" }];
  return PLANS.normal.floors.map((f) => ({
    number: (f - 1) * 6 + idx + 1,
    floor: `${f}. kat`,
  }));
}

export function ranges() {
  const all = [...PLANS.normal.types, ...PLANS.roof.types];
  const net = all.map((t) => t.net);
  const gross = all.map((t) => t.gross);
  return {
    net: [Math.min(...net), Math.max(...net)] as const,
    gross: [Math.min(...gross), Math.max(...gross)] as const,
  };
}

export const fmt = (n: number) =>
  n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
