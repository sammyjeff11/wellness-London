"use client";

import { useState } from "react";
import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { canonicaliseServiceList, canonicalServiceHref } from "@/lib/taxonomy";

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

const broadAreaLabels = new Set(["central", "north", "south", "east", "west", "central london", "north london", "south london", "east london", "west london"]);

const pricePillClass = "inline-flex min-h-8 items-center rounded-full bg-[#fbf8f1]/92 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#29241d] shadow-[0_12px_28px_rgba(0,0,0,0.14)] backdrop-blur-sm";

function primaryBestFor(facility: FacilityCardFacility) {
  const value = facility.bestFor?.[0] || facility.description;
  const operationalValues = new Set(["solo", "private", "shared", "group", "guided"]);
  return operationalValues.has(value.trim().toLowerCase()) ? facility.description : value;
}

function conciseSummary(facility: FacilityCardFacility, serviceLine: string) {
  const summary = primaryBestFor(facility).trim();
  const fallback = serviceLine ? `${facility.name} offers ${serviceLine.toLowerCase()} in ${getNeighbourhoodLabel(facility)}.` : facility.description;
  const value = summary || fallback;
  return value.length > 118 ? `${value.slice(0, 115).trim()}…` : value;
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

function getCanonicalServices(services?: string[]) {
  return canonicaliseServiceList(services).slice(0, 3);
}

function formatServiceLine(services?: string[]) {
  return getCanonicalServices(services).join(" · ");
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

function cleanDetailValue(value?: string) {
  if (!value) return "";
  const trimmed = value.trim();
  const lower = trimmed.toLowerCase();
  if (["n/a", "na", "unknown", "not specified", "not available", "none"].includes(lower)) return "";
  return trimmed;
}

function formatBeginnerFriendly(value?: string) {
  const cleaned = cleanDetailValue(value);
  if (!cleaned) return "";
  const lower = cleaned.toLowerCase();
  if (["yes", "true", "y"].includes(lower)) return "Beginner-friendly";
  if (["no", "false", "n"].includes(lower)) return "Advanced";
  return cleaned;
}

function getComparisonDetails(facility: FacilityCardFacility) {
  const priorityDetails = [
    cleanDetailValue(facility.privateOrShared),
    formatBeginnerFriendly(facility.beginnerFriendly),
    cleanDetailValue(facility.venueType),
  ];
  const accessDetail = cleanDetailValue(facility.accessType);
  const uniquePriorityDetails = Array.from(new Set(priorityDetails.filter(Boolean)));
  const details = accessDetail && uniquePriorityDetails.length > 0 ? [...uniquePriorityDetails, accessDetail] : uniquePriorityDetails;

  return details.length >= 2 ? details.slice(0, 2) : [];
}

function getCardImages(facility: FacilityCardFacility) {
  const images = facility.galleryImages?.filter((image) => image.url) || [];
  if (images.length > 0) return images.slice(0, 5);
  return facility.imageUrl ? [{ url: facility.imageUrl, filename: facility.imageAlt || facility.name }] : [];
}

export default function FacilityCard({ facility, source = "directory", compact = false }: FacilityCardProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const neighbourhoodLabel = getNeighbourhoodLabel(facility);
  const areaLabel = getAreaLabel(facility);
  const locationLine = [neighbourhoodLabel, areaLabel && areaLabel !== neighbourhoodLabel ? areaLabel : undefined].filter(Boolean).join(" · ");
  const price = formatPrice(facility.priceRange || facility.priceFrom);
  const serviceLabels = getCanonicalServices(facility.services);
  const serviceLine = serviceLabels.join(" · ");
  const summary = conciseSummary(facility, serviceLine);
  const rating = formatRating(facility.rating);
  const cardImages = getCardImages(facility);
  const activeImage = cardImages[activeImageIndex] || cardImages[0];
  const cardHref = `/facility/${facility.slug}`;
  const imageAspect = compact ? "aspect-[1.04/1]" : "aspect-[1.08/1]";
  const comparisonDetails = getComparisonDetails(facility);

  const trackCardClick = () =>
    trackEvent("listing_card_click", {
      facility_name: facility.name,
      facility_slug: facility.slug,
      service_type: source,
      area: areaLabel,
      neighbourhood: neighbourhoodLabel,
      page_path: window.location.pathname,
    });

  function showPreviousImage() {
    setActiveImageIndex((index) => (index - 1 + cardImages.length) % cardImages.length);
  }

  function showNextImage() {
    setActiveImageIndex((index) => (index + 1) % cardImages.length);
  }

  return (
    <article className="group min-w-0 overflow-hidden bg-transparent">
      <div className={`relative overflow-hidden rounded-[1.45rem] bg-[#d8cebf] ${imageAspect}`}>
        {cardImages.length > 0 ? (
          <>
            <Link href={cardHref} aria-label={`View ${facility.name}`} onClick={trackCardClick} className="absolute inset-0 block">
              <SafeImage src={activeImage.url} alt={activeImage.filename || facility.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.025]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/24 via-transparent to-black/8" />
            </Link>

            <div className="pointer-events-none absolute left-4 right-4 top-4 z-10 flex items-start justify-between gap-3">
              {price ? <span className={pricePillClass}>{price}</span> : <span />}
            </div>

            {cardImages.length > 1 ? (
              <>
                <button type="button" onClick={showPreviousImage} className="absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-[#fbf8f1]/92 px-3 py-2 text-sm text-[#29241d] opacity-0 shadow-[0_8px_22px_rgba(41,36,29,0.16)] transition hover:bg-white focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#6f6048] group-hover:opacity-100 sm:block" aria-label={`Previous image for ${facility.name}`}>
                  ←
                </button>
                <button type="button" onClick={showNextImage} className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-[#fbf8f1]/92 px-3 py-2 text-sm text-[#29241d] opacity-0 shadow-[0_8px_22px_rgba(41,36,29,0.16)] transition hover:bg-white focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#6f6048] group-hover:opacity-100 sm:block" aria-label={`Next image for ${facility.name}`}>
                  →
                </button>
                <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1.5">
                  {cardImages.slice(0, 5).map((image, index) => (
                    <button key={`${image.url}-dot-${index}`} type="button" onClick={() => setActiveImageIndex(index)} className={`h-1.5 rounded-full transition ${index === activeImageIndex ? "w-4 bg-white" : "w-1.5 bg-white/55 hover:bg-white/85"}`} aria-label={`Show image ${index + 1} for ${facility.name}`} />
                  ))}
                </div>
              </>
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
          <h3 className="min-w-0 truncate text-[1.08rem] font-semibold leading-6 tracking-[-0.02em] text-[#29241d] sm:text-lg">{facility.name}</h3>
          {rating ? <span className="shrink-0 text-sm leading-6 text-[#29241d]">★ {rating}</span> : null}
        </div>
        <p className="mt-0.5 truncate text-[15px] leading-6 text-[#6f6048]">{locationLine || "London"}</p>
      </Link>
      {comparisonDetails.length > 0 ? (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {comparisonDetails.map((detail) => (
            <span key={`${facility.slug}-${detail}`} className="rounded-full border border-[#d8cebf] px-2.5 py-1 text-[11px] leading-4 text-[#5f574c]">
              {detail}
            </span>
          ))}
        </div>
      ) : null}
      {serviceLabels.length > 0 ? (
        <div className="mt-1.5 flex flex-wrap gap-x-1.5 gap-y-1 text-[15px] leading-6 text-[#6f6048]">
          {serviceLabels.map((service, index) => {
            const href = canonicalServiceHref(service);
            return (
              <span key={`${facility.slug}-${service}`} className="inline-flex items-center gap-1.5">
                {href ? (
                  <Link href={href} className="underline-offset-4 hover:text-[#29241d] hover:underline">
                    {service}
                  </Link>
                ) : (
                  <span>{service}</span>
                )}
                {index < serviceLabels.length - 1 ? <span aria-hidden="true">·</span> : null}
              </span>
            );
          })}
        </div>
      ) : null}
      <Link href={cardHref} aria-label={`View ${facility.name}`} onClick={trackCardClick} className="block">
        <p className="mt-1 line-clamp-2 text-sm leading-6 text-[#5f574c]">{summary}</p>
      </Link>
    </article>
  );
}
