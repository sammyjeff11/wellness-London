/** Match a bookable assisted-stretching modality only when explicitly recorded.
 * General physiotherapy, flexibility and passing editorial mentions are insufficient.
 * Booking/access conditions remain separate and require their own verification.
 */
type AssistedStretchEvidence = {
  primaryService?: string;
  secondaryServices?: string[];
  servicesOffered?: string[];
  activityDisplayLabels?: string[];
  activityTagsStandardized?: string[];
};

export function hasExplicitAssistedStretching(venue: AssistedStretchEvidence): boolean {
  const serviceFields = [
    venue.primaryService,
    ...(venue.secondaryServices || []),
    ...(venue.servicesOffered || []),
    ...(venue.activityDisplayLabels || []),
    ...(venue.activityTagsStandardized || []),
  ];
  return serviceFields.some((entry) =>
    /\b(?:assisted\s+stretch(?:ing)?|stretch\s+therapy|pnf\s+stretch(?:ing)?)\b/i.test(entry || ""),
  );
}
