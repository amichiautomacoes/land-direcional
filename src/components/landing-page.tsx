import type { PropertyId } from "@/types/property";
import { MediaProvider } from "./media-provider";
import { PropertyProvider } from "./property-provider";
import { RevealMotion } from "./reveal-motion";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { Contact, DeliveryStories, FloorPlans, Hero, LocationOptions, PropertyFeatures, PropertyShowcase, PropertyTour, RegionStrip } from "./sections/property-sections";
import { NextStep, PurchaseConfidence, PurchaseProcess } from "./sections/editorial-sections";

export function LandingPage({ initialPropertyId }: { initialPropertyId: PropertyId }) {
  return <PropertyProvider initialPropertyId={initialPropertyId}><MediaProvider>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <SiteHeader />
    <main id="conteudo">
      <Hero />
      <PropertyShowcase />
      <RegionStrip />
      <PropertyFeatures />
      <PurchaseProcess />
      <PropertyTour />
      <LocationOptions />
      <PurchaseConfidence />
      <FloorPlans />
      <DeliveryStories />
      <NextStep />
      <Contact />
    </main>
    <SiteFooter />
    <RevealMotion />
  </MediaProvider></PropertyProvider>;
}
