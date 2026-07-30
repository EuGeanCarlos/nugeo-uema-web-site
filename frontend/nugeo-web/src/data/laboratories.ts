import type { LucideIcon } from "lucide-react";

import {
  CloudSun,
  Droplets,
  MapPinned,
} from "lucide-react";

export type LaboratoryAccent = "blue" | "cyan" | "green";

export interface Laboratory {
  id: string;
  acronym: string;
  title: string;
  area: string;
  description: string;
  href: string;
  image: string;
  tags: string[];
  accent: LaboratoryAccent;
  icon: LucideIcon;
}

export const laboratories: Laboratory[] = [
  {
    id: "labmet",
    acronym: "LABMET",
    title: "Laboratório de Meteorologia",
    area: "Meteorologia e climatologia",
    description:
      "Monitoramento do tempo e do clima, previsão meteorológica, estudos climáticos e operação da rede de estações do Maranhão.",
    href: "/laboratorios/labmet",
    image: "/images/laboratories/labmet.webp",
    tags: [
      "Previsão do tempo",
      "Climatologia",
      "Monitoramento atmosférico",
    ],
    accent: "blue",
    icon: CloudSun,
  },
  {
    id: "labhidro",
    acronym: "LABHIDRO",
    title: "Laboratório de Recursos Hídricos",
    area: "Água e bacias hidrográficas",
    description:
      "Pesquisa e monitoramento de bacias hidrográficas, disponibilidade, quantidade e qualidade dos recursos hídricos.",
    href: "/laboratorios/labhidro",
    image: "/images/laboratories/labhidro.webp",
    tags: [
      "Hidrologia",
      "Qualidade da água",
      "Bacias hidrográficas",
    ],
    accent: "cyan",
    icon: Droplets,
  },
  {
    id: "labgeo",
    acronym: "LABGEO",
    title: "Laboratório de Geoprocessamento",
    area: "Geotecnologias e território",
    description:
      "Geoprocessamento, cartografia, sistemas de informações geográficas, sensoriamento remoto e análises territoriais.",
    href: "/laboratorios/labgeo",
    image: "/images/laboratories/labgeo.webp",
    tags: [
      "Geoprocessamento",
      "Cartografia",
      "Sensoriamento remoto",
    ],
    accent: "green",
    icon: MapPinned,
  },
];