import type { Metadata } from "next";
import { BrandButton } from "@/components/ui/brand-button";
import BookingCompleteTracker from "@/components/marketing/BookingCompleteTracker";

export const metadata: Metadata = {
  title: "Booking confirmed",
  robots: { index: false, follow: false },
};

export default function BookingCompletePage() {
  return (
    <main id="main" className="flex flex-1 items-center justify-center bg-surface-dark" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <BookingCompleteTracker />
      <div className="max-w-2xl text-center">
        <p className="eyebrow text-fg-muted-dark">Confirmed</p>
        <h1 className="mt-5 text-fg-on-dark" style={{ fontSize: "var(--text-h1)" }}>
          We will see you soon.
        </h1>
        <p className="mt-5 text-fg-muted-dark" style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}>
          Your booking is confirmed. We will use the time to understand the workflow you want to change.
        </p>
        <div className="mt-8">
          <BrandButton href="/" variant="outline" tone="light">
            Return home
          </BrandButton>
        </div>
      </div>
    </main>
  );
}
