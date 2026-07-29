import type { LucideIcon } from "lucide-react";

import {
  CloudRain,
  CloudSun,
  Droplets,
  Gauge,
  Satellite,
  Wind,
} from "lucide-react";

export type QuickAccessAccent = "blue" | "cyan" | "green";

export interface QuickAccessItem {
  id: string;
  title: string;
  description: string;
  status: string;
  href: string;
  icon: LucideIcon;
  accent: QuickAccessAccent;
}

export const quickAccessItems: QuickAccessItem[] = [
  {
    id: "weather-forecast",
    title: "Previsão do tempo",
    description:
      "Consulte as condições meteorológicas previstas para os municípios do Maranhão.",
    status: "Atualização diária",
    href: "/dados/previsao-do-tempo",
    icon: CloudSun,
    accent: "blue",
  },
  {
    id: "last-rainfall",
    title: "Chuvas nas últimas 24 horas",
    description:
      "Acompanhe os registros de precipitação observados nas estações monitoradas.",
    status: "Dados mais recentes",
    href: "/dados/chuvas",
    icon: CloudRain,
    accent: "cyan",
  },
  {
    id: "atmospheric-conditions",
    title: "Condições atmosféricas",
    description:
      "Visualize sistemas meteorológicos e as condições atuais da atmosfera.",
    status: "Monitoramento contínuo",
    href: "/dados/condicoes-atmosfericas",
    icon: Wind,
    accent: "blue",
  },
  {
    id: "weather-stations",
    title: "Estações meteorológicas",
    description:
      "Consulte dados da rede de plataformas de coleta distribuídas pelo estado.",
    status: "Rede estadual",
    href: "/dados/estacoes-meteorologicas",
    icon: Gauge,
    accent: "green",
  },
  {
    id: "satellite-images",
    title: "Imagens de satélite",
    description:
      "Observe nuvens, umidade e sistemas atmosféricos sobre o Maranhão.",
    status: "Observação da Terra",
    href: "/dados/imagens-de-satelite",
    icon: Satellite,
    accent: "cyan",
  },
  {
    id: "drought-monitoring",
    title: "Monitoramento de secas",
    description:
      "Acesse indicadores climáticos utilizados no acompanhamento de estiagens.",
    status: "Análise climática",
    href: "/dados/monitoramento-de-secas",
    icon: Droplets,
    accent: "green",
  },
];