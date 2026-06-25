"use client";

import { SectionMark } from "@/components/ui/section-mark";

/**
 * Social Proof — three columns of quote cards in constant vertical motion
 * (opposite directions per column), a different shape/rhythm from the
 * Accelerator page's polygon stagger carousel so the two pages don't read
 * as the same component restyled.
 */

const testimonials = [
  { quote: "AI Yathra broke my brain in 48 hours. If you're curious about AI but don't know where to start, I highly recommend keeping an eye out for their next event.", name: "Rahima SV", program: "AI Yathra 2.0" },
  { quote: "What genuinely stood out to me was the mindset of the Elyst AI team, making sure people actually understand how to use them in both their personal and professional lives.", name: "Shaheen Raheem", program: "Elyst AI Circle" },
  { quote: "That was a really engaging and insightful session. I picked up quite a few valuable takeaways. Looking forward to attending more sessions and courses from your team.", name: "Basila Fathima", program: "Elyst AI Circle" },
  { quote: "Shirin and Nihal didn't just teach Gen AI, automations & AI tools. They guided us how to think, how to approach learning. It didn't feel like a webinar at all.", name: "Rohit P", program: "Elyst AI Circle" },
  { quote: "It was such a great session, where we could clarify all our doubts and learn new things and unlearn old ones.", name: "Shiju Roy", program: "Elyst AI Circle" },
  { quote: "The hands-on approach of showing each thing practically, showing how each tool actually works, made the sessions very effective. Looking forward to what's next.", name: "Muhammed Sinan B", program: "AI Yathra" },
  { quote: "The session made Claude feel much easier to explore and actually use in day-to-day work. Nihal did an amazing job taking us through each part patiently.", name: "Adeela Thasneem", program: "Elyst AI Circle" },
  { quote: "Big shoutout to the Elyst AI team. Your passion to deliver value was obvious throughout the journey. Expecting more sessions like this!", name: "Muhammed Rasil N", program: "AI Yathra" },
  { quote: "I think my son got an idea about the language of the future. Prompt creation and web design using AI are so interesting for students.", name: "Anusha", program: "AI for Juniors Parent" },
];

const columns = [
  testimonials.slice(0, 3),
  testimonials.slice(3, 6),
  testimonials.slice(6, 9),
];

function QuoteCard({ t, tint }: { t: (typeof testimonials)[number]; tint: boolean }) {
  return (
    <div
      className="flex flex-col gap-4 rounded-2xl border-[3px] p-6"
      style={{ background: tint ? "#c2edcb" : "#ffffff", borderColor: "var(--elyst-emerald)" }}
    >
      <p className="text-fg" style={{ fontSize: "var(--text-small)", lineHeight: 1.55 }}>
        &ldquo;{t.quote}&rdquo;
      </p>
      <div>
        <p className="font-display font-bold text-fg" style={{ fontSize: "var(--text-small)" }}>
          {t.name}
        </p>
        <p className="text-fg-3" style={{ fontSize: "var(--text-label)" }}>
          {t.program}
        </p>
      </div>
    </div>
  );
}

function Column({ items, duration, reverse, tintOffset }: { items: typeof testimonials; duration: number; reverse?: boolean; tintOffset: number }) {
  return (
    <div className="relative h-[560px] overflow-hidden rounded-2xl [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
      <div
        className="afw-testi-track flex flex-col gap-5"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {[...items, ...items].map((t, i) => (
          <QuoteCard key={`${t.name}-${i}`} t={t} tint={(i + tintOffset) % 2 === 0} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-bg overflow-hidden" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <style>{`
        @keyframes afw-testi-scroll { from { transform: translateY(0); } to { transform: translateY(-50%); } }
        .afw-testi-track { animation-name: afw-testi-scroll; animation-timing-function: linear; animation-iteration-count: infinite; }
        @media (prefers-reduced-motion: reduce) { .afw-testi-track { animation: none; } }
      `}</style>

      <div className="mx-auto max-w-2xl text-center">
        <SectionMark>What people say</SectionMark>
        <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
          People who took the leap.
        </h2>
      </div>

      <div className="mx-auto mt-12 hidden max-w-5xl grid-cols-3 gap-5 md:grid">
        <Column items={columns[0]} duration={26} tintOffset={0} />
        <Column items={columns[1]} duration={32} reverse tintOffset={1} />
        <Column items={columns[2]} duration={28} tintOffset={0} />
      </div>

      {/* Single column on mobile, same motion */}
      <div className="mx-auto mt-12 max-w-md md:hidden">
        <Column items={testimonials.slice(0, 4)} duration={30} tintOffset={0} />
      </div>
    </section>
  );
}
