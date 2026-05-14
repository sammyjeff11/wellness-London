import type { Metadata } from "next";
import Link from "next/link";
import FacilityCard from "@/components/FacilityCard";
import { getFacilities } from "@/lib/airtable";
import { toDirectoryFacility } from "@/lib/facility-presenters";

export const metadata: Metadata = {
  title: "Best Recovery Clubs in London | Well Edit",
  description:
    "A curated guide to London's best recovery clubs and recovery-led wellness studios, including contrast therapy, sauna, cryotherapy and performance recovery spaces.",
  alternates: {
    canonical: "/best-recovery-clubs-london",
  },
};

const keywords = ["recovery", "performance", "contrast", "cold", "sauna", "athlete", "gym", "compression", "cryotherapy"];

function scoreFacility(facility: ReturnType<typeof toDirectoryFacility>) {
  const searchable = [
    facility.description,
    ...(facility.services || []),
    ...(facility.bestFor || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const keywordScore = keywords.reduce((score, keyword) => score + (searchable.includes(keyword) ? 1 : 0), 0);

  return keywordScore + Number(facility.isFeatured) * 3 + (facility.profileCompletenessScore || 0);
}

export default async function BestRecoveryClubsPage() {
  const facilities = await getFacilities();

  const selectedFacilities = facilities
    .map(toDirectoryFacility)
    .filter((facility) => scoreFacility(facility) > 2)
    .sort((a, b) => scoreFacility(b) - scoreFacility(a))
    .slice(0, 9);

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#211d18]">
      <section className="px-5 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-5 text-[11px] uppercase tracking-[0.26em] text-[#6f6048]">
            Curated collections / Recover + Perform
          </p>
          <h1 className="font-serif text-5xl font-normal leading-[0.98] sm:text-6xl md:text-7xl">
            The best recovery clubs in London.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-[#5f574c]">
            A curated guide to London's strongest recovery-led wellness spaces — combining sauna, cold plunge, cryotherapy, compression and performance-focused recovery routines.
          </p>
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-5 py-10 sm:px-6 md:py-14">
        <div className="mx-auto grid max-w-6xl gap-5 border-y border-[#d8cebf]/70 py-8 md:grid-cols-3">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Best for</p>
            <p className="text-sm leading-7 text-[#5f574c]">
              Post-training recovery, high-output work weeks, structured routines and repeatable wellness habits.
            </p>
          </div>
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Typical facilities</p>
            <p className="text-sm leading-7 text-[#5f574c]">
              Sauna, cold plunge, compression boots, cryotherapy, mobility spaces, guided contrast therapy and recovery lounges.
            </p>
          </div>
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Explore further</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/recover" className="border border-[#d8cebf] px-3 py-2 text-sm hover:bg-[#f4efe6]">Recover</Link>
              <Link href="/perform" className="border border-[#d8cebf] px-3 py-2 text-sm hover:bg-[#f4efe6]">Perform</Link>
              <Link href="/contrast-therapy-london" className="border border-[#d8cebf] px-3 py-2 text-sm hover:bg-[#f4efe6]">Contrast therapy</Link>
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
                Recovery-focused London spaces.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#5f574c] md:text-base">
              These venues have been selected for treatment breadth, recovery relevance, repeatability and overall editorial fit.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {selectedFacilities.map((facility) => (
              <FacilityCard key={facility.slug} facility={facility} source="collection_recovery_clubs" />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#29241d] px-5 py-12 text-[#fbf8f1] sm:px-6 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#d8cebf]">Editorial perspective</p>
            <h2 className="font-serif text-3xl font-normal leading-tight sm:text-4xl md:text-5xl">
              Recovery clubs are becoming lifestyle infrastructure.
            </h2>
          </div>
          <div className="space-y-5 text-sm leading-8 text-[#fbf8f1]/78 md:text-base">
            <p>
              London's strongest recovery clubs are no longer only serving athletes. Many now operate as broader wellness environments for recovery, stress management and repeatable routines.
            </p>
            <p>
              The most compelling venues tend to combine strong operational flow with thoughtful hospitality, rather than focusing purely on treatment intensity.
            </p>
            <p>
              The Well Edit prioritises recovery spaces that feel intentional, practical and genuinely usable within everyday life.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
