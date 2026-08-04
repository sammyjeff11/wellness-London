export type NeighbourhoodPage = {
  slug: string;
  title: string;
  shortTitle: string;
  href: string;
  region: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  intro: string;
  summary: string;
  bestFor: string[];
  character: string;
  visitNotes: string[];
  relatedAreas: string[];
  relatedLinks: { href: string; label: string }[];
};

export const neighbourhoodPages: NeighbourhoodPage[] = [
  {
    slug: "shoreditch",
    title: "Wellness in Shoreditch",
    shortTitle: "Shoreditch",
    href: "/neighbourhoods/shoreditch",
    region: "East London",
    metaTitle: "Wellness in Shoreditch | Sauna & Cold Plunge | Well+",
    metaDescription:
      "Explore Shoreditch recovery venues offering sauna, cold plunge, contrast therapy and other wellness services.",
    eyebrow: "East London energy",
    intro:
      "Explore recovery venues in Shoreditch offering sauna, cold plunge, contrast therapy and other wellness services. Compare facilities by service type, setting and location before choosing where to book.",
    summary:
      "This is a useful area when you want wellness to feel active rather than overly quiet: a place for heat, cold, movement, post-work resets and weekend recovery routines.",
    bestFor: ["Contrast therapy", "Social wellness", "Post-work recovery", "Cold exposure", "Modern studios"],
    character:
      "The Shoreditch wellness scene feels energetic and contemporary. It suits people who want recovery to sit close to work, food, fitness and nightlife rather than feel like a destination spa escape.",
    visitNotes: [
      "Good for pairing sauna or cold exposure with a wider East London day out.",
      "Expect a more urban, social atmosphere than traditional spa-led wellness.",
      "Check booking windows carefully — smaller studios can have limited peak-time availability.",
    ],
    relatedAreas: ["Hackney", "Hoxton", "London Fields", "The City"],
    relatedLinks: [
      { href: "/cold-plunge-london", label: "Cold Plunge in London" },
      { href: "/contrast-therapy-london", label: "Contrast Therapy in London" },
      { href: "/east-london-wellness", label: "East London wellness spaces" },
    ],
  },
  {
    slug: "canary-wharf",
    title: "Wellness in Canary Wharf",
    shortTitle: "Canary Wharf",
    href: "/neighbourhoods/canary-wharf",
    region: "East London",
    metaTitle: "Wellness in Canary Wharf | Sauna, Ice Baths & Recovery | Well+",
    metaDescription:
      "Explore Canary Wharf wellness, from Arc's communal sauna and ice baths to Third Space recovery services, with practical guidance before booking.",
    eyebrow: "Docklands recovery",
    intro:
      "Canary Wharf has evolved beyond its office-district identity into a modern waterside neighbourhood with high-spec health clubs, recovery treatments and one of London's most distinctive communal contrast-therapy spaces.",
    summary:
      "The local edit is strongest for structured recovery: sauna, ice baths, guided contrast sessions and specialist treatments that can fit before work, after work or into a focused weekend visit.",
    bestFor: ["Post-work recovery", "Sauna", "Cold plunge", "Cryotherapy", "Premium wellness"],
    character:
      "The atmosphere is polished, contemporary and efficient, shaped by modern architecture, waterside public spaces and a weekday business rhythm. Arc adds a more social, sensory counterpoint to the area's club-led wellness offer.",
    visitNotes: [
      "Useful for weekday recovery before work, after work or between meetings.",
      "Check access rules carefully because some facilities may sit inside broader gym or club settings.",
      "Compare exact location details before travelling, especially around Crossrail Place and Canada Square.",
    ],
    relatedAreas: ["Shoreditch", "The City", "East London"],
    relatedLinks: [
      { href: "/sauna-london", label: "Saunas in London" },
      { href: "/cold-plunge-london", label: "Cold Plunge in London" },
      { href: "/east-london-wellness", label: "East London wellness spaces" },
    ],
  },
  {
    slug: "kensington",
    title: "Wellness in Kensington",
    shortTitle: "Kensington",
    href: "/neighbourhoods/kensington",
    region: "West London",
    metaTitle: "Wellness in Kensington | Cryotherapy, Sauna & HBOT | Well+",
    metaDescription:
      "Compare Kensington recovery venues offering sauna, cryotherapy, red light therapy and HBOT, with practical details to check before booking.",
    eyebrow: "West London recovery",
    intro:
      "Kensington's wellness offer reflects the neighbourhood itself: polished, appointment-led and premium, with technology-led recovery close to the shops, homes and hotels around Kensington High Street.",
    summary:
      "Kensington is useful when you want premium recovery, biohacking and wellness services close to High Street Kensington rather than a broad West London search.",
    bestFor: ["Infrared sauna", "Cryotherapy", "Red light therapy", "HBOT", "Premium recovery"],
    character:
      "The current Well+ edit is intentionally compact and centres on a verified High Street Kensington venue offering equipment-led recovery, longevity and movement services.",
    visitNotes: [
      "The current Kensington edit only shows venues that are published and confidently matched to the neighbourhood.",
      "Useful for comparing infrared sauna, cryotherapy, red light therapy and HBOT options around High Street Kensington.",
      "Check access details carefully because one listed venue has a private-members signal in the data.",
    ],
    relatedAreas: ["Notting Hill", "West London", "Central London"],
    relatedLinks: [
      { href: "/sauna-london", label: "Saunas in London" },
      { href: "/cryotherapy-london", label: "Cryotherapy in London" },
      { href: "/west-london-wellness", label: "West London wellness spaces" },
    ],
  },
  {
    slug: "marylebone",
    title: "Wellness in Marylebone",
    shortTitle: "Marylebone",
    href: "/neighbourhoods/marylebone",
    region: "Central London",
    metaTitle: "Wellness in Marylebone | Well+ London Neighbourhood Guide",
    metaDescription:
      "Compare recovery, longevity and clinical wellness venues in Marylebone, with practical access and location guidance.",
    eyebrow: "Refined central wellness",
    intro:
      "Marylebone is a useful base for private recovery, clinical wellness and longevity appointments without leaving central London.",
    summary:
      "The area works well when you want a quieter central London base with a more considered feel — less rushed than Soho, but still easy to reach before work, after meetings or at the weekend.",
    bestFor: ["Premium wellness", "Longevity routines", "Clinical treatments", "Calm recovery", "Central access"],
    character:
      "Marylebone’s wellness character is composed and discreet. It is less about spectacle and more about quality, convenience and a sense of calm within central London.",
    visitNotes: [
      "A strong area for combining wellness with medical, beauty or performance-led appointments.",
      "Best suited to users who value calm, service and convenience over a high-energy studio feel.",
      "Works well as a weekday wellness location because of its central position.",
    ],
    relatedAreas: ["Fitzrovia", "Mayfair", "Regent’s Park", "Baker Street"],
    relatedLinks: [
      { href: "/longevity", label: "Longevity in London" },
      { href: "/recovery-london", label: "Recovery spaces in London" },
      { href: "/central-london-wellness", label: "Central London wellness spaces" },
    ],
  },
  {
    slug: "notting-hill",
    title: "Wellness in Notting Hill",
    shortTitle: "Notting Hill",
    href: "/neighbourhoods/notting-hill",
    region: "West London",
    metaTitle: "Wellness in Notting Hill | Well+ London Neighbourhood Guide",
    metaDescription:
      "Compare sauna, spa, movement and treatment-led wellness venues in Notting Hill and nearby West London neighbourhoods.",
    eyebrow: "West London lifestyle",
    intro:
      "Notting Hill brings an unhurried, lifestyle-led feel to wellness. The current Well+ edit is centred on a multidisciplinary spa and members' club in the neighbourhood's quieter residential streets.",
    summary:
      "The strongest verified local signal is slow, treatment-led wellbeing rather than performance recovery: heat, cold, bodywork, holistic therapies and restorative appointments in one considered setting.",
    bestFor: ["Slow wellness", "Lifestyle rituals", "Premium studios", "Weekend resets", "Calm atmosphere"],
    character:
      "The Notting Hill wellness identity is warm, aesthetic and unhurried. It works well for people who want recovery and self-care to feel integrated into everyday life rather than treated as a standalone appointment.",
    visitNotes: [
      "Best approached as part of a wider West London morning or afternoon rather than a rushed visit.",
      "Good for users who care about atmosphere, design and the feel of a venue.",
      "Check the exact postcode before travelling: neighbouring Bayswater, Holland Park and Ladbroke Grove are distinct local areas and are not automatically included here.",
    ],
    relatedAreas: ["Holland Park", "Ladbroke Grove", "Bayswater", "Kensington"],
    relatedLinks: [
      { href: "/reset", label: "Reset spaces" },
      { href: "/sauna-london", label: "Saunas in London" },
      { href: "/west-london-wellness", label: "West London wellness spaces" },
    ],
  },
  {
    slug: "soho",
    title: "Wellness in Soho",
    shortTitle: "Soho",
    href: "/neighbourhoods/soho",
    region: "Central London",
    metaTitle: "Wellness in Soho | Well+ London Neighbourhood Guide",
    metaDescription:
      "A Well+ guide to wellness in Soho, covering central London recovery, sauna, treatments and quick rituals around work, food and city life.",
    eyebrow: "Central city rituals",
    intro:
      "Soho is wellness at London speed: central, compact and easy to fold into a working day, evening plan or weekend in the city.",
    summary:
      "The area is best for people who want useful, well-located wellness rather than a retreat-like escape — short recovery sessions, treatments, heat, cold and resets close to everything else.",
    bestFor: ["Convenient recovery", "After-work resets", "Central treatments", "Short sessions", "City routines"],
    character:
      "Soho’s wellness character is practical and high-energy. It is less about silence and more about access: being able to recover, reset or recharge without leaving the centre of London.",
    visitNotes: [
      "Useful when you want wellness close to restaurants, offices, hotels and transport links.",
      "Expect a busier central London feel, especially around evenings and weekends.",
      "Ideal for shorter sessions rather than slow, all-day wellness experiences.",
    ],
    relatedAreas: ["Fitzrovia", "Covent Garden", "Mayfair", "Oxford Circus"],
    relatedLinks: [
      { href: "/perform", label: "Performance recovery" },
      { href: "/recovery-london", label: "Recovery spaces in London" },
      { href: "/central-london-wellness", label: "Central London wellness spaces" },
    ],
  },
  {
    slug: "hampstead",
    title: "Wellness in Hampstead",
    shortTitle: "Hampstead",
    href: "/neighbourhoods/hampstead",
    region: "North London",
    metaTitle: "Wellness in Hampstead | Well+ London Neighbourhood Guide",
    metaDescription:
      "Discover wellness in Hampstead with Well+, including calm North London recovery, sauna, restorative routines and nature-adjacent wellness experiences.",
    eyebrow: "North London calm",
    intro:
      "Hampstead brings a slower, more restorative quality to London wellness — shaped by green space, village-like streets and a natural sense of distance from the city’s pace.",
    summary:
      "This is a strong area for calmer routines: sauna, restorative treatments, movement, walking and recovery experiences that feel grounded rather than high intensity.",
    bestFor: ["Calm recovery", "Nature-led routines", "Restorative wellness", "Weekend resets", "Slower pace"],
    character:
      "Hampstead’s wellness character is quiet and restorative. It is well suited to people who want to connect recovery with space, walking, fresh air and a less compressed London rhythm.",
    visitNotes: [
      "Pairing a wellness visit with Hampstead Heath can make the experience feel more complete.",
      "Travel times can vary, so check whether venues sit close to Hampstead, Belsize Park or Highgate.",
      "Better suited to slower weekend routines than rushed central London appointments.",
    ],
    relatedAreas: ["Belsize Park", "Highgate", "Kentish Town", "Primrose Hill"],
    relatedLinks: [
      { href: "/recover", label: "Quiet recovery" },
      { href: "/stress-regulation-london", label: "Stress regulation in London" },
      { href: "/north-london-wellness", label: "North London wellness spaces" },
    ],
  },
];

export function getNeighbourhoodPage(slug: string) {
  return neighbourhoodPages.find((page) => page.slug === slug);
}
