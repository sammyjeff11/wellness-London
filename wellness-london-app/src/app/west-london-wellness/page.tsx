import type { Metadata } from "next";
import LocationGuidePage from "@/components/LocationGuidePage";
import { westLondonGuide } from "@/content/location-guides";

export const metadata: Metadata = {
  title: "Recovery venues in West London | Saunas, cold plunge & wellness spaces",
  description:
    "Explore West London recovery venues offering sauna, cold plunge, cryotherapy and other wellness services.",
  alternates: {
    canonical: "/west-london-wellness",
  },
};

export default function WestLondonWellnessPage() {
  return <LocationGuidePage guide={westLondonGuide} />;
}
