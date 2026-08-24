import * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function VisualCard({
  children,
  className,
  decorated = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { decorated?: boolean }) {
  return (
    <Card
      variant="plain"
      className={cn(
        "group relative overflow-hidden rounded-md border border-border bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      {decorated ? (
        <>
          <span aria-hidden className="pointer-events-none absolute -left-px -top-px z-20 block size-2 border-l-2 border-t-2 border-emerald" />
          <span aria-hidden className="pointer-events-none absolute -right-px -top-px z-20 block size-2 border-r-2 border-t-2 border-emerald" />
          <span aria-hidden className="pointer-events-none absolute -bottom-px -left-px z-20 block size-2 border-b-2 border-l-2 border-emerald" />
          <span aria-hidden className="pointer-events-none absolute -bottom-px -right-px z-20 block size-2 border-b-2 border-r-2 border-emerald" />
        </>
      ) : null}
      {children}
    </Card>
  );
}
