import assert from "node:assert/strict";
import test from "node:test";
import { getActiveNavSection } from "./navigation.ts";

test("keeps venue profiles inside the Venues section", () => {
  assert.equal(getActiveNavSection("/explore"), "venues");
  assert.equal(getActiveNavSection("/brands"), "venues");
  assert.equal(getActiveNavSection("/facility/example-venue"), "venues");
  assert.equal(getActiveNavSection("/brand/example-brand"), "venues");
  assert.equal(getActiveNavSection("/shortlist"), "venues");
  assert.equal(getActiveNavSection("/compare"), "venues");
});

test("maps hubs and detail routes to the promised navigation section", () => {
  assert.equal(getActiveNavSection("/services"), "services");
  assert.equal(getActiveNavSection("/assisted-stretching-london"), "services");
  assert.equal(getActiveNavSection("/neighbourhoods/shoreditch"), "areas");
  assert.equal(getActiveNavSection("/collections/best-cold-plunge-london"), "guides");
  assert.equal(getActiveNavSection("/guides/sauna-london-guide"), "guides");
});

test("keeps diagnostic routes inside Services", () => {
  assert.equal(getActiveNavSection("/longevity"), "services");
  assert.equal(getActiveNavSection("/health-screening-london"), "services");
  assert.equal(getActiveNavSection("/dexa-scan-london"), "services");
  assert.equal(getActiveNavSection("/vo2-max-testing-london"), "services");
});
