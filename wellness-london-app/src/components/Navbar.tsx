"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import OverlayDialog from "@/components/OverlayDialog";
import {
  getSavedVenueSnapshot,
  parseSavedVenueSlugs,
  subscribeToSavedVenues,
} from "@/lib/saved-venues";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getActiveNavSection, type NavSection } from "@/lib/navigation";

const serviceLinks = [
  { href: "/services", label: "All services" },
  { href: "/sauna-london", label: "Sauna" },
  { href: "/cold-plunge-london", label: "Cold plunge" },
  { href: "/contrast-therapy-london", label: "Contrast therapy" },
  { href: "/cryotherapy-london", label: "Cryotherapy" },
  { href: "/longevity", label: "Longevity clinics" },
  { href: "/health-screening-london", label: "Health screening" },
  { href: "/vo2-max-testing-london", label: "VO₂ max testing" },
  { href: "/assisted-stretching-london", label: "Assisted stretching" },
];

const serviceGroups = [
  {
    label: "Recovery & performance",
    links: [
      { href: "/sauna-london", label: "Sauna" },
      { href: "/cold-plunge-london", label: "Cold plunge" },
      { href: "/contrast-therapy-london", label: "Contrast therapy" },
      { href: "/cryotherapy-london", label: "Cryotherapy" },
      { href: "/red-light-therapy-london", label: "Red light therapy" },
      { href: "/hbot-london", label: "HBOT" },
    ],
  },
  {
    label: "Longevity",
    links: [
      { href: "/longevity", label: "Clinics overview" },
      { href: "/health-screening-london", label: "Health screening" },
      { href: "/blood-testing-london", label: "Blood testing" },
      { href: "/dexa-scan-london", label: "DEXA scans" },
      { href: "/vo2-max-testing-london", label: "VO₂ max testing" },
    ],
  },
  {
    label: "Mobility",
    links: [
      { href: "/assisted-stretching-london", label: "Assisted stretching" },
    ],
  },
];

const exploreLinks = [
  { href: "/explore", label: "All venues" },
  { href: "/brands", label: "Multi-location brands" },
  { href: "/shortlist", label: "Saved venues" },
];

const areaLinks = [
  { href: "/neighbourhoods", label: "All areas" },
  { href: "/central-london-wellness", label: "Central London" },
  { href: "/east-london-wellness", label: "East London" },
  { href: "/west-london-wellness", label: "West London" },
  { href: "/north-london-wellness", label: "North London" },
  { href: "/south-london-wellness", label: "South London" },
];

const guideLinks = [
  { href: "/editorial", label: "All guides" },
  { href: "/collections", label: "Venue shortlists" },
  { href: "/collections/social-wellness-london", label: "Social wellness" },
  { href: "/editorial/best-saunas-london", label: "Best saunas" },
  { href: "/editorial/best-cryotherapy-london", label: "Best cryotherapy" },
  { href: "/how-we-curate", label: "How we curate" },
  { href: "/editorial-standards", label: "Editorial standards" },
];

const primaryLinks: {
  href: string;
  label: string;
  section: NavSection;
  children?: typeof serviceLinks;
}[] = [
  {
    href: "/explore",
    label: "Venues",
    section: "venues",
    children: exploreLinks,
  },
  {
    href: "/services",
    label: "Services",
    section: "services",
    children: serviceLinks,
  },
  {
    href: "/neighbourhoods",
    label: "Neighbourhoods",
    section: "areas",
    children: areaLinks,
  },
  {
    href: "/editorial",
    label: "Guides",
    section: "guides",
    children: guideLinks,
  },
];

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[1.15rem] w-[1.15rem]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <circle cx="10.8" cy="10.8" r="6.4" />
      <path d="m15.6 15.6 4 4" strokeLinecap="round" />
    </svg>
  );
}

