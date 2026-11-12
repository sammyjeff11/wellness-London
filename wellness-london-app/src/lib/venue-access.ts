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
