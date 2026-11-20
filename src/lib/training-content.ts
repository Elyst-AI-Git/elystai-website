export type TrainingFaq = {
  q: string;
  a: string;
};

export const trainingFaqs: readonly TrainingFaq[] = [
  {
    q: "What is AI Kickstart?",
    a: "AI Kickstart is hands-on AI training from Elyst AI, built on your team's own work. It runs as one day or two half days, in person in Kerala, Bengaluru and the UAE, or online.",
  },
  {
    q: "Who is it for?",
    a: "Functional teams, managers, department heads and business leaders. HR and L&D teams can also use it as part of a wider AI-adoption effort.",
  },
  {
    q: "Is the training tailored to each team?",
    a: "Yes. Every participant fills in a short form, and we speak with the team lead about roles, tools and tasks before the day. It is not a fixed presentation delivered unchanged to every company.",
  },
  {
    q: "Is it delivered in person?",
    a: "Yes, in person, in Kerala, Bengaluru and the UAE. If location is an issue, we can run it online too.",
  },
  {
    q: "What formats are available?",
    a: "One day, or two half days. Longer programs are available on request.",
  },
  {
    q: "Can a session be tailored to one department or team?",
    a: "Yes. We shape the session around the department after we understand its roles, tools and tasks.",
  },
  {
    q: "How much does it cost?",
    a: "It is quoted per team, because the format and audience differ. Get in touch and we will scope it with you.",
  },
  {
    q: "Are training and AI Transformation the same service?",
    a: "No. Kickstart trains your team. AI Transformation finds the work AI can do, builds it, and trains your people. If the day reveals work worth building, we can look at it separately.",
  },
  {
    q: "How do we start?",
    a: "Get in touch. We will ask about your team, the work they repeat, and the format that suits you.",
  },
] as const;

export const trainingFormats = [
  {
    id: "full-day",
    title: "One day",
    description:
      "A full day of training tailored to your team's essentials.",
  },
  {
    id: "half-day",
    title: "Two half days",
    description:
      "The same programme split across two shorter sessions.",
  },
  {
    id: "multi-session",
    title: "Longer program",
    description:
      "On request, for teams that want to stay updated on AI.",
  },
] as const;
