import assert from "node:assert/strict";
import test from "node:test";
import type { AirtableFacility } from "./airtable.ts";
import { matchesFacilityActivitySignals, type ActivitySignalConfig } from "./activity-signal-matching.ts";

function facility(overrides: Partial<AirtableFacility>): AirtableFacility {
  return {
    id: "rec-test",
    slug: "test-venue",
    name: "Test venue",
    website: "",
    businessName: "",
    brandOperator: "",
    address: "",
    phone: "",
    email: "",
    description: "",
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
    beginnerFriendly: "Unknown",
    premiumLevel: "",
    saunaType: [],
    coldPlungeType: "Unknown",
    cryoType: "Unknown",
    contrastTherapyAvailable: "Unknown",
    guidedSessionsAvailable: "Unknown",
    priceFrom: "",
    priceNotes: "",
    bookingRequired: "",
    privateOrShared: "",
    towelsIncluded: "Unknown",
    showersAvailable: "Unknown",
    changingRooms: "Unknown",
    relaxationArea: "Unknown",
    nearestStation: "",
    postcode: "",
    borough: "",
    areaGroup: "",
    lastCheckedDate: "",
    verificationStatus: "",
    dataSource: "",
    profileCompletenessScore: 50,
    isFeatured: false,
    publishStatus: "Published",
    indexable: true,
    noindexReason: "",
    ...overrides,
  };
}

const sauna: ActivitySignalConfig = {
  slug: "sauna-london",
  activityLabels: ["Sauna"],
  keywords: ["sauna", "finnish", "heat therapy", "heat exposure"],
};

const coldPlunge: ActivitySignalConfig = {
  slug: "cold-plunge-london",
  activityLabels: ["Cold Plunge", "Ice Bath"],
  keywords: ["cold plunge", "ice bath", "plunge pool", "cold tub"],
};

const contrast: ActivitySignalConfig = {
  slug: "contrast-therapy-london",
  activityLabels: ["Contrast Therapy", "Sauna & Cold Plunge"],
  keywords: ["contrast therapy", "sauna and cold plunge", "sauna & plunge", "hot and cold"],
};

const hbot: ActivitySignalConfig = {
  slug: "hbot-london",
  activityLabels: ["Hyperbaric Oxygen Therapy", "HBOT"],
  keywords: ["hbot", "hyperbaric", "hyperbaric oxygen therapy"],
};

test("composite source services remain discoverable on sauna and cold-plunge pages", () => {
  const venue = facility({ serviceNames: ["Sauna & Plunge"] });

  assert.equal(matchesFacilityActivitySignals(venue, sauna), true);
  assert.equal(matchesFacilityActivitySignals(venue, coldPlunge), true);
});

test("sauna-and-plunge source services qualify for contrast therapy", () => {
  const venue = facility({ serviceNames: ["Sauna & Plunge"] });
  assert.equal(matchesFacilityActivitySignals(venue, contrast), true);
});

test("explicit contrast availability qualifies even when service labels are incomplete", () => {
  const venue = facility({ contrastTherapyAvailable: "Yes" });
  assert.equal(matchesFacilityActivitySignals(venue, contrast), true);
});

test("generic recovery venues are not inferred as contrast therapy", () => {
  const venue = facility({ serviceNames: ["Compression Therapy", "Massage"], serviceKeys: ["recovery"] });
  assert.equal(matchesFacilityActivitySignals(venue, contrast), false);
});

test("preserved primary service text can recover HBOT matching", () => {
  const venue = facility({ primaryService: "Hyperbaric Oxygen Therapy" });
  assert.equal(matchesFacilityActivitySignals(venue, hbot), true);
});
