import type { ServiceDirectoryFacility } from "@/components/ServiceDirectory";
import type { ServiceSlug } from "@/lib/taxonomy";
import { canonicalServiceSlug } from "@/lib/taxonomy";

export type CollectionMatch = {
  serviceKey?: ServiceSlug;
  serviceKeys?: ServiceSlug[];
  allServiceKeys?: ServiceSlug[];
  premiumLevelIncludes?: string[];
  beginnerFriendly?: boolean;
  privateOrSharedIncludes?: string[];
  venueTypeIncludes?: string[];
  experienceTypeIncludes?: string[];
};

export type CollectionFeaturedSection = {
  label: string;
  description: string;
  match: CollectionMatch;
};

export type CollectionConfig = {
  slug: string;
  href: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heroText: string;
  introParagraphs: string[];
  serviceKeys: ServiceSlug[];
  allServiceKeys?: ServiceSlug[];
  venueTypeIncludes?: string[];
  featuredSections: CollectionFeaturedSection[];
};

const saunaAndColdPlungeMatch: CollectionMatch = {
  allServiceKeys: ["sauna", "cold-plunge"],
  experienceTypeIncludes: ["contrast", "guided", "group", "shared"],
};

const contrastTherapyCoreMatch: CollectionMatch = {
  allServiceKeys: ["sauna", "cold-plunge"],
};

