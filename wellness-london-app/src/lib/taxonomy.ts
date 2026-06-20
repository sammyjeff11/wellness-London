export type ServiceCategory = "heat" | "cold" | "recovery" | "mind-body" | "oxygen" | "longevity" | "medical-wellness";

export type ServiceSlug =
  | "sauna"
  | "cold-plunge"
  | "cryotherapy"
  | "red-light-therapy"
  | "contrast-therapy"
  | "massage"
  | "breathwork"
  | "float-therapy"
  | "hyperbaric-oxygen-therapy"
  | "infrared-sauna"
  | "longevity-testing"
  | "diagnostics"
  | "blood-testing"
  | "iv-therapy"
  | "nad-therapy"
  | "genomic-testing"
  | "hormone-testing"
  | "gut-health-testing"
  | "ozone-therapy"
  | "health-optimisation";

export type ServiceTaxonomyEntry = {
  name: string;
  slug: ServiceSlug;
  description: string;
  synonyms?: string[];
  parentCategory?: ServiceCategory;
  href: string;
};

export const serviceTaxonomy = [
  {
    name: "Sauna",
    slug: "sauna",
    description: "Heat-led bathing experiences, including traditional, Finnish, outdoor and steam-adjacent sauna formats.",
    synonyms: ["saunas", "finnish sauna", "traditional sauna", "heat therapy", "heat exposure", "thermal bathing"],
    parentCategory: "heat",
    href: "/sauna-london",
  },
  {
    name: "Cold Plunge",
    slug: "cold-plunge",
    description: "Cold-water immersion experiences, also known as ice baths, cold tubs or cold-water recovery, used as a standalone cold session or as part of a contrast therapy ritual.",
    synonyms: ["cold plunge", "cold plunges", "ice bath", "ice baths", "ice tub", "cold tub", "cold dip", "cold exposure", "cold water immersion", "cold water therapy", "cold therapy", "cold water recovery", "plunge pool"],
    parentCategory: "cold",
    href: "/cold-plunge-london",
  },
  {
    name: "Cryotherapy",
    slug: "cryotherapy",
    description: "Whole-body or localised cold-air recovery treatments delivered through cryotherapy chambers or devices.",
    synonyms: ["cryo", "whole body cryotherapy", "localised cryotherapy", "localized cryotherapy", "cryotherapy chamber"],
    parentCategory: "cold",
    href: "/cryotherapy-london",
  },
  {
    name: "Red Light Therapy",
    slug: "red-light-therapy",
    description: "Light-led recovery and wellbeing sessions using red or near-infrared panels, beds or treatment devices.",
    synonyms: ["red light", "redlight", "led therapy", "near infrared light", "photobiomodulation"],
    parentCategory: "recovery",
    href: "/red-light-therapy-london",
  },
  {
    name: "Contrast Therapy",
    slug: "contrast-therapy",
    description: "Hot-and-cold recovery rituals, also known as sauna and cold plunge, usually alternating heat exposure with cold-water immersion or ice-bath sessions.",
    synonyms: ["contrast", "contrast bathing", "hot and cold", "hot-cold therapy", "hot cold therapy", "hot and cold therapy", "sauna and cold plunge", "sauna & cold plunge", "sauna and ice bath", "sauna & ice bath", "sauna and plunge", "sauna & plunge", "thermal cycle", "thermal circuit"],
    parentCategory: "recovery",
    href: "/contrast-therapy-london",
  },
  {
    name: "Massage",
    slug: "massage",
    description: "Hands-on bodywork and recovery treatments, from sports massage to restorative body treatments.",
    synonyms: ["sports massage", "body treatment", "bodywork", "deep tissue massage", "lymphatic massage"],
    parentCategory: "recovery",
    href: "/recovery-london",
  },
  {
    name: "Breathwork",
    slug: "breathwork",
    description: "Guided breathing sessions and practices designed for nervous-system regulation, reset or performance support.",
    synonyms: ["breath work", "guided breathing", "breathing class", "pranayama"],
    parentCategory: "mind-body",
    href: "/stress-regulation-london",
  },
  {
    name: "Float Therapy",
    slug: "float-therapy",
    description: "Sensory-reduced float-tank or float-pod sessions designed for deep rest and decompression.",
    synonyms: ["float", "floatation", "flotation", "float tank", "float pod", "sensory deprivation"],
    parentCategory: "mind-body",
    href: "/recovery-london",
  },
  {
    name: "Hyperbaric Oxygen Therapy",
    slug: "hyperbaric-oxygen-therapy",
    description: "Oxygen-focused sessions delivered in a pressurised hyperbaric chamber, commonly abbreviated as HBOT.",
    synonyms: ["hbot", "hyperbaric", "oxygen therapy", "hyperbaric chamber", "hyperbaric oxygen"],
    parentCategory: "oxygen",
    href: "/hbot-london",
  },
  {
    name: "Infrared Sauna",
    slug: "infrared-sauna",
    description: "Infrared heat sessions delivered through private cabins, pods or suites using infrared panels rather than traditional sauna stoves.",
    synonyms: ["infrared", "ir sauna", "infrared cabin", "infrared heat"],
    parentCategory: "heat",
    href: "/infrared-sauna-london",
  },
  {
    name: "Longevity Testing",
    slug: "longevity-testing",
    description: "Clinic-led testing and assessment designed to understand healthspan, biological age, risk markers and longer-term health optimisation.",
    synonyms: ["longevity assessment", "longevity testing", "biological age testing", "biological age", "healthspan testing", "longevity baseline assessment", "longevity diagnostics"],
    parentCategory: "longevity",
    href: "/longevity",
  },
  {
    name: "Diagnostics",
    slug: "diagnostics",
    description: "Advanced health assessments, screening and diagnostic mapping offered by preventative health and longevity clinics.",
    synonyms: ["diagnostic testing", "diagnostic mapping", "health assessment", "health screening", "advanced diagnostics", "precision diagnostic mapping"],
    parentCategory: "medical-wellness",
    href: "/longevity",
  },
  {
    name: "Blood Testing",
    slug: "blood-testing",
    description: "Blood-based biomarker testing used by clinics to assess health status, risk markers and optimisation opportunities.",
    synonyms: ["blood test", "blood tests", "biomarker testing", "biomarkers", "blood panel", "bloodwork", "blood work"],
    parentCategory: "medical-wellness",
    href: "/longevity",
  },
  {
    name: "IV Therapy",
    slug: "iv-therapy",
    description: "Intravenous nutrient or hydration treatments offered in clinic-led wellness and recovery settings.",
    synonyms: ["iv", "iv drip", "iv drips", "iv infusion", "iv infusions", "intravenous therapy", "nutrient infusion", "nutrient infusions"],
    parentCategory: "medical-wellness",
    href: "/longevity",
  },
  {
    name: "NAD+ Therapy",
    slug: "nad-therapy",
    description: "NAD+ replenishment or infusion therapies positioned around energy, cellular health and longevity-led optimisation.",
    synonyms: ["nad", "nad+", "nad therapy", "nad+ therapy", "nad infusion", "nad+ infusion", "nad repletion", "nad+ repletion"],
    parentCategory: "longevity",
    href: "/longevity",
  },
  {
    name: "Genomic Testing",
    slug: "genomic-testing",
    description: "Genetic or genomic assessments used by longevity clinics to inform health risk, performance and personalised optimisation programmes.",
    synonyms: ["genomics", "genomic", "genetic testing", "genomic analysis", "genomic intelligence", "methylation analysis", "detox genomics", "hormonal genomic analysis"],
    parentCategory: "longevity",
    href: "/longevity",
  },
  {
    name: "Hormone Testing",
    slug: "hormone-testing",
    description: "Hormonal and endocrine assessments used to understand metabolic, energy, reproductive or performance-related health markers.",
    synonyms: ["hormone test", "hormonal testing", "endocrine testing", "endocrine intelligence", "metabolic intelligence", "cycle mapping"],
    parentCategory: "medical-wellness",
    href: "/longevity",
  },
  {
    name: "Gut Health Testing",
    slug: "gut-health-testing",
    description: "Digestive, microbiome, food reactivity and immune-related testing offered by clinic-led wellness providers.",
    synonyms: ["gut health", "digestive testing", "microbiome testing", "food sensitivity testing", "food immune reactivity", "sibo", "intestinal barrier", "immune integrity"],
    parentCategory: "medical-wellness",
    href: "/longevity",
  },
  {
    name: "Ozone Therapy",
    slug: "ozone-therapy",
    description: "Medical-wellness ozone treatments offered by selected clinics as part of cellular recovery or optimisation programmes.",
    synonyms: ["ozone", "medical ozone", "high-dose medical ozone", "high dose medical ozone", "ozone treatment"],
    parentCategory: "medical-wellness",
    href: "/longevity",
  },
  {
    name: "Health Optimisation",
    slug: "health-optimisation",
    description: "Personalised health, energy, sleep, recovery and performance support delivered through testing, consultation and repeatable protocols.",
    synonyms: ["health optimization", "optimisation", "optimization", "performance optimisation", "performance optimization", "preventative health", "preventive health", "precision medicine"],
    parentCategory: "longevity",
    href: "/optimise",
  },
] as const satisfies readonly ServiceTaxonomyEntry[];

