import assert from "node:assert/strict";
import test from "node:test";
import { readDirectoryState, writeDirectoryState } from "./directory-url.ts";
test("search and multiple filters survive URL round trips", () => {
  const search = writeDirectoryState("?utm_source=test", { q: "sauna & plunge", accessType: "Public", area: "East London", sort: "price-low", view: "map" });
  const state = readDirectoryState(search);
  assert.equal(state.q, "sauna & plunge"); assert.equal(state.accessType, "Public"); assert.equal(state.area, "East London"); assert.equal(state.sort, "price-low"); assert.equal(state.view, "map");
  assert.equal(new URLSearchParams(search).get("utm_source"), "test");
});
test("clearing a filter preserves unrelated state and rejects unsupported writes", () => {
  const search = writeDirectoryState("?q=sauna&area=East", { area: "", secret: "no" });
  assert.equal(search, "q=sauna");
  assert.equal(readDirectoryState("").area, "");
});
