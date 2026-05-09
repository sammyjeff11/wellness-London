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
      <div className="mx-auto max-w-4xl px-6 py-16">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
          Wellness London
        </p>
        <h1 className="mb-6 text-5xl font-semibold tracking-tight">Site Map</h1>

        <p className="mb-12 max-w-2xl text-lg leading-8 text-stone-600">
          Browse key Wellness London pages, guides and wellness categories.
        </p>

        <div className="space-y-10">
          {pages.map((section) => (
            <section key={section.title}>
              <h2 className="mb-4 text-2xl font-semibold">{section.title}</h2>

              <div className="grid gap-3">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-[1.5rem] border border-stone-200 bg-[#fffdf8] px-5 py-4 transition hover:-translate-y-1 hover:shadow-xl"
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