export type CanonicalService = (typeof serviceTaxonomy)[number];

const normaliseTaxonomyText = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const serviceTerms = serviceTaxonomy.flatMap((service) => {
  const terms = [service.name, service.slug, ...(service.synonyms || [])];
  return terms.map((term) => ({ service, term: normaliseTaxonomyText(term) }));
});

export function normaliseServiceInput(value?: string | null) {
  return normaliseTaxonomyText(value || "");
}

export function getServiceBySlug(slug?: string | null) {
  if (!slug) return undefined;
  return serviceTaxonomy.find((service) => service.slug === slug);
}

export function findCanonicalService(value?: string | null) {
  const normalisedValue = normaliseServiceInput(value);
  if (!normalisedValue) return undefined;

  return serviceTerms
    .filter(({ term }) => term && (normalisedValue === term || normalisedValue.includes(term) || term.includes(normalisedValue)))
    .sort((a, b) => b.term.length - a.term.length)[0]?.service;
}

export function canonicalServiceName(value?: string | null) {
  return findCanonicalService(value)?.name || value || "";
}

export function canonicalServiceSlug(value?: string | null) {
  return findCanonicalService(value)?.slug;
}

export function canonicalServiceHref(value?: string | null) {
  return findCanonicalService(value)?.href;
}

export function canonicaliseServiceList(values: string[] = []) {
  const seen = new Set<string>();

  return values.reduce<string[]>((services, value) => {
    const canonical = findCanonicalService(value);
    const label = canonical?.name || value;
    const key = canonical?.slug || normaliseServiceInput(label);

    if (label && !seen.has(key)) {
      seen.add(key);
      services.push(label);
    }

    return services;
  }, []);
}
