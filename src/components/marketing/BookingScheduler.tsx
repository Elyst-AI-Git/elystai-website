"use client";

import { useEffect } from "react";
import type { BookingIntent } from "@/lib/booking";
import { trackSchedulerView } from "@/lib/marketing-analytics";

export default function BookingScheduler({
  intent,
  src,
}: {
  intent: BookingIntent;
  src: string;
}) {
  useEffect(() => {
    trackSchedulerView(intent);
  }, [intent]);

  return (
    <iframe
      title={intent === "identify" ? "Book an AI workflow call" : "Plan a team AI training session"}
      src={src}
      className="min-h-[760px] w-full rounded-md border border-border bg-white"
      allow="payment"
    />
  );
}
