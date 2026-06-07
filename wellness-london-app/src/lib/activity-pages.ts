import type { AirtableFacility, ServiceKey } from "@/lib/airtable";

export type ActivitySlug =
  | "sauna-london"
  | "infrared-sauna-london"
  | "cold-plunge-london"
  | "contrast-therapy-london"
  | "cryotherapy-london"
  | "red-light-therapy-london"
  | "hbot-london";

export type ActivityPageConfig = {
  slug: ActivitySlug;
  href: string;
  canonicalHref: string;
  label: string;
  title: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  heroText: string;
  activityLabels: string[];
  serviceKeys: ServiceKey[];
  keywords: string[];
  related: { href: string; label: string; text: string }[];
  guidance: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
};

export const activityPages: ActivityPageConfig[] = [
  {
    slug: "sauna-london",
    href: "/sauna-london",
    canonicalHref: "/sauna-london",
    label: "Sauna",
    title: "Sauna in London",
    metaTitle: "Sauna in London | Well+ Activity Guide",
    description: "Explore London sauna venues, including traditional, communal and premium heat therapy spaces.",
    eyebrow: "Heat therapy",
    heroText: "Traditional, communal and premium heat spaces for recovery, reset and ritual.",
    activityLabels: ["Sauna"],
    serviceKeys: ["sauna"],
    keywords: ["sauna", "finnish", "heat therapy", "heat exposure"],
    related: [
      { href: "/infrared-sauna-london", label: "Infrared Sauna", text: "Gentler private heat experiences and wellness-club infrared rooms." },
      { href: "/cold-plunge-london", label: "Cold Plunge", text: "Cold-water venues that pair naturally with sauna routines." },
      { href: "/contrast-therapy-london", label: "Contrast Therapy", text: "Spaces combining heat and cold in one structured recovery ritual." },
    ],
    guidance: [
      { title: "Check the heat format", text: "Traditional and communal saunas feel different from private or infrared-led rooms." },
      { title: "Look for practical facilities", text: "Showers, towels, changing rooms and cooling areas shape the visit as much as the sauna itself." },
      { title: "Choose the right atmosphere", text: "Some saunas are quiet and private, while others are social, community-led or performance-focused." },
    ],
    faqs: [
      { question: "Where can I find sauna in London?", answer: "London has communal sauna baths, premium bathhouses, recovery studios and wellness clubs offering sauna access. Use the directory to compare format, location and facilities." },
      { question: "Is sauna usually private or shared?", answer: "Both exist. Community sauna and bathhouse formats are usually shared, while some wellness studios offer private or semi-private sauna sessions." },
    ],
  },
  {
    slug: "infrared-sauna-london",
    href: "/infrared-sauna-london",
    canonicalHref: "/infrared-sauna-london",
    label: "Infrared Sauna",
    title: "Infrared Sauna in London",
    metaTitle: "Infrared Sauna in London | Well+ Activity Guide",
    description: "Find London venues offering infrared sauna, from private recovery rooms to premium wellness clubs.",
    eyebrow: "Gentle heat",
    heroText: "Lower-intensity heat spaces often used for quiet recovery, reset and wellness routines.",
    activityLabels: ["Infrared Sauna"],
    serviceKeys: ["sauna"],
    keywords: ["infrared sauna", "infrared"],
    related: [
      { href: "/sauna-london", label: "Sauna", text: "Compare infrared with traditional and communal sauna experiences." },
      { href: "/red-light-therapy-london", label: "Red Light Therapy", text: "Another technology-led wellness activity often found in premium studios." },
    ],
    guidance: [
      { title: "Check whether it is private", text: "Infrared sauna is often offered as a private or semi-private room, but access models vary." },
      { title: "Compare what is included", text: "Look for session length, towel policy, shower access and whether other recovery services are available." },
      { title: "Think about repeat use", text: "Infrared sauna is often chosen as part of a routine, so location and price matter." },
    ],
    faqs: [
      { question: "What is infrared sauna?", answer: "Infrared sauna uses infrared heat rather than the same air-heating format as traditional sauna. The experience is often gentler, but exact formats vary by venue." },
      { question: "Where can I book infrared sauna in London?", answer: "Infrared sauna is commonly found in wellness clubs, recovery studios and some spas. Compare facilities and access before booking." },
    ],
  },
  {
    slug: "cold-plunge-london",
    href: "/cold-plunge-london",
    canonicalHref: "/cold-plunge-london",
    label: "Cold Plunge",
    title: "Cold Plunge in London",
    metaTitle: "Cold Plunge in London | Well+ Activity Guide",
    description: "Explore London cold plunge and ice bath venues, including guided recovery studios and sauna-and-plunge spaces.",
    eyebrow: "Cold therapy",
    heroText: "Ice baths, cold tubs and cold-water recovery spaces across London.",
    activityLabels: ["Cold Plunge", "Ice Bath & Cold Plunge"],
    serviceKeys: ["cold-plunge"],
    keywords: ["cold plunge", "ice bath", "cold exposure", "cold water"],
    related: [
      { href: "/sauna-london", label: "Sauna", text: "Heat-led spaces that often pair with cold immersion." },
      { href: "/contrast-therapy-london", label: "Contrast Therapy", text: "Sauna and cold plunge together in one recovery ritual." },
      { href: "/cryotherapy-london", label: "Cryotherapy", text: "A different cold-therapy format using cold air rather than immersion." },
    ],
    guidance: [
      { title: "Guided or self-led", text: "First-timers may prefer guided cold exposure, while experienced users may want flexible access." },
      { title: "Check the recovery setup", text: "Showers, towels, warm-up areas and staff guidance matter after cold immersion." },
      { title: "Know whether sauna is included", text: "Some venues are cold plunge only, while others are designed for full contrast therapy." },
    ],
    faqs: [
      { question: "Where can I do cold plunge in London?", answer: "Cold plunge is available in recovery studios, community sauna sites, some gyms and premium wellness clubs. The best option depends on guidance, facilities and location." },
      { question: "Is cold plunge the same as cryotherapy?", answer: "No. Cold plunge usually means cold-water immersion, while cryotherapy uses cold air or localised cold treatments." },
    ],
  },
  {
    slug: "contrast-therapy-london",
    href: "/contrast-therapy-london",
    canonicalHref: "/contrast-therapy-london",
    label: "Contrast Therapy",
    title: "Contrast Therapy in London",
    metaTitle: "Contrast Therapy in London | Well+ Activity Guide",
    description: "Find London venues combining sauna and cold plunge for structured hot-and-cold recovery rituals.",
    eyebrow: "Hot and cold",
    heroText: "Spaces built around moving between heat and cold in one structured recovery session.",
    activityLabels: ["Contrast Therapy", "Sauna & Cold Plunge"],
    serviceKeys: ["sauna", "cold-plunge"],
    keywords: ["contrast therapy", "sauna and cold plunge", "sauna & cold plunge", "hot and cold"],
    related: [
      { href: "/sauna-london", label: "Sauna", text: "Heat-led spaces across London." },
      { href: "/cold-plunge-london", label: "Cold Plunge", text: "Cold-water recovery spaces and ice baths." },
    ],
    guidance: [
      { title: "Look for purpose-built flow", text: "The best contrast venues make it easy to move between sauna, cold plunge and recovery space." },
      { title: "Check if sessions are guided", text: "Guided formats can be helpful for first-timers and group experiences." },
      { title: "Avoid assuming every sauna has plunge", text: "Some venues offer sauna only, so confirm cold-water access before booking." },
    ],
    faqs: [
      { question: "What is contrast therapy?", answer: "Contrast therapy usually combines heat and cold, often sauna followed by cold plunge or ice bath exposure." },
      { question: "Where can I do sauna and cold plunge in London?", answer: "London has recovery studios, bathhouses and community sauna venues offering heat-and-cold formats. Compare facilities before booking." },
    ],
  },
  {
    slug: "cryotherapy-london",
    href: "/cryotherapy-london",
    canonicalHref: "/cryotherapy-london",
    label: "Cryotherapy",
    title: "Cryotherapy in London",
    metaTitle: "Cryotherapy in London | Well+ Activity Guide",
    description: "Compare London cryotherapy venues, including whole-body and recovery-studio cold therapy options.",
    eyebrow: "Cold air therapy",
    heroText: "Short, structured cold-therapy sessions across specialist studios and recovery spaces.",
    activityLabels: ["Cryotherapy"],
    serviceKeys: ["cryotherapy"],
    keywords: ["cryotherapy", "cryo", "whole body cryotherapy", "localised cryotherapy"],
    related: [
      { href: "/cold-plunge-london", label: "Cold Plunge", text: "Compare cryotherapy with cold-water immersion." },
      { href: "/red-light-therapy-london", label: "Red Light Therapy", text: "Another recovery technology often offered in premium wellness spaces." },
    ],
    guidance: [
      { title: "Understand the treatment type", text: "Check whether the venue offers whole-body, localised or other cold-treatment formats." },
      { title: "Prioritise staff guidance", text: "Clear safety briefing and contraindication checks matter for first-time users." },
      { title: "Compare wider facilities", text: "Some cryotherapy venues also offer compression, red light or other recovery services." },
    ],
    faqs: [
      { question: "Where can I find cryotherapy in London?", answer: "Cryotherapy is offered by specialist studios, recovery venues and some premium wellness clinics across London." },
      { question: "Is cryotherapy the same as cold plunge?", answer: "No. Cryotherapy usually uses cold air or targeted cold treatment, while cold plunge involves cold-water immersion." },
    ],
  },
  {
    slug: "red-light-therapy-london",
    href: "/red-light-therapy-london",
    canonicalHref: "/red-light-therapy-london",
    label: "Red Light Therapy",
    title: "Red Light Therapy in London",
    metaTitle: "Red Light Therapy in London | Well+ Activity Guide",
    description: "Find London wellness venues offering red light therapy and related recovery or longevity treatments.",
    eyebrow: "Light therapy",
    heroText: "Technology-led wellness sessions found in recovery studios, longevity clinics and premium wellness clubs.",
    activityLabels: ["Red Light Therapy"],
    serviceKeys: ["red-light"],
    keywords: ["red light", "red light therapy", "photobiomodulation"],
    related: [
      { href: "/hbot-london", label: "HBOT", text: "Another longevity and recovery technology offered by some premium clinics." },
      { href: "/longevity-london", label: "Longevity", text: "Explore broader longevity and optimisation-led wellness spaces." },
    ],
    guidance: [
      { title: "Check the setup", text: "Venues vary from simple panels to dedicated treatment rooms or clinic-led protocols." },
      { title: "Be cautious with claims", text: "Treat red light as a wellness activity and check venue credentials where health claims are made." },
      { title: "Look for related services", text: "Red light often sits alongside infrared sauna, HBOT, cryotherapy or diagnostics." },
    ],
    faqs: [
      { question: "Where can I find red light therapy in London?", answer: "Red light therapy is available in some recovery studios, longevity clinics and premium wellness clubs." },
      { question: "Is red light therapy medical treatment?", answer: "Well+ does not provide medical advice. Check provider credentials and seek professional guidance for medical concerns." },
    ],
  },
  {
    slug: "hbot-london",
    href: "/hbot-london",
    canonicalHref: "/hbot-london",
    label: "HBOT",
    title: "HBOT in London",
    metaTitle: "HBOT in London | Hyperbaric Oxygen Therapy | Well+",
    description: "Explore London venues offering hyperbaric oxygen therapy within longevity, recovery and medical-wellness settings.",
    eyebrow: "Hyperbaric oxygen",
    heroText: "Hyperbaric oxygen therapy options across London longevity and recovery clinics.",
    activityLabels: ["Hyperbaric Oxygen Therapy", "HBOT"],
    serviceKeys: ["hbot"],
    keywords: ["hbot", "hyperbaric", "hyperbaric oxygen therapy"],
    related: [
      { href: "/red-light-therapy-london", label: "Red Light Therapy", text: "Another technology-led wellness activity found in longevity spaces." },
      { href: "/longevity-london", label: "Longevity", text: "Explore longevity clinics and preventative wellness spaces." },
    ],
    guidance: [
      { title: "Check the access model", text: "HBOT is often offered in clinic or consultation-led settings rather than casual walk-in formats." },
      { title: "Review credentials", text: "Because HBOT is more medical-adjacent, venue credentials and safety information matter." },
      { title: "Understand the package", text: "Check session length, number of sessions, pricing and whether a consultation is required." },
    ],
    faqs: [
      { question: "Where can I find HBOT in London?", answer: "HBOT is usually found in longevity clinics, medical-wellness spaces and specialist recovery venues." },
      { question: "Is HBOT medical advice?", answer: "No. Well+ is a directory and editorial guide, not a medical advice service. Always check provider credentials and seek professional advice where relevant." },
    ],
  },
];

