"use client";

import { useEffect } from "react";
import {
  trackBookingComplete,
  trackTrainingEnquiry,
} from "@/lib/marketing-analytics";

export default function BookingCompleteTracker() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.get("uid")) return;

    const isTraining =
      params.get("utm_content")?.includes("training") ||
      params.get("title")?.toLowerCase().includes("training");
    const intent = isTraining ? "training" : "audit";

    trackBookingComplete(intent);
    if (isTraining) trackTrainingEnquiry();
  }, []);

  return null;
}
