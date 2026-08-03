import { cache } from "react";
import {
  AIRTABLE_REVALIDATE_SECONDS,
  getFacilities,
  type AirtableFacility,
} from "@/lib/airtable";

type AirtableSelectValue = {
  name?: string;
};

type ClinicalFieldValue = string | boolean | AirtableSelectValue | (string | AirtableSelectValue)[] | null | undefined;

type ClinicalRecord = {
  id: string;
  fields: {
    Slug?: string;
    "Clinic Model"?: ClinicalFieldValue;
    "Clinical Oversight"?: ClinicalFieldValue;
    "Confirmed Diagnostics"?: ClinicalFieldValue;
    "Assessment Format"?: ClinicalFieldValue;
    "Results Included"?: ClinicalFieldValue;
    "Venue Confirmed"?: boolean;
    "Service Last Verified"?: string;
  };
};

type ClinicalResponse = {
  records?: ClinicalRecord[];
  offset?: string;
};

export type LongevityFacility = AirtableFacility & {
  clinicModel: string;
  clinicalOversight: string;
  confirmedDiagnostics: string[];
  assessmentFormat: string[];
  resultsIncluded: string[];
  venueConfirmed: boolean;
  serviceLastVerified: string;
};

const emptyClinicalFields = {
  clinicModel: "",
  clinicalOversight: "",
  confirmedDiagnostics: [] as string[],
  assessmentFormat: [] as string[],
  resultsIncluded: [] as string[],
  venueConfirmed: false,
  serviceLastVerified: "",
};

function normaliseItem(value: string | AirtableSelectValue) {
  return typeof value === "string" ? value : value.name || "";
}

function normaliseList(value: ClinicalFieldValue): string[] {
  if (value === undefined || value === null || value === false) return [];
  if (value === true) return ["Yes"];

  const values = Array.isArray(value) ? value : [value];
  return values
    .flatMap((item) => normaliseItem(item as string | AirtableSelectValue).split(","))
    .map((item) => item.trim())
    .filter(Boolean);
}

function normaliseSingle(value: ClinicalFieldValue) {
  return normaliseList(value).join(", ");
}

async function fetchClinicalFields() {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME || "Wellness London";
  const clinicalBySlug = new Map<string, Omit<LongevityFacility, keyof AirtableFacility>>();

  if (!apiKey || !baseId) return clinicalBySlug;

  let offset: string | undefined;
  const fields = [
    "Slug",
    "Clinic Model",
    "Clinical Oversight",
    "Confirmed Diagnostics",
    "Assessment Format",
    "Results Included",
    "Venue Confirmed",
    "Service Last Verified",
  ];

  do {
    const params = new URLSearchParams({ pageSize: "100" });
    fields.forEach((field) => params.append("fields[]", field));
    if (offset) params.set("offset", offset);

    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?${params.toString()}`;
    const response = await fetch(url, {
      cache: "force-cache",
      headers: { Authorization: `Bearer ${apiKey}` },
      next: {
        revalidate: AIRTABLE_REVALIDATE_SECONDS,
        tags: ["airtable-longevity-fields"],
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch Airtable longevity fields", response.status, response.statusText);
      return clinicalBySlug;
    }

    const data = (await response.json()) as ClinicalResponse;
    (data.records || []).forEach((record) => {
      const slug = record.fields.Slug?.trim();
      if (!slug) return;

      clinicalBySlug.set(slug, {
        clinicModel: normaliseSingle(record.fields["Clinic Model"]),
        clinicalOversight: normaliseSingle(record.fields["Clinical Oversight"]),
        confirmedDiagnostics: normaliseList(record.fields["Confirmed Diagnostics"]),
        assessmentFormat: normaliseList(record.fields["Assessment Format"]),
        resultsIncluded: normaliseList(record.fields["Results Included"]),
        venueConfirmed: record.fields["Venue Confirmed"] === true,
        serviceLastVerified: record.fields["Service Last Verified"] || "",
      });
    });

    offset = data.offset;
  } while (offset);

  return clinicalBySlug;
}

async function fetchLongevityFacilities(): Promise<LongevityFacility[]> {
  const [facilities, clinicalBySlug] = await Promise.all([
    getFacilities(),
    fetchClinicalFields(),
  ]);

  return facilities.map((facility) => ({
    ...facility,
    ...emptyClinicalFields,
    ...(clinicalBySlug.get(facility.slug) || {}),
  }));
}

export function hasStructuredLongevityData(facility: LongevityFacility) {
  return Boolean(
    (facility.clinicModel && facility.clinicModel !== "Not applicable") ||
    (facility.clinicalOversight && facility.clinicalOversight !== "Not applicable") ||
    facility.confirmedDiagnostics.length ||
    facility.assessmentFormat.length ||
    facility.resultsIncluded.length ||
    facility.venueConfirmed ||
    facility.serviceLastVerified
  );
}

export const getLongevityFacilities = cache(fetchLongevityFacilities);
