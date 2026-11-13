import { CheckSquare } from "lucide-react";

import { ModulePlaceholder } from "../../core/ui/ModulePlaceholder";

export function TasksPage() {
  return (
    <ModulePlaceholder
      title="Tarefas"
      description="Lista de tarefas e registo de hábitos diários."
      icon={CheckSquare}
      planned={[
        "Tarefas com data, prioridade e listas",
        "Checklist diária de hábitos",
        "Séries (streaks) e estatísticas de hábitos",
      ]}
    />
  );
}