function DesktopDropdown({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  return (
    <div className="absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-2">
      <div className="surface-paper-strong rounded-[1rem] p-2 shadow-[0_24px_65px_rgba(41,36,29,0.16)]">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block rounded-[0.7rem] px-4 py-3 text-[13px] normal-case tracking-normal text-[#5f574c] transition hover:bg-[#eee7da] hover:text-[#29241d] focus:bg-[#eee7da] focus:outline-none"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function DesktopServicesDropdown() {
  return (
    <div className="fixed left-1/2 top-[5.2rem] z-50 w-[min(46rem,calc(100vw-2rem))] -translate-x-1/2 pt-2">
      <div className="surface-paper-strong rounded-[1rem] p-3 shadow-[0_24px_65px_rgba(41,36,29,0.16)]">
        <Link
          href="/services"
          className="mb-2 flex items-center justify-between rounded-[0.7rem] px-4 py-3 text-[13px] normal-case tracking-normal text-[#29241d] transition hover:bg-[#eee7da] focus:bg-[#eee7da] focus:outline-none"
        >
          <span>Explore all services</span>
          <span aria-hidden="true">→</span>
        </Link>
        <div className="grid grid-cols-3 border-t border-[#d8cebf] pt-2">
          {serviceGroups.map((group, index) => (
            <div
              key={group.label}
              className={`px-2 ${index > 0 ? "border-l border-[#d8cebf]/80" : ""}`}
            >
              <p className="px-3 pb-2 pt-3 text-xs uppercase tracking-[0.18em] text-[#6f6048]">
                {group.label}
              </p>
              {group.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-[0.7rem] px-3 py-2.5 text-[13px] normal-case tracking-normal text-[#5f574c] transition hover:bg-[#eee7da] hover:text-[#29241d] focus:bg-[#eee7da] focus:outline-none"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const activeSection = getActiveNavSection(pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState<string | null>(null);
  const desktopNav = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!desktopOpen) return;
    function dismiss(event: PointerEvent) {
      if (!desktopNav.current?.contains(event.target as Node))
        setDesktopOpen(null);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        desktopNav.current
          ?.querySelector<HTMLButtonElement>(`button[aria-expanded="true"]`)
          ?.focus();
        setDesktopOpen(null);
      }
    }
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [desktopOpen]);

  const saved = useSyncExternalStore(
    subscribeToSavedVenues,
    getSavedVenueSnapshot,
    () => "[]",
  );
  const savedCount = parseSavedVenueSlugs(saved).length;

  return (
    <header className="sticky top-0 z-40 border-b border-[#d8cebf]/60 bg-[#f4efe6]/94 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.5rem] max-w-[1400px] items-center justify-between gap-4 px-5 md:h-auto md:px-8 md:py-5">
        <Link
          href="/"
          className="group inline-flex items-baseline gap-0.5 font-serif text-[1.7rem] font-normal leading-none tracking-[-0.03em] text-[#29241d] transition hover:text-[#6f6048]"
          aria-label="Well+ home"
        >
          <span>Well</span>
          <span className="translate-y-[-0.05em] text-[0.82em] font-light tracking-[-0.08em] transition group-hover:text-[#6f6048]">
            +
          </span>
        </Link>

        <nav
          ref={desktopNav}
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a"))
              setDesktopOpen(null);
          }}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node))
              setDesktopOpen(null);
          }}
          aria-label="Primary navigation"
          className="hidden items-center gap-5 text-sm text-[#70695d] lg:flex"
        >
          {primaryLinks.map((link) => {
            const isActive = activeSection === link.section;
            return (
              <div key={link.href} className="relative flex items-center">
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`inline-flex min-h-11 items-center border-b underline-offset-4 transition hover:text-[#29241d] ${isActive ? "border-[#29241d] text-[#29241d]" : "border-transparent"}`}
                >
                  {link.label}
                </Link>
                <button
                  type="button"
                  aria-expanded={desktopOpen === link.section}
                  aria-controls={`desktop-menu-${link.section}`}
                  aria-label={`Show ${link.label.toLowerCase()} links`}
                  onClick={() =>
                    setDesktopOpen((current) =>
                      current === link.section ? null : link.section,
                    )
                  }
                  className="inline-flex min-h-11 min-w-8 items-center justify-center text-xs"
                >
                  ⌄
                </button>
                {desktopOpen === link.section ? (
                  <div id={`desktop-menu-${link.section}`}>
                    {link.section === "services" ? (
                      <DesktopServicesDropdown />
                    ) : link.children ? (
                      <DesktopDropdown links={link.children} />
                    ) : null}
                  </div>
                ) : null}
              </div>
            );
          })}
          <Link
            href="/shortlist"
            className="inline-flex min-h-11 items-center text-sm"
          >
            Saved ({savedCount})
          </Link>
          <Link
            href="/explore"
            aria-label="Search venues"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-transparent text-[#29241d] transition hover:border-[#d8cebf] hover:bg-[#fbf8f1]"
          >
            <SearchIcon />
          </Link>
        </nav>

        <div className="flex items-center gap-1 lg:hidden">
          <Link
            href="/explore"
            aria-label="Search venues"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-[#29241d] transition hover:bg-[#eee7da]"
          >
            <SearchIcon />
          </Link>
          <Link
            href="/shortlist"
            className="inline-flex min-h-11 items-center rounded-full px-3 text-xs font-medium text-[#29241d] transition hover:bg-[#eee7da]"
          >
            Saved ({savedCount})
          </Link>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-primary-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex min-h-11 items-center rounded-full border border-[#b9ab97] px-4 text-xs font-medium text-[#29241d] transition hover:bg-[#eee7da]"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <OverlayDialog
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        title="Explore Well+"
      >
        <nav id="mobile-primary-menu" aria-label="Mobile primary navigation">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              aria-current={activeSection === link.section ? "page" : undefined}
              className="flex min-h-14 items-center justify-between border-b border-[#d8cebf] text-lg font-medium"
            >
              {link.label}
              <span aria-hidden="true">→</span>
            </Link>
          ))}
          <div className="mt-5">
            {serviceGroups.map((group) => (
              <details key={group.label} className="border-b border-[#d8cebf]">
                <summary className="cursor-pointer py-4 text-sm font-medium">
                  {group.label}
                </summary>
                <div className="pb-3">
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex min-h-11 items-center px-3 text-sm"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </details>
            ))}
          </div>
          <Link
            href="/shortlist"
            onClick={() => setMenuOpen(false)}
            className="mt-5 inline-flex min-h-12 items-center underline"
          >
            Saved venues ({savedCount})
          </Link>
        </nav>
      </OverlayDialog>
    </header>
  );
}
