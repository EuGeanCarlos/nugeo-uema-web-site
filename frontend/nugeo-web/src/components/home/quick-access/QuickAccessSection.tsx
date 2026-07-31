import { ArrowRight, Database } from "lucide-react";

import {
  quickAccessItems,
  type QuickAccessAccent,
} from "../../../data/quickAccess";

interface AccentClasses {
  icon: string;
  status: string;
  line: string;
  glow: string;
}

function getAccentClasses(
  accent: QuickAccessAccent,
): AccentClasses {
  switch (accent) {
    case "green":
      return {
        icon:
          "border-emerald-100 bg-emerald-50 text-nugeo-green-600",
        status: "text-nugeo-green-700",
        line: "bg-nugeo-green-500",
        glow:
          "group-hover:shadow-[0_22px_55px_rgba(24,184,139,0.10)]",
      };

    case "cyan":
      return {
        icon:
          "border-cyan-100 bg-cyan-50 text-cyan-700",
        status: "text-cyan-700",
        line: "bg-cyan-600",
        glow:
          "group-hover:shadow-[0_22px_55px_rgba(8,145,178,0.10)]",
      };

    case "blue":
    default:
      return {
        icon:
          "border-blue-100 bg-blue-50 text-nugeo-blue-600",
        status: "text-nugeo-blue-600",
        line: "bg-nugeo-blue-600",
        glow:
          "group-hover:shadow-[0_22px_55px_rgba(9,103,210,0.10)]",
      };
  }
}

export function QuickAccessSection() {
  return (
    <section
      id="dados"
      aria-labelledby="quick-access-title"
      className="bg-slate-50 py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1360px] px-6 sm:px-8 lg:px-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="flex items-center justify-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-nugeo-green-500"
            />

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-nugeo-green-600">
              Acesso rápido
            </p>

            <span
              aria-hidden="true"
              className="h-px w-8 bg-nugeo-green-500"
            />
          </div>

          <h2
            id="quick-access-title"
            className="mt-4 text-balance text-center text-3xl font-bold leading-tight tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-[2.8rem]"
          >
            Dados ambientais para o Maranhão
          </h2>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {quickAccessItems.map((item) => {
            const Icon = item.icon;
            const accent = getAccentClasses(item.accent);

            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={[
                    "group relative flex h-full min-h-[250px] flex-col",
                    "overflow-hidden rounded-[5px] border border-slate-200",
                    "bg-white p-6 sm:p-7",
                    "transition duration-200",
                    "hover:-translate-y-1 hover:border-slate-300",
                    accent.glow,
                    "focus-visible:outline-2 focus-visible:outline-offset-4",
                    "focus-visible:outline-nugeo-blue-600",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      aria-hidden="true"
                      className={[
                        "flex h-12 w-12 shrink-0 items-center justify-center",
                        "rounded-[5px] border transition-transform duration-200",
                        "group-hover:-translate-y-0.5",
                        accent.icon,
                      ].join(" ")}
                    >
                      <Icon
                        className="h-6 w-6"
                        strokeWidth={1.7}
                      />
                    </span>

                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition duration-200 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-nugeo-blue-600"
                    >
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                        strokeWidth={1.8}
                      />
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-bold tracking-[-0.03em] text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-5">
                    <span
                      aria-hidden="true"
                      className={[
                        "h-1.5 w-1.5 rounded-full",
                        accent.line,
                      ].join(" ")}
                    />

                    <span
                      className={[
                        "text-xs font-semibold",
                        accent.status,
                      ].join(" ")}
                    >
                      {item.status}
                    </span>
                  </div>

                  <span
                    aria-hidden="true"
                    className={[
                      "absolute bottom-0 left-0 h-[3px] w-0",
                      "transition-all duration-300 group-hover:w-full",
                      accent.line,
                    ].join(" ")}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:hidden">
          <a
            href="/dados"
            className={[
              "inline-flex min-h-12 items-center justify-center gap-3",
              "rounded-xl border border-slate-300 bg-white px-6",
              "text-sm font-semibold text-slate-700",
              "transition-colors hover:border-blue-200",
              "hover:bg-blue-50 hover:text-nugeo-blue-600",
            ].join(" ")}
          >
            <Database
              aria-hidden="true"
              className="h-[18px] w-[18px]"
              strokeWidth={1.8}
            />

            Explorar todos os produtos
          </a>

          <a
            href="/dados"
            className={[
              "group inline-flex w-fit items-center gap-2",
              "text-sm font-semibold text-nugeo-blue-600",
              "transition-colors duration-200 hover:text-nugeo-blue-500",
              "focus-visible:rounded-md focus-visible:outline-2",
              "focus-visible:outline-offset-4 focus-visible:outline-nugeo-blue-600",
            ].join(" ")}
          >
            Ver todos os dados e produtos

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