export interface NavigationItem {
  label: string;
  href: string;
}

export interface LaboratoryNavigationItem extends NavigationItem {
  acronym: string;
  description: string;
}

export const mainNavigation: NavigationItem[] = [
  {
    label: "Início",
    href: "#inicio",
  },
  {
    label: "Sobre",
    href: "#sobre",
  },
  {
    label: "Monitoramento",
    href: "#monitoramento",
  },
  {
    label: "Projetos",
    href: "#projetos",
  },
  {
    label: "Publicações",
    href: "#publicacoes",
  },
  {
    label: "Notícias",
    href: "#noticias",
  },
];

export const laboratoryNavigation: LaboratoryNavigationItem[] = [
  {
    acronym: "LABMET",
    label: "Laboratório de Meteorologia",
    description: "Meteorologia, climatologia e previsão do tempo.",
    href: "/laboratorios/labmet",
  },
  {
    acronym: "LAHID",
    label: "Laboratório de Recursos Hídricos",
    description: "Hidrologia, bacias hidrográficas e qualidade da água.",
    href: "/laboratorios/lahid",
  },
  {
    acronym: "LabGEO",
    label: "Laboratório de Geoprocessamento",
    description: "Cartografia, SIG e análises territoriais.",
    href: "/laboratorios/labgeo",
  },
  {
    acronym: "LASER",
    label: "Laboratório de Sensoriamento Remoto",
    description: "Imagens de satélite e monitoramento ambiental.",
    href: "/laboratorios/laser",
  },
  {
    acronym: "Núcleos",
    label: "Núcleos Regionais",
    description: "Pesquisa e monitoramento em diferentes regiões.",
    href: "/laboratorios/nucleos-regionais",
  },
];