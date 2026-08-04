import assert from "node:assert/strict";
import test from "node:test";
import { matchesVenueSearch, rankVenueSearch } from "./search.ts";

const shoreditchVenue = {
  name: "The Shoreditch Sauna",
  neighbourhood: "Shoreditch",
  services: ["Sauna", "Cold Plunge"],
};

const unrelatedSharedVenue = {
  name: "West London Recovery Club",
  neighbourhood: "Chelsea",
  privateOrShared: "Shared",
  services: ["Cryotherapy"],
};

test("venue search keeps strong neighbourhood matches", () => {
  assert.equal(matchesVenueSearch(shoreditchVenue, "Shoreditch"), true);
  assert.ok(rankVenueSearch(shoreditchVenue, "Shoreditch") >= 90);
});

test("venue search rejects weak fuzzy matches from incidental fields", () => {
  assert.equal(matchesVenueSearch(unrelatedSharedVenue, "Shoreditch"), false);
});

test("venue search still accepts useful service and typo matches", () => {
  assert.equal(matchesVenueSearch(unrelatedSharedVenue, "Cryotherapy"), true);
  assert.equal(matchesVenueSearch(shoreditchVenue, "Shore ditch"), true);
});
