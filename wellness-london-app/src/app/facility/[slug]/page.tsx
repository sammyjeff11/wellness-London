import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFacilities } from "@/lib/airtable";

type FacilityPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

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

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="max-w-4xl mx-auto px-6 py-16">
        <Link href="/" className="text-sm font-medium underline">
          Back to directory
        </Link>

        <div className="mt-10">
          <p className="text-sm font-medium uppercase tracking-wide text-gray-500 mb-3">
            {facility.neighbourhood || facility.areaOfLondon || "London"}
          </p>
          <h1 className="text-5xl font-semibold tracking-tight mb-6">
            {facility.name}
          </h1>
          <p className="text-lg text-gray-600 leading-8 mb-8">
            {facility.editorialSummary || facility.description}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mb-10">
          <div className="border rounded-2xl p-5">
            <h2 className="font-semibold mb-2">Services</h2>
            <p className="text-sm text-gray-600">
              {facility.servicesOffered.length > 0
                ? facility.servicesOffered.join(", ")
                : "Wellness and recovery services"}
            </p>
          </div>
          <div className="border rounded-2xl p-5">
            <h2 className="font-semibold mb-2">Experience</h2>
            <p className="text-sm text-gray-600">
              {facility.typeOfExperience.length > 0
                ? facility.typeOfExperience.join(", ")
                : facility.accessType || "Premium wellness space"}
            </p>
          </div>
          <div className="border rounded-2xl p-5">
            <h2 className="font-semibold mb-2">Price Range</h2>
            <p className="text-sm text-gray-600">
              {facility.overallPriceRange || "Contact venue for pricing"}
            </p>
          </div>
          <div className="border rounded-2xl p-5">
            <h2 className="font-semibold mb-2">Rating</h2>
            <p className="text-sm text-gray-600">
              {facility.googleRating || "Rating not listed yet"}
            </p>
          </div>
        </div>

        <div className="space-y-4 text-gray-700 mb-10">
          <p>
            <strong>Address:</strong> {facility.address}
          </p>
          {facility.openingHours ? (
            <p>
              <strong>Opening hours:</strong> {facility.openingHours}
            </p>
          ) : null}
          {facility.phone ? (
            <p>
              <strong>Phone:</strong> {facility.phone}
            </p>
          ) : null}
          {facility.email ? (
            <p>
              <strong>Email:</strong> {facility.email}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-4">
          {bookingHref ? (
            <a
              href={bookingHref}
              className="border rounded-full px-6 py-3 font-semibold hover:bg-black hover:text-white transition"
              target="_blank"
              rel="noreferrer"
            >
              Book or Visit Website
            </a>
          ) : null}
          {facility.instagramLink ? (
            <a
              href={facility.instagramLink}
              className="border rounded-full px-6 py-3 font-semibold hover:bg-black hover:text-white transition"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          ) : null}
        </div>
      </section>
    </main>
  );
}
