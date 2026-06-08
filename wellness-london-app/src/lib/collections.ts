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
  venueTypeIncludes?: string[];
  featuredSections: CollectionFeaturedSection[];
};

const saunaAndColdPlungeMatch: CollectionMatch = {
  allServiceKeys: ["sauna", "cold-plunge"],
  experienceTypeIncludes: ["contrast", "guided", "group", "shared"],
};

export const collections = [
  {
    slug: "best-sauna-london",
    href: "/collections/best-sauna-london",
    title: "Best Sauna London",
    metaTitle: "Best Sauna London (2026) | Well+",
    metaDescription:
      "Discover the best sauna experiences in London, from premium wellness clubs to recovery studios and social heat-and-cold spaces, curated by Well+.",
    eyebrow: "Curated heat edit",
    heroText: "The London sauna shortlist for premium heat, first visits and sauna-plus-cold recovery rituals.",
    introParagraphs: [
      "London sauna is no longer one format. The strongest options now range from premium wellness clubs and design-led spas to focused recovery studios and social bathhouse-style spaces.",
      "This collection starts with venues that clearly list sauna or infrared sauna access, then prioritises completeness, practical details, beginner suitability and whether the setting supports a fuller heat-and-cold routine.",
    ],
    serviceKeys: ["sauna", "infrared-sauna"],
    featuredSections: [
      {
        label: "Best overall",
        description: "A strong all-round sauna pick with useful detail, good positioning and a credible recovery or wellness context.",
        match: { serviceKeys: ["sauna", "infrared-sauna"] },
      },
      {
        label: "Best premium sauna",
        description: "For users who want a more elevated setting, hospitality-led experience or premium wellness-club feel.",
        match: { serviceKeys: ["sauna", "infrared-sauna"], premiumLevelIncludes: ["premium", "luxury"] },
      },
      {
        label: "Best for first timers",
        description: "A clearer, more approachable sauna option for people who want fewer unknowns before booking.",
        match: { serviceKeys: ["sauna", "infrared-sauna"], beginnerFriendly: true },
      },
      {
        label: "Best sauna and cold plunge",
        description: "A better fit when you want contrast: heat exposure paired with a cold plunge, ice bath or cold-water reset.",
        match: saunaAndColdPlungeMatch,
      },
    ],
  },
  {
    slug: "best-cold-plunge-london",
    href: "/collections/best-cold-plunge-london",
    title: "Best Cold Plunge London",
    metaTitle: "Best Cold Plunge London (2026) | Well+",
    metaDescription: "Compare London cold plunge, ice bath and contrast therapy venues, curated by Well+.",
    eyebrow: "Curated cold edit",
    heroText: "London cold plunge, ice bath and contrast spaces for guided sessions, first dips and sauna-paired recovery.",
    introParagraphs: [
      "Cold plunge in London covers everything from guided group immersion and ice-bath recovery rooms to bathhouse circuits where cold exposure is part of a wider thermal ritual.",
      "This edit favours venues with cold plunge or contrast therapy signals, then highlights practical fit: guidance, beginner friendliness, premium context and whether a sauna is available too.",
    ],
    serviceKeys: ["cold-plunge", "contrast-therapy"],
    featuredSections: [
      {
        label: "Best overall",
        description: "A balanced cold-plunge choice with useful venue detail and a credible recovery or wellness setting.",
        match: { serviceKeys: ["cold-plunge", "contrast-therapy"] },
      },
      {
        label: "Best guided cold plunge",
        description: "A better fit if you want structure, coaching or a supported cold-water experience rather than a solo dip.",
        match: { serviceKeys: ["cold-plunge", "contrast-therapy"], experienceTypeIncludes: ["guided", "class", "group", "breath"] },
      },
      {
        label: "Best for first timers",
        description: "A more approachable starting point for users trying ice baths or cold-water immersion for the first time.",
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
    slug: "best-recovery-clubs-london",
    href: "/collections/best-recovery-clubs-london",
    title: "Best Recovery Clubs London",
    metaTitle: "Best Recovery Clubs London (2026) | Well+",
    metaDescription:
      "Explore London recovery clubs and studios offering saunas, cold plunges, cryotherapy, red light therapy and recovery-focused treatments.",
    eyebrow: "Curated recovery edit",
    heroText: "Recovery clubs and studios for heat, cold, light, oxygen and post-training reset routines across London.",
    introParagraphs: [
      "Recovery clubs bring several modalities into one setting: sauna, cold plunge, cryotherapy, red light therapy, compression, HBOT or other appointment-led recovery treatments.",
      "This collection gives priority to venues that look routine-friendly rather than one-off only — places where location, practical amenities, technology and repeat booking models matter.",
    ],
    serviceKeys: ["sauna", "cold-plunge", "cryotherapy", "red-light-therapy", "contrast-therapy", "hyperbaric-oxygen-therapy"],
    venueTypeIncludes: ["recovery", "club", "studio", "clinic", "wellness"],
    featuredSections: [
      {
        label: "Best overall recovery club",
        description: "A strong all-round recovery pick with multiple relevant services and enough detail to compare confidently.",
        match: { serviceKeys: ["sauna", "cold-plunge", "cryotherapy", "red-light-therapy", "contrast-therapy", "hyperbaric-oxygen-therapy"], venueTypeIncludes: ["recovery", "club", "studio", "wellness"] },
      },
      {
        label: "Best premium recovery space",
        description: "For users comparing elevated recovery settings, premium clubs or design-led wellness spaces.",
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

const directoryServiceAliases: Record<ServiceSlug, string[]> = {
  sauna: ["sauna"],
  "infrared-sauna": ["sauna"],
  "cold-plunge": ["cold-plunge"],
  cryotherapy: ["cryotherapy"],
  "red-light-therapy": ["red-light"],
  "contrast-therapy": ["sauna", "cold-plunge", "recovery"],
  massage: ["recovery"],
  breathwork: ["breathwork"],
  "float-therapy": ["recovery"],
  "hyperbaric-oxygen-therapy": ["hbot"],
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
  const aliases = directoryServiceAliases[serviceKey] || [serviceKey];
  const directoryKeys = facility.serviceKeys || [];
  if (aliases.some((alias) => directoryKeys.includes(alias))) return true;

  return (facility.services || []).some((service) => canonicalServiceSlug(service) === serviceKey);
}

export function facilityMatchesCollection(facility: ServiceDirectoryFacility, collection: CollectionConfig) {
  const serviceMatch = collection.serviceKeys.some((serviceKey) => facilityHasCollectionService(facility, serviceKey));
  const venueTypeMatch = includesAny(facility.venueType, collection.venueTypeIncludes);

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

  return Number(facility.isFeatured) * 100 + serviceMatchCount * 20 + premiumBonus + beginnerBonus + completeness;
}
