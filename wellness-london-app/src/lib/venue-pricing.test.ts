import assert from "node:assert/strict";
import test from "node:test";
import { venuePrice, sessionPriceBand, bookingType } from "./venue-pricing.ts";
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
test("verified homepage venue prices keep their actual session basis", () => {
  const bxr = venuePrice({ slug: "bxr-lab", priceFrom: "£45" });
  assert.match(bxr.label, /£45.*introductory 45-minute LAB session/);
  assert.equal(bxr.comparable, Infinity);
  const cloudTwelve = venuePrice({ slug: "cloud-twelve", priceFrom: "£65" });
  assert.match(cloudTwelve.label, /£65.*30-minute infrared sauna/);
  assert.equal(cloudTwelve.comparable, 65);
});
test("missing or non-numeric prices stay internal rather than rendering a placeholder", () => {
  for (const priceFrom of [undefined, "£££", "Not confirmed", "0"]) {
    assert.equal(venuePrice({ priceFrom }).label, "");
    assert.equal(sessionPriceBand({ priceFrom }), "");
  }
});

test("booking filters distinguish public access from a confirmed session price", () => {
  assert.equal(bookingType({ accessType: "Public", priceFrom: "£25" }), "unconfirmed");
  assert.equal(bookingType({ priceFrom: "£25 per session" }), "session");
  assert.equal(bookingType({ accessType: "Members only" }), "membership");
  assert.equal(bookingType({ slug: "bxr-lab", priceFrom: "£45" }), "offer");
  assert.equal(bookingType({ slug: "sauna-social-club-peckham", priceFrom: "£9.99" }), "offer");
});

test("Arc introduction is a pack, not a single-session price", () => {
  const arc = { slug: "arc-canary-wharf", priceFrom: "£49" };
  assert.match(venuePrice(arc).label, /three-class pack/);
  assert.equal(venuePrice(arc).comparable, Infinity);
  assert.equal(bookingType(arc), "offer");
});
