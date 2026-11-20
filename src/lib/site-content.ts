/**
 * Shared copy for the Elyst AI site. Keeping it in one place means Home,
 * AI Transformation and AI Kickstart always say the same thing.
 */

export const ONE_LINER =
  "We find the work AI can do for you, build it, and train your people to use it.";

export const CONTACT = {
  phone: "+91 96332 88931",
  phoneHref: "tel:+919633288931",
  email: "info@elystai.com",
  whatsappHref: "https://wa.me/919633288931",
  linkedinHref: "https://www.linkedin.com/company/elystai/",
  instagramHref: "https://www.instagram.com/elyst.ai/",
  place: "Kozhikode, Kerala",
  reach: "Working across India and the GCC",
} as const;

export const NUMBERS = [
  { value: "3,000+", label: "People trained" },
  { value: "75+", label: "Sessions" },
  { value: "15+", label: "Businesses" },
] as const;

export const AI_SYSTEM_DEFINITION = {
  heading: "Your team, with an AI system",
  body: "An AI system does the repeat work.",
  jobs: [
    "Drafting the first reply to an enquiry",
    "Preparing the weekly report",
    "Sending the follow-up nobody remembers",
  ],
  smallPrint: "Examples. We start with the work your team actually repeats.",
} as const;

export type TransformationStep = {
  n: string;
  /** Short title, as used on the home page. */
  title: string;
  /** One line for the home page. */
  line: string;
  /** What we do, for the full process on /transformation. */
  doing: string;
  /** What the client gets, for the full process on /transformation. */
  get: string;
};

export const TRANSFORMATION_STEPS: readonly TransformationStep[] = [
  {
    n: "01",
    title: "We start with you",
    line: "We understand how the business runs today.",
    doing: "A conversation with you, the founder, about how the business runs and where time goes.",
    get: "A first idea of what to set up and build.",
  },
  {
    n: "02",
    title: "A proposal",
    line: "Scope and likely cost before any work begins.",
    doing: "We write up the scope and the likely cost.",
    get: "A clear proposal before any work begins.",
  },
  {
    n: "03",
    title: "We sit with the team",
    line: "You get a map of how work moves now.",
    doing: "Once you confirm, we see how the work is really done, team by team.",
    get: "A map of how work moves through your business.",
  },
  {
    n: "04",
    title: "We find where AI fits",
    line: "Where an AI system can do the manual work.",
    doing: "We mark the time-consuming work an AI system can take.",
    get: "A plan: what to build, and what your people do with the time back.",
  },
  {
    n: "05",
    title: "We build and test",
    line: "You choose what to build, we build that.",
    doing: "You choose from the plan. We build, then test on real work.",
    get: "Working AI systems, with data access agreed in writing.",
  },
  {
    n: "06",
    title: "We train your team",
    line: "Your team excels with the AI system built.",
    doing: "We train the team and one or two internal champions.",
    get: "A trained team, a runbook, champions who bring the rest along.",
  },
] as const;

// Draft copy: owner to approve. Answers are written to be quoted on their own
// (search snippets, AI assistants), so each one names the subject first.
export const HOME_FAQS = [
  {
    q: "How long does it take?",
    a: "It depends on what you choose to build. After the first conversation and the team visit, the proposal sets out the scope and timeline for each AI system, so you know how long it takes before any work begins.",
  },
  {
    q: "How much does it cost?",
    a: "AI Transformation is priced per project. You get a price range after the first conversation, and a clear proposal with the scope and likely cost before any work begins. AI Kickstart is quoted per team.",
  },
  {
    q: "Do we need technical staff?",
    a: "No. Elyst AI builds and tests the AI system, then trains your team and one or two internal AI champions to run it. Your people need to know the work, not the technology.",
  },
  {
    q: "Who owns the system?",
    a: "Your business does. Accounts and admin move to you at handover, so there is no lock-in to Elyst AI.",
  },
  {
    q: "What if AI is not the answer?",
    a: "We tell you. If AI is not the right fix for a task, we explain why after we understand the work, before you spend on a build.",
  },
  {
    q: "Do you work outside Kerala?",
    a: "Yes. Elyst AI works with businesses across India and the GCC. Training is delivered in person in Kerala, Bengaluru and the UAE, and online when location is an issue.",
  },
  {
    q: "Can we start with training?",
    a: "Yes. Many teams start with AI Kickstart, a one-day or two half-day AI training built on their own work, and move to AI Transformation when they find work worth building.",
  },
  {
    q: "What industries do you work with?",
    a: "Elyst AI has worked with teams in real estate, fashion and retail, travel and tourism, and automotive. See the case studies for Nalakath Holdings, Arvind Fashions, Kalyan Tourism and Autobahn Corp.",
  },
] as const;

export const TRANSFORMATION_FAQS = [
  {
    q: "What is AI Transformation?",
    a: "AI Transformation is Elyst AI's six-step service for growing businesses. We find the work AI can do for you, build an AI system around how your team works, test it on real work, and train your people to use it.",
  },
  {
    q: "Who is it for?",
    a: "Growing businesses where a specific task costs time or leads, one person owns the change, and the team is roughly 10 to 30 people.",
  },
  {
    q: "What is an AI system?",
    a: "An AI system is software built around one repeat task in your business, such as drafting replies, checking documents or preparing reports. It does the repeat work, and your team checks the result and decides.",
  },
  ...HOME_FAQS,
  {
    q: "What data do you need?",
    a: "Only what the workflow needs, agreed in writing before the build starts.",
  },
  {
    q: "What support is included?",
    a: "An agreed support period, set out in the proposal.",
  },
] as const;
