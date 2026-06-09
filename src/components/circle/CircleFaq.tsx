import { SectionMark } from "@/components/ui/section-mark";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Faq = { q: string; a: string };

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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function CircleFaq() {
  return (
    <section className="bg-bg" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-3xl">
        <div className="mx-auto max-w-2xl text-center">
          <SectionMark>FAQ</SectionMark>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            Questions people ask before applying.
          </h2>
        </div>

        <div className="mt-12">
          <Accordion>
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q} style={{ borderColor: "var(--border)" }}>
                <AccordionTrigger className="py-5">
                  <span className="font-semibold text-fg" style={{ fontSize: "var(--text-body)" }}>
                    {f.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-fg-2" style={{ fontSize: "clamp(1.05rem, 1.3vw, 1.15rem)", lineHeight: 1.65 }}>
                    {f.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
