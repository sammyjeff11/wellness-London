export type LocationGuide = {
  slug: string;
  title: string;
  description: string;
  intro: string[];
  highlights: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
};

export const centralLondonGuide: LocationGuide = {
  slug: "central-london-wellness",
  title: "Best Wellness & Recovery Spaces in Central London",
  description:
    "Discover curated saunas, cold plunge studios, cryotherapy and recovery spaces across Central London, including Soho, Covent Garden, Marylebone and Fitzrovia.",
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
    },
    {
      question: "Should Central London have separate neighbourhood pages?",
      answer: "Not yet. Keeping Central London as one broader authority page is strategically stronger at this stage while still referencing important neighbourhoods naturally within the editorial content."
    }
  ]
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
