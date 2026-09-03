"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import FacilityCard, { type FacilityCardFacility } from "@/components/FacilityCard";
import {
  getSavedVenueSnapshot,
  parseSavedVenueSlugs,
  subscribeToSavedVenues,
} from "@/lib/saved-venues";

export default function SavedVenueList({ facilities }: { facilities: FacilityCardFacility[] }) {
  const snapshot = useSyncExternalStore(subscribeToSavedVenues, getSavedVenueSnapshot, () => "[]");
  const savedSlugs = useMemo(() => parseSavedVenueSlugs(snapshot), [snapshot]);
  const savedFacilities = useMemo(
    () => savedSlugs.map((slug) => facilities.find((facility) => facility.slug === slug)).filter((facility): facility is FacilityCardFacility => Boolean(facility)),
    [facilities, savedSlugs],
  );

  if (savedFacilities.length === 0) {
    return (
      <div className="rounded-[1.25rem] border border-[#d8cebf] bg-[#fbf8f1] p-7 sm:p-10">
        <p className="editorial-eyebrow">Your shortlist is empty</p>
        <h2 className="mt-4 max-w-xl font-serif text-4xl font-normal leading-tight tracking-[-0.04em]">
          Save the places you want to compare.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5f574c] sm:text-base">
          Use the Save button on selected venue cards. Your shortlist stays on this device, so you can return without creating an account.
        </p>
        <Link href="/" className="mt-6 inline-flex rounded-full bg-[#29241d] px-6 py-3 text-sm text-[#fbf8f1] transition hover:bg-[#463c31]">
          Discover venues
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-7 flex flex-col gap-4 rounded-[1.1rem] border border-[#c8baa6] bg-[#ded4c5] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <p className="text-base font-medium text-[#29241d]">{savedFacilities.length} saved {savedFacilities.length === 1 ? "venue" : "venues"}</p>
          <p className="mt-1 text-sm leading-6 text-[#5f574c]">Saved locally on this device.</p>
        </div>
        {savedFacilities.length >= 2 ? (
          <Link href={`/compare?venues=${savedFacilities.slice(0, 4).map((facility) => facility.slug).join(",")}`} className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#29241d] px-6 text-sm font-medium text-[#fbf8f1] transition hover:bg-[#463c31]">
            Compare saved venues
          </Link>
        ) : (
          <p className="text-sm text-[#6f6048]">Save one more venue to compare.</p>
        )}
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {savedFacilities.map((facility) => (
          <FacilityCard key={facility.slug} facility={facility} source="saved_shortlist" showSaveButton />
        ))}
      </div>
    </div>
  );
}
