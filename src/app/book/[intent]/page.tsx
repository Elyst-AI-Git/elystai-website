import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BookingScheduler from "@/components/marketing/BookingScheduler";
import { calendarHref, isBookingIntent } from "@/lib/booking";

export const metadata: Metadata = {
  title: "Book a session",
  robots: { index: false, follow: false },
};

export default async function BookingPage({
  params,
  searchParams,
}: {
  params: Promise<{ intent: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ intent }, campaignParameters] = await Promise.all([params, searchParams]);
  if (!isBookingIntent(intent)) notFound();

  const isAudit = intent === "audit";

  return (
    <main id="main" className="flex-1 bg-bg pt-28">
      <section style={{ padding: "clamp(32px, 5vw, 64px) var(--section-px) var(--section-py)" }}>
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow">{isAudit ? "Services" : "Training"}</p>
            <h1 className="mt-4 text-fg" style={{ fontSize: "var(--text-h1)" }}>
              {isAudit ? "Book an AI Workflow Audit Call." : "Plan a team AI training session."}
            </h1>
            <p className="mt-4 text-fg-2" style={{ fontSize: "var(--text-body)" }}>
              Choose a suitable time below. The booking calendar is provided by Cal.com.
            </p>
          </div>
          <BookingScheduler intent={intent} src={calendarHref(intent, campaignParameters)} />
          <noscript>
            <p className="mt-5 text-fg-2">
              JavaScript is required to load the calendar. You can also use the direct booking link:
              {" "}
              <a className="font-bold text-emerald underline" href={calendarHref(intent, campaignParameters)}>
                open Cal.com
              </a>.
            </p>
          </noscript>
        </div>
      </section>
    </main>
  );
}
