"use client";

import { useMemo, useState } from "react";
import TrackedExternalLink from "@/components/TrackedExternalLink";

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

function hasKnownValue(value?: string) {
  if (!value) return false;
  const lower = value.toLowerCase();
  return !lower.includes("unknown") && !lower.includes("unclear") && !lower.includes("not confirmed") && !lower.includes("details not yet confirmed");
}

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

  const locationLabel = [neighbourhood, borough || areaOfLondon]
    .filter(Boolean)
    .join(" / ") || "London";

  const fullAddress = [address, postcode].filter(Boolean).join(", ");

  const mapQuery = [name, address, postcode, "London"]
    .filter(Boolean)
    .join(" ");

  const mapSrc = useMemo(() => buildMapPreviewUrl(mapQuery), [mapQuery]);

  const resolvedAppleMapsHref =
    appleMapsHref ||
    `https://maps.apple.com/?q=${encodeURIComponent(mapQuery)}`;

  return (
    <section className="border-y border-[#d8cebf]/70 bg-[#f4efe6] px-5 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-3xl">
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">
            Location & arrival
          </p>

          <h2 className="font-serif text-4xl font-normal leading-[0.95] tracking-[-0.045em] sm:text-5xl md:text-7xl">
            Know the setting before you arrive.
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#70695d] sm:text-lg sm:leading-9">
            {name} sits within {locationLabel}. This section combines
            practical arrival details with a calmer visual orientation layer,
            helping users understand both the route and the atmosphere around
            the venue.
          </p>
        </div>

        <div className="overflow-hidden border border-[#d8cebf]/80 bg-[#fbf8f1]">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[380px] border-b border-[#d8cebf]/70 lg:min-h-[640px] lg:border-b-0 lg:border-r">
              {!isMapActive ? (
                <button
                  type="button"
                  onClick={() => setIsMapActive(true)}
                  aria-label={`Load map for ${name}`}
                  className="group relative flex h-full w-full items-end overflow-hidden text-left"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(251,248,241,0.82),transparent_28rem),linear-gradient(135deg,#efe7da_0%,#d8cebf_52%,#b7a690_100%)]" />

                  <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(90deg,rgba(41,36,29,0.14)_1px,transparent_1px),linear-gradient(rgba(41,36,29,0.12)_1px,transparent_1px)] [background-size:64px_64px]" />

                  <div className="absolute left-[12%] top-[22%] h-px w-[58%] rotate-[-11deg] bg-[#29241d]/18" />
                  <div className="absolute left-[36%] top-[58%] h-px w-[44%] rotate-[14deg] bg-[#29241d]/16" />
                  <div className="absolute right-[24%] top-[16%] h-[42%] w-px rotate-[12deg] bg-[#29241d]/14" />

                  <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#29241d]/15 bg-[#fbf8f1]/82 shadow-[0_25px_60px_rgba(41,36,29,0.14)] backdrop-blur-sm transition duration-500 group-hover:scale-[1.03]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#29241d] text-[#fbf8f1]">
                      <span className="h-3 w-3 rounded-full bg-[#fbf8f1]" />
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-[#29241d]/58 via-[#29241d]/10 to-transparent" />

                  <div className="relative z-10 flex w-full flex-col gap-5 p-6 text-[#fbf8f1] sm:p-8 lg:p-10">
                    <div>
                      <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-[#fbf8f1]/74">
                        Interactive location preview
                      </p>

                      <h3 className="font-serif text-3xl font-normal leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                        {name}
                      </h3>

                      <p className="mt-3 max-w-xl text-sm leading-7 text-[#fbf8f1]/82 sm:text-base">
                        {fullAddress || locationLabel}
                      </p>
                    </div>

                    <div className="mt-auto inline-flex w-fit rounded-full bg-[#fbf8f1] px-5 py-3 text-sm text-[#29241d] transition group-hover:bg-[#eee7da]">
                      Load map experience
                    </div>
                  </div>
                </button>
              ) : (
                <iframe
                  title={`${name} map`}
                  src={mapSrc}
                  className="h-full min-h-[380px] w-full border-0 grayscale-[0.32] contrast-[0.96] lg:min-h-[640px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              )}
            </div>

            <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
              <div>
                <p className="mb-5 text-[10px] uppercase tracking-[0.24em] text-[#8a7f70]">
                  Arrival notes
                </p>

                <div className="space-y-8 border-y border-[#d8cebf]/70 py-8">
                  <div>
                    <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#8a7f70]">
                      Area
                    </p>
                    <p className="font-serif text-3xl leading-tight text-[#29241d] sm:text-4xl">
                      {locationLabel}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#8a7f70]">
                      Address
                    </p>
                    <p className="text-base leading-8 text-[#5f574c]">
                      {fullAddress ||
                        "Address details are currently being confirmed."}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#8a7f70]">
                      Nearest station
                    </p>
                    <p className="text-base leading-8 text-[#5f574c]">
                      {hasKnownValue(nearestStation)
                        ? nearestStation
                        : "Station details are still being checked."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-3">
                {directionsHref ? (
                  <TrackedExternalLink
                    href={directionsHref}
                    eventName="map_click"
                    properties={{
                      facility_name: name,
                      facility_slug: slug,
                      cta_type: "google_maps_location_module",
                      area: neighbourhood || areaOfLondon,
                    }}
                    className="inline-flex justify-center rounded-full bg-[#29241d] px-6 py-3 text-sm text-[#fbf8f1] transition hover:bg-[#463c31]"
                  >
                    Open live directions
                  </TrackedExternalLink>
                ) : null}

                <TrackedExternalLink
                  href={resolvedAppleMapsHref}
                  eventName="map_click"
                  properties={{
                    facility_name: name,
                    facility_slug: slug,
                    cta_type: "apple_maps_location_module",
                    area: neighbourhood || areaOfLondon,
                  }}
                  className="inline-flex justify-center rounded-full border border-[#cfc5b6] px-6 py-3 text-sm text-[#29241d] transition hover:border-[#29241d] hover:bg-[#eee8dd]"
                >
                  Open in Apple Maps
                </TrackedExternalLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
