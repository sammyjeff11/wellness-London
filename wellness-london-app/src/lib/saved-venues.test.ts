import assert from "node:assert/strict";
import test from "node:test";
import { getSavedVenueSnapshot, setSavedVenueSlugs, parseSavedVenueSlugs } from "./saved-venues.ts";
test("saving still works during a visit when browser storage is blocked", () => {
  Object.defineProperty(globalThis, "window", { configurable: true, value: { localStorage: { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("blocked"); } }, dispatchEvent() {} } });
  try {
    setSavedVenueSlugs(["arc-canary-wharf", "arc-canary-wharf"]);
    assert.deepEqual(parseSavedVenueSlugs(getSavedVenueSnapshot()), ["arc-canary-wharf"]);
    setSavedVenueSlugs([]);
    assert.deepEqual(parseSavedVenueSlugs(getSavedVenueSnapshot()), []);
  } finally { Reflect.deleteProperty(globalThis, "window"); }
});
