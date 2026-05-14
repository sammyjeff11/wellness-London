export type TopicalAuthorityModality = {
  name: string;
  role: string;
  pages: { href: string; label: string }[];
};

export type TopicalAuthorityPillar = {
  slug: string;
  name: string;
  purpose: string;
  primaryPage: string;
  userIntent: string[];
  modalities: TopicalAuthorityModality[];
  existingPages: { href: string; label: string }[];
  missingPages: string[];
  linkedEntities: string[];
};

export const topicalAuthorityPillars: TopicalAuthorityPillar[] = [
  {
    slug: "recovery",
    name: "Recovery",
    purpose:
      "Own the user outcome of physical and mental recovery in London, with sauna, cold plunge, cryotherapy, contrast therapy and recovery studios treated as supporting modalities rather than standalone pillars.",
    primaryPage: "/guides/sauna-london-guide",
    userIntent: [
      "I want to recover after training",
      "I want to reset my body and mind",
      "I want to compare recovery treatments",
      "I want a calm place to unwind",
    ],
    modalities: [
      {
        name: "Sauna and heat therapy",
        role: "Heat-led recovery, relaxation, contrast therapy pairing and calmer weekly rituals.",
        pages: [
          { href: "/guides/sauna-london-guide", label: "The Well Edit Guide to Sauna in London" },
          { href: "/sauna-london", label: "Best Saunas in London" },
        ],
      },
      {
        name: "Cold plunge and ice baths",
        role: "Cold exposure, contrast therapy, post-training recovery and guided resilience routines.",
        pages: [{ href: "/cold-plunge-london", label: "Cold Plunge in London" }],
      },
      {
        name: "Cryotherapy",
        role: "Short, structured cold-therapy sessions for recovery-led wellness routines.",
        pages: [{ href: "/cryotherapy-london", label: "Cryotherapy in London" }],
      },
      {
        name: "Contrast therapy",
        role: "Combined heat and cold exposure for a fuller recovery ritual.",
        pages: [{ href: "/contrast-therapy-london", label: "Contrast Therapy in London" }],
      },
    ],
    existingPages: [
      { href: "/guides/sauna-london-guide", label: "The Well Edit Guide to Sauna in London" },
      { href: "/sauna-london", label: "Best Saunas in London" },
      { href: "/cold-plunge-london", label: "Cold Plunge in London" },
      { href: "/cryotherapy-london", label: "Cryotherapy in London" },
      { href: "/contrast-therapy-london", label: "Contrast Therapy in London" },
    ],
    missingPages: [
      "Best recovery studios in London",
      "Recovery modalities explained",
      "Sauna vs cold plunge vs cryotherapy",
      "Beginner recovery routine in London",
      "Post-workout recovery spaces in London",
      "Private recovery rooms in London",
    ],
    linkedEntities: [
      "recovery",
      "recovery studio",
      "sauna",
      "infrared sauna",
      "cold plunge",
      "ice bath",
      "cryotherapy",
      "contrast therapy",
      "breathwork",
      "compression therapy",
      "red light therapy",
    ],
  },
  {
    slug: "performance",
    name: "Performance",
    purpose:
      "Create a performance-led content layer for people using wellness spaces to support training, consistency, energy, mobility and readiness.",
    primaryPage: "/journal",
    userIntent: [
      "I want to train and recover better",
      "I want to improve energy and readiness",
      "I want recovery treatments that support performance",
      "I want practical wellness routines that fit around exercise",
    ],
    modalities: [
      {
        name: "Cold therapy",
        role: "Performance recovery, soreness management, mental resilience and training reset routines.",
        pages: [
          { href: "/cold-plunge-london", label: "Cold Plunge in London" },
          { href: "/cryotherapy-london", label: "Cryotherapy in London" },
        ],
      },
      {
        name: "Heat therapy",
        role: "Conditioning support, relaxation, post-training reset and contrast therapy pairing.",
        pages: [
          { href: "/sauna-london", label: "Best Saunas in London" },
          { href: "/guides/sauna-london-guide", label: "The Well Edit Guide to Sauna in London" },
        ],
      },
    ],
    existingPages: [
      { href: "/cold-plunge-london", label: "Cold Plunge in London" },
      { href: "/cryotherapy-london", label: "Cryotherapy in London" },
      { href: "/sauna-london", label: "Best Saunas in London" },
    ],
    missingPages: [
      "Best wellness spaces for athletes in London",
      "Post-training recovery guide",
      "Cold plunge for gym recovery",
      "Sauna for runners in London",
      "Recovery routines for busy professionals",
    ],
    linkedEntities: [
      "performance",
      "post-workout recovery",
      "training recovery",
      "readiness",
      "mobility",
      "HRV",
      "sleep quality",
      "cold exposure",
      "heat exposure",
    ],
  },
  {
    slug: "longevity",
    name: "Longevity",
    purpose:
      "Build an evidence-aware longevity layer around sustainable wellness behaviours, recovery science, heat exposure, cold exposure, sleep and modern health optimisation.",
    primaryPage: "/journal",
    userIntent: [
      "I want to build a healthier long-term routine",
      "I want to understand which wellness treatments matter",
      "I want longevity-focused wellness spaces",
      "I want evidence-aware guidance without hype",
    ],
    modalities: [
      {
        name: "Heat exposure",
        role: "A longevity-adjacent behaviour that connects sauna, recovery, relaxation and cardiovascular wellness interest.",
        pages: [
          { href: "/guides/sauna-london-guide", label: "The Well Edit Guide to Sauna in London" },
          { href: "/sauna-london", label: "Best Saunas in London" },
        ],
      },
      {
        name: "Cold exposure",
        role: "A modern wellness behaviour often associated with resilience, recovery and routine design.",
        pages: [{ href: "/cold-plunge-london", label: "Cold Plunge in London" }],
      },
      {
        name: "Recovery technology",
        role: "Cryotherapy, red light, compression and related modalities used within modern longevity spaces.",
        pages: [{ href: "/cryotherapy-london", label: "Cryotherapy in London" }],
      },
    ],
    existingPages: [
      { href: "/guides/sauna-london-guide", label: "The Well Edit Guide to Sauna in London" },
      { href: "/sauna-london", label: "Best Saunas in London" },
      { href: "/cold-plunge-london", label: "Cold Plunge in London" },
      { href: "/cryotherapy-london", label: "Cryotherapy in London" },
    ],
    missingPages: [
      "Longevity clinics in London",
      "Heat therapy and longevity",
      "Cold exposure and longevity",
      "Red light therapy London guide",
      "Sleep optimisation and longevity",
      "Modern longevity treatments explained",
    ],
    linkedEntities: [
      "longevity",
      "health optimisation",
      "heat exposure",
      "cold exposure",
      "sleep optimisation",
      "circadian rhythm",
      "HRV",
      "red light therapy",
      "compression therapy",
      "recovery science",
    ],
  },
  {
    slug: "stress-regulation",
    name: "Stress Regulation",
    purpose:
      "Own the calm, nervous-system-led side of wellness: downregulation, rest, sleep, breathwork, relaxation and slower recovery experiences.",
    primaryPage: "/journal",
    userIntent: [
      "I want to feel calmer",
      "I want to reduce stress",
      "I want to sleep better",
      "I want a non-intimidating wellness space",
    ],
    modalities: [
      {
        name: "Sauna and quiet recovery",
        role: "Calm heat exposure, private rooms, slower routines and evening recovery rituals.",
        pages: [
          { href: "/guides/sauna-london-guide", label: "The Well Edit Guide to Sauna in London" },
          { href: "/sauna-london", label: "Best Saunas in London" },
        ],
      },
      {
        name: "Breath-led cold exposure",
        role: "Guided cold exposure can sit within resilience, breathwork and nervous-system regulation routines.",
        pages: [{ href: "/cold-plunge-london", label: "Cold Plunge in London" }],
      },
    ],
    existingPages: [
      { href: "/guides/sauna-london-guide", label: "The Well Edit Guide to Sauna in London" },
      { href: "/sauna-london", label: "Best Saunas in London" },
      { href: "/cold-plunge-london", label: "Cold Plunge in London" },
    ],
    missingPages: [
      "Nervous system regulation guide",
      "Best calming wellness spaces in London",
      "Breathwork studios in London",
      "Sauna and sleep quality",
      "Evening recovery rituals in London",
      "Wellness spaces for stress relief in London",
    ],
    linkedEntities: [
      "stress regulation",
      "nervous system regulation",
      "sleep optimisation",
      "breathwork",
      "parasympathetic recovery",
      "relaxation",
      "private sauna",
      "guided cold exposure",
    ],
  },
  {
    slug: "luxury-wellness-experiences",
    name: "Luxury Wellness Experiences",
    purpose:
      "Differentiate Well Edit through premium curation, design-led spaces, atmosphere, service quality and high-intent London wellness discovery.",
    primaryPage: "/",
    userIntent: [
      "I want somewhere premium",
      "I want a beautiful wellness experience",
      "I want to compare luxury wellness spaces",
      "I want a private or design-led venue",
    ],
    modalities: [
      {
        name: "Premium recovery spaces",
        role: "Curated sauna, cold plunge, cryotherapy and recovery spaces with a stronger emphasis on design, service and atmosphere.",
        pages: [
          { href: "/sauna-london", label: "Best Saunas in London" },
          { href: "/cold-plunge-london", label: "Cold Plunge in London" },
          { href: "/cryotherapy-london", label: "Cryotherapy in London" },
        ],
      },
      {
        name: "Neighbourhood wellness",
        role: "Location-led discovery for premium wellness spaces across London.",
        pages: [
          { href: "/central-london-wellness", label: "Central London Wellness" },
          { href: "/west-london-wellness", label: "West London Wellness" },
          { href: "/east-london-wellness", label: "East London Wellness" },
        ],
      },
    ],
    existingPages: [
      { href: "/", label: "London Wellness Guide" },
      { href: "/central-london-wellness", label: "Central London Wellness" },
      { href: "/east-london-wellness", label: "East London Wellness" },
      { href: "/west-london-wellness", label: "West London Wellness" },
      { href: "/north-london-wellness", label: "North London Wellness" },
      { href: "/south-london-wellness", label: "South London Wellness" },
    ],
    missingPages: [
      "Luxury wellness clubs in London",
      "Design-led wellness studios in London",
      "Private wellness experiences in London",
      "Best wellness spaces for couples in London",
      "Wellness memberships in London",
      "Premium recovery studios in London",
    ],
    linkedEntities: [
      "luxury wellness",
      "London wellness",
      "boutique wellness studio",
      "members club",
      "private wellness experience",
      "spa",
      "design-led wellness",
      "recovery studio",
    ],
  },
];
