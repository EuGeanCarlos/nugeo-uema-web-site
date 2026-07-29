import {
  institutionalIndicators,
  type IndicatorAccent,
} from "../../../data/indicators";

function getAccentClasses(accent: IndicatorAccent) {
  if (accent === "green") {
    return {
      iconContainer:
        "border-emerald-100 bg-emerald-50 text-nugeo-green-600",
      value: "text-nugeo-green-600",
      line: "bg-nugeo-green-500",
    };
  }

  return {
    iconContainer: "border-blue-100 bg-blue-50 text-nugeo-blue-600",
    value: "text-nugeo-blue-600",
    line: "bg-nugeo-blue-600",
  };
}

export function IndicatorsSection() {
  return (
    <section
      aria-labelledby="indicators-title"
      className="relative z-20 -mt-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-[1232px]">
        <h2 id="indicators-title" className="sr-only">
          Indicadores institucionais do NUGEO
        </h2>

        <ul className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_55px_rgba(3,28,53,0.12)] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {institutionalIndicators.map((indicator) => {
            const Icon = indicator.icon;
            const accent = getAccentClasses(indicator.accent);

            return (
              <li
                key={indicator.id}
                className={[
                  "group relative flex min-h-[148px] items-center gap-4",
                  "border-b border-slate-200 px-5 py-6",
                  "transition-colors duration-200 hover:bg-slate-50/80",
                  "sm:[&:nth-last-child(-n+2)]:border-b-0",
                  "lg:[&:nth-last-child(-n+3)]:border-b-0",
                  "xl:min-h-[154px] xl:border-b-0 xl:border-r",
                  "xl:last:border-r-0",
                ].join(" ")}
              >
                <span
                  aria-hidden="true"
                  className={[
                    "flex h-11 w-11 shrink-0 items-center justify-center",
                    "rounded-xl border transition-transform duration-200",
                    "group-hover:-translate-y-0.5",
                    accent.iconContainer,
                  ].join(" ")}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>

                <span className="min-w-0">
                  <strong
                    className={[
                      "block text-[1.55rem] font-bold leading-none",
                      "tracking-[-0.035em]",
                      accent.value,
                    ].join(" ")}
                  >
                    {indicator.value}
                  </strong>

                  <span className="mt-2 block text-xs font-semibold leading-4 text-slate-700">
                    {indicator.label}
                  </span>

                  <span className="sr-only">
                    {indicator.description}
                  </span>
                </span>

                <span
                  aria-hidden="true"
                  className={[
                    "absolute bottom-0 left-0 h-[2px] w-0",
                    "transition-all duration-300 group-hover:w-full",
                    accent.line,
                  ].join(" ")}
                />
              </li>
            );
          })}
        </ul>

       
      </div>
    </section>
  );
}