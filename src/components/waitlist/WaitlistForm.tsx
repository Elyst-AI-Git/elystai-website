"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "min-h-[48px] w-full rounded-md border border-white/15 bg-black/40 px-4 text-fg-on-dark placeholder:text-fg-on-dark/40 backdrop-blur-sm outline-none transition-colors focus:border-[var(--elyst-green)] disabled:opacity-60";

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

/**
 * Waitlist capture — phone (required, the primary contact channel) plus an
 * optional email. Submits straight to Web3Forms from the browser (their free
 * plan only accepts client-side submissions), which emails each signup to the
 * inbox tied to the access key. A hidden honeypot field deters bots.
 */
export default function WaitlistForm() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!phone.trim()) {
      setError("Please enter a valid phone number.");
      setStatus("error");
      return;
    }
    if (!ACCESS_KEY) {
      setError("Signups are temporarily unavailable. Please try again later.");
      setStatus("error");
      return;
    }

    // Honeypot: real users never check this hidden box (a checkbox's `.value`
    // is always "on", so we must read `.checked`, not `.value`).
    const botcheck = (e.currentTarget.elements.namedItem("botcheck") as HTMLInputElement)?.checked;
    if (botcheck) {
      setStatus("success");
      return;
    }

    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: "New AI for Work waitlist signup",
          from_name: "Elyst AI Waitlist",
          // Web3Forms uses `email` as reply-to; fall back when omitted.
          email: email.trim() || "no-email@waitlist.elystai.com",
          phone: phone.trim(),
          message: `New waitlist signup\nPhone: ${phone.trim()}\nEmail: ${email.trim() || "(not provided)"}`,
        }),
      });
      const data = (await res.json().catch(() => null)) as { success?: boolean } | null;
      if (!res.ok || !data?.success) {
        setError("Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p
        className="mx-auto max-w-md text-center text-fg-on-dark"
        style={{ fontSize: "var(--text-body)" }}
      >
        You&rsquo;re on the list — we&rsquo;ll be in touch when AI for Work opens.
      </p>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Honeypot — visually hidden, off-screen, not focusable */}
        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute left-[-9999px]"
        />
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number"
          aria-label="Phone number"
          autoComplete="tel"
          disabled={status === "submitting"}
          className={inputClass}
          style={{ fontSize: "var(--text-small)" }}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email (optional)"
          aria-label="Email address (optional)"
          autoComplete="email"
          disabled={status === "submitting"}
          className={inputClass}
          style={{ fontSize: "var(--text-small)" }}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-[48px] items-center justify-center whitespace-nowrap rounded-md px-6 font-bold text-black transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ background: "var(--elyst-green)", fontSize: "var(--text-small)" }}
        >
          {status === "submitting" ? "Joining…" : "Join the waitlist"}
        </button>
      </form>

      {status === "error" && (
        <p
          role="alert"
          className="mt-3 text-center text-[var(--elyst-green)]"
          style={{ fontSize: "var(--text-small)" }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
