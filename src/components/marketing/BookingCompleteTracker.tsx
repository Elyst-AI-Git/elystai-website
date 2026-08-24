"use client";

import { useEffect } from "react";
import type { BookingIntent } from "@/lib/booking";
import { trackBookingComplete } from "@/lib/marketing-analytics";

export default function BookingCompleteTracker({ intent }: { intent: BookingIntent }) {
  useEffect(() => {
    const marker = `elyst_booking_complete_${intent}`;
    if (window.sessionStorage.getItem(marker)) return;
    window.sessionStorage.setItem(marker, "1");
    trackBookingComplete(intent);
  }, [intent]);

  return null;
}
