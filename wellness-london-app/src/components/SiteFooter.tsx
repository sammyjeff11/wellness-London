import Link from "next/link";
import NewsletterSignup from "@/components/NewsletterSignup";
const groups = [
  {
    title: "Discover",
    links: [
      ["/explore", "All venues"],
      ["/services", "Services"],
      ["/neighbourhoods", "Neighbourhoods"],
      ["/shortlist", "Saved venues"],
      ["/compare", "Compare venues"],
    ],
  },
  {
    title: "Popular services",
    links: [
      ["/sauna-london", "Sauna"],
      ["/cold-plunge-london", "Cold plunge"],
      ["/contrast-therapy-london", "Contrast therapy"],
      ["/longevity", "Health testing & clinics"],
      ["/assisted-stretching-london", "Assisted stretching"],
    ],
  },
  {
    title: "About Well+",
    links: [
      ["/editorial", "Guides"],
      ["/how-we-curate", "How we curate"],
      ["/editorial-standards", "Editorial standards"],
      ["/site-map", "Site map"],
    ],
  },
  {
    title: "For venues",
    links: [
      ["/claim-listing", "Claim or update a listing"],
      ["/work-with-well-plus", "Work with Well+"],
      ["/brands", "Multi-location brands"],
      ["/contact", "Contact"],
    ],
  },
];
export default function SiteFooter() {
  return (
    <footer className="bg-[#29241d] px-5 py-10 text-[#fbf8f1] sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row">
          <Link
            href="/"
            aria-label="Well+ home"
            className="font-serif text-4xl"
          >
            Well+
          </Link>
          <p className="max-w-md text-sm leading-7 text-[#fbf8f1]/85">
            An independent guide to London wellness. Find the right setting,
            understand the details and book directly with the venue.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-[#fbf8f1]/20 pt-8 md:grid-cols-4">
          {groups.map((group) => (
            <nav key={group.title} aria-label={`Footer ${group.title}`}>
              <h2 className="mb-3 font-sans text-sm font-semibold tracking-normal">
                {group.title}
              </h2>
              <ul>
                {group.links.map(([href, label]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="inline-flex min-h-11 items-center text-sm leading-6 text-[#fbf8f1]/85 underline-offset-4 hover:underline"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <NewsletterSignup source="site_footer" variant="dark" compact />
      </div>
    </footer>
  );
}
