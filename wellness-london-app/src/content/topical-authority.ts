export type TopicalAuthorityPillar = {
  slug: string;
  name: string;
  purpose: string;
  primaryPage: string;
  existingPages: { href: string; label: string }[];
  missingPages: string[];
  linkedEntities: string[];
};

export const topicalAuthorityPillars: TopicalAuthorityPillar[] = [
  {
    slug: "sauna-heat-therapy",
    name: "Sauna & Heat Therapy",
    purpose:
      "Own the London sauna topic from commercial discovery through to evergreen education, covering sauna types, heat rituals, contrast therapy and beginner guidance.",
    primaryPage: "/guides/sauna-london-guide",
    existingPages: [
      { href: "/sauna-london", label: "Best Saunas in London" },
      { href: "/contrast-therapy-london", label: "Contrast Therapy in London" },
      { href: "/cold-plunge-london", label: "Cold Plunge in London" },
    ],
    missingPages: [
      "Infrared sauna London guide",
      "Sauna vs steam room",
      "Sauna etiquette for beginners",
      "Best sauna and cold plunge experiences in London",
      "Private sauna rooms in London",
      "Traditional Finnish sauna in London",
    ],
    linkedEntities: [
      "infrared sauna",
      "traditional sauna",
      "Finnish sauna",
      "steam room",
      "heat therapy",
      "contrast therapy",
      "cold plunge",
      "recovery routine",
      "London wellness",
    ],
  },
  {
    slug: "cold-therapy-recovery",
    name: "Cold Therapy & Recovery",
    purpose:
      "Build authority around cold plunge, ice baths, cryotherapy and recovery-led cold exposure in London.",
    primaryPage: "/cold-plunge-london",
    existingPages: [
      { href: "/cold-plunge-london", label: "Cold Plunge in London" },
      { href: "/cryotherapy-london", label: "Cryotherapy in London" },
      { href: "/contrast-therapy-london", label: "Contrast Therapy in London" },
    ],
    missingPages: [
      "Cold plunge guide for beginners",
      "Cold plunge vs cryotherapy",
      "Ice bath studios in London",
      "Guided cold exposure in London",
      "Cold therapy for post-training recovery",
    ],
    linkedEntities: [
      "cold plunge",
      "ice bath",
      "cryotherapy",
      "cold exposure",
      "contrast therapy",
      "breathwork",
      "recovery studio",
      "nervous system regulation",
    ],
  },
  {
    slug: "sleep-nervous-system-recovery",
    name: "Sleep & Nervous System Recovery",
    purpose:
      "Create informational depth around recovery, downregulation, rest, breathwork, sleep hygiene and calmer wellness routines.",
    primaryPage: "/journal",
    existingPages: [
      { href: "/journal", label: "Journal" },
      { href: "/sauna-london", label: "Saunas in London" },
      { href: "/cold-plunge-london", label: "Cold Plunge in London" },
    ],
    missingPages: [
      "Nervous system regulation guide",
      "Wellness routines for better sleep",
      "Sauna and sleep quality",
      "Breathwork studios in London",
      "Evening recovery rituals",
    ],
    linkedEntities: [
      "sleep optimisation",
      "nervous system regulation",
      "HRV",
      "breathwork",
      "parasympathetic recovery",
      "evening routine",
      "stress recovery",
    ],
  },
  {
    slug: "luxury-wellness-london",
    name: "Luxury Wellness in London",
    purpose:
      "Position Well Edit as a premium editorial guide to design-led, high-quality wellness spaces across London.",
    primaryPage: "/",
    existingPages: [
      { href: "/", label: "London Wellness Guide" },
      { href: "/central-london-wellness", label: "Central London Wellness" },
      { href: "/west-london-wellness", label: "West London Wellness" },
      { href: "/east-london-wellness", label: "East London Wellness" },
    ],
    missingPages: [
      "Luxury wellness clubs in London",
      "Private wellness experiences in London",
      "Best wellness spaces for couples in London",
      "Design-led wellness studios in London",
      "Premium recovery studios in London",
    ],
    linkedEntities: [
      "luxury wellness",
      "London wellness",
      "boutique wellness studio",
      "private wellness experience",
      "members club",
      "spa",
      "recovery studio",
    ],
  },
  {
    slug: "longevity-recovery-science",
    name: "Longevity & Recovery Science",
    purpose:
      "Support commercial wellness pages with accessible explainers on recovery science, longevity practices and evidence-aware routines.",
    primaryPage: "/journal",
    existingPages: [
      { href: "/journal", label: "Journal" },
      { href: "/cryotherapy-london", label: "Cryotherapy in London" },
      { href: "/sauna-london", label: "Saunas in London" },
    ],
    missingPages: [
      "Recovery modalities explained",
      "Heat therapy and longevity",
      "Cold exposure and recovery",
      "Red light therapy London guide",
      "Compression therapy London guide",
    ],
    linkedEntities: [
      "longevity",
      "recovery science",
      "heat exposure",
      "cold exposure",
      "red light therapy",
      "compression therapy",
      "HRV",
      "circadian rhythm",
    ],
  },
  {
    slug: "wellness-spaces-experiences",
    name: "Wellness Spaces & Experiences",
    purpose:
      "Create location and intent-led pathways that help users choose venues by atmosphere, access model, facilities and neighbourhood.",
    primaryPage: "/site-map",
    existingPages: [
      { href: "/central-london-wellness", label: "Central London Wellness" },
      { href: "/east-london-wellness", label: "East London Wellness" },
      { href: "/west-london-wellness", label: "West London Wellness" },
      { href: "/north-london-wellness", label: "North London Wellness" },
      { href: "/south-london-wellness", label: "South London Wellness" },
    ],
    missingPages: [
      "Best recovery studios in London",
      "Wellness spaces open late in London",
      "Beginner-friendly wellness spaces in London",
      "Private recovery rooms in London",
      "Wellness memberships in London",
    ],
    linkedEntities: [
      "recovery studio",
      "wellness club",
      "private room",
      "group session",
      "guided session",
      "changing facilities",
      "showers",
      "London neighbourhoods",
    ],
  },
];
