"use client";

import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { canonicaliseServiceList } from "@/lib/taxonomy";

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
  compact?: boolean;
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

const pricePillClass = "inline-flex min-h-8 items-center rounded-full bg-[#fbf8f1]/92 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#29241d] shadow-[0_12px_28px_rgba(0,0,0,0.14)] backdrop-blur-sm";

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

function formatServiceLine(services?: string[]) {
  if (!services || services.length === 0) return "";
  return canonicaliseServiceList(services).slice(0, 3).join(" · ");
}

function formatRating(value?: string) {
  if (!value) return "";
  const match = value.match(/\d+(\.\d+)?/);
  return match ? `${match[0]}` : value.replace(/\s*\(based on.*?\)\s*/i, " ").trim();
}

function priceScaleFromAmount(amount: number) {
  if (amount <= 25) return "£";
  if (amount <= 50) return "££";
  if (amount <= 100) return "£££";
  return "££££";
}

function formatPrice(value?: string) {
  if (!value) return "";

  const trimmed = value.trim();
  if (trimmed.toLowerCase().includes("pricing requires")) return "";

  const scaleMatch = trimmed.match(/£{1,4}/)?.[0];
  const amountMatch = trimmed.replace(/,/g, "").match(/£\s*(\d+(?:\.\d+)?)/);

  if (amountMatch) return priceScaleFromAmount(Number(amountMatch[1]));
  if (scaleMatch) return scaleMatch;

  return trimmed;
}

function getCardImages(facility: FacilityCardFacility) {
  const images = facility.galleryImages?.filter((image) => image.url) || [];
  if (images.length > 0) return images.slice(0, 5);
  return facility.imageUrl ? [{ url: facility.imageUrl, filename: facility.imageAlt || facility.name }] : [];
}

export default function FacilityCard({ facility, source = "directory", compact = false }: FacilityCardProps) {
  const neighbourhoodLabel = getNeighbourhoodLabel(facility);
  const areaLabel = getAreaLabel(facility);
  const locationLine = [neighbourhoodLabel, areaLabel && areaLabel !== neighbourhoodLabel ? areaLabel : undefined]
    .filter(Boolean)
    .join(" · ");
  const price = formatPrice(facility.priceRange || facility.priceFrom);
  const serviceLine = formatServiceLine(facility.services);
  const summary = primaryBestFor(facility);
  const rating = formatRating(facility.rating);
  const cardImages = getCardImages(facility);

  const cardHref = `/facility/${facility.slug}`;
  const imageAspect = compact ? "aspect-[1.12/1]" : "aspect-[1.18/1]";

  const trackCardClick = () =>
    trackEvent("listing_card_click", {
      facility_name: facility.name,
      facility_slug: facility.slug,
      service_type: source,
      area: areaLabel,
      neighbourhood: neighbourhoodLabel,
      page_path: window.location.pathname,
    });

  return (
    <article className="group min-w-0 overflow-hidden bg-transparent">
      <div className={`relative overflow-hidden rounded-[1.45rem] bg-[#d8cebf] ${imageAspect}`}>
        {cardImages.length > 0 ? (
          <>
            <div className="flex h-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth">
              {cardImages.map((image, index) => (
                <div key={`${image.url}-${index}`} className="relative h-full min-w-full snap-center overflow-hidden">
                  <SafeImage
                    src={image.url}
                    alt={image.filename || facility.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/24 via-transparent to-black/8" />
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute left-4 right-4 top-4 z-10 flex items-start justify-between gap-3">
              {price ? <span className={pricePillClass}>{price}</span> : <span />}
            </div>
            {cardImages.length > 1 ? (
              <div className="pointer-events-none absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1.5">
                {cardImages.slice(0, 5).map((image, index) => (
                  <span
                    key={`${image.url}-dot-${index}`}
                    className={`h-1.5 w-1.5 rounded-full ${index === 0 ? "bg-white" : "bg-white/55"}`}
                  />
                ))}
              </div>
            ) : null}
          </>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(251,248,241,0.68),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(216,206,191,0.58),transparent_28%),linear-gradient(145deg,rgba(244,239,230,0.92),rgba(194,177,153,0.58)_48%,rgba(41,36,29,0.22))]">
            <div className="absolute inset-x-5 top-1/2 h-px bg-[#fbf8f1]/65" />
            <div className="absolute inset-y-5 left-1/2 w-px bg-[#fbf8f1]/45" />
            <div className="absolute left-4 top-4 z-10">{price ? <span className={pricePillClass}>{price}</span> : null}</div>
          </div>
        )}
      </div>

      <Link href={cardHref} aria-label={`View ${facility.name}`} onClick={trackCardClick} className={`block ${compact ? "pt-3" : "pt-4"}`}>
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 text-[1.08rem] font-semibold leading-6 tracking-[-0.02em] text-[#29241d] sm:text-lg">
            {facility.name}
          </h3>
          {rating ? <span className="shrink-0 text-sm leading-6 text-[#29241d]">★ {rating}</span> : null}
        </div>
        <p className="mt-0.5 text-[15px] leading-6 text-[#6f6048]">{locationLine || "London"}</p>
        {serviceLine ? <p className="text-[15px] leading-6 text-[#6f6048]">{serviceLine}</p> : null}
        <p className="mt-1 line-clamp-2 text-sm leading-6 text-[#5f574c]">{summary}</p>
      </Link>
    </article>
  );
}
