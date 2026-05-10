export type LocationGuide = {
  slug: string;
  title: string;
  description: string;
  intro: string[];
  highlights: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
  areas: string[];
};

export const centralLondonGuide: LocationGuide = {
  slug: "central-london-wellness",
  title: "Best Wellness & Recovery Spaces in Central London",
  description:
    "Discover curated saunas, cold plunge studios, cryotherapy and recovery spaces across Central London, including Soho, Covent Garden, Marylebone and Fitzrovia.",
  areas: ["Soho", "Covent Garden", "Marylebone", "Fitzrovia", "Mayfair", "Holborn"],
  intro: [
    "Central London is where many of the city’s highest-profile wellness concepts and recovery studios are concentrated. From premium sauna spaces and contrast therapy clubs to cryotherapy and luxury wellness facilities, the area offers a dense mix of treatments designed around busy city lifestyles.",
    "Neighbourhoods such as Soho, Covent Garden, Marylebone and Fitzrovia combine accessibility with a growing demand for recovery spaces that fit naturally around work, fitness and urban routines.",
    "Use this guide to compare Central London wellness spaces at a broad regional level, while naturally referencing key neighbourhoods that help distinguish atmosphere, convenience and treatment style."
  ],
  highlights: [
    {
      title: "Best for accessibility",
      text: "Central London is ideal for people who want recovery spaces close to offices, gyms, hotels and transport links."
    },
    {
      title: "Best for premium concepts",
      text: "Many of London’s more design-led and trend-aware wellness concepts launch in central neighbourhoods first."
    },
    {
      title: "Best for mixed wellness routines",
      text: "The region works well for combining recovery treatments with fitness, work and broader lifestyle routines."
    }
  ],
  faqs: [
    {
      question: "Where are the best wellness spaces in Central London?",
      answer: "Popular areas include Soho, Covent Garden, Marylebone and Fitzrovia, where you can find sauna, cold plunge, cryotherapy and broader recovery-focused wellness spaces."
    },
    {
      question: "Is Central London good for recovery and wellness?",
      answer: "Yes. Central London offers one of the highest concentrations of premium wellness and recovery spaces in the city, especially for people balancing work, fitness and city living."
    }
  ]
};

export const northLondonGuide: LocationGuide = {
  slug: "north-london-wellness",
  title: "Best Wellness & Recovery Spaces in North London",
  description: "Discover curated saunas, cold plunge, cryotherapy and recovery spaces across North London.",
  areas: ["Islington", "Hampstead", "Camden", "Highbury", "Primrose Hill", "Finsbury Park"],
  intro: [
    "North London’s wellness scene is shaped by neighbourhood-led studios and calmer residential recovery spaces.",
    "Areas such as Islington, Hampstead and Camden support practical weekly recovery routines.",
    "Use this guide to compare North London wellness and recovery spaces at a broad regional level."
  ],
  highlights: [
    { title: "Best for repeat routines", text: "Works well for people wanting recovery close to home or work." },
    { title: "Best for calmer spaces", text: "Many venues feel less destination-led and more practical." },
    { title: "Best for local discovery", text: "Useful for comparing smaller studios across North London." }
  ],
  faqs: [
    { question: "Where are the best wellness spaces in North London?", answer: "Useful areas include Islington, Hampstead, Camden and Highbury." },
    { question: "Is North London good for regular recovery routines?", answer: "Yes. North London works well for calmer recovery routines integrated into daily life." }
  ]
};

