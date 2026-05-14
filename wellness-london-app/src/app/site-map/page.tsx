import Link from "next/link";

const pages = [
  {
    title: "Explore by intention",
    links: [
      { href: "/explore", label: "Explore London Wellness" },
      { href: "/recover", label: "Recover" },
      { href: "/perform", label: "Perform" },
      { href: "/reset", label: "Reset" },
      { href: "/optimise", label: "Optimise" },
      { href: "/longevity", label: "Longevity" },
    ],
  },
  {
    title: "Treatments and services",
    links: [
      { href: "/sauna-london", label: "Saunas in London" },
      { href: "/cold-plunge-london", label: "Cold Plunge in London" },
      { href: "/cryotherapy-london", label: "Cryotherapy in London" },
      { href: "/contrast-therapy-london", label: "Contrast Therapy in London" },
      { href: "/recovery-london", label: "Recovery Spaces in London" },
    ],
  },
  {
    title: "Browse by area",
    links: [
      { href: "/central-london-wellness", label: "Central London Wellness" },
      { href: "/east-london-wellness", label: "East London Wellness" },
      { href: "/west-london-wellness", label: "West London Wellness" },
      { href: "/north-london-wellness", label: "North London Wellness" },
      { href: "/south-london-wellness", label: "South London Wellness" },
    ],
  },
  {
    title: "Editorial and trust",
    links: [
      { href: "/how-we-curate", label: "How We Curate" },
      { href: "/editorial-standards", label: "Editorial Standards" },
      { href: "/journal", label: "Journal" },
    ],
  },
];

export default function SiteMapPage() {
  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#211d18]">
      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 sm:py-16">
        <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-stone-500">
          Well Edit
        </p>
        <h1 className="mb-5 font-serif text-5xl font-normal tracking-tight sm:mb-6 sm:text-6xl">
          Site Map
        </h1>

        <p className="mb-12 max-w-3xl text-base leading-8 text-stone-600 sm:text-lg">
          Browse the core sections of The Well Edit, including wellness pillars, treatment-led guides, editorial standards and London wellness categories.
        </p>

        <div className="space-y-12">
          {pages.map((section) => (
            <section key={section.title}>
              <h2 className="mb-5 font-serif text-3xl font-normal sm:text-4xl">{section.title}</h2>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="border border-stone-200 bg-[#fffdf8] px-5 py-5 text-sm transition hover:border-stone-300 hover:bg-[#f4efe6]"
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
