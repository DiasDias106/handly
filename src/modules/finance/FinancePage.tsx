import { Wallet } from "lucide-react";

import { ModulePlaceholder } from "../../core/ui/ModulePlaceholder";

export function FinancePage() {
  return (
    <ModulePlaceholder
      title="Finanças"
      description="Despesas, orçamento, gráficos e importação do banco."
      icon={Wallet}
      planned={[
        "Registo de receitas e despesas",
        "Categorias e orçamento mensal",
        "Despesas fixas recorrentes",
        "Gráficos por categoria e evolução mensal",
        "Importar extrato CSV do banco",
        "Objetivos de poupança",
      ]}
    />
  );
}
