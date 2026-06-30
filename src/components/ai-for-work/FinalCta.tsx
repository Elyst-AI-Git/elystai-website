import { BrandButton } from "@/components/ui/brand-button";
import { CtaBanner } from "@/components/ui/cta-banner";

/**
 * AI for Work close — the shared green CtaBanner with one last push and the
 * enrol action, matching the AIOS and Accelerator closes. The light pre-footer
 * follows, so no dark footer-blend is needed here.
 */
export default function FinalCta() {
  return (
    <CtaBanner
      headingSize="calc(var(--text-h2) - 3px)"
      heading={
        <>
          You are already behind.
          <br />
          Change that in two weeks.
        </>
      }
      actions={
        <BrandButton href="#enrol" tone="emerald">
          Join AI for Work
        </BrandButton>
      }
    />
  );
}
