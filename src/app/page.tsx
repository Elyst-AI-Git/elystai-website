import Hero from "@/components/home/Hero";
import ProofBar from "@/components/home/ProofBar";
import AiosTeaser from "@/components/home/AiosTeaser";

export default function Home() {
  return (
    <main id="main" className="flex-1 pt-24">
      <Hero />
      <ProofBar />
      <AiosTeaser />
    </main>
  );
}
