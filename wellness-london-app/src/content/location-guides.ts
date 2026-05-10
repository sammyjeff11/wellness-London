export type LocationGuide = {
  slug: string;
  title: string;
  description: string;
  intro: string[];
  highlights: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
};

export const eastLondonGuide: LocationGuide = {
  slug: "east-london-wellness",
  title: "Best Wellness & Recovery Spaces in East London",
  description:
    "Discover curated saunas, cold plunge studios, cryotherapy and recovery spaces across East London, including Shoreditch, Hackney and Canary Wharf.",
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
    },
    {
      question: "Are East London recovery studios beginner-friendly?",
      answer: "Many are designed for regular everyday use rather than elite performance environments, making them more approachable for beginners and casual wellness users."
    }
  ]
};
