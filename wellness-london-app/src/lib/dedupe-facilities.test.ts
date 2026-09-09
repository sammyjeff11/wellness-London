import test from "node:test";
import assert from "node:assert/strict";
import { dedupeFacilities } from "./dedupe-facilities.ts";

test("merges two records for the same operator and physical neighbourhood", () => {
  const facilities = dedupeFacilities([
    {
      slug: "third-space-canary-wharf",
      name: "Third Space Canary Wharf",
      brandOperator: "Third Space",
      neighbourhood: "Canary Wharf",
      areaOfLondon: "East London",
      address: "16-19 Canada Square, London E14 5ER",
      services: ["Sauna"],
    },
    {
      slug: "third-space-spa",
      name: "Third Space Spa",
      brandOperator: "Third Space",
      neighbourhood: "Canary Wharf",
      areaOfLondon: "East London",
      address: "16–19 Canada Square, London E14 5ER",
      services: ["Cryotherapy", "Red Light Therapy"],
    },
  ]);

  assert.equal(facilities.length, 1);
  assert.equal(facilities[0].slug, "third-space-canary-wharf");
  assert.deepEqual(facilities[0].services, ["Sauna", "Cryotherapy", "Red Light Therapy"]);
});

test("keeps separate venues in the same neighbourhood", () => {
  const facilities = dedupeFacilities([
    {
      slug: "arc-canary-wharf",
      name: "Arc",
      brandOperator: "Arc",
      neighbourhood: "Canary Wharf",
      address: "1 Crossrail Place, London E14 5AR",
    },
    {
      slug: "third-space-canary-wharf",
      name: "Third Space Canary Wharf",
      brandOperator: "Third Space",
      neighbourhood: "Canary Wharf",
      address: "16-19 Canada Square, London E14 5ER",
    },
  ]);

  assert.deepEqual(facilities.map((facility) => facility.slug), ["arc-canary-wharf", "third-space-canary-wharf"]);
});

test("keeps separate branches of one operator in the same neighbourhood", () => {
  const facilities = dedupeFacilities([
    {
      slug: "third-space-city",
      name: "Third Space City",
      brandOperator: "Third Space",
      neighbourhood: "City of London",
      address: "40 Mark Lane, London EC3R 7AT",
    },
    {
      slug: "third-space-moorgate",
      name: "Third Space Moorgate",
      brandOperator: "Third Space",
      neighbourhood: "City of London",
      address: "16 South Place, London EC2M 2AQ",
    },
    {
      slug: "third-space-paternoster-square",
      name: "Third Space Paternoster Square",
      brandOperator: "Third Space",
      neighbourhood: "City of London",
      address: "31 Warwick Lane, London EC4M 7BW",
    },
  ]);

  assert.deepEqual(
    facilities.map((facility) => facility.slug),
    ["third-space-city", "third-space-moorgate", "third-space-paternoster-square"],
  );
});

test("merges address variants for one operator at the same postcode", () => {
  const facilities = dedupeFacilities([
    {
      slug: "third-space-canary-wharf",
      name: "Third Space Canary Wharf",
      brandOperator: "Third Space",
      neighbourhood: "Canary Wharf",
      address: "Third Space Canary Wharf, 16-19 Canada Square, London E14 5ER, United Kingdom",
    },
    {
      slug: "third-space-spa",
      name: "Third Space Spa",
      brandOperator: "Third Space",
      neighbourhood: "Canary Wharf",
      address: "16–19 Canada Square, London E14 5ER",
    },
  ]);

  assert.equal(facilities.length, 1);
  assert.equal(facilities[0].slug, "third-space-canary-wharf");
});
