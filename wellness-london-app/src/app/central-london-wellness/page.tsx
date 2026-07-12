import type { Metadata } from "next";
import LocationGuidePage from "@/components/LocationGuidePage";
import { centralLondonGuide } from "@/content/location-guides";

export const metadata: Metadata = {
  title: "Central London Recovery Venues | Well+",
  description:
    "Explore Central London recovery venues offering sauna, cold plunge, cryotherapy and other wellness services.",
  alternates: {
    canonical: `/${centralLondonGuide.slug}`,
  },
};

export default function CentralLondonWellnessPage() {
  return <LocationGuidePage guide={centralLondonGuide} />;
}
