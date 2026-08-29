import MarkDither from "@/components/site/MarkDither";
import type { CtaIntent } from "@/components/marketing/TrackedCta";
import TrackedCta from "@/components/marketing/TrackedCta";
import { CometCard } from "@/components/ui/comet-card";
import { SectionMark } from "@/components/ui/section-mark";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  cta?: {
    label: string;
    intent: CtaIntent;
  };
};

export default function PageHero({ eyebrow, title, description, cta }: PageHeroProps) {
  return (
    <section style={{ padding: "clamp(40px, 5vw, 72px) var(--section-px)" }}>
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[3fr_2fr]">
        <div>
          {eyebrow && <SectionMark>{eyebrow}</SectionMark>}
          <h1 className={eyebrow ? "mt-6 text-fg" : "text-fg"} style={{ fontSize: "var(--text-hero)", lineHeight: 1.08 }}>
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-md text-fg-2 md:max-w-none" style={{ fontSize: "calc(var(--text-body) + 2px)", lineHeight: 1.5 }}>
              {description}
            </p>
          )}
          {cta && (
            <div className="mt-8">
              <TrackedCta label={cta.label} intent={cta.intent} tone="green" />
            </div>
          )}
        </div>

        <CometCard className="hidden self-stretch md:block">
          <div className="overflow-hidden rounded-card" style={{ background: "#F5F8F6", height: "480px" }}>
            <MarkDither colorFront="#03624C" colorBack="#F5F8F6" />
          </div>
        </CometCard>

        <CometCard className="md:hidden">
          <div className="h-[211px] overflow-hidden rounded-card" style={{ background: "#F5F8F6" }}>
            <MarkDither colorFront="#03624C" colorBack="#F5F8F6" pixelSize={4} />
          </div>
        </CometCard>
      </div>
    </section>
  );
}
