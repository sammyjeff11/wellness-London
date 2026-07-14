"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import FacilityCard from "@/components/FacilityCard";
import type { AirtableFacility } from "@/lib/airtable";
import { dedupeFacilities } from "@/lib/dedupe-facilities";
import { toDirectoryFacility } from "@/lib/facility-presenters";

const needs = [
  { value: "all", label: "All clinics" },
  { value: "comprehensive", label: "Comprehensive assessment" },
  { value: "imaging", label: "Imaging & screening" },
  { value: "performance", label: "Fitness & metabolic" },
  { value: "specific", label: "Specific testing" },
  { value: "ongoing", label: "Ongoing programme" },
] as const;

const diagnosticFilters = [
  { value: "all", label: "All diagnostics" },
  { value: "screening", label: "Health screening" },
  { value: "dexa", label: "DEXA" },
  { value: "vo2", label: "VO₂ max" },
  { value: "blood", label: "Blood biomarkers" },
  { value: "imaging", label: "MRI / imaging" },
  { value: "cardiovascular", label: "Cardiovascular" },
  { value: "genetics", label: "Genetics / biological age" },
] as const;

const oversightFilters = [
  { value: "all", label: "Any clinical model" },
  { value: "doctor", label: "Doctor-led" },
  { value: "clinician", label: "Clinician-led" },
  { value: "testing", label: "Testing with review" },
] as const;

const priceFilters = [
  { value: "all", label: "Any price" },
  { value: "under-500", label: "Under £500" },
  { value: "500-1500", label: "£500–£1,500" },
  { value: "1500-plus", label: "£1,500+" },
] as const;

type Need = (typeof needs)[number]["value"];
type Diagnostic = (typeof diagnosticFilters)[number]["value"];
type Oversight = (typeof oversightFilters)[number]["value"];
type Price = (typeof priceFilters)[number]["value"];

type ClinicProfile = {
  facility: AirtableFacility;
  need: Exclude<Need, "all">;
  clinicType: string;
  oversight: Exclude<Oversight, "all">;
  oversightLabel: string;
  diagnostics: Exclude<Diagnostic, "all">[];
  diagnosticLabels: string[];
  featuredServiceLabels: string[];
  format: "One-off" | "Ongoing" | "Both";
  priceBand: Exclude<Price, "all"> | "unknown";
  bestFor: string;
  verified: boolean;
};

function searchableText(facility: AirtableFacility) {
  return [facility.name, facility.description, facility.editorialSummary, facility.editorialVerdict, facility.venueTypeStandardized, facility.primaryService, ...(facility.secondaryServices || []), ...(facility.serviceNames || []), ...(facility.servicesOffered || []), ...(facility.activityCategories || []), ...(facility.activityTagsStandardized || []), ...(facility.activityDisplayLabels || []), ...(facility.themeTagsStandardized || []), ...(facility.bestFor || []), ...(facility.bestForStandardized || []), ...(facility.typeOfExperience || [])].filter(Boolean).join(" ").toLowerCase();
}

function containsAny(text: string, terms: string[]) { return terms.some((term) => text.includes(term)); }

function deriveDiagnostics(text: string) {
  const diagnostics: Exclude<Diagnostic, "all">[] = [];
  const labels: string[] = [];
  const featured: string[] = [];
  const add = (value: Exclude<Diagnostic, "all">, label: string, isFeatured = false) => {
    if (!diagnostics.includes(value)) diagnostics.push(value);
    if (!labels.includes(label)) labels.push(label);
    if (isFeatured && !featured.includes(label)) featured.push(label);
  };
  if (containsAny(text, ["health screening", "health assessment", "executive health", "full health check", "preventative health", "preventive health", "well person screening"])) add("screening", "Health Screening", true);
  if (containsAny(text, ["dexa", "dual-energy x-ray absorptiometry", "body composition scan", "bone density scan"])) add("dexa", "DEXA Scan", true);
  if (containsAny(text, ["vo2 max", "vo₂ max", "vo2max", "cardiorespiratory fitness", "cpet"])) add("vo2", "VO₂ Max Testing", true);
  if (containsAny(text, ["blood test", "blood testing", "biomarker", "blood panel"])) add("blood", "Blood Biomarkers");
  if (containsAny(text, ["mri", "ct scan", "medical imaging", "ultrasound", "full body scan"])) add("imaging", "Medical Imaging");
  if (containsAny(text, ["cardiovascular", "cardiac", "ecg", "heart screening"])) add("cardiovascular", "Cardiovascular Screening");
  if (containsAny(text, ["genetic", "genomic", "epigenetic", "biological age"])) add("genetics", "Genetics / Biological Age");
  return { diagnostics, labels: [...featured, ...labels.filter((label) => !featured.includes(label))], featured };
}

