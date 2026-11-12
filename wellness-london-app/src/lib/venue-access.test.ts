import { test } from "node:test";
import { strict as assert } from "node:assert";
import { isMembershipRestricted, venueAccessPriority } from "./venue-access.ts";

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
