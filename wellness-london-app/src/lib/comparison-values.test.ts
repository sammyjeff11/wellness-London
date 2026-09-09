import assert from "node:assert/strict";
import test from "node:test";
import {
  comparisonSignature,
  normaliseSessionFormat,
} from "./comparison-values.ts";

test("mixed public session formats filter consistently regardless of source order", () => {
  assert.equal(
    normaliseSessionFormat("Shared / communal · Private / individual"),
    normaliseSessionFormat("Private / individual · Shared / communal"),
  );
  assert.notEqual(
    normaliseSessionFormat("Private / individual"),
    normaliseSessionFormat("Shared / communal"),
  );
  assert.equal(normaliseSessionFormat(undefined), "");
});
test("comparison differences ignore ordering but retain substantive differences", () => {
  assert.equal(
    comparisonSignature(["Sauna", "Cold plunge"]),
    comparisonSignature(["Cold plunge", "sauna"]),
  );
  assert.notEqual(
    comparisonSignature("£60 introductory session"),
    comparisonSignature("£60 standard session"),
  );
  assert.equal(
    comparisonSignature(undefined),
    comparisonSignature("Not confirmed"),
  );
  assert.notEqual(
    comparisonSignature(undefined),
    comparisonSignature("Not included"),
  );
});
