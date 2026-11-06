import { LandingPage } from "@/components/landing-page";
import { defaultPropertyId } from "@/lib/properties";

export default function Home() {
  return <LandingPage initialPropertyId={defaultPropertyId} />;
}
