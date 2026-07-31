import {
  ArrowRight,
  Database,
  FlaskConical,
} from "lucide-react";

import heroImage from "../../../assets/images/hero/nugeo-hero.webp";

export function HeroSection() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate min-h-[700px] overflow-hidden bg-nugeo-navy-950 text-white"
    >
      {/* Imagem de fundo */}
      <img
        src={heroImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-30 h-full w-full object-cover object-[65%_center]"
      />

      {/* Contraste horizontal */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(3,28,53,0.98)_0%,rgba(3,28,53,0.92)_28%,rgba(3,28,53,0.62)_52%,rgba(3,28,53,0.18)_78%,transparent_100%)]"
      />

      {/* Profundidade inferior */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(3,28,53,0.04)_35%,rgba(3,28,53,0.18)_70%,rgba(3,28,53,0.58)_100%)]"
      />

      {/* Conteúdo */}
      <div className="mx-auto flex min-h-[700px] w-full max-w-[1360px] items-center px-6 pb-32 pt-24 sm:px-8 sm:pb-36 lg:px-16 lg:pb-40 lg:pt-28">
        <div className="max-w-[720px]">
          

          <h1
            id="hero-title"
            className="max-w-[700px] text-balance text-[clamp(2.7rem,5vw,4.30em)] font-extrabold leading-[1.04] tracking-[-0.045em]"
          >
            Ciência, monitoramento e inovação para o

            <span className="mt-2 block text-nugeo-blue-500">
               território maranhense
            </span>
          </h1>

          <p className="mt-6 max-w-[650px] text-pretty text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
            Produzimos conhecimento, dados e soluções em meteorologia,
            recursos hídricos, geotecnologias e estudos ambientais para
            apoiar decisões e promover qualidade de vida.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#laboratorios"
              className={[
                "group inline-flex min-h-[52px] items-center justify-center ",
                "rounded-[5px] bg-nugeo-blue-500 border border-white/35 text-nugeo-blue-500 px-6",
                "text-sm font-semibold text-white",
                "transition duration-200",
                "hover:-translate-y-0.5 hover:bg-white/10 hover:text-white",
                "focus-visible:outline-2 focus-visible:outline-offset-4",
                "focus-visible:outline-nugeo-blue-500",
              ].join(" ")}
            >
              Conhecer laboratórios

              <FlaskConical
                aria-hidden="true"
                className="h-[18px] w-[18px]"
                strokeWidth={1.8}
              />
            </a>

            <a
              href="#dados"
              className={[
                "group inline-flex min-h-[52px] items-center justify-center gap-3",
                "rounded-[5px] border border-white/35",
                "bg-nugeo-navy-950/25 px-6",
                "text-sm font-semibold text-white backdrop-blur-sm",
                "transition duration-200",
                "hover:-translate-y-0.5 hover:border-white/55 hover:bg-white/10",
                "focus-visible:outline-2 focus-visible:outline-offset-4",
                "focus-visible:outline-white",
              ].join(" ")}
            >
              Acessar dados e produtos

              <Database
                aria-hidden="true"
                className="h-[18px] w-[18px]"
                strokeWidth={1.8}
              />
            </a>

               <a
            href="/sobre"
            className={[
                "group inline-flex min-h-[52px] items-center justify-center gap-3",
                "rounded-[5px] border border-white/35",
                "bg-nugeo-navy-950/25 px-6",
                "text-sm font-semibold text-white backdrop-blur-sm",
                "transition duration-200",
                "hover:-translate-y-0.5 hover:border-white/55 hover:bg-white/10",
                "focus-visible:outline-2 focus-visible:outline-offset-4",
                "focus-visible:outline-white",
              ].join(" ")}
          >
            Conheça o NUGEO

            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>

          </div>

         
        </div>
      </div>
    </section>
  );
}