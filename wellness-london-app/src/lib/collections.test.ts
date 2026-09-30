import assert from "node:assert/strict";
import test from "node:test";
import type { ServiceDirectoryFacility } from "../components/ServiceDirectory.tsx";
import {
  collections,
  facilityMatchesCollection,
  facilityMatchesFeaturedSection,
  getCollection,
  getCuratedPicks,
  type CollectionFeaturedSection,
} from "./collections.ts";

function facility(
  slug: string,
  services: string[],
  overrides: Partial<ServiceDirectoryFacility> = {},
): ServiceDirectoryFacility {
  return {
    slug,
    name: slug,
    description: "Test venue",
    services,
    serviceKeys: [],
    ...overrides,
  };
}

test("every visible best-of slot has an explicit editorial selection", () => {
  collections.forEach((collection) => {
    const picks = collection.featuredSections.map((section) => section.editorialPickSlug);
    assert.equal(picks.every(Boolean), true, collection.slug);
    assert.equal(new Set(picks).size, picks.length, `${collection.slug} repeats a selected venue`);
  });
});

test("does not silently replace a missing editorial selection with an algorithmic winner", () => {
  const section: CollectionFeaturedSection = {
    label: "Best overall",
    description: "Test",
    editorialPickSlug: "editorial-choice",
    match: { serviceKey: "sauna" },
  };

  const [pick] = getCuratedPicks(
    [facility("algorithmic-alternative", ["Sauna"])],
    [section],
    new Map(),
  );

  assert.equal(pick.facility, undefined);
});

test("shows the editorial selection only while it still meets the section requirements", () => {
  const section: CollectionFeaturedSection = {
    label: "Best overall contrast",
    description: "Test",
    editorialPickSlug: "selected",
    match: { allServiceKeys: ["sauna", "cold-plunge"] },
  };

  const [validPick] = getCuratedPicks(
    [facility("selected", ["Sauna", "Cold Plunge"])],
    [section],
    new Map(),
  );
  const [invalidPick] = getCuratedPicks(
    [facility("selected", ["Sauna"])],
    [section],
    new Map(),
  );

  assert.equal(validPick.facility?.slug, "selected");
  assert.equal(invalidPick.facility, undefined);
});

test("recognises a high price band as a premium signal", () => {
  assert.equal(
    facilityMatchesFeaturedSection(
      facility("premium", ["Sauna", "Cold Plunge"], { priceRange: "££££" }),
      { allServiceKeys: ["sauna", "cold-plunge"], premiumLevelIncludes: ["premium", "luxury"] },
    ),
    true,
  );
});


test("a venue type alone cannot qualify a best recovery collection", () => {
  const collection = getCollection("best-recovery-clubs-london");
  assert.ok(collection);

  assert.equal(
    facilityMatchesCollection(
      facility("clinic-without-recovery-service", ["Blood Testing"], {
        venueType: "Clinic",
      }),
      collection,
    ),
    false,
  );

  assert.equal(
    facilityMatchesCollection(
      facility("recovery-clinic", ["Cryotherapy"], { venueType: "Clinic" }),
      collection,
    ),
    true,
  );
});

test("best contrast collection requires both sauna and cold plunge", () => {
  const collection = getCollection("best-contrast-therapy-london");
  assert.ok(collection);

  assert.equal(
    facilityMatchesCollection(facility("sauna-only", ["Sauna"]), collection),
    false,
  );
  assert.equal(
    facilityMatchesCollection(
      facility("sauna-and-cold", ["Sauna", "Cold Plunge"]),
      collection,
    ),
    true,
  );
});
