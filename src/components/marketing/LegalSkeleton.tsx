import PageHero from "@/components/marketing/PageHero";
import {
  LocalPreviewOnly,
  MarketingSection,
  NeedsPlaceholder,
} from "@/components/marketing/MarketingPrimitives";

const LAST_UPDATED = "12 August 2026";

export default function LegalSkeleton({ title }: { title: "Privacy" | "Terms" }) {
  return (
    <main id="main" className="flex-1 pt-24">
      <PageHero title={title} />
      <MarketingSection>
        <p className="text-fg-3" style={{ fontSize: "var(--text-small)" }}>Last updated: {LAST_UPDATED}</p>
      </MarketingSection>
      <LocalPreviewOnly>
        <MarketingSection tone="muted">
          <NeedsPlaceholder className="max-w-4xl">[NEEDS: written against the tools actually deployed, legally reviewed.]</NeedsPlaceholder>
        </MarketingSection>
      </LocalPreviewOnly>
    </main>
  );
}
