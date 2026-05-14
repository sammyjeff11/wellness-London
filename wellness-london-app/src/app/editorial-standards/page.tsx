import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial Standards | The Well Edit",
  description:
    "Editorial standards and publishing principles for The Well Edit's London wellness directory and journal.",
  alternates: { canonical: "/editorial-standards" },
};

const standards = [
  "We aim to prioritise accuracy, clarity and usefulness over volume publishing.",
  "Where possible, listings are reviewed against publicly available venue information including websites, facilities, pricing signals and service descriptions.",
  "Editorial language should remain calm, practical and non-sensational.",
  "We avoid exaggerated health claims, miracle language and unsupported wellness promises.",
  "The directory is designed around user discovery intent rather than paid placement-first ranking.",
  "Articles and guides should support real decision-making through comparison, context and practical detail.",
];

export default function EditorialStandardsPage() {
  return (
    <main className="bg-[#fbf8f1] px-5 py-16 text-[#29241d] sm:px-6 md:py-24">
      <div className="mx-auto max-w-4xl">
        <p className="mb-5 text-[11px] uppercase tracking-[0.26em] text-[#6f6048]">Editorial standards</p>
        <h1 className="font-serif text-5xl font-normal leading-[0.98] sm:text-6xl md:text-7xl">
          Publishing principles for The Well Edit.
        </h1>

        <p className="mt-8 max-w-3xl text-lg leading-8 text-[#5f574c]">
          The Well Edit combines editorial storytelling with practical wellness discovery. Our aim is to help people navigate London wellness spaces with more confidence and less overwhelm.
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
