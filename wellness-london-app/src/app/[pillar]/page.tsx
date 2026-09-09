import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LongevityDirectoryPage from "@/components/LongevityDirectoryPage";
import PillarPage from "@/components/PillarPage";
import { getFacilities } from "@/lib/airtable";
import {
  getLongevityFacilities,
  isClinicalLongevityFacility,
  type LongevityFacility,
} from "@/lib/longevity-facilities";
import { getFacilitiesForPillar, getPillarPage, pillarPages } from "@/lib/pillar-pages";
import { getServicePillarMappings } from "@/lib/service-pillar-mapping";

function longevitySortScore(facility: LongevityFacility) {
  return (
    Number(facility.venueConfirmed) * 1000 +
    Number(Boolean(facility.serviceLastVerified)) * 500 +
    facility.confirmedDiagnostics.length * 50 +
    facility.resultsIncluded.length * 20 +
    (facility.profileCompletenessScore || 0)
  );
}

export async function generateStaticParams() {
  return pillarPages.map((pillar) => ({ pillar: pillar.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pillar: string }>;
}): Promise<Metadata> {
  const { pillar: pillarSlug } = await params;
  const pillar = getPillarPage(pillarSlug);

  if (!pillar) return {};

  if (pillar.slug === "longevity") {
    return {
      title: "Longevity Clinics London | Diagnostics, Testing & Tracking | Well+",
      description:
        "Compare London longevity clinics by diagnostics, clinical oversight, results, follow-up and support for tracking meaningful health measures over time.",
      alternates: { canonical: "/longevity" },
    };
  }

  return {
    title: pillar.metaTitle,
    description: pillar.description,
    alternates: { canonical: pillar.href },
  };
}

export default async function WellnessPillarPage({
  params,
}: {
  params: Promise<{ pillar: string }>;
}) {
  const { pillar: pillarSlug } = await params;
  const pillar = getPillarPage(pillarSlug);

  if (!pillar) notFound();

  if (pillar.slug === "longevity") {
    const facilities = await getLongevityFacilities();
    const clinicalFacilities = facilities
      .filter(isClinicalLongevityFacility)
      .sort((a, b) => longevitySortScore(b) - longevitySortScore(a));

    return <LongevityDirectoryPage facilities={clinicalFacilities} />;
  }

  const [facilities, servicePillarMappings] = await Promise.all([
    getFacilities(),
    getServicePillarMappings(),
  ]);
  const matchingFacilities = getFacilitiesForPillar(facilities, pillar, servicePillarMappings);
  return <PillarPage pillar={pillar} facilities={matchingFacilities} />;
}
