/**
 * Case content for /work. Copy follows docs/elyst-case-studies.md. Process
 * only: never an outcome number we cannot verify. Anything still to confirm is
 * left out rather than shown as a placeholder.
 */

export type CaseCategory = "ai-transformation" | "ai-kickstart";

export const CASE_CATEGORIES: Record<CaseCategory, { label: string; eyebrow: string; href: string }> = {
  "ai-transformation": { label: "AI Transformation", eyebrow: "AI TRANSFORMATION", href: "/transformation" },
  "ai-kickstart": { label: "AI Kickstart", eyebrow: "AI KICKSTART", href: "/kickstart" },
};

type Logo = { src: string; alt: string; width: number; height: number };

export type WorkCase = {
  slug: string;
  client: string;
  category: CaseCategory;
  /** ISO country code of the client, used in structured data. */
  country: "IN" | "AE";
  /** Title tag, used as written (already includes the brand). */
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: readonly string[];
  /** Company name as shown on cards. */
  cardName: string;
  /** Short summary used on cards. */
  cardSummary: string;
  subtitle: string;
  /** One line about the client, under the subtitle. */
  description: string;
  asked: string;
  /** Info card rows. Rows still to be confirmed are left out. */
  facts: readonly { label: string; value: string }[];
  steps: readonly { title: string; body: string }[];
  leftWith: readonly string[];
  faqs: readonly { q: string; a: string }[];
  /** Real photos only. */
  photos: readonly { src: string; alt: string }[];
  photoOrientation?: "landscape" | "portrait";
  /** Participant feedback. Real, approved words only. */
  quotes: readonly { text: string; by: string; role?: string }[];
  /** Trimmed logo used on cards and in the case hero. */
  logo: Logo;
  /** Companies shown under the main logo on the case page. */
  groupCompanies?: readonly { name: string; logo?: Logo }[];
};

