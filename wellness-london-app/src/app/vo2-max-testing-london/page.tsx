import type { Metadata } from "next";
import LongevityServicePage from "@/components/LongevityServicePage";
import { getLongevityServicePage } from "@/lib/longevity-service-pages";

const page = getLongevityServicePage("vo2-max-testing-london")!;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.description,
  alternates: { canonical: page.href },
};

export default function Vo2MaxTestingLondonPage() {
  return <LongevityServicePage page={page} />;
}
