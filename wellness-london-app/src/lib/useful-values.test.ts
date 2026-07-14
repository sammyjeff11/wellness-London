import assert from "node:assert/strict";
import test from "node:test";
import { cleanList, cleanValue, isUsefulValue } from "./useful-values.ts";

test("removes unconfirmed Airtable placeholders from public display values", () => {
  for (const value of [
    "Unknown",
    "N/A",
    "Not specified",
    "Private/shared not confirmed",
    "Booking details unclear",
  ]) {
    assert.equal(isUsefulValue(value), false, value);
    assert.equal(cleanValue(value), undefined, value);
  }
});

test("keeps confirmed values and deduplicates public lists", () => {
  assert.equal(cleanValue(" Public "), "Public");
  assert.deepEqual(cleanList(["Public", " public ", "Members only", "N/A"]), [
    "Public",
    "Members only",
  ]);
});
