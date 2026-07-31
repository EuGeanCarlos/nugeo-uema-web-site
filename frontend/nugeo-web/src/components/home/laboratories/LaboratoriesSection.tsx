import {
  ArrowRight,
  FlaskConical,
} from "lucide-react";

import {
  laboratories,
  type Laboratory,
} from "../../../data/laboratories";

interface LaboratoryCardProps {
  laboratory: Laboratory;
}

function LaboratoryCard({
  laboratory,
}: LaboratoryCardProps) {
  const Icon = laboratory.icon;

  return (
    <li className="h-full">
      <a
        href={laboratory.href}
        aria-label={`Conhecer o ${laboratory.title}`}
        className={[
          "group grid h-full min-h-[220px]",
          "grid-cols-[118px_1fr] overflow-hidden",
          "rounded-[5px] border border-slate-200",
          "bg-white",
          "transition duration-200",
          "hover:-translate-y-1",
          "hover:border-blue-200",
          "hover:shadow-[0_16px_38px_rgba(15,35,65,0.09)]",
          "focus-visible:outline-2",
          "focus-visible:outline-offset-4",
          "focus-visible:outline-nugeo-blue-600",
          "sm:grid-cols-[142px_1fr]",
        ].join(" ")}
      >
        {/* Imagem */}
        <div className="relative min-h-full overflow-hidden bg-slate-100">
          <img
            src={laboratory.image}
            alt={laboratory.imageAlt}
            className={[
              "absolute inset-0 h-full w-full object-cover",
              "transition-transform duration-500",
              "group-hover:scale-[1.035]",
            ].join(" ")}
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-slate-950/12 to-transparent"
          />
        </div>

        {/* Conteúdo */}
        <div className="flex min-w-0 flex-col px-5 py-6 sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[5px] bg-blue-50 text-nugeo-blue-600">
                  <Icon
                    aria-hidden="true"
                    className="h-4 w-4"
                    strokeWidth={1.8}
                  />
                </span>

                <span className="text-xs font-bold uppercase tracking-[0.12em] text-nugeo-blue-600">
                  {laboratory.acronym}
                </span>
              </div>

              <h3 className="mt-4 text-lg font-bold leading-[1.25] tracking-[-0.025em] text-slate-950">
                {laboratory.title}
              </h3>
            </div>
          </div>

          <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
            {laboratory.description}
          </p>

          <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">
            <span className="text-sm font-semibold text-nugeo-blue-600 transition-colors group-hover:text-nugeo-blue-500">
              Saiba mais
            </span>

            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 text-nugeo-blue-600 transition-transform duration-200 group-hover:translate-x-1"
              strokeWidth={1.8}
            />
          </div>
        </div>
      </a>
    </li>
  );
}

export function LaboratoriesSection() {
  return (
    <section
      id="laboratorios"
      aria-labelledby="laboratories-title"
      className="bg-white py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1360px] px-6 sm:px-8 lg:px-16">
        {/* Cabeçalho centralizado */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="flex items-center justify-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-nugeo-green-500"
            />

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-nugeo-green-600">
              Estrutura científica
            </p>

            <span
              aria-hidden="true"
              className="h-px w-8 bg-nugeo-green-500"
            />
          </div>

          <h2
            id="laboratories-title"
            className="mt-4 text-balance text-3xl font-bold leading-tight tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-[2.8rem]"
          >
            Laboratórios e unidades técnicas
          </h2>

          <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Conheça os espaços onde ciência, tecnologia e
            monitoramento ambiental são transformados em informação
            para o Maranhão.
          </p>
        </div>

        {/* Cards */}
        <ul className="mt-14 grid items-stretch gap-5 xl:grid-cols-3">
          {laboratories.map((laboratory) => (
            <LaboratoryCard
              key={laboratory.id}
              laboratory={laboratory}
            />
          ))}
        </ul>

        {/* Ação geral */}
        <div className="mt-10 flex justify-center">
          <a
            href="/laboratorios"
            className={[
              "group inline-flex min-h-12 items-center justify-center gap-3",
              "rounded-[5px]border border-slate-300 bg-white px-6",
              "text-sm font-semibold text-slate-700",
              "transition duration-200",
              "hover:border-blue-200 hover:bg-blue-50",
              "hover:text-nugeo-blue-600",
              "focus-visible:outline-2",
              "focus-visible:outline-offset-4",
              "focus-visible:outline-nugeo-blue-600",
            ].join(" ")}
          >
            <FlaskConical
              aria-hidden="true"
              className="h-[18px] w-[18px]"
              strokeWidth={1.8}
            />

            Ver todos os laboratórios

            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              strokeWidth={1.8}
            />
          </a>
        </div>
      </div>
    </section>
  );
}