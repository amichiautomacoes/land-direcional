"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { properties } from "@/content/properties";
import { findProperty, propertyPath, resolveProperty } from "@/lib/properties";
import type { Property, PropertyId } from "@/types/property";

interface PropertyContextValue {
  selected: Property;
  selectProperty: (id: PropertyId, options?: { scroll?: boolean }) => void;
}

const PropertyContext = createContext<PropertyContextValue | null>(null);

export function PropertyProvider({ initialPropertyId, children }: {
  initialPropertyId: PropertyId;
  children: React.ReactNode;
}) {
  const [selectedId, setSelectedId] = useState<PropertyId>(initialPropertyId);
  const [announcement, setAnnouncement] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("js");
    const restore = () => {
      const url = new URL(window.location.href);
      const pathProperty = properties.find((property) => propertyPath(property.id) === url.pathname);
      const property = url.searchParams.has("imovel") || url.searchParams.has("regiao")
        ? resolveProperty(url.searchParams.get("imovel"), url.searchParams.get("regiao"))
        : findProperty(pathProperty?.id ?? initialPropertyId)!;
      setSelectedId(property.id);
    };
    restore();
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, [initialPropertyId, pathname]);

  const selectProperty = useCallback((id: PropertyId, { scroll = false } = {}) => {
    const property = findProperty(id);
    if (!property) return;
    setSelectedId(id);
    setAnnouncement(`${property.name}, ${property.city}. Imagens e detalhes atualizados.`);
    const url = new URL(window.location.href);
    url.pathname = propertyPath(id);
    url.searchParams.delete("imovel");
    url.searchParams.delete("regiao");
    if (scroll) url.hash = "apartamentos";
    if (url.href !== window.location.href) window.history.pushState({ property: id }, "", url);
    if (scroll) {
      document.getElementById("apartamentos")?.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      });
    }
  }, []);

  return (
    <PropertyContext.Provider value={{ selected: findProperty(selectedId)!, selectProperty }}>
      {children}
      <div className="sr-only" id="selection-announcement" role="status" aria-live="polite">{announcement}</div>
    </PropertyContext.Provider>
  );
}

export function useProperty() {
  const context = useContext(PropertyContext);
  if (!context) throw new Error("useProperty deve estar dentro de PropertyProvider.");
  return context;
}
