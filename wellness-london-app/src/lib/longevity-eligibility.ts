export type LongevityEligibilityFacility = {
  venueTypeStandardized: string;
  primaryService: string;
  secondaryServices: string[];
  serviceNames: string[];
  servicesOffered: string[];
  activityCategories: string[];
  activityTagsStandardized: string[];
  activityDisplayLabels: string[];
  clinicModel: string;
  clinicalOversight: string;
  confirmedDiagnostics: string[];
  assessmentFormat: string[];
  resultsIncluded: string[];
};

const explicitDiagnosticSignals = [
  "diagnostic",
  "health screening",
  "medical screening",
  "preventative health",
  "preventive health",
  "health assessment",
  "medical assessment",
  "executive health",
  "blood testing",
  "blood test",
  "biomarker",
  "biological age",
  "epigenetic",
  "genomic",
  "genetic testing",
  "hormone testing",
  "microbiome",
  "gut health testing",
  "mri",
  "ct scan",
  "medical imaging",
  "cardiovascular screening",
  "cardiac screening",
  "dexa",
  "vo2 max",
  "vo₂ max",
  "resting metabolic rate",
];

export function hasStructuredLongevityData(facility: LongevityEligibilityFacility) {
  const hasClinicalModel = Boolean(
    facility.clinicModel && facility.clinicModel !== "Not applicable",
  );
  const hasMeaningfulOversight = Boolean(
    facility.clinicalOversight &&
    facility.clinicalOversight !== "Not applicable" &&
    facility.clinicalOversight !== "Not confirmed",
  );

  return Boolean(
    hasClinicalModel ||
    hasMeaningfulOversight ||
    facility.confirmedDiagnostics.length ||
    facility.assessmentFormat.length ||
    facility.resultsIncluded.length
  );
}

export function isClinicalLongevityFacility(facility: LongevityEligibilityFacility) {
  if (hasStructuredLongevityData(facility)) return true;
  if (facility.venueTypeStandardized.trim().toLowerCase() === "longevity clinic") return true;

  const explicitServiceText = [
    facility.primaryService,
    ...facility.secondaryServices,
    ...facility.serviceNames,
    ...facility.servicesOffered,
    ...facility.activityCategories,
    ...facility.activityTagsStandardized,
    ...facility.activityDisplayLabels,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return explicitDiagnosticSignals.some((signal) => explicitServiceText.includes(signal));
}
