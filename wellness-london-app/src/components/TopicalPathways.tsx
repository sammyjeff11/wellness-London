import Link from "next/link";

export type TopicalPathwayLink = {
  href: string;
  label: string;
  description?: string;
};

export type TopicalPathwaysProps = {
  eyebrow?: string;
  title: string;
  introduction?: string;
  parentTopic?: TopicalPathwayLink;
  relatedModalities?: TopicalPathwayLink[];
  relatedOutcomes?: TopicalPathwayLink[];
  relatedLocations?: TopicalPathwayLink[];
};

function LinkCard({ link }: { link: TopicalPathwayLink }) {
  return (
    <Link
      href={link.href}
      className="group block border border-[#d8cebf]/70 bg-[#fbf8f1] p-5 transition hover:bg-[#eee7da]"
    >
      <h3 className="mb-2 text-lg font-medium tracking-normal group-hover:underline group-hover:underline-offset-4">
        {link.label}
      </h3>
      {link.description ? (
        <p className="text-sm leading-7 text-[#5f574c]">{link.description}</p>
      ) : null}
    </Link>
  );
}

export default function TopicalPathways({
  eyebrow = "Related pathways",
  title,
  introduction,
  parentTopic,
  relatedModalities = [],
  relatedOutcomes = [],
  relatedLocations = [],
}: TopicalPathwaysProps) {
  return (
    <section className="px-5 py-14 sm:px-6 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl border-y border-[#d8cebf]/70 py-10">
        <div className="mb-10 grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">
              {eyebrow}
            </p>
            <h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl">
              {title}
            </h2>
          </div>

          {introduction ? (
            <p className="max-w-xl text-sm leading-7 text-[#5f574c] md:justify-self-end">
              {introduction}
            </p>
          ) : null}
        </div>

        <div className="space-y-10">
          {parentTopic ? (
            <div>
              <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">
                Parent topic
              </p>
              <div className="max-w-xl">
                <LinkCard link={parentTopic} />
              </div>
            </div>
          ) : null}

          {relatedModalities.length > 0 ? (
            <div>
              <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">
                Related modalities
              </p>
              <div className="grid gap-5 md:grid-cols-3">
                {relatedModalities.map((link) => (
                  <LinkCard key={link.href} link={link} />
                ))}
              </div>
            </div>
          ) : null}

          {relatedOutcomes.length > 0 ? (
            <div>
              <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">
                Related outcomes
              </p>
              <div className="grid gap-5 md:grid-cols-3">
                {relatedOutcomes.map((link) => (
                  <LinkCard key={link.href} link={link} />
                ))}
              </div>
            </div>
          ) : null}

          {relatedLocations.length > 0 ? (
            <div>
              <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">
                Related locations
              </p>
              <div className="grid gap-5 md:grid-cols-3">
                {relatedLocations.map((link) => (
                  <LinkCard key={link.href} link={link} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
