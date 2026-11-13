import { CalendarDays } from "lucide-react";

import { ModulePlaceholder } from "../../core/ui/ModulePlaceholder";

export function CalendarPage() {
  return (
    <ModulePlaceholder
      title="Calendário"
      description="Planeamento anual, mensal e semanal."
      icon={CalendarDays}
      planned={[
        "Vista anual, mensal e semanal",
        "Eventos com cores e categorias",
        "Eventos recorrentes",
        "Tarefas com data aparecem no calendário",
        "Importar / exportar .ics",
      ]}
    />
  );
}
