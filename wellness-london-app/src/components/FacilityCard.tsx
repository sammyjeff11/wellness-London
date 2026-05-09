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
  if (!value || value === "Details not yet confirmed") return "Details pending";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

function primaryBestFor(facility: FacilityCardFacility) {
  return facility.bestFor?.[0] || facility.experienceType?.[0] || facility.description;
}

export default function FacilityCard({ facility, source = "directory" }: FacilityCardProps) {
  const services = facility.services?.slice(0, 2) || [];
  const location = [facility.location, facility.nearestStation].filter(Boolean).join(" / ");
  const price = facility.priceFrom || facility.priceRange || "Price not listed";
  const experience = facility.privateOrShared || facility.premiumLevel || facility.experienceType?.[0] || "Details pending";

  return (
    <article className="group">
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
        <div className="relative mb-5 aspect-[4/5] overflow-hidden bg-[#d8cebf]">
          {facility.imageUrl ? (
            <Image
              src={facility.imageUrl}
              alt={facility.imageAlt || facility.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-end bg-[#d8cebf] p-5">
              <span className="text-sm text-[#70695d]">Well Edit</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          {location ? (
            <p className="absolute bottom-4 left-4 right-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white/90">
              {location}
            </p>
          ) : null}
        </div>

        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            {services.map((service) => (
              <span
                key={service}
                className="text-[11px] uppercase tracking-[0.18em] text-[#6f6048]"
              >
                {service}
              </span>
            ))}
          </div>

          <h3 className="mb-3 font-serif text-3xl font-normal leading-tight tracking-normal text-[#29241d]">
            {facility.name}
          </h3>
          <p className="mb-5 text-[15px] leading-7 text-[#70695d]">
            {primaryBestFor(facility)}
          </p>

          <div className="grid gap-2 border-t border-[#d8cebf]/70 pt-4 text-xs text-[#70695d]">
            <div className="flex items-center justify-between gap-4">
              <span>From</span>
              <span className="text-right text-[#29241d]">{price}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span>Experience</span>
              <span className="max-w-[65%] truncate text-right text-[#29241d]">{experience}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span>Checked</span>
              <span className="text-right text-[#29241d]">{displayDate(facility.lastCheckedDate)}</span>
            </div>
          </div>

          <div className="mt-5 text-sm text-[#29241d]">
            View profile <span aria-hidden="true" className="inline-block transition group-hover:translate-x-1">-&gt;</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
