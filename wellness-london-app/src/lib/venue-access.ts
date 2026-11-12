/** Conservative access check; missing status is never interpreted as members-only. */
export function isMembershipRestricted(value?: string | null): boolean {
  if (!value) return false;
  const text = value.toLowerCase().trim();
  if (/non.members|day pass|public|drop.in|pay.as.you.go|hotel guests/.test(text)) return false;
  return /members?\s*only|membership\s*(?:required|only)|exclusive(?:ly)?\s*(?:for|to)\s*members/.test(text);
}
