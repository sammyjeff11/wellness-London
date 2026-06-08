import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FacilityGallery from "@/components/FacilityGallery";
import JsonLd from "@/components/JsonLd";
import TrackedExternalLink from "@/components/TrackedExternalLink";
import VenueLocationSection from "@/components/VenueLocationSection";
import { activityPages } from "@/lib/activity-pages";
import { getFacilities } from "@/lib/airtable";
import { getFacilityLocation } from "@/lib/facility-presenters";
import { absoluteUrl } from "@/lib/site";
import { canonicaliseServiceList, canonicalServiceHref } from "@/lib/taxonomy";

export const dynamicParams = true;

type FacilityPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const facilities = await getFacilities();
  return facilities.filter((facility) => facility.slug).map((facility) => ({ slug: facility.slug }));
}

export async function generateMetadata({ params }: FacilityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const facilities = await getFacilities();
  const facility = facilities.find((item) => item.slug === slug);

  if (!facility) return { title: "Venue not found | Well+" };

  const description = facility.editorialSummary || facility.description || `${facility.name} in ${getFacilityLocation(facility)}.`;

  return {
    title: `${facility.name} | Well+ London`,
    description,
    alternates: { canonical: `/facility/${facility.slug}` },
    openGraph: {
      title: `${facility.name} | Well+ London`,
      description,
      url: absoluteUrl(`/facility/${facility.slug}`),
      type: "website",
      images: facility.images[0]?.url ? [{ url: facility.images[0].url, alt: facility.images[0].filename || facility.name }] : undefined,
    },
  };
}

function venueJsonLd(facility: Awaited<ReturnType<typeof getFacilities>>[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: facility.name,
    url: absoluteUrl(`/facility/${facility.slug}`),
    image: facility.images.map((image) => image.url),
    address: facility.address || facility.postcode || "London",
    areaServed: getFacilityLocation(facility),
    description: facility.editorialSummary || facility.description,
    telephone: facility.phone || undefined,
    sameAs: [facility.website, facility.instagramLink].filter(Boolean),
  };
}

function DetailPill({ label, value }: { label: string; value?: string }) {
  if (!value) return null;

  return (
    <div className="rounded-[1rem] border border-[#d8cebf]/75 bg-[#fbf8f1] p-4">
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#6f6048]">{label}</p>
      <p className="mt-2 text-sm leading-6 text-[#29241d]">{value}</p>
    </div>
  );
}

const activityGuideByHref = new Map(activityPages.map((page) => [page.canonicalHref, page]));

function getRelatedGuides(services: string[]) {
  return services
    .flatMap((service) => {
      const href = canonicalServiceHref(service);
      const guide = href ? activityGuideByHref.get(href) : undefined;

      if (!href || !guide) return [];

      return [{
        href,
        service: guide.label,
        copy: guide.description,
      }];
    })
    .slice(0, 4);
}

