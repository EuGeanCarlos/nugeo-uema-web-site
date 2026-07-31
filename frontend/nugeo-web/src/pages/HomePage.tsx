import { HeroSection } from "../components/home/hero/HeroSection";
import { IndicatorsSection } from "../components/home/indicators/IndicatorsSection";
import { LaboratoriesSection } from "../components/home/laboratories/LaboratoriesSection";
import { NewsSection } from "../components/home/news/NewsSection";
import { QuickAccessSection } from "../components/home/quick-access/QuickAccessSection";
import { Header } from "../components/layout/header/Header";
import { Footer } from "../components/layout/footer/Footer";

export function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Header />

      <main id="conteudo-principal">
        <HeroSection />
        <IndicatorsSection />
        <QuickAccessSection />
        <LaboratoriesSection />
        <NewsSection />
      </main>

        <Footer />

    </div>
  );
}