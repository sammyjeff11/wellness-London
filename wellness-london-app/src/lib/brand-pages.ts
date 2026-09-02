import { type AirtableFacility } from "@/lib/airtable";

export type BrandPage = {
  slug: string;
  name: string;
  operator: string;
  eyebrow: string;
  intro: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
};

export const brandPages: BrandPage[] = [
  {
    slug: "community-sauna-baths",
    name: "Community Sauna Baths",
    operator: "Community Sauna Baths",
    eyebrow: "Community sauna operator",
    intro:
      "Community Sauna Baths runs neighbourhood sauna and cold-water spaces across London, built around accessible communal sessions rather than private spa rituals.",
    description:
      "Compare the Community Sauna Baths locations currently published on Well+, including their neighbourhood, available services and practical booking information.",
    seoTitle: "Community Sauna Baths London locations | Well+",
    seoDescription:
      "Compare Community Sauna Baths locations across London, with neighbourhood, sauna, cold-water and booking details in one place.",
  },
  {
    slug: "bodyscan",
    name: "BodyScan",
    operator: "BodyScan",
    eyebrow: "Body composition testing provider",
    intro:
      "BodyScan provides DEXA body-composition scanning at several London clinics, with location-specific profiles for access, pricing and what is included.",
    description:
      "Compare BodyScan and BodyView locations currently published on Well+ before choosing the most convenient clinic for a DEXA assessment.",
    seoTitle: "BodyScan and BodyView London locations | Well+",
    seoDescription:
      "Compare BodyScan and BodyView DEXA scanning locations in London, including clinic location, access and published appointment details.",
  },
  {
    slug: "soho-house",
    name: "Soho House",
    operator: "Soho House",
    eyebrow: "Members' club operator",
    intro:
      "Soho House combines members' club spaces with pools, gyms and selected wellness facilities at several London houses.",
    description:
      "See the Soho House locations currently covered by Well+ and compare the wellness facilities attached to each house. Access conditions vary, so check the individual venue profile before planning a visit.",
    seoTitle: "Soho House wellness locations in London | Well+",
    seoDescription:
      "Compare the Soho House London locations covered by Well+, including their published pools, gyms, sauna and wellness facilities.",
  },
  {
    slug: "equinox",
    name: "Equinox",
    operator: "Equinox",
    eyebrow: "Fitness and wellness club operator",
    intro:
      "Equinox operates performance-led London clubs combining extensive training space with spa, steam and selected recovery services.",
    description:
      "Compare the Equinox clubs currently published on Well+, including their location, access model, training offer and available recovery facilities.",
    seoTitle: "Equinox London locations and wellness facilities | Well+",
    seoDescription:
      "Compare Equinox locations in London, including Kensington, Bishopsgate and E by Equinox St James's, with access and wellness details.",
  },
  {
    slug: "third-space",
    name: "Third Space",
    operator: "Third Space",
    eyebrow: "London health club operator",
    intro:
      "Third Space operates London health clubs that bring training, recovery and spa facilities together under a membership model.",
    description:
      "Browse the Third Space venues currently covered by Well+. Each location page separates the services and access information available for that specific club.",
    seoTitle: "Third Space London locations and wellness facilities | Well+",
    seoDescription:
      "Compare Third Space London locations covered by Well+, with club-specific recovery, spa, access and booking information.",
  },
  {
    slug: "lowlu",
    name: "Lowlu",
    operator: "Lowlu",
    eyebrow: "Sauna village operator",
    intro:
      "Lowlu brings outdoor sauna villages, cold plunges and social contrast therapy to London, with app-led booking and a clear focus on heat, cold and rest.",
    description:
      "Browse Lowlu locations in London, including live sauna and plunge villages in Kentish Town and Wandsworth, plus new openings as they become available.",
    seoTitle: "Lowlu London locations | Well+ London",
    seoDescription:
      "Compare Lowlu sauna and cold plunge locations in London, including Kentish Town, Wandsworth and upcoming openings.",
  },
  {
    slug: "rooftop-saunas",
    name: "Rooftop Saunas",
    operator: "Rooftop Saunas",
    eyebrow: "Rooftop sauna operator",
    intro:
      "Rooftop Saunas offers private sauna cabins and outdoor cold plunges at rooftop locations in London.",
    description:
      "Browse Rooftop Saunas in Hackney and Brixton, with separate profiles for clearer booking and neighbourhood discovery.",
    seoTitle: "Rooftop Saunas London locations | Well+ London",
    seoDescription:
      "Compare Rooftop Saunas locations in London, including the Hackney and Brixton sauna-and-cold-plunge venues.",
  },
  {
    slug: "londoncryo",
    name: "LondonCryo",
    operator: "LondonCryo",
    eyebrow: "Recovery studio operator",
    intro:
      "LondonCryo offers cryotherapy and complementary recovery services through studios in Belgravia and St John's Wood.",
    description:
      "Compare the LondonCryo studios currently published on Well+, including their neighbourhood, service mix and practical booking details.",
    seoTitle: "LondonCryo London locations | Well+",
    seoDescription:
      "Compare LondonCryo locations in Belgravia and St John's Wood, with cryotherapy, recovery and booking details.",
  },
];

export function createSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function getBrandOperator(facility: AirtableFacility) {
  const maybeFacility = facility as AirtableFacility & { brandOperator?: string; businessName?: string };
  return maybeFacility.brandOperator || maybeFacility.businessName || inferOperatorFromName(facility.name);
}

export function inferOperatorFromName(name: string) {
  const normalisedName = name.toLowerCase();
  if (normalisedName.includes("lowlu")) return "Lowlu";
  if (normalisedName.includes("rooftop saunas")) return "Rooftop Saunas";
  if (normalisedName.includes("third space")) return "Third Space";
  if (normalisedName.includes("banya no.1") || normalisedName.includes("banya no 1")) return "Banya No.1";
  if (normalisedName.includes("sauna & plunge") || normalisedName.includes("sauna and plunge")) return "Sauna & Plunge";
  return "";
}

export function getBrandPageBySlug(slug: string) {
  return brandPages.find((brand) => brand.slug === slug);
}

export function getBrandPageForFacility(facility: AirtableFacility) {
  const operator = getBrandOperator(facility);
  return brandPages.find((brand) => brand.operator.toLowerCase() === operator.toLowerCase());
}

export function getFacilitiesForBrand(facilities: AirtableFacility[], brand: BrandPage) {
  return facilities
    .filter((facility) => getBrandOperator(facility).toLowerCase() === brand.operator.toLowerCase())
    .sort((a, b) => {
      const liveScore = (facilityIsComingSoon(a) ? 0 : 1) - (facilityIsComingSoon(b) ? 0 : 1);
      if (liveScore !== 0) return -liveScore;
      return a.name.localeCompare(b.name);
    });
}

export function getPublishedMultiLocationBrands(facilities: AirtableFacility[]) {
  return brandPages
    .map((brand) => ({ brand, facilities: getFacilitiesForBrand(facilities, brand) }))
    .filter(({ facilities: brandFacilities }) => brandFacilities.length > 1)
    .sort((a, b) => b.facilities.length - a.facilities.length || a.brand.name.localeCompare(b.brand.name));
}

export function facilityIsComingSoon(facility: AirtableFacility) {
  const text = [facility.name, facility.description, facility.editorialSummary, facility.editorialVerdict, facility.overallPriceRange]
    .join(" ")
    .toLowerCase();
  return text.includes("coming soon");
}
