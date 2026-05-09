import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Journal | Well Edit",
  description:
    "Editorial notes from Well Edit on London recovery rituals, wellness spaces and calmer ways to move through the city.",
  alternates: {
    canonical: "/journal",
  },
};

export default function JournalPage() {
  return (
    <main className="min-h-screen bg-[#f4efe6] px-6 py-24 text-[#29241d] md:py-32">
      <section className="mx-auto max-w-4xl">
        <p className="mb-8 text-[11px] uppercase tracking-[0.28em] text-[#6f6048]">
          Journal
        </p>
        <h1 className="font-serif text-6xl font-normal leading-[0.98] tracking-normal md:text-8xl">
          Notes on recovery, ritual and city wellness.
        </h1>
        <p className="mt-10 max-w-2xl text-lg leading-9 text-[#70695d]">
          The Well Edit journal is being shaped as a quieter editorial layer for the directory: considered guides, venue notes and practical recovery observations from across London.
        </p>
        <Link
          href="/"
          className="mt-12 inline-block text-sm text-[#29241d] underline underline-offset-4"
        >
          Return to the edit
        </Link>
      </section>
    </main>
  );
}
