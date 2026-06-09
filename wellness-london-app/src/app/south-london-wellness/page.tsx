import type { Metadata } from "next";
import LocationGuidePage from "@/components/LocationGuidePage";
import { southLondonGuide } from "@/content/location-guides";

export const metadata: Metadata = {
  title: "Recovery venues in South London | Saunas, cold plunge & wellness spaces",
  description:
    "Explore South London recovery venues offering sauna, cold plunge, cryotherapy and other wellness services.",
  alternates: {
    canonical: "/south-london-wellness",
  },
};

export default function SouthLondonWellnessPage() {
  return <LocationGuidePage guide={southLondonGuide} />;
}
