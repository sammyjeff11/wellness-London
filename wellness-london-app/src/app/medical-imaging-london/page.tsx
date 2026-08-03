import type { Metadata } from "next";
import LongevityServicePage from "@/components/LongevityServicePage";
import { getLongevityServicePage } from "@/lib/longevity-service-pages";

const page = getLongevityServicePage("medical-imaging-london")!;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.description,
  alternates: { canonical: page.href },
};

export default function MedicalImagingLondonPage() {
  return <LongevityServicePage page={page} />;
}
