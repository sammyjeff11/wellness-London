import { getFacilities } from "@/lib/airtable";

type FacilityPageProps = {
  params: Promise<{ id: string }>;
};

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
      <div className="max-w-3xl mx-auto px-6 py-16">
        <a href="/" className="text-sm font-medium underline">Back to directory</a>
        <h1 className="text-4xl font-bold mt-8 mb-4">{facility.name}</h1>
        <p className="text-lg text-gray-600 mb-8 leading-8">{facility.description}</p>

        <div className="space-y-3 text-gray-700 mb-8">
          {facility.address && <p><strong>Address:</strong> {facility.address}</p>}
          {facility.phone && <p><strong>Phone:</strong> {facility.phone}</p>}
          {facility.email && <p><strong>Email:</strong> {facility.email}</p>}
        </div>

        {facility.website && facility.website !== "#" && (
          <a href={facility.website} target="_blank" rel="noreferrer" className="inline-flex rounded-full border px-5 py-3 text-sm font-semibold hover:shadow-lg transition">
            Visit Website
          </a>
        )}
      </div>
    </main>
  );
}
