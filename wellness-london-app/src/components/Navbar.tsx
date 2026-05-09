import Link from "next/link";

const navLinks = [
  { href: "/sauna-london", label: "Saunas" },
  { href: "/cold-plunge-london", label: "Cold Plunge" },
  { href: "/cryotherapy-london", label: "Cryotherapy" },
  { href: "/site-map", label: "Site Map" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-[#f8f5ef]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="group inline-flex flex-col text-[#211d18]">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500 transition group-hover:text-[#7a643f]">
            Curated Directory
          </span>
          <span className="text-xl font-semibold tracking-tight">Wellness London</span>
        </Link>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-600">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-[#211d18] hover:underline underline-offset-4"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
