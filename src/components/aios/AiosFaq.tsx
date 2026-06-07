import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * The page's single biggest AEO/GEO citation asset (NOTES.md). CRITICAL:
 * every answer must exist in the server-rendered initial HTML — this file
 * is intentionally a server component (no "use client"); base-ui's
 * Accordion.Panel keeps its children mounted in the DOM and only animates
 * height/visibility, so nothing here is lazy-rendered or JS-gated. The
 * FAQPage JSON-LD below mirrors the visible copy exactly, word for word.
 *
 * Items marked [confirm] echo NOTES.md's bracketed facts — Claude Code
 * drafted plausible, conservative wording; Nihal must verify these are
 * literally true before launch (data handling, setup timeline, Arabic/GCC
 * support). Nothing here is invented as a hard guarantee.
 */

type Faq = { q: string; a: string };

const faqs: Faq[] = [
  {
    q: "Do we need any technical skills to use AIOS?",
    a: "No. Your team keeps using WhatsApp or Telegram exactly as they do today — there's nothing new to install or learn. Elyst configures, deploys, and runs everything on your behalf, so the only skill required is sending a message.",
  },
  {
    q: "What if our team only uses WhatsApp?",
    a: "That's exactly the point. AIOS lives inside the WhatsApp or Telegram your team already has open all day — it isn't a separate app or dashboard they have to remember to check. If they can message a colleague, they can use AIOS.",
  },
  {
    q: "How is this different from just using ChatGPT?",
    a: "A generic chatbot doesn't know your business and can't act inside it. AIOS is configured to read your own documents, data, and tools — so it answers from what's actually true for your company, and goes further by drafting documents, sending briefings, and routing the result to the right person.",
  },
  {
    q: "Is our data secure — where does it live?",
    a: "Your information is kept in access-controlled systems configured specifically for your business, and only the people you authorise can see it — role by role, not all-or-nothing. [confirm] We're finalising the exact data-handling specifics for publication here; ask us directly on the call and we'll walk you through precisely how your data is stored and protected.",
  },
  {
    q: "How long does setup take?",
    a: "It runs in three short stages — discovery, configuration, and deployment — and most of the time goes into the first two, getting AIOS to genuinely match how your business works. [confirm] We'll give you a concrete timeline for your specific setup on the discovery call, rather than a generic estimate that may not hold for your business.",
  },
  {
    q: "What does AIOS cost?",
    a: "AIOS is a configured service, not an off-the-shelf product, so pricing is custom to your business. It's structured around a one-time setup, a monthly retainer that scales with the modules you run, and an optional AI-tools training add-on — with no published price list, because every quote is tailored on a call.",
  },
  {
    q: "Can AIOS work in the GCC, or in Arabic?",
    a: "Yes — AIOS is built with India and the GCC in mind, and configuration can include Arabic-language support where your business needs it. [confirm] Exact language coverage depends on your setup, so tell us what your team and customers need and we'll confirm what's possible for you on the call.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function AiosFaq() {
  return (
    <section className="bg-bg" style={{ padding: "var(--section-py) var(--section-px)" }}>
      {/* FAQPage schema — mirrors the visible Q&A copy exactly */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-3xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip">FAQ</span>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            Questions teams ask before they start.
          </h2>
        </div>

        <div className="mt-12">
          <Accordion>
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q} style={{ borderColor: "var(--border)" }}>
                <AccordionTrigger className="py-5">
                  <span
                    className="font-semibold text-fg"
                    style={{ fontSize: "var(--text-body)" }}
                  >
                    {f.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p
                    className="text-fg-2"
                    style={{ fontSize: "var(--text-small)", lineHeight: 1.65 }}
                  >
                    {f.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <p className="mt-10 text-center text-fg-3" style={{ fontSize: "var(--text-small)" }}>
          Still have a question? Ask us on the call.
        </p>
      </div>
    </section>
  );
}
