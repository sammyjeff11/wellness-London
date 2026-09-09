import { sessionDuration } from "@/lib/venue-facts";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import SaveVenueButton from "@/components/SaveVenueButton";
import { normaliseSessionFormat } from "@/lib/comparison-values";
import { venuePrice } from "@/lib/venue-pricing";
import { getUsefulServiceLabels } from "@/lib/discovery-labels";
import FacilityCard from "@/components/FacilityCard";
import { toDirectoryFacility } from "@/lib/facility-presenters";
import FacilityGallery from "@/components/FacilityGallery";
import FacilitySocialContext from "@/components/FacilitySocialContext";
import AnalyticsPageView from "@/components/AnalyticsPageView";
import JsonLd from "@/components/JsonLd";
import TrackedExternalLink from "@/components/TrackedExternalLink";
import VenueLocationSection from "@/components/VenueLocationSection";
import { activityPages } from "@/lib/activity-pages";
import { getFacilities, type AirtableFacility } from "@/lib/airtable";
import { getBrandPageForFacility } from "@/lib/brand-pages";
import {
  getServicePillarMappings,
  getVenuePillarsFromServices,
  type ServicePillarMapping,
} from "@/lib/service-pillar-mapping";
import { absoluteUrl, truncateMetaText } from "@/lib/site";
import { canonicaliseServiceList, canonicalServiceHref } from "@/lib/taxonomy";
import { cleanList, cleanValue, isUsefulValue } from "@/lib/useful-values";
import { filterSuitabilityLabels } from "@/lib/discovery-labels";
import { formatFullAddress, stripUkPostcode } from "@/lib/facility-formatting";

export const dynamicParams = false;

type FacilityPageProps = {
  params: Promise<{ slug: string }>;
};

type DetailItem = {
  label: string;
  value?: string;
};

export async function generateStaticParams() {
  const facilities = await getFacilities();
  return facilities
    .filter((facility) => isUsefulValue(facility.slug))
    .map((facility) => ({ slug: facility.slug }));
}

function cleanUrl(value?: string) {
  const cleaned = cleanValue(value);
  if (!cleaned || cleaned === "#") return undefined;
  return cleaned;
}

