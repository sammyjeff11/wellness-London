import type { Metadata } from "next";
import LocationGuidePage from "@/components/LocationGuidePage";
import { centralLondonGuide } from "@/content/location-guides";

export const metadata: Metadata = {
  title: "Recovery venues in Central London | Saunas, cold plunge & wellness spaces",
  description:
    "Explore Central London recovery venues offering sauna, cold plunge, cryotherapy and other wellness services.",
  alternates: {
    canonical: `/${centralLondonGuide.slug}`,
  },
};

export default function CentralLondonWellnessPage() {
  return <LocationGuidePage guide={centralLondonGuide} />;
}
