import type { ReactNode } from "react";

const inputClass =
  "mt-2 w-full rounded-md border-2 border-border bg-surface-card px-4 py-3 text-fg placeholder:text-fg-3 focus-visible:border-emerald focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/30";

export function Field({
  label,
  name,
  error,
  children,
  optional,
}: {
  label: string;
  name: string;
  error?: string;
  children: (props: { id: string; className: string; "aria-invalid": boolean; "aria-describedby"?: string }) => ReactNode;
  optional?: boolean;
}) {
  const id = `field-${name}`;
  return (
    <div>
      <label htmlFor={id} className="font-display font-semibold text-fg" style={{ fontSize: "var(--text-small)" }}>
        {label}
        {optional ? <span className="ml-2 font-normal text-fg-3">(optional)</span> : null}
      </label>
      {children({
        id,
        className: inputClass,
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? `${id}-error` : undefined,
      })}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-[var(--elyst-red-muted)]" style={{ fontSize: "var(--text-label)" }}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function SubmitButton({ children, pending }: { children: ReactNode; pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-12 w-fit items-center justify-center rounded-md bg-emerald px-7 font-display font-semibold text-fg-on-dark transition-colors hover:bg-emerald-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 disabled:opacity-60"
      style={{ fontSize: "var(--text-small)" }}
    >
      {pending ? "Sending…" : children}
    </button>
  );
}
