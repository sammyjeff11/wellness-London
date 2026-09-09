import type { AirtableFacility, ServiceKey } from "@/lib/airtable";

export type ActivitySlug =
  | "sauna-london"
  | "infrared-sauna-london"
  | "cold-plunge-london"
  | "contrast-therapy-london"
  | "cryotherapy-london"
  | "red-light-therapy-london"
  | "hbot-london";

export type ActivityEvidenceNote = { title: string; text: string };

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
  bestFor: { title: string; text: string }[];
  evidenceNotes?: ActivityEvidenceNote[];
  whatToExpect: { title: string; text: string }[];
  guidance: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
};

const evidenceNotesBySlug: Partial<
  Record<ActivitySlug, ActivityEvidenceNote[]>
> = {
  "sauna-london": [
    {
      title: "Heat and timing",
      text: "Ask which sauna type you are booking, the operating temperature and whether your slot includes changing and cooling-down time.",
    },
    {
      title: "Shared or private",
      text: "Check whether the room is communal, reserved for your group or part of a members-only facility.",
    },
    {
      title: "Inclusions",
      text: "Confirm towels, showers and any cold-water facilities. A sauna listing does not mean an ice bath is included.",
    },
  ],
  "infrared-sauna-london": [
    {
      title: "Cabin details",
      text: "Ask about the cabin temperature, booking duration and maximum occupancy.",
    },
    {
      title: "Privacy",
      text: "Confirm exclusive use of the cabin. Infrared equipment does not establish whether a session is private or quiet.",
    },
    {
      title: "Health claims",
      text: "A service listing confirms availability, not a health outcome. Ask the provider for evidence for the particular benefit and device being advertised.",
    },
  ],
  "cold-plunge-london": [
    {
      title: "Water and facilities",
      text: "Ask about water temperature, cleaning procedures, changing facilities and whether a shower is required before entry.",
    },
    {
      title: "Guidance",
      text: "Check whether staff lead the session or you use the facilities independently, and what screening is required.",
    },
    {
      title: "Booking scope",
      text: "Confirm whether the ticket covers the plunge alone or includes sauna access. Check the total booking duration rather than assuming it is time in the water.",
    },
  ],
  "contrast-therapy-london": [
    {
      title: "Facilities included",
      text: "Confirm which heat and cold facilities are included in the same booking.",
    },
    {
      title: "Session format",
      text: "Check whether it is a led class or self-directed access, and whether time limits apply to individual facilities.",
    },
    {
      title: "Total cost",
      text: "Compare the full booking price, duration and included facilities. Do not compare a concession or introductory rate with an unrestricted session.",
    },
  ],
  "cryotherapy-london": [
    {
      title: "Treatment type",
      text: "Ask whether the advertised booking is whole-body, localised or facial cryotherapy. These are different services.",
    },
    {
      title: "Appointment details",
      text: "Check exposure time, total appointment length, protective clothing and staff supervision.",
    },
    {
      title: "Health claims",
      text: "Ask for evidence specific to the treatment and outcome advertised. A provider offering cryotherapy does not establish that it treats a medical condition.",
    },
  ],
  "red-light-therapy-london": [
    {
      title: "Equipment",
      text: "Ask for the device name, wavelength, treatment area and exposure time.",
    },
    {
      title: "Booking details",
      text: "Check whether you are booking a panel, bed or room and whether the price is for one session or a package.",
    },
    {
      title: "Evidence for a claim",
      text: "Ask which research supports the particular device, dose and outcome advertised. A general reference to light therapy does not establish that this session provides that benefit.",
    },
  ],
  "hbot-london": [
    {
      title: "Chamber and protocol",
      text: "Ask which chamber is used, the operating pressure, oxygen-delivery method and session duration.",
    },
    {
      title: "Assessment and supervision",
      text: "Confirm who assesses suitability, who supervises the session and whether a consultation is required.",
    },
    {
      title: "Full cost",
      text: "Ask whether the quoted price includes assessment and how many sessions are being proposed. Request the reason and supporting evidence before buying a course.",
    },
  ],
};

function withEvidenceNotes(
  activity: Omit<ActivityPageConfig, "evidenceNotes">,
): ActivityPageConfig {
  return {
    ...activity,
    bestFor: [],
    evidenceNotes: evidenceNotesBySlug[activity.slug],
  };
}

