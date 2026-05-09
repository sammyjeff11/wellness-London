import Link from "next/link";

const navLinks = [
  { href: "/sauna-london", label: "Saunas" },
  { href: "/cold-plunge-london", label: "Cold Plunge" },
  { href: "/cryotherapy-london", label: "Cryotherapy" },
  { href: "/journal", label: "Journal" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-[#f4efe6]/88 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-5 md:px-8">
        <Link href="/" className="font-serif text-2xl font-normal tracking-normal text-[#29241d] transition hover:text-[#6f6048]">
          Well Edit
        </Link>

        <nav className="flex flex-wrap justify-end gap-x-5 gap-y-2 text-[13px] text-[#70695d] md:gap-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-[#29241d]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
