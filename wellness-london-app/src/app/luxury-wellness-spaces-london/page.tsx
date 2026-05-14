import type { Metadata } from "next";
import Link from "next/link";
import FacilityCard from "@/components/FacilityCard";
import { getFacilities } from "@/lib/airtable";
import { toDirectoryFacility } from "@/lib/facility-presenters";

export const metadata: Metadata = {
  title: "Luxury Wellness Spaces in London | Well Edit",
  description:
    "A curated guide to luxury wellness spaces in London, from premium recovery clubs and private saunas to design-conscious wellness venues.",
  alternates: {
    canonical: "/luxury-wellness-spaces-london",
  },
};

const luxuryKeywords = [
  "luxury",
  "premium",
  "private",
  "boutique",
  "design",
  "calm",
  "clinic",
  "longevity",
  "members",
  "high-end",
];

function scoreFacility(facility: ReturnType<typeof toDirectoryFacility>) {
  const searchable = [
    facility.description,
    facility.accessType,
    facility.privateOrShared,
    facility.premiumLevel,
    ...(facility.bestFor || []),
    ...(facility.experienceType || []),
    ...(facility.services || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const keywordScore = luxuryKeywords.reduce((score, keyword) => score + (searchable.includes(keyword) ? 1 : 0), 0);
  const premiumScore = searchable.includes("premium") || searchable.includes("luxury") ? 3 : 0;
  const privateScore = searchable.includes("private") ? 2 : 0;

  return keywordScore + premiumScore + privateScore + Number(facility.isFeatured) * 3 + (facility.profileCompletenessScore || 0);
}

export default async function LuxuryWellnessSpacesPage() {
  const facilities = await getFacilities();

  const selectedFacilities = facilities
    .map(toDirectoryFacility)
    .filter((facility) => scoreFacility(facility) > 0)
    .sort((a, b) => scoreFacility(b) - scoreFacility(a))
    .slice(0, 9);

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#211d18]">
      <section className="px-5 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-5 text-[11px] uppercase tracking-[0.26em] text-[#6f6048]">
            Curated collections / Optimise + Longevity
          </p>
          <h1 className="font-serif text-5xl font-normal leading-[0.98] sm:text-6xl md:text-7xl">
            Luxury wellness spaces in London.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-[#5f574c]">
            A curated guide to London&apos;s more considered wellness spaces — from premium recovery clubs and private sauna rooms to longevity-led clinics and design-conscious wellness destinations.
          </p>
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-5 py-10 sm:px-6 md:py-14">
        <div className="mx-auto grid max-w-6xl gap-5 border-y border-[#d8cebf]/70 py-8 md:grid-cols-3">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Best for</p>
            <p className="text-sm leading-7 text-[#5f574c]">
              Premium recovery, private wellness rituals, design-led spaces, longer-term optimisation and elevated London wellness experiences.
            </p>
          </div>
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">What defines luxury</p>
            <p className="text-sm leading-7 text-[#5f574c]">
              Not just price. We look for atmosphere, service design, facility quality, privacy, clarity of experience and whether the venue feels intentionally curated.
            </p>
          </div>
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Explore further</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/optimise" className="border border-[#d8cebf] px-3 py-2 text-sm hover:bg-[#f4efe6]">Optimise</Link>
              <Link href="/longevity" className="border border-[#d8cebf] px-3 py-2 text-sm hover:bg-[#f4efe6]">Longevity</Link>
              <Link href="/reset" className="border border-[#d8cebf] px-3 py-2 text-sm hover:bg-[#f4efe6]">Reset</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Curated venues</p>
              <h2 className="font-serif text-3xl font-normal leading-tight sm:text-4xl md:text-5xl">
                Elevated London wellness spaces.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#5f574c] md:text-base">
              Selected for atmosphere, premium positioning, privacy signals, service quality and fit with a more elevated wellness experience.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {selectedFacilities.map((facility) => (
              <FacilityCard key={facility.slug} facility={facility} source="collection_luxury_wellness" />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#29241d] px-5 py-12 text-[#fbf8f1] sm:px-6 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#d8cebf]">Editorial perspective</p>
            <h2 className="font-serif text-3xl font-normal leading-tight sm:text-4xl md:text-5xl">
              Luxury wellness is about confidence, not excess.
            </h2>
          </div>
          <div className="space-y-5 text-sm leading-8 text-[#fbf8f1]/78 md:text-base">
            <p>
              The strongest premium wellness spaces in London tend to make the experience easier to understand: clearer booking, better facilities, calmer design and a more considered sense of hospitality.
            </p>
            <p>
              Some are clinical and longevity-led. Others are restorative, private or recovery-focused. The common thread is intentionality rather than price alone.
            </p>
            <p>
              The Well Edit favours spaces that help users make better choices, not venues that rely only on aesthetics.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
