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

const evidenceNotesBySlug: Partial<Record<ActivitySlug, ActivityEvidenceNote[]>> = {
  "sauna-london": [
    { title: "What it does", text: "Sauna is deliberate heat stress. Body temperature, heart rate and sweating rise, which is why sauna can feel closer to light cardiovascular work than passive relaxation." },
    { title: "Best-supported benefits", text: "The strongest evidence is around regular sauna use, cardiovascular markers and relaxation. It is most useful as a consistent heat habit rather than an occasional extreme session." },
    { title: "How to use it well", text: "Start with tolerable heat and shorter sessions, cool down properly and rehydrate. Consistency, comfort and recovery matter more than chasing the hottest room." },
    { title: "What to be careful about", text: "Avoid sauna when dehydrated, unwell or after heavy alcohol. If you have cardiovascular concerns, pregnancy or relevant medical conditions, check suitability before using high heat." },
  ],
  "infrared-sauna-london": [
    { title: "What it does", text: "Infrared sauna uses infrared emitters to heat the body more directly, usually at a lower air temperature than traditional sauna. It can feel gentler, but it is still heat exposure." },
    { title: "Best-supported benefits", text: "Users often choose infrared for relaxation, sweating and lower-intensity heat tolerance. The broader sauna evidence base does not automatically apply to every infrared setup." },
    { title: "How to use it well", text: "Compare session length, cabin temperature, privacy, shower access and whether the venue explains the protocol. Repeatable moderate sessions are more sensible than pushing discomfort." },
    { title: "What to be careful about", text: "Be cautious when venues make strong detox or medical claims. Device quality, heat level and actual session protocol matter more than the word infrared alone." },
  ],
  "cold-plunge-london": [
    { title: "What it does", text: "Cold plunge creates acute cold stress. Blood vessels constrict, breathing changes and the nervous system is stimulated, which can make users feel alert and reset afterwards." },
    { title: "Best-supported benefits", text: "Cold water immersion may reduce perceived soreness and help people feel fresher after intense sessions. The benefit is often subjective recovery rather than guaranteed performance improvement." },
    { title: "How to use it well", text: "Start short, breathe slowly and leave before you feel unsafe. Use guided sessions if you are new, and make sure there is a warm, calm recovery space afterwards." },
    { title: "Training timing", text: "If muscle growth is the priority, avoid cold plunging immediately after resistance training. Some research suggests cold immersion can blunt parts of the adaptation signal." },
  ],
  "contrast-therapy-london": [
    { title: "What it does", text: "Contrast therapy alternates heat and cold stress. The experience changes circulation, breathing and perceived recovery while giving the body clear transitions between activation and calm." },
    { title: "Best-supported benefits", text: "The strongest value is often practical: structured recovery, soreness management and a repeatable ritual. Evidence varies depending on timings, temperatures and user goals." },
    { title: "How to use it well", text: "Choose venues with a clear flow between sauna, plunge, showers and rest space. Good guidance on rounds and timings is more useful than simply having hot and cold equipment." },
    { title: "Training timing", text: "For strength or hypertrophy goals, be cautious with long cold exposure straight after lifting, even when it is part of a contrast circuit." },
  ],
  "cryotherapy-london": [
    { title: "What it does", text: "Cryotherapy uses cold air or localised cold treatment rather than immersion. Sessions are brief and usually staff-led, which makes the format faster than cold-water exposure." },
    { title: "Best-supported benefits", text: "Some users report reduced soreness or feeling more refreshed, but evidence is mixed and depends on the protocol, outcome measured and treatment type." },
    { title: "How to use it well", text: "Ask whether the session is whole-body, localised or facial cryotherapy. Check duration, temperature, staff supervision and whether contraindications are explained clearly." },
    { title: "What to be careful about", text: "Treat dramatic claims around inflammation, performance or medical outcomes cautiously. Provider screening and clear safety guidance matter more than extreme cold numbers." },
  ],
  "red-light-therapy-london": [
    { title: "What it does", text: "Red and near-infrared light are used for photobiomodulation: light exposure intended to influence cellular processes linked to energy production, inflammation signalling and tissue repair." },
    { title: "Best-supported benefits", text: "Research is strongest around specific uses such as pain, inflammation, skin quality and tissue recovery. Results vary heavily by device, body area and protocol." },
    { title: "How to use it well", text: "Ask about wavelength, treatment time, distance from the device and whether the session targets a specific goal. Consistent dosing matters more than a premium-looking room." },
    { title: "What to be careful about", text: "Be cautious with vague detox, fat-loss or dramatic anti-ageing claims. Avoid assuming every panel, bed or room delivers the same dose or evidence-backed effect." },
  ],
  "hbot-london": [
    { title: "What it does", text: "HBOT involves breathing oxygen in a pressurised chamber. Pressure and oxygen exposure are the key variables, so chamber type and protocol matter." },
    { title: "Best-supported benefits", text: "HBOT is recognised for specific medical uses, but many wellness, recovery and longevity claims go beyond the strongest evidence. Treat it as medical-adjacent, not casual spa technology." },
    { title: "How to use it well", text: "Compare pressure level, session length, number of sessions, chamber type, supervision and whether a consultation is required before booking." },
    { title: "What to be careful about", text: "Look for proper screening, staff training and clear contraindication guidance. Be cautious where providers sell large packages without explaining suitability or expected outcomes." },
  ],
};

