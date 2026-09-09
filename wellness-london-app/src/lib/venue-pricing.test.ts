import assert from "node:assert/strict";
import test from "node:test";
import { venuePrice, sessionPriceBand } from "./venue-pricing.ts";
test("annual membership and consultation cannot rank as session prices", () => {
  const membership = venuePrice({ slug: "sael-spa", priceFrom: "From £3,000" });
  assert.match(membership.label, /annual membership.*joining fee/);
  assert.equal(membership.comparable, Infinity);
  const consultation = venuePrice({ slug: "numa-oxygen-marylebone", priceFrom: "£250" });
  assert.match(consultation.label, /consultation.*extra/);
  assert.equal(consultation.comparable, Infinity);
});
test("prices retain decimal precision and explicit session basis", () => {
  assert.equal(venuePrice({ priceFrom: "£9.50 per session" }).comparable, 9.5);
  assert.equal(sessionPriceBand({ priceFrom: "£25.50 per session" }), "£25–£50");
  assert.match(venuePrice({ priceFrom: "£25.50" }).label, /basis unconfirmed/);
  assert.equal(sessionPriceBand({ priceFrom: "£25.50" }), "");
});
test("introductory and concession prices are labelled and not sorted against ordinary sessions", () => {
  assert.match(venuePrice({ slug: "rebody-islington", priceFrom: "£59" }).label, /introductory consultation/);
  const concession = { slug: "sauna-social-club-peckham", priceFrom: "£9.99" };
  assert.match(venuePrice(concession).label, /unwaged concession/);
  assert.equal(sessionPriceBand(concession), "");
});
test("missing or non-numeric prices stay unknown", () => {
  for (const priceFrom of [undefined, "£££", "Not confirmed", "0"]) assert.equal(venuePrice({ priceFrom }).label, "Price not confirmed");
});
