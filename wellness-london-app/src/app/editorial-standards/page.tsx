import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial Standards | Well+",
  description:
    "Editorial standards and publishing principles for Well+'s London wellness directory and journal.",
  alternates: { canonical: "/editorial-standards" },
};

const standards = [
  "Publisher and responsibility. Well+ publishes this London directory and its researched guides. The publisher is responsible for listing accuracy, corrections and clearly separating editorial selections from commercial offers.",
  "Sources and dates. We use operator websites, current booking pages and explicit service information. Venue profiles link to an operator source and show the recorded information-check date. That date is a research check, not a visit, certification or guarantee that prices remain unchanged.",
  "What qualifies. A service must be explicitly listed for the relevant venue or branch. Future openings, generic brand capabilities and broad longevity language do not establish current availability of a specific test or treatment. Diagnostic pages use confirmed services and clinical eligibility criteria.",
  "Research versus visits. Researched shortlists compare published facts. They are not first-hand reviews. Any future personally visited review will say who visited and when, and distinguish direct observations from operator claims. We do not assign best-overall awards from profile completeness or use generic first-timer tags as recommendations.",
  "Prices and unknowns. We distinguish memberships, joining fees, consultations, concessions, introductory offers and individual sessions. A venue-wide starting price is not automatically a treatment price. Unknown durations, inclusions and prices remain unconfirmed rather than being estimated. Always check the selected booking and cancellation terms with the operator.",
  "Commercial independence. Directory eligibility and researched shortlist inclusion are not purchased. Any future paid placement will be visibly labelled Sponsored; affiliate links will be disclosed near the relevant link. Payment will not establish a quality ranking or medical endorsement. Operator performance reporting must distinguish referral clicks from confirmed bookings.",
  "Corrections. When an operator source changes or a discrepancy is found, we recheck the relevant listing, update the affected facts and their check date, and remove unsupported service claims. We keep the directory snapshot and its change history under version control. We do not update check dates simply because a page was rebuilt.",
  "Health information. These pages help compare providers and booking details. They do not diagnose, prescribe or establish individual suitability. We avoid unsupported health promises and distinguish availability of a service from evidence that it delivers a claimed benefit. Clinical decisions belong with an appropriately qualified professional.",
  "Ratings and images. We do not display unattributed review scores as endorsements. Images represent the identified venue only; where a usable venue image is unavailable, the listing uses a compact text layout instead of a substitute photograph.",
];

export default function EditorialStandardsPage() {
  return (
    <main className="bg-[#fbf8f1] px-5 py-16 text-[#29241d] sm:px-6 md:py-24">
      <div className="mx-auto max-w-4xl">
        <p className="mb-5 text-[11px] uppercase tracking-[0.26em] text-[#6f6048]">Editorial standards</p>
        <h1 className="font-serif text-5xl font-normal leading-[0.98] sm:text-6xl md:text-7xl">
          Publishing principles for Well+.
        </h1>

        <p className="mt-8 max-w-3xl text-lg leading-8 text-[#5f574c]">
          Well+ combines editorial storytelling with practical wellness discovery. Our aim is to help people navigate London wellness spaces with more confidence and less overwhelm.
        </p>

        <div className="mt-14 space-y-4 border-t border-[#d8cebf] pt-8">
          {standards.map((standard) => (
            <div key={standard} className="border border-[#d8cebf] bg-[#f4efe6] p-6 text-sm leading-7 text-[#5f574c] sm:p-7">
              {standard}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
