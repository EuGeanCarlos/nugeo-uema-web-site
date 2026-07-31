export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterColumn {
  id: string;
  title: string;
  links: FooterLink[];
}

export const footerColumns: FooterColumn[] = [
  {
    id: "institutional",
    title: "Institucional",
    links: [
      {
        label: "O NUGEO",
        href: "/sobre",
      },
      {
        label: "Equipe",
        href: "/sobre#equipe",
      },
      {
        label: "Notícias",
        href: "/noticias",
      },
      {
        label: "Projetos e pesquisas",
        href: "/projetos",
      },
    ],
  },
  {
    id: "laboratories",
    title: "Laboratórios",
    links: [
      {
        label: "Todos os laboratórios",
        href: "/laboratorios",
      },
      {
        label: "LABMET",
        href: "/laboratorios/labmet",
      },
      {
        label: "LABHIDRO",
        href: "/laboratorios/labhidro",
      },
      {
        label: "LABGEO",
        href: "/laboratorios/labgeo",
      },
    ],
  },
  {
    id: "services",
    title: "Dados e conhecimento",
    links: [
      {
        label: "Dados e produtos",
        href: "/dados",
      },
      {
        label: "Previsão do tempo",
        href: "/dados/previsao-do-tempo",
      },
      {
        label: "Monitoramento ambiental",
        href: "/dados",
      },
      {
        label: "Publicações e acervo",
        href: "/publicacoes",
      },
    ],
  },
];

export const institutionalFooterLinks: FooterLink[] = [
  {
    label: "Política de privacidade",
    href: "/politica-de-privacidade",
  },
  {
    label: "Acessibilidade",
    href: "/acessibilidade",
  },
  {
    label: "Mapa do site",
    href: "/mapa-do-site",
  },
];

export const footerContact = {
  institution: "Universidade Estadual do Maranhão",
  campus: "Cidade Universitária Paulo VI",
  address:
    "Avenida Lourenço Vieira da Silva, nº 1000, São Luís – MA",
  phone: "(98) 2016-8100",
  phoneHref: "tel:+559820168100",
  uemaHref: "https://www.uema.br",
};