// Kat/daire verisini plan görselleriyle birleştirir (sunucu tarafı).
import { FLOORS, type Apartment } from "./plans";
import { findPublicImage } from "./assets";

export type ResolvedApartment = Apartment & { image?: string };

export type ResolvedFloor = {
  key: string;
  label: string;
  tabLabel: string;
  image?: string;
  apartments: ResolvedApartment[];
};

export function resolveFloors(): ResolvedFloor[] {
  return FLOORS.map((floor) => ({
    key: floor.key,
    label: floor.label,
    tabLabel: floor.tabLabel,
    image: findPublicImage(`armoni/plans/${floor.key}`),
    apartments: floor.apartments.map((apt) => ({
      ...apt,
      image: findPublicImage(`armoni/plans/${apt.id}`),
    })),
  }));
}
