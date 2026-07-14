"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/explore", label: "Explore" },
  { href: "/collections", label: "Collections" },
  { href: "/editorial", label: "Editorial" },
  { href: "/recover", label: "Recovery" },
  { href: "/longevity", label: "Longevity" },
];

const longevityLinks = [
  { href: "/longevity", label: "Clinics" },
  { href: "/dexa-scan-london", label: "DEXA" },
  { href: "/vo2-max-testing-london", label: "VO₂ Max" },
  { href: "/health-screening-london", label: "Health Screening" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLongevityRoute = pathname === "/longevity" || longevityLinks.some((link) => pathname === link.href);

  return (
    <header className="sticky top-0 z-40 border-b border-[#d8cebf]/45 bg-[#f4efe6]/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:gap-6 md:px-8 md:py-5">
        <Link href="/" onClick={() => setIsMenuOpen(false)} className="group inline-flex items-baseline gap-0.5 font-serif text-[1.7rem] font-normal leading-none tracking-[-0.03em] text-[#29241d] transition hover:text-[#6f6048]" aria-label="Well+ home">
          <span>Well</span>
          <span className="translate-y-[-0.05em] text-[0.82em] font-light tracking-[-0.08em] transition group-hover:text-[#8d7d67]">+</span>
        </Link>

        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-primary-navigation"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          className="rounded-full border border-[#cfc3b2] bg-[#fbf8f1] px-4 py-2 text-sm text-[#29241d] md:hidden"
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>

        <nav aria-label="Primary navigation" className="hidden items-center gap-x-7 text-[13px] uppercase tracking-[0.12em] text-[#70695d] md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`) || (link.href === "/longevity" && isLongevityRoute);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`shrink-0 underline-offset-4 transition hover:text-[#29241d] ${
                  isActive ? "text-[#29241d] underline" : ""
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {isMenuOpen ? (
        <nav id="mobile-primary-navigation" aria-label="Mobile primary navigation" className="border-t border-[#d8cebf]/55 bg-[#fbf8f1] px-5 py-3 md:hidden">
          <div className="mx-auto grid max-w-[1400px] divide-y divide-[#d8cebf]/65">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`) || (link.href === "/longevity" && isLongevityRoute);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center justify-between py-3.5 text-base ${isActive ? "font-medium text-[#29241d]" : "text-[#5f574c]"}`}
                >
                  <span>{link.label}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}

      {isLongevityRoute ? (
        <nav aria-label="Longevity services" className="border-t border-[#d8cebf]/45 px-5 py-2.5 md:hidden">
          <div className="flex flex-wrap gap-2">
            {longevityLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-full border px-3 py-1.5 text-xs ${
                    isActive
                      ? "border-[#29241d] bg-[#29241d] text-[#fbf8f1]"
                      : "border-[#cfc3b2] bg-[#fbf8f1] text-[#5f574c]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
