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
  locationTerms?: string[];
  editorNote: string;
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
      "Shoreditch currently offers three distinct wellness formats: public contrast therapy, a broader social-wellness club and a private members' club with gym, spa and rooftop pool.",
    summary:
      "The public options are strongest for sauna and cold plunge. The Sanctuary adds guided sessions, movement classes and a café; Sauna & Plunge focuses on self-led contrast. Shoreditch House is relevant only to members and eligible guests.",
    bestFor: ["Contrast therapy", "Social wellness", "Post-work recovery", "Cold exposure", "Modern studios"],
    character:
      "The public contrast venues are shared and session-led rather than quiet day spas. Shoreditch House offers the broader club setting, but its application-based access is materially different.",
    visitNotes: [
      "Choose between guided and self-led contrast before comparing price.",
      "The Sanctuary and Sauna & Plunge accept public bookings; Shoreditch House does not offer general club access.",
      "Movement classes and contrast sessions may use separate timetables, even within the same venue.",
    ],
    relatedAreas: ["Hackney", "Hoxton", "London Fields", "The City"],
    relatedLinks: [
      { href: "/cold-plunge-london", label: "Cold Plunge in London" },
      { href: "/contrast-therapy-london", label: "Contrast Therapy in London" },
      { href: "/east-london-wellness", label: "East London wellness spaces" },
    ],
    editorNote:
      "Choose The Sanctuary for guided and social recovery, Sauna & Plunge for self-led Finnish or infrared sauna with cold plunges, and Shoreditch House only if its private-membership model already suits you.",
  },
  {
    slug: "canary-wharf",
    title: "Wellness in Canary Wharf",
    shortTitle: "Canary Wharf",
    href: "/neighbourhoods/canary-wharf",
    region: "East London",
    metaTitle: "Wellness in Canary Wharf | Sauna & Cold Plunge | Well+",
    metaDescription:
      "Compare Canary Wharf outdoor swimming, sauna, cold plunge, contrast therapy and health clubs, with access and booking details.",
    eyebrow: "Docklands recovery",
    intro:
      "Canary Wharf has six listings spanning public contrast sessions, dockside sauna, outdoor swimming with sauna, two Third Space health clubs and a separately bookable recovery spa.",
    summary:
      "Arc offers guided and self-directed communal contrast sessions. Skuna provides shared or private dockside sauna. Sea Lanes pairs its floating 50-metre pool with waterfront sauna. Third Space Canary Wharf and Wood Wharf are members' clubs, while selected Recovery Spa treatments at Canada Square can be booked by non-members.",
    bestFor: ["Outdoor swimming", "Post-work recovery", "Sauna", "Cold plunge", "Contrast therapy"],
    character:
      "The formats differ more than the addresses suggest: communal contrast at Arc, dockside sauna at Skuna, swim-and-sauna at Sea Lanes, and full health-club facilities at Third Space.",
    visitNotes: [
      "Arc, Skuna and Sea Lanes can be booked publicly; the Third Space clubs require membership.",
      "Sea Lanes does not sell sauna-only visits: its pay-per-visit ticket combines swimming and sauna.",
      "A Recovery Spa booking does not include access to Third Space's gym, pool or wet facilities.",
      "Check whether your booking is at Crossrail Place, West India Quay, Canada Square or Wood Wharf before travelling.",
    ],
    relatedAreas: ["Shoreditch", "The City", "East London"],
    relatedLinks: [
      { href: "/sauna-london", label: "Saunas in London" },
      { href: "/cold-plunge-london", label: "Cold Plunge in London" },
      { href: "/contrast-therapy-london", label: "Contrast Therapy in London" },
      { href: "/east-london-wellness", label: "East London wellness spaces" },
    ],
    editorNote:
      "Arc is the clearest public contrast-therapy option; Skuna is the sauna-specific alternative; Sea Lanes is for outdoor swimming and sauna together. Third Space suits members seeking wider training and pool facilities, while its Canada Square Recovery Spa has separate treatment access.",
  },
  {
    slug: "kensington",
    title: "Wellness in Kensington",
    shortTitle: "Kensington",
    href: "/neighbourhoods/kensington",
    region: "West London",
    metaTitle: "Wellness in Kensington | Spa, Steam & Fitness | Well+",
    metaDescription:
      "Compare Kensington public thermal-spa sessions with membership-led fitness, steam, movement and bookable spa treatments.",
    eyebrow: "West London recovery",
    intro:
      "Kensington's two listings provide different access routes: Spa Experience offers public thermal-spa sessions, while Equinox combines fitness, movement, steam and treatments within a membership-led health club.",
    summary:
      "Spa Experience Kensington is the straightforward option for shared sauna, steam and treatments without a club commitment. Equinox has the broader training offer, including personal training, yoga and Pilates; non-members can book spa appointments, but wider club access is separate.",
    bestFor: ["Sauna", "Steam room", "Spa treatments", "Personal training", "Yoga"],
    character:
      "The local choice is between an accessible leisure-centre spa and a premium full-service health club. Neither listing currently supports claims of a Kensington cryotherapy, red-light or HBOT cluster.",
    visitNotes: [
      "Spa Experience thermal sessions and treatments use separate timetables; check the exact booking before travelling.",
      "At Equinox, do not assume a spa appointment includes access to the gym, steam room or classes.",
      "The current directory does not verify a Kensington cold-plunge, cryotherapy, red-light or HBOT venue.",
    ],
    relatedAreas: ["Notting Hill", "West London", "Central London"],
    relatedLinks: [
      { href: "/cryotherapy-london", label: "Cryotherapy in London" },
      { href: "/red-light-therapy-london", label: "Red Light Therapy in London" },
      { href: "/hbot-london", label: "HBOT in London" },
      { href: "/sauna-london", label: "Saunas in London" },
      { href: "/west-london-wellness", label: "West London wellness spaces" },
    ],
    editorNote:
      "Choose Spa Experience for public sauna, steam and a straightforward local spa visit. Choose Equinox when ongoing fitness and movement facilities matter, noting that club access and publicly bookable spa treatments follow different rules.",
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
      "Marylebone has the directory's broadest mix of preventive screening, specialist recovery treatments and members' club facilities in one neighbourhood.",
    summary:
      "BodyScan, Echelon, Neko Health and Welbeck cover different forms of assessment and screening. BXR LAB, NUMA and Rebase provide recovery services, while Third Space adds a members-only pool, sauna and steam room.",
    bestFor: ["Premium wellness", "Longevity routines", "Clinical treatments", "Calm recovery", "Central access"],
    character:
      "Most listings are appointment-led clinics or treatment studios. BXR and Third Space are the exceptions with a stronger training-club context, and their access terms differ from the public clinics.",
    visitNotes: [
      "Start with the purpose: diagnostic screening, HBOT, contrast recovery and club facilities are not interchangeable.",
      "BodyScan's body-composition and bone-density scans are separate services; choose the correct assessment.",
      "Third Space requires membership, while the listed clinics and recovery appointments have public booking routes.",
    ],
    relatedAreas: ["Fitzrovia", "Mayfair", "Regent’s Park", "Baker Street"],
    relatedLinks: [
      { href: "/longevity", label: "Longevity in London" },
      { href: "/recovery-london", label: "Recovery spaces in London" },
      { href: "/central-london-wellness", label: "Central London wellness spaces" },
    ],
    editorNote:
      "Use BodyScan, Neko Health, Echelon or Welbeck for assessment-led visits; NUMA for medically supervised HBOT; Rebase for the widest public recovery menu; BXR for bookable treatments in a performance setting; and Third Space for members-only pool and thermal facilities.",
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
      "Notting Hill's three current listings cover a multidisciplinary spa and clinic, a training-and-recovery club, and one-to-one assisted stretching.",
    summary:
      "Cloud Twelve has the broadest treatment range and allows direct spa bookings. The Method combines classes, bodywork and members-only contrast therapy. StretchLAB is the focused option for physiotherapist-supervised assisted stretching.",
    bestFor: ["Slow wellness", "Lifestyle rituals", "Premium studios", "Weekend resets", "Calm atmosphere"],
    character:
      "These are polished, appointment-led venues, but their formats are materially different: shared spa facilities, a membership-led club and a private one-to-one stretch session.",
    visitNotes: [
      "Cloud Twelve spa visits can be booked without membership; check exactly which thermal facilities the booking includes.",
      "The Method sells some classes and Lab credits separately, but contrast therapy is reserved for members.",
      "StretchLAB's introductory option is a one-to-one session, not open gym or spa access.",
    ],
    relatedAreas: ["Holland Park", "Ladbroke Grove", "Bayswater", "Kensington"],
    relatedLinks: [
      { href: "/reset", label: "Reset spaces" },
      { href: "/sauna-london", label: "Saunas in London" },
      { href: "/west-london-wellness", label: "West London wellness spaces" },
    ],
    editorNote:
      "Cloud Twelve is the broadest public spa-and-clinic option, The Method is the membership-led training and contrast choice, and StretchLAB is the specialist one-to-one mobility appointment.",
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
      "Soho's current listings span a hotel-based spa, a members' health club and a public assisted-stretching studio.",
    summary:
      "Akasha has the widest spa and thermal offer, with public treatment and spa-day routes. Third Space provides pool, sauna and steam to members. StretchLAB offers physiotherapist-supervised one-to-one mobility sessions.",
    bestFor: ["Convenient recovery", "After-work resets", "Central treatments", "Short sessions", "City routines"],
    character:
      "The experience depends on the access model: hotel spa, paid health-club membership or a single public appointment. Treat the three as alternatives for different needs, not direct substitutes.",
    visitNotes: [
      "Confirm whether an Akasha booking includes the pool and thermal facilities, not only the treatment.",
      "Third Space's sauna, steam room and pool cannot be booked as standalone public sessions.",
      "StretchLAB is a one-to-one mobility appointment and does not provide spa facilities.",
    ],
    relatedAreas: ["Fitzrovia", "Covent Garden", "Mayfair", "Oxford Circus"],
    relatedLinks: [
      { href: "/perform", label: "Performance recovery" },
      { href: "/recovery-london", label: "Recovery spaces in London" },
      { href: "/central-london-wellness", label: "Central London wellness spaces" },
    ],
    editorNote:
      "Choose Akasha for the broadest spa and thermal facilities, Third Space for members-only training and wet facilities, or StretchLAB for a focused public assisted-stretching session.",
  },
  {
    slug: "hampstead",
    title: "Wellness in Hampstead",
    shortTitle: "Hampstead",
    href: "/neighbourhoods/hampstead",
    region: "North London",
    metaTitle: "Wellness in Hampstead | Well+ London Neighbourhood Guide",
    metaDescription:
      "Explore the currently verified Hampstead wellness listing, focused on physiotherapist-supervised assisted stretching and mobility.",
    eyebrow: "North London calm",
    intro:
      "Hampstead currently has one verified directory listing: StretchLAB on Heath Street, offering one-to-one assisted stretching supervised by physiotherapists.",
    summary:
      "The local evidence is about mobility rather than a broad wellness cluster. The directory does not currently verify a Hampstead sauna, cold plunge or spa listing.",
    bestFor: ["Assisted stretching", "Mobility", "Flexibility", "Posture", "One-to-one sessions"],
    character:
      "The listed experience is a private, appointment-led session rather than shared spa access or a group class.",
    visitNotes: [
      "The published introductory option is a 50-minute one-to-one session from £60.",
      "Credits can be used across StretchLAB's current London studio network.",
      "Use the wider North London guide for sauna, cold plunge and other recovery formats.",
    ],
    relatedAreas: ["Belsize Park", "Highgate", "Kentish Town", "Primrose Hill"],
    relatedLinks: [
      { href: "/recover", label: "Quiet recovery" },
      { href: "/stress-regulation-london", label: "Stress regulation in London" },
      { href: "/north-london-wellness", label: "North London wellness spaces" },
    ],
    editorNote:
      "StretchLAB Hampstead is currently the only verified local listing. It is a specialist mobility appointment, so users looking for thermal or spa facilities should compare the wider North London directory.",
  },
  {
    slug: "city-of-london",
    title: "Wellness in the City of London",
    shortTitle: "City of London",
    href: "/neighbourhoods/city-of-london",
    region: "Central London",
    metaTitle: "Wellness in the City of London | Recovery & Screening | Well+",
    metaDescription:
      "Compare City of London health clubs, sauna, ice bath, recovery and DEXA screening listings with access details.",
    eyebrow: "City training and recovery",
    intro:
      "The City of London listings are concentrated around membership-led health clubs, with one public DEXA scanning clinic as a distinct alternative.",
    summary:
      "Third Space City, Moorgate and Paternoster Square vary substantially in recovery facilities. Equinox Bishopsgate adds steam, spa and training. BodyScan City is a public appointment for body-composition or bone-density assessment, not a club.",
    bestFor: ["Sauna", "Ice bath", "Contrast therapy", "DEXA scan", "Post-workout recovery"],
    character:
      "Four of the five listings are full health clubs requiring membership. BodyScan is the only straightforward public appointment, so access should be the first filter.",
    visitNotes: [
      "Third Space Paternoster has the broadest listed recovery mix, including heat, cold and technology-led services.",
      "Third Space Moorgate lists salt sauna and recovery equipment but no verified ice bath.",
      "BodyScan's body-composition and bone-density scans are separate services priced independently.",
    ],
    relatedAreas: ["Shoreditch", "Islington", "Covent Garden & Strand", "Soho"],
    relatedLinks: [
      { href: "/sauna-london", label: "Saunas in London" },
      { href: "/contrast-therapy-london", label: "Contrast Therapy in London" },
      { href: "/dexa-scan-london", label: "DEXA scans in London" },
      { href: "/central-london-wellness", label: "Central London wellness spaces" },
    ],
    editorNote:
      "Choose BodyScan for a public DEXA appointment. For club facilities, Paternoster has the most extensive recovery list; Third Space City adds a simpler wet contrast circuit; Moorgate focuses on sauna and compression; Equinox centres on training, steam and spa.",
  },
  {
    slug: "islington",
    title: "Wellness in Islington",
    shortTitle: "Islington",
    href: "/neighbourhoods/islington",
    region: "North London",
    metaTitle: "Wellness in Islington | Sauna, HBOT & Mobility | Well+",
    metaDescription:
      "Compare Islington sauna, steam, mild HBOT, assisted stretching and members' club facilities with price and access details.",
    eyebrow: "Five different recovery formats",
    intro:
      "Islington's five listings cover public bathing, communal sauna and cold, mild HBOT with red light, assisted stretching and a members-only health club.",
    summary:
      "Ironmonger Row is the lower-cost traditional spa option. Reset is built around shared heat and cold. Rebody and StretchLAB provide private appointments, while Third Space combines sauna, steam and recovery equipment with full club membership.",
    bestFor: ["Sauna", "Cold plunge", "HBOT", "Red light therapy", "Assisted stretching"],
    character:
      "This is not one uniform scene: the listings range from a public leisure-centre spa to specialist studios and a premium club. Price and access vary accordingly.",
    visitNotes: [
      "Check the Spa Experience timetable at Ironmonger Row because facilities follow different schedules.",
      "Reset offers free-flow and guided formats; choose the session type in the booking flow.",
      "Third Space's announced expanded recovery facilities are excluded until the operator marks them open.",
    ],
    relatedAreas: ["City of London", "Shoreditch", "Hampstead", "Marylebone"],
    relatedLinks: [
      { href: "/sauna-london", label: "Saunas in London" },
      { href: "/hbot-london", label: "HBOT in London" },
      { href: "/assisted-stretching-london", label: "Assisted stretching in London" },
      { href: "/north-london-wellness", label: "North London wellness spaces" },
    ],
    editorNote:
      "Ironmonger Row is the accessible public spa; Reset is the communal contrast option; Rebody pairs mild HBOT with red light; StretchLAB provides one-to-one mobility work; Third Space suits users who also want a full members' gym and pool.",
  },
  {
    slug: "mayfair",
    title: "Wellness in Mayfair",
    shortTitle: "Mayfair",
    href: "/neighbourhoods/mayfair",
    region: "Central London",
    metaTitle: "Wellness in Mayfair | Spas, Recovery & Health Clubs | Well+",
    metaDescription:
      "Compare Mayfair hotel spas, recovery circuits, preventive medicine and members' club facilities with access details.",
    eyebrow: "Hotel spas to preventive medicine",
    intro:
      "Mayfair's six listings span two hotel spas, a multidisciplinary medical clinic, two members-only health clubs and a publicly bookable recovery circuit.",
    summary:
      "Claridge's and Mandarin Oriental suit treatment or spa-day bookings. Lanserhof is the assessment and medical option. Third Space offers sauna, steam, ice bath and compression within membership. Tramp Health adds diagnostics, training and a broad technology-led recovery menu. Vidavii packages several modalities into one public circuit.",
    bestFor: ["Hotel spa", "Health screening", "Sauna", "Ice bath", "Recovery circuit"],
    character:
      "The common factor is premium pricing, but the formats are not comparable: hotel treatment, clinical appointment, club membership and sequenced recovery each solve a different need.",
    visitNotes: [
      "A hotel treatment or spa-day booking may not include every pool or thermal facility; check the package.",
      "Lanserhof's clinic can be booked publicly, while its gym and classes require the relevant club access.",
      "Tramp Health is membership-led and does not publish a complete address or standard hours; enquire before planning a visit.",
      "Third Space Mayfair is excluded from standard Group membership; verify current club access before joining.",
    ],
    relatedAreas: ["Marylebone", "Soho", "Covent Garden & Strand", "Chelsea"],
    relatedLinks: [
      { href: "/health-screening-london", label: "Health screening in London" },
      { href: "/sauna-london", label: "Saunas in London" },
      { href: "/recovery-london", label: "Recovery spaces in London" },
      { href: "/central-london-wellness", label: "Central London wellness spaces" },
    ],
    editorNote:
      "Claridge's and Mandarin Oriental are the spa choices; Lanserhof is clinic-led; Third Space and Tramp Health are membership options with different depths of training, diagnostics and recovery; Vidavii is the straightforward public circuit.",
  },
  {
    slug: "chelsea",
    title: "Wellness in Chelsea",
    shortTitle: "Chelsea",
    href: "/neighbourhoods/chelsea",
    region: "West London",
    metaTitle: "Wellness in Chelsea | Longevity, Recovery & Mobility | Well+",
    metaDescription:
      "Compare Chelsea longevity testing, recovery technology, assisted stretching, spa and members' club facilities.",
    eyebrow: "Clinical and performance-led",
    intro:
      "Chelsea's four listings range from clinician-led longevity assessment to pay-as-you-go training, one-to-one mobility work and a members-only recovery club.",
    summary:
      "HUM2N has the broadest diagnostics and health-optimisation programme. KXU sells classes, gym and treatments separately. StretchLAB focuses on assisted stretching. Third Space has the most complete heat, cold and recovery-technology facilities, but requires membership.",
    bestFor: ["Longevity testing", "Blood testing", "Cryotherapy", "Red light therapy", "Assisted stretching"],
    character:
      "The listings are performance- and appointment-led rather than traditional day spas. The main decision is whether you need clinical oversight, a single session or ongoing club access.",
    visitNotes: [
      "HUM2N is a clinic with consultation-led programmes, not a casual wellness studio.",
      "KXU is public and pay as you go; classes, open gym and treatments are booked separately.",
      "Third Space Chelsea requires the correct membership tier and some recovery services may need separate booking.",
    ],
    relatedAreas: ["Kensington", "Mayfair", "Notting Hill", "Fulham"],
    relatedLinks: [
      { href: "/longevity", label: "Longevity in London" },
      { href: "/cryotherapy-london", label: "Cryotherapy in London" },
      { href: "/red-light-therapy-london", label: "Red Light Therapy in London" },
      { href: "/west-london-wellness", label: "West London wellness spaces" },
    ],
    editorNote:
      "Use HUM2N for clinician-led assessment and programmes, KXU for flexible public fitness or treatments, StretchLAB for a focused mobility session, and Third Space for ongoing members-only access to the area's broadest recovery facility mix.",
  },
  {
    slug: "covent-garden-strand",
    title: "Wellness in Covent Garden and the Strand",
    shortTitle: "Covent Garden & Strand",
    href: "/neighbourhoods/covent-garden-strand",
    region: "Central London",
    metaTitle: "Wellness in Covent Garden & Strand | Baths & Screening | Well+",
    metaDescription:
      "Compare Covent Garden and Strand thermal baths, preventive health screening and private members' club wellness.",
    eyebrow: "Bathing, screening and club wellness",
    intro:
      "The local listings offer three unrelated formats: an adults-only thermal bath, a preventive health scan and a private members' club with gym and rooftop pool.",
    summary:
      "AIRE is the immersive bathing option, built around hot, warm, cold and saltwater pools. Neko Health provides a structured one-hour preventive scan. 180 House adds fitness and swimming for approved Soho House members and eligible guests.",
    bestFor: ["Thermal baths", "Cold plunge", "Health screening", "Blood testing", "Lap pool"],
    character:
      "AIRE and Neko are public but require advance booking. 180 House is fundamentally different because club access is tied to Soho House membership rather than a day ticket.",
    visitNotes: [
      "AIRE sessions are capacity-controlled and adults-only; bring swimwear and book ahead.",
      "Neko's scan is a fixed preventive assessment rather than an open-ended medical consultation.",
      "The published 180 House membership price is not a public gym or pool fee.",
    ],
    relatedAreas: ["Soho", "Mayfair", "City of London", "Marylebone"],
    relatedLinks: [
      { href: "/sauna-london", label: "Saunas in London" },
      { href: "/cold-plunge-london", label: "Cold Plunge in London" },
      { href: "/health-screening-london", label: "Health screening in London" },
      { href: "/central-london-wellness", label: "Central London wellness spaces" },
    ],
    locationTerms: ["Covent Garden", "Covent Garden / Strand"],
    editorNote:
      "Choose AIRE for a bookable bathing experience, Neko Health for a defined preventive scan, and 180 House only when private-club access and its wider social setting are part of what you want.",
  },
  {
    slug: "bayswater",
    title: "Wellness in Bayswater",
    shortTitle: "Bayswater",
    href: "/neighbourhoods/bayswater",
    region: "West London",
    metaTitle: "Wellness in Bayswater | Spa, Sauna & Cold Plunge | Well+",
    metaDescription:
      "Compare Bayswater public thermal bathing, a members-only health club and a hotel spa with sauna, cold plunge and recovery technology.",
    eyebrow: "Three different thermal routes",
    intro:
      "Bayswater has three substantial but very different thermal-wellness listings: public sessions at Porchester Spa, Third Space The Whiteley for members, and the Six Senses London hotel spa.",
    summary:
      "Porchester is the accessible traditional bathhouse, with sauna, steam, cold plunge and scheduled session formats. Third Space combines training with a broad members-only recovery suite. Six Senses adds a hotel-spa thermal circuit, flotation, cryotherapy, treatments and personalised programmes through mixed access routes.",
    bestFor: ["Sauna", "Steam room", "Cold plunge", "Infrared sauna", "Cryotherapy"],
    character:
      "The decision is principally about format and access: historic public bathing, an ongoing premium gym membership, or a high-service hotel-spa booking whose facility inclusions vary.",
    visitNotes: [
      "Porchester's timetable includes male-only, female-only and mixed sessions; check the day before booking.",
      "Porchester asks visitors to bring clean towels and coins for lockers.",
      "Some Whiteley recovery services may require separate appointments or charges beyond membership.",
      "At Six Senses, confirm whether your hotel stay, treatment or programme includes the pool and thermal facilities; HUM2N services are separate.",
    ],
    relatedAreas: ["Notting Hill", "Kensington", "Marylebone", "Chelsea"],
    relatedLinks: [
      { href: "/sauna-london", label: "Saunas in London" },
      { href: "/cold-plunge-london", label: "Cold Plunge in London" },
      { href: "/cryotherapy-london", label: "Cryotherapy in London" },
      { href: "/west-london-wellness", label: "West London wellness spaces" },
    ],
    editorNote:
      "Choose Porchester for affordable public thermal bathing, Third Space for training plus repeated members-only recovery access, or Six Senses for a treatment-led hotel-spa visit with a substantial thermal circuit.",
  },
  {
    slug: "belgravia",
    title: "Wellness in Belgravia",
    shortTitle: "Belgravia",
    href: "/neighbourhoods/belgravia",
    region: "Central London",
    metaTitle: "Wellness in Belgravia | Banya, Cryotherapy & HBOT | Well+",
    metaDescription:
      "Compare Belgravia banya, recovery-clinic appointments and a private health club with pool, thermal, spa and longevity services.",
    eyebrow: "Three distinct access models",
    intro:
      "Belgravia's three listings answer different needs: The Bath House provides a bookable banya experience, London Cryo offers individual recovery treatments, and Surrenne is a private health club for members and eligible hotel guests.",
    summary:
      "The Bath House combines sauna, steam, bathing rituals and massage across public and private packages. London Cryo lists appointment-led recovery treatments. Surrenne combines a 22-metre pool, sauna, steam, hammam, spa, training and longevity support within an ongoing club model.",
    bestFor: ["Sauna", "Steam room", "Cryotherapy", "Red light therapy", "HBOT"],
    character:
      "The Bath House and London Cryo are publicly bookable in different session formats. Surrenne is materially different: general day access is not advertised.",
    visitNotes: [
      "Check whether The Bath House package is public or private and what it includes.",
      "London Cryo services vary by branch, so select Belgravia and the exact treatment when booking.",
      "Surrenne access is for members and eligible Maybourne hotel guests; specialist services may still require separate booking.",
      "Do not compare headline prices without checking session format and duration.",
    ],
    relatedAreas: ["Victoria", "Chelsea", "Mayfair", "Soho"],
    relatedLinks: [
      { href: "/sauna-london", label: "Saunas in London" },
      { href: "/cryotherapy-london", label: "Cryotherapy in London" },
      { href: "/hbot-london", label: "HBOT in London" },
      { href: "/central-london-wellness", label: "Central London wellness spaces" },
    ],
    editorNote:
      "The Bath House is the social thermal-bathing choice; London Cryo suits a focused public treatment; Surrenne is for repeated private-club access across training, pool, thermal, spa and health services.",
  },
  {
    slug: "fitzrovia",
    title: "Wellness in Fitzrovia",
    shortTitle: "Fitzrovia",
    href: "/neighbourhoods/fitzrovia",
    region: "Central London",
    metaTitle: "Wellness in Fitzrovia | DEXA & Assisted Stretching | Well+",
    metaDescription:
      "Compare Fitzrovia DEXA scanning and physiotherapist-supervised assisted stretching with public prices and booking details.",
    eyebrow: "Assessment and mobility",
    intro:
      "Fitzrovia currently has two specialist public appointments rather than a broad spa cluster: DEXA scanning and one-to-one assisted stretching.",
    summary:
      "BodyView provides separate body-composition and bone-density DEXA scans. StretchLAB provides physiotherapist-supervised sessions focused on mobility, flexibility, posture and recovery.",
    bestFor: ["DEXA scan", "Body composition", "Bone density", "Assisted stretching", "Mobility"],
    character:
      "Both listings are functional, appointment-led services. Choose BodyView when you need measurement and StretchLAB when you want hands-on mobility work.",
    visitNotes: [
      "Body-composition and bone-density DEXA scans answer different questions and are sold separately.",
      "StretchLAB's introductory option is a 50-minute one-to-one session from £60.",
      "Neither listing provides sauna, cold plunge or general spa access.",
    ],
    relatedAreas: ["Soho", "Marylebone", "Covent Garden & Strand", "Mayfair"],
    relatedLinks: [
      { href: "/dexa-scan-london", label: "DEXA scans in London" },
      { href: "/assisted-stretching-london", label: "Assisted stretching in London" },
      { href: "/central-london-wellness", label: "Central London wellness spaces" },
    ],
    editorNote:
      "BodyView provides the measurement; StretchLAB provides the intervention. They are complementary specialist appointments rather than competing spa venues.",
  },
  {
    slug: "fulham",
    title: "Wellness in Fulham",
    shortTitle: "Fulham",
    href: "/neighbourhoods/fulham",
    region: "West London",
    metaTitle: "Wellness in Fulham | Sauna, Cold Plunge & Longevity | Well+",
    metaDescription:
      "Compare Fulham's public sauna-and-plunge circuit with a private wellness club offering recovery and longevity services.",
    eyebrow: "Public contrast or private club",
    intro:
      "Fulham's two current listings sit at opposite ends of the access and price spectrum: a public sauna-and-plunge circuit and an annual private wellness club.",
    summary:
      "Pulse offers 75-minute sauna-and-plunge sessions with three cold temperatures. Sæl Spa combines rooftop thermal facilities and recovery technology with higher-tier clinical pathways through annual membership.",
    bestFor: ["Sauna", "Cold plunge", "Contrast therapy", "Red light therapy", "Longevity testing"],
    character:
      "Pulse is a straightforward session booking. Sæl is an ongoing, members-only proposition with materially higher commitment and a wider service range.",
    visitNotes: [
      "Pulse publishes separate peak and off-peak drop-in prices.",
      "Sæl's membership tiers differ in diagnostic and clinical inclusions; compare the actual package, not only the facilities list.",
      "Sæl's clinical services are subject to clinical assessment.",
    ],
    relatedAreas: ["Chelsea", "Wandsworth", "Richmond", "Notting Hill"],
    relatedLinks: [
      { href: "/sauna-london", label: "Saunas in London" },
      { href: "/contrast-therapy-london", label: "Contrast Therapy in London" },
      { href: "/longevity", label: "Longevity in London" },
      { href: "/west-london-wellness", label: "West London wellness spaces" },
    ],
    editorNote:
      "Pulse is the practical public choice for sauna and plunge. Sæl is relevant only if you want a private annual club with a broader recovery and clinical pathway.",
  },
  {
    slug: "peckham",
    title: "Wellness in Peckham",
    shortTitle: "Peckham",
    href: "/neighbourhoods/peckham",
    region: "South London",
    metaTitle: "Wellness in Peckham | Affordable Sauna & Ice Baths | Well+",
    metaDescription:
      "Compare Peckham's affordable off-grid sauna with communal sauna, ice-bath, quiet, social and aufguss-led sessions.",
    eyebrow: "Accessible communal sauna",
    intro:
      "Peckham's two listings make communal sauna comparatively accessible, but only one currently confirms ice baths.",
    summary:
      "Community Sauna Baths runs simple £8 wood-fired sauna sessions with a cold shower and no plunge pools. Sauna Social Club combines communal sauna and ice baths across social, quiet, creative-wellbeing and aufguss-led formats.",
    bestFor: ["Sauna", "Ice bath", "Contrast therapy", "Social wellness", "Affordable sessions"],
    character:
      "Both are public and communal. The meaningful choice is a low-cost off-grid sauna-only visit or a more structured session with cold-water immersion.",
    visitNotes: [
      "Community Sauna Baths Peckham currently operates Friday to Sunday.",
      "Do not expect a plunge pool at the Community Sauna Baths site; the cold element is a shower.",
      "Sauna Social Club prices and atmosphere vary by session format, so use the calendar rather than choosing by venue name alone.",
    ],
    relatedAreas: ["Brixton", "Camberwell", "Wandsworth", "Shoreditch"],
    relatedLinks: [
      { href: "/sauna-london", label: "Saunas in London" },
      { href: "/cold-plunge-london", label: "Cold Plunge in London" },
      { href: "/contrast-therapy-london", label: "Contrast Therapy in London" },
      { href: "/south-london-wellness", label: "South London wellness spaces" },
    ],
    editorNote:
      "Choose Community Sauna Baths for the lowest-cost sauna session; choose Sauna Social Club when ice baths or a specific quiet, social or guided format matter.",
  },
  {
    slug: "richmond",
    title: "Wellness in Richmond",
    shortTitle: "Richmond",
    href: "/neighbourhoods/richmond",
    region: "West London",
    metaTitle: "Wellness in Richmond | DEXA, Sauna & Recovery | Well+",
    metaDescription:
      "Compare Richmond DEXA scanning with members-only sauna, steam, pool, compression and sports recovery facilities.",
    eyebrow: "Measurement or club recovery",
    intro:
      "Richmond's two current listings divide cleanly between a public DEXA appointment and a members-only health club with wet and sports-recovery facilities.",
    summary:
      "BodyView offers separate body-composition and bone-density scans. Third Space provides sauna, steam, hydropool, lap pool, compression equipment and sports-medicine services within its club model.",
    bestFor: ["DEXA scan", "Body composition", "Sauna", "Steam room", "Post-workout recovery"],
    character:
      "BodyView is a focused public assessment. Third Space is useful for ongoing training and recovery but requires membership for the core club facilities.",
    visitNotes: [
      "Choose the correct BodyView scan: body composition and bone density are separate assessments.",
      "Third Space's sauna, steam and pools are club amenities rather than public spa sessions.",
      "Sports Med appointments may follow separate booking rules from club access.",
    ],
    relatedAreas: ["Wandsworth", "Fulham", "Chelsea", "Putney"],
    relatedLinks: [
      { href: "/dexa-scan-london", label: "DEXA scans in London" },
      { href: "/sauna-london", label: "Saunas in London" },
      { href: "/recovery-london", label: "Recovery spaces in London" },
      { href: "/west-london-wellness", label: "West London wellness spaces" },
    ],
    editorNote:
      "BodyView is the public one-off assessment; Third Space is the membership option for users who want recovery facilities alongside regular training.",
  },
  {
    slug: "victoria",
    title: "Wellness in Victoria",
    shortTitle: "Victoria",
    href: "/neighbourhoods/victoria",
    region: "Central London",
    metaTitle: "Wellness in Victoria | Health Screening & Contrast Therapy | Well+",
    metaDescription:
      "Compare Victoria preventive health screening with boxing-led fitness, sauna, cold plunge and contrast recovery.",
    eyebrow: "Screening or training recovery",
    intro:
      "Victoria currently has two very different wellness listings in the same development: a preventive health scan and a boxing-led fitness club with contrast recovery.",
    summary:
      "Neko Health provides a structured one-hour scan covering cardiovascular, skin, blood-biomarker and body-composition measures. JAB SW1 combines training with sauna and cold plunge through public sessions, packs and membership.",
    bestFor: ["Health screening", "Blood testing", "Sauna", "Cold plunge", "Contrast therapy"],
    character:
      "Both can be booked without a selective club application, but one is an assessment and the other is an ongoing training-and-recovery setting.",
    visitNotes: [
      "Neko's scan costs £299 and availability may involve a waitlist.",
      "JAB publishes public sessions as well as membership routes.",
      "JAB's official page has shown different membership price signals, so confirm the live rate before joining.",
    ],
    relatedAreas: ["Belgravia", "Mayfair", "Chelsea", "Soho"],
    relatedLinks: [
      { href: "/health-screening-london", label: "Health screening in London" },
      { href: "/sauna-london", label: "Saunas in London" },
      { href: "/contrast-therapy-london", label: "Contrast Therapy in London" },
      { href: "/central-london-wellness", label: "Central London wellness spaces" },
    ],
    editorNote:
      "Neko Health is the defined preventive assessment; JAB SW1 is the option for boxing-led training with sauna and cold plunge built into the wider offer.",
  },
  {
    slug: "wandsworth",
    title: "Wellness in Wandsworth",
    shortTitle: "Wandsworth",
    href: "/neighbourhoods/wandsworth",
    region: "South London",
    metaTitle: "Wellness in Wandsworth | Sauna, Cold Plunge & HBOT | Well+",
    metaDescription:
      "Compare Wandsworth public sauna and cold plunge with private mild-HBOT and targeted red-light sessions.",
    eyebrow: "Communal contrast or private recovery",
    intro:
      "Wandsworth's two listings offer public recovery in opposite formats: shared sauna and cold plunge at Lowlu, or private mild-HBOT with targeted red light at Rebody.",
    summary:
      "Lowlu is the social heat-and-cold option with two saunas and three plunges. Rebody is an appointment-led studio where each mild-HBOT session is paired with red light.",
    bestFor: ["Sauna", "Cold plunge", "Contrast therapy", "HBOT", "Red light therapy"],
    character:
      "Choose by format rather than a generic idea of recovery: communal and self-directed at Lowlu, private and protocol-led at Rebody.",
    visitNotes: [
      "Check Lowlu's live booking page for current session format and price.",
      "Rebody requires a consultation as part of the £59 introductory booking.",
      "Rebody's standard sessions are priced separately from the introductory appointment.",
    ],
    relatedAreas: ["Fulham", "Richmond", "Peckham", "Battersea"],
    relatedLinks: [
      { href: "/sauna-london", label: "Saunas in London" },
      { href: "/cold-plunge-london", label: "Cold Plunge in London" },
      { href: "/hbot-london", label: "HBOT in London" },
      { href: "/south-london-wellness", label: "South London wellness spaces" },
    ],
    editorNote:
      "Lowlu is the communal sauna-and-plunge choice; Rebody is the private mild-HBOT and red-light appointment. The services and session formats are complementary rather than directly comparable.",
  },
  {
    slug: "white-city",
    title: "Wellness in White City",
    shortTitle: "White City",
    href: "/neighbourhoods/white-city",
    region: "West London",
    metaTitle: "Wellness in White City | Health Club & Assisted Stretching | Well+",
    metaDescription:
      "Compare White City private-club fitness, sauna and pools with public physiotherapist-supervised assisted stretching.",
    eyebrow: "Private club or public mobility",
    intro:
      "White City's two listings are access opposites: a private members' club with gym, sauna and pools, and a publicly bookable assisted-stretching studio.",
    summary:
      "White City House provides extensive fitness and wellness facilities for eligible Soho House members and guests. StretchLAB at Westfield offers physiotherapist-supervised one-to-one mobility sessions without club membership.",
    bestFor: ["Sauna", "Lap pool", "Fitness", "Assisted stretching", "Mobility"],
    character:
      "The facilities list is broader at White City House, but StretchLAB is the straightforward option for a single public appointment.",
    visitNotes: [
      "Soho House membership is application-based and the published fee is not a public gym or pool price.",
      "Hotel access should not be assumed to include every health-club facility.",
      "StretchLAB's introductory option is a 50-minute one-to-one session from £60.",
    ],
    relatedAreas: ["Notting Hill", "Kensington", "Bayswater", "Chelsea"],
    relatedLinks: [
      { href: "/sauna-london", label: "Saunas in London" },
      { href: "/assisted-stretching-london", label: "Assisted stretching in London" },
      { href: "/west-london-wellness", label: "West London wellness spaces" },
    ],
    editorNote:
      "White City House is useful only when its private-club model fits; StretchLAB is the accessible public choice for a focused one-to-one mobility session.",
  },
  {
    slug: "walthamstow",
    title: "Wellness in Walthamstow",
    shortTitle: "Walthamstow",
    href: "/neighbourhoods/walthamstow",
    region: "North London",
    metaTitle: "Wellness in Walthamstow | Sauna, Steam & Spa | Well+",
    metaDescription:
      "Compare Walthamstow communal sauna and cold plunge with a public leisure-centre spa offering sauna, steam, hammam and treatments.",
    eyebrow: "Community sauna or local spa",
    intro:
      "Walthamstow now has two publicly bookable thermal options: Community Sauna Baths for communal sauna and cold plunge, and Spa Experience Waltham Forest for sauna, steam, hammam and treatments.",
    summary:
      "Community Sauna Baths is centred on shared heat-and-cold sessions. Spa Experience sits inside the Feel Good Centre and offers a more conventional, self-directed thermal-spa visit with massages and facials booked separately.",
    bestFor: ["Sauna", "Cold plunge", "Steam room", "Hammam", "Affordable spa access"],
    character:
      "Both are practical neighbourhood venues rather than hotel spas. Choose by whether cold exposure and communal atmosphere matter more than steam, hammam and treatment availability.",
    visitNotes: [
      "Check Community Sauna Baths' live session format and timetable before booking.",
      "Spa Experience thermal sessions and treatments use separate timetables.",
      "Neither listing requires a private health-club membership.",
    ],
    relatedAreas: ["Islington", "Hackney", "Shoreditch", "North London"],
    relatedLinks: [
      { href: "/sauna-london", label: "Saunas in London" },
      { href: "/cold-plunge-london", label: "Cold Plunge in London" },
      { href: "/north-london-wellness", label: "North London wellness spaces" },
    ],
    editorNote:
      "Choose Community Sauna Baths for social sauna and cold plunge, or Spa Experience Waltham Forest for sauna, steam, hammam and optional treatments in a leisure-centre setting.",
  },
  {
    slug: "wimbledon",
    title: "Wellness in Wimbledon",
    shortTitle: "Wimbledon",
    href: "/neighbourhoods/wimbledon",
    region: "South London",
    metaTitle: "Wellness in Wimbledon | Spa, Sauna & Cold Plunge | Well+",
    metaDescription:
      "Compare Wimbledon public sauna, steam, hammam and spa treatments with a members-only health club and extensive thermal suite.",
    eyebrow: "Public spa or premium club",
    intro:
      "Wimbledon's two listings offer similar thermal basics through very different access models: public sessions at Spa Experience, or an ongoing Third Space membership.",
    summary:
      "Spa Experience Wimbledon provides sauna, steam, hammam and treatments inside the local leisure centre. Third Space has the deeper facility list—including Finnish and Löyly saunas, steam, cold plunge, hydropool and lap pool—alongside gym and sports-medicine services.",
    bestFor: ["Sauna", "Steam room", "Hammam", "Cold plunge", "Spa treatments"],
    character:
      "Spa Experience is the accessible option for an occasional visit. Third Space is a much larger training-and-recovery environment, but its wet spa is a club amenity rather than a public day-spa session.",
    visitNotes: [
      "Spa Experience thermal sessions and treatments use separate timetables; select the exact booking you need.",
      "Third Space's pool and thermal suite require the appropriate membership.",
      "Only the Third Space listing currently verifies a Wimbledon cold plunge.",
    ],
    relatedAreas: ["Wandsworth", "Richmond", "Fulham", "South London"],
    relatedLinks: [
      { href: "/sauna-london", label: "Saunas in London" },
      { href: "/cold-plunge-london", label: "Cold Plunge in London" },
      { href: "/south-london-wellness", label: "South London wellness spaces" },
    ],
    editorNote:
      "Choose Spa Experience for public sauna, steam, hammam and treatments; choose Third Space when you want repeated access to a broader thermal suite alongside training and pool facilities.",
  },
];

export function getNeighbourhoodPage(slug: string) {
  return neighbourhoodPages.find((page) => page.slug === slug);
}
