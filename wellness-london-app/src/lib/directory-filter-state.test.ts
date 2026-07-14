import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  buildDirectorySearchParams,
  initialDirectoryFilters,
  matchesDirectoryFilters,
  parseDirectoryUrlState,
  type DirectoryFilterOptions,
} from "./directory-filter-state.ts";

const options: DirectoryFilterOptions = {
  area: ["East London", "Central London"],
  premiumLevel: ["Premium", "Luxury"],
  experienceType: ["Guided", "Self-guided"],
  accessType: ["Public", "Members only", "Hotel guests only"],
  privateOrShared: ["Private", "Shared"],
  beginnerFriendly: ["Yes", "No"],
};

test("parses valid access and session-setting filters as separate decisions", () => {
  const state = parseDirectoryUrlState(
    "?area=East+London&access=Members+only&setting=Private&sort=recently-checked&q=sauna",
    options,
  );

  assert.deepEqual(state, {
    filters: {
      ...initialDirectoryFilters,
      area: "East London",
      accessType: "Members only",
      privateOrShared: "Private",
    },
    searchQuery: "sauna",
    sort: "recently-checked",
  });
});

test("ignores stale filter values and unsupported sort values", () => {
  const state = parseDirectoryUrlState(
    "?access=Pay+as+you+go&setting=Appointment+only&sort=distance",
    options,
  );

  assert.equal(state.filters.accessType, "");
  assert.equal(state.filters.privateOrShared, "");
  assert.equal(state.sort, "recommended");
});

test("serialises directory state without discarding unrelated query parameters", () => {
  const params = buildDirectorySearchParams("?campaign=summer&access=Public", {
    filters: {
      ...initialDirectoryFilters,
      accessType: "Hotel guests only",
      privateOrShared: "Shared",
    },
    searchQuery: "cold plunge",
    sort: "price-low",
  });

  assert.equal(params.get("campaign"), "summer");
  assert.equal(params.get("access"), "Hotel guests only");
  assert.equal(params.get("setting"), "Shared");
  assert.equal(params.get("q"), "cold plunge");
  assert.equal(params.get("sort"), "price-low");
});

test("removes default and cleared directory state from the URL", () => {
  const params = buildDirectorySearchParams(
    "?q=sauna&area=East+London&access=Public&setting=Private&sort=premium&campaign=summer",
    {
      filters: initialDirectoryFilters,
      searchQuery: "",
      sort: "recommended",
    },
  );

  assert.equal(params.toString(), "campaign=summer");
});

test("binds access eligibility and session setting to different venue fields", () => {
  const component = readFileSync(new URL("../components/ServiceDirectory.tsx", import.meta.url), "utf8");

  assert.match(
    component,
    /label="Access" value=\{filters\.accessType\} onChange=\{\(value\) => updateFilter\("accessType", value\)\}/,
  );
  assert.match(
    component,
    /label="Session setting" value=\{filters\.privateOrShared\} onChange=\{\(value\) => updateFilter\("privateOrShared", value\)\}/,
  );
});

test("filters public eligibility independently from private session format", () => {
  const venues = [
    { name: "Public private", accessType: "Public", privateOrShared: "Private" },
    { name: "Members private", accessType: "Members only", privateOrShared: "Private" },
    { name: "Public shared", accessType: "Public", privateOrShared: "Shared" },
  ];

  const publicVenues = venues.filter((venue) => matchesDirectoryFilters(venue, {
    ...initialDirectoryFilters,
    accessType: "Public",
  }));
  const publicPrivateVenues = venues.filter((venue) => matchesDirectoryFilters(venue, {
    ...initialDirectoryFilters,
    accessType: "Public",
    privateOrShared: "Private",
  }));

  assert.deepEqual(publicVenues.map((venue) => venue.name), ["Public private", "Public shared"]);
  assert.deepEqual(publicPrivateVenues.map((venue) => venue.name), ["Public private"]);
});
