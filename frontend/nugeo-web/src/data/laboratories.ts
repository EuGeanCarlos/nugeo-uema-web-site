import type { LucideIcon } from "lucide-react";

import {
  CloudSun,
  Droplets,
  MapPinned,
} from "lucide-react";

export interface Laboratory {
  id: string;
  acronym: string;
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  icon: LucideIcon;
}

export const laboratories: Laboratory[] = [
  {
    id: "labmet",
    acronym: "LABMET",
    title: "Laboratório de Meteorologia",
    description:
      "Monitoramento atmosférico, previsão do tempo e estudos climáticos para o Maranhão.",
    href: "/laboratorios/labmet",
    image: "/images/laboratories/labmet.webp",
    imageAlt:
      "Estação meteorológica utilizada no monitoramento atmosférico.",
    icon: CloudSun,
  },
  {
    id: "labhidro",
    acronym: "LABHIDRO",
    title: "Laboratório de Recursos Hídricos",
    description:
      "Hidrologia, qualidade da água e monitoramento das bacias hidrográficas.",
    href: "/laboratorios/labhidro",
    image: "/images/laboratories/labhidro.webp",
    imageAlt:
      "Monitoramento de recursos hídricos em uma bacia hidrográfica.",
    icon: Droplets,
  },
  {
    id: "labgeo",
    acronym: "LABGEO",
    title: "Laboratório de Geoprocessamento",
    description:
      "Geoprocessamento, cartografia, sensoriamento remoto e análise territorial.",
    href: "/laboratorios/labgeo",
    image: "/images/laboratories/labgeo.webp",
    imageAlt:
      "Mapas e equipamentos utilizados em análises de geoprocessamento.",
    icon: MapPinned,
  },
];