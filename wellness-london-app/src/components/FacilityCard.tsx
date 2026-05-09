"use client";

import Image from "next/image";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

export type FacilityCardFacility = {
  slug: string;
  name: string;
  description: string;
  website?: string;
  imageUrl?: string;
  imageAlt?: string;
  location?: string;
  services?: string[];
  priceRange?: string;
  rating?: string;
  accessType?: string;
  bestFor?: string[];
  experienceType?: string[];
  priceFrom?: string;
  privateOrShared?: string;
  beginnerFriendly?: string;
  premiumLevel?: string;
  nearestStation?: string;
  lastCheckedDate?: string;
  verificationStatus?: string;
};

type FacilityCardProps = {
  facility: FacilityCardFacility;
  source?: string;
};

function displayDate(value?: string) {
  if (!value || value === "Details not yet confirmed") return "Details not yet confirmed";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

function primaryBestFor(facility: FacilityCardFacility) {
  return facility.bestFor?.[0] || facility.experienceType?.[0] || facility.description;
}

function verificationLabel(value?: string) {
  return value || "Unverified listing";
}

export default function FacilityCard({ facility, source = "directory" }: FacilityCardProps) {
  const services = facility.services?.slice(0, 3) || [];
  const location = [facility.location, facility.nearestStation].filter(Boolean).join(" / ");
  const price = facility.priceFrom || facility.priceRange || "Price not listed";
  const experience = [facility.privateOrShared, facility.premiumLevel, facility.beginnerFriendly === "Yes" ? "Beginner-friendly" : ""]
    .filter(Boolean)
    .join(" / ");

  return (
    <article className="group overflow-hidden rounded-2xl border border-stone-200 bg-[#fffdf8] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-stone-300/40">
      <Link
        href={`/facility/${facility.slug}`}
        className="block"
        onClick={() => trackEvent("listing_card_click", {
          facility_name: facility.name,
          facility_slug: facility.slug,
          service_type: source,
          area: facility.location,
          page_path: window.location.pathname,
        })}
      >
        <div className="relative h-60 overflow-hidden bg-stone-200">
          {facility.imageUrl ? (
            <Image
              src={facility.imageUrl}
              alt={facility.imageAlt || facility.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-end bg-[#ded6c8] p-5">
              <span className="text-sm font-medium text-stone-600">
                Wellness London
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
          <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3">
            <span title="Details checked means publicly available information has been reviewed. Facility verified means the venue has confirmed key details directly." className="rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
              {verificationLabel(facility.verificationStatus)}
            </span>
            {facility.rating ? (
              <span className="rounded-full bg-[#f8f5ef] px-3 py-1 text-xs font-semibold text-[#211d18]">
                {facility.rating}
              </span>
            ) : null}
          </div>
          {location ? (
            <p className="absolute bottom-4 left-4 text-xs font-medium uppercase tracking-[0.18em] text-white/90">
              {location}
            </p>
          ) : null}
        </div>

        <div className="p-5">
          <div className="mb-3 flex flex-wrap gap-2">
            {services.map((service) => (
              <span
                key={service}
                className="rounded-full border border-stone-200 px-3 py-1 text-xs text-stone-600"
              >
                {service}
              </span>
            ))}
          </div>

          <h3 className="mb-2 text-xl font-semibold tracking-tight text-[#211d18]">
            {facility.name}
          </h3>
          <p className="mb-4 text-sm leading-6 text-stone-600">
            <span className="font-semibold text-[#211d18]">Best for: </span>
            {primaryBestFor(facility)}
          </p>

          <dl className="mb-5 grid gap-3 border-y border-stone-200 py-4 text-xs text-stone-600">
            <div className="flex items-center justify-between gap-4">
              <dt className="uppercase tracking-[0.16em] text-stone-400">Price from</dt>
              <dd className="max-w-[65%] truncate text-right font-medium text-[#211d18]">{price}</dd>
            </div>
            {experience ? (
              <div className="flex items-center justify-between gap-4">
                <dt className="uppercase tracking-[0.16em] text-stone-400">Experience</dt>
                <dd className="max-w-[65%] truncate text-right font-medium text-[#211d18]">{experience}</dd>
              </div>
            ) : null}
            <div className="flex items-center justify-between gap-4">
              <dt className="uppercase tracking-[0.16em] text-stone-400">Checked</dt>
              <dd className="max-w-[65%] truncate text-right font-medium text-[#211d18]">{displayDate(facility.lastCheckedDate)}</dd>
            </div>
          </dl>

          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-[#211d18]">View details</span>
            <span aria-hidden="true" className="text-stone-500 transition group-hover:translate-x-1">
              -&gt;
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
