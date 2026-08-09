"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getActiveNavSection, type NavSection } from "@/lib/navigation";

const serviceLinks = [
  { href: "/services", label: "All services" },
  { href: "/sauna-london", label: "Sauna" },
  { href: "/cold-plunge-london", label: "Cold plunge" },
  { href: "/contrast-therapy-london", label: "Contrast therapy" },
  { href: "/cryotherapy-london", label: "Cryotherapy" },
  { href: "/red-light-therapy-london", label: "Red light therapy" },
  { href: "/hbot-london", label: "HBOT" },
  { href: "/recovery-london", label: "Recovery" },
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

const longevityLinks = [
  { href: "/longevity", label: "Clinics overview" },
  { href: "/health-screening-london", label: "Health screening" },
  { href: "/blood-testing-london", label: "Blood testing" },
  { href: "/cardiovascular-screening-london", label: "Heart health" },
  { href: "/dexa-scan-london", label: "DEXA" },
  { href: "/vo2-max-testing-london", label: "VO₂ max" },
  { href: "/medical-imaging-london", label: "Medical imaging" },
];

const primaryLinks: { href: string; label: string; section: NavSection; children?: typeof serviceLinks }[] = [
  { href: "/explore", label: "Venues", section: "venues" },
  { href: "/services", label: "Services", section: "services", children: serviceLinks },
  { href: "/neighbourhoods", label: "Areas", section: "areas", children: areaLinks },
  { href: "/editorial", label: "Guides", section: "guides", children: guideLinks },
  { href: "/longevity", label: "Longevity", section: "longevity", children: longevityLinks },
];

function DesktopDropdown({ links }: { links: { href: string; label: string }[] }) {
  return (
    <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-4 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
      <div className="surface-paper-strong rounded-[1rem] p-2 shadow-[0_24px_65px_rgba(41,36,29,0.16)]">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="block rounded-[0.7rem] px-4 py-3 text-[13px] normal-case tracking-normal text-[#5f574c] transition hover:bg-[#eee7da] hover:text-[#29241d] focus:bg-[#eee7da] focus:outline-none">
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const activeSection = getActiveNavSection(pathname);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-[#d8cebf]/60 bg-[#f4efe6]/94 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.5rem] max-w-[1400px] items-center justify-between gap-4 px-5 md:h-auto md:px-8 md:py-5">
        <Link href="/" className="group inline-flex items-baseline gap-0.5 font-serif text-[1.7rem] font-normal leading-none tracking-[-0.03em] text-[#29241d] transition hover:text-[#6f6048]" aria-label="Well+ home">
          <span>Well</span>
          <span className="translate-y-[-0.05em] text-[0.82em] font-light tracking-[-0.08em] transition group-hover:text-[#8d7d67]">+</span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-7 text-[11px] uppercase tracking-[0.15em] text-[#70695d] md:flex">
          {primaryLinks.map((link) => {
            const isActive = activeSection === link.section;
            return (
              <div key={link.href} className="group relative">
                <Link href={link.href} aria-current={isActive ? "page" : undefined} className={`inline-flex min-h-11 items-center border-b underline-offset-4 transition hover:text-[#29241d] ${isActive ? "border-[#29241d] text-[#29241d]" : "border-transparent"}`}>
                  {link.label}
                </Link>
                {link.children ? <DesktopDropdown links={link.children} /> : null}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <Link href="/explore" aria-label="Search venues" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-xl text-[#29241d] transition hover:bg-[#eee7da]">⌕</Link>
          <Link href="/shortlist" className="inline-flex min-h-11 items-center rounded-full px-3 text-xs font-medium text-[#29241d] transition hover:bg-[#eee7da]">Saved</Link>
          <button type="button" aria-expanded={menuOpen} aria-controls="mobile-primary-menu" onClick={() => setMenuOpen((open) => !open)} className="inline-flex min-h-11 items-center rounded-full border border-[#b9ab97] px-4 text-xs font-medium text-[#29241d] transition hover:bg-[#eee7da]">
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <>
          <button type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)} className="fixed inset-0 top-[4.5rem] z-40 bg-[#29241d]/36 backdrop-blur-[2px] md:hidden" />
          <nav id="mobile-primary-menu" aria-label="Mobile primary navigation" className="fixed inset-x-0 top-[4.5rem] z-50 max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-[#d8cebf] bg-[#f4efe6] px-5 pb-8 pt-4 shadow-[0_28px_70px_rgba(41,36,29,0.2)] md:hidden">
            {primaryLinks.map((link) => {
              const isActive = activeSection === link.section;
              return (
                <section key={link.href} className="border-b border-[#d8cebf]/75 py-4">
                  <Link href={link.href} onClick={() => setMenuOpen(false)} aria-current={isActive ? "page" : undefined} className={`flex min-h-11 items-center justify-between font-serif text-[2rem] leading-none tracking-[-0.035em] ${isActive ? "text-[#29241d]" : "text-[#5f574c]"}`}>
                    {link.label}
                    <span aria-hidden="true" className="text-base">→</span>
                  </Link>
                  {link.children ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {link.children.slice(1).map((child) => (
                        <Link key={child.href} href={child.href} onClick={() => setMenuOpen(false)} className="inline-flex min-h-11 items-center rounded-full border border-[#d8cebf] bg-[#fbf8f1] px-4 text-sm text-[#5f574c] transition hover:border-[#29241d] hover:text-[#29241d]">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </section>
              );
            })}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Link href="/shortlist" onClick={() => setMenuOpen(false)} className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#29241d] text-sm">Saved venues</Link>
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#29241d] text-sm text-[#fbf8f1]">Contact Well+</Link>
            </div>
          </nav>
        </>
      ) : null}
    </header>
  );
}
