import { pageMeta } from "@/lib/seo";

export const metadata = {
  ...pageMeta({
    path: "/privacy",
    title: "Privacy",
    description: "Privacy information for Elyst AI.",
  }),
  title: { absolute: "Privacy | Elyst AI" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <main id="main" className="flex-1 pt-24">
      <section style={{ padding: "clamp(72px, 10vw, 140px) var(--section-px)" }}>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-fg" style={{ fontSize: "var(--text-h1)" }}>
            Privacy policy
          </h1>
          <p className="mt-4 text-fg-3" style={{ fontSize: "var(--text-small)" }}>
            Effective 25 August 2026
          </p>

          <div className="mt-10 space-y-10 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.7 }}>
            <section>
              <h2 className="font-display font-bold text-fg" style={{ fontSize: "var(--text-h3)" }}>What we collect</h2>
              <p className="mt-3">
                When you browse this website, we receive basic technical and usage information such as pages viewed, referral source, device type, and approximate location. If you book a call, Cal.com collects the details you provide in the booking form. If you contact us directly, we receive the information contained in your message.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-fg" style={{ fontSize: "var(--text-h3)" }}>How we use it</h2>
              <p className="mt-3">
                We use this information to operate and improve the website, understand which pages and campaigns are useful, respond to enquiries, arrange calls, and deliver services you ask us to provide. We do not sell personal information or use it for third-party advertising.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-fg" style={{ fontSize: "var(--text-h3)" }}>Analytics and campaign information</h2>
              <p className="mt-3">
                The site uses Vercel Analytics. Campaign parameters from your arrival URL may be stored in your browser session and carried into the booking page so we can understand how a booking reached us. An internal-traffic marker may be stored locally when our team deliberately enables it.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-fg" style={{ fontSize: "var(--text-h3)" }}>Service providers</h2>
              <p className="mt-3">
                The website is hosted by Vercel and booking calendars are provided by Cal.com. Their handling of information is governed by their own privacy notices. We only use providers needed to operate the website and booking flow.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li><a className="text-emerald underline" href="https://vercel.com/legal/privacy-notice">Vercel privacy notice</a></li>
                <li><a className="text-emerald underline" href="https://cal.com/privacy">Cal.com privacy policy</a></li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-bold text-fg" style={{ fontSize: "var(--text-h3)" }}>Retention and your choices</h2>
              <p className="mt-3">
                We keep information only for as long as it is reasonably needed for the purpose it was collected, our business records, or legal obligations. You may ask us to access, correct, or delete information we hold about you, subject to any record we must retain.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-fg" style={{ fontSize: "var(--text-h3)" }}>Contact</h2>
              <p className="mt-3">
                For privacy questions or requests, email{" "}
                <a className="text-emerald underline" href="mailto:info@elystai.com">info@elystai.com</a>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
