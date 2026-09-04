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
      "Browse Lowlu locations in London, including its live sauna and plunge venues in Kentish Town, Wandsworth and Ilford.",
    seoTitle: "Lowlu London locations | Well+ London",
    seoDescription:
      "Compare Lowlu sauna and cold plunge locations in Kentish Town, Wandsworth and Ilford, with access, pricing and booking details.",
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
  {
    slug: "neko-health",
    name: "Neko Health",
    operator: "Neko Health",
    eyebrow: "Preventive health screening provider",
    intro:
      "Neko Health offers a one-hour preventive health scan at four London clinics, combining skin, cardiovascular, blood-biomarker and body-composition measurements with doctor review.",
    description:
      "Compare Neko Health clinics by neighbourhood and opening hours. The core £299 scan is consistent across London, while availability and appointment times vary by location.",
    seoTitle: "Neko Health London locations and scan price | Well+",
    seoDescription:
      "Compare Neko Health clinics in Covent Garden, Spitalfields, Marylebone and Victoria, including addresses, opening hours and the published £299 scan price.",
  },
  {
    slug: "stretchlab",
    name: "StretchLAB",
    operator: "StretchLAB",
    eyebrow: "Assisted stretching studio operator",
    intro:
      "StretchLAB operates physiotherapist-supervised assisted stretching studios across London, with one-to-one sessions focused on mobility, posture and recovery.",
    description:
      "Compare the seven current StretchLAB studios by neighbourhood and choose the most convenient branch. Introductory sessions and studio credits can be used across the London network.",
    seoTitle: "StretchLAB London locations and prices | Well+",
    seoDescription:
      "Compare all seven StretchLAB London studios, with addresses, opening hours and the published £60 introductory session price.",
  },
  {
    slug: "pulse-club-sauna",
    name: "Pulse Club Sauna",
    operator: "Pulse Club Sauna",
    eyebrow: "Contrast therapy operator",
    intro:
      "Pulse Club Sauna runs Finnish-sauna and cold-plunge clubs in Fulham and Putney, with 75-minute sessions, showers, lockers and towels included.",
    description:
      "Compare Pulse's two south-west London clubs by address and opening hours. Both publish the same drop-in and introductory pricing, but their weekly maintenance opening differs.",
    seoTitle: "Pulse Club Sauna Fulham and Putney | Well+",
    seoDescription:
      "Compare Pulse Club Sauna locations in Fulham and Putney, including addresses, opening hours, facilities and drop-in prices from £17.",
  },
  {
    slug: "banya-no-1",
    name: "Banya No.1",
    operator: "Banya No.1",
    eyebrow: "Traditional steam-banya operator",
    intro:
      "Banya No.1 brings traditional high-humidity steam, cold immersion and Parenie treatments to bathhouses in Hoxton and Chiswick.",
    description:
      "Compare the two London banyas by location, access and published price. Both centre on steam-and-cold ritual, while treatment spaces and current packages differ by branch.",
    seoTitle: "Banya No.1 Hoxton and Chiswick | Well+",
    seoDescription:
      "Compare Banya No.1 locations in Hoxton and Chiswick, with steam room, cold plunge, Parenie, access and pricing information.",
  },
  {
    slug: "rebody",
    name: "Rebody",
    operator: "Rebody",
    eyebrow: "HBOT and red-light operator",
    intro:
      "Rebody combines mild hyperbaric oxygen at 1.4 ATA with targeted red-light therapy at private studios in Wandsworth and Islington.",
    description:
      "Compare Rebody's two London studios by location and access. Both publish the same consultation-led introductory session and standard session price.",
    seoTitle: "Rebody London locations and HBOT prices | Well+",
    seoDescription:
      "Compare Rebody studios in Wandsworth and Islington, including addresses, opening hours and mild-HBOT plus red-light pricing.",
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
  if (normalisedName.includes("neko health")) return "Neko Health";
  if (normalisedName.includes("stretchlab") || normalisedName.includes("stretch lab")) return "StretchLAB";
  if (normalisedName.includes("pulse club sauna")) return "Pulse Club Sauna";
  if (normalisedName.includes("rebody")) return "Rebody";
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
