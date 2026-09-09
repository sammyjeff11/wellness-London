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
  title: "Wellness & Recovery Venues in Central London",
  description:
    "Compare saunas, cold plunges, cryotherapy and recovery venues across Soho, Covent Garden, Marylebone, Fitzrovia and Mayfair.",
  areas: [
    "Soho",
    "Covent Garden",
    "Marylebone",
    "Fitzrovia",
    "Mayfair",
    "Holborn",
  ],
  intro: [
    "Compare the listed venues in Soho, Covent Garden, Marylebone, Fitzrovia, Mayfair and Holborn.",
    "Listings include different booking types: treatment appointments, spa visits and club facilities. Check which facilities the advertised booking includes.",
  ],
  highlights: [
    {
      title: "Access",
      text: "Check whether the facilities are open to public bookings, members, hotel guests or treatment clients.",
    },
    {
      title: "Booking price",
      text: "Compare the price for the session you intend to book, including duration, extras and introductory or membership conditions.",
    },
    {
      title: "Location and facilities",
      text: "Check the branch address, travel time, towels, showers and changing facilities.",
    },
  ],
  faqs: [
    {
      question: "How do I compare wellness venues in Central London?",
      answer:
        "Start with the service and exact location. Then compare access, session length, price basis and included facilities in the listings below.",
    },
    {
      question: "Does a listed service mean it is included in every booking?",
      answer:
        "No. Check the selected ticket or treatment package with the operator; access to other facilities can cost extra or require membership.",
    },
  ],
};

export const northLondonGuide: LocationGuide = {
  slug: "north-london-wellness",
  title: "Wellness & Recovery Venues in North London",
  description:
    "Compare saunas, cold plunges and recovery venues across Islington, Hampstead, Camden, Highbury and nearby North London areas.",
  areas: [
    "Islington",
    "Hampstead",
    "Camden",
    "Highbury",
    "Primrose Hill",
    "Finsbury Park",
  ],
  intro: [
    "Compare the listed venues in North London by exact address and service.",
    "Check the journey to the individual branch, its timetable and whether a booking is for a shared session, private hire or a treatment appointment.",
  ],
  highlights: [
    {
      title: "Access",
      text: "Check whether the facilities are open to public bookings, members, hotel guests or treatment clients.",
    },
    {
      title: "Booking price",
      text: "Compare the price for the session you intend to book, including duration, extras and introductory or membership conditions.",
    },
    {
      title: "Location and facilities",
      text: "Check the branch address, travel time, towels, showers and changing facilities.",
    },
  ],
  faqs: [
    {
      question: "How do I compare wellness venues in North London?",
      answer:
        "Start with the service and exact location. Then compare access, session length, price basis and included facilities in the listings below.",
    },
    {
      question: "Does a listed service mean it is included in every booking?",
      answer:
        "No. Check the selected ticket or treatment package with the operator; access to other facilities can cost extra or require membership.",
    },
  ],
};

export const eastLondonGuide: LocationGuide = {
  slug: "east-london-wellness",
  title: "Wellness & Recovery Venues in East London",
  description:
    "Compare saunas, cold plunges, contrast therapy and recovery venues across Shoreditch, Hackney, Canary Wharf and nearby East London areas.",
  areas: [
    "Shoreditch",
    "Hackney",
    "Canary Wharf",
    "Bethnal Green",
    "Dalston",
    "London Fields",
  ],
  intro: [
    "Compare the listed East London venues, including sauna and cold-plunge bookings around Shoreditch, Hackney and Canary Wharf.",
    "Public sessions and membership facilities are listed separately. A venue offering both sauna and cold plunge does not mean every ticket includes both.",
  ],
  highlights: [
    {
      title: "Access",
      text: "Check whether the facilities are open to public bookings, members, hotel guests or treatment clients.",
    },
    {
      title: "Booking price",
      text: "Compare the price for the session you intend to book, including duration, extras and introductory or membership conditions.",
    },
    {
      title: "Location and facilities",
      text: "Check the branch address, travel time, towels, showers and changing facilities.",
    },
  ],
  faqs: [
    {
      question: "How do I compare wellness venues in East London?",
      answer:
        "Start with the service and exact location. Then compare access, session length, price basis and included facilities in the listings below.",
    },
    {
      question: "Does a listed service mean it is included in every booking?",
      answer:
        "No. Check the selected ticket or treatment package with the operator; access to other facilities can cost extra or require membership.",
    },
  ],
};

export const southLondonGuide: LocationGuide = {
  slug: "south-london-wellness",
  title: "Wellness & Recovery Venues in South London",
  description:
    "Compare saunas, cold plunges and recovery venues across Brixton, Peckham, Battersea, Clapham and wider South London.",
  areas: ["Clapham", "Battersea", "Brixton", "Wimbledon", "Peckham", "Dulwich"],
  intro: [
    "Compare the listed venues across South London, including Peckham, Battersea, Clapham and Wimbledon.",
    "Check the exact branch and booking format. Outdoor venues may have different shower, changing and weather arrangements.",
  ],
  highlights: [
    {
      title: "Access",
      text: "Check whether the facilities are open to public bookings, members, hotel guests or treatment clients.",
    },
    {
      title: "Booking price",
      text: "Compare the price for the session you intend to book, including duration, extras and introductory or membership conditions.",
    },
    {
      title: "Location and facilities",
      text: "Check the branch address, travel time, towels, showers and changing facilities.",
    },
  ],
  faqs: [
    {
      question: "How do I compare wellness venues in South London?",
      answer:
        "Start with the service and exact location. Then compare access, session length, price basis and included facilities in the listings below.",
    },
    {
      question: "Does a listed service mean it is included in every booking?",
      answer:
        "No. Check the selected ticket or treatment package with the operator; access to other facilities can cost extra or require membership.",
    },
  ],
};

export const westLondonGuide: LocationGuide = {
  slug: "west-london-wellness",
  title: "Wellness & Recovery Venues in West London",
  description:
    "Compare spas, saunas, recovery studios and longevity clinics across Notting Hill, Chelsea, Kensington, Fulham and wider West London.",
  areas: [
    "Notting Hill",
    "Chelsea",
    "Kensington",
    "Chiswick",
    "Hammersmith",
    "Fulham",
  ],
  intro: [
    "Compare the listed spas, clubs, recovery studios and clinics across West London.",
    "Check public access before comparing facilities. A treatment booking, spa-day package and club membership can give access to different parts of the same venue.",
  ],
  highlights: [
    {
      title: "Access",
      text: "Check whether the facilities are open to public bookings, members, hotel guests or treatment clients.",
    },
    {
      title: "Booking price",
      text: "Compare the price for the session you intend to book, including duration, extras and introductory or membership conditions.",
    },
    {
      title: "Location and facilities",
      text: "Check the branch address, travel time, towels, showers and changing facilities.",
    },
  ],
  faqs: [
    {
      question: "How do I compare wellness venues in West London?",
      answer:
        "Start with the service and exact location. Then compare access, session length, price basis and included facilities in the listings below.",
    },
    {
      question: "Does a listed service mean it is included in every booking?",
      answer:
        "No. Check the selected ticket or treatment package with the operator; access to other facilities can cost extra or require membership.",
    },
  ],
};
