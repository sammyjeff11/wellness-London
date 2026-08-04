import type { LongevityFacility } from "@/lib/longevity-facilities";

export type LongevityServiceSlug =
  | "health-screening-london"
  | "blood-testing-london"
  | "cardiovascular-screening-london"
  | "dexa-scan-london"
  | "vo2-max-testing-london"
  | "medical-imaging-london";

type ContentPanel = {
  title: string;
  text: string;
};

export type LongevityServicePageConfig = {
  slug: LongevityServiceSlug;
  href: string;
  label: string;
  shortLabel: string;
  title: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  heroText: string;
  question: string;
  diagnosticLabels: string[];
  matchTerms: string[];
  bestFor: ContentPanel[];
  measurementAreas: ContentPanel[];
  resultOutputs: ContentPanel[];
  trackingNotes: ContentPanel[];
  evidenceNotes: ContentPanel[];
  whatToExpect: ContentPanel[];
  guidance: ContentPanel[];
  related: { href: string; label: string; text: string }[];
  faqs: { question: string; answer: string }[];
};

export const longevityServicePages: LongevityServicePageConfig[] = [
  {
    slug: "health-screening-london",
    href: "/health-screening-london",
    label: "Health Screening",
    shortLabel: "Screening",
    title: "Private Health Screening in London",
    metaTitle: "Private Health Screening London | Preventative Assessments | Well+",
    description:
      "Compare private health screening providers in London by the tests included, clinical oversight, reporting and follow-up rather than the package name alone.",
    eyebrow: "Preventative health baseline",
    heroText:
      "Build a broader picture of current health, understand which findings matter and compare what each provider does after the results arrive.",
    question: "What does my current health baseline show, and which findings require action or follow-up?",
    diagnosticLabels: ["Health Screening"],
    matchTerms: [
      "health screening",
      "health assessment",
      "preventative health",
      "preventive health",
      "executive health",
      "medical screening",
      "full health check",
      "well person screening",
    ],
    bestFor: [
      {
        title: "A broad starting point",
        text: "Useful when you want several relevant checks brought together rather than booking disconnected tests.",
      },
      {
        title: "Risk-factor review",
        text: "Can combine history, blood pressure, biomarkers and selected investigations to identify priorities for further discussion.",
      },
      {
        title: "Clinician-led interpretation",
        text: "Most valuable when a qualified professional explains normal findings, modifiable risks and results that need further assessment.",
      },
    ],
    measurementAreas: [
      {
        title: "Core health measures",
        text: "Packages may include medical history, blood pressure, body measurements and a physical or clinical review.",
      },
      {
        title: "Laboratory testing",
        text: "Blood panels can cover areas such as blood count, glucose, lipids, kidney, liver or thyroid markers depending on the package and individual context.",
      },
      {
        title: "Selected investigations",
        text: "Some assessments add ECG, DEXA, fitness testing or imaging, but the purpose and clinical relevance should be clear.",
      },
    ],
    resultOutputs: [
      {
        title: "The exact results",
        text: "You should be able to see which tests were performed, the values reported and the reference information used by the provider.",
      },
      {
        title: "Clinical explanation",
        text: "A useful review distinguishes reassuring findings, modifiable risks and results that may need repeat testing or onward assessment.",
      },
      {
        title: "A proportionate next step",
        text: "Recommendations should relate to the findings rather than defaulting to the same long list of interventions for every customer.",
      },
    ],
    trackingNotes: [
      {
        title: "Do not repeat everything automatically",
        text: "Different measures change at different speeds. The provider should explain which results are worth monitoring and why.",
      },
      {
        title: "Keep the comparison consistent",
        text: "Where trends matter, use comparable tests, preparation and reporting so that changes are less likely to reflect methodology alone.",
      },
      {
        title: "Escalate abnormal findings",
        text: "Repeat screening is not a substitute for appropriate GP, specialist or urgent assessment when a result or symptom requires it.",
      },
    ],
    evidenceNotes: [
      {
        title: "Screening has limits",
        text: "Screening may identify risk or possible early signs of a condition, but false-positive and false-negative results are possible.",
      },
      {
        title: "More testing is not always better",
        text: "Very broad packages can create incidental findings, uncertainty and further investigations that may not improve outcomes.",
      },
      {
        title: "Package names are not standardised",
        text: "Two services described as a full health check may contain different tests, consultations and follow-up.",
      },
      {
        title: "Symptoms need assessment",
        text: "A screening package should not delay medical review of new, persistent or concerning symptoms.",
      },
    ],
    whatToExpect: [
      {
        title: "Pre-assessment information",
        text: "You may complete a health questionnaire and receive preparation instructions before attending.",
      },
      {
        title: "A combination of checks",
        text: "The appointment can include consultation, examination, blood tests, cardiovascular measures and selected imaging or performance tests.",
      },
      {
        title: "Results and next steps",
        text: "Turnaround and follow-up vary. Confirm when results arrive, who reviews them and how questions or onward referrals are handled.",
      },
    ],
    guidance: [
      {
        title: "Compare exact inclusions",
        text: "Do not compare packages by title alone. Review every test, consultation, report and follow-up step included in the price.",
      },
      {
        title: "Check clinical oversight",
        text: "Confirm who selects, orders, reviews and explains the investigations and whether they can arrange appropriate onward care.",
      },
      {
        title: "Choose relevance over volume",
        text: "A targeted assessment based on age, history and risk may be more useful than the package with the longest test list.",
      },
    ],
    related: [
      {
        href: "/blood-testing-london",
        label: "Blood Testing & Biomarkers",
        text: "Compare focused panels, clinical review and repeat-testing options.",
      },
      {
        href: "/cardiovascular-screening-london",
        label: "Cardiovascular Screening",
        text: "Explore heart-health risk assessment and selected investigations.",
      },
      {
        href: "/longevity",
        label: "Longevity Clinics",
        text: "Compare clinics by diagnostics, oversight, results and assessment format.",
      },
    ],
    faqs: [
      {
        question: "What is included in a private health screening?",
        answer:
          "It varies widely. Common elements include medical history, blood pressure, blood tests and a clinician review; some packages add ECG, imaging, body composition or fitness testing.",
      },
      {
        question: "Is health screening the same as diagnosis?",
        answer:
          "No. Screening looks for risk or possible early signs in people who may not have symptoms. Abnormal or uncertain findings may require further diagnostic assessment.",
      },
      {
        question: "Can health screening rule out all disease?",
        answer:
          "No. Screening tests have limitations and cannot guarantee that a condition is absent. Results should be interpreted in context by an appropriately qualified professional.",
      },
    ],
  },
  {
    slug: "blood-testing-london",
    href: "/blood-testing-london",
    label: "Blood Testing & Biomarkers",
    shortLabel: "Blood Tests",
    title: "Blood Testing & Biomarkers in London",
    metaTitle: "Private Blood Testing London | Biomarker Panels & Review | Well+",
    description:
      "Compare London blood-testing providers by panel relevance, preparation, clinical interpretation, reporting and repeat-testing support.",
    eyebrow: "Laboratory testing and trends",
    heroText:
      "Understand which blood markers are being measured, why they are relevant and what clinical review or follow-up is included.",
    question: "Which blood markers are relevant to my health question, and what should happen after the results?",
    diagnosticLabels: ["Blood Biomarkers", "Hormone Testing"],
    matchTerms: [
      "blood testing",
      "blood test",
      "blood panel",
      "biomarker",
      "lipid profile",
      "cholesterol testing",
      "hormone testing",
      "thyroid testing",
    ],
    bestFor: [
      {
        title: "A focused health question",
        text: "Useful when the panel is selected for a defined purpose rather than offered as a generic collection of markers.",
      },
      {
        title: "Cardiometabolic risk review",
        text: "Panels may include glucose-related and lipid measures that contribute to a broader cardiovascular or metabolic assessment.",
      },
      {
        title: "Monitoring a known plan",
        text: "Repeat testing can be useful when a clinician has explained what is being monitored, the expected timeframe and what would change management.",
      },
    ],
    measurementAreas: [
      {
        title: "Blood cells and core function",
        text: "Depending on the panel, testing may include blood counts and markers related to kidney, liver or thyroid function.",
      },
      {
        title: "Metabolic and cardiovascular markers",
        text: "Common areas include glucose regulation and lipid measures, interpreted alongside age, history, blood pressure and other risk factors.",
      },
      {
        title: "Targeted markers",
        text: "Hormones, vitamins, iron-related markers or other tests should be selected and interpreted in the context of a clear clinical question.",
      },
    ],
    resultOutputs: [
      {
        title: "An itemised panel",
        text: "Confirm the exact markers included rather than relying on labels such as essential, advanced or longevity panel.",
      },
      {
        title: "Context, not flags alone",
        text: "A result outside a reference range does not automatically establish a diagnosis, and an in-range result may still need context.",
      },
      {
        title: "A route for questions",
        text: "Check whether the service includes a clinician consultation, written explanation and a clear pathway for repeat or further testing.",
      },
    ],
    trackingNotes: [
      {
        title: "Use comparable conditions",
        text: "Preparation, timing, recent exercise, illness and medication can matter for some tests. Follow the provider's instructions each time.",
      },
      {
        title: "Look at meaningful trends",
        text: "A series of comparable results can be more informative than reacting to a single small change without clinical context.",
      },
      {
        title: "Agree the repeat interval",
        text: "The appropriate timing depends on the marker, the reason for testing and whether treatment or behaviour has changed.",
      },
    ],
    evidenceNotes: [
      {
        title: "Panels answer different questions",
        text: "Blood tests are selected for different reasons, including general checks, symptoms, risk assessment and monitoring.",
      },
      {
        title: "Reference ranges need context",
        text: "Ranges, laboratory methods and individual circumstances affect interpretation. Results should not be self-diagnosed from a dashboard alone.",
      },
      {
        title: "Large panels create more findings",
        text: "Testing many low-relevance markers increases the chance of results that are difficult to interpret or require unnecessary follow-up.",
      },
      {
        title: "Testing does not replace care",
        text: "New symptoms, medication decisions and abnormal results should be discussed with an appropriate healthcare professional.",
      },
    ],
    whatToExpect: [
      {
        title: "Panel selection and preparation",
        text: "Some services begin with a questionnaire or consultation. You may receive instructions about food, drink, medicines or timing.",
      },
      {
        title: "A blood draw",
        text: "A trained professional takes a blood sample, which is sent for laboratory analysis.",
      },
      {
        title: "Results and review",
        text: "Turnaround varies by test. Confirm whether you receive raw results only, a written explanation, a consultation or all three.",
      },
    ],
    guidance: [
      {
        title: "Start with the purpose",
        text: "Choose a provider that can explain why each marker is included and what action could follow from the result.",
      },
      {
        title: "Check who reviews the panel",
        text: "Confirm whether interpretation is automated, clinician-led or doctor-led and how abnormal results are escalated.",
      },
      {
        title: "Compare the whole service",
        text: "Price should include consideration of the laboratory, consultation, reporting, repeat testing and onward referral support.",
      },
    ],
    related: [
      {
        href: "/health-screening-london",
        label: "Health Screening",
        text: "Compare broader assessments that combine biomarkers with consultation and other checks.",
      },
      {
        href: "/cardiovascular-screening-london",
        label: "Cardiovascular Screening",
        text: "Understand how lipids and other measures fit within wider cardiovascular risk assessment.",
      },
      {
        href: "/longevity",
        label: "Longevity Clinics",
        text: "Find clinics combining laboratory testing with interpretation and ongoing programmes.",
      },
    ],
    faqs: [
      {
        question: "Which blood tests should I have?",
        answer:
          "That depends on your symptoms, history, medicines, risk factors and purpose for testing. A provider should explain why a panel is relevant rather than recommending every available marker.",
      },
      {
        question: "Should I fast before a private blood test?",
        answer:
          "Some tests require specific preparation and others do not. Follow the instructions supplied by the provider and ask before changing medicines or fasting.",
      },
      {
        question: "Can I interpret blood-test results myself?",
        answer:
          "Results can be complicated. Reference ranges and automated flags are not a complete interpretation, so discuss questions or abnormal findings with an appropriately qualified professional.",
      },
    ],
  },
  {
    slug: "cardiovascular-screening-london",
    href: "/cardiovascular-screening-london",
    label: "Cardiovascular Screening",
    shortLabel: "Heart Health",
    title: "Cardiovascular Screening in London",
    metaTitle: "Cardiovascular Screening London | Heart Health Assessments | Well+",
    description:
      "Compare London cardiovascular screening providers by risk assessment, investigations, clinical interpretation and follow-up.",
    eyebrow: "Heart health and risk assessment",
    heroText:
      "Compare structured cardiovascular assessments by the risk question being addressed, the tests used and who explains the findings.",
    question: "What is my cardiovascular risk, and which measurements or investigations are appropriate for that question?",
    diagnosticLabels: ["Cardiovascular Screening"],
    matchTerms: [
      "cardiovascular screening",
      "cardiac screening",
      "heart screening",
      "cardiovascular assessment",
      "ecg",
      "electrocardiogram",
      "echocardiogram",
      "cardiac imaging",
      "arterial stiffness",
    ],
    bestFor: [
      {
        title: "A structured risk baseline",
        text: "Useful when history, blood pressure, lipids and other risk factors are considered together rather than as isolated numbers.",
      },
      {
        title: "Clinically selected investigations",
        text: "Additional tests are most useful when a clinician can explain why they are appropriate and what a result would change.",
      },
      {
        title: "Follow-up planning",
        text: "A strong service provides a clear next step for modifiable risks, abnormal findings and any need for GP or specialist care.",
      },
    ],
    measurementAreas: [
      {
        title: "Risk factors",
        text: "Assessment may include age, history, smoking, blood pressure, cholesterol and other information used to estimate cardiovascular risk.",
      },
      {
        title: "Heart rhythm and function",
        text: "ECG or other tests may be included where clinically relevant, but they answer different questions and should not be treated as interchangeable.",
      },
      {
        title: "Selected imaging or exercise testing",
        text: "Some clinics add echocardiography, vascular imaging or exercise testing. Confirm the indication, limitations and reporting pathway.",
      },
    ],
    resultOutputs: [
      {
        title: "A risk assessment",
        text: "The service should explain how individual measures contribute to overall risk rather than presenting each result in isolation.",
      },
      {
        title: "A clinical report",
        text: "For investigations such as ECG or imaging, confirm who reports the test and how the result is communicated.",
      },
      {
        title: "A follow-up route",
        text: "Ask how urgent, uncertain or abnormal findings are escalated and whether the provider can coordinate onward care.",
      },
    ],
    trackingNotes: [
      {
        title: "Track modifiable risk factors",
        text: "Measures such as blood pressure and lipids may be monitored over time when there is a clear management plan.",
      },
      {
        title: "Use consistent technique",
        text: "Measurement conditions and equipment can affect results, particularly for blood pressure and some vascular measures.",
      },
      {
        title: "Do not schedule advanced tests by habit",
        text: "The need to repeat imaging, ECG or exercise testing should be based on clinical context rather than a generic annual package.",
      },
    ],
    evidenceNotes: [
      {
        title: "Risk is multifactorial",
        text: "Cardiovascular risk assessment draws on several factors and is more informative than a single biomarker or scan result.",
      },
      {
        title: "Tests have different purposes",
        text: "Blood pressure, lipids, ECG, echocardiography and vascular imaging answer different clinical questions.",
      },
      {
        title: "Incidental findings are possible",
        text: "Additional investigations may identify uncertain or unrelated findings that require further review.",
      },
      {
        title: "Symptoms change the pathway",
        text: "Chest pain, severe breathlessness, fainting or other concerning symptoms require appropriate medical assessment rather than routine screening.",
      },
    ],
    whatToExpect: [
      {
        title: "History and basic measurements",
        text: "Most assessments begin with medical and family history, blood pressure and a review of relevant risk factors.",
      },
      {
        title: "Selected tests",
        text: "The package may include blood tests, ECG, exercise testing or imaging depending on the service and individual context.",
      },
      {
        title: "Clinical review",
        text: "Confirm who interprets the findings, whether you receive a written report and how follow-up is arranged.",
      },
    ],
    guidance: [
      {
        title: "Ask what question each test answers",
        text: "A longer list of investigations is not automatically a better cardiovascular assessment.",
      },
      {
        title: "Confirm reporting credentials",
        text: "Check who performs and reports ECG, imaging or exercise-based investigations and who takes responsibility for follow-up.",
      },
      {
        title: "Compare the onward pathway",
        text: "The practical value of screening depends partly on what happens when a result is abnormal, uncertain or urgent.",
      },
    ],
    related: [
      {
        href: "/blood-testing-london",
        label: "Blood Testing & Biomarkers",
        text: "Compare lipid, glucose and other panels within a broader clinical context.",
      },
      {
        href: "/vo2-max-testing-london",
        label: "VO₂ Max Testing",
        text: "Measure cardiorespiratory fitness in a performance or health context.",
      },
      {
        href: "/health-screening-london",
        label: "Health Screening",
        text: "Explore broader assessments that may include cardiovascular risk review.",
      },
    ],
    faqs: [
      {
        question: "What is included in cardiovascular screening?",
        answer:
          "It varies. A structured assessment may include history, blood pressure, lipid and glucose measures and a formal risk review; some providers add ECG, exercise testing or imaging.",
      },
      {
        question: "Is an ECG a complete heart check?",
        answer:
          "No. An ECG records the heart's electrical activity and answers specific questions. It does not by itself provide a complete assessment of cardiovascular risk or exclude every heart condition.",
      },
      {
        question: "Should everyone have cardiac imaging?",
        answer:
          "Not necessarily. The relevance of imaging depends on the clinical question, risk profile, symptoms and professional judgement. Ask why a test is being recommended and what the result would change.",
      },
    ],
  },
  {
    slug: "dexa-scan-london",
    href: "/dexa-scan-london",
    label: "DEXA Scan",
    shortLabel: "DEXA",
    title: "DEXA Scans in London",
    metaTitle: "DEXA Scan London | Body Composition & Bone Density | Well+",
    description:
      "Compare London DEXA providers for body composition or bone-density assessment by scan purpose, outputs, interpretation and repeat-scan consistency.",
    eyebrow: "Body composition and bone health",
    heroText:
      "Understand whether the service is designed for body composition, bone density or both, and compare what the report and review include.",
    question: "How are body composition or bone-related measures changing, and is the scan designed for that purpose?",
    diagnosticLabels: ["DEXA Scan"],
    matchTerms: [
      "dexa",
      "dual-energy x-ray absorptiometry",
      "body composition scan",
      "bone density scan",
      "bone mineral density",
    ],
    bestFor: [
      {
        title: "Detailed body composition",
        text: "Useful when you want regional estimates of fat and lean mass rather than relying only on consumer scales.",
      },
      {
        title: "Visceral-fat tracking",
        text: "Some body-composition services report an estimate of visceral fat alongside total and regional measures.",
      },
      {
        title: "Bone-health assessment",
        text: "Clinical bone-density DEXA is used within osteoporosis and fracture-risk assessment, which is different from a fitness-led body-composition booking.",
      },
    ],
    measurementAreas: [
      {
        title: "Bone mineral density",
        text: "Clinical DEXA uses low-dose X-rays to measure bone density, commonly at areas such as the hip and spine.",
      },
      {
        title: "Fat distribution",
        text: "Body-composition scans may report total and regional fat mass and an estimate of visceral fat.",
      },
      {
        title: "Lean mass distribution",
        text: "Reports may show total and regional lean mass, which can be useful for structured body-composition tracking.",
      },
    ],
    resultOutputs: [
      {
        title: "A purpose-specific report",
        text: "Confirm whether the output is a body-composition report, a clinical bone-density report or both.",
      },
      {
        title: "Relevant reference information",
        text: "Bone-density results and body-composition estimates use different measures and should be explained accordingly.",
      },
      {
        title: "Qualified interpretation",
        text: "A clinically relevant bone-health concern requires appropriate interpretation and may need fracture-risk assessment or onward care.",
      },
    ],
    trackingNotes: [
      {
        title: "Use the same purpose and protocol",
        text: "A body-composition scan and a clinical bone-density scan should not be treated as interchangeable trend points.",
      },
      {
        title: "Keep conditions comparable",
        text: "Where body-composition trends matter, follow consistent preparation and use the same provider or a clearly comparable protocol.",
      },
      {
        title: "Agree clinical repeat timing",
        text: "The appropriate interval for bone-density reassessment depends on individual risk, previous results and clinical advice.",
      },
    ],
    evidenceNotes: [
      {
        title: "What it measures",
        text: "DEXA uses low-dose X-rays at two energy levels to assess bone density and can also estimate body composition.",
      },
      {
        title: "Purpose changes interpretation",
        text: "A fitness-led whole-body scan and a clinically indicated bone-density assessment answer different questions.",
      },
      {
        title: "Method consistency matters",
        text: "For tracking, compare scans performed with a consistent purpose, protocol and reporting method.",
      },
      {
        title: "Important limitation",
        text: "DEXA is one measurement tool and does not provide a complete assessment of metabolic health or fracture risk by itself.",
      },
    ],
    whatToExpect: [
      {
        title: "A short, non-invasive scan",
        text: "You lie still on an open scanning bed while a scanning arm passes over the relevant area or body.",
      },
      {
        title: "A results report",
        text: "Outputs vary and may include bone-density measures, total and regional fat, lean mass and visceral-fat estimates.",
      },
      {
        title: "Different levels of review",
        text: "Some services provide the report only; others include a physiologist, radiographer or clinician consultation.",
      },
    ],
    guidance: [
      {
        title: "Confirm the scan purpose",
        text: "Check whether the booking is designed for body composition, clinical bone density or both.",
      },
      {
        title: "Ask what is included",
        text: "Confirm the report, consultation, preparation, repeat-scan comparability and any onward pathway.",
      },
      {
        title: "Compare interpretation, not only price",
        text: "A report-only service may suit tracking, while a bone-health concern may require qualified clinical interpretation.",
      },
    ],
    related: [
      {
        href: "/vo2-max-testing-london",
        label: "VO₂ Max Testing",
        text: "Pair body composition with an objective measure of cardiorespiratory fitness.",
      },
      {
        href: "/health-screening-london",
        label: "Health Screening",
        text: "Compare broader preventative assessments and clinician-led packages.",
      },
      {
        href: "/longevity",
        label: "Longevity Clinics",
        text: "Explore clinics combining diagnostics, interpretation and longer-term planning.",
      },
    ],
    faqs: [
      {
        question: "What does a DEXA scan show?",
        answer:
          "Depending on the service, DEXA can report bone mineral density, total and regional body fat, lean mass and an estimated visceral-fat measure.",
      },
      {
        question: "Is a DEXA scan the same as a body-composition scale?",
        answer:
          "No. DEXA uses X-ray technology and provides different regional estimates from bioimpedance scales, although every measurement method has limitations.",
      },
      {
        question: "Do I need a referral for a DEXA scan in London?",
        answer:
          "Many private body-composition services accept direct bookings. Clinically indicated bone-density scans may follow a different referral, reporting or review process.",
      },
    ],
  },
  {
    slug: "vo2-max-testing-london",
    href: "/vo2-max-testing-london",
    label: "VO₂ Max Testing",
    shortLabel: "VO₂ Max",
    title: "VO₂ Max Testing in London",
    metaTitle: "VO₂ Max Testing London | Fitness & Performance Tests | Well+",
    description:
      "Compare London VO₂ max providers by exercise protocol, gas analysis, supervision, reported outputs and repeat-test consistency.",
    eyebrow: "Cardiorespiratory fitness",
    heroText:
      "Measure cardiorespiratory fitness in a controlled test and compare the protocol, interpretation and practical guidance included.",
    question: "What is my measured cardiorespiratory fitness, and how should the result shape training or health discussions?",
    diagnosticLabels: ["VO₂ Max Testing"],
    matchTerms: [
      "vo2 max",
      "vo₂ max",
      "vo2max",
      "cardiopulmonary exercise test",
      "cpet",
      "metabolic testing",
      "exercise physiology",
    ],
    bestFor: [
      {
        title: "Fitness benchmarking",
        text: "Provides an objective baseline when you want more than a wearable estimate.",
      },
      {
        title: "Training-zone accuracy",
        text: "Can support runners, cyclists and endurance athletes seeking more individualised intensity guidance.",
      },
      {
        title: "Longer-term fitness tracking",
        text: "Useful when repeat tests use a comparable exercise mode, protocol and interpretation.",
      },
    ],
    measurementAreas: [
      {
        title: "Oxygen use",
        text: "A mask and gas-analysis equipment measure oxygen consumption and carbon-dioxide production during progressive exercise.",
      },
      {
        title: "Exercise response",
        text: "Heart rate, workload, perceived effort and other measures may be recorded alongside breath-by-breath data.",
      },
      {
        title: "Thresholds and zones",
        text: "Some providers derive ventilatory thresholds, heart-rate zones or related training guidance in addition to the headline VO₂ max value.",
      },
    ],
    resultOutputs: [
      {
        title: "A measured result",
        text: "Confirm that the service directly analyses breathing gases rather than relying only on an algorithmic estimate.",
      },
      {
        title: "Protocol context",
        text: "The report should state the exercise mode, test protocol and whether the provider considered the effort maximal.",
      },
      {
        title: "Practical interpretation",
        text: "Useful outputs may include thresholds, zones and a discussion of how the result relates to age, training background and goals.",
      },
    ],
    trackingNotes: [
      {
        title: "Repeat the same exercise mode",
        text: "Running and cycling tests can produce different results, so use the mode most relevant to your activity and keep it consistent.",
      },
      {
        title: "Keep the protocol comparable",
        text: "Equipment, calibration, workload progression, preparation and effort can all affect repeat-test comparability.",
      },
      {
        title: "Track the wider picture",
        text: "VO₂ max is one fitness measure. Training history, symptoms, thresholds, pace or power and recovery also matter.",
      },
    ],
    evidenceNotes: [
      {
        title: "What it measures",
        text: "VO₂ max is the highest rate at which the body can take in, transport and use oxygen during intense exercise.",
      },
      {
        title: "Protocol matters",
        text: "Results depend on equipment, exercise mode, calibration, effort and the criteria used to judge a maximal test.",
      },
      {
        title: "Laboratory versus wearable",
        text: "Wearables estimate VO₂ max, while laboratory testing directly analyses respiratory gases during exercise.",
      },
      {
        title: "Clinical boundaries",
        text: "A performance VO₂ max test is not automatically the same as a medically supervised cardiopulmonary exercise test.",
      },
    ],
    whatToExpect: [
      {
        title: "Progressive exercise",
        text: "Most tests use a treadmill or cycle ergometer with intensity increasing in stages or continuously.",
      },
      {
        title: "Breath-by-breath analysis",
        text: "You wear a mask connected to equipment that measures respiratory gases while you exercise.",
      },
      {
        title: "Results and guidance",
        text: "Providers may report VO₂ max, thresholds, zones and practical training recommendations.",
      },
    ],
    guidance: [
      {
        title: "Choose the right exercise mode",
        text: "Runners often benefit from treadmill testing and cyclists from bike-based testing where available.",
      },
      {
        title: "Check who conducts the test",
        text: "Look for appropriate exercise-physiology or clinical oversight, particularly if you have symptoms or health concerns.",
      },
      {
        title: "Confirm the outputs",
        text: "Ask whether the price includes thresholds, zones, a written report and a review consultation.",
      },
    ],
    related: [
      {
        href: "/dexa-scan-london",
        label: "DEXA Scans",
        text: "Measure body composition and lean-mass distribution alongside fitness testing.",
      },
      {
        href: "/cardiovascular-screening-london",
        label: "Cardiovascular Screening",
        text: "Explore broader heart-health risk assessment and clinically selected investigations.",
      },
      {
        href: "/longevity",
        label: "Longevity Clinics",
        text: "Find clinics offering diagnostics, medical interpretation and ongoing programmes.",
      },
    ],
    faqs: [
      {
        question: "What is a good VO₂ max?",
        answer:
          "VO₂ max varies by age, sex, training background and test method. A useful interpretation compares the result with an appropriate reference group and your own future measurements.",
      },
      {
        question: "How long does a VO₂ max test take?",
        answer:
          "The maximal exercise portion is usually only one part of the appointment, which may also include setup, warm-up, recovery and a results review.",
      },
      {
        question: "Is VO₂ max testing only for athletes?",
        answer:
          "No. It can provide an objective fitness baseline, although the protocol and level of supervision should suit the individual and the purpose of testing.",
      },
    ],
  },
  {
    slug: "medical-imaging-london",
    href: "/medical-imaging-london",
    label: "Medical Imaging",
    shortLabel: "Imaging",
    title: "Private Medical Imaging in London",
    metaTitle: "Private Medical Imaging London | MRI & Diagnostic Scans | Well+",
    description:
      "Compare private medical-imaging providers in London by scan purpose, referral model, radiology reporting, clinical review and onward pathways.",
    eyebrow: "Imaging with clinical context",
    heroText:
      "Understand why an MRI or other scan is being offered, who reports it and what happens when a finding needs further assessment.",
    question: "Is there a clinically justified reason for imaging, and who is responsible for interpreting and acting on the findings?",
    diagnosticLabels: ["MRI / Medical Imaging"],
    matchTerms: [
      "mri",
      "medical imaging",
      "diagnostic imaging",
      "ct scan",
      "ultrasound",
      "full body scan",
      "radiology",
    ],
    bestFor: [
      {
        title: "A defined clinical question",
        text: "Imaging is most useful when the scan type and body area are selected to investigate a specific concern or risk question.",
      },
      {
        title: "Specialist reporting",
        text: "A strong service makes clear which radiologist reports the scan and how the result reaches the responsible clinician.",
      },
      {
        title: "Coordinated follow-up",
        text: "The practical value depends on how urgent, uncertain or incidental findings are explained and escalated.",
      },
    ],
    measurementAreas: [
      {
        title: "Anatomy and structure",
        text: "MRI and other imaging methods create pictures of organs, tissues or body structures to answer particular clinical questions.",
      },
      {
        title: "A defined body area or protocol",
        text: "The modality, body region, sequence and possible use of contrast should be selected for a clear purpose.",
      },
      {
        title: "Radiology interpretation",
        text: "The images are reviewed by a radiologist, who produces a report for the referring or responsible clinician.",
      },
    ],
    resultOutputs: [
      {
        title: "A radiology report",
        text: "Confirm who reports the images, the expected turnaround and whether you receive a copy of the report.",
      },
      {
        title: "Clinical explanation",
        text: "A report may contain technical or uncertain findings. Check who explains what is material and what happens next.",
      },
      {
        title: "An onward pathway",
        text: "Ask how urgent findings, incidental findings and recommendations for further imaging or specialist review are managed.",
      },
    ],
    trackingNotes: [
      {
        title: "Do not assume annual imaging is useful",
        text: "Repeat timing should follow the clinical question, previous findings and professional advice rather than a generic schedule.",
      },
      {
        title: "Compare like with like",
        text: "Where follow-up imaging is needed, the modality, body area and protocol may need to remain comparable.",
      },
      {
        title: "Keep reports accessible",
        text: "Retaining reports and, where available, images can help the responsible clinician compare future findings.",
      },
    ],
    evidenceNotes: [
      {
        title: "Imaging answers specific questions",
        text: "Different scan types have different strengths, limitations and safety considerations.",
      },
      {
        title: "Incidental findings can occur",
        text: "Scanning can identify abnormalities or uncertainties unrelated to the original reason for the test, which may lead to further investigation.",
      },
      {
        title: "Reporting is not the whole pathway",
        text: "A radiology report still needs appropriate clinical context and a clear route for follow-up.",
      },
      {
        title: "Symptoms require clinical assessment",
        text: "Choosing a consumer scan should not delay appropriate medical review or emergency care for concerning symptoms.",
      },
    ],
    whatToExpect: [
      {
        title: "Safety and suitability checks",
        text: "The provider may ask about pregnancy, implants, previous surgery, kidney problems, allergies or other factors relevant to the scan.",
      },
      {
        title: "The imaging appointment",
        text: "The experience and duration vary by modality, body area and whether contrast is used.",
      },
      {
        title: "Reporting and follow-up",
        text: "Images are reviewed after the appointment. Confirm who receives the report and who discusses the result with you.",
      },
    ],
    guidance: [
      {
        title: "Ask why this scan is appropriate",
        text: "The provider should explain the clinical question, selected modality and what the result could change.",
      },
      {
        title: "Confirm radiology and clinical responsibility",
        text: "Check who reports the images, who explains the report and who arranges onward care if needed.",
      },
      {
        title: "Understand the full cost",
        text: "Clarify whether the price includes contrast, the radiology report, consultation, image access and follow-up.",
      },
    ],
    related: [
      {
        href: "/health-screening-london",
        label: "Health Screening",
        text: "Compare broader assessments and see when imaging forms part of a larger clinical review.",
      },
      {
        href: "/cardiovascular-screening-london",
        label: "Cardiovascular Screening",
        text: "Explore risk assessment and selected heart or vascular investigations.",
      },
      {
        href: "/longevity",
        label: "Longevity Clinics",
        text: "Compare clinics by diagnostics, oversight, reporting and follow-up.",
      },
    ],
    faqs: [
      {
        question: "What is an MRI scan used for?",
        answer:
          "MRI produces detailed images of the inside of the body and can be used to investigate symptoms, assess structures, plan treatment or monitor known conditions.",
      },
      {
        question: "Who interprets a private MRI scan?",
        answer:
          "The images should be reviewed by a radiologist, who produces a report. Confirm which clinician will explain the result and coordinate any next steps.",
      },
      {
        question: "Is a whole-body scan a complete health check?",
        answer:
          "No. Imaging cannot assess every condition, and broad scanning can produce incidental or uncertain findings. The purpose, limitations and follow-up pathway should be explained before booking.",
      },
    ],
  },
];

