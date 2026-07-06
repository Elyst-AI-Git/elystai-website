import Image from "next/image";
import { BrandButton } from "@/components/ui/brand-button";
import { SectionMark } from "@/components/ui/section-mark";

const WEBINAR_FORM_URL = "https://forms.gle/tkKsMLGt7pngjkPD8";
const WEBINAR_TIME = "8:00 – 9:00 PM · Thursday · Free · Online";

export default function WebinarStrip() {
  return (
    <section
      aria-label="Free webinar"
      style={{
        background: "var(--surface-dark)",
        padding: "var(--section-py) var(--section-px)",
      }}
    >
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center gap-10 md:gap-16">

        {/* Poster image */}
        <div
          className="shrink-0 rounded-2xl overflow-hidden shadow-lg"
          style={{ width: "clamp(180px, 22vw, 260px)", aspectRatio: "4 / 5" }}
        >
          <Image
            src="/images/ai-for-work/webinar-poster.png"
            alt="Welcome to the AI ERA — Free webinar with Fathima Shirin P"
            width={520}
            height={650}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Copy + CTA */}
        <div className="flex flex-col gap-4 text-center sm:text-left">
          <div className="flex justify-center sm:justify-start">
            <SectionMark tone="dark">Free Webinar</SectionMark>
          </div>

          <h2
            className="font-display font-bold"
            style={{ fontSize: "var(--text-h2)", color: "var(--fg-on-dark)", lineHeight: 1.1 }}
          >
            Still not sure?
            <br />
            Start here!
          </h2>

          <p
            style={{
              fontSize: "var(--text-body)",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.6,
              maxWidth: "46ch",
            }}
          >
            Join us live this Thursday for a free session. We will walk you through where AI is right now and where to begin.
          </p>

          <p
            className="font-bold"
            style={{ fontSize: "var(--text-label)", color: "var(--elyst-green)", letterSpacing: "0.04em" }}
          >
            {WEBINAR_TIME}
          </p>

          <div className="mt-1">
            <BrandButton href={WEBINAR_FORM_URL} variant="solid" tone="green">
              Reserve your free spot
            </BrandButton>
          </div>
        </div>
      </div>
    </section>
  );
}
