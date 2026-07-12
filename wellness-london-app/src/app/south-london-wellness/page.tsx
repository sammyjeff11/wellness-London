import type { Metadata } from "next";
import LocationGuidePage from "@/components/LocationGuidePage";
import { southLondonGuide } from "@/content/location-guides";

export const metadata: Metadata = {
  title: "South London Recovery Venues | Well+",
  description:
    "Explore South London recovery venues offering sauna, cold plunge, cryotherapy and other wellness services.",
  alternates: {
    canonical: "/south-london-wellness",
  },
};

export default function SouthLondonWellnessPage() {
  return <LocationGuidePage guide={southLondonGuide} />;
}