export const WORK_CASES: readonly WorkCase[] = [
  {
    slug: "nalakath-holdings-ai-content-system",
    client: "Nalakath Holdings",
    category: "ai-transformation",
    country: "IN",
    seoTitle: "Nalakath Holdings AI Content System | Elyst AI Case Study",
    metaDescription:
      "How Elyst AI built an AI content system for Nalakath Holdings' four group companies in Kerala, saving about half the content time.",
    primaryKeyword: "AI content system",
    secondaryKeywords: ["AI transformation case study", "AI for real estate marketing Kerala", "AI social media content for business"],
    cardName: "Nalakath Holdings",
    cardSummary: "An AI content system trained on their best references and run by their own team.",
    subtitle: "An AI content system built to be run with just one member",
    description: "A leading Malappuram group in real estate, resort and construction that needed consistent content creation at ease.",
    asked:
      "A consistent digital presence across four group companies, with AI doing the heavy lifting so content no longer ate up the team's week.",
    facts: [
      { label: "Where", value: "Perinthalmanna, Kerala" },
      { label: "Format", value: "AI Transformation" },
      { label: "Group", value: "Content Team/Entire Team" },
    ],
    steps: [
      { title: "Audit the current process", body: "We sat with the team to map how content was made, who it was for and what it had to achieve." },
      { title: "Study what already works", body: "AI analysed the best-performing content from their chosen references to find what actually lands." },
      { title: "Build the content system", body: "We adapted an AI tool to their business and set it up for all four holdings." },
      { title: "Train the team to run it", body: "The team now drops in an idea and gets optimised posts in several variations." },
    ],
    leftWith: [
      "An AI content system trained on their references' best-performing content.",
      "About half of their content creation time back.",
      "A team trained to run it, plus AI essentials for daily work.",
    ],
    faqs: [
      {
        q: "What is an AI content system?",
        a: "A setup where AI is tuned to a business's goals, audience and best-performing references, so the team can turn a rough idea into ready-to-post content in the right format.",
      },
      {
        q: "How much time did Nalakath Holdings save?",
        a: "The team now gets back about half the time they used to spend creating content for their social media.",
      },
      {
        q: "Does the team need technical skills to use it?",
        a: "No. Elyst AI set the system up and trained the team, who share an idea and choose from the variations it produces.",
      },
    ],
    photos: [
      { src: "/images/work/nalakath-working-session.webp", alt: "Elyst AI setting up the AI content system with the Nalakath Holdings team in Perinthalmanna" },
      { src: "/images/work/nalakath-team.webp", alt: "The Nalakath Holdings team with Elyst AI at the Nalakath Holdings office" },
    ],
    photoOrientation: "portrait",
    quotes: [
      {
        text: "The team got a clear clarity on how to use the AI content system and make full use AI capabilities that make their work easier",
        by: "Mohamed Ashraf Nalakath",
        role: "Chairman",
      },
      {
        text: "My entire team got a good idea on how to adopt the full potential of AI. We really gained a lot of good points from the team",
        by: "Chesin",
        role: "Cluster Head",
      },
      {
        text: "They implemented a system that removes a lot of manual work we had been doing till now",
        by: "Anupama",
        role: "Team Member",
      },
    ],
    logo: { src: "/brands/card/nalakath.webp", alt: "Nalakath Holdings logo", width: 600, height: 517 },
  },
  {
    slug: "arvind-fashions-ai-training",
    client: "Arvind Fashions",
    category: "ai-kickstart",
    country: "IN",
    seoTitle: "Arvind Fashions Corporate AI Training | Elyst AI",
    metaDescription:
      "A full-day, in-person AI training by Elyst AI for about 50 people across Arvind Fashions' design, exporting, finance and marketing teams in Bengaluru.",
    primaryKeyword: "corporate AI training",
    secondaryKeywords: ["AI kickstart", "AI training Bengaluru", "AI workshop for employees", "AI training for fashion and retail teams"],
    cardName: "Arvind Fashions",
    cardSummary: "A full-day AI training that made about 50 people AI-ready in their own functions.",
    subtitle: "A full day of AI training built for their work",
    description: "A leading fashion group in India with teams across design, exporting, finance and marketing.",
    asked:
      "Make employees AI-ready in their own functions, so everyone from assistant managers to senior managers uses AI well in their work.",
    facts: [
      { label: "Where", value: "Bengaluru, Karnataka" },
      { label: "Format", value: "AI Kickstart" },
      { label: "Group", value: "Cross-Function Teams" },
    ],
    steps: [
      { title: "Know each function first", body: "We learned what each team does, and at what level, before shaping the day." },
      { title: "Tailor, don't copy", body: "Examples and tools were chosen for each function, not pasted from a fixed syllabus." },
      { title: "Practise on real work", body: "Live, hands-on activities let people try AI on their own tasks, with room for questions." },
      { title: "Go beyond beginner level", body: "We showed which tools suit each role and how to get professional-grade results." },
    ],
    leftWith: [
      "Results from activities they completed during the session.",
      "Resources on the tools covered and what each is for.",
      "A clear view of where AI fits in their role.",
    ],
    faqs: [
      {
        q: "What does a corporate AI training from Elyst AI include?",
        a: "A full, in-person day tailored to the client's teams, with live hands-on practice, role-specific tools and resources people can reuse afterwards.",
      },
      {
        q: "Which teams at Arvind Fashions took part?",
        a: "About 50 people from design, exporting, finance and marketing, from assistant managers to senior managers.",
      },
      {
        q: "Was the training only for beginners?",
        a: "No. It covered how to use AI tools at a professional, advanced level for each role, not just the basics.",
      },
    ],
    photos: [
      { src: "/images/work/arvind-classroom.webp", alt: "Elyst AI co-founder Fathima Shirin leading a full-day AI training for Arvind Fashions teams in Bengaluru" },
      { src: "/images/work/arvind-group.webp", alt: "Arvind Fashions participants holding their certificates after the full-day AI training in Bengaluru" },
    ],
    photoOrientation: "landscape",
    quotes: [
      {
        text: "We were already exploring ways to use AI in our team, but this session opened up new possibilities and showed us how to put them into practice. We are going back to the team with a clear plan to implement what we learned.",
        by: "Participant from Tommy Hilfiger Team",
      },
      {
        text: "This session changed how I looked at my work and how I used AI, I have lots of ideas in mind right now that I want to try out in my work",
        by: "Participant from Calvin Klein Team",
      },
    ],
    logo: { src: "/brands/card/arvind.webp", alt: "Arvind Fashions logo", width: 700, height: 218 },
  },
  {
    slug: "kalyan-ai-onboarding-system",
    client: "Kalyan Tourism and Travel",
    category: "ai-transformation",
    country: "AE",
    seoTitle: "Kalyan AI Onboarding System | Elyst AI Case Study",
    metaDescription:
      "Elyst AI built an AI onboarding system for Kalyan Tourism and Travel that checks documents and creates reports, replacing hours of manual work.",
    primaryKeyword: "AI onboarding system",
    secondaryKeywords: ["AI transformation case study", "AI document verification", "onboarding automation for travel companies"],
    cardName: "Kalyan Tourism",
    cardSummary: "An AI onboarding system that does document checks and onboarding on its own.",
    subtitle: "An AI onboarding system for faster, error-free onboarding",
    description: "A tourism and travel business whose onboarding depended on one person checking every document by hand.",
    asked:
      "Make onboarding error-proof first, then faster and more efficient, by letting AI handle the document checking and tracking.",
    facts: [
      { label: "Where", value: "Dubai, UAE" },
      { label: "Format", value: "AI Transformation" },
      { label: "Group", value: "Onboarding team" },
    ],
    steps: [
      { title: "Map the manual process", body: "One employee cross-checked every document and ticked each step by hand, taking close to an hour." },
      { title: "Start from their own sheet", body: "AI reads the sheet the team already prepares and sets up each onboarding automatically." },
      { title: "Check and confirm in one place", body: "The checker sees each person's details ready and simply ticks off who has onboarded." },
      { title: "Automate reports and paperwork", body: "AI creates a PDF in their own template and reports who has and hasn't onboarded." },
    ],
    leftWith: [
      "A web app the whole team can use for onboarding.",
      "No more manual line-by-line document cross-checking.",
      "Automatic PDFs and clear reports on who has onboarded.",
    ],
    faqs: [
      {
        q: "What is an AI onboarding system?",
        a: "A tool that uses AI to pull in each person's details, support document verification and track onboarding, so staff confirm rather than re-check everything by hand.",
      },
      {
        q: "What did it replace at Kalyan?",
        a: "A manual process where one employee cross-checked documents and details one by one, taking close to an hour.",
      },
      {
        q: "What does the system produce?",
        a: "A PDF in the company's own template and a report showing who has completed onboarding and who hasn't.",
      },
    ],
    photos: [],
    // TODO(content): add Kalyan's real feedback here. The section stays hidden until then.
    quotes: [],
    logo: { src: "/brands/card/kalyan.webp", alt: "Kalyan Tourism and Travel logo", width: 600, height: 525 },
  },
  {
    slug: "autobahn-ai-training-for-hr",
    client: "Autobahn Corp",
    category: "ai-kickstart",
    country: "IN",
    seoTitle: "Autobahn Corp AI Training for HR Teams | Elyst AI",
    metaDescription:
      "A full-day, hands-on AI training by Elyst AI for about 40 HR professionals across Autobahn Mahindra and Autobahn Trucking in Kochi.",
    primaryKeyword: "AI training for HR teams",
    secondaryKeywords: ["AI kickstart", "corporate AI training Kerala", "AI for HR workshop", "hands-on AI training"],
    cardName: "Autobahn Corp",
    cardSummary: "A full-day AI training for their HR team, built around their actual workflows.",
    subtitle: "A full day of AI training built for their HR team",
    description: "The group behind Autobahn Mahindra and Autobahn Trucking, with HR teams across partnering, hiring and operations.",
    asked:
      "A practical way to bring AI into everyday HR work and make each person's daily tasks easier, not another theory session.",
    facts: [
      { label: "Where", value: "Kochi, Kerala" },
      { label: "Format", value: "AI Kickstart" },
      { label: "Group", value: "HR team" },
    ],
    steps: [
      { title: "Learn each team's workflow", body: "We mapped how HR business partners, talent acquisition and HR operations each work day to day." },
      { title: "Tailor it to every team", body: "Each part was built around that team's work and level, not one deck reused for all." },
      { title: "Practise it live", body: "Everyone worked through the activities in the room and left with real results." },
      { title: "Build their own AI assistant", body: "Participants learned how AI actually works, then built an assistant for their own role." },
    ],
    leftWith: [
      "A hands-on view of where AI helps in HR work.",
      "Prompts and a guide to which tool to use, and why.",
      "Presentations that took about an hour now done in around five minutes.",
    ],
    faqs: [
      {
        q: "What is an AI kickstart training?",
        a: "A hands-on session that gets a team using AI in its own daily work on day one, built around their real tasks rather than a fixed syllabus.",
      },
      {
        q: "How can HR teams use AI?",
        a: "At Autobahn, HR teams used AI for presentations, recruitment and HR operations tasks, and built personal AI assistants for their roles.",
      },
      {
        q: "Who attended the training?",
        a: "About 40 people from three HR teams: HR business partners, talent acquisition and HR operations.",
      },
    ],
    photos: [
      { src: "/images/work/autobahn-training-room.webp", alt: "Elyst AI leading a hands-on AI training for HR teams at Autobahn Corp in Kochi" },
      { src: "/images/work/autobahn-group.webp", alt: "The Autobahn Corp HR teams with Elyst AI after the full-day AI training in Kochi" },
    ],
    photoOrientation: "landscape",
    quotes: [
      {
        text: "We had been looking for the right AI training for our team for the last 6 months and did not find an apt fit. This program understood our team’s level and delivered training that fit, really satisfied with the output",
        by: "Minesh",
        role: "HR Head",
      },
      {
        text: "Attending the AI training made me realise the potential of different AI tools in day to day office tasks and in personal life too.",
        by: "Ejas",
        role: "HR",
      },
      {
        text: "A section with lot of impressive AI knowledge sharing. Will highly recommended.",
        by: "Lavan",
        role: "HR Manager",
      },
    ],
    logo: { src: "/brands/card/autobahn-corp.webp", alt: "Autobahn Corp logo", width: 700, height: 355 },
    groupCompanies: [
      { name: "Autobahn Mahindra", logo: { src: "/brands/card/autobahn-mahindra.webp", alt: "Autobahn Mahindra logo", width: 700, height: 355 } },
      { name: "Autobahn Trucking", logo: { src: "/brands/card/autobahn-trucking.webp", alt: "Autobahn Trucking logo", width: 700, height: 357 } },
    ],
  },
] as const;

export function getWorkCase(slug: string): WorkCase | undefined {
  return WORK_CASES.find((item) => item.slug === slug);
}
