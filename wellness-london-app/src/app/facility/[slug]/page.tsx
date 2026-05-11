import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AnalyticsPageView from "@/components/AnalyticsPageView";
import JsonLd from "@/components/JsonLd";
import TrackedExternalLink from "@/components/TrackedExternalLink";
import VenueLocationSection from "@/components/VenueLocationSection";
import { getFacilities, type AirtableFacility } from "@/lib/airtable";

type FacilityPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatDate(value: string) {
  if (!value || value === "Details not yet confirmed") return "Details not yet confirmed";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

function displayValue(value?: string | string[]) {
  if (Array.isArray(value)) return value.filter(Boolean).join(", ");
  return value || "Details not yet confirmed";
}

function DetailRow({ label, value }: { label: string; value?: string | string[] }) {
  return (
    <div className="grid gap-2 border-t border-[#d8cebf]/70 py-4 md:grid-cols-[0.42fr_0.58fr]">
      <dt className="text-[11px] uppercase tracking-[0.18em] text-[#6f6048]">{label}</dt>
      <dd className="break-words text-sm leading-6 text-[#29241d]">{displayValue(value)}</dd>
    </div>
  );
}

function getInstagramHref(value: string) {
  if (!value) return "";
  return value.startsWith("http") ? value : `https://instagram.com/${value.replace("@", "")}`;
}

function getDirectionsHref(facility: AirtableFacility) {
  const query = encodeURIComponent([facility.name, facility.address, facility.postcode, "London"].filter(Boolean).join(" "));
  return query ? `https://www.google.com/maps/search/?api=1&query=${query}` : "";
}

function getSimilarFacilities(facility: AirtableFacility, facilities: AirtableFacility[]) {
  return facilities
    .filter((item) => item.slug !== facility.slug)
    .map((item) => {
      const sharedServices = item.serviceKeys.filter((key) => facility.serviceKeys.includes(key)).length;
      const sharedArea = item.areaGroup && item.areaGroup === facility.areaGroup ? 1 : 0;
      const sharedPremium = item.premiumLevel && item.premiumLevel === facility.premiumLevel ? 1 : 0;
      return { item, score: sharedServices * 3 + sharedArea + sharedPremium };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ item }) => item);
}

function hasKnownValue(value?: string) {
  if (!value) return false;
  const lower = value.toLowerCase();
  return !lower.includes("unknown") && !lower.includes("unclear") && !lower.includes("not confirmed") && !lower.includes("details not yet confirmed");
}

function buildGoodToKnow(facility: AirtableFacility) {
  const items: string[] = [];

  if (hasKnownValue(facility.bookingRequired)) items.push(facility.bookingRequired);
  if (hasKnownValue(facility.privateOrShared)) items.push(`${facility.privateOrShared} access.`);
  if (hasKnownValue(facility.towelsIncluded)) items.push(`Towels: ${facility.towelsIncluded.toLowerCase()}.`);
  if (hasKnownValue(facility.showersAvailable)) items.push(`Showers: ${facility.showersAvailable.toLowerCase()}.`);
  if (hasKnownValue(facility.changingRooms)) items.push(`Changing rooms: ${facility.changingRooms.toLowerCase()}.`);

  if (items.length < 3) {
    items.push("Some practical details are still being checked, so confirm current inclusions with the venue before booking.");
  }

  return items.slice(0, 5);
}

function buildExperienceHighlights(facility: AirtableFacility) {
  const highlights = new Set<string>();

  facility.experienceType.forEach((item) => highlights.add(item));
  facility.servicesOffered.slice(0, 4).forEach((item) => highlights.add(item));
  if (hasKnownValue(facility.privateOrShared)) highlights.add(facility.privateOrShared);
  if (hasKnownValue(facility.beginnerFriendly)) highlights.add(`Beginner-friendly: ${facility.beginnerFriendly}`);
  if (hasKnownValue(facility.premiumLevel)) highlights.add(facility.premiumLevel);

  return Array.from(highlights).filter(Boolean).slice(0, 8);
}

async function getFacilityBySlug(slug: string) {
  const facilities = await getFacilities();
  const facility = facilities.find((item) => item.slug === slug || item.id === slug);
  return { facility, facilities };
}

