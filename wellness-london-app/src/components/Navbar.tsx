import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/sauna-london", label: "Saunas" },
  { href: "/cold-plunge-london", label: "Cold Plunge" },
  { href: "/cryotherapy-london", label: "Cryotherapy" },
  { href: "/site-map", label: "Site Map" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-[#f8f5ef]/90 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="text-xl font-semibold tracking-tight text-[#211d18]">
          Wellness London
        </Link>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-600">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-[#211d18] hover:underline underline-offset-4 transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
