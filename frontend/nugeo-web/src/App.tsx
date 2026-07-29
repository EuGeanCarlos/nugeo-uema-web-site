import { HeroSection } from "./components/home/hero/HeroSection";
import { Header } from "./components/layout/header/Header";

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50">
      <Header />

      <main id="conteudo-principal">
        <div id="inicio">
          <HeroSection />
        </div>

        <section
          id="laboratorios"
          aria-labelledby="laboratorios-title"
          className="mx-auto w-full max-w-[1360px] px-6 py-24 sm:px-8 lg:px-16 lg:pb-32 lg:pt-36"
        >
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-nugeo-green-600">
              Estrutura científica
            </p>

            <h2
              id="laboratorios-title"
              className="mt-4 text-balance text-3xl font-bold tracking-[-0.035em] text-slate-950 sm:text-4xl lg:text-5xl"
            >
              Laboratórios e unidades técnicas
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Conheça os ambientes onde pesquisadores e equipes técnicas
              transformam dados ambientais em conhecimento para o Maranhão.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;