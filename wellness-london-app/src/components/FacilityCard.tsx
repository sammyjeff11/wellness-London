"use client";

import Image from "next/image";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { getLocationHubHref } from "@/lib/location-hubs";
import { getServiceHubHref } from "@/lib/service-hubs";

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

function getPrimaryLocation(facility: FacilityCardFacility) {
  if (facility.neighbourhood) return facility.neighbourhood;
  if (facility.location && !isBroadAreaLabel(facility.location)) return facility.location;
  if (facility.nearestStation) return facility.nearestStation;
  return facility.areaOfLondon || facility.location || facility.areaGroup || "London";
}

export default function FacilityCard({ facility, source = "directory" }: FacilityCardProps) {
  const services = facility.services?.slice(0, 4) || [];
  const primaryLocation = getPrimaryLocation(facility);
  const location = [primaryLocation, facility.nearestStation && facility.nearestStation !== primaryLocation ? facility.nearestStation : undefined].filter(Boolean).join(" / ");
  const locationHref = getLocationHubHref(facility.areaOfLondon || facility.areaGroup || facility.location);
  const price = facility.priceFrom || facility.priceRange;
  const details = [primaryLocation, price, facility.rating ? `${facility.rating} Google` : undefined].filter(Boolean);

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
            area: primaryLocation,
            page_path: window.location.pathname,
          })
        }
      >
        <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-md bg-[#d8cebf] shadow-[0_1px_0_rgba(41,36,29,0.12)]">
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
            {facility.rating ? (
              <span className="inline-flex min-h-8 items-center bg-[#1d1914]/82 px-3 py-1 text-[11px] font-medium leading-none text-white shadow-[0_12px_28px_rgba(0,0,0,0.2)] backdrop-blur-sm">
                {facility.rating} Google
              </span>
            ) : null}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-6">
            <p className="mb-3 text-[10px] font-medium uppercase leading-5 tracking-[0.22em] text-white/82 [text-shadow:0_2px_14px_rgb(0_0_0_/_0.55)] sm:text-[11px]">
              {location || "London"}
            </p>
            <h3 className="max-w-[92%] text-3xl font-medium leading-[1.04] tracking-normal text-white [text-shadow:0_3px_22px_rgb(0_0_0_/_0.62)] sm:text-[2rem]">
              {facility.name}
            </h3>
          </div>
        </div>
      </Link>

      <div className="min-w-0">
        <p className="mb-5 line-clamp-3 text-[15px] leading-7 text-[#5f574c]">
          {primaryBestFor(facility)}
        </p>

        {services.length > 0 ? (
          <div className="mb-5 flex flex-wrap gap-2">
            {services.map((service) => {
              const serviceHref = getServiceHubHref(service);

              return serviceHref ? (
                <Link
                  key={service}
                  href={serviceHref}
                  className="bg-[#eee8dd] px-3 py-1.5 text-[11px] font-medium leading-none text-[#4e463c] transition hover:bg-[#e3dbcf]"
                >
                  {service}
                </Link>
              ) : (
                <span
                  key={service}
                  className="bg-[#eee8dd] px-3 py-1.5 text-[11px] font-medium leading-none text-[#4e463c]"
                >
                  {service}
                </span>
              );
            })}
          </div>
        ) : null}

        {details.length > 0 ? (
          <p className="mb-5 border-y border-[#d8cebf]/85 py-4 text-sm leading-6 text-[#29241d]">
            {details.map((detail, index) => {
              const href = detail === primaryLocation ? locationHref : null;
              return (
                <span key={detail}>
                  {index > 0 ? <span className="mx-2 text-[#b1a491]">/</span> : null}
                  {href ? (
                    <Link href={href} className="font-medium underline-offset-4 hover:underline">
                      {detail}
                    </Link>
                  ) : (
                    <span className="font-medium">{detail}</span>
                  )}
                </span>
              );
            })}
          </p>
        ) : null}

        <Link href={`/facility/${facility.slug}`} className="flex items-center justify-between text-sm">
          <span className="font-medium text-[#29241d] underline underline-offset-4 transition group-hover:text-[#6f6048]">
            View profile
          </span>
          {facility.verificationStatus ? (
            <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#9a8d7c]">
              {facility.verificationStatus}
            </span>
          ) : null}
        </Link>
      </div>
    </article>
  );
}