export async function generateMetadata({ params }: FacilityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { facility } = await getFacilityBySlug(slug);

  if (!facility) {
    return { title: "Facility not found | Well Edit" };
  }

  const title = `${facility.name} | Well Edit`;
  const description = facility.editorialSummary || facility.description;

  return {
    title,
    description,
    alternates: { canonical: `/facility/${facility.slug}` },
    openGraph: {
      title,
      description,
      url: `/facility/${facility.slug}`,
      images: facility.images[0]
        ? [{ url: facility.images[0].url, alt: facility.images[0].filename || facility.name }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: facility.images[0] ? [facility.images[0].url] : undefined,
    },
  };
}

export default async function FacilityPage({ params }: FacilityPageProps) {
  const { slug } = await params;
  const { facility, facilities } = await getFacilityBySlug(slug);

  if (!facility) notFound();

  const pageUrl = `https://welledit.co.uk/facility/${facility.slug}`;
  const websiteHref = facility.website && facility.website !== "#" ? facility.website : "";
  const bookingHref = facility.bookingLink || websiteHref;
  const instagramHref = getInstagramHref(facility.instagramLink);
  const directionsHref = getDirectionsHref(facility);
  const similarFacilities = getSimilarFacilities(facility, facilities);
  const primaryBestFor = facility.bestFor[0] || facility.experienceType[0] || "Best fit not yet confirmed";
  const summary = facility.editorialSummary || facility.description;
  const atmosphere = facility.ambience || "Atmosphere notes are being refined as this profile is updated.";
  const goodToKnow = buildGoodToKnow(facility);
  const experienceHighlights = buildExperienceHighlights(facility);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": `${pageUrl}#business`,
    name: facility.name,
    description: summary,
    url: pageUrl,
    image: facility.images.map((image) => image.url),
    telephone: facility.phone || undefined,
    email: facility.email || undefined,
    priceRange: facility.priceFrom || facility.overallPriceRange || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: facility.address,
      postalCode: facility.postcode || undefined,
      addressLocality: "London",
      addressCountry: "GB",
    },
    areaServed: facility.areaGroup || "London",
    sameAs: [websiteHref, instagramHref].filter(Boolean),
  };

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <AnalyticsPageView eventName="facility_page_view" properties={{ facility_name: facility.name, facility_slug: facility.slug, area: facility.neighbourhood || facility.areaOfLondon, page_path: `/facility/${facility.slug}` }} />
      <JsonLd data={localBusinessSchema} />

      <section className="px-4 pt-4 sm:px-5 md:px-8 md:pt-8">
        <div className="mx-auto max-w-[1400px]">
          <Link href="/" className="mb-6 inline-block text-sm text-[#70695d] underline underline-offset-4 sm:mb-8">
            Back to the edit
          </Link>

          <div className="grid gap-9 sm:gap-12 lg:grid-cols-[1.06fr_0.94fr] lg:items-end">
            <div className="relative min-h-[52vh] overflow-hidden bg-[#d8cebf] sm:min-h-[68vh]">
              {facility.images[0] ? (
                <Image src={facility.images[0].url} alt={facility.name} fill priority sizes="(min-width: 1024px) 56vw, 100vw" className="object-cover" />
              ) : (
                <div className="flex h-full min-h-[52vh] items-end p-6 text-[#70695d] sm:min-h-[68vh] sm:p-8">Well Edit</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            </div>

            <div className="pb-2 sm:pb-4">
              <p className="mb-5 text-[10px] uppercase leading-5 tracking-[0.24em] text-[#6f6048] sm:mb-6 sm:text-[11px] sm:tracking-[0.28em]">
                {facility.neighbourhood || facility.areaOfLondon || "London"}
              </p>
              <h1 className="font-serif text-5xl font-normal leading-[0.96] tracking-normal sm:text-6xl md:text-8xl">{facility.name}</h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#70695d] sm:mt-8 sm:text-xl sm:leading-9">Well suited for: {primaryBestFor}</p>
            </div>
          </div>
        </div>
      </section>

      <VenueLocationSection
        name={facility.name}
        slug={facility.slug}
        address={facility.address}
        postcode={facility.postcode}
        neighbourhood={facility.neighbourhood}
        borough={facility.borough}
        areaOfLondon={facility.areaOfLondon}
        nearestStation={facility.nearestStation}
        directionsHref={directionsHref}
      />
    </main>
  );
}
