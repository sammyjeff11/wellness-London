import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { distanceInKm, formatDistance } from "./geo.ts";
import { venueCoordinates } from "../data/venue-coordinates.ts";

test("calculates useful London distances", () => {
  const shoreditch = { latitude: 51.525529, longitude: -0.084283 };
  const canaryWharf = { latitude: 51.506133, longitude: -0.017816 };
  const distance = distanceInKm(shoreditch, canaryWharf);

  assert.ok(distance > 4 && distance < 6);
  assert.equal(formatDistance(distance), `${distance.toFixed(1)} km away`);
  assert.equal(formatDistance(0.42), "400 m away");
});

test("keeps every published directory venue available on the map", () => {
  const snapshot = JSON.parse(readFileSync(new URL("../data/generated/directory-snapshot.json", import.meta.url), "utf8"));
  const publishedSlugs = snapshot.records.map((record: { fields: { Slug?: string } }) => record.fields.Slug).filter(Boolean);
  const missingCoordinates = publishedSlugs.filter((slug: string) => !venueCoordinates[slug]);

  assert.deepEqual(missingCoordinates, []);
});
