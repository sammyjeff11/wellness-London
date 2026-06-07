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
  venueType?: string;
  lastCheckedDate?: string;
  verificationStatus?: string;
};

type FacilityCardProps = {
  facility: FacilityCardFacility;
  source?: string;
};

const broadAreaLabels = new Set([
  "central",
  "north",
  "south",
  "east",
  "west",
  "central london",
  "north london",
  "south london",
  "east london",
  "west london",
]);

const mediaFrameClass = "editorial-image relative aspect-[16/10] min-w-full snap-center overflow-hidden sm:aspect-[4/5]";
const pricePillClass = "inline-flex min-h-8 items-center rounded-full bg-[#f8f5ef]/95 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#29241d] shadow-[0_12px_28px_rgba(0,0,0,0.14)] backdrop-blur-sm";
const mediaLocationClass = "mb-2 text-[9px] uppercase leading-5 tracking-[0.2em] text-white/72 sm:text-[10px] sm:tracking-[0.22em]";
const mediaTitleClass = "max-w-[92%] font-serif text-[1.7rem] font-normal leading-[0.96] tracking-[-0.045em] text-white [text-shadow:0_3px_22px_rgb(0_0_0_/_0.62)] line-clamp-2 sm:min-h-[6.4rem] sm:max-w-[90%] sm:text-[2.6rem]";
const mediaDescriptorClass = "mt-2 text-[9px] uppercase tracking-[0.16em] text-[#e7dccd]/78 sm:mt-3 sm:text-[10px] sm:tracking-[0.18em]";

function primaryBestFor(facility: FacilityCardFacility) {
  const value = facility.bestFor?.[0] || facility.description;
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
  return services.slice(0, 3).join(" · ");
}

function formatRating(value?: string) {
  if (!value) return "";
  const match = value.match(/\d+(\.\d+)?/);
  return match ? `${match[0]} Google` : value.replace(/\s*\(based on.*?\)\s*/i, " ").trim();
}

function formatPrice(value?: string) {
  if (!value) return "";
  if (value.toLowerCase().includes("pricing requires")) return "";
  return value.startsWith("£") ? `From ${value}` : value;
}

export default function FacilityCard({ facility, source = "directory" }: FacilityCardProps) {
  const neighbourhoodLabel = getNeighbourhoodLabel(facility);
  const areaLabel = getAreaLabel(facility);
  const overlayLocation = [neighbourhoodLabel, areaLabel && areaLabel !== neighbourhoodLabel ? areaLabel : undefined]
    .filter(Boolean)
    .join(" / ");
  const atmosphericDescriptor = getAtmosphericDescriptor(facility);
  const price = formatPrice(facility.priceFrom || facility.priceRange);
  const serviceLine = formatServiceLine(facility.services);
  const summary = primaryBestFor(facility);
  const rating = formatRating(facility.rating);

  const galleryImages = facility.galleryImages?.length
    ? facility.galleryImages.slice(0, 5)
    : facility.imageUrl
      ? [{ url: facility.imageUrl, filename: facility.imageAlt || facility.name }]
      : [];

  const cardHref = `/facility/${facility.slug}`;

  return (
    <article className="group relative flex min-w-0 flex-col overflow-hidden rounded-[1.25rem] border border-[#d8cebf]/70 bg-[#fbf8f1] shadow-[0_18px_45px_rgba(41,36,29,0.055)] transition duration-500 hover:-translate-y-[2px] hover:shadow-[0_28px_70px_rgba(41,36,29,0.1)] sm:rounded-[1.4rem]">
      <Link
        href={cardHref}
        className="absolute inset-0 z-20"
        aria-label={`View ${facility.name}`}
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
      />

      <div className="relative overflow-hidden bg-[#d8cebf]">
        <div className="flex snap-x snap-mandatory overflow-x-auto">
          {galleryImages.length > 0 ? (
            galleryImages.map((image, index) => (
              <div key={`${image.url}-${index}`} className={mediaFrameClass}>
                <Image
                  src={image.url}
                  alt={image.filename || facility.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="z-0 object-cover transition duration-1000 group-hover:scale-[1.035]"
                />
                <div className="editorial-image-overlay" />
                <div className="editorial-image-grain" />
                <div className="absolute left-4 right-4 top-4 z-10 flex items-start justify-between gap-3 sm:left-5 sm:right-5 sm:top-5">
                  {price ? <span className={pricePillClass}>{price}</span> : <span />}
                  {galleryImages.length > 1 ? (
                    <span className="inline-flex min-h-8 items-center rounded-full bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/88 backdrop-blur-sm">
                      {index + 1} / {galleryImages.length}
                    </span>
                  ) : null}
                </div>
                <div className="absolute bottom-0 left-0 right-0 z-10 p-4 text-white sm:p-7">
                  <p className={mediaLocationClass}>{overlayLocation || "London"}</p>
                  <h3 className={mediaTitleClass}>{facility.name}</h3>
                  <p className={mediaDescriptorClass}>{atmosphericDescriptor}</p>
                </div>
              </div>
            ))
          ) : (
            <div className={`${mediaFrameClass} bg-[#d8cebf]`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(251,248,241,0.68),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(216,206,191,0.58),transparent_28%),linear-gradient(145deg,rgba(244,239,230,0.92),rgba(194,177,153,0.58)_48%,rgba(41,36,29,0.22))]" />
              <div className="editorial-image-grain" />
              <div className="absolute left-4 right-4 top-4 z-10 flex items-start justify-between gap-3 sm:left-5 sm:right-5 sm:top-5">
                {price ? <span className={pricePillClass}>{price}</span> : <span />}
              </div>
              <div className="absolute inset-x-5 top-1/2 z-0 h-px bg-[#fbf8f1]/65" />
              <div className="absolute inset-y-5 left-1/2 z-0 w-px bg-[#fbf8f1]/45" />
              <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-[#efe6d8]/95 via-[#efe6d8]/70 to-transparent p-4 text-[#29241d] sm:p-7">
                <p className="mb-2 text-[9px] uppercase leading-5 tracking-[0.2em] text-[#70695d] sm:text-[10px] sm:tracking-[0.22em]">{overlayLocation || "London"}</p>
                <h3 className="max-w-[92%] font-serif text-[1.7rem] font-normal leading-[0.96] tracking-[-0.045em] text-[#29241d] line-clamp-2 sm:min-h-[6.4rem] sm:max-w-[90%] sm:text-[2.6rem]">{facility.name}</h3>
                <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-[#756957] sm:mt-3 sm:text-[10px] sm:tracking-[0.18em]">{atmosphericDescriptor}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 py-4 sm:px-6 sm:py-7">
        <p className="mb-5 text-[14px] leading-6 text-[#5f574c] line-clamp-2 sm:mb-6 sm:text-[15px] sm:leading-7">
          {summary}
        </p>
        <div className="mt-auto border-t border-[#d8cebf]/45 pt-4 text-[12px] leading-6 tracking-[0.02em] text-[#756957]">
          {serviceLine ? <p className="mb-1">{serviceLine}</p> : null}
          <p>
            <span>{areaLabel}</span>
            {rating ? <span className="mx-2 text-[#c1b3a1]">·</span> : null}
            {rating ? <span>{rating}</span> : null}
          </p>
        </div>
      </div>
    </article>
  );
}
