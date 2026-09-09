import { canonicalServiceName, canonicalServiceSlug, prioritiseCanonicalServiceList } from "./taxonomy.ts";

const excludedSuitabilityLabels = new Set([
  "solo",
  "private",
  "shared",
  "group",
  "guided",
  "first timer",
  "first timers",
  "first time visitor",
  "first time visitors",
]);

const excludedServiceLabels = new Set(["other", "wellness", "wellness club"]);

const supplementaryDirectoryServices: Record<string, string> = {
  "dexa scan": "DEXA Scan",
  "dexa": "DEXA Scan",
  "vo2 max": "VO2 Max Testing",
  "vo2 max testing": "VO2 Max Testing",
  "health screening": "Health Screening",
  "blood biomarkers": "Blood Biomarkers",
  "cardiovascular screening": "Cardiovascular Screening",
  "skin screening": "Skin Screening",
  "medical imaging": "Medical Imaging",
  "assisted stretch": "Assisted Stretching",
  "assisted stretching": "Assisted Stretching",
  "compression therapy": "Compression Therapy",
  fitness: "Fitness",
  hammam: "Hammam",
  meditation: "Meditation",
  pilates: "Pilates",
  "personal training": "Personal Training",
  physiotherapy: "Physiotherapy",
  spa: "Spa",
  "sound bath": "Sound Bath",
  "sound baths": "Sound Bath",
  steam: "Steam Room",
  "steam room": "Steam Room",
  "thermal baths": "Thermal Baths",
  yoga: "Yoga",
};

function normaliseLabel(value: string) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[–—]/g, "-")
    .replace(/\bfirst[- ]timers?\b/g, "first timers")
    .replace(/\bfirst[- ]time visitors?\b/g, "first time visitors")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function isUsefulSuitabilityLabel(value?: string | null) {
  if (!value?.trim()) return false;
  return !excludedSuitabilityLabels.has(normaliseLabel(value));
}

export function filterSuitabilityLabels(values: string[] = []) {
  return values.filter(isUsefulSuitabilityLabel);
}

export function toDirectoryServiceLabel(value?: string | null) {
  const cleaned = value?.trim() || "";
  if (!cleaned || excludedServiceLabels.has(normaliseLabel(cleaned))) return "";

  const canonicalSlug = canonicalServiceSlug(cleaned);
  if (canonicalSlug) return canonicalServiceName(cleaned);

  return supplementaryDirectoryServices[normaliseLabel(cleaned)] || "";
}

export function getUsefulServiceLabels(values: string[] = [], preferredService?: string | null, limit = 3) {
  const ordered = prioritiseCanonicalServiceList(values, preferredService);
  const labels = ordered.map(toDirectoryServiceLabel).filter(Boolean);
  return Array.from(new Set(labels)).slice(0, limit);
}
