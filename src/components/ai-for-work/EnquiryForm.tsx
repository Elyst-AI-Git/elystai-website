"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "min-h-[48px] w-full rounded-md border border-border bg-white px-4 text-fg placeholder:text-fg-2/50 outline-none transition-colors focus:border-emerald disabled:opacity-60";

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

/**
 * On-site enquiry capture for "AI for Work" — mirrors the waitlist form's
 * Web3Forms flow (their free plan only accepts client-side submissions, which
 * emails each enquiry to the inbox tied to the access key). Name + phone are
 * required; email and message are optional. A hidden honeypot deters bots.
 *
 * We keep enquiries on-site (rather than a Google Form) so the experience stays
 * branded and instant, matching the rest of the site.
 */
export default function EnquiryForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      setError("Please enter your name and phone number.");
      setStatus("error");
      return;
    }
    if (!ACCESS_KEY) {
      setError("Enquiries are temporarily unavailable. Please try again later.");
      setStatus("error");
      return;
    }

    // Honeypot: real users never check this hidden box.
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
          subject: "New AI for Work enquiry",
          from_name: "AI for Work — Enquiry",
          // Web3Forms uses `email` as reply-to; fall back when omitted.
          email: email.trim() || "no-email@ai-for-work.elystai.com",
          name: name.trim(),
          phone: phone.trim(),
          message: `New AI for Work enquiry\nName: ${name.trim()}\nPhone: ${phone.trim()}\nEmail: ${
            email.trim() || "(not provided)"
          }\nMessage: ${message.trim() || "(none)"}`,
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
      <p className="text-center text-fg" style={{ fontSize: "var(--text-body)" }}>
        Thanks — we&rsquo;ve got your enquiry and will be in touch shortly.
      </p>
    );
  }

  return (
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
        type="text"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        aria-label="Your name"
        autoComplete="name"
        disabled={status === "submitting"}
        className={inputClass}
        style={{ fontSize: "var(--text-small)" }}
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
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Anything you'd like to ask? (optional)"
        aria-label="Your question (optional)"
        rows={3}
        disabled={status === "submitting"}
        className={`${inputClass} min-h-[88px] resize-y py-3`}
        style={{ fontSize: "var(--text-small)" }}
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex min-h-[48px] items-center justify-center whitespace-nowrap rounded-md px-6 font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{ background: "var(--elyst-emerald)", fontSize: "var(--text-small)" }}
      >
        {status === "submitting" ? "Sending…" : "Send enquiry"}
      </button>

      {status === "error" && (
        <p role="alert" className="text-center text-emerald" style={{ fontSize: "var(--text-small)" }}>
          {error}
        </p>
      )}
    </form>
  );
}
