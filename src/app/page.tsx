import Hero from "@/components/home/Hero";
import ProofBar from "@/components/home/ProofBar";
import AiosTeaser from "@/components/home/AiosTeaser";
import AcceleratorTeaser from "@/components/home/AcceleratorTeaser";
import Founders from "@/components/home/Founders";

export default function Home() {
  return (
    <main id="main" className="flex-1 pt-24">
      <Hero />
      <ProofBar />
      <AiosTeaser />
      <AcceleratorTeaser />
      <Founders />
    </main>
  );
}
