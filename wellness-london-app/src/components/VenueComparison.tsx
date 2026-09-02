"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import type { FacilityCardFacility } from "@/components/FacilityCard";
import { getUsefulServiceLabels } from "@/lib/discovery-labels";
import { trackEvent } from "@/lib/analytics";
import { getSavedVenueSnapshot, parseSavedVenueSlugs, subscribeToSavedVenues } from "@/lib/saved-venues";
import { isUsefulValue } from "@/lib/useful-values";

type VenueComparisonProps = {
  facilities: FacilityCardFacility[];
  initialSlugs: string[];
};

type ComparisonRow = {
  label: string;
  value: (facility: FacilityCardFacility) => string | string[] | undefined;
};

type ComparisonGroup = {
  title: string;
  rows: ComparisonRow[];
};

function useful(value?: string) {
  return isUsefulValue(value) ? value : undefined;
}

const comparisonGroups: ComparisonGroup[] = [
  {
    title: "Essential details",
    rows: [
      { label: "Location", value: (facility) => facility.neighbourhood || facility.location },
      { label: "Nearest station", value: (facility) => facility.nearestStation },
      { label: "Price", value: (facility) => facility.priceFrom || facility.priceRange },
      { label: "Access", value: (facility) => facility.accessType },
      { label: "Venue type", value: (facility) => facility.venueType },
    ],
  },
  {
    title: "Experience",
    rows: [
      { label: "Services", value: (facility) => getUsefulServiceLabels(facility.services, undefined, 8) },
      { label: "Session format", value: (facility) => facility.privateOrShared },
      { label: "Booking", value: (facility) => facility.bookingRequired },
      { label: "Guided sessions", value: (facility) => facility.guidedSessionsAvailable },
      { label: "Sauna type", value: (facility) => facility.saunaType },
      { label: "Cold plunge", value: (facility) => facility.coldPlungeType || facility.contrastTherapyAvailable },
      { label: "Cryotherapy", value: (facility) => facility.cryoType },
    ],
  },
  {
    title: "Practical facilities",
    rows: [
      { label: "Towels", value: (facility) => facility.towelsIncluded },
      { label: "Showers", value: (facility) => facility.showersAvailable },
      { label: "Changing rooms", value: (facility) => facility.changingRooms },
      { label: "Opening hours", value: (facility) => facility.openingHours },
      { label: "Information checked", value: (facility) => facility.lastCheckedDate },
    ],
  },
];

function displayValue(value: string | string[] | undefined) {
  const values = Array.isArray(value) ? value.filter(isUsefulValue) : useful(value) ? [value as string] : [];
  if (values.length === 0) return <span className="text-[#9a8e7e]">Not confirmed</span>;
  return values.join(" · ");
}

function hasComparisonValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value.some(isUsefulValue) : isUsefulValue(value);
}

