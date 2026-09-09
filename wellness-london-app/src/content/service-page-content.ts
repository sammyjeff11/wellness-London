export type ServicePageContent = {
  editorialIntro: string[];
  internalLinks: { href: string; label: string; text: string }[];
  guidancePoints: { title: string; text: string }[];
  insightPanels: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
};

export const saunaContent: ServicePageContent = {
  editorialIntro: [
    "Compare London sauna bookings by heating method, private or shared access, session length and price.",
    "Check whether the advertised price includes showers, towels and cold-water facilities. A club or spa listing may require membership or a specific treatment package.",
  ],
  internalLinks: [
    {
      href: "/cold-plunge-london",
      label: "Cold plunge",
      text: "Compare cold-water facilities and bookings.",
    },
    {
      href: "/infrared-sauna-london",
      label: "Infrared sauna",
      text: "Compare infrared cabin bookings.",
    },
  ],
  guidancePoints: [
    {
      title: "Heating method",
      text: "Ask whether the room uses traditional or infrared heating. Check its operating temperature and session duration.",
    },
    {
      title: "Room occupancy",
      text: "Confirm whether you have exclusive use or share with other visitors, and how many people a ticket covers.",
    },
    {
      title: "Inclusions",
      text: "Check towels, showers, changing time and whether cold-water facilities cost extra.",
    },
  ],
  insightPanels: [
    {
      title: "Access",
      text: "A listed sauna can be available through public sessions, private hire, membership or a spa package. Check the route for this venue.",
    },
    {
      title: "First appointment",
      text: "Ask what briefing and screening are provided, whether staff are available and what the operator requires you to bring.",
    },
  ],
  faqs: [
    {
      question: "How should I compare saunas in London?",
      answer:
        "Compare the heating method, room occupancy, exact branch, booking duration and included facilities.",
    },
    {
      question: "Does infrared mean private or quiet?",
      answer:
        "No. The heating method does not establish room occupancy or noise level. Check the particular session listing.",
    },
    {
      question: "How much does a sauna booking cost?",
      answer:
        "Use the published price and its basis on each profile. Introductory offers, concessions, memberships and individual sessions are different purchases.",
    },
    {
      question: "Is cold plunge included?",
      answer:
        "Only when the selected booking says so. A venue offering both services does not mean every ticket includes both.",
    },
  ],
};

export const coldPlungeContent: ServicePageContent = {
  editorialIntro: [
    "Compare London ice-bath and cold-plunge bookings by water facilities, guidance, session format and price.",
    "Check whether you are booking cold-water access alone or a sauna-and-plunge session. Club facilities may require membership.",
  ],
  internalLinks: [
    {
      href: "/sauna-london",
      label: "Sauna",
      text: "Compare sauna bookings and facilities.",
    },
    {
      href: "/contrast-therapy-london",
      label: "Sauna and cold plunge",
      text: "Find venues listing both heat and cold facilities.",
    },
  ],
  guidancePoints: [
    {
      title: "Water and maintenance",
      text: "Ask about water temperature, filtration or water changes, cleaning and shower requirements.",
    },
    {
      title: "Staff guidance",
      text: "Confirm whether the booking is a led class or self-directed access and what screening is required.",
    },
    {
      title: "Facilities",
      text: "Check changing rooms, towels, showers and what you need to bring.",
    },
  ],
  insightPanels: [
    {
      title: "Time and access",
      text: "Confirm the total booking duration and any separate limits on use of the plunge.",
    },
    {
      title: "Price basis",
      text: "Compare the same booking type. A group class, private session and membership are different purchases.",
    },
  ],
  faqs: [
    {
      question: "How is cold plunge different from cryotherapy?",
      answer:
        "Cold plunge involves water immersion. A cryotherapy listing can refer to a cold-air chamber or a localised treatment; check the exact service.",
    },
    {
      question: "Can I book sauna and cold plunge together?",
      answer:
        "Some listed venues offer combined bookings. Confirm that both facilities are included in the selected ticket.",
    },
    {
      question: "What should I bring?",
      answer:
        "Read the operator’s instructions for swimwear, footwear and towels. Do not assume towels or changing facilities are included.",
    },
    {
      question: "What should I check before my first booking?",
      answer:
        "Ask about screening, briefing, staff availability and the session rules. A beginner label does not establish individual suitability.",
    },
  ],
};

export const cryotherapyContent: ServicePageContent = {
  editorialIntro: [
    "Compare London cryotherapy bookings by whole-body or localised treatment, appointment duration, supervision and price.",
    "Check the exact treatment on the booking page. A venue offering several services may quote a starting price for a different appointment.",
  ],
  internalLinks: [
    {
      href: "/cold-plunge-london",
      label: "Cold plunge",
      text: "Compare cold-water immersion bookings.",
    },
    {
      href: "/recovery-london",
      label: "Recovery venues",
      text: "See which other services are listed at London studios.",
    },
  ],
  guidancePoints: [
    {
      title: "Treatment type",
      text: "Confirm whether the appointment is whole-body, localised or facial cryotherapy.",
    },
    {
      title: "Supervision",
      text: "Ask who supervises the session, what screening is required and what protective clothing is provided.",
    },
    {
      title: "Price and duration",
      text: "Check exposure time, total appointment length and whether the price is for one session or a package.",
    },
  ],
  insightPanels: [
    {
      title: "Claims",
      text: "A booking page can establish what is offered. It does not independently establish that the treatment produces an advertised health outcome.",
    },
    {
      title: "Other services",
      text: "Check which add-ons are separate purchases and whether they require their own assessment or booking.",
    },
  ],
  faqs: [
    {
      question: "Where can I book cryotherapy in London?",
      answer:
        "Use the listed providers below and check the branch, treatment type and current booking page.",
    },
    {
      question:
        "What is the difference between whole-body and localised cryotherapy?",
      answer:
        "Whole-body and localised bookings target different areas and may use different equipment. Ask the provider to explain the treatment offered.",
    },
    {
      question: "Does a listing establish a health benefit?",
      answer:
        "No. Well+ lists published services and practical details. Ask the provider for evidence for a specific treatment claim and for an assessment of suitability.",
    },
    {
      question: "How do I compare prices?",
      answer:
        "Compare the same treatment type and check whether a consultation, introductory condition or course commitment applies.",
    },
  ],
};
