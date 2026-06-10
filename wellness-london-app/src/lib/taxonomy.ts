export type ServiceCategory = "heat" | "cold" | "recovery" | "mind-body" | "oxygen";

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
  | "infrared-sauna";

export type ServiceTaxonomyEntry = {
  name: string;
  slug: ServiceSlug;
  description: string;
  synonyms?: string[];
  parentCategory?: ServiceCategory;
  href?: string;
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
    description: "Cold-water immersion experiences, including plunges, ice baths and cold tubs used for recovery or reset. When paired with sauna, this is often described as contrast therapy.",
    synonyms: ["cold plunge", "cold plunges", "ice bath", "ice baths", "ice tub", "cold tub", "cold dip", "cold exposure", "cold water immersion", "cold therapy"],
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
    name: "Sauna + Cold Plunge",
    slug: "contrast-therapy",
    description: "Sauna and cold plunge in one hot-and-cold recovery ritual. This is also known as contrast therapy.",
    synonyms: ["contrast therapy", "contrast", "hot and cold", "hot and cold therapy", "sauna and cold plunge", "sauna + cold plunge", "sauna & cold plunge", "sauna and plunge", "sauna & plunge", "thermal cycle"],
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
