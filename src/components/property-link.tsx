"use client";

import type { ComponentProps } from "react";
import { propertyPath } from "@/lib/properties";
import type { PropertyId } from "@/types/property";
import { useProperty } from "./property-provider";

export function PropertyLink({ propertyId, scroll = false, children, ...props }: Omit<ComponentProps<"a">, "href"> & {
  propertyId: PropertyId;
  scroll?: boolean;
}) {
  const { selectProperty } = useProperty();
  return <a {...props} href={`${propertyPath(propertyId)}${scroll ? "#apartamentos" : ""}`} data-select-property={propertyId} data-scroll-selection={scroll || undefined} onClick={(event) => {
    props.onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    selectProperty(propertyId, { scroll });
  }}>{children}</a>;
}
