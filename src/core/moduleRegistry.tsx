import type { ComponentType } from "react";
import {
  CalendarDays,
  CheckSquare,
  LayoutDashboard,
  type LucideIcon,
  NotebookPen,
  Wallet,
  Wrench,
} from "lucide-react";

import { DashboardPage } from "../modules/dashboard/DashboardPage";
import { CalendarPage } from "../modules/calendar/CalendarPage";
import { NotesPage } from "../modules/notes/NotesPage";
import { FinancePage } from "../modules/finance/FinancePage";
import { TasksPage } from "../modules/tasks/TasksPage";
import { ToolsPage } from "../modules/tools/ToolsPage";

export interface ModuleDef {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  /** Route path, e.g. "/notes". */
  path: string;
  Component: ComponentType;
  /** Core modules cannot be disabled in Settings. */
  alwaysOn?: boolean;
}

/**
 * Every module of the app, in default order.
 * To add a new module: create `src/modules/<name>/`, then add one entry here.
 */
export const MODULES: ModuleDef[] = [
  {
    id: "dashboard",
    name: "Início",
    description: "Resumo do teu dia com widgets de todos os módulos.",
    icon: LayoutDashboard,
    path: "/dashboard",
    Component: DashboardPage,
    alwaysOn: true,
  },
  {
    id: "calendar",
    name: "Calendário",
    description: "Planeamento anual, mensal e semanal.",
    icon: CalendarDays,
    path: "/calendar",
    Component: CalendarPage,
  },
  {
    id: "notes",
    name: "Notas",
    description: "Notas em Markdown com pastas, tags e pesquisa.",
    icon: NotebookPen,
    path: "/notes",
    Component: NotesPage,
  },
  {
    id: "finance",
    name: "Finanças",
    description: "Despesas, orçamento, gráficos e importação do banco.",
    icon: Wallet,
    path: "/finance",
    Component: FinancePage,
  },
  {
    id: "tasks",
    name: "Tarefas",
    description: "Lista de tarefas e registo de hábitos diários.",
    icon: CheckSquare,
    path: "/tasks",
    Component: TasksPage,
  },
  {
    id: "tools",
    name: "Ferramentas",
    description: "Conversores de imagens, PDF e outros utilitários.",
    icon: Wrench,
    path: "/tools",
    Component: ToolsPage,
  },
];

export const MODULES_BY_ID = new Map(MODULES.map((m) => [m.id, m]));
