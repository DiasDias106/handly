import { Wrench } from "lucide-react";

import { ModulePlaceholder } from "../../core/ui/ModulePlaceholder";

export function ToolsPage() {
  return (
    <ModulePlaceholder
      title="Ferramentas"
      description="Conversores de imagens, PDF e outros utilitários."
      icon={Wrench}
      planned={[
        "Converter e redimensionar imagens",
        "Juntar / dividir PDFs",
        "PDF ↔ imagens",
        "PDF → DOCX",
      ]}
    />
  );
}
