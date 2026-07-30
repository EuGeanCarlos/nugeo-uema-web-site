import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Newspaper,
} from "lucide-react";

import {
  newsItems,
  type NewsItem,
} from "../../../data/news";

interface NewsLinkProps {
  target?: "_blank";
  rel?: "noreferrer";
}

function getNewsLinkProps(
  news: NewsItem,
): NewsLinkProps {
  if (!news.external) {
    return {};
  }

  return {
    target: "_blank",
    rel: "noreferrer",
  };
}

interface NewsVisualProps {
  news: NewsItem;
  featured?: boolean;
}

function NewsVisual({
  news,
  featured = false,
}: NewsVisualProps) {
  return (
    <div
      aria-hidden="true"
      className={[
        "relative overflow-hidden bg-slate-200",
        featured
          ? "min-h-[280px] sm:min-h-[340px] lg:min-h-[390px]"
          : "min-h-[170px] sm:min-h-full",
      ].join(" ")}
    >
      <div
        className={[
          "absolute inset-0 bg-cover bg-center",
          "transition-transform duration-700 ease-out",
          "group-hover:scale-[1.035]",
        ].join(" ")}
        style={{
          backgroundImage: `
            linear-gradient(
              180deg,
              rgba(3, 28, 53, 0.04) 0%,
              rgba(3, 28, 53, 0.18) 100%
            ),
            url("${news.image}")
          `,
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_12%,rgba(24,184,139,0.16),transparent_34%)]" />

      <span className="absolute left-5 top-5 inline-flex items-center rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-nugeo-blue-600 shadow-sm backdrop-blur-sm">
        {news.category}
      </span>
    </div>
  );
}

interface SecondaryNewsCardProps {
  news: NewsItem;
}

function SecondaryNewsCard({
  news,
}: SecondaryNewsCardProps) {
  return (
    <li>
      <a
        href={news.href}
        {...getNewsLinkProps(news)}
        aria-label={`Ler notícia: ${news.title}`}
        className={[
          "group grid h-full overflow-hidden",
          "rounded-2xl border border-slate-200 bg-white",
          "transition duration-200",
          "hover:-translate-y-0.5 hover:border-blue-200",
          "hover:shadow-[0_14px_36px_rgba(15,35,65,0.08)]",
          "focus-visible:outline-2",
          "focus-visible:outline-offset-4",
          "focus-visible:outline-nugeo-blue-600",
          "sm:grid-cols-[180px_1fr]",
          "lg:grid-cols-[155px_1fr]",
        ].join(" ")}
      >
        <NewsVisual news={news} />

        <div className="flex min-w-0 flex-col p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <time
              dateTime={news.dateTime}
              className="inline-flex items-center gap-2 text-xs font-medium text-slate-500"
            >
              <CalendarDays
                aria-hidden="true"
                className="h-3.5 w-3.5"
                strokeWidth={1.8}
              />

              {news.date}
            </time>

            {news.external && (
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-nugeo-blue-600"
                strokeWidth={1.8}
              />
            )}
          </div>

          <h3 className="mt-3 text-lg font-bold leading-[1.3] tracking-[-0.025em] text-slate-950 transition-colors group-hover:text-nugeo-blue-600">
            {news.title}
          </h3>

          <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
            {news.excerpt}
          </p>

          <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-nugeo-blue-600">
            Ler notícia

            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              strokeWidth={1.8}
            />
          </div>
        </div>
      </a>
    </li>
  );
}

export function NewsSection() {
  const featuredNews =
    newsItems.find((news) => news.featured) ??
    newsItems[0];

  const secondaryNews = newsItems
    .filter((news) => news.id !== featuredNews?.id)
    .slice(0, 3);

  if (!featuredNews) {
    return null;
  }

  return (
    <section
      id="noticias"
      aria-labelledby="news-title"
      className="bg-slate-50 py-24 sm:py-28 lg:py-32"
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
              Notícias e atualizações
            </p>

            <span
              aria-hidden="true"
              className="h-px w-8 bg-nugeo-green-500"
            />
          </div>

          <h2
            id="news-title"
            className="mt-4 text-balance text-3xl font-bold leading-tight tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-[2.8rem]"
          >
            Acompanhe as atividades do NUGEO
          </h2>

          <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Notícias, pesquisas, monitoramentos e informações
            produzidas pelas equipes e laboratórios do Núcleo
            Geoambiental.
          </p>
        </div>

        {/* Conteúdo */}
        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(380px,0.85fr)]">
          {/* Notícia principal */}
          <article className="h-full">
            <a
              href={featuredNews.href}
              {...getNewsLinkProps(featuredNews)}
              aria-label={`Ler notícia em destaque: ${featuredNews.title}`}
              className={[
                "group flex h-full flex-col overflow-hidden",
                "rounded-3xl border border-slate-200 bg-white",
                "transition duration-200",
                "hover:-translate-y-1 hover:border-blue-200",
                "hover:shadow-[0_20px_50px_rgba(15,35,65,0.09)]",
                "focus-visible:outline-2",
                "focus-visible:outline-offset-4",
                "focus-visible:outline-nugeo-blue-600",
              ].join(" ")}
            >
              <NewsVisual
                news={featuredNews}
                featured
              />

              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <time
                    dateTime={featuredNews.dateTime}
                    className="inline-flex items-center gap-2 text-xs font-medium text-slate-500"
                  >
                    <CalendarDays
                      aria-hidden="true"
                      className="h-4 w-4"
                      strokeWidth={1.8}
                    />

                    {featuredNews.date}
                  </time>

                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-nugeo-green-600">
                    <Newspaper
                      aria-hidden="true"
                      className="h-4 w-4"
                      strokeWidth={1.8}
                    />

                    Em destaque
                  </span>
                </div>

                <h3 className="mt-5 max-w-2xl text-2xl font-bold leading-[1.2] tracking-[-0.035em] text-slate-950 transition-colors group-hover:text-nugeo-blue-600 sm:text-3xl">
                  {featuredNews.title}
                </h3>

                <p className="mt-4 max-w-2xl flex-1 text-base leading-7 text-slate-600">
                  {featuredNews.excerpt}
                </p>

                <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-5">
                  <span className="text-sm font-semibold text-nugeo-blue-600">
                    Ler notícia completa
                  </span>

                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-nugeo-blue-600 transition duration-200 group-hover:border-blue-200 group-hover:bg-blue-50">
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-[18px] w-[18px]"
                      strokeWidth={1.8}
                    />
                  </span>
                </div>
              </div>
            </a>
          </article>

          {/* Notícias secundárias */}
          <ul className="grid gap-4">
            {secondaryNews.map((news) => (
              <SecondaryNewsCard
                key={news.id}
                news={news}
              />
            ))}
          </ul>
        </div>

        {/* Ação geral */}
        <div className="mt-10 flex justify-center">
          <a
            href="/noticias"
            className={[
              "group inline-flex min-h-12 items-center justify-center gap-3",
              "rounded-xl border border-slate-300 bg-white px-6",
              "text-sm font-semibold text-slate-700",
              "transition duration-200",
              "hover:border-blue-200 hover:bg-blue-50",
              "hover:text-nugeo-blue-600",
              "focus-visible:outline-2",
              "focus-visible:outline-offset-4",
              "focus-visible:outline-nugeo-blue-600",
            ].join(" ")}
          >
            <Newspaper
              aria-hidden="true"
              className="h-[18px] w-[18px]"
              strokeWidth={1.8}
            />

            Ver todas as notícias

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