export default async function FacilityPage({ params }: FacilityPageProps) {
  const { slug } = await params;
  const facilities = await getFacilities();
  const facility = facilities.find((item) => item.slug === slug);

  if (!facility) notFound();

  const location = getFacilityLocation(facility);
  const summary = facility.editorialVerdict || facility.editorialSummary || facility.description;
  const services = canonicaliseServiceList(facility.servicesOffered);
  const relatedGuides = getRelatedGuides(services);

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <JsonLd data={venueJsonLd(facility)} />

      <section className="px-5 py-6 sm:px-6 sm:py-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap gap-2 text-sm text-[#70695d] sm:mb-8">
            <Link href="/" className="underline-offset-4 hover:text-[#29241d] hover:underline">Home</Link>
            <span>/</span>
            <Link href="/explore" className="underline-offset-4 hover:text-[#29241d] hover:underline">Explore</Link>
          </nav>

          <div className="grid gap-7 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-10">
            <div className="max-w-2xl lg:max-w-none">
              <p className="editorial-eyebrow mb-4">{facility.venueTypeStandardized || "London wellness venue"}</p>
              <h1 className="font-serif text-[3.1rem] font-normal leading-[0.94] tracking-[-0.06em] sm:text-6xl md:text-7xl">
                {facility.name}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#5f574c] sm:text-lg sm:leading-8">{summary}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {facility.website ? (
                  <TrackedExternalLink
                    href={facility.website}
                    eventName="listing_cta_click"
                    properties={{ facility_name: facility.name, facility_slug: facility.slug, source: "facility_detail" }}
                    className="rounded-full bg-[#29241d] px-5 py-3 text-sm text-[#fbf8f1] transition hover:bg-[#3d352b]"
                  >
                    Visit website
                  </TrackedExternalLink>
                ) : null}
                <Link href="/explore" className="rounded-full border border-[#d8cebf] px-5 py-3 text-sm transition hover:bg-[#fbf8f1]">
                  Back to directory
                </Link>
              </div>
            </div>

            <FacilityGallery images={facility.images} venueName={facility.name} />
          </div>
        </div>
      </section>

      <section className="px-5 pb-10 sm:px-6 sm:pb-14">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 md:grid-cols-3">
          <DetailPill label="Location" value={location} />
          <DetailPill label="Nearest station" value={facility.nearestStation} />
          <DetailPill label="Price from" value={facility.priceFrom || facility.overallPriceRange} />
          <DetailPill label="Access" value={facility.accessType || facility.privateOrShared} />
          <DetailPill label="Beginner friendly" value={facility.beginnerFriendly} />
        </div>
      </section>

      {services.length > 0 ? (
        <section className="px-5 pb-12 sm:px-6 md:pb-16">
          <div className="mx-auto max-w-6xl border-t border-[#d8cebf]/70 pt-8 sm:pt-10">
            <div className="max-w-2xl">
              <p className="editorial-eyebrow mb-3">Services</p>
              <h2 className="font-serif text-4xl font-normal leading-tight tracking-[-0.045em] sm:text-5xl">Available treatments.</h2>
              <p className="mt-3 text-sm leading-6 text-[#5f574c] sm:text-base sm:leading-7">
                A quick view of the main services listed for this venue, so you can see whether it matches what you are looking for before booking.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
              {services.slice(0, 8).map((service) => {
                const href = canonicalServiceHref(service);
                return href ? (
                  <Link key={service} href={href} className="inline-flex items-center rounded-full border border-[#d8cebf] bg-[#fbf8f1] px-4 py-2 text-sm leading-none text-[#5f574c] transition hover:border-[#6f6048] hover:text-[#29241d] sm:px-5 sm:py-3">
                    {service}
                  </Link>
                ) : (
                  <span key={service} className="inline-flex items-center rounded-full border border-[#d8cebf] bg-[#fbf8f1] px-4 py-2 text-sm leading-none text-[#5f574c] sm:px-5 sm:py-3">
                    {service}
                  </span>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {relatedGuides.length > 0 ? (
        <section className="px-5 pb-12 sm:px-6 md:pb-16">
          <div className="mx-auto max-w-6xl border-t border-[#d8cebf]/70 pt-8 sm:pt-10">
            <div className="max-w-2xl">
              <p className="editorial-eyebrow mb-3">Related guides</p>
              <h2 className="font-serif text-4xl font-normal leading-tight tracking-[-0.045em] sm:text-5xl">Keep exploring.</h2>
              <p className="mt-3 text-sm leading-6 text-[#5f574c] sm:text-base sm:leading-7">
                Use these guides to compare similar services across London and understand what to look for before booking.
              </p>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedGuides.map((guide) => (
                <Link key={guide.href} href={guide.href} className="group flex min-h-48 flex-col justify-between rounded-[1rem] border border-[#d8cebf]/75 bg-[#fbf8f1] p-5 transition hover:border-[#6f6048] hover:bg-[#fffaf0]">
                  <span>
                    <span className="block text-lg font-medium leading-6 text-[#29241d]">{guide.service} in London</span>
                    <span className="mt-3 block text-sm leading-6 text-[#5f574c]">{guide.copy}</span>
                  </span>
                  <span className="mt-6 text-sm font-medium text-[#29241d] underline-offset-4 group-hover:underline">Read guide &rarr;</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <VenueLocationSection
        name={facility.name}
        slug={facility.slug}
        address={facility.address}
        postcode={facility.postcode}
        neighbourhood={facility.neighbourhood}
        borough={facility.borough}
        areaOfLondon={facility.areaOfLondon}
        nearestStation={facility.nearestStation}
        directionsHref={facility.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${facility.name} ${facility.address}`)}` : undefined}
      />
    </main>
  );
}
