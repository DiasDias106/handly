import { Construction, type LucideIcon } from "lucide-react";

import { PageHeader } from "./PageHeader";

interface Props {
  title: string;
  description: string;
  icon: LucideIcon;
  planned: string[];
}

/** Temporary page shown for modules that are not built yet. */
export function ModulePlaceholder({ title, description, icon, planned }: Props) {
  return (
    <div className="mx-auto max-w-4xl px-8 py-8">
      <PageHeader title={title} description={description} icon={icon} />

      <div className="mt-8 rounded-2xl border border-dashed border-border bg-surface p-8">
        <div className="flex items-center gap-3 text-muted">
          <Construction className="size-5" />
          <span className="font-medium">Em construção</span>
        </div>
        <p className="mt-4 text-sm text-muted">O que vem aí:</p>
        <ul className="mt-2 space-y-1.5">
          {planned.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm">
              <span className="size-1.5 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
