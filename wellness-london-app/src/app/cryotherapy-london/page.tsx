import type { Metadata } from "next";
import Link from "next/link";
import FacilityCard from "@/components/FacilityCard";
import { getFacilities } from "@/lib/airtable";

export const metadata: Metadata = {
  title: "Best Cryotherapy in London | Wellness London",
  description:
    "Discover the best cryotherapy studios in London, including luxury recovery clubs, wellness spaces, and premium performance facilities.",
};

const guidancePoints = [
  "Check whether the studio offers whole-body cryotherapy, localised treatments or both.",
  "Look for clear staff guidance, especially if it is your first session.",
  "Consider whether you want cryotherapy alone or a wider recovery studio setup.",
  "Compare introductory offers, packages and memberships for regular use.",
];

const faqs = [
  {
    question: "Are there cryotherapy studios in London?",
    answer:
      "Yes. London has specialist cryotherapy studios as well as wider wellness and recovery clubs offering cryotherapy treatments.",
  },
  {
    question: "What is cryotherapy used for?",
    answer:
      "People often use cryotherapy as part of a recovery, performance or general wellness routine, usually alongside sensible rest and training habits.",
  },
  {
    question: "How do I choose a cryotherapy studio?",
    answer:
      "Look for experienced staff, clear safety guidance, clean facilities, transparent pricing and a location you can visit consistently.",
  },
  {
    question: "Can cryotherapy be part of a wider recovery routine?",
    answer:
      "Yes. Many London wellness spaces combine cryotherapy with compression therapy, sauna, cold plunge or other recovery services.",
  },
];

export default async function CryotherapyLondonPage() {
  const facilities = await getFacilities();
  const cryotherapyFacilities = facilities.filter((facility) =>
    facility.servicesOffered.some((service) =>
      service.toLowerCase().includes("cryo"),
    ),
  );

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="text-center py-20 px-6">
        <p className="text-sm font-medium uppercase tracking-wide text-gray-500 mb-3">
          London cryotherapy guide
        </p>
        <h1 className="text-4xl font-bold mb-4">Best Cryotherapy in London</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover London’s leading cryotherapy studios, wellness clubs and
          recovery spaces offering performance-focused wellness experiences.
        </p>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-semibold">Curated cryotherapy spaces</h2>
              <p className="text-sm text-gray-500 mt-2">
                Selected from the Wellness London directory.
              </p>
            </div>
            <Link href="/cold-plunge-london" className="text-sm font-medium underline">
              Explore cold plunge
            </Link>
          </div>

          {cryotherapyFacilities.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {cryotherapyFacilities.map((facility) => (
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
                No cryotherapy listings yet
              </h3>
              <p className="text-sm text-gray-500">
                We are still curating cryotherapy studios for this guide. Check
                back soon for carefully selected London recovery facilities.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="px-6 py-16 border-t">
        <div className="max-w-3xl mx-auto space-y-5 text-gray-600 leading-7">
          <h2 className="text-3xl font-semibold text-black mb-6">
            Why cryotherapy is part of London’s performance wellness scene
          </h2>
          <p>
            Cryotherapy has become a fixture in London’s premium recovery world,
            sitting between performance, wellness and time-efficient self-care.
            The strongest studios make the process feel calm, professional and
            clearly guided.
          </p>
          <p>
            For busy Londoners, the appeal is speed and structure. A cryotherapy
            session can fit around training, work or travel, especially when the
            studio also offers complementary recovery treatments.
          </p>
          <p>
            As with any recovery modality, the setting matters. Clear guidance,
            staff confidence and transparent pricing all help turn a one-off
            treatment into a reliable wellness habit.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 border-t">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-8">
            How to choose cryotherapy in London
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
          <h2 className="text-3xl font-semibold mb-8">Cryotherapy London FAQs</h2>
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
