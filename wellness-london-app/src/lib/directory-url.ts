export const directoryKeys = ["q", "area", "service", "venueType", "accessType", "priceBand", "premiumLevel", "experienceType", "privateOrShared", "sort", "view", "clinicalNeed", "diagnostic", "oversight", "assessmentPrice"] as const;
export function readDirectoryState(search: string) {
  const params = new URLSearchParams(search);
  return Object.fromEntries(directoryKeys.map((key) => [key, (params.get(key) || "").slice(0, 200)])) as Record<typeof directoryKeys[number], string>;
}
export function writeDirectoryState(search: string, patch: Record<string, string>) {
  const params = new URLSearchParams(search);
  for (const [key, value] of Object.entries(patch)) {
    if (!(directoryKeys as readonly string[]).includes(key)) continue;
    if (value) params.set(key, value); else params.delete(key);
  }
  return params.toString();
}
