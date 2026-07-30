import {
  ArrowRight,
  ArrowUpRight,
  FlaskConical,
} from "lucide-react";

import {
  laboratories,
  type Laboratory,
  type LaboratoryAccent,
} from "../../../data/laboratories";

interface AccentClasses {
  badge: string;
  icon: string;
  tag: string;
  glow: string;
  line: string;
}

function getAccentClasses(
  accent: LaboratoryAccent,
): AccentClasses {
  switch (accent) {
    case "cyan":
      return {
        badge:
          "border-cyan-300/25 bg-cyan-400/10 text-cyan-100",
        icon:
          "border-cyan-300/20 bg-cyan-300/10 text-cyan-200",
        tag:
          "border-cyan-200/15 bg-cyan-200/[0.06] text-cyan-50/80",
        glow:
          "bg-[radial-gradient(circle_at_82%_8%,rgba(34,211,238,0.22),transparent_38%)]",
        line: "bg-cyan-300",
      };

    case "green":
      return {
        badge:
          "border-emerald-300/25 bg-emerald-400/10 text-emerald-100",
        icon:
          "border-emerald-300/20 bg-emerald-300/10 text-emerald-200",
        tag:
          "border-emerald-200/15 bg-emerald-200/[0.06] text-emerald-50/80",
        glow:
          "bg-[radial-gradient(circle_at_82%_8%,rgba(52,211,153,0.22),transparent_38%)]",
        line: "bg-emerald-300",
      };

    case "blue":
    default:
      return {
        badge:
          "border-blue-300/25 bg-blue-400/10 text-blue-100",
        icon:
          "border-blue-300/20 bg-blue-300/10 text-blue-200",
        tag:
          "border-blue-200/15 bg-blue-200/[0.06] text-blue-50/80",
        glow:
          "bg-[radial-gradient(circle_at_82%_8%,rgba(59,130,246,0.24),transparent_38%)]",
        line: "bg-blue-300",
      };
  }
}

interface LaboratoryCardProps {
  laboratory: Laboratory;
  index: number;
}

