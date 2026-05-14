import Link from "next/link";

export type RelatedGuide = {
  href: string;
  title: string;
  description: string;
};

type RelatedGuidesProps = {
  title?: string;
  eyebrow?: string;
  guides: RelatedGuide[];
};

export default function RelatedGuides({
  title = "Continue exploring",
  eyebrow = "Related guides",
  guides,
}: RelatedGuidesProps) {
  if (guides.length === 0) return null;

  return (
    <section className="px-5 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl border-y border-[#d8cebf]/70 py-8">
        <div className="mb-8 max-w-2xl">
          <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">
            {eyebrow}
          </p>
          <h2 className="font-serif text-3xl font-normal leading-tight sm:text-4xl">
            {title}
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group block bg-[#fbf8f1] p-6 transition hover:bg-[#eee7da]"
            >
              <h3 className="mb-3 text-xl font-medium tracking-normal group-hover:underline group-hover:underline-offset-4">
                {guide.title}
              </h3>
              <p className="text-sm leading-7 text-[#5f574c]">
                {guide.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
