"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import FacilityCard from "@/components/FacilityCard";
import LongevityJourney from "@/components/LongevityJourney";
import type { LongevityFacility } from "@/lib/longevity-facilities";
import { dedupeFacilities } from "@/lib/dedupe-facilities";
import { toDirectoryFacility } from "@/lib/facility-presenters";

const needs = [
  { value: "all", label: "All clinics" },
  { value: "comprehensive", label: "Comprehensive baseline" },
  { value: "imaging", label: "Imaging & screening" },
  { value: "performance", label: "Fitness & metabolic" },
  { value: "specific", label: "Specific testing" },
  { value: "ongoing", label: "Ongoing programme" },
] as const;

const diagnosticFilters = [
  { value: "all", label: "All diagnostics" },
  { value: "screening", label: "Health screening" },
  { value: "blood", label: "Blood biomarkers" },
  { value: "cardiovascular", label: "Cardiovascular" },
  { value: "dexa", label: "DEXA" },
  { value: "vo2", label: "VO₂ max" },
  { value: "imaging", label: "MRI / imaging" },
  { value: "genetics", label: "Genetics / biological age" },
] as const;

const oversightFilters = [
  { value: "all", label: "Any clinical model" },
  { value: "doctor", label: "Doctor-led" },
  { value: "clinician", label: "Clinician-led" },
  { value: "testing", label: "Testing with review" },
  { value: "testing-only", label: "Testing only" },
] as const;

const priceFilters = [
  { value: "all", label: "Any price" },
  { value: "under-500", label: "Under £500" },
  { value: "500-1500", label: "£500–£1,500" },
  { value: "1500-plus", label: "£1,500+" },
] as const;

const featuredServices = [
  {
    label: "Health Screening",
    href: "/health-screening-london",
    question: "What does my overall health baseline show?",
  },
  {
    label: "Blood Testing & Biomarkers",
    href: "/blood-testing-london",
    question: "Which markers are relevant, and what do the results mean?",
  },
  {
    label: "Cardiovascular Screening",
    href: "/cardiovascular-screening-london",
    question: "What is my cardiovascular risk and what needs follow-up?",
  },
  {
    label: "DEXA Scans",
    href: "/dexa-scan-london",
    question: "How are body composition or bone measures changing?",
  },
  {
    label: "VO₂ Max Testing",
    href: "/vo2-max-testing-london",
    question: "What is my measured cardiorespiratory fitness?",
  },
  {
    label: "Medical Imaging",
    href: "/medical-imaging-london",
    question: "Is imaging appropriate, and who acts on the findings?",
  },
] as const;

const featuredServiceHrefs: Record<string, string> = {
  "Health Screening": "/health-screening-london",
  "Blood Biomarkers": "/blood-testing-london",
  "Hormone Testing": "/blood-testing-london",
  "Cardiovascular Screening": "/cardiovascular-screening-london",
  "DEXA Scan": "/dexa-scan-london",
  "VO₂ Max Testing": "/vo2-max-testing-london",
  "MRI / Medical Imaging": "/medical-imaging-london",
};

type Need = (typeof needs)[number]["value"];
type Diagnostic = (typeof diagnosticFilters)[number]["value"];
type Oversight = (typeof oversightFilters)[number]["value"];
type Price = (typeof priceFilters)[number]["value"];

const diagnosticValueByLabel: Record<string, Exclude<Diagnostic, "all">> = {
  "Health Screening": "screening",
  "Blood Biomarkers": "blood",
  "Hormone Testing": "blood",
  "Cardiovascular Screening": "cardiovascular",
  "DEXA Scan": "dexa",
  "VO₂ Max Testing": "vo2",
  "MRI / Medical Imaging": "imaging",
  "Genetic / Genomic Testing": "genetics",
  "Biological Age Testing": "genetics",
};

type ClinicProfile = {
  facility: LongevityFacility;
  need: Exclude<Need, "all">;
  clinicType: string;
  oversight: Exclude<Oversight, "all">;
  oversightLabel: string;
  diagnostics: Exclude<Diagnostic, "all">[];
  diagnosticLabels: string[];
  featuredServiceLabels: string[];
  format: string;
  priceBand: Exclude<Price, "all"> | "unknown";
  bestFor: string;
  resultsIncluded: string[];
  verificationLabel: string;
};

