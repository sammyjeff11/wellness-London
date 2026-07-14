import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const reviewedCopyFiles = [
  "src/lib/activity-pages.ts",
  "src/lib/collections.ts",
  "src/content/location-guides.ts",
  "src/lib/neighbourhood-pages.ts",
  "src/app/how-we-curate/page.tsx",
];

const reviewedCopy = reviewedCopyFiles
  .map((path) => readFileSync(path, "utf8"))
  .join("\n");

test("keeps stock marketing language out of reviewed editorial copy", () => {
  const blockedPhrases = [
    "state-of-the-art",
    "holistic approach",
    "wellness journey",
    "unparalleled",
    "strong fit for Well+",
    "curated heat edit",
    "curated cold edit",
    "curated recovery edit",
  ];

  blockedPhrases.forEach((phrase) => {
    assert.ok(!reviewedCopy.toLowerCase().includes(phrase.toLowerCase()), `Found blocked phrase: ${phrase}`);
  });
});

test("uses natural-English titles for visible best-of collections", () => {
  [
    "Best saunas in London",
    "Best cold plunges in London",
    "Best contrast therapy in London",
    "Best recovery clubs in London",
  ].forEach((title) => assert.ok(reviewedCopy.includes(`title: "${title}"`), `Missing title: ${title}`));

  assert.ok(!/title: "Best (?:Sauna|Cold Plunge|Contrast Therapy|Recovery Clubs) London"/.test(reviewedCopy));
});
