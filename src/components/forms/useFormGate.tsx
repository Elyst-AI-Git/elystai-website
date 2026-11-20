"use client";

import { useRef, useState, type ReactNode } from "react";
import { Mail, Phone, X } from "lucide-react";
import { CONTACT } from "@/lib/site-content";

/**
 * While email delivery is not set up, the first keystroke in a form opens a
 * short notice with a way to reach the team directly. Once delivery is
 * configured (`ready`), the gate does nothing.
 */
export function useFormGate(ready: boolean) {
  const [open, setOpen] = useState(false);
  const shown = useRef(false);

  return {
    /** Spread onto the <form>. */
    formProps: {
      onInput: () => {
        if (!ready && !shown.current) {
          shown.current = true;
          setOpen(true);
        }
      },
    },
    /** True when submitting should be blocked. */
    blocked: !ready,
    show: () => setOpen(true),
    dialog: <UnavailableDialog open={open} onClose={() => setOpen(false)} />,
  };
}

function UnavailableDialog({ open, onClose }: { open: boolean; onClose: () => void }): ReactNode {
  const ref = useRef<HTMLDialogElement>(null);

  // The native dialog gives focus trapping, Escape to close and inert background.
  const setRef = (node: HTMLDialogElement | null) => {
    ref.current = node;
    if (!node) return;
    if (open && !node.open) node.showModal();
    if (!open && node.open) node.close();
  };

  return (
    <dialog
      ref={setRef}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      aria-labelledby="form-notice-title"
      className="m-auto w-[min(92vw,30rem)] rounded-md border-2 border-emerald/40 bg-surface-dark p-0 text-fg-on-dark shadow-2xl backdrop:bg-black/60"
    >
      <div className="relative p-7 sm:p-9">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 flex size-11 items-center justify-center rounded-md text-fg-muted-dark transition-colors hover:text-fg-on-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald"
        >
          <X aria-hidden className="size-5" strokeWidth={2} />
        </button>
        <p className="font-display font-bold uppercase text-emerald-light" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
          Almost ready
        </p>
        <h2 id="form-notice-title" className="mt-3 pr-8 font-display font-semibold text-fg-on-dark" style={{ fontSize: "var(--text-card)", lineHeight: 1.12 }}>
          We are working on this form.
        </h2>
        <p className="mt-3 text-fg-muted-dark" style={{ fontSize: "var(--text-body)", lineHeight: 1.5 }}>
          Meanwhile, contact us directly and we will reply within one working day.
        </p>
        <ul className="mt-6 grid gap-3">
          <li>
            <a
              href={CONTACT.phoneHref}
              className="flex min-h-12 items-center gap-3 rounded-md border border-white/15 bg-white/5 px-4 font-display font-semibold transition-colors hover:border-emerald hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald"
            >
              <Phone aria-hidden className="size-5 text-emerald-light" strokeWidth={1.8} />
              {CONTACT.phone}
            </a>
          </li>
          <li>
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex min-h-12 items-center gap-3 rounded-md border border-white/15 bg-white/5 px-4 font-display font-semibold transition-colors hover:border-emerald hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald"
            >
              <Mail aria-hidden className="size-5 text-emerald-light" strokeWidth={1.8} />
              {CONTACT.email}
            </a>
          </li>
        </ul>
      </div>
    </dialog>
  );
}
