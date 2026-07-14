import type { Metadata } from "next";
import Link from "next/link";
import FacilityCard from "@/components/FacilityCard";
import { getFacilities } from "@/lib/airtable";
import { dedupeFacilities } from "@/lib/dedupe-facilities";
import { toDirectoryFacility } from "@/lib/facility-presenters";

export const metadata: Metadata = {
  title: "Luxury Wellness Spaces in London | Well+",
  description:
    "Compare luxury wellness venues in London, including hotel spas, private saunas, members' clubs and clinic-led services.",
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

  return keywordScore + premiumScore + privateScore + (facility.profileCompletenessScore || 0);
}

export default async function LuxuryWellnessSpacesPage() {
  const facilities = await getFacilities();

  const selectedFacilities = dedupeFacilities(
    facilities
      .map(toDirectoryFacility)
      .filter((facility) => scoreFacility(facility) > 0)
      .sort((a, b) => scoreFacility(b) - scoreFacility(a))
  ).slice(0, 9);

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#211d18]">
      <section className="px-5 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-5 text-[11px] uppercase tracking-[0.26em] text-[#6f6048]">
            Venue shortlist / Optimise + Longevity
          </p>
          <h1 className="font-serif text-5xl font-normal leading-[0.98] sm:text-6xl md:text-7xl">
            Luxury wellness spaces in London.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-[#5f574c]">
            Compare hotel spas, private sauna rooms, members&apos; clubs and clinic-led venues where facilities, privacy and service are part of the price.
          </p>
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-5 py-10 sm:px-6 md:py-14">
        <div className="mx-auto grid max-w-6xl gap-5 border-y border-[#d8cebf]/70 py-8 md:grid-cols-3">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Best for</p>
            <p className="text-sm leading-7 text-[#5f574c]">
              Private treatments, high-spec facilities, attentive service and settings suited to longer or more discreet visits.
            </p>
          </div>
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">What defines luxury</p>
            <p className="text-sm leading-7 text-[#5f574c]">
              Price alone is not enough. Useful signals include privacy, staff support, facility quality, clear booking and what is actually included.
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
              <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Selected venues</p>
              <h2 className="font-serif text-3xl font-normal leading-tight sm:text-4xl md:text-5xl">
                London venues where the service should justify the price.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#5f574c] md:text-base">
              Selected using venue type, access model, privacy, facilities and service detail—not branding alone.
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
              What should a higher price buy?
            </h2>
          </div>
          <div className="space-y-5 text-sm leading-8 text-[#fbf8f1]/78 md:text-base">
            <p>
              At the better venues, the extra spend buys something tangible: more privacy, stronger facilities, experienced staff, longer access or smoother service.
            </p>
            <p>
              The offer may be clinical, spa-led or recovery-focused, so compare inclusions rather than assuming every expensive venue provides the same experience.
            </p>
            <p>
              Check whether pool or thermal access is included, whether non-members can book, and which facilities are restricted to hotel guests or club members.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
