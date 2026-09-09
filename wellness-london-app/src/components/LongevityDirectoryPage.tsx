"use client";

import { useDirectoryUrl } from "@/lib/use-directory-url";
import { venuePrice } from "@/lib/venue-pricing";

import { useMemo } from "react";
import Link from "next/link";
import SaveVenueButton from "@/components/SaveVenueButton";
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
  { value: "unconfirmed", label: "Not publicly confirmed" },
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
  format: string;
  priceBand: Exclude<Price, "all"> | "unknown";
  bestFor: string;
  resultsIncluded: string[];
  verificationLabel: string;
};

function explicitServiceText(facility: LongevityFacility) {
  return [
    facility.primaryService,
    ...facility.confirmedDiagnostics,
    ...(facility.secondaryServices || []),
    ...(facility.serviceNames || []),
    ...(facility.servicesOffered || []),
    ...(facility.activityCategories || []),
    ...(facility.activityTagsStandardized || []),
    ...(facility.activityDisplayLabels || []),
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
    if (
      containsAny(text, [
        "health screening",
        "health assessment",
        "executive health",
        "full health check",
        "preventative health",
        "preventive health",
      ])
    )
      add("screening", "Health Screening");
    if (
      containsAny(text, [
        "blood test",
        "blood testing",
        "biomarker",
        "blood panel",
        "hormone testing",
      ])
    )
      add("blood", "Blood Biomarkers");
    if (
      containsAny(text, ["cardiovascular", "cardiac", "ecg", "heart screening"])
    )
      add("cardiovascular", "Cardiovascular Screening");
    if (
      containsAny(text, [
        "dexa",
        "dual-energy x-ray absorptiometry",
        "body composition scan",
        "bone density scan",
      ])
    )
      add("dexa", "DEXA Scan");
    if (
      containsAny(text, [
        "vo2 max",
        "vo₂ max",
        "vo2max",
        "cardiorespiratory fitness",
        "cpet",
      ])
    )
      add("vo2", "VO₂ Max Testing");
    if (
      containsAny(text, [
        "mri",
        "ct scan",
        "medical imaging",
        "ultrasound",
        "full body scan",
      ])
    )
      add("imaging", "MRI / Medical Imaging");
    if (
      containsAny(text, ["genetic", "genomic", "epigenetic", "biological age"])
    )
      add("genetics", "Genetics / Biological Age");
  }

  return { diagnostics, labels };
}