function searchableText(facility: LongevityFacility) {
  return [
    facility.name,
    facility.description,
    facility.editorialSummary,
    facility.editorialVerdict,
    facility.venueTypeStandardized,
    facility.primaryService,
    facility.clinicModel,
    facility.clinicalOversight,
    ...facility.confirmedDiagnostics,
    ...facility.assessmentFormat,
    ...facility.resultsIncluded,
    ...(facility.secondaryServices || []),
    ...(facility.serviceNames || []),
    ...(facility.servicesOffered || []),
    ...(facility.activityCategories || []),
    ...(facility.activityTagsStandardized || []),
    ...(facility.activityDisplayLabels || []),
    ...(facility.themeTagsStandardized || []),
    ...(facility.bestFor || []),
    ...(facility.bestForStandardized || []),
    ...(facility.typeOfExperience || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function containsAny(text: string, terms: string[]) {
  return terms.some((term) => text.includes(term));
}

function deriveDiagnostics(facility: LongevityFacility, text: string) {
  const diagnostics: Exclude<Diagnostic, "all">[] = [];
  const labels: string[] = [];

  const add = (value: Exclude<Diagnostic, "all">, label: string) => {
    if (!diagnostics.includes(value)) diagnostics.push(value);
    if (!labels.includes(label)) labels.push(label);
  };

  facility.confirmedDiagnostics.forEach((label) => {
    const value = diagnosticValueByLabel[label];
    if (value) add(value, label);
  });

  if (facility.confirmedDiagnostics.length === 0) {
    if (containsAny(text, ["health screening", "health assessment", "executive health", "full health check", "preventative health", "preventive health"])) add("screening", "Health Screening");
    if (containsAny(text, ["blood test", "blood testing", "biomarker", "blood panel", "hormone testing"])) add("blood", "Blood Biomarkers");
    if (containsAny(text, ["cardiovascular", "cardiac", "ecg", "heart screening"])) add("cardiovascular", "Cardiovascular Screening");
    if (containsAny(text, ["dexa", "dual-energy x-ray absorptiometry", "body composition scan", "bone density scan"])) add("dexa", "DEXA Scan");
    if (containsAny(text, ["vo2 max", "vo₂ max", "vo2max", "cardiorespiratory fitness", "cpet"])) add("vo2", "VO₂ Max Testing");
    if (containsAny(text, ["mri", "ct scan", "medical imaging", "ultrasound", "full body scan"])) add("imaging", "MRI / Medical Imaging");
    if (containsAny(text, ["genetic", "genomic", "epigenetic", "biological age"])) add("genetics", "Genetics / Biological Age");
  }

  return { diagnostics, labels };
}

function parsePrice(value: string) {
  const matches = value.match(/[\d,]+/g);
  return matches?.length ? Number(matches[0].replace(/,/g, "")) : undefined;
}

function deriveNeed(facility: LongevityFacility, text: string): Pick<ClinicProfile, "need" | "clinicType" | "bestFor"> {
  const model = facility.clinicModel;

  if (model === "Comprehensive longevity clinic" || model === "Preventative health screening clinic") {
    return {
      need: "comprehensive",
      clinicType: model,
      bestFor: "Building a broad preventative-health baseline",
    };
  }

  if (model === "Advanced imaging provider") {
    return {
      need: "imaging",
      clinicType: model,
      bestFor: "Imaging with radiology reporting and clinical follow-up",
    };
  }

  if (model === "Performance diagnostics clinic") {
    return {
      need: "performance",
      clinicType: model,
      bestFor: "Fitness, body composition and metabolic insight",
    };
  }

  if (model === "Ongoing clinical programme") {
    return {
      need: "ongoing",
      clinicType: model,
      bestFor: "Repeat testing and longer-term clinical support",
    };
  }

  if (model === "Specialist testing provider") {
    return {
      need: "specific",
      clinicType: model,
      bestFor: "A focused test or defined health question",
    };
  }

  if (containsAny(text, ["comprehensive health", "executive health", "full health assessment", "longevity assessment"])) {
    return {
      need: "comprehensive",
      clinicType: "Comprehensive longevity clinic",
      bestFor: "Building a broad preventative-health baseline",
    };
  }

  if (containsAny(text, ["mri", "ct scan", "medical imaging", "full body scan", "cancer screening"])) {
    return {
      need: "imaging",
      clinicType: "Imaging and screening provider",
      bestFor: "Advanced screening and structural investigation",
    };
  }

  if (containsAny(text, ["vo2 max", "vo₂ max", "dexa", "resting metabolic rate", "performance testing"])) {
    return {
      need: "performance",
      clinicType: "Performance diagnostics clinic",
      bestFor: "Fitness, body composition and metabolic insight",
    };
  }

  if (containsAny(text, ["membership", "annual programme", "ongoing", "repeat testing", "follow-up programme"])) {
    return {
      need: "ongoing",
      clinicType: "Ongoing longevity programme",
      bestFor: "Repeat testing and longer-term clinical support",
    };
  }

  return {
    need: "specific",
    clinicType: "Specialist testing provider",
    bestFor: "A focused test or defined health question",
  };
}

function deriveOversight(facility: LongevityFacility, text: string): Pick<ClinicProfile, "oversight" | "oversightLabel"> {
  const oversight = facility.clinicalOversight;

  if (oversight === "Doctor-led") return { oversight: "doctor", oversightLabel: oversight };
  if (oversight === "Clinician-led") return { oversight: "clinician", oversightLabel: oversight };
  if (oversight === "Testing only") return { oversight: "testing-only", oversightLabel: oversight };
  if (oversight === "Testing with clinical review") return { oversight: "testing", oversightLabel: oversight };

  if (containsAny(text, ["doctor-led", "physician-led", "medical director", "doctor consultation", "consultant physician"])) {
    return { oversight: "doctor", oversightLabel: "Doctor-led" };
  }

  if (containsAny(text, ["clinician-led", "clinical team", "nurse-led", "physiologist"])) {
    return { oversight: "clinician", oversightLabel: "Clinician-led" };
  }

  return { oversight: "testing", oversightLabel: "Testing with review not yet confirmed" };
}

function deriveFormat(facility: LongevityFacility, text: string) {
  if (facility.assessmentFormat.length > 0) return facility.assessmentFormat.join(" · ");

  const ongoing = containsAny(text, ["membership", "annual programme", "ongoing", "repeat testing", "follow-up programme"]);
  const oneOff = containsAny(text, ["assessment", "screening", "scan", "test", "consultation"]);
  return ongoing && oneOff ? "One-off and ongoing" : ongoing ? "Ongoing programme" : "One-off assessment";
}

function formatVerificationDate(value: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

function profileClinic(facility: LongevityFacility): ClinicProfile {
  const text = searchableText(facility);
  const { diagnostics, labels } = deriveDiagnostics(facility, text);
  const needProfile = deriveNeed(facility, text);
  const oversightProfile = deriveOversight(facility, text);
  const price = parsePrice(`${facility.priceFrom} ${facility.priceNotes} ${facility.overallPriceRange}`);
  const priceBand: ClinicProfile["priceBand"] = price === undefined ? "unknown" : price < 500 ? "under-500" : price < 1500 ? "500-1500" : "1500-plus";
  const verifiedDate = formatVerificationDate(facility.serviceLastVerified);
  const verificationLabel = facility.venueConfirmed
    ? "Venue confirmed"
    : verifiedDate
      ? `Service checked ${verifiedDate}`
      : "Provider information";

  return {
    facility,
    ...needProfile,
    ...oversightProfile,
    diagnostics,
    diagnosticLabels: labels.length ? labels : ["Clinical assessment"],
    featuredServiceLabels: labels.filter((label) => Boolean(featuredServiceHrefs[label])),
    format: deriveFormat(facility, text),
    priceBand,
    resultsIncluded: facility.resultsIncluded,
    verificationLabel,
  };
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: readonly { value: string; label: string }[] }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-[#6f6048]">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full border border-[#cfc3b2] bg-[#fbf8f1] px-4 py-3 text-sm outline-none focus:border-[#29241d]">
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}

export default function LongevityDirectoryPage({ facilities }: { facilities: LongevityFacility[] }) {
  const [need, setNeed] = useState<Need>("all");
  const [diagnostic, setDiagnostic] = useState<Diagnostic>("all");
  const [oversight, setOversight] = useState<Oversight>("all");
  const [price, setPrice] = useState<Price>("all");

  const profiles = useMemo(() => facilities.map(profileClinic), [facilities]);
  const filteredProfiles = useMemo(() => profiles.filter((profile) =>
    (need === "all" || profile.need === need) &&
    (diagnostic === "all" || profile.diagnostics.includes(diagnostic)) &&
    (oversight === "all" || profile.oversight === oversight) &&
    (price === "all" || profile.priceBand === price)
  ), [profiles, need, diagnostic, oversight, price]);

  const directoryFacilities = dedupeFacilities(filteredProfiles.map((profile) => toDirectoryFacility(profile.facility)));
  const visibleProfiles = directoryFacilities
    .map((directoryFacility) => profiles.find((profile) => profile.facility.slug === directoryFacility.slug))
    .filter(Boolean) as ClinicProfile[];
  const hasFilters = need !== "all" || diagnostic !== "all" || oversight !== "all" || price !== "all";

  return (
    <main className="bg-[#fbf8f1] text-[#29241d]">
      <section className="px-5 pb-12 pt-8 sm:px-6 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[#6f6048] sm:text-[11px]">London longevity and diagnostics</p>
          <h1 className="max-w-5xl font-serif text-[2.8rem] font-normal leading-[0.92] tracking-[-0.055em] sm:text-6xl md:text-8xl">Know your baseline. Track what changes.</h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-[#5f574c] sm:text-lg sm:leading-8">Compare London clinics by what they measure, who interprets the results, what happens next and whether the service supports meaningful follow-up over time.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#services" className="rounded-full bg-[#29241d] px-5 py-3 text-sm text-[#fbf8f1]">Choose what to measure</a>
            <a href="#clinics" className="rounded-full border border-[#b8aa96] px-5 py-3 text-sm">Compare clinics</a>
          </div>
        </div>
      </section>

      <LongevityJourney />

      <section id="services" className="scroll-mt-24 border-b border-[#d8cebf] bg-[#f4efe6] px-5 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">Explore by health question</p>
            <h2 className="font-serif text-4xl font-normal leading-tight tracking-[-0.045em] sm:text-5xl">Start with what you need to understand.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => (
              <Link key={service.href} href={service.href} className="group border border-[#d8cebf] bg-[#fbf8f1] p-6 transition hover:-translate-y-[1px] hover:bg-[#eee7da]">
                <h3 className="font-serif text-2xl font-normal leading-tight group-hover:underline group-hover:underline-offset-4">{service.label}</h3>
                <p className="mt-3 text-sm leading-7 text-[#5f574c]">{service.question}</p>
                <span className="mt-5 inline-block text-sm underline underline-offset-4">Understand the assessment</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="how-to-compare" className="px-5 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">What belongs here</p>
            <h2 className="font-serif text-4xl font-normal leading-tight tracking-[-0.045em] sm:text-5xl">Diagnostics before optimisation.</h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-[#5f574c]">
            <p>Longevity becomes useful when objective measurements help establish a baseline, identify priorities and guide an appropriate next step. The test itself is not the outcome.</p>
            <p>Well+ separates diagnostics from general wellness treatments. A clinic belongs here when it offers meaningful screening, testing, medical imaging or clinician-led assessment—not because it also offers IV therapy, red light, HBOT or recovery treatments.</p>
            <p>Results should be interpreted in context. Screening can produce false-positive, false-negative or incidental findings, so more tests are not automatically better and concerning symptoms should follow an appropriate medical pathway.</p>
          </div>
        </div>
      </section>

      <section id="clinics" className="scroll-mt-24 border-t border-[#d8cebf] px-5 py-12 sm:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">London directory</p>
            <h2 className="font-serif text-4xl font-normal leading-tight tracking-[-0.045em] sm:text-5xl">Compare the full assessment, not only the test list.</h2>
            <p className="mt-4 text-sm leading-7 text-[#5f574c] sm:text-base">Narrow by health need, confirmed diagnostics, clinical oversight and likely investment. Structured provider fields are used where verified; otherwise the listing is based on clearly stated public information.</p>
          </div>

          <div className="mb-10 grid gap-4 border border-[#d8cebf] bg-[#f4efe6] p-5 sm:grid-cols-2 lg:grid-cols-4">
            <FilterSelect label="I am looking for" value={need} onChange={(value) => setNeed(value as Need)} options={needs} />
            <FilterSelect label="Diagnostic" value={diagnostic} onChange={(value) => setDiagnostic(value as Diagnostic)} options={diagnosticFilters} />
            <FilterSelect label="Clinical oversight" value={oversight} onChange={(value) => setOversight(value as Oversight)} options={oversightFilters} />
            <FilterSelect label="Starting price" value={price} onChange={(value) => setPrice(value as Price)} options={priceFilters} />
            <div className="flex items-end sm:col-span-2 lg:col-span-4">
              <p className="text-xs text-[#6f6048]">Showing {visibleProfiles.length} of {profiles.length} listed providers.</p>
              {hasFilters && <button type="button" onClick={() => { setNeed("all"); setDiagnostic("all"); setOversight("all"); setPrice("all"); }} className="ml-auto text-xs underline underline-offset-4">Clear filters</button>}
            </div>
          </div>

          {visibleProfiles.length > 0 ? (
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {visibleProfiles.map((profile) => {
                const directoryFacility = toDirectoryFacility(profile.facility);
                const prioritisedServices = Array.from(new Set([...profile.featuredServiceLabels, ...(directoryFacility.services || [])]));
                const visibleLabels = profile.diagnosticLabels.slice(0, 3);
                const moreCount = Math.max(profile.diagnosticLabels.length - visibleLabels.length, 0);
                const visibleResults = profile.resultsIncluded.slice(0, 2);

                return (
                  <article key={profile.facility.slug} className="flex flex-col">
                    <div className="mb-3 border border-[#d8cebf] bg-[#f4efe6] p-4">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-[10px] uppercase tracking-[0.16em] text-[#6f6048]">{profile.clinicType}</p>
                        <span className="shrink-0 text-right text-[9px] uppercase tracking-[0.12em] text-[#6f6048]">{profile.verificationLabel}</span>
                      </div>
                      <p className="mt-3 text-sm leading-6"><span className="text-[#6f6048]">Best for:</span> {profile.bestFor}</p>
                      <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-[#d8cebf] pt-4 text-xs">
                        <div><dt className="text-[#6f6048]">Clinical oversight</dt><dd className="mt-1">{profile.oversightLabel}</dd></div>
                        <div><dt className="text-[#6f6048]">Assessment format</dt><dd className="mt-1">{profile.format}</dd></div>
                      </dl>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {visibleLabels.map((label) => {
                          const href = featuredServiceHrefs[label];
                          const className = `rounded-full border px-2.5 py-1 text-[10px] ${href ? "border-[#29241d] bg-[#29241d] text-[#fbf8f1]" : "border-[#cfc3b2]"}`;
                          return href ? <Link key={label} href={href} className={className}>{label}</Link> : <span key={label} className={className}>{label}</span>;
                        })}
                        {moreCount > 0 && <Link href={`/facility/${profile.facility.slug}`} className="px-1 py-1 text-[10px] underline underline-offset-4">+{moreCount} more</Link>}
                      </div>
                      {visibleResults.length > 0 ? (
                        <p className="mt-4 border-t border-[#d8cebf] pt-3 text-xs leading-5 text-[#5f574c]"><span className="text-[#6f6048]">Results include:</span> {visibleResults.join(" · ")}{profile.resultsIncluded.length > 2 ? " · more" : ""}</p>
                      ) : null}
                    </div>
                    <FacilityCard facility={{ ...directoryFacility, services: prioritisedServices }} source="longevity_directory" prioritisedService={profile.featuredServiceLabels[0]} />
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="border border-[#d8cebf] bg-[#f4efe6] p-8 text-sm leading-7 text-[#5f574c]">No clinics currently match every selected filter. Clear one or more filters to broaden the comparison.</div>
          )}
        </div>
      </section>

      <section className="bg-[#29241d] px-5 py-14 text-[#fbf8f1] sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-[#d8cebf]">Before booking</p>
            <h2 className="font-serif text-4xl font-normal leading-tight tracking-[-0.045em] sm:text-5xl">Compare what happens after the test.</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Who selects, reviews and explains the tests?", "Do you receive the full results and a written report?", "Which findings lead to action, repeat testing or referral?", "Can future results be compared using the same method?"].map((item) => <div key={item} className="border border-[#fbf8f1]/14 p-5 text-sm leading-7 text-[#fbf8f1]/78">{item}</div>)}
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">The Well+ role</p>
            <h2 className="font-serif text-4xl font-normal leading-tight tracking-[-0.045em]">Understand what to measure before choosing where.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/editorial" className="border border-[#d8cebf] bg-[#f4efe6] p-6 transition hover:bg-[#eee7da]"><h3 className="font-serif text-2xl font-normal">Testing and tracking guides</h3><p className="mt-3 text-sm leading-7 text-[#5f574c]">Editorial explaining what different assessments can and cannot tell you.</p></Link>
            <Link href="/editorial-standards" className="border border-[#d8cebf] bg-[#f4efe6] p-6 transition hover:bg-[#eee7da]"><h3 className="font-serif text-2xl font-normal">How Well+ handles health claims</h3><p className="mt-3 text-sm leading-7 text-[#5f574c]">Our approach to evidence, uncertainty and medical-adjacent services.</p></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
