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

test("short words in unrelated descriptions do not match a venue name", () => {
  assert.equal(matchesVenueSearch({ name: "Chelsea Studio", description: "A studio on a quiet street in London with a shared room." }, "Neko"), false);
});
test("multi-term queries retain their location constraint through service aliases", () => {
  assert.equal(matchesVenueSearch(shoreditchVenue, "sauna Shoreditch"), true);
  assert.equal(matchesVenueSearch({ name: "Chelsea Sauna", neighbourhood: "Chelsea", services: ["Sauna"] }, "sauna Shoreditch"), false);
});
