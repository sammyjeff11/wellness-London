import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LongevityDirectoryPage from "@/components/LongevityDirectoryPage";
import PillarPage from "@/components/PillarPage";
import { getFacilities, type AirtableFacility } from "@/lib/airtable";
import { getFacilitiesForPillar, getPillarPage, pillarPages } from "@/lib/pillar-pages";
import { getServicePillarMappings } from "@/lib/service-pillar-mapping";

const clinicalLongevitySignals = [
  "diagnostic",
  "health screening",
  "medical screening",
  "preventative health",
  "preventive health",
  "health assessment",
  "medical assessment",
  "executive health",
  "blood testing",
  "blood test",
  "biomarker",
  "biological age",
  "epigenetic",
  "genomic",
  "genetic testing",
  "hormone testing",
  "microbiome",
  "gut health testing",
  "mri",
  "ct scan",
  "medical imaging",
  "cardiovascular screening",
  "cardiac screening",
  "dexa",
  "vo2 max",
  "vo₂ max",
  "resting metabolic rate",
  "physician-led",
  "doctor-led",
  "medical consultation",
  "precision medicine",
];

function isClinicalLongevityFacility(facility: AirtableFacility) {
  const searchable = [
    facility.name,
    facility.description,
    facility.editorialSummary,
    facility.venueTypeStandardized,
    facility.primaryService,
    ...facility.secondaryServices,
    ...facility.serviceNames,
    ...facility.servicesOffered,
    ...facility.activityCategories,
    ...facility.activityTagsStandardized,
    ...facility.activityDisplayLabels,
    ...facility.themeTagsStandardized,
    ...facility.bestFor,
    ...facility.bestForStandardized,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return clinicalLongevitySignals.some((signal) => searchable.includes(signal));
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

  if (!pillar) {
    return {};
  }

  if (pillar.slug === "longevity") {
    return {
      title: "Longevity Clinics London | Diagnostics & Screening | Well+",
      description: "Compare London longevity clinics offering medical assessments, advanced diagnostics, preventative screening and clinician-led health programmes.",
      alternates: { canonical: "/longevity" },
    };
  }

  return {
    title: pillar.metaTitle,
    description: pillar.description,
    alternates: {
      canonical: pillar.href,
    },
  };
}

export default async function WellnessPillarPage({
  params,
}: {
  params: Promise<{ pillar: string }>;
}) {
  const { pillar: pillarSlug } = await params;
  const pillar = getPillarPage(pillarSlug);

  if (!pillar) {
    notFound();
  }

  const [facilities, servicePillarMappings] = await Promise.all([
    getFacilities(),
    getServicePillarMappings(),
  ]);
  const matchingFacilities = getFacilitiesForPillar(facilities, pillar, servicePillarMappings);

  if (pillar.slug === "longevity") {
    return <LongevityDirectoryPage facilities={matchingFacilities.filter(isClinicalLongevityFacility)} />;
  }

  return <PillarPage pillar={pillar} facilities={matchingFacilities} />;
}
