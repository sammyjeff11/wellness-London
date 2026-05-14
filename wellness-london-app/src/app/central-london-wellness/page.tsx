import type { Metadata } from "next";
import LocationGuidePage from "@/components/LocationGuidePage";
import { centralLondonGuide } from "@/content/location-guides";

export const metadata: Metadata = {
  title: centralLondonGuide.title,
  description: centralLondonGuide.description,
  alternates: {
    canonical: `/${centralLondonGuide.slug}`,
  },
};

export default function CentralLondonWellnessPage() {
  return <LocationGuidePage guide={centralLondonGuide} />;
}
