import Wordmark from "@/components/site/Wordmark";

/** A small "toggle switched on" mark, as on the guide's last page. */
export function ToggleOn({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`inline-flex h-7 w-12 items-center justify-end rounded-full bg-green p-1 ${className}`}>
      <span className="size-5 rounded-full bg-[#06140e]" />
    </span>
  );
}

function PageLines({ title }: { title: string }) {
  return (
    <div className="flex h-full flex-col p-[9%]">
      <span className="font-display font-bold uppercase text-emerald" style={{ fontSize: "0.5rem", letterSpacing: "0.08em" }}>
        {title}
      </span>
      <div className="mt-[8%] grid gap-[5%]">
        <span className="block h-1.5 w-[85%] rounded-full bg-emerald/25" />
        <span className="block h-1.5 w-[70%] rounded-full bg-fg-3/20" />
        <span className="block h-1.5 w-[78%] rounded-full bg-fg-3/20" />
        <span className="block h-1.5 w-[55%] rounded-full bg-fg-3/20" />
      </div>
      <div className="mt-auto flex items-center gap-[6%]">
        {[0, 1, 2].map((dot) => (
          <span key={dot} className={`size-2.5 rounded-full ${dot === 1 ? "bg-green" : "bg-emerald/25"}`} />
        ))}
      </div>
    </div>
  );
}

/** The guide's cover, tilted, with two inside pages fanned behind it. */
export default function GuideCover({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative mx-auto aspect-[1240/1754] w-full max-w-[13rem] sm:max-w-[15rem] ${className}`}
      role="img"
      aria-label="The cover of Elyst AI's guide, Put AI to work in your business, with two inside pages fanned behind it"
    >
      <div aria-hidden className="absolute inset-0 -rotate-[11deg] translate-x-[-14%] rounded-[3px] border border-border bg-[#f6f8f5] shadow-[8px_12px_24px_rgb(3_34_25/18%)]">
        <PageLines title="What an AI system is" />
      </div>
      <div aria-hidden className="absolute inset-0 rotate-[9deg] translate-x-[14%] rounded-[3px] border border-border bg-[#f6f8f5] shadow-[8px_12px_24px_rgb(3_34_25/18%)]">
        <PageLines title="The six steps" />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 flex flex-col rounded-[3px] bg-surface-dark p-[10%] text-fg-on-dark [transform:perspective(900px)_rotateY(-7deg)_rotateZ(-2deg)] shadow-[12px_18px_30px_rgb(3_34_25/30%),0_3px_8px_rgb(3_34_25/20%)]"
      >
        <Wordmark className="h-3 w-auto text-fg-on-dark" title="Elyst AI" />
        <p className="mt-auto font-display font-semibold tracking-[var(--tracking-display)]" style={{ fontSize: "clamp(1.05rem, 1.7vw, 1.35rem)", lineHeight: 1.08 }}>
          Put AI to work in your business
        </p>
        <p className="mt-2 text-fg-muted-dark" style={{ fontSize: "0.55rem", lineHeight: 1.3 }}>
          How AI Transformation works, step by step.
        </p>
        <ToggleOn className="mt-[12%] origin-left scale-[0.8]" />
      </div>
    </div>
  );
}
