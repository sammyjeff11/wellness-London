import { test } from "node:test";
import { strict as assert } from "node:assert";
import { allowedWebsite, imageCandidates, makeQueue, selectDiscoveryBatch, commonsMediaSearchUrl } from "./photo-queue.mjs";

test("only safe-looking public HTTPS websites are eligible", () => {
  assert.equal(allowedWebsite("https://venue.example/photos"), true);
  for (const url of ["http://venue.example", "https://localhost", "https://127.0.0.1", "https://10.0.0.1", "https://venue.local", "file:///etc/passwd", "https://a:b@venue.example"]) assert.equal(allowedWebsite(url), false, url);
});
test("extracts candidate metadata but never treats it as permission", () => {
  const html = '<meta property="og:image" content="/cover.jpg"><meta name="twitter:image" content="https://assets.example/cover2.jpg">';
  assert.deepEqual(imageCandidates(html, "https://venue.example/").map(x => x.url), ["https://venue.example/cover.jpg", "https://assets.example/cover2.jpg"]);
  assert.equal(imageCandidates(html, "https://venue.example/")[0].permission, "unverified");
});
test("prioritises published venues without cover, without modifying source data", () => {
  const snapshot = { records: [
    { id: "1", fields: { Name: "Full", Slug: "full", "Publish Status": "Published", Indexable: true, "Cover Image": [{ id:"x" }], Images: [{ id: "y" }] } },
    { id: "2", fields: { Name: "No cover", Slug: "no-cover", "Publish Status": "Published", Indexable: true } },
    { id: "3", fields: { Name: "Draft", Slug: "draft", "Publish Status": "Draft", Indexable: false } }
  ] };
  const queue = makeQueue(snapshot);
  assert.equal(queue.summary.publishedVenues, 2);
  assert.equal(queue.summary.withoutCover, 1);
  assert.equal(queue.venues[0].slug, "no-cover");
  assert.equal(queue.venues[0].approvedToPublish, false);
  assert.equal(snapshot.records[1].fields["Cover Image"], undefined);
});

test("weekly discovery batches cover every eligible missing-cover venue rather than repeating the first 20", () => {
  const venues = Array.from({ length: 49 }, (_, i) => ({
    slug: `venue-${i}`, officialWebsite: `https://venue${i}.example`, coverCount: 0,
  }));
  venues.push({ slug: "has-cover", officialWebsite: "https://covered.example", coverCount: 1 });
  const monday = new Date("2026-11-09T12:00:00Z");
  const seen = new Set();
  for (let offset = 0; offset < 3; offset++) {
    const date = new Date(monday.getTime() + offset * 7 * 86400000);
    const batch = selectDiscoveryBatch(venues, 20, date);
    assert.ok(batch.length <= 20);
    for (const venue of batch) {
      assert.equal(seen.has(venue.slug), false, `repeated ${venue.slug} before cycle finished`);
      seen.add(venue.slug);
    }
  }
  assert.equal(seen.size, 49);
  assert.equal(seen.has("has-cover"), false);
  assert.deepEqual(selectDiscoveryBatch(venues, 20, monday), selectDiscoveryBatch(venues, 20, monday));
});

test("creative-commons discovery exposes search only, never false rights approval", () => {
  const query = new URL(commonsMediaSearchUrl("Ironmonger Row Baths — Spa Experience", "Old Street"));
  assert.equal(query.hostname, "commons.wikimedia.org");
  assert.equal(query.searchParams.get("type"), "image");
  assert.match(query.searchParams.get("search"), /Ironmonger Row Baths Old Street London/);
  const queue = makeQueue({ records: [{
    id: "x", fields: { Name: "Ironmonger Row Baths — Spa Experience", Slug: "ironmonger-row-baths-spa-experience", "Publish Status": "Published", Indexable: true },
  }] });
  assert.equal(queue.venues[0].approvedToPublish, false);
  assert.equal(queue.venues[0].rightsStatus, "not_reviewed");
  assert.ok(queue.venues[0].commonsSearchUrl.startsWith("https://commons.wikimedia.org/"));
});
