import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFacilities } from "@/lib/airtable";

type FacilityPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function InfoPill({ label }: { label: string }) {
  return (
    <span className="rounded-full border px-3 py-1 text-sm text-gray-700">
      {label}
    </span>
  );
}

export async function generateMetadata({
  params,
}: FacilityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const facilities = await getFacilities();
  const facility = facilities.find((item) => item.id === slug);

  if (!facility) {
    return {
      title: "Facility not found | Wellness London",
    };
  }

  return {
    title: `${facility.name} | Wellness London`,
    description: facility.editorialSummary || facility.description,
  };
}

export default async function FacilityPage({ params }: FacilityPageProps) {
  const { slug } = await params;
  const facilities = await getFacilities();
  const facility = facilities.find((item) => item.id === slug);

  if (!facility) {
    notFound();
  }

  const websiteHref = facility.website && facility.website !== "#" ? facility.website : "";
  const bookingHref = facility.bookingLink || websiteHref;
  const instagramHref = facility.instagramLink
    ? facility.instagramLink.startsWith("http")
      ? facility.instagramLink
      : `https://instagram.com/${facility.instagramLink.replace("@", "")}`
    : "";

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <Link href="/" className="text-sm font-medium underline">
          Back to directory
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 mt-8">
          <div>
            {facility.images.length > 0 ? (
              <img
                src={facility.images[0].url}
                alt={facility.name}
                className="w-full h-[420px] object-cover rounded-3xl border"
              />
            ) : (
              <div className="w-full h-[420px] rounded-3xl border bg-gray-100" />
            )}

            {facility.images.length > 1 ? (
              <div className="grid grid-cols-4 gap-3 mt-3">
                {facility.images.slice(1, 5).map((image) => (
                  <img
                    key={image.id}
                    src={image.url}
                    alt={image.filename || facility.name}
                    className="h-24 w-full object-cover rounded-2xl border"
                  />
                ))}
              </div>
            ) : null}
          </div>

          <div>
            {facility.servicesOffered.length > 0 ? (
              <div className="flex flex-wrap gap-2 mb-4">
                {facility.servicesOffered.map((service) => (
                  <InfoPill key={service} label={service} />
                ))}
              </div>
            ) : null}

            <p className="text-sm font-medium uppercase tracking-wide text-gray-500 mb-3">
              {facility.neighbourhood || facility.areaOfLondon || "London"}
            </p>

            <h1 className="text-5xl font-bold mb-4">{facility.name}</h1>

            <p className="text-lg text-gray-600 leading-8 mb-8">
              {facility.editorialSummary || facility.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
              {facility.neighbourhood && (
                <div className="border rounded-2xl p-4">
                  <p className="text-gray-500 mb-1">Neighbourhood</p>
                  <p className="font-medium">{facility.neighbourhood}</p>
                </div>
              )}

              {facility.areaOfLondon && (
                <div className="border rounded-2xl p-4">
                  <p className="text-gray-500 mb-1">Area</p>
                  <p className="font-medium">{facility.areaOfLondon}</p>
                </div>
              )}

              {facility.overallPriceRange && (
                <div className="border rounded-2xl p-4">
                  <p className="text-gray-500 mb-1">Price Range</p>
                  <p className="font-medium">{facility.overallPriceRange}</p>
                </div>
              )}

              {facility.googleRating && (
                <div className="border rounded-2xl p-4">
                  <p className="text-gray-500 mb-1">Google Rating</p>
                  <p className="font-medium">{facility.googleRating}</p>
                </div>
              )}
            </div>

            {facility.typeOfExperience.length > 0 ? (
              <div className="mb-8">
                <h2 className="font-semibold mb-3">Experience Type</h2>
                <div className="flex flex-wrap gap-2">
                  {facility.typeOfExperience.map((type) => (
                    <InfoPill key={type} label={type} />
                  ))}
                </div>
              </div>
            ) : null}

            <div className="space-y-3 text-gray-700 mb-8 leading-7">
              {facility.address && <p><strong>Address:</strong> {facility.address}</p>}
              {facility.phone && <p><strong>Phone:</strong> {facility.phone}</p>}
              {facility.email && <p><strong>Email:</strong> {facility.email}</p>}
              {facility.openingHours && <p><strong>Opening Hours:</strong> {facility.openingHours}</p>}
              {facility.accessType && <p><strong>Access:</strong> {facility.accessType}</p>}
            </div>

            <div className="flex flex-wrap gap-4">
              {bookingHref && (
                <a
                  href={bookingHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full bg-black text-white px-6 py-3 text-sm font-semibold hover:opacity-90 transition"
                >
                  Book Now
                </a>
              )}

              {websiteHref && (
                <a
                  href={websiteHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full border px-6 py-3 text-sm font-semibold hover:shadow-lg transition"
                >
                  Visit Website
                </a>
              )}

              {instagramHref && (
                <a
                  href={instagramHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full border px-6 py-3 text-sm font-semibold hover:shadow-lg transition"
                >
                  Instagram
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
