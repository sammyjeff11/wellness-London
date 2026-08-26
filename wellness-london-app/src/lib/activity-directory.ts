import type { AirtableFacility } from "@/lib/airtable";
import { getFacilitiesForActivity, type ActivityPageConfig } from "@/lib/activity-pages";
import { matchesFacilityActivitySignals } from "@/lib/activity-signal-matching";

/**
 * Service pages should use the same published/indexable Airtable records as the
 * wider directory, while matching against both canonical taxonomy fields and
 * preserved structured source fields. This prevents composite services such as
 * "Sauna & Plunge" from disappearing when canonicalisation does not map the
 * original label to a single service key.
 */
export function getDirectoryFacilitiesForActivity(facilities: AirtableFacility[], activity: ActivityPageConfig) {
  const canonicalMatches = getFacilitiesForActivity(facilities, activity);
  const canonicalIds = new Set(canonicalMatches.map((facility) => facility.id));

  return facilities
    .filter((facility) => canonicalIds.has(facility.id) || matchesFacilityActivitySignals(facility, activity))
    .sort((a, b) => b.profileCompletenessScore - a.profileCompletenessScore);
}