export function getLongevityServicePage(slug: string) {
  return longevityServicePages.find((page) => page.slug === slug);
}

function facilitySearchText(facility: LongevityFacility) {
  return [
    facility.name,
    facility.description,
    facility.editorialSummary,
    facility.primaryService,
    facility.clinicModel,
    facility.clinicalOversight,
    ...facility.confirmedDiagnostics,
    ...facility.assessmentFormat,
    ...facility.resultsIncluded,
    ...facility.secondaryServices,
    ...facility.serviceNames,
    ...facility.servicesOffered,
    ...facility.activityCategories,
    ...facility.activityTagsStandardized,
    ...facility.activityDisplayLabels,
    ...facility.themeTagsStandardized,
    ...facility.bestFor,
    ...facility.bestForStandardized,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function hasConfirmedDiagnostic(facility: LongevityFacility, page: LongevityServicePageConfig) {
  const confirmed = facility.confirmedDiagnostics.map((item) => item.toLowerCase());
  return page.diagnosticLabels.some((label) => confirmed.includes(label.toLowerCase()));
}

function serviceVerificationTime(value: string) {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function getFacilitiesForLongevityService(
  facilities: LongevityFacility[],
  page: LongevityServicePageConfig,
) {
  return facilities
    .filter((facility) => {
      if (hasConfirmedDiagnostic(facility, page)) return true;
      if (facility.confirmedDiagnostics.length > 0) return false;

      const searchable = facilitySearchText(facility);
      return page.matchTerms.some((term) => searchable.includes(term.toLowerCase()));
    })
    .sort((a, b) => {
      const verificationDifference = serviceVerificationTime(b.serviceLastVerified) - serviceVerificationTime(a.serviceLastVerified);
      if (verificationDifference !== 0) return verificationDifference;
      return b.profileCompletenessScore - a.profileCompletenessScore;
    });
}
