import { ChevronDownIcon } from "lucide-react";
import { SectionMark } from "@/components/ui/section-mark";

export type Faq = { q: string; a: string };

export default function FaqSection({
  faqs,
  heading,
  variant = "accordion",
}: {
  faqs: readonly Faq[];
  heading: string;
  /** "chat" reads like a conversation: question left, answer right. */
  variant?: "accordion" | "chat";
}) {
  return (
    <section
      className="relative overflow-hidden bg-surface-dark"
      style={{ padding: "clamp(56px, 7vw, 96px) var(--section-px)" }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-[var(--section-px)] right-[var(--section-px)] border-x border-white/10" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <header className="mx-auto max-w-4xl text-center">
          <SectionMark tone="dark">FAQ</SectionMark>
          <h2 className="mx-auto mt-6 max-w-4xl text-balance text-fg-on-dark" style={{ fontSize: "var(--text-h2)" }}>
            {heading}
          </h2>
        </header>

        {variant === "chat" ? (
          <div className="mx-auto mt-10 grid max-w-3xl gap-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="grid gap-3">
                <p className="max-w-[85%] justify-self-start rounded-md rounded-bl-none border border-white/15 bg-white/[0.05] px-4 py-3 font-display font-bold text-fg-on-dark sm:max-w-[70%]" style={{ fontSize: "var(--text-small)", lineHeight: 1.3 }}>
                  {faq.q}
                </p>
                <p className="max-w-[85%] justify-self-end rounded-md rounded-br-none bg-green px-4 py-3 text-[#06140e] sm:max-w-[70%]" style={{ fontSize: "var(--text-small)", lineHeight: 1.45 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        ) : (
        <div className="mx-auto mt-10 max-w-4xl border-y border-white/10">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group border-b border-white/10 last:border-b-0 open:bg-white/[0.025]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 text-left text-fg-on-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green sm:px-7 [&::-webkit-details-marker]:hidden">
                <span
                  className="font-display font-bold group-open:text-green"
                  style={{ fontSize: "var(--text-body)" }}
                >
                  {faq.q}
                </span>
                <ChevronDownIcon
                  aria-hidden
                  className="size-5 shrink-0 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                />
              </summary>
              <p
                className="max-w-3xl px-5 pb-5 text-fg-muted-dark sm:px-7"
                style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}
              >
                {faq.a}
              </p>
            </details>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}
