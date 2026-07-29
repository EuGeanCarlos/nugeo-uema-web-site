import {
  ArrowRight,
  CalendarDays,
  Database,
  FileText,
  FlaskConical,
  Map,
  Users,
} from "lucide-react";

import heroImage from "../../../assets/images/hero/nugeo-hero.webp";

const metrics = [
  {
    value: "25+",
    label: "Anos de atuação",
    icon: CalendarDays,
    accent: "blue",
  },
  {
    value: "217",
    label: "Municípios monitorados",
    icon: Map,
    accent: "blue",
  },
  {
    value: "30+",
    label: "Pesquisadores e técnicos",
    icon: Users,
    accent: "green",
  },
  {
    value: "15+",
    label: "Projetos em andamento",
    icon: FileText,
    accent: "green",
  },
  {
    value: "2.000+",
    label: "Boletins publicados",
    icon: Database,
    accent: "blue",
  },
  {
    value: "10+",
    label: "Laboratórios e núcleos",
    icon: FlaskConical,
    accent: "green",
  },
] as const;

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-nugeo-navy-950 pb-8 text-white lg:overflow-visible lg:pb-20"
    >
      {/* Imagem de fundo */}
      <img
        src={heroImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-30 h-full w-full object-cover object-[65%_center]"
      />

      {/* Camada de contraste localizada */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(3,28,53,0.98)_0%,rgba(3,28,53,0.9)_30%,rgba(3,28,53,0.58)_53%,rgba(3,28,53,0.16)_78%,transparent_100%)]"
      />

      {/* Profundidade na parte inferior */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent_52%,rgba(3,28,53,0.2)_76%,rgba(3,28,53,0.68)_100%)]"
      />

      <div className="mx-auto flex min-h-[680px] w-full max-w-[1360px] items-center px-6 pb-40 pt-24 sm:px-8 lg:min-h-[720px] lg:px-16 lg:pb-48 lg:pt-28">
        <div className="max-w-[720px]">
          {/* Eyebrow */}
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/20 bg-nugeo-navy-950/20 px-4 py-2.5 backdrop-blur-sm">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-nugeo-green-400 shadow-[0_0_0_5px_rgba(45,212,164,0.12)]"
            />

            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white/80">
              Ciência para o desenvolvimento sustentável
            </span>
          </div>

          {/* Título */}
          <h1
            id="hero-title"
            className="max-w-[700px] text-balance text-[clamp(2.7rem,5vw,4.65rem)] font-extrabold leading-[1.04] tracking-[-0.045em]"
          >
            Ciência, tecnologia e monitoramento ambiental
            <span className="mt-2 block text-nugeo-blue-500">
              para o Maranhão
            </span>
          </h1>

          {/* Descrição */}
          <p className="mt-6 max-w-[650px] text-pretty text-base leading-7 text-white/78 sm:text-lg sm:leading-8">
            Produzimos conhecimento, dados e soluções em meteorologia,
            recursos hídricos, geotecnologias e estudos ambientais para
            apoiar decisões e promover qualidade de vida.
          </p>

          {/* Ações */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#laboratorios"
              className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-[10px] bg-nugeo-blue-500 px-6 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-nugeo-blue-400 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-nugeo-blue-400"
            >
              Conhecer laboratórios

              <FlaskConical
                aria-hidden="true"
                className="h-4.5 w-4.5 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>

            <a
              href="#boletins"
              className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-[10px] border border-white/35 bg-nugeo-navy-950/25 px-6 text-sm font-semibold text-white backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-white/55 hover:bg-white/10 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Acessar dados e boletins

              <Database
                aria-hidden="true"
                className="h-4.5 w-4.5"
              />
            </a>
          </div>

          <a
            href="#sobre"
            className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/72 transition hover:text-white"
          >
            Conheça o NUGEO

            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>

      {/* Painel de indicadores */}
      <div className="relative z-10 mx-auto -mt-32 w-full max-w-[1360px] px-4 sm:px-8 lg:absolute lg:inset-x-0 lg:-bottom-16 lg:mt-0 lg:px-16">
        <ul
          aria-label="Indicadores institucionais do NUGEO"
          className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(3,28,53,0.12)] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
        >
          {metrics.map((metric) => {
            const Icon = metric.icon;
            const isGreen = metric.accent === "green";

            return (
              <li
                key={metric.label}
                className="relative flex min-h-28 items-center gap-4 border-b border-slate-200 px-5 py-5 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:[&:nth-last-child(-n+3)]:border-b-0 xl:min-h-32 xl:border-b-0 xl:border-r xl:last:border-r-0"
              >
                <span
                  className={[
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border",
                    isGreen
                      ? "border-emerald-100 bg-emerald-50 text-nugeo-green-600"
                      : "border-blue-100 bg-blue-50 text-nugeo-blue-600",
                  ].join(" ")}
                >
                  <Icon aria-hidden="true" className="h-5.5 w-5.5" />
                </span>

                <span className="min-w-0">
                  <strong
                    className={[
                      "block text-[1.45rem] font-bold leading-none tracking-[-0.025em]",
                      isGreen
                        ? "text-nugeo-green-600"
                        : "text-nugeo-blue-600",
                    ].join(" ")}
                  >
                    {metric.value}
                  </strong>

                  <span className="mt-2 block max-w-32 text-xs font-medium leading-4 text-slate-600">
                    {metric.label}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}