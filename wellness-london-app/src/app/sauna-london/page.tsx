import type { Metadata } from "next";
import Link from "next/link";
import FacilityCard from "@/components/FacilityCard";
import { getFacilities } from "@/lib/airtable";

export const metadata: Metadata = {
  title: "Best Saunas in London | Wellness London",
  description:
    "Discover curated sauna and recovery spaces across London, including premium wellness studios, contrast therapy spaces and recovery facilities.",
};

const guidancePoints = [
  {
    title: "Location",
    text: "Choose somewhere that fits naturally into your week, whether that means close to home, near work, or easy to reach after training.",
  },
  {
    title: "Private vs social experience",
    text: "Private saunas suit quiet recovery, while social studios can feel more energising and ritual-led.",
  },
  {
    title: "Heat type / facilities",
    text: "Look at the full setup, including traditional sauna, infrared heat, cold plunge, showers and relaxation space.",
  },
  {
    title: "Price and membership options",
    text: "Compare single sessions, bundles and memberships so the experience matches how often you plan to visit.",
  },
];

const faqs = [
  {
    question: "Are there good saunas in London?",
    answer:
      "Yes. London now has a growing mix of premium sauna studios, recovery spaces and wellness clubs offering high-quality heat therapy.",
  },
  {
    question: "How much does a sauna session cost in London?",
    answer:
      "Prices vary by location and format, but many premium studios offer single sessions, bundles and memberships at different price points.",
  },
  {
    question: "Should I choose a private sauna or wellness studio?",
    answer:
      "A private sauna is best for quiet, focused recovery. A wellness studio is better if you want a broader experience with guided sessions, contrast therapy or a social atmosphere.",
  },
  {
    question: "Can sauna be combined with cold plunge?",
    answer:
      "Yes. Many London recovery studios combine sauna with cold plunge as contrast therapy, alternating heat and cold in a structured session.",
  },
];

export default async function SaunaLondonPage() {
  const facilities = await getFacilities();

  const saunaFacilities = facilities.filter((facility) =>
    facility.servicesOffered.some((service) =>
      service.toLowerCase().includes("sauna"),
    ),
  );

  return (
    <main className="min-h-screen bg-white text-black">
      <header className="flex justify-between items-center p-6 border-b">
        <Link href="/" className="text-xl font-semibold">
          Wellness London
        </Link>
        <nav className="space-x-6 text-sm">
          <Link href="/sauna-london">Saunas</Link>
          <Link href="/cold-plunge-london">Cold Plunge</Link>
          <Link href="/cryotherapy-london">Cryotherapy</Link>
        </nav>
      </header>

      <section className="text-center py-20 px-6">
        <p className="text-sm font-medium uppercase tracking-wide text-gray-500 mb-3">
          London sauna guide
        </p>
        <h1 className="text-4xl font-bold mb-4">Best Saunas in London</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A curated guide to quality sauna and recovery spaces across London,
          from premium wellness studios to calm contrast therapy destinations.
        </p>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-semibold">Curated sauna spaces</h2>
              <p className="text-sm text-gray-500 mt-2">
                Selected from the Wellness London directory.
              </p>
            </div>
            <Link href="/" className="text-sm font-medium underline">
              Back to homepage
            </Link>
          </div>

          {saunaFacilities.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {saunaFacilities.map((facility) => (
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
          ) : (
            <div className="border rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-2">
                No sauna listings yet
              </h3>
              <p className="text-sm text-gray-500">
                We are still curating sauna spaces for this guide. Check back
                soon for carefully selected London recovery studios.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="px-6 py-16 border-t">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6">
            Why sauna is becoming part of London’s recovery culture
          </h2>
          <div className="space-y-5 text-gray-600 leading-7">
            <p>
              Sauna has moved beyond the spa day and into the weekly rhythm of
              Londoners who train, work hard and want a more deliberate way to
              recover. The best spaces make heat feel calm and considered, with
              clean facilities, thoughtful pacing and room to decompress.
            </p>
            <p>
              Across the city, recovery studios are pairing sauna with cold
              plunge, breathwork and quiet lounge areas. This makes the
              experience feel less like a quick treatment and more like a
              complete reset for body and mind.
            </p>
            <p>
              For many people, the appeal is consistency. A well-located sauna
              can become part of a training plan, a Sunday ritual or a calm
              pause between busy days in the city.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-8">
            How to choose the right sauna in London
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {guidancePoints.map((point) => (
              <article key={point.title} className="border rounded-xl p-4">
                <h3 className="font-semibold mb-2">{point.title}</h3>
                <p className="text-sm text-gray-500 leading-6">{point.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold mb-8">Sauna London FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <article key={faq.question} className="border rounded-xl p-4">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-sm text-gray-500 leading-6">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
