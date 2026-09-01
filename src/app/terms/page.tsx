import { pageMeta } from "@/lib/seo";

export const metadata = {
  ...pageMeta({
    path: "/terms",
    title: "Terms",
    description: "Terms of service information for Elyst AI.",
  }),
  title: { absolute: "Terms | Elyst AI" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <main id="main" className="flex-1 pt-24">
      <section style={{ padding: "clamp(72px, 10vw, 140px) var(--section-px)" }}>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-fg" style={{ fontSize: "var(--text-h1)" }}>
            Website terms
          </h1>
          <p className="mt-4 text-fg-3" style={{ fontSize: "var(--text-small)" }}>
            Effective 25 August 2026
          </p>

          <div className="mt-10 space-y-10 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.7 }}>
            <section>
              <h2 className="font-display font-bold text-fg" style={{ fontSize: "var(--text-h3)" }}>Using this website</h2>
              <p className="mt-3">
                This website explains Elyst AI and provides ways to contact us or book a call. You may use it for lawful purposes. Do not attempt to disrupt the site, gain unauthorised access, or misuse its content or booking facilities.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-fg" style={{ fontSize: "var(--text-h3)" }}>Information on the site</h2>
              <p className="mt-3">
                We try to keep the website accurate, but its content is general information and not a promise of a particular technical, commercial, or financial result. Timelines, scope, pricing, responsibilities, and deliverables are agreed separately in a written proposal or contract.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-fg" style={{ fontSize: "var(--text-h3)" }}>Bookings</h2>
              <p className="mt-3">
                A calendar booking creates a meeting request, not a services agreement. We may need to reschedule or decline a meeting. Any work begins only after scope and commercial terms have been agreed in writing.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-fg" style={{ fontSize: "var(--text-h3)" }}>Intellectual property</h2>
              <p className="mt-3">
                Unless stated otherwise, Elyst AI owns the website design, text, graphics, and branding. You may link to the site and quote short extracts with attribution, but you may not reproduce or commercially reuse substantial parts without written permission.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-fg" style={{ fontSize: "var(--text-h3)" }}>External services</h2>
              <p className="mt-3">
                Links and embedded services operated by other companies are governed by their own terms and policies. We are not responsible for the availability or content of third-party services.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-fg" style={{ fontSize: "var(--text-h3)" }}>Changes and contact</h2>
              <p className="mt-3">
                We may update these terms when the website or our practices change. The effective date above identifies the current version. Questions can be sent to{" "}
                <a className="text-emerald underline" href="mailto:info@elystai.com">info@elystai.com</a>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
