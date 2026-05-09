import FacilityCard from "@/components/FacilityCard";
import Navbar from "@/components/Navbar";
import { getFacilities } from "@/lib/airtable";

export default async function Home() {
  const facilities = await getFacilities();

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      <section className="text-center py-20 px-6">
        <h2 className="text-4xl font-bold mb-4">
          Discover the best wellness spaces in London
        </h2>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Saunas, cold plunges, cryotherapy and recovery studios - curated for
          quality.
        </p>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {facilities.map((facility) => (
              <FacilityCard
                key={facility.id}
                facility={{
                  slug: facility.id,
                  name: facility.name,
                  description: facility.description,
                  website: facility.website,
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
