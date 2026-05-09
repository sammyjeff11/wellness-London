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
    <main className="min-h-screen bg-white text-black">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-semibold tracking-tight mb-6">
          Site Map
        </h1>

        <p className="text-lg text-gray-600 mb-12 max-w-2xl">
          Browse key Wellness London pages, guides and wellness categories.
        </p>

        <div className="space-y-10">
          {pages.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-semibold mb-4">
                {section.title}
              </h2>

              <div className="grid gap-3">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="border rounded-2xl px-5 py-4 hover:shadow-md transition"
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
