export type NeighbourhoodPage = {
  slug: string;
  title: string;
  shortTitle: string;
  href: string;
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
    metaTitle: "Wellness in Shoreditch | Well+ London Neighbourhood Guide",
    metaDescription:
      "A concise Well+ guide to wellness in Shoreditch, from sauna and cold plunge rituals to recovery spaces and modern East London wellness culture.",
    eyebrow: "East London energy",
    intro:
      "Shoreditch brings a sharper, more social edge to London wellness — mixing contrast therapy, recovery studios, movement spaces and design-led venues into one compact part of East London.",
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
    slug: "marylebone",
    title: "Wellness in Marylebone",
    shortTitle: "Marylebone",
    href: "/neighbourhoods/marylebone",
    metaTitle: "Wellness in Marylebone | Well+ London Neighbourhood Guide",
    metaDescription:
      "A refined guide to wellness in Marylebone, covering premium recovery, longevity, clinical wellness and calm central London routines.",
    eyebrow: "Refined central wellness",
    intro:
      "Marylebone is one of London’s most polished wellness neighbourhoods: calm, central and well suited to premium recovery, clinical wellness and longevity-led routines.",
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
      { href: "/longevity-london", label: "Longevity in London" },
      { href: "/recovery-london", label: "Recovery spaces in London" },
      { href: "/central-london-wellness", label: "Central London wellness spaces" },
    ],
  },
  {
    slug: "notting-hill",
    title: "Wellness in Notting Hill",
    shortTitle: "Notting Hill",
    href: "/neighbourhoods/notting-hill",
    metaTitle: "Wellness in Notting Hill | Well+ London Neighbourhood Guide",
    metaDescription:
      "Explore wellness in Notting Hill with Well+, from calm West London rituals to premium recovery, sauna, movement and lifestyle-led wellness spaces.",
    eyebrow: "West London lifestyle",
    intro:
      "Notting Hill gives London wellness a softer lifestyle edge — calm streets, polished studios, slower rituals and venues that sit naturally alongside cafés, shopping and weekend routines.",
    summary:
      "This is a neighbourhood for wellness that feels personal and lifestyle-led: less clinical, more atmospheric, and often best experienced as part of a slower West London day.",
    bestFor: ["Slow wellness", "Lifestyle rituals", "Premium studios", "Weekend resets", "Calm atmosphere"],
    character:
      "The Notting Hill wellness identity is warm, aesthetic and unhurried. It works well for people who want recovery and self-care to feel integrated into everyday life rather than treated as a standalone appointment.",
    visitNotes: [
      "Best approached as part of a wider West London morning or afternoon rather than a rushed visit.",
      "Good for users who care about atmosphere, design and the feel of a venue.",
      "Check whether venues are closer to Notting Hill, Holland Park, Bayswater or Ladbroke Grove before travelling.",
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
