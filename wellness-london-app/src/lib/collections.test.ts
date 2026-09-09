import assert from "node:assert/strict";
import test from "node:test";
import type { ServiceDirectoryFacility } from "../components/ServiceDirectory.tsx";
import {
  collections,
  facilityMatchesFeaturedSection,
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
