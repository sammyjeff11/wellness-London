import assert from "node:assert/strict";
import test from "node:test";
import { hasExplicitAssistedStretching } from "./assisted-stretching.ts";

test("accepts explicit assisted stretching services", () => {
  assert.equal(hasExplicitAssistedStretching({ servicesOffered: ["Assisted Stretching", "Physiotherapy"] }), true);
  assert.equal(hasExplicitAssistedStretching({ activityDisplayLabels: ["Assisted Stretch"] }), true);
  assert.equal(hasExplicitAssistedStretching({ servicesOffered: ["Stretch Therapy"] }), true);
});
test("does not mistake generic physio or prose about mobility for a session", () => {
  assert.equal(hasExplicitAssistedStretching({ servicesOffered: ["Physiotherapy", "Sauna"] }), false);
  assert.equal(hasExplicitAssistedStretching({ activityTagsStandardized: ["Mobility", "Fitness"] }), false);
  assert.equal(hasExplicitAssistedStretching({ servicesOffered: ["Movement screening"] }), false);
  assert.equal(hasExplicitAssistedStretching({}), false);
});