export default function VenueComparison({ facilities, initialSlugs }: VenueComparisonProps) {
  const savedSnapshot = useSyncExternalStore(subscribeToSavedVenues, getSavedVenueSnapshot, () => "[]");
  const savedSlugs = useMemo(() => parseSavedVenueSlugs(savedSnapshot), [savedSnapshot]);
  const [chosenSlugs, setChosenSlugs] = useState<string[] | null>(() => {
    const validInitialSlugs = initialSlugs.filter((slug) => facilities.some((facility) => facility.slug === slug)).slice(0, 4);
    return validInitialSlugs.length > 0 ? validInitialSlugs : null;
  });
  const [addSlug, setAddSlug] = useState("");
  const [shareStatus, setShareStatus] = useState("");
  const selectedSlugs = useMemo(
    () => chosenSlugs ?? savedSlugs.filter((slug) => facilities.some((facility) => facility.slug === slug)).slice(0, 4),
    [chosenSlugs, facilities, savedSlugs],
  );

  useEffect(() => {
    if (selectedSlugs.length === 0) return;
    const url = new URL(window.location.href);
    url.searchParams.set("venues", selectedSlugs.join(","));
    window.history.replaceState({}, "", url);
  }, [selectedSlugs]);

  const selectedFacilities = selectedSlugs
    .map((slug) => facilities.find((facility) => facility.slug === slug))
    .filter((facility): facility is FacilityCardFacility => Boolean(facility));
  const visibleGroups = comparisonGroups
    .map((group) => ({ ...group, rows: group.rows.filter((row) => selectedFacilities.some((facility) => hasComparisonValue(row.value(facility)))) }))
    .filter((group) => group.rows.length > 0);
  const availableFacilities = facilities.filter((facility) => !selectedSlugs.includes(facility.slug));
  const columnStyle = {
    gridTemplateColumns: `minmax(9rem, 0.7fr) repeat(${Math.max(selectedFacilities.length, 1)}, minmax(13.5rem, 1fr))`,
    minWidth: `${152 + Math.max(selectedFacilities.length, 1) * 224}px`,
  };

  function addVenue() {
    if (!addSlug || selectedSlugs.includes(addSlug) || selectedSlugs.length >= 4) return;
    setChosenSlugs([...selectedSlugs, addSlug]);
    setAddSlug("");
    trackEvent("venue_comparison_add", { facility_slug: addSlug, comparison_size: selectedSlugs.length + 1 });
  }

  function removeVenue(slug: string) {
    setChosenSlugs(selectedSlugs.filter((item) => item !== slug));
    trackEvent("venue_comparison_remove", { facility_slug: slug, comparison_size: Math.max(0, selectedSlugs.length - 1) });
  }

  async function shareComparison() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Well+ venue comparison", url });
        setShareStatus("Comparison shared");
      } else {
        await navigator.clipboard.writeText(url);
        setShareStatus("Link copied");
      }
      trackEvent("venue_comparison_shared", { comparison_size: selectedFacilities.length });
    } catch (error) {
      if ((error as Error).name !== "AbortError") setShareStatus("Copy the address from your browser to share");
    }
  }

  return (
    <div>
      <section className="mb-6 rounded-[1.25rem] border border-[#b9ab97] bg-[#ded4c5] p-4 sm:p-5" aria-label="Comparison controls">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex-1">
            <label htmlFor="add-comparison-venue" className="mb-2 block text-sm font-medium text-[#29241d]">Add a venue</label>
            <div className="flex max-w-2xl flex-col gap-2 sm:flex-row">
              <select id="add-comparison-venue" value={addSlug} onChange={(event) => setAddSlug(event.target.value)} disabled={selectedSlugs.length >= 4} className="min-h-12 min-w-0 flex-1 rounded-full border border-[#b9ab97] bg-[#fbf8f1] px-4 text-sm text-[#29241d] outline-none focus:ring-2 focus:ring-[#6f6048]">
                <option value="">{selectedSlugs.length >= 4 ? "Maximum of four venues selected" : "Choose another venue"}</option>
                {availableFacilities.map((facility) => <option key={facility.slug} value={facility.slug}>{facility.name} — {facility.neighbourhood || facility.location || "London"}</option>)}
              </select>
              <button type="button" onClick={addVenue} disabled={!addSlug || selectedSlugs.length >= 4} className="min-h-12 rounded-full bg-[#29241d] px-6 text-sm font-medium text-[#fbf8f1] transition enabled:hover:bg-[#463c31] disabled:cursor-not-allowed disabled:opacity-45">Add venue</button>
            </div>
            <p className="mt-2 text-xs text-[#70695d]">Compare up to four venues. Missing information is shown clearly.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/shortlist" className="inline-flex min-h-12 items-center rounded-full border border-[#9f907b] px-5 text-sm font-medium">Saved venues</Link>
            {selectedFacilities.length >= 2 ? <button type="button" onClick={shareComparison} className="inline-flex min-h-12 items-center rounded-full border border-[#9f907b] bg-[#fbf8f1] px-5 text-sm font-medium transition hover:bg-white">Share comparison</button> : null}
          </div>
        </div>
        {shareStatus ? <p className="mt-3 text-sm font-medium text-[#5f574c]" role="status">{shareStatus}</p> : null}
      </section>

      {selectedFacilities.length === 0 ? (
        <section className="rounded-[1.25rem] border border-[#d8cebf] bg-[#fbf8f1] p-7 sm:p-10">
          <p className="editorial-eyebrow">No venues selected</p>
          <h2 className="mt-4 text-4xl font-medium">Choose two places to see the differences.</h2>
          <p className="mt-4 max-w-xl text-base leading-8 text-[#5f574c]">Add venues above or return to the directory and save the places that interest you.</p>
          <Link href="/explore" className="mt-6 inline-flex min-h-12 items-center rounded-full bg-[#29241d] px-6 text-sm font-medium text-[#fbf8f1]">Explore venues</Link>
        </section>
      ) : (
        <section className="overflow-hidden rounded-[1.35rem] border border-[#b9ab97] bg-[#fbf8f1] shadow-[0_20px_52px_rgba(41,36,29,0.08)]" aria-label={`Comparison of ${selectedFacilities.length} venues`}>
          <div className="overflow-x-auto">
            <div className="grid" style={columnStyle}>
              <div className="sticky left-0 z-20 border-b border-r border-[#d8cebf] bg-[#eee7dc] p-4 sm:p-5">
                <p className="text-sm font-medium">{selectedFacilities.length} selected</p>
                <p className="mt-1 text-xs leading-5 text-[#70695d]"><span className="sm:hidden">Swipe across</span><span className="hidden sm:inline">Read down each column</span></p>
              </div>
              {selectedFacilities.map((facility) => (
                <div key={`${facility.slug}-heading`} className="border-b border-r border-[#d8cebf] bg-[#eee7dc] p-4 sm:p-5">
                  <div className="relative mb-4 aspect-[1.65/1] overflow-hidden rounded-[0.8rem] bg-[#d8cebf]">
                    {facility.imageUrl ? <SafeImage src={facility.imageUrl} alt={facility.imageAlt || facility.name} fill sizes="240px" className="object-cover" /> : <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(251,248,241,0.72),transparent_30%),linear-gradient(145deg,#ded4c5,#9f907b)]" />}
                  </div>
                  <h2 className="text-xl font-medium leading-6 tracking-[-0.03em]">{facility.name}</h2>
                  <p className="mt-1 text-sm text-[#6f6048]">{facility.neighbourhood || facility.location || "London"}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link href={`/facility/${facility.slug}`} className="text-sm font-medium underline underline-offset-4">View profile</Link>
                    <button type="button" onClick={() => removeVenue(facility.slug)} className="text-sm text-[#70695d] underline underline-offset-4" aria-label={`Remove ${facility.name} from comparison`}>Remove</button>
                  </div>
                </div>
              ))}

              {visibleGroups.flatMap((group) => [
                <div key={`${group.title}-label`} className="sticky left-0 z-10 border-b border-r border-[#d8cebf] bg-[#29241d] px-4 py-3 text-sm font-medium text-[#fbf8f1] sm:px-5">{group.title}</div>,
                ...selectedFacilities.map((facility) => <div key={`${group.title}-${facility.slug}`} className="border-b border-r border-[#3f382f] bg-[#29241d] px-4 py-3 sm:px-5" aria-hidden="true" />),
                ...group.rows.flatMap((row) => [
                  <div key={`${group.title}-${row.label}-label`} className="sticky left-0 z-10 border-b border-r border-[#e3d9cb] bg-[#f5f0e7] px-4 py-4 text-sm font-medium text-[#5f574c] sm:px-5">{row.label}</div>,
                  ...selectedFacilities.map((facility) => (
                    <div key={`${group.title}-${row.label}-${facility.slug}`} className="border-b border-r border-[#e3d9cb] px-4 py-4 text-sm leading-6 text-[#29241d] sm:px-5">
                      {displayValue(row.value(facility))}
                    </div>
                  )),
                ]),
              ])}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
