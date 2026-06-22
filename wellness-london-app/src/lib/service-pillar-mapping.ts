import { cache } from "react";
import type { AirtableFacility } from "@/lib/airtable";
import { AIRTABLE_REVALIDATE_SECONDS } from "@/lib/airtable";

export type ServicePillarName =
  | "Recovery & Performance"
  | "Longevity & Diagnostics"
  | "Mobility"
  | "Wellness Clubs"
  | "Exclude from Pillar Pages";

export type ServicePillarMapping = {
  serviceName: string;
  canonicalServiceSlug: string;
  primaryPillar: string;
  displayOnPillarPage: boolean;
  notes?: string;
};

type AirtableSelectValue = {
  id?: string;
  name?: string;
};

type AirtableFieldValue = string | boolean | AirtableSelectValue | null | undefined;

type ServicePillarMappingRecord = {
  id: string;
  fields: {
    "Service Name"?: AirtableFieldValue;
    "Canonical Service Slug"?: AirtableFieldValue;
    "Primary Pillar"?: AirtableFieldValue;
    "Display on Pillar Page?"?: AirtableFieldValue;
    Notes?: AirtableFieldValue;
  };
};

type AirtableResponse = {
  records?: ServicePillarMappingRecord[];
  offset?: string;
};

const SERVICE_PILLAR_MAPPING_TABLE_ID = "tbla50fh3UBUk3LKw";
const SERVICE_PILLAR_MAPPING_TAG = "airtable-service-pillar-mappings";

const fallbackByPillar: Record<ServicePillarName, string[]> = {
  "Recovery & Performance": [
    "Sauna",
    "Infrared Sauna",
    "Finnish Sauna",
    "Cold Plunge",
    "Contrast Therapy",
    "Cryotherapy",
    "Whole Body Cryotherapy",
    "Compression Therapy",
    "Massage",
    "Massage Therapy",
    "Deep Tissue Massage",
    "Sports Massage",
    "Steam Room",
    "Thermal Baths",
    "Hammam",
    "Float Therapy",
    "Floatation Therapy",
    "PEMF Therapy",
    "Altitude Therapy",
    "Cupping",
  ],
  "Longevity & Diagnostics": [
    "Red Light Therapy",
    "Hyperbaric Oxygen Therapy",
    "HBOT",
    "Longevity",
    "Longevity Testing",
    "Diagnostics",
    "Diagnostic Testing",
    "Blood Testing",
    "Genomic Testing",
    "Hormone Testing",
    "Gut Health Testing",
    "Health Optimisation",
    "Medical Wellness",
    "IV Therapy",
    "IV Infusions",
    "IV Drips",
    "NAD+ Therapy",
    "Ozone Therapy",
    "Vitamin Injections",
    "Nutritional Therapy",
    "Nutrition Coaching",
    "Acupuncture",
    "Gut Therapy",
    "Herbal Medicine",
    "Naturopathic Nutrition",
    "Colonic Hydrotherapy",
    "Aesthetics & IV Infusions",
  ],
  Mobility: [
    "Physiotherapy",
    "Assisted Stretching",
    "Assisted Stretch",
    "Reformer Pilates",
    "Pilates",
    "Yoga",
    "Barre",
    "Antigravity Fitness",
    "EMS Medisculpt",
    "Elite Personal Training",
    "Personal Training",
  ],
  "Wellness Clubs": [
    "Fitness",
    "Wellness",
    "Spa",
    "Jacuzzi",
    "Lap Pool",
    "Watsu Pool",
    "Wellness Ritual",
    "Free Flow Sessions",
    "Evening Socials",
    "Guided Classes",
    "Breathwork",
    "Breathwork Classes",
    "Meditation",
    "Guided Meditation Pod",
    "Sound Bath",
    "Sound Baths",
    "Sound Therapy",
    "Aromatherapy",
    "Aromatherapy Massage",
    "Himalayan Salt Room",
    "Sensory Treatments",
    "Meditation Through Breathwork",
  ],
  "Exclude from Pillar Pages": [
    "Facials",
    "Advanced Facials",
    "TEMPLESPA Facials",
    "Murad Method Facials",
    "Aesthetics",
    "Head Spa",
    "Body Detox Treatment",
    "Cryofacial",
    "Cryolipolysis",
    "Cryolipolysis (Fat Freezing)",
    "CryoPen",
    "Psychotherapy",
    "Trichology",
    "Other",
  ],
};

export const fallbackServicePillarMappings: ServicePillarMapping[] = Object.entries(fallbackByPillar).flatMap(
  ([primaryPillar, services]) =>
    services.map((serviceName) => ({
      serviceName,
      canonicalServiceSlug: slugifyServiceName(serviceName),
      primaryPillar,
      displayOnPillarPage: primaryPillar !== "Exclude from Pillar Pages",
      notes: "Fallback taxonomy",
    })),
);

function normaliseAirtableText(value: AirtableFieldValue): string {
  if (value === undefined || value === null || value === false) return "";
  if (typeof value === "object") return value.name || "";
  return String(value).trim();
}

