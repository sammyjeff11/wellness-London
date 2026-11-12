/** Conservative access check; missing status is never interpreted as members-only. */
export function isMembershipRestricted(value?: string | null): boolean {
  if (!value) return false;
  const text = value.toLowerCase().trim();
  if (/non.members|day pass|public|drop.in|pay.as.you.go|hotel guests/.test(text)) return false;
  return /members?\s*only|membership\s*(?:required|only)|exclusive(?:ly)?\s*(?:for|to)\s*members/.test(text);
}

/** Lower ranks appear first for booking-led service discovery.
 * Unknown access stays visible and is never presented as public access.
 */
export function venueAccessPriority(value?: string | null): number {
  if (isMembershipRestricted(value)) return 2;
  if (!value) return 1;
  return /\bpublic\b|\bnon.members?\b|\bday pass\b|\bdrop.in\b/i.test(value) ? 0 : 1;
}

/** Service discovery ordering must account for the actual offer, not just an
 * "Public" access flag: a publicly contactable club may sell memberships only.
 * Conservative unknowns stay visible between single-session and membership
 * listings; this is not real-time booking availability.
 */
export function venueBookingPriority(venue: { accessType?: string; bookingCategory: "membership" | "session" | "offer" | "unconfirmed" }): number {
  if (venue.bookingCategory === "membership" || isMembershipRestricted(venue.accessType)) return 2;
  if (venueAccessPriority(venue.accessType) === 0) return 0;
  return 1;
}
