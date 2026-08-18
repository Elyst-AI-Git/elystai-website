"use client";

import { useEffect } from "react";
import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
import {
  captureArrivalUtm,
  captureInternalTrafficMarker,
  isInternalTraffic,
} from "@/lib/marketing-analytics";

export default function MarketingAnalytics() {
  useEffect(() => {
    captureArrivalUtm();
    captureInternalTrafficMarker();
  }, []);

  const beforeSend = (event: BeforeSendEvent) =>
    isInternalTraffic() ? null : event;

  return <Analytics beforeSend={beforeSend} />;
}
