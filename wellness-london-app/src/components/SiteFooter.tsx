import Link from "next/link";
import { locationHubLinks } from "@/lib/location-hubs";

const serviceLinks = [
  { href: "/sauna-london", label: "Saunas in London" },
  { href: "/cold-plunge-london", label: "Cold Plunge in London" },
  { href: "/cryotherapy-london", label: "Cryotherapy in London" },
  { href: "/contrast-therapy-london", label: "Contrast Therapy in London" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-[#29241d] px-5 py-12 text-[#fbf8f1] sm:px-6 sm:py-16">
      <div className="mx-auto grid max-w-6xl gap-10 border-t border-[#fbf8f1]/18 pt-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#fbf8f1]/62">Well Edit</p>
          <p className="max-w-sm text-sm leading-7 text-[#fbf8f1]/72">
            A quiet editorial guide to London wellness spaces, recovery studios, saunas, cold plunges and cryotherapy venues.
          </p>
        </div>

        <nav aria-label="Footer services">
          <h2 className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#fbf8f1]/62">Explore</h2>
          <ul className="space-y-3 text-sm">
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-[#fbf8f1]/82 underline-offset-4 transition hover:text-[#fbf8f1] hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/journal" className="text-[#fbf8f1]/82 underline-offset-4 transition hover:text-[#fbf8f1] hover:underline">
                Journal
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Footer areas">
          <h2 className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#fbf8f1]/62">By area</h2>
          <ul className="space-y-3 text-sm">
            {locationHubLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-[#fbf8f1]/82 underline-offset-4 transition hover:text-[#fbf8f1] hover:underline">
                  {link.label.replace(" wellness spaces", "").replace(" saunas and recovery studios", "").replace(" recovery spaces", "")}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
