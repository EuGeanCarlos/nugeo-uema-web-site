import type { LucideIcon } from "lucide-react";

import {
  CalendarDays,
  FileText,
  FlaskConical,
  FolderOpen,
  MapPinned,
  Users,
} from "lucide-react";

export type IndicatorAccent = "blue" | "green";

export interface InstitutionalIndicator {
  id: string;
  value: string;
  label: string;
  description: string;
  icon: LucideIcon;
  accent: IndicatorAccent;
}

/**
 * Dados temporários baseados no layout conceitual.
 * Os valores deverão ser validados com a equipe do NUGEO.
 */
export const institutionalIndicators: InstitutionalIndicator[] = [
  {
    id: "years",
    value: "25+",
    label: "Anos de atuação",
    description: "Produção científica e monitoramento ambiental.",
    icon: CalendarDays,
    accent: "blue",
  },
  {
    id: "municipalities",
    value: "217",
    label: "Municípios monitorados",
    description: "Cobertura em todo o território maranhense.",
    icon: MapPinned,
    accent: "blue",
  },
  {
    id: "team",
    value: "30+",
    label: "Pesquisadores e técnicos",
    description: "Equipe multidisciplinar especializada.",
    icon: Users,
    accent: "green",
  },
  {
    id: "projects",
    value: "15+",
    label: "Projetos em andamento",
    description: "Pesquisa, extensão e desenvolvimento técnico.",
    icon: FolderOpen,
    accent: "green",
  },
  {
    id: "bulletins",
    value: "2.000+",
    label: "Boletins publicados",
    description: "Informações técnicas produzidas e divulgadas.",
    icon: FileText,
    accent: "blue",
  },
  {
    id: "laboratories",
    value: "10+",
    label: "Laboratórios e núcleos",
    description: "Estrutura científica e unidades especializadas.",
    icon: FlaskConical,
    accent: "green",
  },
];