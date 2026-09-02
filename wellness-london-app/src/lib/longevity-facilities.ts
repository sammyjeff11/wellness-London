import { cache } from "react";
import {
  getDirectorySnapshotRecords,
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

function getClinicalFields() {
  const clinicalBySlug = new Map<string, Omit<LongevityFacility, keyof AirtableFacility>>();

  (getDirectorySnapshotRecords() as ClinicalRecord[]).forEach((record) => {
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

  return clinicalBySlug;
}

async function fetchLongevityFacilities(): Promise<LongevityFacility[]> {
  const facilities = await getFacilities();
  const clinicalBySlug = getClinicalFields();

  return facilities.map((facility) => ({
    ...facility,
    ...emptyClinicalFields,
    ...(clinicalBySlug.get(facility.slug) || {}),
  }));
}

export function hasStructuredLongevityData(facility: LongevityFacility) {
  const hasClinicalModel = Boolean(
    facility.clinicModel && facility.clinicModel !== "Not applicable",
  );
  const hasMeaningfulOversight = Boolean(
    facility.clinicalOversight &&
    facility.clinicalOversight !== "Not applicable" &&
    facility.clinicalOversight !== "Not confirmed",
  );

  return Boolean(
    hasClinicalModel ||
    hasMeaningfulOversight ||
    facility.confirmedDiagnostics.length ||
    facility.assessmentFormat.length ||
    facility.resultsIncluded.length ||
    facility.venueConfirmed ||
    facility.serviceLastVerified
  );
}

export const getLongevityFacilities = cache(fetchLongevityFacilities);
