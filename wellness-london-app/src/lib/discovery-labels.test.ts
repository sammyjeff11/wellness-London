import assert from "node:assert/strict";
import test from "node:test";
import { filterSuitabilityLabels, getUsefulServiceLabels, toDirectoryServiceLabel } from "./discovery-labels.ts";

test("removes generic first-visit and operational suitability labels", () => {
  assert.deepEqual(
    filterSuitabilityLabels(["First Timers", "Private", "Post-work recovery"]),
    ["Post-work recovery"],
  );
  assert.deepEqual(filterSuitabilityLabels(["First-time visitors", "Athletes"]), ["Athletes"]);
});

test("keeps the service filter focused on useful directory categories", () => {
  assert.equal(toDirectoryServiceLabel("Finnish Sauna"), "Sauna");
  assert.equal(toDirectoryServiceLabel("Sound Baths"), "Sound Bath");
  assert.equal(toDirectoryServiceLabel("Other"), "");
  assert.equal(toDirectoryServiceLabel("Advanced Facials"), "");
});

test("removes generic services and keeps the preferred service first", () => {
  assert.deepEqual(
    getUsefulServiceLabels(["Other", "Sauna", "Cold Plunge"], "Cold Plunge"),
    ["Cold Plunge", "Sauna"],
  );
});