function withEvidenceNotes(activity: Omit<ActivityPageConfig, "evidenceNotes">): ActivityPageConfig {
  return { ...activity, evidenceNotes: evidenceNotesBySlug[activity.slug] };
}

export const activityPages: ActivityPageConfig[] = [
  withEvidenceNotes({
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
      { href: "/collections/best-sauna-london", label: "Best Sauna London", text: "Curated best-of sauna options across London." },
      { href: "/collections/best-recovery-clubs-london", label: "Best Recovery Clubs London", text: "Recovery clubs that often combine sauna with cold and technology-led recovery." },
    ],
    bestFor: [
      { title: "Heat-led recovery", text: "Useful when you want a simple, repeatable recovery ritual after training or a demanding week." },
      { title: "Social or solo reset", text: "London has communal sauna culture as well as quieter private rooms, so choose by atmosphere." },
      { title: "Sauna-plus routines", text: "A strong starting point if you also want cold plunge, breathwork or a bathhouse-style circuit." },
    ],
    whatToExpect: [
      { title: "A defined heat session", text: "Sessions usually revolve around timed heat exposure, with intensity varying by sauna type and venue style." },
      { title: "Cooling and changing", text: "The better venues make the cool-down, showers, towels and changing areas feel considered." },
      { title: "Different access models", text: "Expect everything from drop-in community sessions to private bookings, memberships and premium club access." },
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
  }),
  withEvidenceNotes({
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
    serviceKeys: [],
    keywords: ["infrared sauna", "infrared"],
    related: [
      { href: "/sauna-london", label: "Sauna", text: "Compare infrared with traditional and communal sauna experiences." },
      { href: "/red-light-therapy-london", label: "Red Light Therapy", text: "Another technology-led wellness activity often found in premium studios." },
    ],
    bestFor: [
      { title: "Private heat rituals", text: "Best when you want a calmer room, often solo or couple-friendly rather than communal." },
      { title: "Gentler sauna entry", text: "A good format for people who find traditional sauna too intense, while still wanting a heat-led reset." },
      { title: "Routine-led wellness", text: "Works well if location, packages and repeat bookings matter more than a one-off spa day." },
    ],
    whatToExpect: [
      { title: "Lower-intensity heat", text: "Infrared sessions are typically positioned as gentler and more private than traditional sauna." },
      { title: "Studio-style booking", text: "Many venues offer timed cabin sessions with towels, showers or add-on recovery services." },
      { title: "Premium variation", text: "The experience can range from simple cabins to design-led suites inside wellness clubs." },
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
  }),
  withEvidenceNotes({
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
      { href: "/collections/best-cold-plunge-london", label: "Best Cold Plunge London", text: "Curated cold plunge, ice bath and contrast therapy venues." },
      { href: "/collections/best-recovery-clubs-london", label: "Best Recovery Clubs London", text: "Broader recovery spaces for post-training routines." },
    ],
    bestFor: [
      { title: "Cold exposure beginners", text: "Choose venues with clear staff guidance, short first dips and somewhere warm to recover afterwards." },
      { title: "Post-training recovery", text: "Cold plunge is often used by people looking for a structured recovery stop after sport or gym sessions." },
      { title: "Heat-and-cold rituals", text: "Best suited to venues that pair plunge access with sauna, showers and calm transition space." },
    ],
    whatToExpect: [
      { title: "Very cold water", text: "Expect a short, intense immersion rather than a long spa soak; session rules vary by venue." },
      { title: "Safety briefing", text: "Good providers explain entry, breathing, timing and when to stop, especially for first-timers." },
      { title: "Recovery afterwards", text: "Warm-up space, towels, showers and pacing can define how comfortable the overall visit feels." },
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
  }),
  withEvidenceNotes({
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
    serviceKeys: [],
    keywords: ["contrast therapy", "sauna and cold plunge", "sauna & cold plunge", "sauna and plunge", "sauna & plunge", "hot and cold"],
    related: [
      { href: "/sauna-london", label: "Sauna", text: "Heat-led spaces across London." },
      { href: "/cold-plunge-london", label: "Cold Plunge", text: "Cold-water recovery spaces and ice baths." },
      { href: "/collections/best-sauna-london", label: "Best Sauna London", text: "Curated heat-led spaces across London." },
      { href: "/collections/best-cold-plunge-london", label: "Best Cold Plunge London", text: "Curated cold plunge and contrast therapy venues." },
    ],
    bestFor: [
      { title: "Full recovery circuits", text: "Best when you want heat, cold and decompression in one purposeful visit." },
      { title: "Guided first sessions", text: "A structured format can make hot-and-cold exposure feel less intimidating for new users." },
      { title: "Group rituals", text: "Many contrast spaces work well for social sessions, classes or community-led reset rituals." },
    ],
    whatToExpect: [
      { title: "Alternating heat and cold", text: "Most sessions move between sauna or heat exposure and cold plunge or ice bath." },
      { title: "A clear flow matters", text: "Look for a venue where the physical layout makes transitions easy and unhurried." },
      { title: "Session pacing", text: "Venues may suggest rounds, timings or guided protocols; follow the provider’s own safety guidance." },
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
  }),
  withEvidenceNotes({
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
      { href: "/collections/best-recovery-clubs-london", label: "Best Recovery Clubs London", text: "Curated recovery clubs and studios across London." },
    ],
    bestFor: [
      { title: "Time-efficient cold therapy", text: "Often chosen when you want a short, staff-led cold treatment rather than water immersion." },
      { title: "Recovery studio users", text: "Fits well alongside compression, red light or other appointment-led recovery services." },
      { title: "Cold plunge alternatives", text: "Useful for people comparing cold exposure formats without committing to an ice bath." },
    ],
    whatToExpect: [
      { title: "A brief treatment window", text: "Cryotherapy sessions are usually short and protocol-led, with guidance before the exposure." },
      { title: "Whole-body or localised options", text: "Confirm whether the venue uses a chamber, cabin, facial or targeted local treatment." },
      { title: "Contraindication checks", text: "Good providers should explain suitability, safety and when medical advice is needed." },
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
  }),
  withEvidenceNotes({
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
      { href: "/collections/best-recovery-clubs-london", label: "Best Recovery Clubs London", text: "Curated recovery clubs with technology-led treatments." },
    ],
    bestFor: [
      { title: "Technology-led recovery", text: "Best for users comparing non-invasive, appointment-led wellness technologies." },
      { title: "Longevity routines", text: "Often found in clinics and clubs that package light therapy with broader optimisation services." },
      { title: "Add-on sessions", text: "Works well as part of a wider visit that may include sauna, compression or consultation-led care." },
    ],
    whatToExpect: [
      { title: "Panel, bed or room formats", text: "Setups vary widely, so compare equipment, privacy and how the session is supervised." },
      { title: "Clear claim boundaries", text: "Treat strong medical claims carefully and check credentials where a provider positions treatment clinically." },
      { title: "Repeat-use packages", text: "Many venues sell packs or memberships because light therapy is often marketed as a routine." },
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
  }),
  withEvidenceNotes({
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
      { href: "/collections/best-recovery-clubs-london", label: "Best Recovery Clubs London", text: "Curated recovery clubs with oxygen, light and cold technologies." },
    ],
    bestFor: [
      { title: "Clinic-led wellness", text: "Best for users comfortable with a more specialist, consultation-led environment." },
      { title: "Longevity and recovery plans", text: "Often considered alongside diagnostics, red light therapy or wider optimisation programmes." },
      { title: "Research-led decision makers", text: "Suited to users who want to compare credentials, protocols and provider transparency before booking." },
    ],
    whatToExpect: [
      { title: "A chamber-based session", text: "HBOT is delivered in a pressurised chamber or pod, usually with a defined session length." },
      { title: "More screening than casual wellness", text: "Expect suitability questions, safety information and clearer contraindication guidance." },
      { title: "Packages and protocols", text: "Providers often recommend a course of sessions, so compare the full package rather than one price point." },
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
  }),
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

function matchesStructuredActivityField(facility: AirtableFacility, activity: ActivityPageConfig) {
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

  return activity.keywords.some((keyword) => structuredValues.includes(keyword.toLowerCase()));
}

export function getFacilitiesForActivity(facilities: AirtableFacility[], activity: ActivityPageConfig) {
  return facilities
    .filter((facility) => {
      const serviceMatch = facility.serviceKeys.some((key) => activity.serviceKeys.includes(key));
      return serviceMatch || matchesActivityLabel(facility, activity) || matchesStructuredActivityField(facility, activity);
    })
    .sort((a, b) => Number(b.isFeatured) * 100 + b.profileCompletenessScore - (Number(a.isFeatured) * 100 + a.profileCompletenessScore));
}
