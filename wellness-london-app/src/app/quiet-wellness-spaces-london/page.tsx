import type { Metadata } from "next";
import Link from "next/link";
import FacilityCard from "@/components/FacilityCard";
import { getFacilities } from "@/lib/airtable";
import { dedupeFacilities } from "@/lib/dedupe-facilities";
import { toDirectoryFacility } from "@/lib/facility-presenters";

export const metadata: Metadata = {
  title: "Quiet Wellness Spaces in London | Well+",
  description:
    "Compare quieter London wellness venues, including private saunas, bathhouses, spas and appointment-led recovery spaces.",
  alternates: {
    canonical: "/quiet-wellness-spaces-london",
  },
};

const quietKeywords = ["quiet", "calm", "restore", "restorative", "reset", "relax", "relaxation", "private", "spa", "bathhouse", "sleep"];

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

  const keywordScore = quietKeywords.reduce((score, keyword) => score + (searchable.includes(keyword) ? 1 : 0), 0);
  const privateScore = searchable.includes("private") ? 2 : 0;

  return keywordScore + privateScore + (facility.profileCompletenessScore || 0);
}

export default async function QuietWellnessSpacesPage() {
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
            Venue shortlist / Reset
          </p>
          <h1 className="font-serif text-5xl font-normal leading-[0.98] sm:text-6xl md:text-7xl">
            Quiet wellness spaces in London.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-[#5f574c]">
            Compare private sauna rooms, bathhouses, spas and appointment-led venues where noise, privacy and pacing matter.
          </p>
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-5 py-10 sm:px-6 md:py-14">
        <div className="mx-auto grid max-w-6xl gap-5 border-y border-[#d8cebf]/70 py-8 md:grid-cols-3">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Best for</p>
            <p className="text-sm leading-7 text-[#5f574c]">
              Solo visits, low-stimulation settings, slower recovery sessions and people who prefer clear appointment windows.
            </p>
          </div>
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Look for</p>
            <p className="text-sm leading-7 text-[#5f574c]">
              Calm interiors, private or semi-private access, clear booking windows, showers, towels and space to decompress before leaving.
            </p>
          </div>
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Explore further</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/reset" className="border border-[#d8cebf] px-3 py-2 text-sm hover:bg-[#f4efe6]">Reset</Link>
              <Link href="/sauna-london" className="border border-[#d8cebf] px-3 py-2 text-sm hover:bg-[#f4efe6]">Saunas</Link>
              <Link href="/how-we-curate" className="border border-[#d8cebf] px-3 py-2 text-sm hover:bg-[#f4efe6]">How we curate</Link>
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
                Quieter venues to compare.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#5f574c] md:text-base">
              Selected using privacy, session format, access model and facilities. Always confirm whether shared areas or peak sessions may be busy.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {selectedFacilities.map((facility) => (
              <FacilityCard key={facility.slug} facility={facility} source="collection_quiet_wellness" />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#29241d] px-5 py-12 text-[#fbf8f1] sm:px-6 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#d8cebf]">How to choose</p>
            <h2 className="font-serif text-3xl font-normal leading-tight sm:text-4xl md:text-5xl">
              Quiet does not always mean empty.
            </h2>
          </div>
          <div className="space-y-5 text-sm leading-8 text-[#fbf8f1]/78 md:text-base">
            <p>
              A venue can feel calm because capacity, room layout and appointment times are controlled; that does not mean every session will be silent.
            </p>
            <p>
              Check whether the booking is private, guided, members-only or shared, and ask about peak periods if noise matters to you.
            </p>
            <p>
              Towels, showers, changing space and enough time after the session often matter more than decorative claims about tranquillity.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
