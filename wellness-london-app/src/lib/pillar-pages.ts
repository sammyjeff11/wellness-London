import type { AirtableFacility, ServiceKey } from "@/lib/airtable";
import {
  getVenuePillarsFromServices,
  getVenueServiceCountForPillar,
  type ServicePillarMapping,
  type ServicePillarName,
} from "@/lib/service-pillar-mapping";

export type PillarSlug = "recover" | "perform" | "reset" | "optimise" | "longevity";
type PublicServicePillarName = Exclude<ServicePillarName, "Exclude from Pillar Pages">;

export type PillarPageConfig = {
  slug: PillarSlug;
  href: string;
  label: string;
  taxonomyPillar: PublicServicePillarName;
  title: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  intro: string;
  serviceKeys: ServiceKey[];
  keywords: string[];
  popularLinks: { href: string; label: string; description: string }[];
  guidance: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
};

export const pillarPages: PillarPageConfig[] = [
  {
    slug: "recover",
    href: "/recover",
    label: "Recovery & Performance",
    taxonomyPillar: "Recovery & Performance",
    title: "Recovery & Performance in London",
    metaTitle: "Recover in London | The Well Edit",
    description: "A curated guide to London recovery spaces, including sauna, cold plunge, cryotherapy, contrast therapy and recovery clubs.",
    eyebrow: "Recovery-led wellness",
    intro: "For sauna, cold plunge, contrast therapy, cryotherapy, compression, sports recovery, massage, thermal recovery and post-training support across London.",
    serviceKeys: ["sauna", "cold-plunge", "cryotherapy", "recovery"],
    keywords: ["recover", "recovery", "post-gym", "sports", "compression", "massage", "contrast", "cold", "sauna"],
    popularLinks: [
      { href: "/sauna-london", label: "Saunas in London", description: "Heat therapy spaces for recovery, reset and slower weekly rituals." },
      { href: "/cold-plunge-london", label: "Cold Plunge in London", description: "Cold exposure, ice baths and contrast therapy spaces." },
      { href: "/cryotherapy-london", label: "Cryotherapy in London", description: "Short, structured cold-therapy sessions for recovery routines." },
      { href: "/contrast-therapy-london", label: "Contrast Therapy in London", description: "Venues combining heat and cold in one recovery ritual." },
    ],
    guidance: [
      { title: "Start with the outcome", text: "Choose sauna and contrast therapy for slower recovery rituals, cryotherapy for short structured sessions, or recovery clubs for a more complete post-training routine." },
      { title: "Check the format", text: "Some venues are private and quiet; others are social, gym-led or membership-based. The right choice depends on how much guidance, privacy and structure you want." },
      { title: "Plan the practical details", text: "Before booking, check towel policy, showers, changing rooms, time limits and whether cold plunge access is guided or self-directed." },
    ],
    faqs: [
      { question: "What types of recovery spaces are included?", answer: "This pillar includes venues offering sauna, cold plunge, contrast therapy, cryotherapy, compression, massage and broader recovery-led services." },
      { question: "Is recovery only for athletes?", answer: "No. Many recovery spaces are useful for general stress relief, weekly reset and physical restoration, not just sport or performance." },
      { question: "How should I choose a recovery venue?", answer: "Start with your goal, then compare facilities, atmosphere, booking model, price and location." },
    ],
  },
  {
    slug: "perform",
    href: "/perform",
    label: "Mobility",
    taxonomyPillar: "Mobility",
    title: "Mobility in London",
    metaTitle: "Performance Wellness in London | Well+",
    description: "Explore London mobility spaces, including assisted stretching, physiotherapy, Pilates, yoga, flexibility, posture and movement-quality support.",
    eyebrow: "Movement and flexibility",
    intro: "For assisted stretching, physiotherapy, Pilates, yoga, flexibility, posture, movement quality and injury-prevention support.",
    serviceKeys: ["recovery", "cryotherapy", "cold-plunge", "breathwork", "sauna"],
    keywords: ["perform", "performance", "training", "athlete", "sports", "post-gym", "mobility", "compression", "energy", "contrast", "cold plunge", "sauna"],
    popularLinks: [
      { href: "/best-sauna-cold-plunge-london", label: "Best Sauna + Cold Plunge", description: "A curated Well+ guide to contrast therapy and heat-and-cold recovery spaces." },
      { href: "/cryotherapy-london", label: "Cryotherapy in London", description: "Cold-therapy spaces often used in performance and recovery routines." },
      { href: "/contrast-therapy-london", label: "Contrast Therapy in London", description: "Structured heat-and-cold recovery spaces across London." },
      { href: "/cold-plunge-london", label: "Cold Plunge in London", description: "Cold exposure and ice bath venues for structured recovery." },
    ],
    guidance: [
      { title: "Build around repeatable activities", text: "Performance wellness is usually driven by repeatable activities such as cold plunge, sauna, compression, mobility and structured recovery rather than one-off experiences." },
      { title: "Choose practical recovery formats", text: "The best performance-focused venues are easy to integrate into training routines, work schedules and regular weekly habits." },
      { title: "Balance intensity with recovery", text: "Cold exposure and performance treatments work best when balanced with recovery, sleep, stress management and sustainable training load." },
    ],
    faqs: [
      { question: "What types of activities fit the Mobility pillar?", answer: "Assisted stretching, physiotherapy, Pilates, yoga, barre, personal training and movement-quality services can all fit this category." },
      { question: "Is this only for athletes?", answer: "No. Mobility support is useful for everyday posture, flexibility, injury prevention and better movement, not only sport." },
      { question: "Which treatments are most associated with mobility?", answer: "Assisted stretching, physiotherapy, Reformer Pilates, yoga and personal training are among the most common." },
    ],
  },
  {
    slug: "reset",
    href: "/reset",
    label: "Wellness Clubs",
    taxonomyPillar: "Wellness Clubs",
    title: "Wellness Clubs in London",
    metaTitle: "Reset in London | The Well Edit",
    description: "Premium London wellness clubs, spa facilities, members' spaces, hotel wellness destinations and all-in-one wellness experiences.",
    eyebrow: "Clubs, spas and rituals",
    intro: "For premium wellness clubs, spa facilities, members' spaces, hotel wellness destinations, fitness and wellness amenities, rituals and all-in-one experiences.",
    serviceKeys: ["sauna", "breathwork", "meditation", "yoga"],
    keywords: ["reset", "calm", "quiet", "relax", "relaxation", "stress", "sleep", "restorative", "bathhouse", "private"],
    popularLinks: [
      { href: "/sauna-london", label: "Saunas in London", description: "Heat-led spaces for quiet reset and restorative rituals." },
      { href: "/contrast-therapy-london", label: "Contrast Therapy in London", description: "Heat and cold rituals that can support a more intentional reset." },
      { href: "/recovery-london", label: "Recovery Spaces in London", description: "A wider set of venues for physical and mental restoration." },
    ],
    guidance: [
      { title: "Choose the atmosphere first", text: "For reset-led visits, the feel of the space often matters as much as the treatment: quiet, private, warm and unhurried usually works best." },
      { title: "Consider private or guided formats", text: "First-timers may prefer private rooms, guided sessions or venues with clear instructions rather than open-ended facilities." },
      { title: "Avoid over-scheduling", text: "The best reset experiences leave space before and after the session, especially if you are using sauna, breathwork or deeper relaxation treatments." },
    ],
    faqs: [
      { question: "What is a wellness club?", answer: "A wellness club brings several facilities or experiences together, such as spa amenities, fitness, recovery, rituals, classes or members' spaces." },
      { question: "Which venues fit the Wellness Clubs pillar?", answer: "Premium clubs, hotel wellness destinations, spas, fitness-led wellness spaces and venues with all-in-one rituals can fit this pillar." },
      { question: "Are wellness clubs beginner-friendly?", answer: "Many are, but it is still worth checking access model, booking requirements, facilities and whether day passes or memberships are required." },
    ],
  },
  {
    slug: "optimise",
    href: "/optimise",
    label: "Optimise",
    taxonomyPillar: "Longevity & Diagnostics",
    title: "Optimise in London",
    metaTitle: "Optimise in London | The Well Edit",
    description: "London wellness spaces for improving routines, energy, sleep, recovery and everyday health optimisation.",
    eyebrow: "Better routines",
    intro: "For improving how you feel and function now, from sleep and energy to recovery technology and everyday wellness routines.",
    serviceKeys: ["red-light", "hbot", "breathwork", "recovery", "sauna"],
    keywords: ["optimise", "optimize", "sleep", "energy", "red light", "hyperbaric", "hbot", "routine", "tracking", "health optimisation"],
    popularLinks: [
      { href: "/recovery-london", label: "Recovery Spaces in London", description: "A practical starting point for routine-led wellness." },
      { href: "/sauna-london", label: "Saunas in London", description: "Heat therapy spaces often used in broader optimisation routines." },
      { href: "/cryotherapy-london", label: "Cryotherapy in London", description: "Cold-therapy spaces for structured recovery and optimisation routines." },
    ],
    guidance: [
      { title: "Separate signal from noise", text: "Optimisation can become overwhelming. Start with venues that provide clear services, practical routines and transparent information." },
      { title: "Think in routines", text: "The strongest optimisation-led venues are the ones you can integrate into sleep, training, recovery or stress-management habits." },
      { title: "Be careful with claims", text: "Treat advanced wellness services as supportive experiences rather than guaranteed outcomes, especially where health claims are involved." },
    ],
    faqs: [
      { question: "What does optimise mean on The Well Edit?", answer: "Optimise covers spaces and services designed to support how you feel and function now, including recovery technology, sleep support, red light therapy and routine-led wellness." },
      { question: "How is Optimise different from Longevity?", answer: "Optimise focuses on near-term function and routine improvement. Longevity focuses more specifically on long-term healthspan and preventative wellness." },
      { question: "Are these services medical?", answer: "The Well Edit is not a medical advice site. Users should check venue credentials and seek professional advice where a service relates to health or medical conditions." },
    ],
  },
  {
    slug: "longevity",
    href: "/longevity",
    label: "Longevity & Diagnostics",
    taxonomyPillar: "Longevity & Diagnostics",
    title: "Longevity & Diagnostics in London",
    metaTitle: "Longevity in London | The Well Edit",
    description: "A curated guide to London longevity, healthspan and preventative wellness spaces, from diagnostics to recovery and optimisation-led clinics.",
    eyebrow: "Healthspan and prevention",
    intro: "For diagnostics, biomarker testing, blood testing, HBOT, red light therapy, IV and NAD treatments, preventative health and optimisation.",
    serviceKeys: ["red-light", "hbot", "sauna", "recovery"],
    keywords: ["longevity", "healthspan", "preventative", "preventive", "diagnostics", "biological age", "clinic", "red light", "hyperbaric", "health optimisation"],
    popularLinks: [
      { href: "/sauna-london", label: "Saunas in London", description: "Heat therapy spaces often discussed in broader longevity routines." },
      { href: "/recovery-london", label: "Recovery Spaces in London", description: "Recovery-led venues that can sit within a longer-term wellbeing routine." },
      { href: "/editorial-standards", label: "Editorial Standards", description: "How The Well Edit handles claims, caution and practical guidance." },
    ],
    guidance: [
      { title: "Prioritise credibility", text: "Longevity is a fast-growing category. Look for venues that are transparent about services, credentials, limitations and what is genuinely being offered." },
      { title: "Understand the service type", text: "Some longevity spaces are clinics, some are recovery studios, and some are technology-led wellness venues. They should not all be evaluated in the same way." },
      { title: "Avoid miracle framing", text: "The Well Edit treats longevity as a long-term healthspan category, not a promise of guaranteed outcomes." },
    ],
    faqs: [
      { question: "What does longevity mean here?", answer: "Longevity refers to services and spaces focused on longer-term health, healthspan, prevention and proactive wellbeing." },
      { question: "Is this medical advice?", answer: "No. The Well Edit does not provide medical advice. Longevity-related services should be considered carefully and discussed with qualified professionals where appropriate." },
      { question: "How is Longevity different from Optimise?", answer: "Longevity is about longer-term healthspan and prevention. Optimise is broader and focuses on improving how you feel and function now." },
    ],
  },
];