export const activityPages: ActivityPageConfig[] = [
  withEvidenceNotes({
    slug: "sauna-london",
    href: "/sauna-london",
    canonicalHref: "/sauna-london",
    label: "Sauna",
    title: "Sauna in London",
    metaTitle: "Sauna in London | Well+ Activity Guide",
    description:
      "Compare London sauna venues by heat type, privacy, access, facilities and whether cold-water recovery is included.",
    eyebrow: "Heat therapy",
    heroText:
      "Traditional, communal and private sauna venues, with the practical details that change the visit.",
    activityLabels: ["Sauna"],
    serviceKeys: ["sauna"],
    keywords: ["sauna", "finnish", "heat therapy", "heat exposure"],
    related: [
      {
        href: "/infrared-sauna-london",
        label: "Infrared Sauna",
        text: "Compare infrared sauna bookings by cabin type, session length and access.",
      },
      {
        href: "/cold-plunge-london",
        label: "Cold Plunge",
        text: "Cold-water venues that pair naturally with sauna routines.",
      },
      {
        href: "/contrast-therapy-london",
        label: "Contrast Therapy",
        text: "Spaces combining heat and cold in one structured recovery ritual.",
      },
      {
        href: "/collections/best-sauna-london",
        label: "Best saunas in London",
        text: "Compare sauna venues by setting, access and facilities.",
      },
      {
        href: "/collections/best-recovery-clubs-london",
        label: "Best recovery clubs in London",
        text: "Recovery clubs that often combine sauna with cold and equipment-led services.",
      },
    ],
    bestFor: [],
    whatToExpect: [
      {
        title: "A defined heat session",
        text: "Sessions usually revolve around timed heat exposure, with intensity varying by sauna type and venue style.",
      },
      {
        title: "Cooling and changing",
        text: "Check whether cooling areas, showers, towels and changing rooms are included.",
      },
      {
        title: "Different access models",
        text: "Expect everything from drop-in community sessions to private bookings, memberships and premium club access.",
      },
    ],
    guidance: [
      {
        title: "Check the heat format",
        text: "Check the heating method and room occupancy separately; they describe different parts of the booking.",
      },
      {
        title: "Look for practical facilities",
        text: "Showers, towels, changing rooms and cooling areas shape the visit as much as the sauna itself.",
      },
      {
        title: "Choose the right atmosphere",
        text: "Check the session listing for private hire, group classes, social events or quiet-session rules.",
      },
    ],
    faqs: [
      {
        question: "Where can I find sauna in London?",
        answer:
          "London has communal sauna baths, premium bathhouses, recovery studios and wellness clubs offering sauna access. Use the directory to compare format, location and facilities.",
      },
      {
        question: "Is sauna usually private or shared?",
        answer:
          "Both exist. Community sauna and bathhouse formats are usually shared, while some wellness studios offer private or semi-private sauna sessions.",
      },
    ],
  }),
  withEvidenceNotes({
    slug: "infrared-sauna-london",
    href: "/infrared-sauna-london",
    canonicalHref: "/infrared-sauna-london",
    label: "Infrared Sauna",
    title: "Infrared Sauna in London",
    metaTitle: "Infrared Sauna in London | Well+ Activity Guide",
    description:
      "Compare London infrared sauna venues by cabin type, privacy, session length, facilities and access.",
    eyebrow: "Gentle heat",
    heroText:
      "Lower-temperature sauna sessions, often in private or semi-private cabins.",
    activityLabels: ["Infrared Sauna"],
    serviceKeys: [],
    keywords: ["infrared sauna", "infrared"],
    related: [
      {
        href: "/sauna-london",
        label: "Sauna",
        text: "Compare infrared with traditional and communal sauna experiences.",
      },
      {
        href: "/red-light-therapy-london",
        label: "Red Light Therapy",
        text: "A separate light-based service offered by some of the same recovery studios.",
      },
    ],
    bestFor: [],
    whatToExpect: [
      {
        title: "Lower-intensity heat",
        text: "The cabin temperature, session length and occupancy depend on the venue.",
      },
      {
        title: "Studio-style booking",
        text: "Many venues offer timed cabin sessions with towels, showers or add-on recovery services.",
      },
      {
        title: "Premium variation",
        text: "Check the cabin capacity and whether showers and changing facilities are included.",
      },
    ],
    guidance: [
      {
        title: "Check whether it is private",
        text: "Infrared sauna is often offered as a private or semi-private room, but access models vary.",
      },
      {
        title: "Compare what is included",
        text: "Look for session length, towel policy, shower access and whether other recovery services are available.",
      },
      {
        title: "Think about repeat use",
        text: "Infrared sauna is often chosen as part of a routine, so location and price matter.",
      },
    ],
    faqs: [
      {
        question: "What is infrared sauna?",
        answer:
          "Infrared sauna uses infrared emitters as its heat source. Check the cabin specifications, temperature and session length with the provider.",
      },
      {
        question: "Where can I book infrared sauna in London?",
        answer:
          "Infrared sauna is commonly found in wellness clubs, recovery studios and some spas. Compare facilities and access before booking.",
      },
    ],
  }),
  withEvidenceNotes({
    slug: "cold-plunge-london",
    href: "/cold-plunge-london",
    canonicalHref: "/cold-plunge-london",
    label: "Cold Plunge",
    title: "Cold Plunge & Ice Bath in London",
    metaTitle: "Cold Plunge & Ice Bath in London | Cold Therapy | Well+",
    description:
      "Find London cold plunge, ice bath and cold therapy venues, including standalone ice baths and sauna-and-plunge contrast therapy spaces.",
    eyebrow: "Cold therapy",
    heroText:
      "Ice baths, cold plunges, cold tubs and cold-water recovery spaces across London.",
    activityLabels: [
      "Cold Plunge",
      "Ice Bath",
      "Ice Bath & Cold Plunge",
      "Cold Therapy",
      "Cold Water Immersion",
    ],
    serviceKeys: ["cold-plunge"],
    keywords: [
      "cold plunge",
      "ice bath",
      "ice baths",
      "cold therapy",
      "cold water therapy",
      "cold exposure",
      "cold water",
      "cold water immersion",
      "plunge pool",
      "cold tub",
    ],
    related: [
      {
        href: "/sauna-london",
        label: "Sauna",
        text: "Heat-led spaces that often pair with ice baths and cold plunge.",
      },
      {
        href: "/contrast-therapy-london",
        label: "Contrast Therapy",
        text: "Sauna and ice bath or cold plunge together in one hot-and-cold recovery ritual.",
      },
      {
        href: "/cryotherapy-london",
        label: "Cryotherapy",
        text: "A different cold-therapy format using cold air rather than water immersion.",
      },
      {
        href: "/collections/best-cold-plunge-london",
        label: "Best cold plunges in London",
        text: "Compare cold plunge, ice bath and contrast therapy venues.",
      },
      {
        href: "/collections/best-recovery-clubs-london",
        label: "Best recovery clubs in London",
        text: "Broader recovery spaces for post-training routines.",
      },
    ],
    bestFor: [],
    whatToExpect: [
      {
        title: "Same format, different names",
        text: "Cold plunge, ice bath, cold tub, plunge pool and cold-water immersion often describe similar cold-water recovery experiences.",
      },
      {
        title: "Very cold water",
        text: "Expect a short, intense immersion rather than a long spa soak; session rules and water temperature vary by venue.",
      },
      {
        title: "Sauna-plus contrast therapy",
        text: "Some venues let you move between sauna and ice bath or cold plunge. That hot-and-cold sequence is usually described as contrast therapy.",
      },
    ],
    guidance: [
      {
        title: "Check the terminology",
        text: "One venue may say ice bath, another may say cold plunge, cold tub, plunge pool or cold therapy. Confirm it is cold-water immersion if that is what you want.",
      },
      {
        title: "Know whether sauna is included",
        text: "Some venues are cold plunge only, while others are designed for full contrast therapy with sauna, plunge and recovery space.",
      },
      {
        title: "Guided or self-led",
        text: "First-timers may prefer guided cold exposure, while experienced users may want flexible access and clear timing rules.",
      },
    ],
    faqs: [
      {
        question: "Is an ice bath the same as a cold plunge?",
        answer:
          "Usually, yes. In London wellness venues, ice bath, cold plunge, cold tub, plunge pool and cold-water immersion often refer to a similar cold-water recovery experience. Exact setup, temperature and supervision vary by venue.",
      },
      {
        question: "Can I use an ice bath with a sauna for contrast therapy?",
        answer:
          "Yes. Many contrast therapy sessions involve alternating sauna or heat exposure with an ice bath or cold plunge. Look for venues that clearly include both sauna and cold-water access.",
      },
      {
        question: "Is cold plunge the same as cryotherapy?",
        answer:
          "No. Cold plunge usually means cold-water immersion, while cryotherapy uses cold air or localised cold treatments.",
      },
    ],
  }),
  withEvidenceNotes({
    slug: "contrast-therapy-london",
    href: "/contrast-therapy-london",
    canonicalHref: "/contrast-therapy-london",
    label: "Contrast Therapy",
    title: "Contrast Therapy in London",
    metaTitle: "Contrast Therapy in London | Well+ Activity Guide",
    description:
      "Find London venues combining sauna and cold plunge for structured hot-and-cold recovery rituals.",
    eyebrow: "Hot and cold",
    heroText:
      "Spaces built around moving between heat and cold in one structured recovery session.",
    activityLabels: ["Contrast Therapy", "Sauna & Cold Plunge"],
    serviceKeys: [],
    keywords: [
      "contrast therapy",
      "sauna and cold plunge",
      "sauna & cold plunge",
      "sauna and plunge",
      "sauna & plunge",
      "hot and cold",
    ],
    related: [
      {
        href: "/sauna-london",
        label: "Sauna",
        text: "Heat-led spaces across London.",
      },
      {
        href: "/cold-plunge-london",
        label: "Cold Plunge",
        text: "Cold-water recovery spaces and ice baths.",
      },
      {
        href: "/collections/best-sauna-london",
        label: "Best saunas in London",
        text: "Compare heat-led venues across London.",
      },
      {
        href: "/collections/best-cold-plunge-london",
        label: "Best cold plunges in London",
        text: "Compare cold plunge and contrast therapy venues.",
      },
    ],
    bestFor: [],
    whatToExpect: [
      {
        title: "Alternating heat and cold",
        text: "Most sessions move between sauna or heat exposure and cold plunge or ice bath.",
      },
      {
        title: "A clear flow matters",
        text: "Look for a venue where the physical layout makes transitions easy and unhurried.",
      },
      {
        title: "Session pacing",
        text: "Venues may suggest rounds, timings or guided protocols; follow the provider’s own safety guidance.",
      },
    ],
    guidance: [
      {
        title: "Look for purpose-built flow",
        text: "Check where the sauna, cold plunge and rest areas are located and whether they are included in one booking.",
      },
      {
        title: "Check if sessions are guided",
        text: "Guided formats can be helpful for first-timers and group experiences.",
      },
      {
        title: "Avoid assuming every sauna has plunge",
        text: "Some venues offer sauna only, so confirm cold-water access before booking.",
      },
    ],
    faqs: [
      {
        question: "What is contrast therapy?",
        answer:
          "Contrast therapy usually combines heat and cold, often sauna followed by cold plunge or ice bath exposure.",
      },
      {
        question: "Where can I do sauna and cold plunge in London?",
        answer:
          "London has recovery studios, bathhouses and community sauna venues offering heat-and-cold formats. Compare facilities before booking.",
      },
    ],
  }),
  withEvidenceNotes({
    slug: "cryotherapy-london",
    href: "/cryotherapy-london",
    canonicalHref: "/cryotherapy-london",
    label: "Cryotherapy",
    title: "Cryotherapy in London",
    metaTitle: "Cryotherapy in London | Well+ Activity Guide",
    description:
      "Compare London cryotherapy venues, including whole-body and recovery-studio cold therapy options.",
    eyebrow: "Cold air therapy",
    heroText:
      "Short, structured cold-therapy sessions across specialist studios and recovery spaces.",
    activityLabels: ["Cryotherapy"],
    serviceKeys: ["cryotherapy"],
    keywords: [
      "cryotherapy",
      "cryo",
      "whole body cryotherapy",
      "localised cryotherapy",
    ],
    related: [
      {
        href: "/cold-plunge-london",
        label: "Cold Plunge",
        text: "Compare cryotherapy with cold-water immersion.",
      },
      {
        href: "/red-light-therapy-london",
        label: "Red Light Therapy",
        text: "Another recovery technology often offered in premium wellness spaces.",
      },
      {
        href: "/collections/best-recovery-clubs-london",
        label: "Best recovery clubs in London",
        text: "Compare recovery clubs and studios across London.",
      },
    ],
    bestFor: [],
    whatToExpect: [
      {
        title: "A brief treatment window",
        text: "Cryotherapy sessions are usually short and protocol-led, with guidance before the exposure.",
      },
      {
        title: "Whole-body or localised options",
        text: "Confirm whether the venue uses a chamber, cabin, facial or targeted local treatment.",
      },
      {
        title: "Contraindication checks",
        text: "Good providers should explain suitability, safety and when medical advice is needed.",
      },
    ],
    guidance: [
      {
        title: "Understand the treatment type",
        text: "Check whether the venue offers whole-body, localised or other cold-treatment formats.",
      },
      {
        title: "Prioritise staff guidance",
        text: "Clear safety briefing and contraindication checks matter for first-time users.",
      },
      {
        title: "Compare wider facilities",
        text: "Some cryotherapy venues also offer compression, red light or other recovery services.",
      },
    ],
    faqs: [
      {
        question: "Where can I find cryotherapy in London?",
        answer:
          "Cryotherapy is offered by specialist studios, recovery venues and some premium wellness clinics across London.",
      },
      {
        question: "Is cryotherapy the same as cold plunge?",
        answer:
          "No. Cryotherapy usually uses cold air or targeted cold treatment, while cold plunge involves cold-water immersion.",
      },
    ],
  }),
  withEvidenceNotes({
    slug: "red-light-therapy-london",
    href: "/red-light-therapy-london",
    canonicalHref: "/red-light-therapy-london",
    label: "Red Light Therapy",
    title: "Red Light Therapy in London",
    metaTitle: "Red Light Therapy in London | Well+ Activity Guide",
    description:
      "Find London wellness venues offering red light therapy and related recovery or longevity treatments.",
    eyebrow: "Light therapy",
    heroText:
      "Technology-led wellness sessions found in recovery studios, longevity clinics and premium wellness clubs.",
    activityLabels: ["Red Light Therapy"],
    serviceKeys: ["red-light"],
    keywords: ["red light", "red light therapy", "photobiomodulation"],
    related: [
      {
        href: "/hbot-london",
        label: "HBOT",
        text: "Compare hyperbaric oxygen providers by chamber, protocol and supervision.",
      },
      {
        href: "/longevity",
        label: "Longevity",
        text: "Compare clinics offering published diagnostic tests and assessments.",
      },
      {
        href: "/collections/best-recovery-clubs-london",
        label: "Best recovery clubs in London",
        text: "Compare recovery clubs offering equipment-led treatments.",
      },
    ],
    bestFor: [],
    whatToExpect: [
      {
        title: "Panel, bed or room formats",
        text: "Setups vary widely, so compare equipment, privacy and how the session is supervised.",
      },
      {
        title: "Clear claim boundaries",
        text: "Treat strong medical claims carefully and check credentials where a provider positions treatment clinically.",
      },
      {
        title: "Repeat-use packages",
        text: "Many venues sell packs or memberships because light therapy is often marketed as a routine.",
      },
    ],
    guidance: [
      {
        title: "Check the setup",
        text: "Venues vary from simple panels to dedicated treatment rooms or clinic-led protocols.",
      },
      {
        title: "Be cautious with claims",
        text: "Check who provides the service and ask for evidence for any health outcome being advertised.",
      },
      {
        title: "Look for related services",
        text: "Red light often sits alongside infrared sauna, HBOT, cryotherapy or diagnostics.",
      },
    ],
    faqs: [
      {
        question: "Where can I find red light therapy in London?",
        answer:
          "Red light therapy is available in some recovery studios, longevity clinics and premium wellness clubs.",
      },
      {
        question: "Is red light therapy medical treatment?",
        answer:
          "Well+ does not provide medical advice. Check provider credentials and seek professional guidance for medical concerns.",
      },
    ],
  }),
  withEvidenceNotes({
    slug: "hbot-london",
    href: "/hbot-london",
    canonicalHref: "/hbot-london",
    label: "HBOT",
    title: "HBOT in London",
    metaTitle: "HBOT in London | Hyperbaric Oxygen Therapy | Well+",
    description:
      "Explore London venues offering hyperbaric oxygen therapy within longevity, recovery and medical-wellness settings.",
    eyebrow: "Hyperbaric oxygen",
    heroText:
      "Hyperbaric oxygen therapy options across London longevity and recovery clinics.",
    activityLabels: ["Hyperbaric Oxygen Therapy", "HBOT"],
    serviceKeys: ["hbot"],
    keywords: ["hbot", "hyperbaric", "hyperbaric oxygen therapy"],
    related: [
      {
        href: "/red-light-therapy-london",
        label: "Red Light Therapy",
        text: "Another technology-led wellness activity found in longevity spaces.",
      },
      {
        href: "/longevity",
        label: "Longevity",
        text: "Explore longevity clinics and preventative wellness spaces.",
      },
      {
        href: "/collections/best-recovery-clubs-london",
        label: "Best recovery clubs in London",
        text: "Compare recovery clubs offering oxygen, light and cold services.",
      },
    ],
    bestFor: [],
    whatToExpect: [
      {
        title: "A chamber-based session",
        text: "HBOT is delivered in a pressurised chamber or pod, usually with a defined session length.",
      },
      {
        title: "More screening than casual wellness",
        text: "Expect suitability questions, safety information and clearer contraindication guidance.",
      },
      {
        title: "Packages and protocols",
        text: "Providers often recommend a course of sessions, so compare the full package rather than one price point.",
      },
    ],
    guidance: [
      {
        title: "Check the access model",
        text: "HBOT is often offered in clinic or consultation-led settings rather than casual walk-in formats.",
      },
      {
        title: "Review credentials",
        text: "Because HBOT is more medical-adjacent, venue credentials and safety information matter.",
      },
      {
        title: "Understand the package",
        text: "Check session length, number of sessions, pricing and whether a consultation is required.",
      },
    ],
    faqs: [
      {
        question: "Where can I find HBOT in London?",
        answer:
          "HBOT is usually found in longevity clinics, medical-wellness spaces and specialist recovery venues.",
      },
      {
        question: "What should I check before booking HBOT?",
        answer:
          "Ask who assesses suitability, what protocol is proposed, who supervises treatment and what the full course costs.",
      },
    ],
  }),
];

