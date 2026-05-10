import Link from "next/link";

const pages = [
  {
    title: "Main Pages",
    links: [
      { href: "/", label: "Home" },
      { href: "/site-map", label: "Site Map" },
    ],
  },
  {
    title: "Wellness Categories",
    links: [
      { href: "/sauna-london", label: "Saunas in London" },
      { href: "/cold-plunge-london", label: "Cold Plunge in London" },
      { href: "/cryotherapy-london", label: "Cryotherapy in London" },
    ],
  },
];

export default function SiteMapPage() {
  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#211d18]">
      <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 sm:py-16">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
          Well Edit
        </p>
        <h1 className="mb-5 text-4xl font-semibold tracking-tight sm:mb-6 sm:text-5xl">Site Map</h1>

        <p className="mb-10 max-w-2xl text-base leading-7 text-stone-600 sm:mb-12 sm:text-lg sm:leading-8">
          Browse key Well Edit pages, guides and wellness categories.
        </p>

        <div className="space-y-9 sm:space-y-10">
          {pages.map((section) => (
            <section key={section.title}>
              <h2 className="mb-4 text-xl font-semibold sm:text-2xl">{section.title}</h2>

              <div className="grid gap-3">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="border border-stone-200 bg-[#fffdf8] px-4 py-4 text-sm transition hover:border-stone-300 sm:px-5"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
