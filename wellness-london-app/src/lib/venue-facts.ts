type VenueFacts = { slug?: string; goodToKnow?: string; sessionDuration?: string; guidedSessionsAvailable?: string; experienceType?: string[] };
export function sessionDuration(venue: VenueFacts) {
  if (venue.sessionDuration) return venue.sessionDuration;
  // Only attach durations to the explicitly described offer, not to an entire mixed-service venue.
  const notes = venue.goodToKnow || "";
  if (venue.slug === "banya-no-1-chiswick" && /90 minutes/i.test(notes)) return "90-minute access; treatments booked separately";
  if (venue.slug === "community-sauna-baths-peckham" && /75 minutes/i.test(notes)) return "75-minute sauna session";
  if (venue.slug?.startsWith("stretchlab-") && /50.minute/i.test(notes)) return "50-minute introductory assisted stretch";
  if (venue.slug?.startsWith("neko-health") && /one.hour/i.test(notes)) return "One-hour health scan appointment";
  return undefined;
}
export function guidanceOptions(venue: VenueFacts) {
  const values: string[] = [];
  if (/^(yes|available)/i.test(venue.guidedSessionsAvailable || "") || venue.experienceType?.some((value) => /^guided$/i.test(value)) || /guided and self.directed/i.test(venue.goodToKnow || "")) values.push("Guided available");
  if (venue.experienceType?.some((value) => /self.directed|self.guided/i.test(value)) || /guided and self.directed/i.test(venue.goodToKnow || "")) values.push("Self-directed available");
  return values;
}
