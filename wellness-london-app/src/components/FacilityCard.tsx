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
  location?: string;
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

function primaryBestFor(facility: FacilityCardFacility) {
  return facility.bestFor?.[0] || facility.experienceType?.[0] || facility.description;
}

export default function FacilityCard({ facility, source = "directory" }: FacilityCardProps) {
  const services = facility.services?.slice(0, 4) || [];
  const location = [facility.location, facility.nearestStation].filter(Boolean).join(" / ");
  const price = facility.priceFrom || facility.priceRange;
  const hasKeyDetails = Boolean(location) || Boolean(price) || Boolean(facility.rating);

  return (
    <article className="group min-w-0 overflow-hidden border border-stone-200 bg-[#fffdf8] shadow-sm transition duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-2xl hover:shadow-stone-300/40">
      <Link
        href={`/facility/${facility.slug}`}
        className="flex h-full min-w-0 flex-col"
        onClick={() =>
          trackEvent("listing_card_click", {
            facility_name: facility.name,
            facility_slug: facility.slug,
            service_type: source,
            area: facility.location,
            page_path: window.location.pathname,
          })
        }
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-[#d8cebf]">
          {facility.imageUrl ? (
            <Image
              src={facility.imageUrl}
              alt={facility.imageAlt || facility.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-end bg-[#d8cebf] p-5">
              <span className="text-sm text-[#5f574c]">Well Edit</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

          <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-3">
            {price ? (
              <span className="bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#211d18] shadow-lg shadow-black/20">
                {price}
              </span>
            ) : (
              <span />
            )}
            {facility.rating ? (
              <span className="bg-[#211d18] px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-black/20">
                Google {facility.rating}
              </span>
            ) : null}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <p className="mb-2 text-xs font-semibold uppercase leading-5 tracking-[0.18em] text-white/85">
              {location || "London"}
            </p>
            <h3 className="max-w-[92%] text-3xl font-semibold leading-tight tracking-normal text-white drop-shadow-lg">
              {facility.name}
            </h3>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <p className="mb-4 line-clamp-3 text-[15px] leading-7 text-[#5f574c]">
            {primaryBestFor(facility)}
          </p>

          {services.length > 0 ? (
            <div className="mb-5">
              <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-stone-400">
                Key services
              </p>
              <div className="flex flex-wrap gap-2">
                {services.map((service) => (
                  <span
                    key={service}
                    className="border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-700"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {hasKeyDetails ? (
            <dl className="mb-5 grid grid-cols-3 overflow-hidden border border-stone-200 bg-[#f8f5ef] text-sm">
              <div className="min-w-0 p-3">
                <dt className="mb-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-stone-400">
                  Area
                </dt>
                <dd className="truncate font-semibold text-[#211d18]">
                  {facility.location || "London"}
                </dd>
              </div>
              <div className="border-l border-stone-200 p-3">
                <dt className="mb-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-stone-400">
                  Price
                </dt>
                <dd className="font-semibold text-[#211d18]">{price || "Ask"}</dd>
              </div>
              <div className="border-l border-stone-200 p-3">
                <dt className="mb-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-stone-400">
                  Rating
                </dt>
                <dd className="font-semibold text-[#211d18]">
                  {facility.rating || "New"}
                </dd>
              </div>
            </dl>
          ) : null}

          <div className="mt-auto flex items-center justify-between border-t border-[#d8cebf]/80 pt-4 text-sm">
            <span className="font-semibold text-[#29241d] underline underline-offset-4">
              View profile
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">
              Compare
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
