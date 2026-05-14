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
  return facility.bestFor?.[0] || facility.experienceType?.[0] || facility.description;
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
  const visible = services.slice(0, 2).join(" · ");
  const hiddenCount = Math.max(services.length - 2, 0);
  return hiddenCount > 0 ? `${visible} · +${hiddenCount}` : visible;
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

  return (
    <article className="group min-w-0">
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
        <div className="relative mb-7 aspect-[4/5] overflow-hidden rounded-md bg-[#d8cebf] shadow-[0_1px_0_rgba(41,36,29,0.12)]">
          {facility.imageUrl ? (
            <Image
              src={facility.imageUrl}
              alt={facility.imageAlt || facility.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.025]"
            />
          ) : (
            <div className="flex h-full w-full items-end bg-[#d8cebf] p-5">
              <span className="text-sm text-[#5f574c]">Well+</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/84 via-black/24 to-black/5" />
          <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/82 via-black/38 to-transparent" />

          <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-3 sm:left-5 sm:right-5 sm:top-5">
            {price ? (
              <span className="inline-flex min-h-8 items-center bg-[#f8f5ef]/95 px-3 py-1 text-[11px] font-medium leading-none tracking-[0.08em] text-[#29241d] shadow-[0_12px_28px_rgba(0,0,0,0.18)] backdrop-blur-sm">
                {price}
              </span>
            ) : (
              <span />
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-6">
            <p className="mb-2 text-[10px] font-medium uppercase leading-5 tracking-[0.22em] text-white/82 [text-shadow:0_2px_14px_rgb(0_0_0_/_0.55)] sm:text-[11px]">
              {overlayLocation || "London"}
            </p>
            <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-[#e7dccd]">
              {atmosphericDescriptor}
            </p>
            <h3 className="max-w-[92%] text-[2.4rem] font-normal leading-[1] tracking-[-0.03em] text-white [text-shadow:0_3px_22px_rgb(0_0_0_/_0.62)] sm:text-[2.8rem]">
              {facility.name}
            </h3>
          </div>
        </div>
      </Link>

      <div className="min-w-0 px-0.5">
        <p className="mb-5 line-clamp-2 max-w-[94%] text-[15px] leading-7 text-[#5f574c]">
          {summary}
        </p>

        <div className="space-y-2 border-t border-[#d8cebf]/55 pt-4 text-[13px] leading-6 text-[#6c6153]">
          {serviceLine ? <p>{serviceLine}</p> : null}
          <p>
            <Link href={locationHref || "#"} className={locationHref ? "underline-offset-4 hover:text-[#29241d] hover:underline" : "pointer-events-none"}>
              {areaLabel}
            </Link>
            {price ? <span className="mx-2 text-[#c1b3a1]">·</span> : null}
            {price ? <span>{price}</span> : null}
            {facility.rating ? <span className="mx-2 text-[#c1b3a1]">·</span> : null}
            {facility.rating ? <span>{facility.rating} Google</span> : null}
          </p>
        </div>
      </div>
    </article>
  );
}
