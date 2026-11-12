"use client";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import SaveVenueButton from "@/components/SaveVenueButton";
import { normaliseSessionFormat } from "@/lib/comparison-values";
import { venuePrice } from "@/lib/venue-pricing";
import { trackEvent } from "@/lib/analytics";
import { getUsefulServiceLabels } from "@/lib/discovery-labels";
import { cleanValue } from "@/lib/useful-values";
import { formatDistance } from "@/lib/geo";

export type FacilityCardFacility = {
  slug: string;
  name: string;
  description: string;
  website?: string;
  businessName?: string;
  brandOperator?: string;
  address?: string;
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
  priceNotes?: string;
  goodToKnow?: string;
  bookingLink?: string;
  sessionDuration?: string;
  privateOrShared?: string;
  beginnerFriendly?: string;
  premiumLevel?: string;
  nearestStation?: string;
  venueType?: string;
  lastCheckedDate?: string;
  verificationStatus?: string;
  openingHours?: string;
  bookingRequired?: string;
  saunaType?: string[];
  coldPlungeType?: string;
  cryoType?: string;
  contrastTherapyAvailable?: string;
  guidedSessionsAvailable?: string;
  towelsIncluded?: string;
  showersAvailable?: string;
  changingRooms?: string;
  postcode?: string;
  latitude?: number;
  longitude?: number;
};

type FacilityCardProps = {
  facility: FacilityCardFacility;
  source?: string;
  compact?: boolean;
  prioritisedService?: string;
  showSaveButton?: boolean;
  distanceKm?: number;
  variant?: "feature" | "directory";
  compareWithSlugs?: string[];
};

export default function FacilityCard({
  facility,
  source = "directory",
  compact = false,
  prioritisedService,
  showSaveButton = true,
  distanceKm,
  variant = "directory",
  compareWithSlugs = [],
}: FacilityCardProps) {
  const location =
    cleanValue(facility.neighbourhood) ||
    cleanValue(facility.location) ||
    "London";
  const services = getUsefulServiceLabels(
    facility.services,
    prioritisedService,
    2,
  );
  const photo = facility.imageUrl || facility.galleryImages?.[0]?.url;
  const price = venuePrice(facility);
  const access = cleanValue(facility.accessType);
  const format = cleanValue(normaliseSessionFormat(facility.privateOrShared));
  const duration = cleanValue(facility.sessionDuration);
  const comparisonSlugs = [facility.slug, ...compareWithSlugs.filter((slug) => slug !== facility.slug)].slice(0, 4);
  const compareHref = `/compare?venues=${encodeURIComponent(comparisonSlugs.join(","))}`;
  const date = facility.lastCheckedDate && new Date(facility.lastCheckedDate);
  const checked =
    date && !Number.isNaN(date.getTime())
      ? new Intl.DateTimeFormat("en-GB", {
          month: "short",
          year: "numeric",
          timeZone: "UTC",
        }).format(date)
      : "";
  function trackClick() {
    trackEvent("listing_card_click", {
      facility_name: facility.name,
      facility_slug: facility.slug,
      service_type: source,
      neighbourhood: location,
      page_path: window.location.pathname,
    });
  }
  return (
    <article
      className={`venue-card flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#d8cebf] bg-[#fbf8f1] ${compact ? "text-sm" : "text-base"}`}
    >
      {variant === "feature" && photo ? (
        <Link
          href={`/facility/${facility.slug}`}
          onClick={trackClick}
          aria-label={`View ${facility.name}`}
          className="relative block aspect-[4/3] overflow-hidden"
        >
          <SafeImage
            src={photo}
            alt={facility.imageAlt || facility.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 hover:scale-[1.025]"
          />
        </Link>
      ) : null}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <Link
            href={`/facility/${facility.slug}`}
            onClick={trackClick}
            className="min-w-0 underline-offset-4 hover:underline"
          >
            <h3 className="font-sans text-xl font-semibold leading-7 tracking-tight">
              {facility.name}
            </h3>
          </Link>
          {showSaveButton ? (
            <SaveVenueButton slug={facility.slug} name={facility.name} />
          ) : null}
        </div>
        <p className="mt-2 text-sm leading-6 text-[#5f574c]">
          {location}
          {distanceKm !== undefined ? ` · ${formatDistance(distanceKm)}` : ""}
        </p>
        <p className="mt-1 text-sm leading-6 text-[#5f574c]">
          {services.join(" · ") ||
            cleanValue(facility.venueType) ||
            "Wellness venue"}
        </p>
        <div className="mt-4 space-y-2 border-t border-[#d8cebf] pt-4 text-sm leading-6">
          <p className="font-semibold text-[#29241d]">{price.label || "Price not yet confirmed"}</p>
          <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-1 text-[#5f574c]">
            <dt className="font-medium">Access</dt>
            <dd className="text-[#29241d]">{access || "Check with venue"}</dd>
            {format ? <><dt className="font-medium">Format</dt><dd className="text-[#29241d]">{format}</dd></> : null}
            {duration ? <><dt className="font-medium">Duration</dt><dd className="text-[#29241d]">{duration}</dd></> : null}
          </dl>
        </div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-[#d8cebf] pt-4">
          <Link
            href={`/facility/${facility.slug}`}
            onClick={trackClick}
            className="inline-flex min-h-11 items-center text-sm font-semibold underline-offset-4 hover:underline"
          >
            View venue →
          </Link>
          <Link
            href={compareHref}
            onClick={() => trackEvent("comparison_cta_click", {
              facility_slug: facility.slug,
              comparison_size: comparisonSlugs.length,
              source: "listing_card",
              page_path: window.location.pathname,
            })}
            className="inline-flex min-h-11 items-center text-sm underline underline-offset-4 hover:no-underline"
            aria-label={`Compare ${facility.name} with other venues`}
          >Compare</Link>
        </div>
        <p className="mt-2 text-xs text-[#5f574c]">{checked ? `Information checked ${checked}` : "Details may need confirmation"}</p>
      </div>
    </article>
  );
}
