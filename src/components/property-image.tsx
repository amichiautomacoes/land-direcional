import Image from "next/image";
import type { ComponentProps } from "react";

export function PropertyImage(props: Omit<ComponentProps<typeof Image>, "width" | "height" | "fill">) {
  return <Image width={1920} height={1080} sizes="100vw" {...props} />;
}