export const collections = [
  {
    slug: "best-sauna-london",
    href: "/collections/best-sauna-london",
    title: "Best saunas in London",
    metaTitle: "Best Saunas in London (2026) | Well+",
    metaDescription:
      "Compare London saunas, from communal and traditional heat to private infrared rooms and sauna-and-cold-plunge venues.",
    eyebrow: "London sauna shortlist",
    heroText: "Compare communal saunas, private infrared rooms and venues that pair heat with a cold plunge.",
    introParagraphs: [
      "A sauna booking in London can mean a communal session, a private infrared cabin, a traditional bathhouse or a members' club. The format matters because it changes the temperature, privacy, facilities and price.",
      "This collection starts with venues that clearly list sauna or infrared sauna access, then prioritises completeness, practical details, beginner suitability and whether the setting supports a fuller heat-and-cold routine — also known as contrast therapy when sauna is paired with cold plunge or ice bath.",
    ],
    serviceKeys: ["sauna", "infrared-sauna"],
    featuredSections: [
      {
        label: "Best overall",
        description: "A well-documented sauna option with clear access, practical facilities and a format that suits regular use.",
        match: { serviceKeys: ["sauna", "infrared-sauna"] },
      },
      {
        label: "Best premium sauna",
        description: "For people comparing hotel-level facilities, more privacy or a members' club setting.",
        match: { serviceKeys: ["sauna", "infrared-sauna"], premiumLevelIncludes: ["premium", "luxury"] },
      },
      {
        label: "Best for first timers",
        description: "A clearer, more approachable sauna option for people who want fewer unknowns before booking.",
        match: { serviceKeys: ["sauna", "infrared-sauna"], beginnerFriendly: true },
      },
      {
        label: "Best sauna and cold plunge",
        description: "For contrast therapy in one visit: sauna paired with a cold plunge, ice bath or cold-water immersion.",
        match: saunaAndColdPlungeMatch,
      },
    ],
  },
  {
    slug: "best-cold-plunge-london",
    href: "/collections/best-cold-plunge-london",
    title: "Best cold plunges in London",
    metaTitle: "Best Cold Plunges in London (2026) | Well+",
    metaDescription: "Compare London cold plunge and ice bath venues, including contrast therapy spaces where sauna and cold water are used together.",
    eyebrow: "London cold-plunge shortlist",
    heroText: "Compare standalone cold-water sessions, guided first dips and venues that include sauna for contrast therapy.",
    introParagraphs: [
      "Cold plunge in London covers cold-water immersion formats such as ice baths, cold tubs and plunge pools. These may be booked as a standalone cold session or as part of a wider contrast therapy ritual.",
      "Contrast therapy usually means alternating sauna with a cold plunge or ice bath. This shortlist separates standalone cold sessions from full hot-and-cold setups and highlights guidance, beginner suitability and whether sauna access is included.",
    ],
    serviceKeys: ["cold-plunge", "contrast-therapy"],
    featuredSections: [
      {
        label: "Best overall",
        description: "A well-documented cold-plunge option with clear access, session format and practical facilities.",
        match: { serviceKeys: ["cold-plunge", "contrast-therapy"] },
      },
      {
        label: "Best guided cold plunge",
        description: "A better fit if you want structure, coaching or a supported cold-water experience rather than a solo dip.",
        match: { serviceKeys: ["cold-plunge", "contrast-therapy"], experienceTypeIncludes: ["guided", "class", "group", "breath"] },
      },
      {
        label: "Best for first timers",
        description: "A more approachable starting point for users trying cold plunge, ice baths or cold-water immersion for the first time.",
        match: { serviceKeys: ["cold-plunge", "contrast-therapy"], beginnerFriendly: true },
      },
      {
        label: "Best sauna and cold plunge",
        description: "A stronger option when the goal is contrast therapy: hot and cold in the same visit.",
        match: saunaAndColdPlungeMatch,
      },
    ],
  },
  {
    slug: "best-contrast-therapy-london",
    href: "/collections/best-contrast-therapy-london",
    title: "Best contrast therapy in London",
    metaTitle: "Best Contrast Therapy in London (2026) | Well+",
    metaDescription:
      "Compare the best contrast therapy venues in London, including sauna and ice bath, sauna and cold plunge, hot-and-cold recovery and guided contrast sessions.",
    eyebrow: "London hot-and-cold shortlist",
    heroText: "Compare venues where sauna and cold-water immersion are available as one coherent session.",
    introParagraphs: [
      "Contrast therapy is the umbrella term for moving between heat and cold. In London, people may search for it as sauna and cold plunge, sauna and ice bath, hot-and-cold therapy, contrast bathing or a thermal circuit. The strongest venues make that sequence clear rather than simply listing a sauna in one place and a cold tub somewhere else.",
      "The practical difference is flow. A good contrast therapy venue should make it easy to move between sauna or heat exposure, cold-water immersion, showers and a calmer recovery space. Guidance also matters, especially if you are new to ice baths or unsure how long to spend in each round.",
      "This shortlist includes venues with both sauna and cold-water access, then separates guided sessions, first-timer options, higher-service settings and shared formats. The aim is to compare the whole setup, not simply find the nearest ice bath.",
    ],
    serviceKeys: ["sauna", "cold-plunge"],
    allServiceKeys: ["sauna", "cold-plunge"],
    featuredSections: [
      {
        label: "Best overall contrast therapy",
        description: "A well-documented hot-and-cold venue with sauna, cold-water access and a practical route between the two.",
        match: contrastTherapyCoreMatch,
      },
      {
        label: "Best guided hot-and-cold session",
        description: "For users who want more structure around breathing, timing, rounds and how to move safely between sauna and ice bath or cold plunge.",
        match: { allServiceKeys: ["sauna", "cold-plunge"], experienceTypeIncludes: ["guided", "class", "group", "breath", "contrast"] },
      },
      {
        label: "Best premium contrast space",
        description: "For people who value privacy, staff support, towels, showers and a higher-service setting as well as the equipment.",
        match: { allServiceKeys: ["sauna", "cold-plunge"], premiumLevelIncludes: ["premium", "luxury"] },
      },
      {
        label: "Best for first timers",
        description: "A more approachable place to try contrast therapy when clear guidance, shorter first dips and practical facilities matter most.",
        match: { allServiceKeys: ["sauna", "cold-plunge"], beginnerFriendly: true },
      },
      {
        label: "Best social contrast ritual",
        description: "For group sessions, shared sauna culture or a communal hot-and-cold format rather than a private booking.",
        match: saunaAndColdPlungeMatch,
      },
    ],
  },
  {
    slug: "best-recovery-clubs-london",
    href: "/collections/best-recovery-clubs-london",
    title: "Best recovery clubs in London",
    metaTitle: "Best Recovery Clubs in London (2026) | Well+",
    metaDescription:
      "Explore London recovery clubs and studios offering saunas, cold plunges, cryotherapy, red light therapy and recovery-focused treatments.",
    eyebrow: "London recovery shortlist",
    heroText: "Compare multi-service clubs and studios for heat, cold, light, oxygen and post-training recovery.",
    introParagraphs: [
      "Recovery clubs bring several modalities into one setting: sauna, cold plunge, cryotherapy, red light therapy, compression, HBOT or other appointment-led recovery treatments.",
      "This collection gives priority to venues that look routine-friendly rather than one-off only — places where location, practical amenities, technology and repeat booking models matter.",
    ],
    serviceKeys: ["sauna", "cold-plunge", "cryotherapy", "red-light-therapy", "contrast-therapy", "hyperbaric-oxygen-therapy"],
    venueTypeIncludes: ["recovery", "club", "studio", "clinic", "wellness"],
    featuredSections: [
      {
        label: "Best overall recovery club",
        description: "A multi-service recovery venue with enough access, facility and booking detail to compare confidently.",
        match: { serviceKeys: ["sauna", "cold-plunge", "cryotherapy", "red-light-therapy", "contrast-therapy", "hyperbaric-oxygen-therapy"], venueTypeIncludes: ["recovery", "club", "studio", "wellness"] },
      },
      {
        label: "Best premium recovery space",
        description: "For people comparing more private, facility-rich or hospitality-led recovery settings.",
        match: { serviceKeys: ["sauna", "cold-plunge", "cryotherapy", "red-light-therapy", "contrast-therapy", "hyperbaric-oxygen-therapy"], premiumLevelIncludes: ["premium", "luxury"] },
      },
      {
        label: "Best for post-gym recovery",
        description: "A practical choice when the visit is about repeatable post-training recovery rather than a spa day.",
        match: { serviceKeys: ["sauna", "cold-plunge", "cryotherapy", "contrast-therapy"], experienceTypeIncludes: ["recovery", "performance", "sport", "fitness", "guided"] },
      },
      {
        label: "Best technology-led recovery",
        description: "A stronger fit for users looking for cryotherapy, red light therapy, HBOT or other equipment-led recovery formats.",
        match: { serviceKeys: ["cryotherapy", "red-light-therapy", "hyperbaric-oxygen-therapy"] },
      },
    ],
  },
] as const satisfies readonly CollectionConfig[];

