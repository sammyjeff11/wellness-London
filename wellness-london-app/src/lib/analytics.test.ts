import assert from "node:assert/strict";
import test from "node:test";
import { trackVenueReferral } from "./analytics.ts";
test("referrals distinguish repeated clicks from a unique venue in a tab session", () => {
  const values = new Map();
  const mock = { dataLayer: [] as Record<string, unknown>[], location: { pathname: "/compare" }, sessionStorage: { getItem: (key: string) => values.get(key), setItem: (key: string, value: string) => values.set(key, value) } };
  Object.defineProperty(globalThis, "window", { configurable: true, value: mock });
  try {
    trackVenueReferral({ facility_slug: "arc", cta_type: "booking" });
    trackVenueReferral({ facility_slug: "arc", cta_type: "website" });
    trackVenueReferral({ facility_slug: "arc", cta_type: "instagram" });
    trackVenueReferral({ facility_slug: "arc", cta_type: "directions" });
    assert.equal(mock.dataLayer.filter((item) => item.event === "venue_outbound_click").length, 2);
    assert.equal(mock.dataLayer.filter((item) => item.event === "venue_unique_referral").length, 1);
    assert.equal(mock.dataLayer.some((item) => item.event === "booking_complete"), false);
  } finally { Reflect.deleteProperty(globalThis, "window"); }
});
test("blocked session storage never fabricates unique referrals", () => {
  const mock = { dataLayer: [] as Record<string, unknown>[], location: { pathname: "/compare" }, sessionStorage: { getItem() { throw new Error("blocked"); } } };
  Object.defineProperty(globalThis, "window", { configurable: true, value: mock });
  try {
    trackVenueReferral({ facility_slug: "arc", cta_type: "booking" });
    assert.deepEqual(mock.dataLayer.map((item) => item.event), ["venue_outbound_click"]);
  } finally { Reflect.deleteProperty(globalThis, "window"); }
});
