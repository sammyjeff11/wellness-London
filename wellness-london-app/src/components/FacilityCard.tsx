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
  const services = facility.services?.slice(0, 2) || [];
  const location = [facility.location, facility.nearestStation].filter(Boolean).join(" / ");
  const price = facility.priceFrom || facility.priceRange || "Price not listed";

  return (
    <article className="group">
      <Link
        href={`/facility/${facility.slug}`}
        className="block"
        onClick={() => trackEvent("listing_card_click", {
          facility_name: facility.name,
          facility_slug: facility.slug,
          service_type: source,
          area: facility.location,
          page_path: window.location.pathname,
        })}
      >
        <div className="relative mb-5 aspect-[4/5] overflow-hidden bg-[#d8cebf]">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/48 via-transparent to-transparent" />
          {location ? (
            <p className="absolute bottom-4 left-4 right-4 text-[11px] font-medium uppercase tracking-[0.2em] text-white/92">
              {location}
            </p>
          ) : null}
        </div>

        <div>
          {services.length > 0 ? (
            <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-[#6f6048]">
              {services.join(" / ")}
            </p>
          ) : null}

          <h3 className="mb-3 text-2xl font-medium leading-tight tracking-normal text-[#29241d]">
            {facility.name}
          </h3>
          <p className="mb-4 text-[15px] leading-7 text-[#5f574c]">
            {primaryBestFor(facility)}
          </p>

          <div className="flex items-center justify-between border-t border-[#d8cebf]/80 pt-4 text-sm text-[#5f574c]">
            <span>{price}</span>
            <span className="text-[#29241d] underline underline-offset-4">View profile</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