export type CollectionSlug = (typeof collections)[number]["slug"];

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

const directoryServiceKey: Partial<Record<ServiceSlug, string>> = {
  sauna: "sauna",
  "cold-plunge": "cold-plunge",
  cryotherapy: "cryotherapy",
  "red-light-therapy": "red-light",
  breathwork: "breathwork",
  "hyperbaric-oxygen-therapy": "hbot",
};

function normaliseText(value?: string) {
  return value?.toLowerCase().trim() || "";
}

function includesAny(value: string | undefined, needles: string[] | undefined) {
  const normalisedValue = normaliseText(value);
  return Boolean(needles?.some((needle) => normalisedValue.includes(needle.toLowerCase())));
}

function listIncludesAny(values: string[] | undefined, needles: string[] | undefined) {
  const normalisedValues = values?.map((value) => value.toLowerCase()) || [];
  return Boolean(needles?.some((needle) => normalisedValues.some((value) => value.includes(needle.toLowerCase()))));
}

export function facilityHasCollectionService(facility: ServiceDirectoryFacility, serviceKey: ServiceSlug) {
  const exactServiceMatch = (facility.services || []).some((service) => canonicalServiceSlug(service) === serviceKey);
  if (exactServiceMatch) return true;

  const key = directoryServiceKey[serviceKey];
  return Boolean(key && (facility.serviceKeys || []).includes(key));
}

export function facilityMatchesCollection(facility: ServiceDirectoryFacility, collection: CollectionConfig) {
  const serviceMatch = collection.serviceKeys.some((serviceKey) => facilityHasCollectionService(facility, serviceKey));
  const allServicesMatch = collection.allServiceKeys?.every((serviceKey) => facilityHasCollectionService(facility, serviceKey));
  const venueTypeMatch = includesAny(facility.venueType, collection.venueTypeIncludes);

  if (collection.allServiceKeys?.length) {
    return Boolean(allServicesMatch || venueTypeMatch);
  }

  return serviceMatch || venueTypeMatch;
}

export function facilityMatchesFeaturedSection(facility: ServiceDirectoryFacility, match: CollectionMatch) {
  if (match.serviceKey && !facilityHasCollectionService(facility, match.serviceKey)) return false;
  if (match.serviceKeys && !match.serviceKeys.some((serviceKey) => facilityHasCollectionService(facility, serviceKey))) return false;
  if (match.allServiceKeys && !match.allServiceKeys.every((serviceKey) => facilityHasCollectionService(facility, serviceKey))) return false;
  if (match.premiumLevelIncludes && !includesAny(facility.premiumLevel, match.premiumLevelIncludes)) return false;
  if (match.beginnerFriendly && !normaliseText(facility.beginnerFriendly).includes("yes")) return false;
  if (match.privateOrSharedIncludes && !includesAny(facility.privateOrShared, match.privateOrSharedIncludes)) return false;
  if (match.venueTypeIncludes && !includesAny(facility.venueType, match.venueTypeIncludes)) return false;
  if (match.experienceTypeIncludes && !listIncludesAny(facility.experienceType, match.experienceTypeIncludes)) return false;

  return true;
}

export function directoryFacilityScore(facility: ServiceDirectoryFacility, match?: CollectionMatch) {
  const serviceMatchCount = match
    ? [...(match.serviceKeys || []), ...(match.allServiceKeys || []), ...(match.serviceKey ? [match.serviceKey] : [])].filter((serviceKey) => facilityHasCollectionService(facility, serviceKey)).length
    : facility.serviceKeys.length;

  const premiumBonus = includesAny(facility.premiumLevel, ["premium", "luxury"]) ? 12 : 0;
  const beginnerBonus = normaliseText(facility.beginnerFriendly).includes("yes") ? 8 : 0;
  const completeness = facility.profileCompletenessScore || 0;

  return serviceMatchCount * 20 + premiumBonus + beginnerBonus + completeness;
}
