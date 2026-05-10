export type ServicePageContent = {
  editorialIntro: string[];
  internalLinks: { href: string; label: string; text: string }[];
  guidancePoints: { title: string; text: string }[];
  insightPanels: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
};

export const saunaContent: ServicePageContent = {
  editorialIntro: [
    "London’s sauna scene now stretches well beyond the traditional spa. You can find design-led infrared rooms, communal Finnish-style heat sessions, private recovery cabins and modern contrast therapy studios that pair heat with cold immersion.",
    "The right choice depends less on the word sauna and more on the ritual you want. Some spaces are built for quiet nervous-system reset; others are better for post-training recovery, social sessions or a more premium spa-style experience with showers, towels and recovery areas included.",
    "Use this guide to compare sauna spaces by atmosphere, access, price, location and whether they offer supporting recovery services such as cold plunge, compression, red light or guided contrast therapy."
  ],
  internalLinks: [
    { href: "/cold-plunge-london", label: "Cold plunge", text: "Pair heat with cold exposure for a fuller contrast therapy routine." },
    { href: "/cryotherapy-london", label: "Cryotherapy", text: "Compare sauna with shorter cold-therapy treatments used by recovery studios." }
  ],
  guidancePoints: [
    { title: "Sauna type", text: "Infrared tends to feel gentler and more private; Finnish or traditional heat usually feels hotter, more social and more ritual-led." },
    { title: "Private or shared", text: "Private rooms suit quiet recovery and couples; shared studios can be better for energy, community and guided sessions." },
    { title: "Recovery setup", text: "Look for showers, towel provision, cooling space and whether cold plunge or other recovery services are available on-site." },
    { title: "Price and rhythm", text: "Single sessions are useful for trying a space, but memberships or packs matter if sauna becomes part of a weekly routine." }
  ],
  insightPanels: [
    { title: "What a good sauna space should make clear", text: "Before booking, check session length, heat type, whether the sauna is private or shared, what is included, how busy the space feels, and whether there is somewhere calm to cool down afterwards." },
    { title: "Best for beginners", text: "Beginners usually benefit from shorter sessions, clear staff guidance, easy access to water and showers, and a venue that does not feel intimidating or overly performance-led." },
    { title: "Typical London pricing", text: "Expect pricing to vary significantly. Budget or gym-based access can be much cheaper, while private infrared cabins, luxury clubs and contrast therapy studios usually command a premium." }
  ],
  faqs: [
    { question: "What are the best saunas in London?", answer: "The best sauna depends on what you want from the session. For quiet recovery, look for private infrared or boutique wellness studios. For a more social ritual, consider traditional or communal sauna spaces. For recovery, prioritise venues that also offer cold plunge, showers and calm post-session areas." },
    { question: "Is infrared sauna better than a traditional sauna?", answer: "Neither is universally better. Infrared saunas often feel gentler and are popular in private wellness studios, while traditional saunas create a hotter, more intense heat experience. The better option depends on comfort, budget, location and the kind of recovery ritual you prefer." },
    { question: "How much does a sauna session cost in London?", answer: "Prices vary by format. Gym access may be relatively affordable, while private infrared cabins, luxury wellness clubs and contrast therapy studios are typically more expensive. Always check whether towels, showers, plunge access or extra facilities are included." },
    { question: "Can I combine sauna with cold plunge in London?", answer: "Yes. Many London recovery studios now offer contrast therapy, where sauna heat is alternated with cold plunge or ice bath exposure. This can be a more complete recovery experience than sauna alone, provided the session is well guided and sensibly paced." },
    { question: "What should I look for before booking a sauna?", answer: "Check the sauna type, session length, access model, cleanliness, changing facilities, shower availability, location, price and whether the venue suits your preferred atmosphere — quiet, social, premium, athletic or beginner-friendly." },
    { question: "Are London saunas beginner-friendly?", answer: "Many are, but the experience varies. If you are new to sauna, choose a venue with clear instructions, shorter session options, accessible staff and easy cooling facilities. Avoid pushing session length or heat intensity too quickly." }
  ]
};

