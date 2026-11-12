import { test } from "node:test";
import { strict as assert } from "node:assert";
import { isMembershipRestricted, venueAccessPriority, venueBookingPriority } from "./venue-access.ts";

test("conservatively identifies members-only restrictions", () => {
  assert.equal(isMembershipRestricted("Members only"), true);
  assert.equal(isMembershipRestricted("Membership required"), true);
  assert.equal(isMembershipRestricted("Members + hotel guests"), false);
  assert.equal(isMembershipRestricted("Public bookings"), false);
  assert.equal(isMembershipRestricted("Day pass available"), false);
  assert.equal(isMembershipRestricted(undefined), false);
});

test("publicly accessible venues rank ahead of unknown and members-only", () => {
  assert.equal(venueAccessPriority("Public"), 0);
  assert.equal(venueAccessPriority("Hotel guests + public bookings"), 0);
  assert.equal(venueAccessPriority(undefined), 1);
  assert.equal(venueAccessPriority("Members only"), 2);
  assert.equal(venueAccessPriority("Members + hotel guests"), 1);
});

test("does not prioritise publicly labelled membership offers over sessions", () => {
  assert.equal(venueBookingPriority({ accessType: "Public", bookingCategory: "membership" }), 2);
  assert.equal(venueBookingPriority({ accessType: "Public", bookingCategory: "session" }), 0);
  assert.equal(venueBookingPriority({ accessType: "Public", bookingCategory: "offer" }), 0);
  assert.equal(venueBookingPriority({ accessType: undefined, bookingCategory: "unconfirmed" }), 1);
  assert.equal(venueBookingPriority({ accessType: "Members only", bookingCategory: "session" }), 2);
});
