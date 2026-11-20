import { ImageResponse } from "next/og";
import BrandedOpenGraph from "@/components/seo/BrandedOpenGraph";

export const alt = "Practical AI training for business teams by Elyst AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <BrandedOpenGraph
      eyebrow="AI Kickstart"
      headline="AI training built on your team's work."
      supporting="One day, or two half days, built on your team's own work."
    />,
    size,
  );
}
