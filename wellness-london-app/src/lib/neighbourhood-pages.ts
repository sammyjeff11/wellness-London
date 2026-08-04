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
      "Shoreditch has one of London's more social recovery scenes: communal sauna, cold-water immersion and modern studios designed to sit alongside work, training and nightlife.",
    summary:
      "The local strength is contrast therapy rather than traditional spa time. Come here for heat, cold and movement in an active studio setting, often with a stronger community feel than a hotel or health-club spa.",
    bestFor: ["Contrast therapy", "Social wellness", "Post-work recovery", "Cold exposure", "Modern studios"],
    character:
      "Energetic, informal and contemporary. Recovery sits among gyms, cafés and late-night venues, so the atmosphere tends to be urban and social rather than hushed or retreat-like.",
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
      "Compare Canary Wharf wellness venues, from Arc's communal sauna and ice baths to Third Space recovery and health-club services.",
    eyebrow: "Docklands recovery",
    intro:
      "Canary Wharf has evolved beyond its office-district identity into a modern waterside neighbourhood with high-spec health clubs, recovery treatments and one of London's most distinctive communal contrast-therapy spaces.",
    summary:
      "Canary Wharf is strongest for structured recovery. Arc offers a public-facing contrast experience; Third Space places recovery within a premium members' club. The deciding factor is access as much as the treatment list.",
    bestFor: ["Post-work recovery", "Sauna", "Cold plunge", "Cryotherapy", "Premium wellness"],
    character:
      "Polished and efficient, with the strongest weekday rhythm before and after office hours. Arc is the more social and sensory option; Third Space is the broader club environment.",
    visitNotes: [
      "Particularly convenient before work, after work or between meetings.",
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
      "Compare Kensington recovery venues offering sauna, cryotherapy, red light therapy and HBOT, including access and booking details.",
    eyebrow: "West London recovery",
    intro:
      "Kensington's wellness offer reflects the neighbourhood itself: polished, appointment-led and premium, with technology-led recovery close to the shops, homes and hotels around Kensington High Street.",
    summary:
      "The local offer is concentrated around technology-led recovery: infrared heat, cryotherapy, red light and hyperbaric oxygen rather than communal bathing or a traditional spa circuit.",
    bestFor: ["Infrared sauna", "Cryotherapy", "Red light therapy", "HBOT", "Premium recovery"],
    character:
      "The published directory is currently compact and centred on High Street Kensington. Expect appointment-led sessions and a premium clinical-studio feel rather than a casual drop-in sauna.",
    visitNotes: [
      "The current Kensington edit only shows venues that are published and confidently matched to the neighbourhood.",
      "Choose the service before travelling: infrared sauna, cryotherapy, red light and HBOT are distinct sessions rather than interchangeable recovery add-ons.",
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
      "Marylebone combines private recovery and clinic-led wellness with a quieter central London setting than Soho or the West End.",
    summary:
      "The area's advantage is discretion and convenience. It makes most sense for appointment-led treatments, health assessments and calmer recovery rather than social contrast therapy.",
    bestFor: ["Premium wellness", "Longevity routines", "Clinical treatments", "Calm recovery", "Central access"],
    character:
      "Composed and discreet, with clinics and studios embedded among medical practices, hotels and residential streets. The mood is quieter and more service-led than performance-led.",
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
      "The strongest published option is treatment-led rather than performance-led: heat, cold, bodywork and restorative appointments brought together in one setting.",
    bestFor: ["Slow wellness", "Lifestyle rituals", "Premium studios", "Weekend resets", "Calm atmosphere"],
    character:
      "Warm, design-conscious and unhurried. The experience is closer to a neighbourhood members' club or multidisciplinary spa than a high-output recovery studio.",
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
      "Soho is strongest for short, central appointments. Choose it when location and timing matter more than seclusion, extensive facilities or an all-day spa experience.",
    bestFor: ["Convenient recovery", "After-work resets", "Central treatments", "Short sessions", "City routines"],
    character:
      "Busy and high-energy. Wellness here works as a pause within the city rather than an escape from it, with venues close to offices, hotels, restaurants and several Underground lines.",
    visitNotes: [
      "Best when you want a session close to restaurants, offices, hotels and transport links.",
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
