import { test } from "node:test";
import { strict as assert } from "node:assert";
import { isMembershipRestricted } from "./venue-access.ts";

test("conservatively identifies members-only restrictions", () => {
  assert.equal(isMembershipRestricted("Members only"), true);
  assert.equal(isMembershipRestricted("Membership required"), true);
  assert.equal(isMembershipRestricted("Members + hotel guests"), false);
  assert.equal(isMembershipRestricted("Public bookings"), false);
  assert.equal(isMembershipRestricted("Day pass available"), false);
  assert.equal(isMembershipRestricted(undefined), false);
});
