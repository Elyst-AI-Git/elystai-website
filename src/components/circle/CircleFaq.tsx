import FaqSection, { type Faq } from "@/components/marketing/FaqSection";

const faqs: Faq[] = [
  {
    q: "Is this just another WhatsApp group?",
    a: "No. The Circle is small, paid, and every member is reviewed before they get in. The experience inside is nothing like a free group, no random forwards, no noise, no irrelevant links. Everything that comes into the Circle is deliberate.",
  },
  {
    q: "How much time does this actually take?",
    a: "As much or as little as you want to put in. The Weekly AI Signal takes five minutes to read. The Monthly Catchup is an hour at most. The library is there when you need it. There is no pressure to be active every day, the value is in the quality of what's there, not the volume.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. There is no lock-in. If you decide the Circle is not for you, you can leave. The only thing you cannot take back is your founding rate, if you leave and want to rejoin later, you come back at whatever the current price is.",
  },
  {
    q: "What makes this different from following Elyst AI on social media?",
    a: "Social media is a broadcast. The Circle is a room. What gets shared inside is more specific, more honest, and more useful than anything designed for a public audience, and the people you're in it with are having conversations you won't find anywhere else.",
  },
  {
    q: "I am not very technical. Will I be lost?",
    a: "The Circle is not built for people who already have it figured out, it is built for people who are in the process of figuring it out. You do not need a technical background. You need the intention to actually apply what you learn.",
  },
];

export default function CircleFaq() {
  return <FaqSection faqs={faqs} heading="Questions people ask before applying." />;
}