function normaliseInstagramUrl(value?: string) {
  const cleaned = cleanValue(value);
  if (!cleaned) return undefined;
  if (/^https?:\/\//i.test(cleaned)) return cleaned;

  const withoutWww = cleaned.replace(/^www\./i, "");
  if (/^instagram\.com\//i.test(withoutWww)) return `https://${withoutWww}`;

  const handle = cleaned
    .replace(/^@/, "")
    .replace(/^\/+|\/+$/g, "")
    .split(/[/?#]/)[0]
    ?.trim();

  return handle ? `https://www.instagram.com/${handle}/` : undefined;
}

function formatDetailValue(label: string, value?: string) {
  if (!value) return value;
  if (label !== "Opening hours") return value;
  return value.replace(/\s*;\s*/g, ";\n").replace(/\s+\|\s+/g, "\n");
}

function getCleanLocation(facility: AirtableFacility) {
  return (
    cleanValue(facility.neighbourhood) ||
    cleanValue(facility.areaOfLondon) ||
    cleanValue(facility.areaGroup) ||
    "London"
  );
}

function getEditorialCandidates(facility: AirtableFacility) {
  return [
    cleanValue(facility.editorialSummary),
    cleanValue(facility.description),
  ].filter(Boolean) as string[];
}

function getMetaDescription(facility: AirtableFacility) {
  const description =
    getEditorialCandidates(facility)[0] ||
    `View services, access and booking details for ${facility.name} in London.`;
  return truncateMetaText(
    `${facility.name} in ${getCleanLocation(facility)}. ${getUsefulServiceLabels([...facility.servicesOffered, ...(facility.confirmedDiagnostics || [])], undefined, 3).join(", ")}. ${description}`,
  );
}

export async function generateMetadata({
  params,
}: FacilityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const facilities = await getFacilities();
  const facility = facilities.find((item) => item.slug === slug);

  if (!facility) return { title: "Venue not found | Well+" };

  const description = getMetaDescription(facility);
  const image = facility.images.find((item) => cleanUrl(item.url));
  const title = truncateMetaText(
    `${facility.name}${facility.name.toLowerCase().includes(getCleanLocation(facility).toLowerCase()) ? "" : ` in ${getCleanLocation(facility)}`} | Well+`,
    70,
  );

  return {
    title,
    description,
    alternates: { canonical: `/facility/${facility.slug}` },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/facility/${facility.slug}`),
      type: "website",
      images: image ? [{ url: image.url, alt: facility.name }] : undefined,
    },
  };
}

function venueJsonLd(facility: AirtableFacility) {
  const fullAddress = formatFullAddress(
    cleanValue(facility.address),
    cleanValue(facility.postcode),
  );
  const sameAs = [
    cleanUrl(facility.website),
    normaliseInstagramUrl(facility.instagramLink),
  ].filter(Boolean);
  const images = facility.images
    .map((image) => cleanUrl(image.url))
    .filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: facility.name,
    url: absoluteUrl(`/facility/${facility.slug}`),
    image: images.length > 0 ? images : undefined,
    address: fullAddress
      ? {
          "@type": "PostalAddress",
          streetAddress: stripUkPostcode(cleanValue(facility.address)),
          postalCode: cleanValue(facility.postcode),
          addressLocality: cleanValue(facility.neighbourhood) || "London",
          addressRegion:
            cleanValue(facility.borough) ||
            (cleanValue(facility.areaOfLondon)?.includes("London")
              ? "London"
              : undefined),
          addressCountry: "GB",
        }
      : undefined,
    areaServed: getCleanLocation(facility),
    description: getMetaDescription(facility),
    telephone: cleanValue(facility.phone),
    email: cleanValue(facility.email),
    sameAs: sameAs.length > 0 ? sameAs : undefined,
  };
}

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? <p className="editorial-eyebrow mb-3">{eyebrow}</p> : null}
      <h2 className="font-serif text-4xl font-normal leading-tight tracking-[-0.045em] sm:text-5xl">
        {title}
      </h2>
      {copy ? (
        <p className="mt-3 text-sm leading-6 text-[#5f574c] sm:text-base sm:leading-7">
          {copy}
        </p>
      ) : null}
    </div>
  );
}

function QuickFact({ label, value }: DetailItem) {
  if (!isUsefulValue(value)) return null;

  return (
    <div className="border-t border-[#d8cebf] py-4">
      <p className="text-xs font-medium text-[#5f574c]">{label}</p>
      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-[#29241d]">
        {formatDetailValue(label, value)}
      </p>
    </div>
  );
}

function DetailCard({ label, value }: DetailItem) {
  if (!isUsefulValue(value)) return null;

  return (
    <div className="border-t border-[#d8cebf] py-4">
      <p className="text-xs font-medium text-[#5f574c]">{label}</p>
      <p className="mt-3 whitespace-pre-line text-base leading-7 text-[#29241d]">
        {formatDetailValue(label, value)}
      </p>
    </div>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#d8cebf] bg-[#fbf8f1] px-4 py-2 text-sm leading-none text-[#5f574c] sm:px-5 sm:py-3">
      {children}
    </span>
  );
}

const activityGuideByHref = new Map(
  activityPages.map((page) => [page.canonicalHref, page]),
);

function getRelatedGuides(services: string[]) {
  return services
    .flatMap((service) => {
      const href = canonicalServiceHref(service);
      const guide = href ? activityGuideByHref.get(href) : undefined;

      if (!href || !guide) return [];

      return [
        {
          href,
          service: guide.label,
          copy: guide.description,
        },
      ];
    })
    .slice(0, 4);
}

function getSimilarVenues(
  current: AirtableFacility,
  facilities: AirtableFacility[],
  servicePillarMappings: ServicePillarMapping[],
) {
  const currentServices = new Set(
    canonicaliseServiceList(current.servicesOffered).map((service) =>
      service.toLowerCase(),
    ),
  );
  const currentServiceKeys = new Set(current.serviceKeys);
  const currentPillars = new Set(
    getVenuePillarsFromServices(current, servicePillarMappings),
  );
  const currentArea =
    cleanValue(current.neighbourhood) ||
    cleanValue(current.areaOfLondon) ||
    cleanValue(current.areaGroup);
  const currentVenueType = cleanValue(current.venueTypeStandardized);

  return facilities
    .filter(
      (candidate) =>
        candidate.slug !== current.slug && isUsefulValue(candidate.slug),
    )
    .map((candidate) => {
      const services = canonicaliseServiceList(candidate.servicesOffered);
      const serviceScore =
        services.filter((service) => currentServices.has(service.toLowerCase()))
          .length * 10;
      const serviceKeyScore =
        candidate.serviceKeys.filter((key) => currentServiceKeys.has(key))
          .length * 8;
      const pillarScore =
        getVenuePillarsFromServices(candidate, servicePillarMappings).filter(
          (pillar) => currentPillars.has(pillar),
        ).length * 9;
      const candidateAreas = [
        candidate.neighbourhood,
        candidate.areaOfLondon,
        candidate.areaGroup,
      ]
        .map(cleanValue)
        .filter(Boolean);
      const areaScore =
        currentArea && candidateAreas.includes(currentArea) ? 6 : 0;
      const venueTypeScore =
        currentVenueType &&
        cleanValue(candidate.venueTypeStandardized) === currentVenueType
          ? 4
          : 0;
      const completenessScore =
        Math.min(candidate.profileCompletenessScore || 0, 100) / 25;

      return {
        facility: candidate,
        score:
          serviceScore +
          serviceKeyScore +
          pillarScore +
          areaScore +
          venueTypeScore +
          completenessScore,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((item) => item.facility);
}

export default async function FacilityPage({ params }: FacilityPageProps) {
  const { slug } = await params;
  const [facilities, servicePillarMappings] = await Promise.all([
    getFacilities(),
    getServicePillarMappings(),
  ]);
  const facility = facilities.find((item) => item.slug === slug);

  if (!facility) notFound();

  const location = getCleanLocation(facility);
  const editorialCandidates = getEditorialCandidates(facility);
  const whyCopy = editorialCandidates.join("\n\n");
  const services = getUsefulServiceLabels(
    [
      ...cleanList(facility.servicesOffered),
      ...(facility.confirmedDiagnostics || []),
    ],
    undefined,
    Infinity,
  );
  const relatedGuides = getRelatedGuides(services);
  const similarVenues = getSimilarVenues(
    facility,
    facilities,
    servicePillarMappings,
  );
  const website = cleanUrl(facility.website);
  const bookingLink = cleanUrl(facility.bookingLink);
  const instagramLink = normaliseInstagramUrl(facility.instagramLink);
  const hasGallery = facility.images.some((image) =>
    Boolean(cleanUrl(image.url)),
  );
  const primaryCtaHref = bookingLink || website;
  const primaryCtaLabel = bookingLink
    ? "Book with venue ↗"
    : "Visit venue website ↗";
  const price = venuePrice(facility).label;
  const access = cleanValue(facility.accessType);
  const address = cleanValue(facility.address);
  const postcode = cleanValue(facility.postcode);
  const fullAddress = formatFullAddress(address, postcode);
  const bestFor = filterSuitabilityLabels(
    cleanList(
      facility.bestForStandardized.length > 0
        ? facility.bestForStandardized
        : facility.bestFor,
    ),
  ).slice(0, 8);
  const quickFacts: DetailItem[] = [
    { label: "Services", value: services.join(" · ") },
    {
      label: "Session duration",
      value:
        sessionDuration(facility) || "Not confirmed — check the chosen booking",
    },
    {
      label: "Session format",
      value:
        cleanValue(normaliseSessionFormat(facility.privateOrShared)) ||
        "Not confirmed",
    },
    { label: "Price", value: price },
    { label: "Access", value: access || "Not confirmed" },
    { label: "Booking", value: cleanValue(facility.bookingRequired) },
    { label: "Opening hours", value: cleanValue(facility.openingHours) },
  ].filter((item) => isUsefulValue(item.value));
  const experienceItems: DetailItem[] = [
    {
      label: "Experience style",
      value: cleanList(facility.experienceType).join(", "),
    },
    { label: "Atmosphere", value: cleanValue(facility.ambience) },
    {
      label: "Setting",
      value: cleanValue(normaliseSessionFormat(facility.privateOrShared)),
    },
    {
      label: "Guided sessions",
      value: cleanValue(facility.guidedSessionsAvailable),
    },
    {
      label: "Contrast therapy",
      value: cleanValue(facility.contrastTherapyAvailable),
    },
  ].filter((item) => isUsefulValue(item.value));
  const practicalItems: DetailItem[] = [
    { label: "Towels", value: cleanValue(facility.towelsIncluded) },
    { label: "Showers", value: cleanValue(facility.showersAvailable) },
    { label: "Changing rooms", value: cleanValue(facility.changingRooms) },
    { label: "Relaxation area", value: cleanValue(facility.relaxationArea) },
    { label: "Price notes", value: cleanValue(facility.priceNotes) },
  ].filter((item) => isUsefulValue(item.value));
  const goodToKnow = cleanValue(facility.goodToKnow);
  const brandPage = getBrandPageForFacility(facility);
  const directionsHref = fullAddress
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${facility.name} ${fullAddress}`)}`
    : undefined;

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <AnalyticsPageView
        eventName="facility_page_view"
        properties={{
          facility_name: facility.name,
          facility_slug: facility.slug,
          area: cleanValue(facility.areaOfLondon),
          neighbourhood: cleanValue(facility.neighbourhood),
          page_path: `/facility/${facility.slug}`,
        }}
      />
      <JsonLd data={venueJsonLd(facility)} />

      <section className="px-5 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto max-w-6xl">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap gap-2 text-sm text-[#70695d] sm:mb-8"
          >
            <Link
              href="/"
              className="underline-offset-4 hover:text-[#29241d] hover:underline"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href="/explore"
              className="underline-offset-4 hover:text-[#29241d] hover:underline"
            >
              Venues
            </Link>
            <span>/</span>
            <span aria-current="page" className="text-[#29241d]">
              {facility.name}
            </span>
          </nav>

          <div
            className={
              hasGallery
                ? "grid gap-7 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-10"
                : "max-w-4xl"
            }
          >
            <div
              className={hasGallery ? "max-w-2xl lg:max-w-none" : "max-w-3xl"}
            >
              <p className="editorial-eyebrow mb-4">
                {cleanValue(facility.venueTypeStandardized) ||
                  "London wellness venue"}
              </p>
              <h1 className="font-serif text-[3.1rem] font-normal leading-[0.94] tracking-[-0.06em] sm:text-5xl md:text-6xl">
                {facility.name}
              </h1>
              <p className="mt-4 text-sm uppercase tracking-[0.18em] text-[#6f6048]">
                {location}
              </p>
              {brandPage ? (
                <Link
                  href={`/brand/${brandPage.slug}`}
                  className="mt-3 inline-flex text-sm text-[#5f574c] underline underline-offset-4 hover:text-[#29241d]"
                >
                  Compare all {brandPage.name} locations
                </Link>
              ) : null}
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#5f574c] sm:text-lg sm:leading-8">
                {services.slice(0, 3).join(" · ") || "Wellness services"} in{" "}
                {location}.{" "}
                {access ? `${access}.` : "Check access with the venue."}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {price ? <Pill>{price}</Pill> : null}
                {access ? <Pill>{access}</Pill> : null}
              </div>

              <p className="mt-4 text-xs leading-6 text-[#5f574c]">
                Published by Well+ ·{" "}
                {cleanValue(facility.lastCheckedDate)
                  ? `Information checked ${facility.lastCheckedDate.slice(0, 10)}`
                  : "Check date not confirmed"}
                .{" "}
                {website ? (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4"
                  >
                    Operator source ↗
                  </a>
                ) : null}{" "}
                ·{" "}
                <Link
                  href="/editorial-standards"
                  className="underline underline-offset-4"
                >
                  How we check information
                </Link>
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {primaryCtaHref ? (
                  <TrackedExternalLink
                    href={primaryCtaHref}
                    eventName="listing_cta_click"
                    properties={{
                      facility_name: facility.name,
                      facility_slug: facility.slug,
                      source: "facility_detail",
                      cta_type: bookingLink ? "booking" : "website",
                    }}
                    className="rounded-full bg-[#29241d] px-5 py-3 text-sm text-[#fbf8f1] transition hover:bg-[#3d352b]"
                  >
                    {primaryCtaLabel}
                  </TrackedExternalLink>
                ) : null}
                <SaveVenueButton slug={facility.slug} name={facility.name} />
                <Link
                  href={`/compare?venues=${facility.slug}`}
                  className="inline-flex min-h-11 items-center px-2 text-sm underline"
                >
                  Compare
                </Link>
                {instagramLink ? (
                  <TrackedExternalLink
                    href={instagramLink}
                    eventName="listing_cta_click"
                    properties={{
                      facility_name: facility.name,
                      facility_slug: facility.slug,
                      source: "facility_detail",
                      cta_type: "instagram",
                    }}
                    className="inline-flex min-h-11 items-center px-2 text-sm underline"
                  >
                    View on Instagram
                  </TrackedExternalLink>
                ) : null}
                {directionsHref ? (
                  <TrackedExternalLink
                    href={directionsHref}
                    eventName="listing_cta_click"
                    properties={{
                      facility_name: facility.name,
                      facility_slug: facility.slug,
                      source: "facility_detail",
                      cta_type: "directions",
                    }}
                    className="inline-flex min-h-11 items-center px-2 text-sm underline"
                  >
                    Directions
                  </TrackedExternalLink>
                ) : null}
              </div>
            </div>

            {hasGallery ? (
              <FacilityGallery
                images={facility.images}
                venueName={facility.name}
              />
            ) : null}
          </div>
        </div>
      </section>

      {quickFacts.length > 0 ? (
        <section className="px-5 pb-10 sm:px-6 sm:pb-14">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl">At a glance</h2>
            <div className="mt-4 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
              {quickFacts.map((item) => (
                <QuickFact key={item.label} {...item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {practicalItems.length > 0 || goodToKnow ? (
        <section className="surface-band-stone px-5 py-8 sm:px-6 md:py-10">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Before you go"
              title="Know before booking"
            />
            {goodToKnow ? (
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[#4f473d]">
                {goodToKnow}
              </p>
            ) : null}
            {practicalItems.length > 0 ? (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {practicalItems.map((item) => (
                  <DetailCard key={item.label} {...item} />
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="editorial-shell border-t border-[#d8cebf] py-6">
        <details>
          <summary className="cursor-pointer py-3 text-base font-semibold">
            Session details & services
          </summary>
          <div className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {experienceItems.map((item) => (
              <DetailCard key={item.label} {...item} />
            ))}
          </div>
          <nav
            aria-label="Services at this venue"
            className="flex flex-wrap gap-x-5 gap-y-2 py-4"
          >
            {services.map((service) => {
              const href = canonicalServiceHref(service);
              return href ? (
                <Link
                  key={service}
                  href={href}
                  className="inline-flex min-h-11 items-center text-sm underline"
                >
                  {service}
                </Link>
              ) : (
                <span
                  key={service}
                  className="inline-flex min-h-11 items-center text-sm"
                >
                  {service}
                </span>
              );
            })}
          </nav>
          {bestFor.length ? (
            <p className="text-sm leading-7 text-[#5f574c]">
              Published venue tags: {bestFor.join(" · ")}
            </p>
          ) : null}
        </details>
      </section>
      <FacilitySocialContext slug={facility.slug} />

      <VenueLocationSection
        name={facility.name}
        slug={facility.slug}
        address={address}
        postcode={postcode}
        neighbourhood={cleanValue(facility.neighbourhood)}
        borough={cleanValue(facility.borough)}
        areaOfLondon={cleanValue(facility.areaOfLondon)}
        nearestStation={cleanValue(facility.nearestStation)}
        directionsHref={directionsHref}
      />

      {whyCopy ? (
        <section className="bg-[#fbf8f1] px-5 py-8 sm:px-6 md:py-10">
          <div className="mx-auto grid max-w-6xl gap-8 border-t border-[#d8cebf]/70 pt-8 sm:pt-10 lg:grid-cols-[0.78fr_1.22fr]">
            <SectionHeading
              eyebrow="Published venue research"
              title="About this venue"
            />
            <p className="max-w-3xl whitespace-pre-line text-base leading-8 text-[#4f473d]">
              {whyCopy}
            </p>
          </div>
        </section>
      ) : null}

      {relatedGuides.length > 0 ? (
        <section className="px-5 py-8 sm:px-6 md:py-10">
          <div className="mx-auto max-w-6xl border-t border-[#d8cebf]/70 pt-8 sm:pt-10">
            <SectionHeading
              eyebrow="Related guides"
              title="Understand the alternatives"
              copy="Compare formats, access and session styles before choosing a service."
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="surface-paper group flex min-h-48 flex-col justify-between rounded-[1rem] p-5 transition hover:-translate-y-0.5 hover:border-[#6f6048] hover:bg-[#fffaf0]"
                >
                  <span>
                    <span className="block text-lg font-medium leading-6 text-[#29241d]">
                      {guide.service} in London
                    </span>
                    <span className="mt-3 block text-sm leading-6 text-[#5f574c]">
                      {guide.copy}
                    </span>
                  </span>
                  <span className="mt-6 text-sm font-medium text-[#29241d] underline-offset-4 group-hover:underline">
                    Read guide
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {similarVenues.length > 0 ? (
        <section className="surface-band-stone px-5 py-8 sm:px-6 md:py-12">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Similar venues"
              title="Alternatives to consider"
              copy="Other London venues with related services, locations or access models."
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {similarVenues.map((venue) => (
                <FacilityCard
                  key={venue.slug}
                  facility={toDirectoryFacility(venue)}
                  source="profile_alternatives"
                  compact
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
