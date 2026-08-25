import { ImageResponse } from "next/og";
import BrandedOpenGraph from "@/components/seo/BrandedOpenGraph";

export const alt = "Practical AI training for business teams by Elyst AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <BrandedOpenGraph
      eyebrow="Training"
      headline="AI training built around real work."
      supporting="Role-specific sessions using your team, your tools, and your workflows."
    />,
    size,
  );
}
