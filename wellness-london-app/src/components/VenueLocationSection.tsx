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

function buildLocationCopy({ name, neighbourhood, areaOfLondon, nearestStation }: VenueLocationSectionProps) {
  const area = neighbourhood || areaOfLondon || "London";
  const station = hasKnownValue(nearestStation) ? nearestStation : "the nearest transport connection";

  return `${name} is listed in ${area}, with arrival details designed to help you sense the setting before you book. Use the map as a quick orientation layer, then open directions for live travel times and route planning from your location.`;
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
  const locationLabel = [neighbourhood, borough || areaOfLondon].filter(Boolean).join(" / ") || "London";
  const fullAddress = [address, postcode].filter(Boolean).join(", ");
  const mapQuery = [name, address, postcode, "London"].filter(Boolean).join(" ");
  const mapSrc = useMemo(() => buildMapPreviewUrl(mapQuery), [mapQuery]);
  const resolvedAppleMapsHref = appleMapsHref || `https://maps.apple.com/?q=${encodeURIComponent(mapQuery)}`;
  const locationCopy = buildLocationCopy(props);

  return (
    <section className="border-y border-[#d8cebf]/70 bg-[#f7f2e9] px-5 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 grid gap-6 md:mb-12 md:grid-cols-[0.82fr_1.18fr] md:items-end">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Location & arrival</p>
            <h2 className="font-serif text-4xl font-normal leading-tight tracking-normal sm:text-5xl md:text-6xl">Find the space before you go.</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[#70695d] md:justify-self-end">
            {locationCopy}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch">
          <aside className="flex flex-col justify-between rounded-[1.75rem] border border-[#d8cebf]/80 bg-[#fbf8f1] p-6 shadow-[0_18px_60px_rgba(41,36,29,0.06)] sm:p-8">
            <div>
              <p className="mb-5 text-[10px] uppercase leading-5 tracking-[0.24em] text-[#8a7f70]">Arrival notes</p>
              <h3 className="mb-5 font-serif text-3xl font-normal leading-tight text-[#29241d] sm:text-4xl">{locationLabel}</h3>
              <dl className="space-y-5 border-y border-[#d8cebf]/70 py-6 text-sm leading-6">
                <div>
                  <dt className="mb-1 text-[10px] uppercase tracking-[0.2em] text-[#8a7f70]">Address</dt>
                  <dd className="text-[#29241d]">{fullAddress || "Address details are being confirmed."}</dd>
                </div>
                <div>
                  <dt className="mb-1 text-[10px] uppercase tracking-[0.2em] text-[#8a7f70]">Nearest station</dt>
                  <dd className="text-[#29241d]">{hasKnownValue(nearestStation) ? nearestStation : "Station details are being checked."}</dd>
                </div>
                <div>
                  <dt className="mb-1 text-[10px] uppercase tracking-[0.2em] text-[#8a7f70]">Area</dt>
                  <dd className="text-[#29241d]">{locationLabel}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col">
              {directionsHref ? (
                <TrackedExternalLink
                  href={directionsHref}
                  eventName="map_click"
                  properties={{ facility_name: name, facility_slug: slug, cta_type: "google_maps_location_module", area: neighbourhood || areaOfLondon }}
                  className="inline-flex justify-center rounded-full bg-[#29241d] px-5 py-3 text-sm text-[#fbf8f1] transition hover:bg-[#463c31]"
                >
                  Open in Google Maps
                </TrackedExternalLink>
              ) : null}
              <TrackedExternalLink
                href={resolvedAppleMapsHref}
                eventName="map_click"
                properties={{ facility_name: name, facility_slug: slug, cta_type: "apple_maps_location_module", area: neighbourhood || areaOfLondon }}
                className="inline-flex justify-center rounded-full border border-[#cfc5b6] px-5 py-3 text-sm text-[#29241d] transition hover:border-[#29241d] hover:bg-[#eee8dd]"
              >
                Open in Apple Maps
              </TrackedExternalLink>
            </div>
          </aside>

          <div className="relative min-h-[320px] overflow-hidden rounded-[1.75rem] border border-[#d8cebf]/80 bg-[#d8cebf] shadow-[0_18px_70px_rgba(41,36,29,0.08)] sm:min-h-[420px] lg:min-h-[520px]">
            {!isMapActive ? (
              <button
                type="button"
                onClick={() => setIsMapActive(true)}
                className="group relative flex h-full min-h-[320px] w-full items-end overflow-hidden text-left sm:min-h-[420px] lg:min-h-[520px]"
                aria-label={`Load interactive map for ${name}`}
              >
                <div className="absolute inset-0 bg-[linear-gradient(135deg,#d8cebf_0%,#f4efe6_38%,#cfc2af_100%)]" />
                <div className="absolute inset-0 opacity-[0.34] [background-image:linear-gradient(90deg,rgba(41,36,29,0.22)_1px,transparent_1px),linear-gradient(rgba(41,36,29,0.18)_1px,transparent_1px)] [background-size:42px_42px]" />
                <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#29241d] text-[#fbf8f1] shadow-[0_18px_50px_rgba(41,36,29,0.26)] transition duration-500 group-hover:scale-105">
                  <span className="h-3 w-3 rounded-full bg-[#fbf8f1]" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#29241d]/70 via-[#29241d]/10 to-transparent" />
                <div className="relative w-full p-6 text-[#fbf8f1] sm:p-8">
                  <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-[#fbf8f1]/78">Map preview</p>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h3 className="font-serif text-3xl font-normal leading-tight sm:text-4xl">{name}</h3>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-[#fbf8f1]/82">{fullAddress || locationLabel}</p>
                    </div>
                    <span className="inline-flex w-fit rounded-full bg-[#fbf8f1] px-5 py-3 text-sm text-[#29241d] transition group-hover:bg-[#eee7da]">Explore map</span>
                  </div>
                </div>
              </button>
            ) : (
              <iframe
                title={`${name} map`}
                src={mapSrc}
                className="h-full min-h-[320px] w-full border-0 grayscale-[0.25] sm:min-h-[420px] lg:min-h-[520px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
