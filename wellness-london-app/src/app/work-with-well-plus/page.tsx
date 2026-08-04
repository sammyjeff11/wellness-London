import type { Metadata } from "next";
import InquiryForm from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Work with Well+ | Venue and Brand Partnerships",
  description:
    "Work with Well+ on London wellness venue visits, editorial opportunities, launches and carefully matched commercial partnerships.",
  alternates: { canonical: "/work-with-well-plus" },
};

const partnershipRoutes = [
  {
    title: "Venue visits",
    text: "Invite Well+ to experience the venue and understand the format, facilities, access and practical customer journey first-hand.",
  },
  {
    title: "Editorial opportunities",
    text: "Share a meaningful opening, new service or useful story that fits the existing Well+ audience and editorial scope.",
  },
  {
    title: "Commercial partnerships",
    text: "Discuss future sponsored editorial, product collaborations or clearly labelled campaigns where there is a genuine audience fit.",
  },
];

export default function WorkWithWellPlusPage() {
  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <section className="px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="editorial-eyebrow mb-4">Work with Well+</p>
          <h1 className="max-w-5xl font-serif text-5xl font-normal leading-[0.94] tracking-[-0.055em] sm:text-7xl md:text-8xl">
            Useful partnerships, not paid placement disguised as editorial.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#5f574c] sm:text-lg sm:leading-9">
            Well+ is building a specialist London wellness audience around practical discovery. Partnerships should improve the information, experience or products available to that audience.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {partnershipRoutes.map((route) => (
              <article key={route.title} className="rounded-[1rem] border border-[#d8cebf]/75 bg-[#fbf8f1] p-6">
                <h2 className="font-serif text-3xl font-normal leading-tight tracking-[-0.035em]">{route.title}</h2>
                <p className="mt-4 text-sm leading-7 text-[#5f574c]">{route.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-[1rem] border border-[#d8cebf]/75 bg-[#eee7da] p-6 sm:p-8">
            <p className="text-sm leading-7 text-[#4f473d]">
              Well+ is still early-stage. Current conversations are most useful when they focus on accurate listings, approved imagery, founder visits, launches and small experiments that can be measured honestly.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-[#d8cebf]/70 bg-[#fbf8f1] px-5 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <InquiryForm kind="partnership" source="work_with_well_plus_page" />
        </div>
      </section>
    </main>
  );
}
