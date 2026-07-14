import type { AirtableFacility, ServiceKey } from "@/lib/airtable";
import {
  getVenuePillarsFromServices,
  getVenueServiceCountForPillar,
  type ServicePillarMapping,
  type ServicePillarName,
} from "@/lib/service-pillar-mapping";
import { isUsefulValue } from "@/lib/useful-values";

export type PillarSlug = "recover" | "perform" | "reset" | "optimise" | "longevity";
type PublicServicePillarName = Exclude<ServicePillarName, "Exclude from Pillar Pages">;

export type PillarPageConfig = {
  slug: PillarSlug;
  href: string;
  label: string;
  descriptor: string;
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
    label: "Recovery",
    descriptor: "Sauna, cold and physical recovery",
    taxonomyPillar: "Recovery & Performance",
    title: "Recovery in London",
    metaTitle: "Recovery in London | Sauna, Cold Plunge & Cryotherapy | Well+",
    description: "Find London recovery venues offering sauna, cold plunge, contrast therapy, cryotherapy, compression, massage and post-training support.",
    eyebrow: "Physical recovery",
    intro: "For sauna, cold plunge, contrast therapy, cryotherapy, compression, massage and practical post-training recovery across London.",
    serviceKeys: ["sauna", "cold-plunge", "cryotherapy", "recovery"],
    keywords: ["recover", "recovery", "post-gym", "compression", "massage", "contrast", "cold plunge", "sauna", "cryotherapy"],
    popularLinks: [
      { href: "/sauna-london", label: "Saunas in London", description: "Heat-led spaces for physical recovery and repeatable weekly rituals." },
      { href: "/cold-plunge-london", label: "Cold Plunge in London", description: "Ice baths and cold-water immersion across London." },
      { href: "/contrast-therapy-london", label: "Contrast Therapy in London", description: "Venues combining heat and cold in one recovery session." },
      { href: "/cryotherapy-london", label: "Cryotherapy in London", description: "Short, structured cold-air treatments for recovery routines." },
    ],
    guidance: [
      { title: "Start with the recovery need", text: "Choose sauna or contrast therapy for a slower ritual, cryotherapy for a short structured session, and massage or compression for more targeted physical support." },
      { title: "Check the session format", text: "Compare private and shared access, guidance, time limits, changing facilities and whether the venue is designed for occasional visits or regular routines." },
      { title: "Make it repeatable", text: "The most useful recovery option is often the one that fits your location, training schedule, budget and preferred level of privacy." },
    ],
    faqs: [
      { question: "What belongs in the Recovery pillar?", answer: "Sauna, cold plunge, contrast therapy, cryotherapy, compression, massage and other services focused primarily on physical restoration and post-training recovery." },
      { question: "Is recovery only for athletes?", answer: "No. These services are also used for general physical restoration, relaxation and repeatable wellbeing routines." },
      { question: "How should I compare recovery venues?", answer: "Compare the service offered, session format, facilities, price, location and how easily it fits into a repeatable routine." },
    ],
  },
  {
    slug: "perform",
    href: "/perform",
    label: "Performance & Mobility",
    descriptor: "Testing, movement and athletic support",
    taxonomyPillar: "Mobility",
    title: "Performance & Mobility in London",
    metaTitle: "Performance & Mobility Testing in London | Well+",
    description: "Explore London providers for VO₂ max testing, DEXA and body composition, assisted stretching, physiotherapy, movement screening and mobility support.",
    eyebrow: "Measure and move better",
    intro: "For fitness testing, body composition, assisted stretching, physiotherapy, mobility, posture, movement quality and athletic support.",
    serviceKeys: ["recovery", "breathwork", "cryotherapy", "cold-plunge"],
    keywords: ["performance", "vo2 max", "dexa", "body composition", "mobility", "assisted stretching", "physiotherapy", "movement screening", "athlete", "training"],
    popularLinks: [
      { href: "/vo2-max-testing-london", label: "VO₂ Max Testing", description: "Measure cardiorespiratory fitness for performance and long-term health." },
      { href: "/dexa-scan-london", label: "DEXA Scans", description: "Assess body composition, visceral fat and bone density." },
      { href: "/assisted-stretching-london", label: "Assisted Stretching", description: "Guided flexibility and mobility sessions across London." },
      { href: "/recovery-london", label: "Sports Recovery", description: "Broader recovery services that can support a training programme." },
    ],
    guidance: [
      { title: "Decide whether you need measurement or support", text: "Testing such as VO₂ max and DEXA gives you a baseline. Mobility, physiotherapy and assisted stretching are more focused on movement quality and ongoing support." },
      { title: "Look for interpretation", text: "A result is more useful when the provider explains what it means, how it relates to your goal and whether follow-up testing is appropriate." },
      { title: "Keep recovery secondary", text: "Sauna, cold plunge and cryotherapy may support a performance routine, but they should not replace testing, movement quality, sensible training and recovery planning." },
    ],
    faqs: [
      { question: "What belongs in Performance & Mobility?", answer: "VO₂ max testing, DEXA and body composition, metabolic testing, assisted stretching, physiotherapy, movement screening and related athletic support." },
      { question: "Is this only for competitive athletes?", answer: "No. These services can also help recreational exercisers and people who want to improve fitness, posture, mobility or movement confidence." },
      { question: "Why can VO₂ max and DEXA also appear under Longevity?", answer: "Both can be used for performance and long-term health. The service is framed differently depending on the user goal and the wider assessment offered by the provider." },
    ],
  },
  {
    slug: "reset",
    href: "/reset",
    label: "Reset & Restore",
    descriptor: "Stress regulation and restorative experiences",
    taxonomyPillar: "Wellness Clubs",
    title: "Reset & Restore in London",
    metaTitle: "Reset & Restore in London | Breathwork, Float & Spa | Well+",
    description: "Find London spaces for breathwork, float therapy, meditation, restorative sauna, spa rituals and calmer wellbeing experiences.",
    eyebrow: "Stress regulation and restoration",
    intro: "For breathwork, float therapy, meditation, restorative sauna, spa and bathhouse rituals, and quieter experiences designed around decompression.",
    serviceKeys: ["breathwork", "meditation", "sauna", "yoga"],
    keywords: ["reset", "restore", "breathwork", "float therapy", "meditation", "calm", "stress", "sleep", "spa", "bathhouse", "restorative"],
    popularLinks: [
      { href: "/stress-regulation-london", label: "Stress Regulation", description: "Breathwork and calmer practices for nervous-system support." },
      { href: "/recovery-london", label: "Restorative Wellness", description: "A broader guide to physical and mental restoration in London." },
      { href: "/sauna-london", label: "Restorative Saunas", description: "Heat-led spaces suited to slower, quieter rituals." },
      { href: "/collections", label: "Wellness Clubs & Collections", description: "Compare all-in-one clubs, spas and venue shortlists." },
    ],
    guidance: [
      { title: "Choose the atmosphere first", text: "For reset-led visits, privacy, noise level, pace and the feel of the space can matter as much as the service itself." },
      { title: "Match the format to your state", text: "Guided breathwork may suit someone who wants structure, while float therapy, spa rituals or restorative sauna may suit someone seeking quieter decompression." },
      { title: "Leave space around the session", text: "Avoid turning a restorative visit into another rushed appointment. Consider travel time, changing facilities and whether the venue allows time to settle afterwards." },
    ],
    faqs: [
      { question: "What belongs in Reset & Restore?", answer: "Breathwork, float therapy, meditation, sound-led practices, restorative sauna, spas, bathhouses and other experiences centred on stress regulation and decompression." },
      { question: "Where do wellness clubs fit?", answer: "Wellness club is a venue type rather than the whole pillar. A club may appear here when its experience is genuinely restorative, while also appearing elsewhere for recovery or performance services." },
      { question: "Are these experiences beginner-friendly?", answer: "Many are, but check whether the session is guided, private or shared and whether any preparation or health screening is required." },
    ],
  },
  {
    slug: "optimise",
    href: "/optimise",
    label: "Optimisation",
    descriptor: "Energy, sleep and everyday health routines",
    taxonomyPillar: "Longevity & Diagnostics",
    title: "Health Optimisation in London",
    metaTitle: "Health Optimisation in London | Energy, Sleep & Routines | Well+",
    description: "Discover London services focused on energy, sleep, nutrition, recovery technology and practical health optimisation routines.",
    eyebrow: "Improve how you feel and function now",
    intro: "For energy, sleep, nutrition, recovery technology and practical routines intended to support day-to-day function rather than diagnose disease.",
    serviceKeys: ["red-light", "breathwork", "recovery", "hbot", "sauna"],
    keywords: ["optimise", "optimize", "energy", "sleep", "nutrition", "red light", "recovery technology", "routine", "health optimisation"],
    popularLinks: [
      { href: "/red-light-therapy-london", label: "Red Light Therapy", description: "Light-led sessions used within recovery and optimisation routines." },
      { href: "/recovery-london", label: "Recovery Spaces", description: "Practical services that can support a repeatable wellbeing routine." },
      { href: "/stress-regulation-london", label: "Stress Regulation", description: "Breathwork and calmer practices that may support sleep and resilience." },
      { href: "/longevity", label: "Longevity Clinics", description: "Clinical screening and diagnostics for users seeking a medical health baseline." },
    ],
    guidance: [
      { title: "Start with a clear problem", text: "Optimisation is most useful when it begins with a defined goal such as sleep, energy, recovery or consistency rather than a long list of fashionable interventions." },
      { title: "Prefer repeatable routines", text: "Look for services that can realistically fit your schedule and budget and that explain how they should be used over time." },
      { title: "Know when this becomes medical", text: "If you are seeking diagnosis, disease-risk screening or interpretation of clinical results, use the Longevity & Diagnostics section or seek appropriate medical advice." },
    ],
    faqs: [
      { question: "What does Optimisation mean on Well+?", answer: "It covers non-diagnostic services and programmes focused on improving current energy, sleep, recovery and everyday function." },
      { question: "How is Optimisation different from Longevity?", answer: "Optimisation focuses on near-term habits and function. Longevity focuses on preventative health, clinical screening, diagnostics and longer-term health baselines." },
      { question: "Are optimisation services medical?", answer: "Some providers may have clinical involvement, but the pillar itself is not intended to imply diagnosis or medical treatment." },
    ],
  },
  {
    slug: "longevity",
    href: "/longevity",
    label: "Longevity & Diagnostics",
    descriptor: "Screening, testing and preventative health",
    taxonomyPillar: "Longevity & Diagnostics",
    title: "Longevity Clinics in London",
    metaTitle: "Longevity Clinics London | Screening & Diagnostics | Well+",
    description: "Compare London longevity clinics offering health screening, blood biomarkers, DEXA, VO₂ max, imaging and clinician-led preventative assessments.",
    eyebrow: "Preventative health and diagnostics",
    intro: "For health screening, blood biomarkers, DEXA, VO₂ max, medical imaging, cardiovascular assessment and clinician-led preventative health programmes.",
    serviceKeys: ["hbot", "red-light", "recovery"],
    keywords: ["longevity", "healthspan", "preventative health", "health screening", "diagnostics", "dexa", "vo2 max", "blood testing", "biomarkers", "medical imaging", "cardiovascular screening", "doctor-led", "clinician-led"],
    popularLinks: [
      { href: "/health-screening-london", label: "Health Screening", description: "Compare broader private and preventative health assessments." },
      { href: "/dexa-scan-london", label: "DEXA Scans", description: "Find providers for body composition and bone-density assessment." },
      { href: "/vo2-max-testing-london", label: "VO₂ Max Testing", description: "Compare providers measuring cardiorespiratory fitness." },
      { href: "/editorial-standards", label: "Editorial Standards", description: "How Well+ approaches evidence, uncertainty and medical-adjacent claims." },
    ],
    guidance: [
      { title: "Start with the question", text: "Choose a comprehensive health assessment for a broad baseline, or a focused service such as DEXA or VO₂ max when you have a specific measurement in mind." },
      { title: "Check who interprets the results", text: "Compare clinical oversight, whether a consultation and written report are included, and what follow-up or referral options are available." },
      { title: "Separate screening from diagnosis", text: "Private screening may identify results that need further investigation, but it does not replace appropriate diagnosis, treatment or routine NHS care." },
      { title: "Confirm the exact package", text: "Clinic packages vary substantially. Confirm which tests, consultations, reports and follow-up steps are included before booking." },
    ],
    faqs: [
      { question: "What is a longevity clinic?", answer: "On Well+, it means a provider with meaningful screening, diagnostics or clinician-led preventative health assessment rather than a venue offering general wellness treatments alone." },
      { question: "Which services fit Longevity & Diagnostics?", answer: "Health screening, blood biomarkers, DEXA, VO₂ max within a preventative-health context, medical imaging, cardiovascular assessment and clinician-led programmes." },
      { question: "Why can DEXA and VO₂ max also appear under Performance?", answer: "The same measurement can answer different questions. Performance pages frame it around fitness and training; Longevity frames it around a broader long-term health baseline." },
      { question: "Is this medical advice?", answer: "No. Well+ is a directory and editorial guide. Confirm provider credentials and seek appropriate professional advice for health concerns or medical decisions." },
    ],
  },
];

export function getPillarPage(slug: string) {
  return pillarPages.find((pillar) => pillar.slug === slug);
}

function isIndexableFacility(facility: AirtableFacility) {
  return facility.indexable === true && facility.publishStatus === "Published" && isUsefulValue(facility.slug);
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
