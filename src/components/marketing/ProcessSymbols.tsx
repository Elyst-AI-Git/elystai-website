export type ProcessSymbolId = "identify" | "build" | "handover";

type ProcessSymbolProps = {
  id: ProcessSymbolId;
  size?: "default" | "large";
  surface?: "dark" | "light";
};

function SymbolFrame({
  children,
  label,
  size,
}: {
  children: React.ReactNode;
  label: string;
  size: "default" | "large";
}) {
  return (
    <div
      className={`flex w-full items-center justify-center ${size === "large" ? "h-56" : "h-48"}`}
      role="img"
      aria-label={label}
    >
      {children}
    </div>
  );
}

const identifyDots = [
  { left: "13%", top: "16%", size: "size-3" },
  { left: "47%", top: "8%", size: "size-4" },
  { left: "82%", top: "22%", size: "size-3" },
  { left: "8%", top: "51%", size: "size-4" },
  { left: "53%", top: "46%", chosen: true },
  { left: "88%", top: "57%", size: "size-3" },
  { left: "22%", top: "84%", size: "size-3" },
  { left: "46%", top: "76%", size: "size-4" },
  { left: "77%", top: "87%", size: "size-3" },
];

function IdentifySymbol({ size, surface }: { size: "default" | "large"; surface: "dark" | "light" }) {
  const isLarge = size === "large";
  const mutedClass = surface === "light" ? "text-fg-3" : "text-fg-muted-dark/70";

  return (
    <SymbolFrame size={size} label="One chosen opportunity among several candidates">
      <div className={`relative ${isLarge ? "size-52" : "size-44"}`}>
        {identifyDots.map((dot, index) =>
          dot.chosen ? (
            <span
              key={index}
              className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[5px] border-green ${isLarge ? "size-16" : "size-12"}`}
              style={{ left: dot.left, top: dot.top }}
            >
              <span className={isLarge ? "size-4 rounded-full bg-green" : "size-3 rounded-full bg-green"} />
            </span>
          ) : (
            <span
              key={index}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-current ${mutedClass} ${dot.size}`}
              style={{ left: dot.left, top: dot.top }}
            />
          ),
        )}
      </div>
    </SymbolFrame>
  );
}

function BuildSymbol({ size, surface }: { size: "default" | "large"; surface: "dark" | "light" }) {
  const isLarge = size === "large";
  const mutedBorderClass = surface === "light" ? "border-fg-3" : "border-fg-muted-dark/70";

  return (
    <SymbolFrame size={size} label="One system running through three tools">
      <div className={`relative flex items-center justify-between px-4 ${isLarge ? "size-52" : "size-44"}`}>
        <span
          className={`absolute top-1/2 z-10 h-[5px] -translate-y-1/2 rounded-full bg-green ${isLarge ? "-left-3 right-0 after:absolute after:-right-2 after:top-1/2 after:size-4 after:-translate-y-1/2 after:rounded-full after:bg-green" : "-left-3 -right-3"}`}
        />
        {[0, 1, 2].map((ring) => (
          <span key={ring} className={`relative z-0 size-12 rounded-full border-[5px] ${mutedBorderClass}`} />
        ))}
      </div>
    </SymbolFrame>
  );
}

function HandoverSymbol({ size, surface }: { size: "default" | "large"; surface: "dark" | "light" }) {
  const isLarge = size === "large";
  const faintClass = surface === "light" ? "border-fg-3/25" : "border-fg-muted-dark/25";
  const softClass = surface === "light" ? "border-fg-3/60" : "border-fg-muted-dark/60";

  return (
    <SymbolFrame size={size} label="Ownership shifts from Elyst to your team">
      <div className={`relative ${isLarge ? "size-52" : "size-44"}`}>
        {isLarge ? (
          <span className={`absolute left-[3%] top-[40%] size-12 rounded-full border-[4px] ${faintClass}`} />
        ) : null}
        <span
          className={`absolute rounded-full border-[5px] ${softClass} ${isLarge ? "left-[21%] top-[31%] size-18" : "left-[14%] top-[31%] size-16"}`}
        />
        <span
          className={`absolute rounded-full border-[6px] border-green ${isLarge ? "right-0 top-[17%] size-24" : "right-[8%] top-[22%] size-20"}`}
        />
      </div>
    </SymbolFrame>
  );
}

export function ProcessSymbol({ id, size = "default", surface = "dark" }: ProcessSymbolProps) {
  if (id === "identify") return <IdentifySymbol size={size} surface={surface} />;
  if (id === "build") return <BuildSymbol size={size} surface={surface} />;
  return <HandoverSymbol size={size} surface={surface} />;
}
