import type { AirtableFacility } from "./airtable.ts";

export type ActivitySignalConfig = {
  slug: string;
  activityLabels: string[];
  keywords: string[];
};

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

export function matchesFacilityActivitySignals(facility: AirtableFacility, activity: ActivitySignalConfig) {
  const structuredText = structuredActivityText(facility);
  const explicitLabelMatch = activity.activityLabels.some((label) => structuredText.includes(label.toLowerCase()));
  const keywordMatch = activity.keywords.some((keyword) => structuredText.includes(keyword.toLowerCase()));

  if (explicitLabelMatch || keywordMatch) return true;

  if (activity.slug === "cold-plunge-london") {
    return structuredText.includes("plunge") || isMeaningfulStructuredValue(facility.coldPlungeType);
  }

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
