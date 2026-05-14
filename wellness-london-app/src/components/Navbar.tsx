import Link from "next/link";

const navLinks = [
  { href: "/explore", label: "Explore" },
  { href: "/recover", label: "Recover" },
  { href: "/perform", label: "Perform" },
  { href: "/reset", label: "Reset" },
  { href: "/optimise", label: "Optimise" },
  { href: "/longevity", label: "Longevity" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-[#f4efe6]/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between md:gap-6 md:px-8 md:py-5">
        <Link href="/" className="font-serif text-2xl font-normal tracking-normal text-[#29241d] transition hover:text-[#6f6048]">
          Well Edit
        </Link>

        <nav className="flex w-full gap-x-5 overflow-x-auto whitespace-nowrap pb-1 text-[13px] text-[#70695d] md:w-auto md:justify-end md:gap-x-7 md:overflow-visible md:pb-0">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 transition hover:text-[#29241d]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
