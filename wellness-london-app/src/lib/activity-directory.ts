import type { AirtableFacility } from "@/lib/airtable";
import { getFacilitiesForActivity, type ActivityPageConfig } from "@/lib/activity-pages";

function normaliseSignal(value?: string) {
  return (value || "").trim().toLowerCase();
}

function isMeaningfulStructuredValue(value?: string) {
  const normalised = normaliseSignal(value);
  return Boolean(normalised) && !["unknown", "not confirmed", "details not yet confirmed", "n/a", "no"].includes(normalised);
}

function structuredActivityText(facility: AirtableFacility) {
  return [
    ...facility.serviceNames,
    facility.primaryService,
    ...facility.secondaryServices,
    ...facility.servicesOffered,
    ...facility.activityTagsStandardized,
    ...facility.activityDisplayLabels,
    ...facility.activityCategories,
    ...facility.saunaType,
    facility.coldPlungeType,
    facility.cryoType,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function matchesFacilityActivitySignals(facility: AirtableFacility, activity: ActivityPageConfig) {
  const structuredText = structuredActivityText(facility);
  const explicitLabelMatch = activity.activityLabels.some((label) => structuredText.includes(label.toLowerCase()));
  const keywordMatch = activity.keywords.some((keyword) => structuredText.includes(keyword.toLowerCase()));

  if (explicitLabelMatch || keywordMatch) return true;

  if (activity.slug === "contrast-therapy-london") {
    if (normaliseSignal(facility.contrastTherapyAvailable) === "yes") return true;

    const hasSauna =
      structuredText.includes("sauna") ||
      facility.saunaType.some((value) => isMeaningfulStructuredValue(value));
    const hasColdWater =
      structuredText.includes("cold plunge") ||
      structuredText.includes("ice bath") ||
      structuredText.includes("plunge") ||
      isMeaningfulStructuredValue(facility.coldPlungeType);

    return hasSauna && hasColdWater;
  }

  return false;
}

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
