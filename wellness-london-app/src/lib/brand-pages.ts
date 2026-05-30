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
      "Explore Lowlu sauna and cold plunge locations in London, including Kentish Town, Wandsworth and upcoming openings, curated by Well+.",
  },
  {
    slug: "rooftop-saunas",
    name: "Rooftop Saunas",
    operator: "Rooftop Saunas",
    eyebrow: "Rooftop sauna operator",
    intro:
      "Rooftop Saunas offers private sauna cabins, cold plunges and elevated recovery sessions across London rooftop settings.",
    description:
      "Browse Rooftop Saunas locations in London, including Hackney and Brixton, with each listing separated by location for clearer booking and neighbourhood discovery.",
    seoTitle: "Rooftop Saunas London locations | Well+ London",
    seoDescription:
      "Explore Rooftop Saunas locations in London, including Hackney and Brixton rooftop sauna and cold plunge experiences, curated by Well+.",
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

export function facilityIsComingSoon(facility: AirtableFacility) {
  const text = [facility.name, facility.description, facility.editorialSummary, facility.editorialVerdict, facility.overallPriceRange]
    .join(" ")
    .toLowerCase();
  return text.includes("coming soon");
}
