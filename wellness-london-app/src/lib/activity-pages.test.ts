import assert from "node:assert/strict";
import test from "node:test";
import type { AirtableFacility } from "./airtable.ts";
import { getActivityPage, getFacilitiesForActivity } from "./activity-pages.ts";

function facility(overrides: Partial<AirtableFacility>): AirtableFacility {
  return {
    id: "test",
    slug: "test",
    name: "Test venue",
    website: "",
    businessName: "",
    brandOperator: "",
    address: "",
    phone: "",
    email: "",
    description: "Test",
    images: [],
    servicesOffered: [],
    serviceNames: [],
    primaryService: "",
    secondaryServices: [],
    serviceKeys: [],
    activityCategories: [],
    activityTagsStandardized: [],
    activityDisplayLabels: [],
    venueTypeStandardized: "",
    themeTagsStandardized: [],
    primaryPillar: "",
    bestForStandardized: [],
    typeOfExperience: [],
    accessType: "",
    overallPriceRange: "",
    googleRating: "",
    bookingLink: "",
    openingHours: "",
    editorialSummary: "",
    goodToKnow: "",
    neighbourhood: "",
    areaOfLondon: "",
    instagramLink: "",
    bestFor: [],
    editorialVerdict: "",
    experienceType: [],
    ambience: "",
    beginnerFriendly: "",
    premiumLevel: "",
    saunaType: [],
    coldPlungeType: "",
    cryoType: "",
    contrastTherapyAvailable: "",
    guidedSessionsAvailable: "",
    priceFrom: "",
    priceNotes: "",
    bookingRequired: "",
    privateOrShared: "",
    towelsIncluded: "",
    showersAvailable: "",
    changingRooms: "",
    relaxationArea: "",
    nearestStation: "",
    postcode: "",
    borough: "",
    areaGroup: "",
    lastCheckedDate: "",
    verificationStatus: "",
    dataSource: "",
    profileCompletenessScore: 0,
    isFeatured: false,
    publishStatus: "Published",
    indexable: true,
    noindexReason: "",
    ...overrides,
  };
}

test("does not treat a broad Cold Therapy category as cold-plunge evidence", () => {
  const coldPlunge = getActivityPage("cold-plunge-london")!;
  const cryotherapyOnly = facility({
    serviceKeys: ["cryotherapy"],
    servicesOffered: ["Cryotherapy"],
    activityCategories: ["Cold Therapy"],
    activityTagsStandardized: ["Cryotherapy"],
    activityDisplayLabels: ["Cryotherapy"],
    cryoType: "Whole Body Cryotherapy",
  });

  assert.equal(getFacilitiesForActivity([cryotherapyOnly], coldPlunge).length, 0);
});

test("still includes venues with explicit cold-plunge evidence", () => {
  const coldPlunge = getActivityPage("cold-plunge-london")!;
  const explicitColdPlunge = facility({
    serviceKeys: ["cold-plunge"],
    servicesOffered: ["Cold Plunge"],
    activityTagsStandardized: ["Cold Plunge"],
    activityDisplayLabels: ["Ice Bath & Cold Plunge"],
    coldPlungeType: "Cold Plunge",
  });

  assert.equal(getFacilitiesForActivity([explicitColdPlunge], coldPlunge).length, 1);
});
