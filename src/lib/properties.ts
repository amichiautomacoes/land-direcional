import { properties } from "@/content/properties";
import type { Property, PropertyId } from "@/types/property";

export const defaultPropertyId: PropertyId = "inove-residence";

export function findProperty(id: string | null | undefined): Property | undefined {
  return properties.find((property) => property.id === id);
}

export function propertyPath(id: PropertyId): string {
  return `/imoveis/${id}/`;
}

export function resolveProperty(id?: string | null, region?: string | null): Property {
  return findProperty(id)
    ?? properties.find((property) => property.region === region)
    ?? properties.find((property) => property.id === defaultPropertyId)!;
}
