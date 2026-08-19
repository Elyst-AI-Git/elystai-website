"use client";

import { useEffect } from "react";
import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
import {
  appendStoredUtm,
  captureArrivalUtm,
  captureInternalTrafficMarker,
  isInternalTraffic,
  trackBookingCta,
} from "@/lib/marketing-analytics";
import { isBookingIntent } from "@/lib/booking";

export default function MarketingAnalytics() {
  useEffect(() => {
    captureArrivalUtm();
    captureInternalTrafficMarker();

    const handleBookingClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>("a[data-booking-intent]");
      if (!anchor) return;

      const intent = anchor.dataset.bookingIntent;
      if (!intent || !isBookingIntent(intent)) return;

      captureArrivalUtm();
      trackBookingCta(intent);
      event.preventDefault();
      window.location.assign(appendStoredUtm(anchor.href));
    };

    document.addEventListener("click", handleBookingClick, true);
    return () => document.removeEventListener("click", handleBookingClick, true);
  }, []);

  const beforeSend = (event: BeforeSendEvent) =>
    isInternalTraffic() ? null : event;

  return <Analytics beforeSend={beforeSend} />;
}
