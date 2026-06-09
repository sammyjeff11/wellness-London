import type { Metadata } from "next";
import LocationGuidePage from "@/components/LocationGuidePage";
import { northLondonGuide } from "@/content/location-guides";

export const metadata: Metadata = {
  title: "Recovery venues in North London | Saunas, cold plunge & wellness spaces",
  description:
    "Explore North London recovery venues offering sauna, cold plunge, cryotherapy and other wellness services.",
  alternates: {
    canonical: "/north-london-wellness",
  },
};

export default function NorthLondonWellnessPage() {
  return <LocationGuidePage guide={northLondonGuide} />;
}
