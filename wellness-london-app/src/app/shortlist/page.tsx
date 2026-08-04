import type { Metadata } from "next";
import SavedVenueList from "@/components/SavedVenueList";
import { getFacilities } from "@/lib/airtable";
import { dedupeFacilities } from "@/lib/dedupe-facilities";
import { toDirectoryFacility } from "@/lib/facility-presenters";

export const metadata: Metadata = {
  title: "Your Saved Wellness Venues | Well+",
  description: "Return to the London wellness venues you saved while browsing Well+.",
  robots: { index: false, follow: true },
};

export default async function ShortlistPage() {
  const facilities = dedupeFacilities((await getFacilities()).map(toDirectoryFacility));

  return (
    <main className="min-h-screen bg-[#f4efe6] px-5 py-12 text-[#29241d] sm:px-6 sm:py-18">
      <div className="mx-auto max-w-6xl">
        <p className="editorial-eyebrow">Saved for later</p>
        <h1 className="mt-4 max-w-3xl font-serif text-5xl font-normal leading-[0.96] tracking-[-0.05em] sm:text-7xl">
          Your Well+ shortlist.
        </h1>
        <p className="mb-10 mt-5 max-w-2xl text-base leading-8 text-[#5f574c] sm:text-lg">
          Keep a small list of venues while you compare services, access, location and experience.
        </p>
        <SavedVenueList facilities={facilities} />
      </div>
    </main>
  );
}
