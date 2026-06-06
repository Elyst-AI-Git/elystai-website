import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MarkDither from "@/components/site/MarkDither";

const forks = [
  {
    label: "For business owners",
    benefit: "AI that handles your team's daily operations — inside WhatsApp.",
    cta: "See AIOS",
    href: "/aios",
  },
  {
    label: "For professionals & students",
    benefit: "Live programs that make you genuinely capable with AI.",
    cta: "Explore programs",
    href: "/learn",
  },
];

function ForkCard({
  label,
  benefit,
  cta,
  href,
}: {
  label: string;
  benefit: string;
  cta: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="card card-hover group relative flex flex-1 flex-col gap-2 overflow-hidden p-5"
    >
      <span className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-emerald transition-transform duration-200 group-hover:scale-y-100" />
      <span className="text-small font-bold text-fg">{label}</span>
      <span className="text-small text-fg-2">{benefit}</span>
      <span className="mt-2 inline-flex items-center gap-1.5 text-small font-bold text-emerald">
        {cta}
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

export default function Hero() {
  return (
    <section
      className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2"
      style={{ padding: "var(--section-py) var(--section-px)" }}
    >
      {/* Left — copy + fork */}
      <div>
        <span className="chip">Kozhikode · Kerala · India &amp; GCC</span>
        <h1
          className="mt-6 text-fg"
          style={{ fontSize: "var(--text-hero)" }}
        >
          AI that runs your business.
          <br />
          Programs that grow your people.
        </h1>
        <p
          className="mt-5 max-w-prose text-fg-2"
          style={{ fontSize: "var(--text-body)" }}
        >
          We deploy AI into how businesses run — and teach people to use it.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          {forks.map((f) => (
            <ForkCard key={f.href} {...f} />
          ))}
        </div>

        <p className="mt-5 text-small text-fg-3">
          Configured and deployed for your business. Nothing to install.
        </p>
      </div>

      {/* Right — mark-forming dither (desktop) */}
      <div
        className="hidden h-[480px] overflow-hidden rounded-card md:block"
        style={{ background: "#F5F8F6" }}
      >
        <MarkDither colorFront="#03624C" colorBack="#F5F8F6" />
      </div>

      {/* Mobile band */}
      <div
        className="h-44 overflow-hidden rounded-card md:hidden"
        style={{ background: "#F5F8F6" }}
      >
        <MarkDither colorFront="#03624C" colorBack="#F5F8F6" pixelSize={4} />
      </div>
    </section>
  );
}