function deriveNeed(
  facility: LongevityFacility,
  diagnostics: Exclude<Diagnostic, "all">[],
): Pick<ClinicProfile, "need" | "clinicType" | "bestFor"> {
  const model = facility.clinicModel;

  if (
    model === "Comprehensive longevity clinic" ||
    model === "Preventative health screening clinic"
  ) {
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

  if (
    facility.assessmentFormat.some((format) =>
      /ongoing|membership|annual programme/i.test(format),
    )
  ) {
    return {
      need: "ongoing",
      clinicType: "Ongoing longevity programme",
      bestFor: "Comparing repeat testing and longer-term support",
    };
  }

  if (diagnostics.includes("imaging")) {
    return {
      need: "imaging",
      clinicType: "Imaging and screening provider",
      bestFor: "Comparing confirmed imaging and screening services",
    };
  }

  if (diagnostics.includes("vo2") || diagnostics.includes("dexa")) {
    return {
      need: "performance",
      clinicType: "Performance diagnostics clinic",
      bestFor: "Comparing fitness and body-composition testing",
    };
  }

  if (diagnostics.includes("screening") && diagnostics.length > 1) {
    return {
      need: "comprehensive",
      clinicType: "Preventative health screening provider",
      bestFor: "Comparing a broader preventative-health baseline",
    };
  }

  return {
    need: "specific",
    clinicType: "Diagnostic testing provider",
    bestFor: "A focused test or defined health question",
  };
}

function deriveOversight(
  facility: LongevityFacility,
): Pick<ClinicProfile, "oversight" | "oversightLabel"> {
  const oversight = facility.clinicalOversight;

  if (oversight === "Doctor-led")
    return { oversight: "doctor", oversightLabel: oversight };
  if (oversight === "Clinician-led")
    return { oversight: "clinician", oversightLabel: oversight };
  if (oversight === "Testing only")
    return { oversight: "testing-only", oversightLabel: oversight };
  if (oversight === "Testing with clinical review")
    return { oversight: "testing", oversightLabel: oversight };

  return { oversight: "unconfirmed", oversightLabel: "Not publicly confirmed" };
}

function deriveFormat(facility: LongevityFacility) {
  if (facility.assessmentFormat.length > 0)
    return facility.assessmentFormat.join(" · ");
  return "Not publicly confirmed";
}

function formatVerificationDate(value: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function profileClinic(facility: LongevityFacility): ClinicProfile {
  const serviceText = explicitServiceText(facility);
  const { diagnostics, labels } = deriveDiagnostics(facility, serviceText);
  const needProfile = deriveNeed(facility, diagnostics);
  const oversightProfile = deriveOversight(facility);
  const publishedPrice = venuePrice(facility);
  const price = /assessment|DEXA|preventive health scan/.test(
    publishedPrice.basis,
  )
    ? Number(
        facility.priceFrom.replace(/,/g, "").match(/\d+(?:\.\d+)?/)?.[0],
      ) || undefined
    : undefined;
  const priceBand: ClinicProfile["priceBand"] =
    price === undefined
      ? "unknown"
      : price < 500
        ? "under-500"
        : price < 1500
          ? "500-1500"
          : "1500-plus";
  const verifiedDate = formatVerificationDate(facility.serviceLastVerified);
  const verificationLabel = verifiedDate
    ? `Information checked ${verifiedDate}`
    : facility.venueConfirmed
      ? "Venue listing confirmed"
      : "Provider information";

  return {
    facility,
    ...needProfile,
    ...oversightProfile,
    diagnostics,
    diagnosticLabels: labels.length
      ? labels
      : ["Diagnostic services not yet itemised"],
    format: deriveFormat(facility),
    priceBand,
    resultsIncluded: facility.resultsIncluded,
    verificationLabel,
  };
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-[#6f6048]">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full border border-[#cfc3b2] bg-[#fbf8f1] px-4 py-3 text-sm outline-none focus:border-[#29241d]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function LongevityDirectoryPage({
  facilities,
}: {
  facilities: LongevityFacility[];
}) {
  const [urlState, updateUrl] = useDirectoryUrl();
  const need = (urlState.clinicalNeed || "all") as Need;
  const diagnostic = (urlState.diagnostic || "all") as Diagnostic;
  const oversight = (urlState.oversight || "all") as Oversight;
  const price = (urlState.assessmentPrice || "all") as Price;
  const setNeed = (value: Need) => updateUrl({ clinicalNeed: value });
  const setDiagnostic = (value: Diagnostic) => updateUrl({ diagnostic: value });
  const setOversight = (value: Oversight) => updateUrl({ oversight: value });
  const setPrice = (value: Price) => updateUrl({ assessmentPrice: value });

  const profiles = useMemo(() => facilities.map(profileClinic), [facilities]);
  const filteredProfiles = useMemo(
    () =>
      profiles.filter(
        (profile) =>
          (need === "all" || profile.need === need) &&
          (diagnostic === "all" || profile.diagnostics.includes(diagnostic)) &&
          (oversight === "all" || profile.oversight === oversight) &&
          (price === "all" || profile.priceBand === price),
      ),
    [profiles, need, diagnostic, oversight, price],
  );

  const directoryFacilities = dedupeFacilities(
    filteredProfiles.map((profile) => toDirectoryFacility(profile.facility)),
  );
  const visibleProfiles = directoryFacilities
    .map((directoryFacility) =>
      profiles.find(
        (profile) => profile.facility.slug === directoryFacility.slug,
      ),
    )
    .filter(Boolean) as ClinicProfile[];
  const hasFilters =
    need !== "all" ||
    diagnostic !== "all" ||
    oversight !== "all" ||
    price !== "all";

  return (
    <main className="bg-[#f4efe6] text-[#29241d]">
      <section className="px-5 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-6xl">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#6f6048]"
          >
            <Link href="/" className="underline-offset-4 hover:underline">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-[#29241d]">
              Longevity
            </span>
          </nav>
          <p className="mb-4 text-xs uppercase tracking-[0.22em] text-[#6f6048] sm:text-xs">
            London longevity and diagnostics
          </p>
          <h1 className="max-w-5xl font-serif text-[2.8rem] font-normal leading-[0.92] tracking-[-0.055em] sm:text-6xl">
            Know your baseline. Track what changes.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-[#5f574c] sm:text-lg sm:leading-8">
            Compare London clinics by what they measure, who interprets the
            results, what happens next and whether the service supports
            meaningful follow-up over time.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#services"
              className="rounded-full bg-[#29241d] px-5 py-3 text-sm text-[#fbf8f1]"
            >
              Choose what to measure
            </a>
            <a
              href="#clinics"
              className="rounded-full border border-[#b8aa96] px-5 py-3 text-sm"
            >
              Compare clinics
            </a>
          </div>
        </div>
      </section>

      <LongevityJourney compact />

      <nav
        id="services"
        aria-label="Assessment guides"
        className="editorial-shell flex flex-wrap gap-x-5 gap-y-1 py-4"
      >
        {featuredServices.map((service) => (
          <Link
            key={service.href}
            href={service.href}
            className="inline-flex min-h-11 items-center text-sm underline"
          >
            {service.label}
          </Link>
        ))}
      </nav>

      <section id="clinics" className="scroll-mt-24 px-5 py-6 sm:px-6 md:py-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[#6f6048]">
              London directory
            </p>
            <h2 className="font-serif text-4xl font-normal leading-tight tracking-[-0.045em] sm:text-5xl">
              Compare London clinics.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#5f574c] sm:text-base">
              We prioritise clinics that explain what they test, who reviews the
              results and what follow-up is included. Where those details are
              not publicly clear, we say so.
            </p>
          </div>

          <div className="surface-paper-strong mb-10 grid gap-4 rounded-[1.2rem] p-5 sm:grid-cols-2 lg:grid-cols-4">
            <FilterSelect
              label="I am looking for"
              value={need}
              onChange={(value) => setNeed(value as Need)}
              options={needs}
            />
            <FilterSelect
              label="Diagnostic"
              value={diagnostic}
              onChange={(value) => setDiagnostic(value as Diagnostic)}
              options={diagnosticFilters}
            />
            <FilterSelect
              label="Clinical oversight"
              value={oversight}
              onChange={(value) => setOversight(value as Oversight)}
              options={oversightFilters}
            />
            <FilterSelect
              label="Published assessment price"
              value={price}
              onChange={(value) => setPrice(value as Price)}
              options={priceFilters}
            />
            <div className="flex items-end sm:col-span-2 lg:col-span-4">
              <p className="text-xs text-[#6f6048]">
                Showing {visibleProfiles.length} of {profiles.length} listed
                providers.
              </p>
              {hasFilters && (
                <button
                  type="button"
                  onClick={() => {
                    updateUrl({
                      clinicalNeed: "",
                      diagnostic: "",
                      oversight: "",
                      assessmentPrice: "",
                    });
                  }}
                  className="ml-auto text-xs underline underline-offset-4"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {visibleProfiles.length > 0 ? (
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {visibleProfiles.map((profile) => {
                return (
                  <article
                    key={profile.facility.slug}
                    className="rounded-xl border border-[#d8cebf] bg-[#fbf8f1] p-5 sm:p-6"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        href={`/facility/${profile.facility.slug}`}
                        className="hover:underline"
                      >
                        <h3 className="font-sans text-xl font-semibold leading-7 tracking-tight">
                          {profile.facility.name}
                        </h3>
                      </Link>
                      <SaveVenueButton
                        slug={profile.facility.slug}
                        name={profile.facility.name}
                      />
                    </div>
                    <p className="mt-2 text-sm text-[#5f574c]">
                      {profile.facility.neighbourhood ||
                        profile.facility.areaOfLondon}{" "}
                      · {profile.clinicType}
                    </p>
                    <p className="mt-4 text-sm leading-6">
                      {profile.diagnosticLabels.join(" · ") ||
                        "Check available assessments with the clinic"}
                    </p>
                    <p className="mt-4 text-base font-semibold">
                      {venuePrice(profile.facility).label}
                    </p>
                    <dl className="mt-4 space-y-3 border-t border-[#d8cebf] pt-4 text-sm">
                      <div>
                        <dt className="text-[#5f574c]">Clinical review</dt>
                        <dd className="mt-1">{profile.oversightLabel}</dd>
                      </div>
                      <div>
                        <dt className="text-[#5f574c]">Assessment format</dt>
                        <dd className="mt-1">{profile.format}</dd>
                      </div>
                      <div>
                        <dt className="text-[#5f574c]">Results & follow-up</dt>
                        <dd className="mt-1 leading-6">
                          {profile.resultsIncluded.join(" · ") ||
                            "Not publicly confirmed"}
                        </dd>
                      </div>
                    </dl>
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-[#d8cebf] pt-3">
                      <Link
                        href={`/facility/${profile.facility.slug}`}
                        className="inline-flex min-h-11 items-center text-sm font-semibold underline-offset-4 hover:underline"
                      >
                        View clinic →
                      </Link>
                      <span className="text-xs text-[#5f574c]">
                        {profile.verificationLabel}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="border border-[#d8cebf] bg-[#f4efe6] p-8 text-sm leading-7 text-[#5f574c]">
              No clinics currently match every selected filter. Clear one or
              more filters to broaden the comparison.
            </div>
          )}
        </div>
      </section>

      <section
        id="how-to-compare"
        className="bg-[#fbf8f1] px-5 py-12 sm:px-6 sm:py-16"
      >
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[#6f6048]">
              What belongs here
            </p>
            <h2 className="font-serif text-4xl font-normal leading-tight tracking-[-0.045em] sm:text-5xl">
              Diagnostics before optimisation.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-[#5f574c]">
            <p>
              Longevity becomes useful when objective measurements help
              establish a baseline, identify priorities and guide an appropriate
              next step. The test itself is not the outcome.
            </p>
            <p>
              Well+ separates diagnostics from general wellness treatments. A
              clinic belongs here when it offers meaningful screening, testing,
              medical imaging or clinician-led assessment—not because it also
              offers IV therapy, red light, HBOT or recovery treatments.
            </p>
            <p>
              Results should be interpreted in context. Screening can produce
              false-positive, false-negative or incidental findings, so more
              tests are not automatically better and concerning symptoms should
              follow an appropriate medical pathway.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#29241d] px-5 py-14 text-[#fbf8f1] sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[#d8cebf]">
              Before booking
            </p>
            <h2 className="font-serif text-4xl font-normal leading-tight tracking-[-0.045em] sm:text-5xl">
              Compare what happens after the test.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Who selects, reviews and explains the tests?",
              "Do you receive the full results and a written report?",
              "Which findings lead to action, repeat testing or referral?",
              "Can future results be compared using the same method?",
            ].map((item) => (
              <div
                key={item}
                className="border border-[#fbf8f1]/14 p-5 text-sm leading-7 text-[#fbf8f1]/78"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="surface-band-stone px-5 py-12 sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[#6f6048]">
              The Well+ role
            </p>
            <h2 className="font-serif text-4xl font-normal leading-tight tracking-[-0.045em]">
              Understand what to measure before choosing where.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/editorial"
              className="surface-paper-strong rounded-[1rem] p-6 transition hover:bg-[#f5f0e7]"
            >
              <h3 className="font-serif text-2xl font-normal">
                Testing and tracking guides
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#5f574c]">
                Editorial explaining what different assessments can and cannot
                tell you.
              </p>
            </Link>
            <Link
              href="/editorial-standards"
              className="surface-paper-strong rounded-[1rem] p-6 transition hover:bg-[#f5f0e7]"
            >
              <h3 className="font-serif text-2xl font-normal">
                How Well+ handles health claims
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#5f574c]">
                Our approach to evidence, uncertainty and medical-adjacent
                services.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
