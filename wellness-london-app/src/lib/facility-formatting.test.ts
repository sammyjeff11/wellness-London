import assert from "node:assert/strict";
import test from "node:test";
import { extractUkPostcode, formatPriceFrom, normaliseAccessType } from "./facility-formatting.ts";
import { truncateMetaText } from "./site.ts";
import { canonicaliseServiceList, canonicaliseVenueServices, groupFacilityServices, prioritiseCanonicalServiceList } from "./taxonomy.ts";

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

test("groups venue services and removes generic values from profiles", () => {
  assert.deepEqual(
    groupFacilityServices([
      "Other",
      "Diagnostics",
      "HBOT",
      "Cryotherapy",
      "Photobiomodulation",
      "IV Therapy",
      "Longevity Testing",
      "Blood Testing",
    ]),
    [
      { key: "testing", label: "Testing and diagnostics", services: ["Blood Testing", "Longevity Testing"] },
      { key: "treatments", label: "Treatments and therapies", services: ["Hyperbaric Oxygen Therapy", "Cryotherapy", "Red Light Therapy", "IV Therapy"] },
    ],
  );
  assert.deepEqual(canonicaliseServiceList(["Sauna", "Other", "Cold Plunge"]), ["Sauna", "Cold Plunge"]);
  assert.deepEqual(groupFacilityServices(["Diagnostics"]), [
    { key: "testing", label: "Testing and diagnostics", services: ["Diagnostics"] },
  ]);
});

test("keeps activity categories out of venue services", () => {
  const services = canonicaliseVenueServices(
    ["Diagnostics"],
    ["Wellness Club", "Physiotherapy", "Longevity", "Medical Wellness", "Recovery", "Fitness"],
  );

  assert.deepEqual(services, ["Diagnostics", "Physiotherapy"]);
  assert.deepEqual(groupFacilityServices(services), [
    { key: "testing", label: "Testing and diagnostics", services: ["Diagnostics"] },
    { key: "clinical-care", label: "Clinical care", services: ["Physiotherapy"] },
  ]);
});

test("organises a multidisciplinary clinic into specific service groups", () => {
  assert.deepEqual(
    groupFacilityServices([
      "Diagnostics",
      "Health Screening",
      "MRI",
      "General Medicine",
      "Functional Medicine",
      "MSK Medicine",
      "Sports Medicine",
      "Physiotherapy",
      "Osteopathy",
      "Nutrition",
      "Cryotherapy",
      "IV Infusions",
      "Ozone Therapy",
      "NESA Therapy",
      "Massage",
      "Yoga",
      "Personal Training",
      "Reformer Pilates",
    ]),
    [
      { key: "testing", label: "Testing and diagnostics", services: ["Health Screening", "MRI / Medical Imaging"] },
      { key: "clinical-care", label: "Clinical care", services: ["General Medicine", "Functional Medicine", "Musculoskeletal Medicine", "Sports & Exercise Medicine", "Physiotherapy", "Osteopathy", "Nutrition"] },
      { key: "treatments", label: "Treatments and therapies", services: ["Cryotherapy", "IV Therapy", "Ozone Therapy", "NESA Therapy"] },
      { key: "recovery", label: "Heat, cold and recovery", services: ["Massage"] },
      { key: "mind-body", label: "Mind and body", services: ["Yoga"] },
      { key: "movement", label: "Movement and performance", services: ["Personal Training", "Reformer Pilates"] },
    ],
  );
});
