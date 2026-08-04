import type { Metadata } from "next";
import LongevityServicePage from "@/components/LongevityServicePage";
import { getLongevityServicePage } from "@/lib/longevity-service-pages";

const page = getLongevityServicePage("cardiovascular-screening-london")!;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.description,
  alternates: { canonical: page.href },
};

export default function CardiovascularScreeningLondonPage() {
  return <LongevityServicePage page={page} />;
}
