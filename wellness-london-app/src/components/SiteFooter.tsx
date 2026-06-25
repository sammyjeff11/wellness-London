import Link from "next/link";
import { getFacilities } from "@/lib/airtable";
import { locationHubLinks } from "@/lib/location-hubs";
import { cleanValue, isUsefulValue } from "@/lib/useful-values";

const pillarLinks = [
  { href: "/explore", label: "Explore" },
  { href: "/recover", label: "Recover" },
  { href: "/perform", label: "Perform" },
  { href: "/reset", label: "Reset" },
  { href: "/optimise", label: "Optimise" },
  { href: "/longevity", label: "Longevity" },
];

const serviceLinks = [
  { href: "/sauna-london", label: "Saunas in London" },
  { href: "/infrared-sauna-london", label: "Infrared Sauna in London" },
  { href: "/cold-plunge-london", label: "Cold Plunge in London" },
  { href: "/cryotherapy-london", label: "Cryotherapy in London" },
  { href: "/red-light-therapy-london", label: "Red Light Therapy in London" },
  { href: "/contrast-therapy-london", label: "Contrast Therapy in London" },
  { href: "/recovery-london", label: "Recovery Spaces in London" },
];

const editorialLinks = [
  { href: "/editorial", label: "All Editorial" },
  { href: "/editorial/best-saunas-london", label: "Best Saunas in London" },
  { href: "/editorial/best-cryotherapy-london", label: "Best Cryotherapy in London" },
  { href: "/editorial/infrared-sauna-vs-traditional-sauna", label: "Infrared vs Traditional Sauna" },
  { href: "/best-sauna-cold-plunge-london", label: "Best Sauna + Cold Plunge" },
  { href: "/beginner-friendly-wellness-london", label: "Beginner-Friendly Wellness" },
  { href: "/how-we-curate", label: "How We Curate" },
  { href: "/editorial-standards", label: "Editorial Standards" },
  { href: "/site-map", label: "Site Map" },
];

function FooterLinkList({ links }: { links: { href: string; label: string }[] }) {
  return (
    <ul className="space-y-3 text-sm">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className="text-[#fbf8f1]/82 underline-offset-4 transition hover:text-[#fbf8f1] hover:underline">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function MobileFooterGroup({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  if (links.length === 0) return null;

  return (
    <details className="group border-t border-[#fbf8f1]/14 py-4">
      <summary className="flex cursor-pointer list-none items-center justify-between text-[11px] uppercase tracking-[0.22em] text-[#fbf8f1]/72">
        {title}
        <span className="text-base leading-none transition group-open:rotate-45">+</span>
      </summary>
      <div className="pt-4">
        <FooterLinkList links={links} />
      </div>
    </details>
  );
}

function facilityScore(facility: Awaited<ReturnType<typeof getFacilities>>[number]) {
  return Number(facility.isFeatured) * 100 + (facility.profileCompletenessScore || 0);
}

function venueLabel(facility: Awaited<ReturnType<typeof getFacilities>>[number]) {
  const location = cleanValue(facility.neighbourhood) || cleanValue(facility.areaOfLondon) || cleanValue(facility.areaGroup);
  return location ? `${facility.name} — ${location}` : facility.name;
}

export default async function SiteFooter() {
  const areaLinks = locationHubLinks.map((link) => ({
    href: link.href,
    label: link.label.replace(" wellness spaces", "").replace(" saunas and recovery studios", "").replace(" recovery spaces", ""),
  }));
  const popularVenueLinks = (await getFacilities())
    .filter((facility) => isUsefulValue(facility.slug))
    .sort((a, b) => facilityScore(b) - facilityScore(a))
    .slice(0, 10)
    .map((facility) => ({ href: `/facility/${facility.slug}`, label: venueLabel(facility) }));

  return (
    <footer className="bg-[#29241d] px-5 py-8 text-[#fbf8f1] sm:px-6 sm:py-16">
      <div className="mx-auto max-w-7xl border-t border-[#fbf8f1]/18 pt-7 sm:pt-10">
        <div className="mb-6 md:mb-0">
          <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#fbf8f1]/62">Well+</p>
          <p className="max-w-sm text-sm leading-7 text-[#fbf8f1]/72">
            The London wellness edit — a curated guide to saunas, cold plunges, recovery studios and modern wellbeing across the capital.
          </p>
        </div>

        <div className="md:hidden">
          <MobileFooterGroup title="Explore" links={pillarLinks} />
          <MobileFooterGroup title="Treatments" links={serviceLinks} />
          <MobileFooterGroup title="Areas" links={areaLinks} />
          <MobileFooterGroup title="Venues" links={popularVenueLinks} />
          <MobileFooterGroup title="Editorial" links={editorialLinks} />
        </div>

        <div className="hidden gap-8 md:grid md:grid-cols-[1.1fr_0.85fr_0.9fr_0.85fr_1fr_0.95fr]">
          <div aria-hidden="true" />
          <nav aria-label="Footer pillars">
            <h2 className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#fbf8f1]/62">Explore by intention</h2>
            <FooterLinkList links={pillarLinks} />
          </nav>

          <nav aria-label="Footer services">
            <h2 className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#fbf8f1]/62">Treatments</h2>
            <FooterLinkList links={serviceLinks} />
          </nav>

          <nav aria-label="Footer areas">
            <h2 className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#fbf8f1]/62">Areas</h2>
            <FooterLinkList links={areaLinks} />
          </nav>

          <nav aria-label="Footer popular venues">
            <h2 className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#fbf8f1]/62">Popular venues</h2>
            <FooterLinkList links={popularVenueLinks} />
          </nav>

          <nav aria-label="Footer editorial and collections">
            <h2 className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#fbf8f1]/62">Editorial</h2>
            <FooterLinkList links={editorialLinks} />
          </nav>
        </div>
      </div>
    </footer>
  );
}
