"use client";

import DisplayCards from "@/components/ui/display-cards";
import { SectionMark } from "@/components/ui/section-mark";
import { IconMessage, IconUnderstand, IconAct, IconTile } from "@/components/ui/icons";

// Navbar-matching dark-green metal gradient
const DARK_CARD_BG =
  "[background:linear-gradient(180deg,hsl(160_38%_12%)_0%,hsl(160_38%_8%)_55%,hsl(160_38%_11%)_100%)]";
const DARK_BORDER = "border-white/[0.09]";

// Transparent tile wrapper (IconTile handles its own bg)
const TILE = "!p-0 !rounded-md !bg-transparent";

const stepCards = [
  {
    icon: (
      <IconTile tone="lightgrey">
        <IconMessage size={24} variant="line" />
      </IconTile>
    ),
    title: "Message",
    description: "Message it like a colleague using WhatsApp or Telegram your team already use.",
    date: "Step 1",
    iconClassName: TILE,
    titleClassName: "text-green [font-size:clamp(1.5rem,2.2vw,1.8rem)]",
    descriptionClassName: "leading-snug text-fg-muted-dark [font-size:clamp(1.25rem,1.8vw,1.5rem)]",
    dateClassName: "font-semibold uppercase tracking-wide text-fg-muted-dark [font-size:clamp(0.88rem,1.05vw,0.98rem)]",
    className: [
      "[grid-area:stack]",
      "hover:-translate-y-16 hover:scale-[1.08] hover:z-30",
      "before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-white/10 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-black/30",
      "hover:before:opacity-0 before:transition-opacity before:duration-700",
      "before:left-0 before:top-0",
      DARK_CARD_BG,
      DARK_BORDER,
    ].join(" "),
  },
  {
    icon: (
      <IconTile tone="lightgrey">
        <IconUnderstand size={24} variant="line" />
      </IconTile>
    ),
    title: "Understands",
    description: "It reads the team's documents, data, tools. Not just the open internet.",
    date: "Step 2",
    iconClassName: TILE,
    titleClassName: "text-green [font-size:clamp(1.5rem,2.2vw,1.8rem)]",
    descriptionClassName: "leading-snug text-fg-muted-dark [font-size:clamp(1.25rem,1.8vw,1.5rem)]",
    dateClassName: "font-semibold uppercase tracking-wide text-fg-muted-dark [font-size:clamp(0.88rem,1.05vw,0.98rem)]",
    className: [
      "[grid-area:stack] translate-x-14 translate-y-14",
      "hover:-translate-y-2 hover:scale-[1.08] hover:z-30",
      "before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-white/10 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-black/30",
      "hover:before:opacity-0 before:transition-opacity before:duration-700",
      "before:left-0 before:top-0",
      DARK_CARD_BG,
      DARK_BORDER,
    ].join(" "),
  },
  {
    icon: (
      <IconTile tone="lightgrey">
        <IconAct size={24} variant="line" />
      </IconTile>
    ),
    title: "Acts",
    description: "It answers and completes the tasks you gave it based on how your team already operate.",
    date: "Step 3",
    iconClassName: TILE,
    titleClassName: "text-green [font-size:clamp(1.5rem,2.2vw,1.8rem)]",
    descriptionClassName: "leading-snug text-fg-muted-dark [font-size:clamp(1.25rem,1.8vw,1.5rem)]",
    dateClassName: "font-semibold uppercase tracking-wide text-fg-muted-dark [font-size:clamp(0.88rem,1.05vw,0.98rem)]",
    className: [
      "[grid-area:stack] translate-x-28 translate-y-28",
      "hover:translate-y-6 hover:scale-[1.08] hover:z-30",
      DARK_CARD_BG,
      DARK_BORDER,
    ].join(" "),
  },
];

export default function AiosHowItWorks() {
  return (
    <section
      className="bg-bg"
      style={{ paddingTop: "var(--section-py)", paddingBottom: "calc(var(--section-py) * 0.82)", paddingLeft: "var(--section-px)", paddingRight: "var(--section-px)" }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <SectionMark>How AIOS works</SectionMark>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            One message. It knows what to do.
          </h2>
        </div>

        {/* Stacked display cards — hover any card to bring it forward. */}
        <div className="mt-2 flex min-h-[340px] w-full items-center justify-center sm:min-h-[440px] md:mt-6 md:min-h-[520px]">
          <div className="origin-center scale-[0.52] sm:scale-[0.74] md:scale-100">
            <DisplayCards cards={stepCards} />
          </div>
        </div>

        {/* Contrast line */}
        <div className="mx-auto mt-10 max-w-2xl text-center md:mt-12">
          <p
            className="text-fg"
            style={{ fontSize: "clamp(1.55rem, 2.4vw, 2rem)", fontWeight: 700, lineHeight: 1.2 }}
          >
            ChatGPT knows the internet.
            <br />
            <span style={{ color: "var(--elyst-emerald)" }}>
              AIOS knows <em>your business</em>.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
