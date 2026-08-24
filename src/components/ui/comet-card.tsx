import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function CometCard({
  className,
  children,
}: {
  rotateDepth?: number;
  translateDepth?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("group perspective-distant", className)}>
      <div className="relative rounded-md transition-transform duration-200 ease-out group-hover:-translate-y-1 group-hover:rotate-[0.35deg] motion-reduce:transition-none motion-reduce:group-hover:transform-none">
        {children}
      </div>
    </div>
  );
}
