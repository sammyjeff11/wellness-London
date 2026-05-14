import { topicalPathways } from "@/content/topical-pathways";

export type FacilityServiceTag = string;

export function getFacilityTopicalContext(serviceTags: FacilityServiceTag[] = []) {
  const normalisedTags = serviceTags.map((tag) => tag.toLowerCase());

  const relatedModalities = [];
  const relatedOutcomes = [
    topicalPathways.recovery,
    topicalPathways.longevity,
    topicalPathways.stressRegulation,
  ];

  if (normalisedTags.some((tag) => tag.includes("sauna"))) {
    relatedModalities.push(topicalPathways.modalities.sauna);
  }

  if (
    normalisedTags.some(
      (tag) =>
        tag.includes("cold plunge") ||
        tag.includes("ice bath") ||
        tag.includes("cold exposure")
    )
  ) {
    relatedModalities.push(topicalPathways.modalities.coldPlunge);
  }

  if (normalisedTags.some((tag) => tag.includes("cryotherapy"))) {
    relatedModalities.push(topicalPathways.modalities.cryotherapy);
  }

  if (normalisedTags.some((tag) => tag.includes("contrast"))) {
    relatedModalities.push(topicalPathways.modalities.contrastTherapy);
  }

  return {
    parentTopic: topicalPathways.recovery,
    relatedModalities,
    relatedOutcomes,
  };
}
