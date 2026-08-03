import type { Metadata } from "next";
import InquiryForm from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Claim or Update a Wellness Listing | Well+",
  description:
    "Verify or update a London wellness venue listing on Well+, including services, access, booking details and approved imagery.",
  alternates: { canonical: "/claim-listing" },
};

const updateAreas = [
  "Venue name, address and location details",
  "Services, access model and booking information",
  "Prices, opening hours and practical visit notes",
  "Approved venue photography and image permissions",
  "Closures, relocations or major service changes",
];

export default async function ClaimListingPage({
  searchParams,
}: {
  searchParams: Promise<{ venue?: string; url?: string }>;
}) {
  const params = await searchParams;
  const venue = typeof params.venue === "string" ? params.venue : "";
  const listingUrl = typeof params.url === "string" ? params.url : "";

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <section className="px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="editorial-eyebrow mb-4">For venues</p>
            <h1 className="font-serif text-5xl font-normal leading-[0.94] tracking-[-0.055em] sm:text-7xl">
              Claim or update your Well+ listing.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#5f574c] sm:text-lg sm:leading-9">
              Listing verification is currently free. The aim is to keep practical venue information accurate and give businesses a clear route to supply approved assets.
            </p>

            <div className="mt-8 rounded-[1rem] border border-[#d8cebf]/75 bg-[#fbf8f1] p-6">
              <h2 className="font-serif text-3xl font-normal leading-tight">What can be updated</h2>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-[#5f574c]">
                {updateAreas.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-6 text-sm leading-7 text-[#70695d]">
              Well+ may ask for evidence that you represent the venue before making material changes. Verification does not guarantee editorial inclusion, ranking or endorsement.
            </p>
          </div>

          <InquiryForm
            kind="listing"
            source="claim_listing_page"
            defaultVenue={venue}
            defaultListingUrl={listingUrl}
          />
        </div>
      </section>
    </main>
  );
}
