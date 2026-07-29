export type HeroActionVariant = "primary" | "secondary" | "outline";

export interface HeroAction {
  label: string;
  href: string;
  variant: HeroActionVariant;
  icon: "arrow" | "data" | "laboratory";
}

export interface HeroMetric {
  value: string;
  label: string;
  icon: "calendar" | "map" | "people" | "projects" | "publications" | "labs";
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  highlightedTitle: string;
  description: string;
  actions: HeroAction[];
}

export const heroContent: HeroContent = {
  eyebrow: "Ciência para o desenvolvimento sustentável",

  title: "Ciência, tecnologia e monitoramento ambiental",

  highlightedTitle: "para o Maranhão",

  description:
    "Produzimos conhecimento, dados e soluções em meteorologia, recursos hídricos, geotecnologias e estudos ambientais para apoiar decisões e promover qualidade de vida.",

  actions: [
    {
      label: "Conheça o NUGEO",
      href: "#sobre",
      variant: "primary",
      icon: "arrow",
    },
    {
      label: "Acessar dados e boletins",
      href: "#boletins",
      variant: "secondary",
      icon: "data",
    },
    {
      label: "Conhecer laboratórios",
      href: "#laboratorios",
      variant: "outline",
      icon: "laboratory",
    },
  ],
};

/**
 * Valores provisórios baseados no layout conceitual.
 * Confirmar todos os números com o NUGEO antes da publicação.
 */
export const heroMetrics: HeroMetric[] = [
  {
    value: "25+",
    label: "Anos de atuação",
    icon: "calendar",
  },
  {
    value: "217",
    label: "Municípios monitorados",
    icon: "map",
  },
  {
    value: "30+",
    label: "Pesquisadores e técnicos",
    icon: "people",
  },
  {
    value: "15+",
    label: "Projetos em andamento",
    icon: "projects",
  },
  {
    value: "2.000+",
    label: "Boletins publicados",
    icon: "publications",
  },
  {
    value: "10+",
    label: "Laboratórios e núcleos",
    icon: "labs",
  },
];