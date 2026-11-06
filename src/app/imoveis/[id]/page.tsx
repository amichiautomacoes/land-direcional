import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/landing-page";
import { properties } from "@/content/properties";
import { findProperty } from "@/lib/properties";

export const dynamicParams = false;

export function generateStaticParams() {
  return properties.map(({ id }) => ({ id }));
}

type PropertyPageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const property = findProperty((await params).id);
  if (!property) notFound();
  return {
    title: `${property.name} em ${property.city} | Direcional`,
    description: property.description,
    openGraph: {
      title: `${property.name} | Direcional`,
      description: property.description,
      images: [{ url: property.images.hero, width: 1920, height: 1080, alt: `Perspectiva ilustrativa do ${property.name}` }],
    },
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const property = findProperty((await params).id);
  if (!property) notFound();
  return <LandingPage initialPropertyId={property.id} />;
}
