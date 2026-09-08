import assert from "node:assert/strict";
import test from "node:test";
import { getPublishedMultiLocationBrands } from "./brand-pages.ts";
import { getPhysicalVenueKey } from "./dedupe-facilities.ts";

const facilities = [
  { name: "Lowlu Kentish Town", slug: "lowlu-kentish-town", brandOperator: "Lowlu", neighbourhood: "Kentish Town", address: "1 Highgate Road, London", servicesOffered: [] },
  { name: "Lowlu Wandsworth", slug: "lowlu-wandsworth", brandOperator: "Lowlu", neighbourhood: "Wandsworth", address: "2 Armoury Way, London", servicesOffered: [] },
  { name: "Third Space Canary Wharf", slug: "third-space-canary-wharf", brandOperator: "Third Space", neighbourhood: "Canary Wharf", address: "16-19 Canada Square, London", servicesOffered: [] },
  { name: "Third Space Spa", slug: "third-space-spa", brandOperator: "Third Space", neighbourhood: "Canary Wharf", address: "16–19 Canada Square, London", servicesOffered: [] },
  { name: "Third Space City", slug: "third-space-city", brandOperator: "Third Space", neighbourhood: "City", address: "40 Mark Lane, London", servicesOffered: [] },
] as Parameters<typeof getPublishedMultiLocationBrands>[0];

test("publishes brand hubs only when at least two distinct physical locations exist", () => {
  const publishedBrands = getPublishedMultiLocationBrands(facilities);

  assert.ok(publishedBrands.length > 0);
  for (const { facilities } of publishedBrands) {
    assert.ok(facilities.length > 1);
    assert.equal(new Set(facilities.map(getPhysicalVenueKey)).size, facilities.length);
  }
});

test("deduplicates records at one address before publishing a multi-location brand", () => {
  const thirdSpace = getPublishedMultiLocationBrands(facilities)
    .find(({ brand }) => brand.slug === "third-space");

  assert.ok(thirdSpace);
  assert.deepEqual(thirdSpace.facilities.map(({ slug }) => slug), [
    "third-space-canary-wharf",
    "third-space-city",
  ]);
});
