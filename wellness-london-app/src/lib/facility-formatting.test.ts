import assert from "node:assert/strict";
import test from "node:test";
import { extractUkPostcode, formatPriceFrom, normaliseAccessType } from "./facility-formatting.ts";
import { truncateMetaText } from "./site.ts";
import { prioritiseCanonicalServiceList } from "./taxonomy.ts";

test("formats Airtable currency values for public display", () => {
  assert.equal(formatPriceFrom(9), "From £9");
  assert.equal(formatPriceFrom("£50"), "From £50");
  assert.equal(formatPriceFrom("from £30"), "From £30");
  assert.equal(formatPriceFrom(undefined), "");
});

test("extracts UK postcodes from complete venue addresses", () => {
  assert.equal(extractUkPostcode("124 Tabernacle Street, London EC2A 4SA"), "EC2A 4SA");
  assert.equal(extractUkPostcode("54 High Street, Sevenoaks, Kent TN13 1JG"), "TN13 1JG");
  assert.equal(extractUkPostcode("London"), "");
});

test("normalises access eligibility without mixing in booking terminology", () => {
  assert.equal(normaliseAccessType("Pay as you go"), "Public");
  assert.equal(normaliseAccessType(" Public + Member Options"), "Public");
  assert.equal(normaliseAccessType("Private Members Only"), "Members only");
  assert.equal(normaliseAccessType("Hotel Guests + Limited Day Access"), "Hotel guests + public bookings");
  assert.equal(normaliseAccessType("Private / Group"), "");
});

test("keeps metadata concise without cutting a word in half", () => {
  const result = truncateMetaText("A very long venue description ".repeat(12), 80);
  assert.ok(result.length <= 80);
  assert.ok(result.endsWith("…"));
  assert.ok(!result.endsWith(" …"));
});

test("puts the current service page tag first on venue cards", () => {
  assert.deepEqual(
    prioritiseCanonicalServiceList(["Cryotherapy", "Photobiomodulation", "HBOT"], "Red Light Therapy"),
    ["Red Light Therapy", "Cryotherapy", "Hyperbaric Oxygen Therapy"],
  );
  assert.deepEqual(
    prioritiseCanonicalServiceList(["Sauna", "Cold Plunge", "Massage"], "Cold Plunge"),
    ["Cold Plunge", "Sauna", "Massage"],
  );
});
