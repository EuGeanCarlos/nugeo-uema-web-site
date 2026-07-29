import { HeroSection } from "../components/home/hero/HeroSection";
import { IndicatorsSection } from "../components/home/indicators/IndicatorsSection";
import { QuickAccessSection } from "../components/home/quick-access/QuickAccessSection";
import { Header } from "../components/layout/header/Header";

export function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Header />

      <main id="conteudo-principal">
        <HeroSection />
        <IndicatorsSection />
        <QuickAccessSection />
      </main>
    </div>
  );
}