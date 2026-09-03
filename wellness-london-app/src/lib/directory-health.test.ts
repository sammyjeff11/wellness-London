import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const snapshot = JSON.parse(readFileSync(new URL("../data/generated/directory-snapshot.json", import.meta.url), "utf8"));
const health = JSON.parse(readFileSync(new URL("../data/generated/directory-health.json", import.meta.url), "utf8"));

test("directory health matches the published snapshot", () => {
  assert.equal(health.summary.publishedVenues, snapshot.records.length);
  assert.equal(health.fields.length, 8);
  assert.ok(health.summary.averageCompleteness >= 0 && health.summary.averageCompleteness <= 100);

  for (const field of health.fields) {
    assert.equal(field.complete + field.missing, snapshot.records.length);
    assert.ok(field.percentage >= 0 && field.percentage <= 100);
  }
});

test("directory history retains a monthly baseline", () => {
  const month = String(snapshot.generatedAt).slice(0, 7);
  const historyUrl = new URL(`../data/history/${month}.json`, import.meta.url);
  assert.equal(existsSync(historyUrl), true);

  const history = JSON.parse(readFileSync(historyUrl, "utf8"));
  assert.equal(history.records.length, snapshot.records.length);
  assert.equal(new Set(history.records.map((record: { slug: string }) => record.slug)).size, history.records.length);
});
