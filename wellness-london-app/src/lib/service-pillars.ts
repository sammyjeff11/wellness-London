export type ServicePillar = "recovery" | "longevity" | "performance" | "reset" | "optimise";

export type PillarService = {
  name: string;
  href?: string;
  priority: number;
  synonyms: string[];
};

export const pillarServices: Record<ServicePillar, PillarService[]> = {
  recovery: [
    { name: "Sauna", href: "/sauna-london", priority: 1, synonyms: ["sauna", "finnish sauna", "traditional sauna"] },
    { name: "Cold Plunge", href: "/cold-plunge-london", priority: 2, synonyms: ["cold plunge", "ice bath", "cold water immersion"] },
    { name: "Contrast Therapy", href: "/contrast-therapy-london", priority: 3, synonyms: ["contrast therapy", "sauna and cold plunge", "hot and cold therapy"] },
    { name: "Cryotherapy", href: "/cryotherapy-london", priority: 4, synonyms: ["cryotherapy", "cryo"] },
    { name: "Red Light Therapy", href: "/red-light-therapy-london", priority: 5, synonyms: ["red light therapy", "photobiomodulation"] },
    { name: "Hyperbaric Oxygen Therapy", href: "/hbot-london", priority: 6, synonyms: ["hbot", "hyperbaric oxygen therapy", "hyperbaric"] },
    { name: "Massage", priority: 20, synonyms: ["massage", "sports massage", "bodywork"] },
    { name: "Compression Therapy", priority: 21, synonyms: ["compression therapy", "compression boots"] },
    { name: "Float Therapy", priority: 22, synonyms: ["float therapy", "float tank", "flotation"] },
  ],
  longevity: [
    { name: "Health Screening", href: "/health-screening-london", priority: 1, synonyms: ["health screening", "health assessment", "executive health", "preventative health", "preventive health"] },
    { name: "DEXA Scan", href: "/dexa-scan-london", priority: 2, synonyms: ["dexa", "body composition scan", "bone density scan"] },
    { name: "VO₂ Max Testing", href: "/vo2-max-testing-london", priority: 3, synonyms: ["vo2 max", "vo₂ max", "vo2max", "cardiorespiratory fitness"] },
    { name: "Blood Testing", priority: 10, synonyms: ["blood testing", "blood test", "biomarker", "blood panel"] },
    { name: "MRI Screening", priority: 11, synonyms: ["mri", "medical imaging", "full body scan"] },
    { name: "Cardiovascular Screening", priority: 12, synonyms: ["cardiovascular", "cardiac", "ecg", "heart screening"] },
    { name: "Biological Age Testing", priority: 13, synonyms: ["biological age", "epigenetic"] },
    { name: "Genetic Testing", priority: 14, synonyms: ["genetic testing", "genomic testing", "genomics"] },
    { name: "Hormone Testing", priority: 15, synonyms: ["hormone testing", "hormonal testing", "endocrine testing"] },
    { name: "Continuous Glucose Monitoring", priority: 16, synonyms: ["continuous glucose monitoring", "cgm"] },
    { name: "Microbiome Testing", priority: 17, synonyms: ["microbiome", "gut health testing"] },
  ],
  performance: [
    { name: "VO₂ Max Testing", href: "/vo2-max-testing-london", priority: 1, synonyms: ["vo2 max", "vo₂ max", "vo2max"] },
    { name: "DEXA Scan", href: "/dexa-scan-london", priority: 2, synonyms: ["dexa", "body composition scan"] },
    { name: "Assisted Stretching", priority: 3, synonyms: ["assisted stretching", "stretch therapy"] },
    { name: "Metabolic Testing", priority: 4, synonyms: ["metabolic testing", "resting metabolic rate", "lactate threshold"] },
    { name: "Running Analysis", priority: 10, synonyms: ["running analysis", "gait analysis", "biomechanics"] },
    { name: "Sports Physiology", priority: 11, synonyms: ["sports physiology", "exercise physiology", "performance testing"] },
  ],
  reset: [
    { name: "Breathwork", priority: 1, synonyms: ["breathwork", "guided breathing"] },
    { name: "Float Therapy", priority: 2, synonyms: ["float therapy", "float tank", "flotation"] },
    { name: "Meditation", priority: 3, synonyms: ["meditation", "mindfulness"] },
    { name: "Sound Therapy", priority: 4, synonyms: ["sound bath", "sound therapy"] },
  ],
  optimise: [
    { name: "Blood Testing", priority: 1, synonyms: ["blood testing", "blood test", "biomarker"] },
    { name: "Hormone Testing", priority: 2, synonyms: ["hormone testing", "hormonal testing"] },
    { name: "Nutrition", priority: 3, synonyms: ["nutrition", "nutritional consultation"] },
    { name: "IV Therapy", priority: 10, synonyms: ["iv therapy", "iv drip", "intravenous therapy"] },
    { name: "NAD+ Therapy", priority: 11, synonyms: ["nad", "nad+ therapy", "nad infusion"] },
  ],
};

const normalise = (value: string) =>
  value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();

export function getPillarServices(pillar: ServicePillar) {
  return [...pillarServices[pillar]].sort((a, b) => a.priority - b.priority);
}

export function getMatchedPillarServices(pillar: ServicePillar, values: string[]) {
  const text = normalise(values.filter(Boolean).join(" "));
  return getPillarServices(pillar).filter((service) =>
    [service.name, ...service.synonyms].some((term) => text.includes(normalise(term))),
  );
}

export function prioritiseServicesForPillar(pillar: ServicePillar, values: string[]) {
  const matched = getMatchedPillarServices(pillar, values).map((service) => service.name);
  const matchedNormalised = new Set(matched.map(normalise));
  const remaining = values.filter((value) => !matchedNormalised.has(normalise(value)));
  return Array.from(new Set([...matched, ...remaining]));
}

export function getPillarServiceHref(pillar: ServicePillar, serviceName: string) {
  return getPillarServices(pillar).find((service) => normalise(service.name) === normalise(serviceName))?.href;
}
