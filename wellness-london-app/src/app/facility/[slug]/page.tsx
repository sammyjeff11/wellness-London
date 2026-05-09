import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { getFacilities } from "@/lib/airtable";

type FacilityPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function InfoPill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-stone-200 bg-[#fffdf8]/80 px-3 py-1 text-sm text-stone-700">
      {label}
    </span>
  );
}

async function getFacilityBySlug(slug: string) {
  const facilities = await getFacilities();
  return facilities.find((item) => item.slug === slug || item.id === slug);
}

export async function generateMetadata({
  params,
}: FacilityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const facility = await getFacilityBySlug(slug);

  if (!facility) {
    return {
      title: "Facility not found | Wellness London",
    };
  }

  return {
    title: `${facility.name} | Wellness London`,
    description: facility.editorialSummary || facility.description,
    alternates: {
      canonical: `https://wellnessldn.com/facility/${facility.slug}`,
    },
  };
}

export default async function FacilityPage({ params }: FacilityPageProps) {
  const { slug } = await params;
  const facility = await getFacilityBySlug(slug);

  if (!facility) {
    notFound();
  }

  const canonicalUrl = `https://wellnessldn.com/facility/${facility.slug}`;
  const websiteHref = facility.website && facility.website !== "#" ? facility.website : "";
  const bookingHref = facility.bookingLink || websiteHref;
  const instagramHref = facility.instagramLink
    ? facility.instagramLink.startsWith("http")
      ? facility.instagramLink
      : `https://instagram.com/${facility.instagramLink.replace("@", "")}`
    : "";

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: facility.name,
    description: facility.editorialSummary || facility.description,
    url: canonicalUrl,
    image: facility.images.map((image) => image.url),
    address: facility.address,
    telephone: facility.phone || undefined,
    email: facility.email || undefined,
    priceRange: facility.overallPriceRange || undefined,
    sameAs: [websiteHref, instagramHref].filter(Boolean),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://wellnessldn.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: facility.name,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#211d18]">
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        <Link href="/" className="text-sm font-medium underline text-stone-700">
          Back to directory
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            {facility.images.length > 0 ? (
              <img
                src={facility.images[0].url}
                alt={facility.name}
                className="h-[480px] w-full rounded-[2rem] border border-stone-200 object-cover shadow-2xl shadow-stone-300/40"
              />
            ) : (
              <div className="flex h-[480px] w-full items-end rounded-[2rem] border border-stone-200 bg-[#ded6c8] p-8 text-stone-600">
                Wellness London
              </div>
            )}

            {facility.images.length > 1 ? (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {facility.images.slice(1, 5).map((image) => (
                  <img
                    key={image.id}
                    src={image.url}
                    alt={image.filename || facility.name}
                    className="h-24 w-full rounded-2xl border border-stone-200 object-cover"
                  />
                ))}
              </div>
            ) : null}
          </div>

          <div className="lg:pt-6">
            {facility.servicesOffered.length > 0 ? (
              <div className="mb-5 flex flex-wrap gap-2">
                {facility.servicesOffered.map((service) => (
                  <InfoPill key={service} label={service} />
                ))}
              </div>
            ) : null}

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
              {facility.neighbourhood || facility.areaOfLondon || "London"}
            </p>

            <h1 className="mb-5 text-5xl font-semibold tracking-tight md:text-6xl">
              {facility.name}
            </h1>

            <p className="mb-8 text-lg leading-8 text-stone-600">
              {facility.editorialSummary || facility.description}
            </p>

            <div className="mb-8 grid grid-cols-2 gap-4 text-sm">
              {facility.neighbourhood ? (
                <div className="rounded-2xl border border-stone-200 bg-[#fffdf8] p-4">
                  <p className="mb-1 text-stone-500">Neighbourhood</p>
                  <p className="font-medium">{facility.neighbourhood}</p>
                </div>
              ) : null}

              {facility.areaOfLondon ? (
                <div className="rounded-2xl border border-stone-200 bg-[#fffdf8] p-4">
                  <p className="mb-1 text-stone-500">Area</p>
                  <p className="font-medium">{facility.areaOfLondon}</p>
                </div>
              ) : null}

              {facility.overallPriceRange ? (
                <div className="rounded-2xl border border-stone-200 bg-[#fffdf8] p-4">
                  <p className="mb-1 text-stone-500">Price Range</p>
                  <p className="font-medium">{facility.overallPriceRange}</p>
                </div>
              ) : null}

              {facility.googleRating ? (
                <div className="rounded-2xl border border-stone-200 bg-[#fffdf8] p-4">
                  <p className="mb-1 text-stone-500">Google Rating</p>
                  <p className="font-medium">{facility.googleRating}</p>
                </div>
              ) : null}
            </div>

            {facility.typeOfExperience.length > 0 ? (
              <div className="mb-8">
                <h2 className="mb-3 font-semibold">Best for</h2>
                <div className="flex flex-wrap gap-2">
                  {facility.typeOfExperience.map((type) => (
                    <InfoPill key={type} label={type} />
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mb-8 space-y-3 leading-7 text-stone-700">
              {facility.address ? <p><strong>Address:</strong> {facility.address}</p> : null}
              {facility.phone ? <p><strong>Phone:</strong> {facility.phone}</p> : null}
              {facility.email ? <p><strong>Email:</strong> {facility.email}</p> : null}
              {facility.openingHours ? <p><strong>Opening Hours:</strong> {facility.openingHours}</p> : null}
              {facility.accessType ? <p><strong>Access:</strong> {facility.accessType}</p> : null}
            </div>

            <div className="flex flex-wrap gap-4">
              {bookingHref ? (
                <a
                  href={bookingHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full bg-[#211d18] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3a3128]"
                >
                  Book Now
                </a>
              ) : null}

              {websiteHref ? (
                <a
                  href={websiteHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full border border-stone-300 bg-[#fffdf8] px-6 py-3 text-sm font-semibold transition hover:shadow-lg"
                >
                  Visit Website
                </a>
              ) : null}

              {instagramHref ? (
                <a
                  href={instagramHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full border border-stone-300 bg-[#fffdf8] px-6 py-3 text-sm font-semibold transition hover:shadow-lg"
                >
                  Instagram
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
