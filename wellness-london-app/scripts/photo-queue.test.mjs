import { test } from "node:test";
import { strict as assert } from "node:assert";
import { allowedWebsite, imageCandidates, makeQueue } from "./photo-queue.mjs";

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
