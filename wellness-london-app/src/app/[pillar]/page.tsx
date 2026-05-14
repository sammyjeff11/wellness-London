import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PillarPage from "@/components/PillarPage";
import { getFacilities } from "@/lib/airtable";
import { getFacilitiesForPillar, getPillarPage, pillarPages } from "@/lib/pillar-pages";

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

  const facilities = await getFacilities();
  const matchingFacilities = getFacilitiesForPillar(facilities, pillar);

  return <PillarPage pillar={pillar} facilities={matchingFacilities} />;
}