export function getActivityPage(slug: string) {
  return activityPages.find((page) => page.slug === slug);
}

function matchesActivityLabel(facility: AirtableFacility, activity: ActivityPageConfig) {
  const searchableLabels = [
    ...facility.activityTagsStandardized,
    ...facility.activityDisplayLabels,
    ...facility.servicesOffered,
  ].map((item) => item.toLowerCase());

  return activity.activityLabels.some((label) => searchableLabels.some((item) => item.includes(label.toLowerCase())));
}

function matchesActivityKeyword(facility: AirtableFacility, activity: ActivityPageConfig) {
  const searchable = [
    facility.name,
    facility.description,
    facility.editorialSummary,
    facility.editorialVerdict,
    facility.ambience,
    facility.venueTypeStandardized,
    ...facility.themeTagsStandardized,
    ...facility.activityCategories,
    ...facility.activityTagsStandardized,
    ...facility.activityDisplayLabels,
    ...facility.servicesOffered,
    ...facility.bestFor,
    ...facility.experienceType,
  ].filter(Boolean).join(" ").toLowerCase();

  return activity.keywords.some((keyword) => searchable.includes(keyword.toLowerCase()));
}

export function getFacilitiesForActivity(facilities: AirtableFacility[], activity: ActivityPageConfig) {
  return facilities
    .filter((facility) => {
      const serviceMatch = facility.serviceKeys.some((key) => activity.serviceKeys.includes(key));
      return serviceMatch || matchesActivityLabel(facility, activity) || matchesActivityKeyword(facility, activity);
    })
    .sort((a, b) => Number(b.isFeatured) * 100 + b.profileCompletenessScore - (Number(a.isFeatured) * 100 + a.profileCompletenessScore));
}
