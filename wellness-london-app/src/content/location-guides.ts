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
    "Compare saunas, cold plunges, cryotherapy and recovery venues across Soho, Covent Garden, Marylebone, Fitzrovia and Mayfair.",
  areas: ["Soho", "Covent Garden", "Marylebone", "Fitzrovia", "Mayfair", "Holborn"],
  intro: [
    "Central London has a dense mix of recovery studios, hotel spas, members' clubs and treatment-led clinics, often within walking distance of major offices and transport hubs.",
    "Soho and Covent Garden suit shorter appointments around work or an evening out; Marylebone, Fitzrovia and Mayfair include more clinic-led, private and hotel-based options.",
    "Compare the access model as carefully as the treatment: some venues take public bookings, while others restrict facilities to members or hotel guests."
  ],
  highlights: [
    {
      title: "Best for accessibility",
      text: "Central London is ideal for people who want recovery spaces close to offices, gyms, hotels and transport links."
    },
    {
      title: "Best for choice",
      text: "The area covers public studios, hotel spas, private clubs and specialist clinics within a relatively compact part of London."
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
      answer: "Yes. The main advantage is choice and transport access, but prices and access rules vary widely between public studios, hotel spas and members' clubs."
    }
  ]
};

export const northLondonGuide: LocationGuide = {
  slug: "north-london-wellness",
  title: "Best Wellness & Recovery Spaces in North London",
  description: "Compare saunas, cold plunges and recovery venues across Islington, Hampstead, Camden, Highbury and nearby North London areas.",
  areas: ["Islington", "Hampstead", "Camden", "Highbury", "Primrose Hill", "Finsbury Park"],
  intro: [
    "North London listings are spread across residential neighbourhoods rather than one central wellness district.",
    "That makes journey time and repeatability especially important: compare venues near home, work or a regular transport route before comparing smaller differences in atmosphere.",
    "The mix includes community sauna, private recovery studios and appointment-led treatments, with access and facilities varying by venue."
  ],
  highlights: [
    { title: "Best for repeat routines", text: "Prioritise a venue close to home, work or a station you already use." },
    { title: "Best for neighbourhood studios", text: "The region includes smaller operators and community-led formats as well as larger clubs." },
    { title: "Check before travelling", text: "North London is broad, so confirm the exact branch, postcode and transport route." }
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
    "Compare saunas, cold plunges, contrast therapy and recovery venues across Shoreditch, Hackney, Canary Wharf and nearby East London areas.",
  areas: ["Shoreditch", "Hackney", "Canary Wharf", "Bethnal Green", "Dalston", "London Fields"],
  intro: [
    "East London has a useful concentration of sauna-and-cold-plunge venues, particularly around Hackney and Shoreditch, alongside gym-based and members' facilities in Canary Wharf.",
    "Shared community sessions, outdoor setups and guided contrast formats are more common here than traditional hotel-spa experiences.",
    "Check whether a session is guided or self-led, private or shared, and whether towels, showers and changing facilities are included."
  ],
  highlights: [
    {
      title: "Best for contrast therapy",
      text: "East London has a growing concentration of studios combining sauna and cold plunge within one guided experience."
    },
    {
      title: "Best for after-work sessions",
      text: "Shoreditch and Canary Wharf both have options close to offices, gyms and major transport links."
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
  description: "Compare saunas, cold plunges and recovery venues across Brixton, Peckham, Battersea, Clapham and wider South London.",
  areas: ["Clapham", "Battersea", "Brixton", "Wimbledon", "Peckham", "Dulwich"],
  intro: [
    "South London venues are spread across Brixton, Peckham, Battersea, Clapham and other neighbourhood centres rather than clustered in one district.",
    "The current mix includes community sauna, rooftop or outdoor heat-and-cold sessions, and appointment-led recovery services.",
    "Compare the exact location, session format and facilities before booking; two venues in the same broad area can offer very different visits."
  ],
  highlights: [
    { title: "Best for local routines", text: "Choose by journey time if you expect to book regularly." },
    { title: "Best for community formats", text: "Several South London options use shared, social or outdoor session formats." },
    { title: "Check the setup", text: "Outdoor and rooftop venues may have different changing, shower and weather policies." }
  ],
  faqs: [
    { question: "Where are the best wellness spaces in South London?", answer: "Useful areas include Clapham, Battersea, Brixton and Wimbledon." },
    { question: "Is South London good for sauna and cold plunge?", answer: "South London has a growing mix of recovery and wellness spaces." }
  ]
};

export const westLondonGuide: LocationGuide = {
  slug: "west-london-wellness",
  title: "Best Wellness & Recovery Spaces in West London",
  description: "Compare spas, saunas, recovery studios and longevity clinics across Notting Hill, Chelsea, Kensington, Fulham and wider West London.",
  areas: ["Notting Hill", "Chelsea", "Kensington", "Chiswick", "Hammersmith", "Fulham"],
  intro: [
    "West London has a broad mix of hotel spas, private recovery studios, members' clubs and clinic-led longevity services.",
    "Chelsea and Kensington are stronger for diagnostics and equipment-led recovery; Notting Hill combines spa, movement and treatment-led venues.",
    "Access is the key comparison: check whether facilities are public, tied to a treatment, reserved for hotel guests or limited to members."
  ],
  highlights: [
    { title: "Best for higher-service venues", text: "West London has a strong selection of hotel spas, private rooms and appointment-led clinics." },
    { title: "Best for private treatments", text: "Useful when privacy and one-to-one appointments matter more than shared facilities." },
    { title: "Best for mixed services", text: "Many venues combine recovery with diagnostics, beauty, movement or spa treatments." }
  ],
  faqs: [
    { question: "Where are the best wellness spaces in West London?", answer: "Notting Hill, Chelsea, Kensington and Fulham are useful areas to explore." },
    { question: "Is West London good for luxury wellness?", answer: "Yes. It has many hotel spas, private clinics and members' venues, but confirm public access and exactly what each booking includes." }
  ]
};
