import Link from "next/link";
import type { SVGProps } from "react";
import Wordmark from "@/components/site/Wordmark";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.97 0 1.78-.78 1.78-1.74V1.74C24 .78 23.19 0 22.22 0z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38C1.35 2.68.93 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.12.66.66 1.33 1.08 2.12 1.38.76.3 1.64.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.12-1.38c.66-.66 1.08-1.33 1.38-2.12.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.12A5.88 5.88 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.85-10.41a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
    </svg>
  );
}

function WhatsappIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M.06 24l1.69-6.16a11.87 11.87 0 0 1-1.59-5.95C.16 5.34 5.5 0 12.06 0a11.82 11.82 0 0 1 8.41 3.49A11.82 11.82 0 0 1 23.94 12c0 6.56-5.34 11.9-11.9 11.9a11.9 11.9 0 0 1-5.7-1.45L.06 24zm6.6-3.8c1.68.99 3.28 1.59 5.4 1.59 5.45 0 9.89-4.43 9.89-9.89 0-5.45-4.43-9.88-9.89-9.88-5.46 0-9.89 4.43-9.89 9.89 0 2.22.65 3.88 1.74 5.62l-1 3.65 3.75-.99zm11.39-5.55c-.07-.12-.27-.2-.56-.34-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.91-2.19-.24-.57-.48-.5-.66-.5l-.56-.01c-.2 0-.51.07-.78.37-.27.3-1.02.99-1.02 2.42s1.04 2.81 1.19 3.01c.15.2 2.05 3.12 4.96 4.38.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.12.56-.08 1.76-.72 2-1.41.25-.69.25-1.28.18-1.41z" />
    </svg>
  );
}

const socials = [
  { label: "LinkedIn", href: "#", Icon: LinkedinIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "WhatsApp community", href: "#", Icon: WhatsappIcon },
];

// Trimmed to the three destinations that matter — everything else (Book a
// call, Circle, AI Junior, AI Yathra, Flagship, Blog, Privacy, Terms) is
// reachable from those pages or the nav; keeping the footer lean leaves room
// for the "Follow us" block.
const footerNav = [
  { label: "AIOS for Business", href: "/aios" },
  { label: "AI Accelerator", href: "/learn" },
  { label: "About", href: "/about" },
];

export default function Footer() {
  return (
    <footer className="mt-auto">
      {/* A single unified footer — utility links, contact/social details, and
          the giant brand wordmark all live together on the starfield over the
          dark surface (no separate light "utility footer" zone). */}
      <div
        className="overflow-hidden"
        style={{
          paddingTop: "160px",
          background:
            "linear-gradient(to bottom, var(--bg) 0%, color-mix(in srgb, var(--bg) 65%, var(--surface-dark) 35%) 35%, color-mix(in srgb, var(--bg) 22%, var(--surface-dark) 78%) 70%, var(--surface-dark) 160px)",
        }}
      >
        <div className="relative overflow-hidden bg-surface-dark px-[var(--section-px)] pt-14 pb-0">
          <StarsBackground
            className="absolute inset-0"
            starDensity={0.00055}
            allStarsTwinkle
            twinkleProbability={0.85}
            minTwinkleSpeed={0.4}
            maxTwinkleSpeed={1.2}
          />
          <ShootingStars
            className="absolute inset-0"
            starColor="#00df82"
            trailColor="#03624c"
            starWidth={28}
            starHeight={2.5}
            minSpeed={18}
            maxSpeed={42}
            minDelay={500}
            maxDelay={2200}
          />

          <div className="relative z-10 mx-auto max-w-6xl">
            {/* Three-up utility row — brand/contact (left), core nav (middle),
                follow-us (right). Kept deliberately lean. */}
            <div className="flex flex-col gap-10 pb-10 sm:flex-row sm:items-start sm:justify-between">
              {/* Left — brand + contact, left-aligned */}
              <div className="text-left">
                <Wordmark
                  className="mb-5 h-6 w-auto text-fg-on-dark"
                  title="Elyst AI"
                />
                <address className="not-italic text-small leading-relaxed text-fg-muted-dark">
                  Kozhikode, Kerala, India
                  <br />
                  <a
                    href="mailto:info@elystai.com"
                    className="transition-colors hover:text-green"
                  >
                    info@elystai.com
                  </a>
                  <br />
                  <a
                    href="tel:+919633288931"
                    className="font-semibold text-green transition-colors hover:text-fg-on-dark"
                  >
                    +91 96332 88931
                  </a>
                </address>
              </div>

              {/* On mobile these two sit side by side (Explore left, Follow us
                  right); on desktop the wrapper dissolves (sm:contents) so the
                  3-up justify-between row is preserved. */}
              <div className="flex justify-between gap-8 sm:contents">
                {/* Middle — the three links that matter */}
                <nav aria-label="Footer">
                  <h2 className="eyebrow mb-4 text-fg-muted-dark">Explore</h2>
                  <ul className="flex flex-col gap-3">
                    {footerNav.map((l) => (
                      <li key={l.label}>
                        <Link
                          href={l.href}
                          className="text-small text-fg-on-dark/80 transition-colors hover:text-green"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Right — follow us (right-aligned on mobile) */}
                <div className="text-right sm:text-left">
                  <h2 className="eyebrow mb-4 text-fg-muted-dark">Follow us</h2>
                  <div className="flex justify-end gap-3 sm:justify-start">
                    {socials.map(({ label, href, Icon }) => (
                      <a
                        key={label}
                        href={href}
                        aria-label={label}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-fg-on-dark transition-colors hover:bg-green hover:text-surface-dark"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-white/10" />

            <div className="py-6 text-center text-small text-fg-muted-dark">
              <p>© 2026 Elyst AI LLP · All rights reserved.</p>
            </div>
          </div>

          {/* Giant wordmark — clean white, no glow, bottom-aligned */}
          <div className="relative z-10 mt-2 flex justify-center">
            <Wordmark
              title="Elyst AI"
              className="block h-auto w-full max-w-[975px] text-fg-on-dark"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
