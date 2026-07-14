import type { AirtableFacility } from "@/lib/airtable";

export type LongevityServiceSlug = "dexa-scan-london" | "vo2-max-testing-london" | "health-screening-london";

export type LongevityServicePageConfig = {
  slug: LongevityServiceSlug;
  href: string;
  label: string;
  title: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  heroText: string;
  matchTerms: string[];
  bestFor: { title: string; text: string }[];
  evidenceNotes: { title: string; text: string }[];
  whatToExpect: { title: string; text: string }[];
  guidance: { title: string; text: string }[];
  related: { href: string; label: string; text: string }[];
  faqs: { question: string; answer: string }[];
};

export const longevityServicePages: LongevityServicePageConfig[] = [
  {
    slug: "dexa-scan-london",
    href: "/dexa-scan-london",
    label: "DEXA Scan",
    title: "DEXA Scans in London",
    metaTitle: "DEXA Scan London | Body Composition & Bone Density | Well+",
    description: "Compare London providers offering DEXA scans for body composition, visceral fat, lean mass and bone-density assessment.",
    eyebrow: "Body composition and bone health",
    heroText: "Find DEXA scan providers and understand what the scan measures, what your results include and who interprets them.",
    matchTerms: ["dexa", "dual-energy x-ray absorptiometry", "body composition scan", "bone density scan", "bone mineral density"],
    bestFor: [
      { title: "Accurate body composition", text: "Useful when you want a more detailed view of fat mass, lean mass and regional distribution than consumer scales provide." },
      { title: "Visceral-fat tracking", text: "Some providers report visceral fat alongside total and regional body composition." },
      { title: "Bone-health assessment", text: "Clinical DEXA is also used to assess bone mineral density, although the purpose and reporting format may differ from fitness-led scans." },
    ],
    evidenceNotes: [
      { title: "What it measures", text: "DEXA uses low-dose X-rays at two energy levels to estimate bone mineral density and body composition." },
      { title: "Why context matters", text: "A body-composition scan and a clinically indicated bone-density assessment may use similar technology but answer different questions." },
      { title: "How to compare providers", text: "Check which outputs are included, who explains the results and whether repeat scans use a consistent protocol." },
      { title: "Important limitation", text: "DEXA is a measurement tool, not a diagnosis or a complete assessment of metabolic health." },
    ],
    whatToExpect: [
      { title: "A short, non-invasive scan", text: "You usually lie still on an open scanning bed while the arm passes over the body." },
      { title: "A results report", text: "Outputs may include total body fat, lean mass, regional balance, visceral fat and bone-density measures." },
      { title: "Different levels of interpretation", text: "Some services provide only the report; others include a physiologist or clinician review." },
    ],
    guidance: [
      { title: "Confirm the scan purpose", text: "Check whether the booking is designed for body composition, bone density or both." },
      { title: "Ask what is included", text: "Confirm the report, consultation, repeat-scan comparability and any preparation requirements." },
      { title: "Compare interpretation, not just price", text: "A cheaper scan may be sufficient for tracking, while a clinically relevant concern may require qualified interpretation and referral pathways." },
    ],
    related: [
      { href: "/vo2-max-testing-london", label: "VO₂ Max Testing", text: "Pair body composition with an objective measure of cardiorespiratory fitness." },
      { href: "/health-screening-london", label: "Health Screening", text: "Compare broader preventative assessments and clinician-led screening packages." },
      { href: "/longevity", label: "Longevity Clinics", text: "Explore clinics combining diagnostics, medical review and ongoing health planning." },
    ],
    faqs: [
      { question: "What does a DEXA scan show?", answer: "Depending on the service, a DEXA scan can report bone mineral density, total and regional body fat, lean mass and estimated visceral fat." },
      { question: "Is a DEXA scan the same as a body-composition scale?", answer: "No. DEXA uses medical imaging technology and generally provides more detailed regional estimates than bioimpedance scales, although every measurement method has limitations." },
      { question: "Do I need a referral for a DEXA scan in London?", answer: "Many private body-composition services accept direct bookings. Clinically indicated bone-density scans may follow a different referral or review process, so check with the provider." },
    ],
  },
  {
    slug: "vo2-max-testing-london",
    href: "/vo2-max-testing-london",
    label: "VO₂ Max Testing",
    title: "VO₂ Max Testing in London",
    metaTitle: "VO₂ Max Testing London | Fitness & Performance Tests | Well+",
    description: "Compare London VO₂ max testing providers and understand protocols, results, training zones and clinical or performance interpretation.",
    eyebrow: "Cardiorespiratory fitness",
    heroText: "Find laboratory and clinic-based VO₂ max tests that measure how effectively your body uses oxygen during progressive exercise.",
    matchTerms: ["vo2 max", "vo₂ max", "vo2max", "cardiopulmonary exercise test", "cpet", "metabolic testing", "exercise physiology"],
    bestFor: [
      { title: "Fitness benchmarking", text: "Provides an objective baseline for cardiorespiratory fitness rather than relying only on wearable estimates." },
      { title: "Training-zone accuracy", text: "Useful for runners, cyclists and endurance athletes seeking more individualised training zones." },
      { title: "Performance planning", text: "Can be combined with threshold, economy or metabolic testing to guide a structured programme." },
    ],
    evidenceNotes: [
      { title: "What it measures", text: "VO₂ max is the highest rate at which your body can take in, transport and use oxygen during intense exercise." },
      { title: "Why protocol matters", text: "Results depend on equipment, exercise mode, calibration, effort and the criteria used to confirm a maximal test." },
      { title: "Wearable versus laboratory estimates", text: "Watches can estimate VO₂ max, while laboratory testing directly analyses breathing gases during exercise." },
      { title: "Clinical boundaries", text: "A performance VO₂ max test is not automatically the same as a medically supervised cardiopulmonary exercise test." },
    ],
    whatToExpect: [
      { title: "Progressive exercise", text: "Most tests use a treadmill or cycle ergometer with intensity increasing in stages or continuously." },
      { title: "Breath-by-breath analysis", text: "You wear a mask connected to equipment that measures oxygen use and carbon-dioxide production." },
      { title: "Results and training guidance", text: "Providers may report VO₂ max, heart-rate zones, thresholds and practical training recommendations." },
    ],
    guidance: [
      { title: "Choose the right exercise mode", text: "Runners usually benefit from treadmill testing and cyclists from bike-based testing where available." },
      { title: "Check who conducts the test", text: "Look for qualified exercise physiologists or appropriate clinical oversight, especially if you have symptoms or health concerns." },
      { title: "Confirm the outputs", text: "Ask whether the price includes thresholds, training zones, a written report and a review consultation." },
    ],
    related: [
      { href: "/dexa-scan-london", label: "DEXA Scans", text: "Measure body composition and lean-mass distribution alongside fitness testing." },
      { href: "/health-screening-london", label: "Health Screening", text: "Explore broader preventative assessments and cardiovascular checks." },
      { href: "/longevity", label: "Longevity Clinics", text: "Find clinics offering diagnostics, medical interpretation and ongoing health programmes." },
    ],
    faqs: [
      { question: "What is a good VO₂ max?", answer: "VO₂ max varies by age, sex, training background and test method. A useful interpretation compares your result with an appropriate reference group and your own future measurements." },
      { question: "How long does a VO₂ max test take?", answer: "The maximal exercise portion is usually relatively short, but appointments often include setup, warm-up, recovery and a results review." },
      { question: "Is VO₂ max testing only for athletes?", answer: "No. It can be useful for anyone wanting an objective fitness baseline, although the protocol and level of supervision should suit the individual." },
    ],
  },
  {
    slug: "health-screening-london",
    href: "/health-screening-london",
    label: "Health Screening",
    title: "Private Health Screening in London",
    metaTitle: "Private Health Screening London | Preventative Assessments | Well+",
    description: "Compare private health screening providers in London, including blood tests, cardiovascular checks, imaging and doctor-led assessments.",
    eyebrow: "Preventative health assessment",
    heroText: "Find structured health checks and understand which tests are included, who reviews the results and what follow-up is provided.",
    matchTerms: ["health screening", "health assessment", "preventative health", "preventive health", "executive health", "medical screening", "full health check", "well person screening"],
    bestFor: [
      { title: "A broad health baseline", text: "Suitable when you want multiple checks combined into one structured assessment rather than booking separate tests." },
      { title: "Risk-factor review", text: "Can bring together medical history, blood pressure, biomarkers and selected investigations to identify areas requiring attention." },
      { title: "Clinician-led interpretation", text: "The strongest packages explain what the results mean, what does not need action and when further assessment may be appropriate." },
    ],
    evidenceNotes: [
      { title: "What screening is", text: "Screening looks for risk factors or possible early signs of disease in people who may not have symptoms." },
      { title: "More testing is not always better", text: "Broad panels and imaging can generate incidental findings, uncertainty and follow-up investigations. Relevance and interpretation matter." },
      { title: "Package differences", text: "The phrase full health check is not standardised. Two similarly priced packages may include very different tests and levels of medical review." },
      { title: "When symptoms are present", text: "Screening is not a substitute for seeking medical assessment of new or concerning symptoms." },
    ],
    whatToExpect: [
      { title: "Pre-assessment information", text: "You may complete a health questionnaire and receive preparation instructions before attending." },
      { title: "A combination of checks", text: "Packages can include consultation, examination, blood tests, cardiovascular measures and selected imaging." },
      { title: "Results and next steps", text: "Good providers clearly distinguish normal findings, modifiable risks and results that need GP or specialist follow-up." },
    ],
    guidance: [
      { title: "Compare the exact inclusions", text: "Do not compare packages by name alone. Review every test, consultation and follow-up included in the price." },
      { title: "Check clinical oversight", text: "Confirm who orders, reviews and explains the investigations and whether an onward referral route exists." },
      { title: "Choose relevance over volume", text: "A targeted assessment based on age, history and risk can be more useful than the package with the longest test list." },
    ],
    related: [
      { href: "/dexa-scan-london", label: "DEXA Scans", text: "Compare focused body-composition and bone-density assessments." },
      { href: "/vo2-max-testing-london", label: "VO₂ Max Testing", text: "Explore objective cardiorespiratory fitness and performance testing." },
      { href: "/longevity", label: "Longevity Clinics", text: "Compare doctor-led longevity clinics and advanced diagnostic programmes." },
    ],
    faqs: [
      { question: "What is included in a private health screening?", answer: "It varies widely. Common elements include a medical history, blood pressure, blood tests and a clinician review; some packages add ECG, imaging, body composition or specialist screening." },
      { question: "Is a private health screening the same as a longevity assessment?", answer: "Not always. A screening is often a one-off set of checks, while a longevity assessment may include broader diagnostics, lifestyle planning, repeat measurement and ongoing support." },
      { question: "Can health screening rule out all disease?", answer: "No. Screening has limitations and cannot guarantee that a condition is absent. Results should be interpreted in context by an appropriately qualified professional." },
    ],
  },
];

export function getLongevityServicePage(slug: string) {
  return longevityServicePages.find((page) => page.slug === slug);
}

function facilitySearchText(facility: AirtableFacility) {
  return [
    facility.name,
    facility.description,
    facility.editorialSummary,
    facility.primaryService,
    ...facility.secondaryServices,
    ...facility.serviceNames,
    ...facility.servicesOffered,
    ...facility.activityCategories,
    ...facility.activityTagsStandardized,
    ...facility.activityDisplayLabels,
    ...facility.themeTagsStandardized,
    ...facility.bestFor,
    ...facility.bestForStandardized,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function getFacilitiesForLongevityService(facilities: AirtableFacility[], page: LongevityServicePageConfig) {
  return facilities
    .filter((facility) => page.matchTerms.some((term) => facilitySearchText(facility).includes(term.toLowerCase())))
    .sort((a, b) => b.profileCompletenessScore - a.profileCompletenessScore);
}
