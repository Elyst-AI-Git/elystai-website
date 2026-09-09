export type TrainingFaq = {
  q: string;
  a: string;
};

export const trainingFaqs: readonly TrainingFaq[] = [
  {
    q: "What is corporate AI training?",
    a: "Corporate AI training helps employees understand and apply AI within a workplace context. Elyst AI tailors each session around the organisation, the participating teams and their needs.",
  },
  {
    q: "Who is corporate AI training for?",
    a: "Sessions can be designed for functional teams, managers, department heads and business leaders. HR and L&D teams can also use the programme as part of a wider organisational AI-adoption initiative.",
  },
  {
    q: "Is the training tailored to each organisation?",
    a: "Yes. Elyst AI first understands the organisation and audience, then shapes the session around their needs. It is not a fixed presentation delivered unchanged to every company.",
  },
  {
    q: "Is corporate AI training delivered in person?",
    a: "Yes. Most corporate training offers delivered now are in person.",
  },
  {
    q: "What training formats are available?",
    a: "Elyst AI offers half-day workshops, full-day workshops and multi-session programmes. The appropriate format depends on the audience, requirements and intended depth.",
  },
  {
    q: "Where does Elyst AI deliver corporate AI training?",
    a: "Elyst AI is available for in-person sessions across Kerala, Bengaluru, the UAE, Saudi Arabia and Qatar.",
  },
  {
    q: "Can a session be tailored to one department or team?",
    a: "Yes. A session can be shaped around a particular department or team after Elyst AI understands its context and requirements.",
  },
  {
    q: "How is corporate AI training priced?",
    a: "Training is priced per client because the format, audience and level of customisation differ between organisations. Contact Elyst AI using the existing call or WhatsApp option for a scoped quote.",
  },
  {
    q: "What is the difference between a half-day and full-day workshop?",
    a: "A half-day workshop suits a focused requirement. A full-day workshop allows more time for participation and contextual application. Elyst AI recommends a format after understanding the team.",
  },
  {
    q: "Is this a generic AI presentation?",
    a: "No. The programme is designed around the organisation and audience. The goal is practical understanding within a relevant workplace context, not a generic technology presentation.",
  },
  {
    q: "Are training and implementation the same service?",
    a: "Training and implementation are separate services. If the session reveals a workflow that could benefit from implementation, Elyst AI can assess it separately without implying that every training engagement requires a technology project.",
  },
  {
    q: "How do we start a corporate AI training programme?",
    a: "Use the existing phone or WhatsApp option on the website. Elyst AI will first understand the organisation, audience and preferred format.",
  },
] as const;

export const trainingFormats = [
  {
    id: "half-day",
    title: "Half-day\nworkshop",
    description:
      "A hyper focused programme for a defined team requirement or practical introduction.",
  },
  {
    id: "full-day",
    title: "Full-day\nworkshop",
    description:
      "A more involved programme with additional time for participation, guided application and questions.",
  },
  {
    id: "multi-session",
    title: "Multi-day\nprogram",
    description:
      "A programme for teams that want to build capability over time rather than treat AI training as a one-time.",
  },
] as const;

export const arvindAdditionalFeedback = {
  quote: "Really helpful session, got a lot of clarity on how to implement these in my work.",
  attribution: "Participant from the session",
} as const;

export const autobahnFeedback = [
  {
    quote:
      "Attending the AI training made me realise the potential of different AI tools in day to day office tasks and in personal life too.",
    attribution: "Ejas",
    role: "HR",
  },
  {
    quote: "A section with lot of impressive AI knowledge sharing. Will highly recommended.",
    attribution: "Lavan",
    role: "HR Manager",
  },
] as const;

export const arvindFaqs: readonly TrainingFaq[] = [
  {
    q: "What programme did Elyst AI deliver for Arvind Fashions?",
    a: "Elyst AI delivered a tailored, full-day, in-person corporate AI training programme.",
  },
  {
    q: "How many people attended?",
    a: "The programme included 35 professionals from Arvind Fashions.",
  },
  {
    q: "Who participated in the programme?",
    a: "Participants ranged from assistant managers to senior managers across design, marketing, customer service and operations.",
  },
  {
    q: "Where was the programme delivered?",
    a: "The programme was delivered in Bengaluru in August.",
  },
  {
    q: "Was this a standard training programme?",
    a: "No. It was tailored around Arvind Fashions and its cross-functional audience.",
  },
  {
    q: "Can Elyst AI design a similar programme for another organisation?",
    a: "Yes. Elyst AI designs half-day, full-day and multi-session programmes around each organisation’s audience and requirements.",
  },
] as const;

export const autobahnFaqs: readonly TrainingFaq[] = [
  {
    q: "What programme did Elyst AI deliver for Autobahn Group?",
    a: "Elyst AI delivered a tailored, full-day, in-person corporate AI training programme for the HR function.",
  },
  {
    q: "How many people attended?",
    a: "The programme included 40 HR professionals.",
  },
  {
    q: "Who participated?",
    a: "Participants ranged from HR team members to the HR lead.",
  },
  {
    q: "Where was the programme delivered?",
    a: "The programme was delivered in Kochi in September.",
  },
  {
    q: "Was the programme designed only for HR?",
    a: "Yes. The engagement was created specifically for Autobahn Group’s HR function.",
  },
  {
    q: "Can Elyst AI design corporate AI training for another HR team?",
    a: "Yes. Elyst AI can tailor a half-day, full-day or multi-session programme around an organisation’s HR or L&D team.",
  },
  {
    q: "Does Elyst AI offer training outside Kochi?",
    a: "Yes. In-person programmes are available across Kerala, Bengaluru, the UAE, Saudi Arabia and Qatar.",
  },
] as const;
