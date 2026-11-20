"use client";

import { useState, type FormEvent } from "react";
import { Field, SubmitButton } from "@/components/forms/Fields";
import { useFormGate } from "@/components/forms/useFormGate";
import { INTERESTS, TEAM_SIZES } from "@/lib/forms";

export default function ContactForm({ deliveryReady }: { deliveryReady: boolean }) {
  const gate = useFormGate(deliveryReady);
  const [openedAt] = useState(() => Date.now());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (gate.blocked) {
      gate.show();
      return;
    }
    setPending(true);
    setErrors({});
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, openedAt }),
      });
      const result = (await response.json()) as { ok: boolean; errors?: Record<string, string> };
      if (result.ok) setDone(true);
      else setErrors(result.errors ?? { form: "Something went wrong. Please try again." });
    } catch {
      setErrors({ form: "Something went wrong. Please try again, or call or WhatsApp us." });
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <div role="status" className="rounded-md border-2 border-emerald bg-surface-accent-soft p-8">
        <h2 className="font-display font-semibold text-fg" style={{ fontSize: "var(--text-card)", lineHeight: 1.1 }}>
          Thank you. We have your message.
        </h2>
        <p className="mt-3 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.5 }}>
          Nihal or Shirin will reply within one working day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5" {...gate.formProps}>
      <Field label="Name" name="name" error={errors.name}>
        {(props) => <input {...props} name="name" type="text" autoComplete="name" required />}
      </Field>
      <Field label="Company" name="company" error={errors.company}>
        {(props) => <input {...props} name="company" type="text" autoComplete="organization" required />}
      </Field>
      <Field label="Work email" name="email" error={errors.email}>
        {(props) => <input {...props} name="email" type="email" autoComplete="email" required />}
      </Field>
      <Field label="Phone / WhatsApp" name="phone" error={errors.phone}>
        {(props) => <input {...props} name="phone" type="tel" autoComplete="tel" required />}
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Team size" name="teamSize" error={errors.teamSize}>
          {(props) => (
            <select {...props} name="teamSize" defaultValue="" required>
              <option value="" disabled>Choose</option>
              {TEAM_SIZES.map((size) => <option key={size}>{size}</option>)}
            </select>
          )}
        </Field>
        <Field label="Interested in" name="interest" error={errors.interest}>
          {(props) => (
            <select {...props} name="interest" defaultValue="" required>
              <option value="" disabled>Choose</option>
              {INTERESTS.map((item) => <option key={item}>{item}</option>)}
            </select>
          )}
        </Field>
      </div>
      <Field label="What takes your team the most time?" name="task" optional>
        {(props) => <textarea {...props} name="task" rows={4} />}
      </Field>
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {errors.form ? <p role="alert" className="text-[var(--elyst-red-muted)]">{errors.form}</p> : null}
      <SubmitButton pending={pending}>Send message</SubmitButton>
      {gate.dialog}
    </form>
  );
}