function mapRecordToServicePillarMapping(record: ServicePillarMappingRecord): ServicePillarMapping {
  return {
    serviceName: normaliseAirtableText(record.fields["Service Name"]),
    canonicalServiceSlug: normaliseAirtableText(record.fields["Canonical Service Slug"]),
    primaryPillar: normaliseAirtableText(record.fields["Primary Pillar"]),
    displayOnPillarPage: record.fields["Display on Pillar Page?"] === true,
    notes: normaliseAirtableText(record.fields.Notes) || undefined,
  };
}

export function normaliseServicePillarName(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugifyServiceName(value: string) {
  return normaliseServicePillarName(value).replace(/\s+/g, "-");
}

function uniqueStrings(values: string[]) {
  const seen = new Set<string>();

  return values.reduce<string[]>((items, value) => {
    const cleaned = value.trim();
    const key = normaliseServicePillarName(cleaned);

    if (cleaned && key && !seen.has(key)) {
      seen.add(key);
      items.push(cleaned);
    }

    return items;
  }, []);
}

function buildMappingIndex(servicePillarMappings: ServicePillarMapping[]) {
  const index = new Map<string, ServicePillarMapping[]>();

  servicePillarMappings.forEach((mapping) => {
    const keys = [
      normaliseServicePillarName(mapping.serviceName),
      normaliseServicePillarName(mapping.canonicalServiceSlug),
      normaliseServicePillarName(mapping.canonicalServiceSlug.replace(/-/g, " ")),
    ].filter(Boolean);

    keys.forEach((key) => {
      const existing = index.get(key) || [];
      existing.push(mapping);
      index.set(key, existing);
    });
  });

  return index;
}

export function getVenueServiceNames(venue: AirtableFacility): string[] {
  return uniqueStrings([
    ...venue.serviceNames,
    ...venue.servicesOffered,
    ...venue.activityTagsStandardized,
    ...venue.activityDisplayLabels,
    venue.primaryService,
    ...venue.secondaryServices,
  ]);
}

export function getVenuePillarsFromServices(
  venue: AirtableFacility,
  servicePillarMappings: ServicePillarMapping[],
): string[] {
  const mappingsByService = buildMappingIndex(servicePillarMappings);
  const pillars = new Set<string>();

  getVenueServiceNames(venue).forEach((serviceName) => {
    const mappings = mappingsByService.get(normaliseServicePillarName(serviceName)) || [];

    mappings.forEach((mapping) => {
      if (!mapping.displayOnPillarPage) return;
      if (mapping.primaryPillar === "Exclude from Pillar Pages") return;
      if (mapping.primaryPillar) pillars.add(mapping.primaryPillar);
    });
  });

  return Array.from(pillars);
}

export function getVenueServiceCountForPillar(
  venue: AirtableFacility,
  pillarName: string,
  servicePillarMappings: ServicePillarMapping[],
) {
  const mappingsByService = buildMappingIndex(servicePillarMappings);

  return getVenueServiceNames(venue).filter((serviceName) => {
    const mappings = mappingsByService.get(normaliseServicePillarName(serviceName)) || [];
    return mappings.some(
      (mapping) =>
        mapping.displayOnPillarPage &&
        mapping.primaryPillar !== "Exclude from Pillar Pages" &&
        mapping.primaryPillar === pillarName,
    );
  }).length;
}

export function debugVenuePillarDerivations(
  venues: AirtableFacility[],
  servicePillarMappings: ServicePillarMapping[],
) {
  return venues.map((venue) => ({
    name: venue.name,
    services: getVenueServiceNames(venue),
    derivedPillars: getVenuePillarsFromServices(venue, servicePillarMappings),
  }));
}

async function fetchServicePillarMappingsFromAirtable(): Promise<ServicePillarMapping[]> {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!apiKey || !baseId) {
    console.warn("Airtable environment variables are missing. Falling back to service pillar mapping defaults.");
    return fallbackServicePillarMappings;
  }

  const records: ServicePillarMappingRecord[] = [];
  let offset: string | undefined;

  try {
    do {
      const params = new URLSearchParams({ pageSize: "100" });

      if (offset) {
        params.set("offset", offset);
      }

      const url = `https://api.airtable.com/v0/${baseId}/${SERVICE_PILLAR_MAPPING_TABLE_ID}?${params.toString()}`;
      const response = await fetch(url, {
        cache: "force-cache",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        next: {
          revalidate: AIRTABLE_REVALIDATE_SECONDS,
          tags: [SERVICE_PILLAR_MAPPING_TAG],
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch Airtable service pillar mappings", response.status, response.statusText);
        return fallbackServicePillarMappings;
      }

      const data = (await response.json()) as AirtableResponse;
      records.push(...(data.records || []));
      offset = data.offset;
    } while (offset);
  } catch (error) {
    console.error("Failed to fetch Airtable service pillar mappings", error);
    return fallbackServicePillarMappings;
  }

  return records.map(mapRecordToServicePillarMapping);
}

export const getServicePillarMappings = cache(fetchServicePillarMappingsFromAirtable);
export const AIRTABLE_SERVICE_PILLAR_MAPPING_TAG = SERVICE_PILLAR_MAPPING_TAG;