export function getPillarPage(slug: string) {
  return pillarPages.find((pillar) => pillar.slug === slug);
}

function isIndexableFacility(facility: AirtableFacility) {
  return Boolean(facility.slug);
}

export function getFacilitiesForPillar(
  facilities: AirtableFacility[],
  pillar: PillarPageConfig,
  servicePillarMappings: ServicePillarMapping[],
) {
  return facilities
    .filter((facility) => {
      const venuePillars = getVenuePillarsFromServices(facility, servicePillarMappings);
      return isIndexableFacility(facility) && venuePillars.includes(pillar.taxonomyPillar);
    })
    .sort((a, b) => {
      const featuredScore = Number(b.isFeatured) - Number(a.isFeatured);
      if (featuredScore !== 0) return featuredScore;

      const primaryPillarScore =
        Number(b.primaryPillar === pillar.taxonomyPillar) - Number(a.primaryPillar === pillar.taxonomyPillar);
      if (primaryPillarScore !== 0) return primaryPillarScore;

      const serviceDepthScore =
        getVenueServiceCountForPillar(b, pillar.taxonomyPillar, servicePillarMappings) -
        getVenueServiceCountForPillar(a, pillar.taxonomyPillar, servicePillarMappings);
      if (serviceDepthScore !== 0) return serviceDepthScore;

      return (b.profileCompletenessScore || 0) - (a.profileCompletenessScore || 0);
    });
}
