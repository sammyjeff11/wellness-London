"use client";

import Image from "next/image";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { getLocationHubHref } from "@/lib/location-hubs";

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
  lastCheckedDate?: string;
  verificationStatus?: string;
};

type FacilityCardProps = {
  facility: FacilityCardFacility;
  source?: string;
};

const broadAreaLabels = new Set(["central", "north", "south", "east", "west", "central london", "north london", "south london", "east london", "west london"]);

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

function getNoImageHighlights(facility: FacilityCardFacility) {
  const highlights = new Set<string>();
  const text = `${facility.name} ${facility.description} ${facility.priceRange || ""}`.toLowerCase();

  if (text.includes("five saunas") || text.includes("5 saunas")) highlights.add("5 saunas");
  if (text.includes("six cold") || text.includes("6 cold") || text.includes("6 plunges")) highlights.add("6 plunges");
  if (text.includes("two saunas") || text.includes("2 saunas")) highlights.add("2 saunas");
  if (text.includes("three plunges") || text.includes("3 plunges")) highlights.add("3 plunges");
  if (text.includes("private")) highlights.add("Private sessions");
  if (text.includes("rooftop")) highlights.add("Rooftop");
  if (text.includes("hot showers")) highlights.add("Hot showers");
  if (text.includes("changing")) highlights.add("Changing rooms");

  facility.services?.slice(0, 2).forEach((service) => highlights.add(service));
  return Array.from(highlights).slice(0, 4);
}

export default function FacilityCard({ facility, source = "directory" }: FacilityCardProps) {
  const neighbourhoodLabel = getNeighbourhoodLabel(facility);
  const areaLabel = getAreaLabel(facility);
  const overlayLocation = [neighbourhoodLabel, areaLabel && areaLabel !== neighbourhoodLabel ? areaLabel : undefined].filter(Boolean).join(" / ");
  const atmosphericDescriptor = getAtmosphericDescriptor(facility);
  const price = formatPrice(facility.priceFrom || facility.priceRange);
  const serviceLine = formatServiceLine(facility.services);
  const summary = primaryBestFor(facility);
  const rating = formatRating(facility.rating);
  const noImageHighlights = getNoImageHighlights(facility);

  const galleryImages = facility.galleryImages?.length
    ? facility.galleryImages.slice(0, 5)
    : facility.imageUrl
      ? [{ url: facility.imageUrl, filename: facility.imageAlt || facility.name }]
      : [];

  const cardHref = `/facility/${facility.slug}`;

  return (
    <article className="group relative min-w-0 overflow-hidden rounded-[1.4rem] border border-[#d8cebf]/70 bg-[#fbf8f1] shadow-[0_22px_55px_rgba(41,36,29,0.06)] transition duration-500 hover:-translate-y-[2px] hover:shadow-[0_32px_80px_rgba(41,36,29,0.1)]">
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
          {galleryImages.length > 0 ? galleryImages.map((image, index) => (
            <div key={`${image.url}-${index}`} className="editorial-image relative aspect-[4/3] min-w-full snap-center overflow-hidden sm:aspect-[4/5]">
              <Image src={image.url} alt={image.filename || facility.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="z-0 object-cover transition duration-1000 group-hover:scale-[1.035]" />
              <div className="editorial-image-overlay" />
              <div className="editorial-image-grain" />
              <div className="absolute left-4 right-4 top-4 z-10 flex items-start justify-between gap-3 sm:left-5 sm:right-5 sm:top-5">
                {price ? <span className="inline-flex min-h-8 items-center rounded-full bg-[#f8f5ef]/95 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#29241d] shadow-[0_12px_28px_rgba(0,0,0,0.16)] backdrop-blur-sm">{price}</span> : <span />}
                {galleryImages.length > 1 ? <span className="inline-flex min-h-8 items-center rounded-full bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/88 backdrop-blur-sm">{index + 1} / {galleryImages.length}</span> : null}
              </div>
              <div className="absolute bottom-0 left-0 right-0 z-10 p-4 text-white sm:p-7">
                <p className="mb-2 text-[9px] uppercase leading-5 tracking-[0.2em] text-white/72 sm:text-[10px] sm:tracking-[0.22em]">{overlayLocation || "London"}</p>
                <h3 className="max-w-[92%] font-serif text-[1.7rem] font-normal leading-[0.96] tracking-[-0.045em] text-white [text-shadow:0_3px_22px_rgb(0_0_0_/_0.62)] line-clamp-2 sm:min-h-[6.4rem] sm:max-w-[90%] sm:text-[2.6rem]">{facility.name}</h3>
                <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-[#e7dccd]/78 sm:mt-3 sm:text-[10px] sm:tracking-[0.18em]">{atmosphericDescriptor}</p>
              </div>
            </div>
          )) : (
            <div className="relative min-w-full bg-[#d8cebf] p-5 sm:p-7">
              <div className="flex min-h-[18rem] flex-col justify-end sm:min-h-[24rem]">
                <div className="mb-auto flex items-start justify-between gap-3">
                  {price ? <span className="rounded-full bg-[#fbf8f1]/72 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-[#29241d]">{price}</span> : <span />}
                  {rating ? <span className="rounded-full bg-[#29241d]/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#29241d]">{rating}</span> : null}
                </div>
                <p className="mb-3 text-[9px] uppercase leading-5 tracking-[0.2em] text-[#70695d] sm:text-[10px] sm:tracking-[0.22em]">{overlayLocation || "London"}</p>
                <h3 className="font-serif text-[2rem] font-normal leading-[0.96] tracking-[-0.045em] text-[#29241d] sm:text-[3rem]">{facility.name}</h3>
                <p className="mt-3 text-[9px] uppercase tracking-[0.16em] text-[#756957] sm:text-[10px] sm:tracking-[0.18em]">{atmosphericDescriptor}</p>
                {noImageHighlights.length > 0 ? <div className="mt-5 flex flex-wrap gap-2">{noImageHighlights.map((item) => <span key={item} className="rounded-full bg-[#fbf8f1]/70 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#4e463c]">{item}</span>)}</div> : null}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-5 py-5 sm:px-6 sm:py-7">
        <p className="mb-5 text-[14px] leading-6 text-[#5f574c] line-clamp-3 sm:mb-6 sm:text-[15px] sm:leading-7">
          {summary}
        </p>
        <div className="border-t border-[#d8cebf]/45 pt-4 text-[12px] leading-6 tracking-[0.02em] text-[#756957]">
          {serviceLine ? <p className="mb-1">{serviceLine}</p> : null}
          <p><span>{areaLabel}</span>{rating ? <span className="mx-2 text-[#c1b3a1]">·</span> : null}{rating ? <span>{rating}</span> : null}</p>
        </div>
      </div>
    </article>
  );
}
