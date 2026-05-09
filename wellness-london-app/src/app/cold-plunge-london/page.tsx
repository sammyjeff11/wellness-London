import type { Metadata } from "next";
import Link from "next/link";
import FacilityCard from "@/components/FacilityCard";
import { getFacilities } from "@/lib/airtable";

export const metadata: Metadata = {
  title: "Best Cold Plunge in London | Wellness London",
  description:
    "Discover the best cold plunge and ice bath experiences in London, from luxury wellness clubs to performance recovery spaces.",
};

const guidancePoints = [
  "Check whether the studio offers guided contrast therapy or self-led access.",
  "Look for clean changing facilities, showers and a calm recovery area.",
  "Choose a location that fits your weekly training or recovery routine.",
  "Compare single sessions, class packs and memberships before booking.",
];

const faqs = [
  {
    question: "Where can I do cold plunge in London?",
    answer:
      "London has a growing mix of recovery studios, wellness clubs and contrast therapy spaces offering cold plunge or ice bath sessions.",
  },
  {
    question: "Is cold plunge good after training?",
    answer:
      "Many people use cold plunge as part of a recovery routine after training, especially when paired with rest, hydration and sensible session lengths.",
  },
  {
    question: "Can cold plunge be combined with sauna?",
    answer:
      "Yes. Many studios offer contrast therapy, alternating sauna heat with cold immersion in a structured recovery session.",
  },
  {
    question: "How should I choose a cold plunge studio?",
    answer:
      "Prioritise cleanliness, staff guidance, session format, water temperature, location and whether the space feels calm enough for regular use.",
  },
];

export default async function ColdPlungeLondonPage() {
  const facilities = await getFacilities();
  const coldPlungeFacilities = facilities.filter((facility) =>
    facility.servicesOffered.some((service) => {
      const value = service.toLowerCase();
      return value.includes("cold") || value.includes("plunge") || value.includes("ice bath");
    }),
  );

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="text-center py-20 px-6">
        <p className="text-sm font-medium uppercase tracking-wide text-gray-500 mb-3">
          London cold plunge guide
        </p>
        <h1 className="text-4xl font-bold mb-4">Best Cold Plunge in London</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore London’s best cold plunge experiences, including luxury wellness
          clubs, contrast therapy studios and premium recovery facilities.
        </p>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-semibold">Curated cold plunge spaces</h2>
              <p className="text-sm text-gray-500 mt-2">
                Selected from the Wellness London directory.
              </p>
            </div>
            <Link href="/sauna-london" className="text-sm font-medium underline">
              Explore saunas
            </Link>
          </div>

          {coldPlungeFacilities.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {coldPlungeFacilities.map((facility) => (
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
                No cold plunge listings yet
              </h3>
              <p className="text-sm text-gray-500">
                We are still curating cold plunge spaces for this guide. Check
                back soon for carefully selected London recovery studios.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="px-6 py-16 border-t">
        <div className="max-w-3xl mx-auto space-y-5 text-gray-600 leading-7">
          <h2 className="text-3xl font-semibold text-black mb-6">
            Why cold plunge has become a London recovery ritual
          </h2>
          <p>
            Cold plunge has become part of the city’s recovery language: short,
            focused and deliberately uncomfortable in a way that feels clarifying.
            The best spaces make the experience feel controlled rather than chaotic.
          </p>
          <p>
            Many London studios now frame cold immersion as part of contrast
            therapy, pairing plunge pools with sauna, breathwork and quiet rest.
            That broader setting can make the practice easier to approach and more
            useful as a repeat ritual.
          </p>
          <p>
            For regular users, the appeal is often routine. A well-run cold plunge
            space can become a reset point between training, work and the pace of
            the city.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 border-t">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-8">
            How to choose a cold plunge in London
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {guidancePoints.map((point) => (
              <article key={point} className="border rounded-xl p-4">
                <p className="text-sm text-gray-500 leading-6">{point}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold mb-8">Cold Plunge London FAQs</h2>
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