function parsePrice(value: string) { const matches = value.match(/[\d,]+/g); return matches?.length ? Number(matches[0].replace(/,/g, "")) : undefined; }

function profileClinic(facility: AirtableFacility): ClinicProfile {
  const text = searchableText(facility);
  const { diagnostics, labels, featured } = deriveDiagnostics(text);
  const ongoing = containsAny(text, ["membership", "annual programme", "ongoing", "repeat testing", "follow-up programme"]);
  const oneOff = containsAny(text, ["assessment", "screening", "scan", "test", "consultation"]);
  let need: ClinicProfile["need"] = "specific";
  let clinicType = "Specialist testing provider";
  let bestFor = "A focused test or defined health question";
  if (containsAny(text, ["comprehensive health", "executive health", "full health assessment", "longevity assessment"])) { need = "comprehensive"; clinicType = "Comprehensive longevity clinic"; bestFor = "Building a broad preventative-health baseline"; }
  else if (containsAny(text, ["mri", "ct scan", "medical imaging", "full body scan", "cancer screening"])) { need = "imaging"; clinicType = "Imaging and screening provider"; bestFor = "Advanced screening and structural investigation"; }
  else if (containsAny(text, ["vo2 max", "vo₂ max", "dexa", "resting metabolic rate", "performance testing"])) { need = "performance"; clinicType = "Performance diagnostics clinic"; bestFor = "Fitness, body composition and metabolic insight"; }
  else if (ongoing) { need = "ongoing"; clinicType = "Ongoing longevity programme"; bestFor = "Repeat testing and longer-term clinical support"; }
  let oversight: ClinicProfile["oversight"] = "testing";
  let oversightLabel = "Testing with clinical review";
  if (containsAny(text, ["doctor-led", "physician-led", "medical director", "doctor consultation", "consultant physician"])) { oversight = "doctor"; oversightLabel = "Doctor-led"; }
  else if (containsAny(text, ["clinician-led", "clinical team", "nurse-led", "physiologist"])) { oversight = "clinician"; oversightLabel = "Clinician-led"; }
  const price = parsePrice(`${facility.priceFrom} ${facility.priceNotes} ${facility.overallPriceRange}`);
  const priceBand: ClinicProfile["priceBand"] = price === undefined ? "unknown" : price < 500 ? "under-500" : price < 1500 ? "500-1500" : "1500-plus";
  return { facility, need, clinicType, oversight, oversightLabel, diagnostics, diagnosticLabels: labels.length ? labels : ["Clinical Assessment"], featuredServiceLabels: featured, format: ongoing && oneOff ? "Both" : ongoing ? "Ongoing" : "One-off", priceBand, bestFor, verified: Boolean(facility.lastCheckedDate || facility.verificationStatus) };
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: readonly { value: string; label: string }[] }) {
  return <label className="block"><span className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-[#6f6048]">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="w-full border border-[#cfc3b2] bg-[#fbf8f1] px-4 py-3 text-sm outline-none focus:border-[#29241d]">{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>;
}

export default function LongevityDirectoryPage({ facilities }: { facilities: AirtableFacility[] }) {
  const [need, setNeed] = useState<Need>("all");
  const [diagnostic, setDiagnostic] = useState<Diagnostic>("all");
  const [oversight, setOversight] = useState<Oversight>("all");
  const [price, setPrice] = useState<Price>("all");
  const profiles = useMemo(() => facilities.map(profileClinic), [facilities]);
  const filteredProfiles = useMemo(() => profiles.filter((profile) => (need === "all" || profile.need === need) && (diagnostic === "all" || profile.diagnostics.includes(diagnostic)) && (oversight === "all" || profile.oversight === oversight) && (price === "all" || profile.priceBand === price)), [profiles, need, diagnostic, oversight, price]);
  const directoryFacilities = dedupeFacilities(filteredProfiles.map((profile) => toDirectoryFacility(profile.facility)));
  const visibleProfiles = directoryFacilities.map((directoryFacility) => profiles.find((profile) => profile.facility.slug === directoryFacility.slug)).filter(Boolean) as ClinicProfile[];
  const hasFilters = need !== "all" || diagnostic !== "all" || oversight !== "all" || price !== "all";

  return <main className="bg-[#fbf8f1] text-[#29241d]">
    <section className="px-5 pb-10 pt-8 sm:px-6 sm:py-20 md:py-24"><div className="mx-auto max-w-6xl"><p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[#6f6048] sm:text-[11px]">Preventative health and diagnostics</p><h1 className="max-w-5xl font-serif text-[2.7rem] font-normal leading-[0.92] tracking-[-0.05em] sm:text-6xl md:text-8xl">Longevity clinics in London.</h1><p className="mt-6 max-w-3xl text-base leading-7 text-[#5f574c] sm:text-lg sm:leading-8">Compare medical assessments, advanced diagnostics, preventative screening and clinician-led longevity programmes by what they test, who reviews the results and what happens next.</p><div className="mt-7 flex flex-wrap gap-3"><a href="#clinics" className="rounded-full bg-[#29241d] px-5 py-3 text-sm text-[#fbf8f1]">Compare clinics</a><a href="#how-to-compare" className="rounded-full border border-[#b8aa96] px-5 py-3 text-sm">How to compare</a></div></div></section>
    <section id="how-to-compare" className="border-y border-[#d8cebf] bg-[#f4efe6] px-5 py-10 sm:px-6 sm:py-14"><div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.78fr_1.22fr]"><div><p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">What belongs here</p><h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl">Measure first. Then decide what to improve.</h2></div><div className="space-y-5 text-base leading-8 text-[#5f574c]"><p>Longevity clinics use medical expertise and objective testing to build a clearer picture of current health. The focus is on establishing a baseline, identifying potential risk and interpreting results before recommending a plan.</p><p>This directory only includes providers with a meaningful diagnostics, screening or clinician-led assessment offer. Sauna, cold therapy, red light, HBOT or IV therapy alone do not qualify a venue.</p></div></div></section>
    <section id="clinics" className="scroll-mt-24 px-5 py-12 sm:px-6 md:py-20"><div className="mx-auto max-w-6xl"><div className="mb-8 max-w-3xl"><p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">London directory</p><h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl">Compare longevity clinics.</h2><p className="mt-4 text-sm leading-7 text-[#5f574c] sm:text-base">Start with what you need. Then narrow by clinical model, diagnostics and likely investment.</p></div><div className="mb-10 grid gap-4 border border-[#d8cebf] bg-[#f4efe6] p-5 sm:grid-cols-2 lg:grid-cols-4"><FilterSelect label="I am looking for" value={need} onChange={(value) => setNeed(value as Need)} options={needs} /><FilterSelect label="Diagnostic" value={diagnostic} onChange={(value) => setDiagnostic(value as Diagnostic)} options={diagnosticFilters} /><FilterSelect label="Clinical model" value={oversight} onChange={(value) => setOversight(value as Oversight)} options={oversightFilters} /><FilterSelect label="Starting price" value={price} onChange={(value) => setPrice(value as Price)} options={priceFilters} /><div className="flex items-end sm:col-span-2 lg:col-span-4"><p className="text-xs text-[#6f6048]">Showing {visibleProfiles.length} of {profiles.length} verified clinical providers.</p>{hasFilters && <button type="button" onClick={() => { setNeed("all"); setDiagnostic("all"); setOversight("all"); setPrice("all"); }} className="ml-auto text-xs underline underline-offset-4">Clear filters</button>}</div></div>{visibleProfiles.length > 0 ? <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">{visibleProfiles.map((profile) => { const directoryFacility = toDirectoryFacility(profile.facility); const prioritisedServices = Array.from(new Set([...profile.featuredServiceLabels, ...(directoryFacility.services || [])])); return <article key={profile.facility.slug} className="flex flex-col"><div className="mb-3 border border-[#d8cebf] bg-[#f4efe6] p-4"><div className="flex items-start justify-between gap-3"><p className="text-[10px] uppercase tracking-[0.16em] text-[#6f6048]">{profile.clinicType}</p>{profile.verified && <span className="shrink-0 text-[10px] uppercase tracking-[0.14em]">Checked</span>}</div><p className="mt-3 text-sm leading-6"><span className="text-[#6f6048]">Best for:</span> {profile.bestFor}</p><dl className="mt-4 grid grid-cols-2 gap-3 border-t border-[#d8cebf] pt-4 text-xs"><div><dt className="text-[#6f6048]">Clinical model</dt><dd className="mt-1">{profile.oversightLabel}</dd></div><div><dt className="text-[#6f6048]">Format</dt><dd className="mt-1">{profile.format}</dd></div></dl><div className="mt-4 flex flex-wrap gap-2">{profile.diagnosticLabels.slice(0, 5).map((label, index) => <span key={label} className={`rounded-full border px-2.5 py-1 text-[10px] ${index < profile.featuredServiceLabels.length ? "border-[#29241d] bg-[#29241d] text-[#fbf8f1]" : "border-[#cfc3b2]"}`}>{label}</span>)}</div></div><FacilityCard facility={{ ...directoryFacility, services: prioritisedServices }} source="longevity_directory" prioritisedService={profile.featuredServiceLabels[0]} /></article>; })}</div> : <div className="border border-[#d8cebf] bg-[#f4efe6] p-8 text-sm leading-7 text-[#5f574c]">No clinics currently match every selected filter. Clear one or more filters to broaden the comparison.</div>}</div></section>
    <section className="bg-[#29241d] px-5 py-14 text-[#fbf8f1] sm:px-6 md:py-20"><div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr]"><div><p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-[#d8cebf]">Before booking</p><h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl">Compare what happens after the test.</h2></div><div className="grid gap-3 sm:grid-cols-2">{["Who reviews and explains the results?", "Is a written report included?", "Will you receive a personalised plan?", "Are follow-up testing and referrals available?"].map((item) => <div key={item} className="border border-[#fbf8f1]/14 p-5 text-sm leading-7 text-[#fbf8f1]/78">{item}</div>)}</div></div></section>
    <section className="px-5 py-12 sm:px-6 md:py-20"><div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.75fr_1.25fr]"><div><p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">Go deeper</p><h2 className="font-serif text-4xl font-normal leading-tight">Learn before you test.</h2></div><div className="grid gap-4 sm:grid-cols-2"><Link href="/editorial" className="border border-[#d8cebf] bg-[#f4efe6] p-6 transition hover:bg-[#eee7da]"><h3 className="text-xl font-medium">Longevity testing explained</h3><p className="mt-3 text-sm leading-7 text-[#5f574c]">Understand screening, diagnostics, evidence and what different tests can—and cannot—tell you.</p></Link><Link href="/editorial-standards" className="border border-[#d8cebf] bg-[#f4efe6] p-6 transition hover:bg-[#eee7da]"><h3 className="text-xl font-medium">How Well+ handles health claims</h3><p className="mt-3 text-sm leading-7 text-[#5f574c]">How we approach evidence, uncertainty and medical-adjacent services.</p></Link></div></div></section>
  </main>;
}