export const coldPlungeContent: ServicePageContent = {
  editorialIntro: [
    "Cold plunge has moved from a niche recovery habit into one of London’s fastest-growing wellness treatments. Across the city, ice baths and cold tubs now appear in boutique recovery studios, luxury wellness clubs, gyms and contrast therapy spaces.",
    "The best cold plunge experience is not just about how cold the water is. Clean facilities, calm guidance, sensible session structure, showers, towels and somewhere to regulate afterwards all matter — especially for beginners.",
    "Use this guide to compare London cold plunge and ice bath spaces by atmosphere, support, price, access and whether they can be combined with sauna for a complete contrast therapy ritual."
  ],
  internalLinks: [
    { href: "/sauna-london", label: "Saunas", text: "Explore heat-led spaces that often pair naturally with cold immersion." },
    { href: "/cryotherapy-london", label: "Cryotherapy", text: "Compare cold plunge with shorter cold-therapy treatments across London." }
  ],
  guidancePoints: [
    { title: "Guided or self-led", text: "Beginners may prefer guided sessions, while experienced users may value flexible self-led access." },
    { title: "Water and facilities", text: "Clean plunge tubs, showers, towel provision and recovery space make a big difference to the overall experience." },
    { title: "Contrast therapy", text: "If you want sauna and plunge together, choose a venue designed for alternating heat and cold rather than a standalone ice bath." },
    { title: "Repeatability", text: "The best option is often the one you can realistically revisit, based on location, price and session format." }
  ],
  insightPanels: [
    { title: "What makes a cold plunge studio worth choosing", text: "Look for clean water management, clear timing guidance, non-intimidating staff, simple changing facilities and a space that helps you warm up and regulate afterwards." },
    { title: "Best for first-timers", text: "Choose a venue that offers instruction, allows short exposure times and does not frame cold immersion as a toughness test. A calm environment matters." },
    { title: "Typical London pricing", text: "Pricing varies from lower-cost gym or group access through to premium private recovery studios. Contrast therapy sessions usually cost more than standalone plunge access." }
  ],
  faqs: [
    { question: "Where can I do cold plunge in London?", answer: "You can find cold plunge and ice bath sessions in specialist recovery studios, contrast therapy spaces, some gyms and luxury wellness clubs. The best option depends on whether you want guided support, private access, sauna pairing or a more social recovery environment." },
    { question: "Is cold plunge good for beginners?", answer: "Cold plunge can be beginner-friendly when the environment is well managed. Start with short exposure, choose a venue with clear guidance, and avoid treating the session as an endurance challenge. People with medical concerns should seek professional advice before cold exposure." },
    { question: "What is the difference between cold plunge and cryotherapy?", answer: "Cold plunge usually involves immersion in cold water, often for a few minutes. Cryotherapy usually involves brief exposure to very cold air in a chamber or targeted treatment. The experience, sensation and setting are different, even though both sit within cold-therapy routines." },
    { question: "Can I combine cold plunge with sauna?", answer: "Yes. Many London venues offer contrast therapy, combining sauna and cold plunge in alternating rounds. If that is your goal, look for a venue specifically designed for heat-to-cold transitions, with showers and a calm recovery area." },
    { question: "How much does cold plunge cost in London?", answer: "Costs vary depending on whether it is standalone access, a guided session, part of a gym membership or a premium contrast therapy experience. Compare what is included, not just the headline session price." },
    { question: "What should I bring to a cold plunge session?", answer: "Check the venue instructions first. Many studios provide towels and showers, but you may need swimwear, sliders or a change of clothes. For first sessions, prioritise comfort and simple logistics." }
  ]
};

export const cryotherapyContent: ServicePageContent = {
  editorialIntro: [
    "Cryotherapy in London ranges from specialist cold-therapy studios to wider recovery clubs offering whole-body chambers, localised treatments and complementary services such as compression, infrared sauna or sports recovery support.",
    "Unlike cold plunge, cryotherapy is usually shorter and more controlled, often using very cold air rather than water immersion. For users, the quality of staff guidance, safety briefing, treatment type and wider recovery setup matter more than novelty alone.",
    "Use this guide to compare cryotherapy studios by treatment format, atmosphere, location, pricing, beginner support and whether the venue offers a broader recovery routine beyond the chamber itself."
  ],
  internalLinks: [
    { href: "/cold-plunge-london", label: "Cold plunge", text: "Compare cryotherapy with water-based cold exposure and ice bath sessions." },
    { href: "/sauna-london", label: "Saunas", text: "Explore heat-led recovery spaces that can complement cold therapy." }
  ],
  guidancePoints: [
    { title: "Treatment type", text: "Check whether the venue offers whole-body cryotherapy, localised cryotherapy or both." },
    { title: "Staff guidance", text: "Good onboarding, contraindication checks and calm instructions are especially important for first-time users." },
    { title: "Wider recovery", text: "Some studios are cryotherapy specialists; others combine it with compression, sauna, cold plunge or recovery treatments." },
    { title: "Convenience", text: "Because sessions are short, location, booking ease and opening hours can matter as much as the treatment itself." }
  ],
  insightPanels: [
    { title: "What a credible cryotherapy studio should make clear", text: "Look for clear treatment descriptions, session duration, preparation guidance, contraindications, staff supervision and transparent pricing before you book." },
    { title: "Best for first-timers", text: "First-time users should prioritise calm staff, clear safety checks and a studio that explains what to expect before, during and after the session." },
    { title: "Typical London pricing", text: "Cryotherapy pricing varies by treatment type, package and studio positioning. Whole-body sessions, bundles and premium recovery clubs are usually priced differently from localised treatments." }
  ],
  faqs: [
    { question: "Where can I find cryotherapy in London?", answer: "London has specialist cryotherapy studios, recovery clubs and premium wellness spaces offering whole-body or localised cryotherapy. The right venue depends on treatment type, staff guidance, location and whether you want other recovery services on-site." },
    { question: "What is cryotherapy used for?", answer: "People commonly use cryotherapy as part of recovery, performance or general wellness routines. Claims and individual responses vary, so it is best treated as one component of a wider routine rather than a standalone solution." },
    { question: "What is the difference between whole-body and localised cryotherapy?", answer: "Whole-body cryotherapy exposes the body to very cold air for a short period. Localised cryotherapy targets a specific area. The right option depends on why you are booking and what the studio is equipped to provide." },
    { question: "Is cryotherapy suitable for beginners?", answer: "Many studios accommodate beginners, but the quality of onboarding matters. Look for clear safety guidance, contraindication checks and staff who explain the process calmly. Seek medical advice if you have relevant health concerns." },
    { question: "How much does cryotherapy cost in London?", answer: "Pricing depends on the treatment type, venue and whether you buy a single session, package or membership. Compare what is included and whether the studio offers proper guidance rather than choosing purely on price." },
    { question: "Can cryotherapy be combined with other recovery treatments?", answer: "Yes. Some London recovery spaces combine cryotherapy with compression, sauna, cold plunge, red light or sports recovery services. These broader studios can be useful if you want a more complete recovery routine." }
  ]
};