function LaboratoryCard({
  laboratory,
  index,
}: LaboratoryCardProps) {
  const Icon = laboratory.icon;
  const accent = getAccentClasses(laboratory.accent);

  return (
    <li className="h-full">
      <a
        href={laboratory.href}
        aria-label={`Conhecer o ${laboratory.title}`}
        className={[
          "group relative isolate flex min-h-[520px] h-full overflow-hidden",
          "rounded-3xl border border-white/10 bg-slate-950",
          "transition duration-300",
          "hover:-translate-y-1.5 hover:border-white/20",
          "hover:shadow-[0_28px_70px_rgba(0,0,0,0.28)]",
          "focus-visible:outline-2 focus-visible:outline-offset-4",
          "focus-visible:outline-emerald-300",
        ].join(" ")}
      >
        {/* Imagem */}
        <div
          aria-hidden="true"
          className={[
            "absolute inset-0 -z-30 bg-cover bg-center",
            "transition-transform duration-700 ease-out",
            "group-hover:scale-[1.035]",
          ].join(" ")}
          style={{
            backgroundImage: `url("${laboratory.image}")`,
          }}
        />

        {/* Fallback visual e cor característica */}
        <div
          aria-hidden="true"
          className={[
            "absolute inset-0 -z-20",
            "bg-[linear-gradient(145deg,#0b2946_0%,#061b31_48%,#03111f_100%)]",
            accent.glow,
          ].join(" ")}
        />

        {/* Overlay para legibilidade */}
        <div
          aria-hidden="true"
          className={[
            "absolute inset-0 -z-10",
            "bg-[linear-gradient(180deg,rgba(3,17,31,0.08)_0%,rgba(3,17,31,0.20)_34%,rgba(3,17,31,0.78)_68%,rgba(3,17,31,0.98)_100%)]",
          ].join(" ")}
        />

        <div className="flex w-full flex-col p-6 sm:p-7">
          {/* Cabeçalho do card */}
          <div className="flex items-start justify-between gap-5">
            <div className="flex items-center gap-3">
              <span
                className={[
                  "inline-flex min-h-8 items-center rounded-full border px-3",
                  "text-[0.68rem] font-bold tracking-[0.14em]",
                  "backdrop-blur-md",
                  accent.badge,
                ].join(" ")}
              >
                {laboratory.acronym}
              </span>

              <span className="text-[0.68rem] font-semibold tracking-[0.08em] text-white/45">
                0{index + 1}
              </span>
            </div>

            <span
              aria-hidden="true"
              className={[
                "flex h-11 w-11 shrink-0 items-center justify-center",
                "rounded-full border backdrop-blur-md",
                "transition duration-300",
                "group-hover:rotate-6 group-hover:bg-white group-hover:text-nugeo-navy-950",
                accent.icon,
              ].join(" ")}
            >
              <ArrowUpRight
                className="h-5 w-5"
                strokeWidth={1.8}
              />
            </span>
          </div>

          {/* Espaço visual */}
          <div className="flex-1" />

          {/* Conteúdo */}
          <div>
            <span
              className={[
                "flex h-11 w-11 items-center justify-center",
                "rounded-xl border backdrop-blur-md",
                accent.icon,
              ].join(" ")}
            >
              <Icon
                aria-hidden="true"
                className="h-5 w-5"
                strokeWidth={1.7}
              />
            </span>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.13em] text-white/55">
              {laboratory.area}
            </p>

            <h3 className="mt-3 max-w-sm text-2xl font-bold leading-[1.14] tracking-[-0.035em] text-white sm:text-[1.7rem]">
              {laboratory.title}
            </h3>

            <p className="mt-4 max-w-md text-sm leading-6 text-white/67">
              {laboratory.description}
            </p>

            <ul
              aria-label={`Áreas de atuação do ${laboratory.acronym}`}
              className="mt-6 flex flex-wrap gap-2"
            >
              {laboratory.tags.map((tag) => (
                <li
                  key={tag}
                  className={[
                    "rounded-full border px-3 py-1.5",
                    "text-[0.67rem] font-medium",
                    "backdrop-blur-sm",
                    accent.tag,
                  ].join(" ")}
                >
                  {tag}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
              <span className="text-sm font-semibold text-white">
                Conhecer laboratório
              </span>

              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 text-white/60 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-white"
                strokeWidth={1.8}
              />
            </div>
          </div>

          <span
            aria-hidden="true"
            className={[
              "absolute bottom-0 left-0 h-[3px] w-0",
              "transition-all duration-500 group-hover:w-full",
              accent.line,
            ].join(" ")}
          />
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
      className="relative isolate overflow-hidden bg-nugeo-navy-950 py-24 text-white sm:py-28 lg:py-32"
    >
      {/* Fundo científico sutil */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_8%_5%,rgba(9,103,210,0.16),transparent_28%),radial-gradient(circle_at_92%_92%,rgba(24,184,139,0.12),transparent_32%)]"
      />

      <div
        aria-hidden="true"
        className={[
          "absolute inset-0 -z-10 opacity-[0.045]",
          "bg-[linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)]",
          "bg-[size:72px_72px]",
        ].join(" ")}
      />

      <div className="mx-auto w-full max-w-[1360px] px-6 sm:px-8 lg:px-16">
        {/* Cabeçalho */}
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-emerald-300"
              />

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">
                Estrutura científica
              </p>
            </div>

            <h2
              id="laboratories-title"
              className="mt-4 text-balance text-3xl font-bold leading-tight tracking-[-0.04em] text-white sm:text-4xl lg:text-[2.9rem]"
            >
              Laboratórios que transformam dados em conhecimento
            </h2>

            <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
              Conheça as unidades responsáveis pelas pesquisas,
              monitoramentos e produtos técnicos desenvolvidos pelo NUGEO.
            </p>
          </div>

          <div className="flex flex-col items-start gap-5 lg:items-end">
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-300/10 text-emerald-200">
                <FlaskConical
                  aria-hidden="true"
                  className="h-5 w-5"
                  strokeWidth={1.7}
                />
              </span>

              <div>
                <strong className="block text-lg font-bold leading-none text-white">
                  03
                </strong>

                <span className="mt-1 block text-xs text-white/50">
                  unidades especializadas
                </span>
              </div>
            </div>

            <a
              href="/laboratorios"
              className={[
                "group inline-flex items-center gap-2",
                "text-sm font-semibold text-white",
                "transition-colors hover:text-emerald-300",
                "focus-visible:rounded-md focus-visible:outline-2",
                "focus-visible:outline-offset-4 focus-visible:outline-emerald-300",
              ].join(" ")}
            >
              Ver todos os laboratórios

              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                strokeWidth={1.8}
              />
            </a>
          </div>
        </div>

        {/* Cards */}
        <ul className="mt-14 grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
          {laboratories.map((laboratory, index) => (
            <LaboratoryCard
              key={laboratory.id}
              laboratory={laboratory}
              index={index}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}