"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import TrackedExternalLink from "@/components/TrackedExternalLink";
import { formatFullAddress } from "@/lib/facility-formatting";
import { cleanValue, isUsefulValue } from "@/lib/useful-values";

type VenueLocationSectionProps = {
  name: string;
  slug: string;
  address?: string;
  postcode?: string;
  neighbourhood?: string;
  borough?: string;
  areaOfLondon?: string;
  nearestStation?: string;
  directionsHref?: string;
  appleMapsHref?: string;
};

function buildMapPreviewUrl(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export default function VenueLocationSection(props: VenueLocationSectionProps) {
  const {
    name,
    slug,
    address,
    postcode,
    neighbourhood,
    borough,
    areaOfLondon,
    nearestStation,
    directionsHref,
    appleMapsHref,
  } = props;

  const [isMapActive, setIsMapActive] = useState(false);

  const locationLabel =
    [cleanValue(neighbourhood), cleanValue(borough) || cleanValue(areaOfLondon)]
      .filter(isUsefulValue)
      .join(" / ") || "London";

  const fullAddress = formatFullAddress(
    cleanValue(address),
    cleanValue(postcode),
  );
  const cleanNearestStation = cleanValue(nearestStation);

  const mapQuery = [name, fullAddress, "London"]
    .filter(isUsefulValue)
    .join(" ");

  const mapSrc = useMemo(() => buildMapPreviewUrl(mapQuery), [mapQuery]);

  const resolvedAppleMapsHref =
    appleMapsHref ||
    `https://maps.apple.com/?q=${encodeURIComponent(mapQuery)}`;

  const claimHref = `/claim-listing?venue=${encodeURIComponent(name)}&url=${encodeURIComponent(`/facility/${slug}`)}`;

  return (
    <section className="editorial-shell grid gap-6 border-t border-[#d8cebf] py-8 sm:grid-cols-2 sm:py-10">
      <div>
        <h2 className="text-3xl sm:text-4xl">Location & arrival</h2>
        <p className="mt-4 text-base leading-7">
          {fullAddress || locationLabel}
        </p>
        {cleanNearestStation ? (
          <p className="mt-2 text-sm text-[#5f574c]">
            Nearest station: {cleanNearestStation}
          </p>
        ) : null}
        <div className="mt-4 flex flex-wrap gap-4">
          {directionsHref ? (
            <TrackedExternalLink
              href={directionsHref}
              eventName="map_click"
              properties={{
                facility_slug: slug,
                cta_type: "google_maps_location_module",
              }}
              className="inline-flex min-h-11 items-center text-sm font-medium underline"
            >
              Google Maps ↗
            </TrackedExternalLink>
          ) : null}
          <TrackedExternalLink
            href={resolvedAppleMapsHref}
            eventName="map_click"
            properties={{
              facility_slug: slug,
              cta_type: "apple_maps_location_module",
            }}
            className="inline-flex min-h-11 items-center text-sm underline"
          >
            Apple Maps ↗
          </TrackedExternalLink>
        </div>
        <Link
          href={claimHref}
          className="mt-4 inline-flex min-h-11 items-center text-sm text-[#5f574c] underline"
        >
          Claim or update this listing
        </Link>
      </div>
      <div className="relative min-h-60 overflow-hidden rounded-xl border border-[#d8cebf] bg-[#e7ddcf]">
        {isMapActive ? (
          <iframe
            title={`${name} map`}
            src={mapSrc}
            className="h-64 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsMapActive(true)}
            className="flex min-h-60 w-full flex-col items-center justify-center gap-3 p-6"
          >
            <span className="text-sm text-[#5f574c]">
              Map of {locationLabel}
            </span>
            <span className="rounded-full bg-[#29241d] px-5 py-3 text-sm text-[#fbf8f1]">
              Load Google map
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
