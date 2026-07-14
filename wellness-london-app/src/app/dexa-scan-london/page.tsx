import type { Metadata } from "next";
import LongevityServicePage from "@/components/LongevityServicePage";
import { getLongevityServicePage } from "@/lib/longevity-service-pages";

const page = getLongevityServicePage("dexa-scan-london")!;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.description,
  alternates: { canonical: page.href },
};

export default function DexaScanLondonPage() {
  return <LongevityServicePage page={page} />;
}
