import FacilityCard from "@/components/FacilityCard";
import { facilities } from "@/data/facilities";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b">
        <h1 className="text-xl font-semibold">Wellness London</h1>
        <nav className="space-x-6 text-sm">
          <a href="#">Saunas</a>
          <a href="#">Cold Plunge</a>
          <a href="#">Cryotherapy</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="text-center py-20 px-6">
        <h2 className="text-4xl font-bold mb-4">
          Discover the best wellness spaces in London
        </h2>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Saunas, cold plunges, cryotherapy and recovery studios - curated for
          quality.
        </p>
      </section>

      {/* Listings */}
      <section className="grid md:grid-cols-3 gap-6 px-6 pb-20">
        {facilities.map((facility) => (
          <FacilityCard key={facility.slug} facility={facility} />
        ))}
      </section>
    </main>
  );
}
