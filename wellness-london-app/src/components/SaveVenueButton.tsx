"use client";

import { useSyncExternalStore } from "react";
import { trackEvent } from "@/lib/analytics";
import {
  getSavedVenueSnapshot,
  parseSavedVenueSlugs,
  setSavedVenueSlugs,
  subscribeToSavedVenues,
} from "@/lib/saved-venues";

type SaveVenueButtonProps = {
  slug: string;
  name: string;
};

export default function SaveVenueButton({ slug, name }: SaveVenueButtonProps) {
  const snapshot = useSyncExternalStore(subscribeToSavedVenues, getSavedVenueSnapshot, () => "[]");
  const savedSlugs = parseSavedVenueSlugs(snapshot);
  const isSaved = savedSlugs.includes(slug);

  function toggleSaved() {
    const nextSlugs = isSaved ? savedSlugs.filter((savedSlug) => savedSlug !== slug) : [...savedSlugs, slug];
    setSavedVenueSlugs(nextSlugs);
    trackEvent(isSaved ? "venue_shortlist_remove" : "venue_shortlist_save", {
      facility_name: name,
      facility_slug: slug,
      page_path: window.location.pathname,
    });
  }

  return (
    <button
      type="button"
      onClick={toggleSaved}
      aria-pressed={isSaved}
      aria-label={isSaved ? `Remove ${name} from saved venues` : `Save ${name} for later`}
      className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium shadow-[0_12px_28px_rgba(0,0,0,0.14)] backdrop-blur-sm transition ${
        isSaved
          ? "border-[#29241d] bg-[#29241d] text-[#fbf8f1]"
          : "border-white/65 bg-[#fbf8f1]/92 text-[#29241d] hover:bg-white"
      }`}
    >
      <span aria-hidden="true">{isSaved ? "✓" : "+"}</span>
      {isSaved ? "Saved" : "Save"}
    </button>
  );
}
