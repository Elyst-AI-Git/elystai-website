import { Card } from "@/components/ui/card";
import { SectionMark } from "@/components/ui/section-mark";
import { Briefcase, Rocket } from "lucide-react";

/**
 * "Who it's for" — two audience cards so each visitor can see themselves in the
 * program. Plain static cards, no branch connector or scroll animation.
 */

const audiences = [
  {
    icon: Briefcase,
    title: "Get Ahead at Work",
    body: "For professionals aiming for an edge in their career.",
  },
  {
    icon: Rocket,
    title: "Grow Your Business",
    body: "For founders using AI to save time and money.",
  },
];

export default function WhoItsFor() {
  return (
    <section style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <SectionMark>Who it&rsquo;s for</SectionMark>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            Built for people who do the work.
          </h2>
          <p className="mt-4 text-fg-2" style={{ fontSize: "var(--text-body)" }}>
            A practical, high-value choice if you&rsquo;d rather use AI than read
            about it.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {audiences.map((a) => (
            <Card key={a.title} className="h-full rounded-[20px] bg-white p-8 shadow-card">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/8 text-emerald">
                <a.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display font-bold text-fg" style={{ fontSize: "var(--text-h3)" }}>
                {a.title}
              </h3>
              <p className="mt-2 text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.6 }}>
                {a.body}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
