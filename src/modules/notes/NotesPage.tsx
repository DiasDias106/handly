import { NotebookPen } from "lucide-react";

import { ModulePlaceholder } from "../../core/ui/ModulePlaceholder";

export function NotesPage() {
  return (
    <ModulePlaceholder
      title="Notas"
      description="Notas em Markdown com pastas, tags e pesquisa."
      icon={NotebookPen}
      planned={[
        "Editor de notas com formatação",
        "Pastas e tags",
        "Pesquisa em todas as notas",
        "Imagens e anexos",
        "Ligações entre notas",
      ]}
    />
  );
}
