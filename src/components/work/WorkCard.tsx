import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import type { WorkCase } from "@/lib/work-content";

/**
 * A dark card led by our logo, a white X, and the client's logo. One tap opens
 * that client's case. "portrait" stacks the logos above the text; "horizontal"
 * puts them beside it (used on the Work page, two per row).
 */
export default function WorkCard({ item, layout = "portrait", size = "default" }: { item: WorkCase; layout?: "portrait" | "horizontal"; size?: "default" | "large" }) {
  const large = size === "large";
  const horizontal = layout === "horizontal";

  return (
    <Link
      href={`/work/${item.slug}`}
      aria-label={`Read the ${item.client} case`}
      className={`group relative flex h-full overflow-hidden rounded-md border-2 border-emerald/35 bg-surface-dark text-fg-on-dark shadow-card transition-[border-color,box-shadow] duration-300 hover:border-green/70 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-4 ${
        horizontal ? "flex-col sm:flex-row" : "flex-col"
      }`}
    >
      <div
        className={`flex items-center justify-center gap-3 bg-[radial-gradient(circle_at_50%_120%,rgb(0_223_130/16%),transparent_65%)] px-5 ${
          horizontal ? "h-36 border-b border-white/10 sm:h-auto sm:w-[44%] sm:shrink-0 sm:border-b-0 sm:border-r" : "h-40 border-b border-white/10 sm:h-44"
        }`}
      >
        <Image src="/brands/elyst-white.png" alt="Elyst AI" width={788} height={241} sizes="96px" className={`h-auto shrink-0 brightness-0 invert ${large ? "w-[5rem] sm:w-[6rem]" : "w-[4.4rem] sm:w-[5.2rem]"}`} />
        <X aria-hidden className="size-5 shrink-0 text-white transition-transform duration-300 group-hover:rotate-90" strokeWidth={2.2} />
        <span className={`flex shrink-0 items-center justify-center ${large ? "h-[4.5rem] w-[8rem] sm:w-[9rem]" : "h-14 w-[6.5rem] sm:w-[7rem]"}`}>
          <Image
            src={item.logo.src}
            alt={item.logo.alt}
            width={item.logo.width}
            height={item.logo.height}
            sizes="120px"
            className="max-h-full max-w-full object-contain"
          />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="font-display font-bold uppercase text-green" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
          {item.cardName}
        </p>
        <p className="mt-3 font-display font-semibold text-fg-on-dark" style={{ fontSize: "var(--text-body)", lineHeight: 1.25 }}>
          {item.cardSummary}
        </p>
        <span className="mt-auto inline-flex items-center gap-2 pt-6 font-display font-semibold text-green" style={{ fontSize: "var(--text-small)" }}>
          Read the case
          <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2} />
        </span>
      </div>
    </Link>
  );
}
