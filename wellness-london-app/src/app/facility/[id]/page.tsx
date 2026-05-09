import { getFacilities } from "@/lib/airtable";

type FacilityPageProps = {
  params: Promise<{ id: string }>;
};

function InfoPill({ label }: { label: string }) {
  return (
    <span className="rounded-full border px-3 py-1 text-sm text-gray-700">
      {label}
    </span>
  );
}

export default async function FacilityPage({ params }: FacilityPageProps) {
  const { id } = await params;
  const facilities = await getFacilities();
  const facility = facilities.find((item) => item.id === id);

  if (!facility) {
    return (
      <main className="min-h-screen bg-white text-black">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="text-3xl font-bold mb-4">Facility not found</h1>
          <p className="text-gray-600">We could not find this wellness space.</p>
          <a href="/" className="inline-block mt-6 text-sm font-medium underline">Back to directory</a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <a href="/" className="text-sm font-medium underline">
          Back to directory
        </a>

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
          </div>

          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {facility.servicesOffered.map((service) => (
                <InfoPill key={service} label={service} />
              ))}
            </div>

            <h1 className="text-5xl font-bold mb-4">{facility.name}</h1>

            {facility.editorialSummary ? (
              <p className="text-lg text-gray-600 leading-8 mb-8">
                {facility.editorialSummary}
              </p>
            ) : (
              <p className="text-lg text-gray-600 leading-8 mb-8">
                {facility.description}
              </p>
            )}

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

            <div className="space-y-3 text-gray-700 mb-8 leading-7">
              {facility.address && <p><strong>Address:</strong> {facility.address}</p>}
              {facility.phone && <p><strong>Phone:</strong> {facility.phone}</p>}
              {facility.email && <p><strong>Email:</strong> {facility.email}</p>}
              {facility.openingHours && <p><strong>Opening Hours:</strong> {facility.openingHours}</p>}
              {facility.accessType && <p><strong>Access:</strong> {facility.accessType}</p>}
            </div>

            <div className="flex flex-wrap gap-4">
              {facility.bookingLink && (
                <a
                  href={facility.bookingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full bg-black text-white px-6 py-3 text-sm font-semibold hover:opacity-90 transition"
                >
                  Book Now
                </a>
              )}

              {facility.website && facility.website !== "#" && (
                <a
                  href={facility.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full border px-6 py-3 text-sm font-semibold hover:shadow-lg transition"
                >
                  Visit Website
                </a>
              )}

              {facility.instagramLink && (
                <a
                  href={`https://instagram.com/${facility.instagramLink.replace("@", "")}`}
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