export function getActivityPage(slug: string) {
  return activityPages.find((page) => page.slug === slug);
}

function matchesActivityLabel(
  facility: AirtableFacility,
  activity: ActivityPageConfig,
) {
  const searchableLabels = [
    ...facility.activityTagsStandardized,
    ...facility.activityDisplayLabels,
    ...facility.servicesOffered,
  ].map((item) => item.toLowerCase());

  return activity.activityLabels.some((label) =>
    searchableLabels.some((item) => item.includes(label.toLowerCase())),
  );
}

function matchesStructuredActivityField(
  facility: AirtableFacility,
  activity: ActivityPageConfig,
) {
  const structuredValues = [
    ...facility.serviceKeys,
    ...facility.servicesOffered,
    ...facility.activityTagsStandardized,
    ...facility.activityDisplayLabels,
    ...facility.activityCategories,
    ...facility.saunaType,
    facility.coldPlungeType,
    facility.cryoType,
    facility.contrastTherapyAvailable,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return activity.keywords.some((keyword) =>
    structuredValues.includes(keyword.toLowerCase()),
  );
}

export function getFacilitiesForActivity(
  facilities: AirtableFacility[],
  activity: ActivityPageConfig,
) {
  return facilities
    .filter((facility) => {
      const serviceMatch = facility.serviceKeys.some((key) =>
        activity.serviceKeys.includes(key),
      );
      return (
        serviceMatch ||
        matchesActivityLabel(facility, activity) ||
        matchesStructuredActivityField(facility, activity)
      );
    })
    .sort((a, b) => b.profileCompletenessScore - a.profileCompletenessScore);
}
