export type PropertyId = "nature-varzea" | "inove-residence" | "boulevard-ville";

export interface GalleryImage {
  image: string;
  title: string;
  alt: string;
  note?: string;
}

export interface Property {
  id: PropertyId;
  name: string;
  city: string;
  state: string;
  region: string;
  neighborhood: string;
  rooms: string;
  area: string;
  areaNote: string;
  description: string;
  address: string;
  source: string;
  contact: string;
  planNote: string;
  amenities: readonly string[];
  images: Record<"hero" | "showcase" | "pool" | "living" | "plan" | "aerial", string>;
  livingLabel: string;
  livingDescription: string;
  gallery: readonly GalleryImage[];
}
