export type NewsCategory =
  | "Climatologia"
  | "Monitoramento"
  | "Institucional"
  | "Pesquisa";

export interface NewsItem {
  id: string;
  category: NewsCategory;
  title: string;
  excerpt: string;
  date: string;
  dateTime: string;
  href: string;
  image: string;
  featured?: boolean;
  external?: boolean;
}

export const newsItems: NewsItem[] = [
  {
    id: "monthly-rainfall-may-2026",
    category: "Climatologia",
    title:
      "Avaliação Mensal das Chuvas do Maranhão — maio de 2026",
    excerpt:
      "A análise apresenta a distribuição das chuvas, as anomalias de precipitação e o avanço do período menos chuvoso sobre o interior do estado.",
    date: "29 jul. 2026",
    dateTime: "2026-07-29",
    href: "https://www.nugeo.uema.br/?p=65337",
    image:
      "/images/news/valiacao-chuvas-maio-2026.webp",
    featured: true,
    external: true,
  },
  {
    id: "rainfall-28-july-2026",
    category: "Monitoramento",
    title: "Chuvas observadas no dia 28 de julho de 2026",
    excerpt:
      "Mapa dos acumulados de precipitação registrados nas últimas 24 horas nas estações monitoradas.",
    date: "29 jul. 2026",
    dateTime: "2026-07-29",
    href: "https://www.nugeo.uema.br/?p=65330",
    image: "/images/news/valiacao-chuvas-maio-2026.webp",
    external: true,
  },
  {
    id: "rainfall-27-july-2026",
    category: "Monitoramento",
    title: "Chuvas observadas no dia 27 de julho de 2026",
    excerpt:
      "Dados meteorológicos e distribuição espacial das chuvas observadas no território maranhense.",
    date: "29 jul. 2026",
    dateTime: "2026-07-29",
    href: "https://www.nugeo.uema.br/?p=65325",
    image: "/images/news/valiacao-chuvas-maio-2026.webp",
    external: true,
  },
  {
    id: "rainfall-26-july-2026",
    category: "Monitoramento",
    title: "Chuvas observadas no dia 26 de julho de 2026",
    excerpt:
      "Atualização dos registros diários de precipitação e das condições observadas no Maranhão.",
    date: "29 jul. 2026",
    dateTime: "2026-07-29",
    href: "https://www.nugeo.uema.br/?p=65320",
    image: "/images/news/valiacao-chuvas-maio-2026.webp",
    external: true,
  },
];