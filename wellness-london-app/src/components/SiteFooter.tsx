import Link from "next/link";
import { locationHubLinks } from "@/lib/location-hubs";

const pillarLinks = [
  { href: "/recover", label: "Recover" },
  { href: "/perform", label: "Perform" },
  { href: "/reset", label: "Reset" },
  { href: "/optimise", label: "Optimise" },
  { href: "/longevity", label: "Longevity" },
];

const serviceLinks = [
  { href: "/sauna-london", label: "Saunas in London" },
  { href: "/cold-plunge-london", label: "Cold Plunge in London" },
  { href: "/cryotherapy-london", label: "Cryotherapy in London" },
  { href: "/contrast-therapy-london", label: "Contrast Therapy in London" },
  { href: "/recovery-london", label: "Recovery Spaces in London" },
];

const collectionLinks = [
  { href: "/best-sauna-cold-plunge-london", label: "Best Sauna + Cold Plunge" },
  { href: "/beginner-friendly-wellness-london", label: "Beginner-Friendly Wellness" },
];

const trustLinks = [
  { href: "/how-we-curate", label: "How We Curate" },
  { href: "/editorial-standards", label: "Editorial Standards" },
  { href: "/journal", label: "Journal" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-[#29241d] px-5 py-12 text-[#fbf8f1] sm:px-6 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-10 border-t border-[#fbf8f1]/18 pt-10 md:grid-cols-[1.2fr_0.9fr_0.9fr_0.9fr_0.9fr]">
        <div>
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#fbf8f1]/62">Well+</p>
          <p className="max-w-sm text-sm leading-7 text-[#fbf8f1]/72">
            The London wellness edit — a curated guide to recovery, performance, longevity and modern wellbeing across the capital.
          </p>
        </div>

        <nav aria-label="Footer pillars">
          <h2 className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#fbf8f1]/62">Explore by intention</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/explore" className="text-[#fbf8f1]/82 underline-offset-4 transition hover:text-[#fbf8f1] hover:underline">
                Explore
              </Link>
            </li>
            {pillarLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-[#fbf8f1]/82 underline-offset-4 transition hover:text-[#fbf8f1] hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer services">
          <h2 className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#fbf8f1]/62">Treatments</h2>
          <ul className="space-y-3 text-sm">
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-[#fbf8f1]/82 underline-offset-4 transition hover:text-[#fbf8f1] hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer areas and collections">
          <h2 className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#fbf8f1]/62">Areas</h2>
          <ul className="space-y-3 text-sm">
            {locationHubLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-[#fbf8f1]/82 underline-offset-4 transition hover:text-[#fbf8f1] hover:underline">
                  {link.label.replace(" wellness spaces", "").replace(" saunas and recovery studios", "").replace(" recovery spaces", "")}
                </Link>
              </li>
            ))}
            {collectionLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-[#fbf8f1]/82 underline-offset-4 transition hover:text-[#fbf8f1] hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer trust">
          <h2 className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#fbf8f1]/62">Editorial</h2>
          <ul className="space-y-3 text-sm">
            {trustLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-[#fbf8f1]/82 underline-offset-4 transition hover:text-[#fbf8f1] hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
