"use client";

import Image from "next/image";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { getLocationHubHref } from "@/lib/location-hubs";

export type FacilityCardFacility = {
  slug: string;
  name: string;
  description: string;
  website?: string;
  imageUrl?: string;
  imageAlt?: string;
  galleryImages?: { url: string; filename?: string }[];
  location?: string;
  neighbourhood?: string;
  areaOfLondon?: string;
  areaGroup?: string;
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

const broadAreaLabels = new Set(["central", "north", "south", "east", "west", "central london", "north london", "south london", "east london", "west london"]);

function primaryBestFor(facility: FacilityCardFacility) {
  const value = facility.bestFor?.[0] || facility.experienceType?.[0] || facility.description;
  const operationalValues = new Set(["solo", "private", "shared", "group", "guided"]);
  return operationalValues.has(value.trim().toLowerCase()) ? facility.description : value;
}

function isBroadAreaLabel(value?: string) {
  return value ? broadAreaLabels.has(value.trim().toLowerCase()) : false;
}

function getNeighbourhoodLabel(facility: FacilityCardFacility) {
  if (facility.neighbourhood) return facility.neighbourhood;
  if (facility.location && !isBroadAreaLabel(facility.location)) return facility.location;
  if (facility.nearestStation) return facility.nearestStation;
  return "London";
}

function getAreaLabel(facility: FacilityCardFacility) {
  return facility.areaOfLondon || facility.areaGroup || (isBroadAreaLabel(facility.location) ? facility.location : undefined) || "London";
}

function getAtmosphericDescriptor(facility: FacilityCardFacility) {
  const searchable = [
    ...(facility.services || []),
    ...(facility.bestFor || []),
    ...(facility.experienceType || []),
    facility.premiumLevel,
    facility.description,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (searchable.includes("bath") || searchable.includes("ritual")) return "Immersive";
  if (searchable.includes("luxury") || searchable.includes("premium")) return "Refined";
  if (searchable.includes("clinical") || searchable.includes("cryo") || searchable.includes("compression")) return "Structured";
  if (searchable.includes("social") || searchable.includes("group")) return "Club-like";
  if (searchable.includes("infrared") || searchable.includes("red light")) return "Contemporary";
  if (searchable.includes("breathwork") || searchable.includes("meditation") || searchable.includes("quiet")) return "Quiet";

  return "Restorative";
}

function formatServiceLine(services?: string[]) {
  if (!services || services.length === 0) return "";
  return services.slice(0, 2).join(" · ");
}

function formatRating(value?: string) {
  if (!value) return "";
  const match = value.match(/\d+(\.\d+)?/);
  return match ? `${match[0]} Google` : value.replace(/\s*\(based on.*?\)\s*/i, " ").trim();
}

export default function FacilityCard({ facility, source = "directory" }: FacilityCardProps) {
  const neighbourhoodLabel = getNeighbourhoodLabel(facility);
  const areaLabel = getAreaLabel(facility);
  const overlayLocation = [neighbourhoodLabel, areaLabel && areaLabel !== neighbourhoodLabel ? areaLabel : undefined].filter(Boolean).join(" / ");
  const atmosphericDescriptor = getAtmosphericDescriptor(facility);
  const locationHref = getLocationHubHref(areaLabel);
  const price = facility.priceFrom || facility.priceRange;
  const serviceLine = formatServiceLine(facility.services);
  const summary = primaryBestFor(facility);
  const rating = formatRating(facility.rating);
  const galleryImages = facility.galleryImages?.slice(0, 4) || [];

  return (
    <article className="group min-w-0 overflow-hidden rounded-[1.4rem] border border-[#d8cebf]/70 bg-[#fbf8f1] shadow-[0_22px_55px_rgba(41,36,29,0.06)] transition duration-500 hover:-translate-y-[2px] hover:shadow-[0_32px_80px_rgba(41,36,29,0.1)]">
      <Link
        href={`/facility/${facility.slug}`}
        className="block min-w-0"
        onClick={() =>
          trackEvent("listing_card_click", {
            facility_name: facility.name,
            facility_slug: facility.slug,
            service_type: source,
            area: areaLabel,
            neighbourhood: neighbourhoodLabel,
            page_path: window.location.pathname,
          })
        }
      >
        <div className="editorial-image relative mb-0 aspect-[4/5] overflow-hidden bg-[#d8cebf]">
          {facility.imageUrl ? (
            <Image
              src={facility.imageUrl}
              alt={facility.imageAlt || facility.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="z-0 object-cover transition duration-1000 group-hover:scale-[1.035]"
            />
          ) : (
            <div className="absolute inset-0 z-0 flex h-full w-full items-end bg-[linear-gradient(135deg,#d8cebf_0%,#b9ab97_50%,#29241d_100%)] p-5">
              <span className="text-sm text-[#fbf8f1]/78">Well+</span>
            </div>
          )}

          <div className="editorial-image-overlay" />
          <div className="editorial-image-grain" />

          <div className="absolute left-5 right-5 top-5 z-10 flex items-start justify-between gap-3">
            {price ? (
              <span className="inline-flex min-h-8 items-center rounded-full bg-[#f8f5ef]/95 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#29241d] shadow-[0_12px_28px_rgba(0,0,0,0.16)] backdrop-blur-sm">
                {price}
              </span>
            ) : (
              <span />
            )}

            {galleryImages.length > 1 ? (
              <span className="inline-flex min-h-8 items-center rounded-full bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/88 backdrop-blur-sm">
                {galleryImages.length} views
              </span>
            ) : null}
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-10 p-5 text-white sm:p-7">
            <p className="mb-2 text-[10px] uppercase leading-5 tracking-[0.22em] text-white/72">
              {overlayLocation || "London"}
            </p>

            <h3 className="min-h-[5.8rem] max-w-[90%] font-serif text-[2.2rem] font-normal leading-[0.94] tracking-[-0.045em] text-white [text-shadow:0_3px_22px_rgb(0_0_0_/_0.62)] line-clamp-2 sm:min-h-[6.4rem] sm:text-[2.6rem]">
              {facility.name}
            </h3>

            <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-[#e7dccd]/78">
              {atmosphericDescriptor}
            </p>
          </div>
        </div>
      </Link>

      {galleryImages.length > 1 ? (
        <div className="-mx-0 flex gap-2 overflow-x-auto border-t border-[#d8cebf]/50 bg-[#f6f1e8] px-3 py-3">
          {galleryImages.slice(1, 4).map((image, index) => (
            <div
              key={`${image.url}-${index}`}
              className="editorial-image relative aspect-[4/5] min-w-[5.5rem] overflow-hidden rounded-[0.9rem] bg-[#d8cebf] sm:min-w-[6.5rem]"
            >
              <Image
                src={image.url}
                alt={image.filename || `${facility.name} gallery image ${index + 2}`}
                fill
                sizes="120px"
                className="object-cover"
              />
              <div className="editorial-image-overlay opacity-60" />
            </div>
          ))}
        </div>
      ) : null}

      <div className="px-5 py-6 sm:px-6 sm:py-7">
        <p className="mb-6 text-[15px] leading-7 text-[#5f574c] line-clamp-2">
          {summary}
        </p>

        <div className="border-t border-[#d8cebf]/45 pt-4 text-[12px] leading-6 tracking-[0.02em] text-[#756957]">
          {serviceLine ? <p className="mb-1">{serviceLine}</p> : null}

          <p>
            <Link href={locationHref || "#"} className={locationHref ? "underline-offset-4 hover:text-[#29241d] hover:underline" : "pointer-events-none"}>
              {areaLabel}
            </Link>
            {rating ? <span className="mx-2 text-[#c1b3a1]">·</span> : null}
            {rating ? <span>{rating}</span> : null}
          </p>
        </div>
      </div>
    </article>
  );
}
