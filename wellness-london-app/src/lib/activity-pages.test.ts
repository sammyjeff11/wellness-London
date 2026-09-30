import assert from "node:assert/strict";
import test from "node:test";
import type { AirtableFacility } from "./airtable.ts";
import { getActivityPage, getFacilitiesForActivity } from "./activity-pages.ts";

test("broad Cold Therapy category does not make cryotherapy a cold-plunge result", () => {
  const cryotherapyOnly = {
    slug: "cryo-only",
    serviceKeys: ["cryotherapy"],
    servicesOffered: ["Cryotherapy"],
    activityCategories: ["Cold Therapy"],
    activityTagsStandardized: ["Cryotherapy"],
    activityDisplayLabels: ["Whole Body Cryotherapy"],
    saunaType: [],
    coldPlungeType: "",
    cryoType: "Whole Body",
    contrastTherapyAvailable: "No",
    profileCompletenessScore: 100,
  } as AirtableFacility;

  const coldPlunge = getActivityPage("cold-plunge-london")!;
  const results = getFacilitiesForActivity([cryotherapyOnly], coldPlunge);

  assert.deepEqual(results, []);
});
