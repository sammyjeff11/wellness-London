import assert from "node:assert/strict";
import test from "node:test";
import {
  hasStructuredLongevityData,
  isClinicalLongevityFacility,
} from "./longevity-eligibility.ts";
import type { LongevityFacility } from "./longevity-facilities.ts";

function facility(overrides: Partial<LongevityFacility> = {}): LongevityFacility {
  return {
    name: "Example venue",
    venueTypeStandardized: "Recovery Studio",
    primaryService: "",
    secondaryServices: [],
    serviceNames: [],
    servicesOffered: [],
    activityCategories: [],
    activityTagsStandardized: [],
    activityDisplayLabels: [],
    clinicModel: "",
    clinicalOversight: "",
    confirmedDiagnostics: [],
    assessmentFormat: [],
    resultsIncluded: [],
    venueConfirmed: true,
    serviceLastVerified: "2026-09-04",
    ...overrides,
  } as LongevityFacility;
}

test("does not treat generic venue verification as clinical data", () => {
  const sauna = facility({
    name: "Example Sauna",
    venueTypeStandardized: "Community Sauna",
    servicesOffered: ["Sauna", "Cold Plunge", "Contrast Therapy"],
  });

  assert.equal(hasStructuredLongevityData(sauna), false);
  assert.equal(isClinicalLongevityFacility(sauna), false);
});

test("includes venues with explicit diagnostic services", () => {
  assert.equal(
    isClinicalLongevityFacility(facility({ servicesOffered: ["Blood Testing", "Health Screening"] })),
    true,
  );
  assert.equal(
    isClinicalLongevityFacility(facility({ activityTagsStandardized: ["DEXA Scan"] })),
    true,
  );
});

test("does not use recovery modalities alone as longevity eligibility", () => {
  assert.equal(
    isClinicalLongevityFacility(
      facility({ servicesOffered: ["Hyperbaric Oxygen Therapy", "Red Light Therapy", "IV Therapy"] }),
    ),
    false,
  );
});

test("keeps explicitly modelled clinics even when their service list is incomplete", () => {
  const clinic = facility({
    clinicModel: "Specialist testing provider",
    clinicalOversight: "Testing only",
    confirmedDiagnostics: ["DEXA Scan"],
  });

  assert.equal(hasStructuredLongevityData(clinic), true);
  assert.equal(isClinicalLongevityFacility(clinic), true);
});
