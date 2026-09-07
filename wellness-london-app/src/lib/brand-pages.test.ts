import assert from "node:assert/strict";
import test from "node:test";
import { getPublishedMultiLocationBrands } from "./brand-pages.ts";
import { getPhysicalVenueKey } from "./dedupe-facilities.ts";

const facilities = [
  { name: "Lowlu Kentish Town", slug: "lowlu-kentish-town", brandOperator: "Lowlu", neighbourhood: "Kentish Town", address: "1 Highgate Road, London", servicesOffered: [] },
  { name: "Lowlu Wandsworth", slug: "lowlu-wandsworth", brandOperator: "Lowlu", neighbourhood: "Wandsworth", address: "2 Armoury Way, London", servicesOffered: [] },
  { name: "Third Space Canary Wharf", slug: "third-space-canary-wharf", brandOperator: "Third Space", neighbourhood: "Canary Wharf", address: "16-19 Canada Square, London", servicesOffered: [] },
  { name: "Third Space Spa", slug: "third-space-spa", brandOperator: "Third Space", neighbourhood: "Canary Wharf", address: "16–19 Canada Square, London", servicesOffered: [] },
] as Parameters<typeof getPublishedMultiLocationBrands>[0];

test("publishes brand hubs only when at least two distinct physical locations exist", () => {
  const publishedBrands = getPublishedMultiLocationBrands(facilities);

  assert.ok(publishedBrands.length > 0);
  for (const { facilities } of publishedBrands) {
    assert.ok(facilities.length > 1);
    assert.equal(new Set(facilities.map(getPhysicalVenueKey)).size, facilities.length);
  }
});

test("does not treat duplicate records at one address as a multi-location brand", () => {
  const publishedSlugs = getPublishedMultiLocationBrands(facilities)
    .map(({ brand }) => brand.slug);

  assert.equal(publishedSlugs.includes("third-space"), false);
  assert.equal(publishedSlugs.includes("lowlu"), true);
});