export const eastLondonGuide: LocationGuide = {
  slug: "east-london-wellness",
  title: "Best Wellness & Recovery Spaces in East London",
  description:
    "Discover curated saunas, cold plunge studios, cryotherapy and recovery spaces across East London, including Shoreditch, Hackney and Canary Wharf.",
  areas: ["Shoreditch", "Hackney", "Canary Wharf", "Bethnal Green", "Dalston", "London Fields"],
  intro: [
    "East London has become one of the strongest areas in the city for modern recovery culture. Boutique wellness studios, design-led saunas, contrast therapy spaces and performance-focused recovery clubs now sit alongside gyms, cafés and creative workspaces across Shoreditch, Hackney and Canary Wharf.",
    "The area suits people looking for wellness spaces that feel integrated into everyday life rather than destination spas. Many venues are smaller, more design-conscious and built around repeat weekly rituals rather than occasional visits.",
    "Use this guide to explore recovery spaces across East London, from infrared saunas and cold plunge studios to broader recovery clubs offering contrast therapy and performance-led treatments."
  ],
  highlights: [
    {
      title: "Best for contrast therapy",
      text: "East London has a growing concentration of studios combining sauna and cold plunge within one guided experience."
    },
    {
      title: "Best for creative professionals",
      text: "Many spaces are designed around calmer daily rituals, flexible drop-ins and post-work recovery sessions."
    },
    {
      title: "Best for gym-adjacent recovery",
      text: "Several studios sit close to fitness-focused communities and offer performance-oriented recovery treatments."
    }
  ],
  faqs: [
    {
      question: "Where are the best wellness spaces in East London?",
      answer: "Popular areas include Shoreditch, Hackney and Canary Wharf, where you can find saunas, cold plunge studios, cryotherapy and broader recovery-focused wellness spaces."
    },
    {
      question: "Is East London good for contrast therapy?",
      answer: "Yes. East London has become one of the strongest areas for contrast therapy, with multiple venues combining sauna and cold plunge experiences."
    }
  ]
};

export const southLondonGuide: LocationGuide = {
  slug: "south-london-wellness",
  title: "Best Wellness & Recovery Spaces in South London",
  description: "Discover curated saunas, cold plunge, cryotherapy and recovery spaces across South London.",
  areas: ["Clapham", "Battersea", "Brixton", "Wimbledon", "Peckham", "Dulwich"],
  intro: [
    "South London’s wellness scene is spread across residential and lifestyle-led neighbourhoods.",
    "Areas such as Clapham, Battersea and Wimbledon support a mix of sauna access and recovery services.",
    "Use this guide to compare South London wellness and recovery spaces at a regional level."
  ],
  highlights: [
    { title: "Best for local routines", text: "Useful for people who want recovery access close to home." },
    { title: "Best for lifestyle-led spaces", text: "Many venues combine recovery and movement." },
    { title: "Best for weekend recovery", text: "Works well for slower weekend wellness routines." }
  ],
  faqs: [
    { question: "Where are the best wellness spaces in South London?", answer: "Useful areas include Clapham, Battersea, Brixton and Wimbledon." },
    { question: "Is South London good for sauna and cold plunge?", answer: "South London has a growing mix of recovery and wellness spaces." }
  ]
};

export const westLondonGuide: LocationGuide = {
  slug: "west-london-wellness",
  title: "Best Wellness & Recovery Spaces in West London",
  description: "Discover curated saunas, cold plunge, cryotherapy and recovery spaces across West London.",
  areas: ["Notting Hill", "Chelsea", "Kensington", "Chiswick", "Hammersmith", "Fulham"],
  intro: [
    "West London is naturally aligned with premium wellness and calmer lifestyle-led recovery experiences.",
    "Across neighbourhoods such as Notting Hill, Chelsea and Kensington, the wellness offer includes saunas, cryotherapy and luxury studios.",
    "Use this guide to explore West London at a broad regional level while still referencing key neighbourhoods naturally."
  ],
  highlights: [
    { title: "Best for premium spaces", text: "A strong fit for polished and luxury-led wellness experiences." },
    { title: "Best for private treatments", text: "Well suited to private rooms and calmer appointment-led treatments." },
    { title: "Best for lifestyle wellness", text: "Many venues blend recovery with beauty and movement." }
  ],
  faqs: [
    { question: "Where are the best wellness spaces in West London?", answer: "Notting Hill, Chelsea, Kensington and Fulham are useful areas to explore." },
    { question: "Is West London good for luxury wellness?", answer: "Yes. West London is one of the stronger areas for premium wellness experiences." }
  ]
};