import type { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { getVersion } from "@tauri-apps/api/app";
import clsx from "clsx";
import { ChevronDown, ChevronUp, Monitor, Moon, Settings, Sun } from "lucide-react";

import { MODULES_BY_ID } from "../../core/moduleRegistry";
import { ACCENTS, type ModulePref, type Theme, fetchDbPath } from "../../core/settings";
import { PageHeader } from "../../core/ui/PageHeader";
import { useSettings, useUpdateSetting } from "../../core/useSettings";

const THEMES: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Claro", icon: Sun },
  { value: "dark", label: "Escuro", icon: Moon },
  { value: "system", label: "Sistema", icon: Monitor },
];

function Section({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6">
      <h2 className="font-semibold">{title}</h2>
      {description && <p className="mt-0.5 text-sm text-muted">{description}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Toggle({ checked, disabled, onChange }: { checked: boolean; disabled?: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={clsx(
        "relative h-6 w-11 shrink-0 rounded-full transition disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-accent" : "bg-surface-2 ring-1 ring-border ring-inset",
      )}
    >
      <span
        className={clsx(
          "absolute top-1 left-1 size-4 rounded-full bg-white shadow transition-transform",
          checked && "translate-x-5",
        )}
      />
    </button>
  );
}

export function SettingsPage() {
  const { settings } = useSettings();
  const update = useUpdateSetting();
  const version = useQuery({ queryKey: ["app-version"], queryFn: getVersion });
  const dbPath = useQuery({ queryKey: ["db-path"], queryFn: fetchDbPath });

  const setModules = (modules: ModulePref[]) => update.mutate({ key: "modules", value: modules });

  const toggleModule = (id: string, enabled: boolean) =>
    setModules(settings.modules.map((m) => (m.id === id ? { ...m, enabled } : m)));

  const moveModule = (index: number, delta: -1 | 1) => {
    const next = [...settings.modules];
    const target = index + delta;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setModules(next);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-8 py-8">
      <PageHeader title="Definições" description="Personaliza o Handly à tua maneira." icon={Settings} />

      {update.error && (
        <p className="rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-500">
          Erro ao guardar: {String(update.error)}
        </p>
      )}

      <Section title="Aparência">
        <div className="space-y-5">
          <div>
            <p className="mb-2 text-sm font-medium">Tema</p>
            <div className="inline-flex rounded-xl bg-surface-2 p-1">
              {THEMES.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => update.mutate({ key: "theme", value })}
                  className={clsx(
                    "flex items-center gap-2 rounded-lg px-4 py-1.5 text-sm font-medium transition",
                    settings.theme === value ? "bg-surface text-text shadow-sm" : "text-muted hover:text-text",
                  )}
                >
                  <Icon className="size-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium">Cor de destaque</p>
            <div className="flex gap-2.5">
              {ACCENTS.map(({ name, value }) => (
                <button
                  key={value}
                  type="button"
                  title={name}
                  aria-label={name}
                  onClick={() => update.mutate({ key: "accent", value })}
                  style={{ backgroundColor: value }}
                  className={clsx(
                    "size-8 rounded-full transition hover:scale-110",
                    settings.accent === value && "ring-2 ring-offset-2 ring-offset-surface",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="Módulos" description="Escolhe os módulos que aparecem na barra lateral e a sua ordem.">
        <ul className="divide-y divide-border">
          {settings.modules.map((pref, index) => {
            const mod = MODULES_BY_ID.get(pref.id);
            if (!mod) return null;
            const Icon = mod.icon;
            return (
              <li key={pref.id} className="flex items-center gap-4 py-3">
                <div className="flex flex-col">
                  <button
                    type="button"
                    aria-label="Subir"
                    disabled={index === 0}
                    onClick={() => moveModule(index, -1)}
                    className="text-muted hover:text-text disabled:opacity-25"
                  >
                    <ChevronUp className="size-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Descer"
                    disabled={index === settings.modules.length - 1}
                    onClick={() => moveModule(index, 1)}
                    className="text-muted hover:text-text disabled:opacity-25"
                  >
                    <ChevronDown className="size-4" />
                  </button>
                </div>
                <div className="grid size-9 place-items-center rounded-lg bg-surface-2 text-muted">
                  <Icon className="size-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{mod.name}</p>
                  <p className="truncate text-xs text-muted">{mod.description}</p>
                </div>
                <Toggle
                  checked={pref.enabled || !!mod.alwaysOn}
                  disabled={mod.alwaysOn}
                  onChange={(v) => toggleModule(pref.id, v)}
                />
              </li>
            );
          })}
        </ul>
      </Section>

      <Section title="Dados">
        <p className="text-sm text-muted">Todos os teus dados ficam guardados localmente neste ficheiro:</p>
        <code className="mt-2 block rounded-lg bg-surface-2 px-3 py-2 text-xs break-all select-text">
          {dbPath.data ?? "…"}
        </code>
        <p className="mt-2 text-xs text-muted">Copia este ficheiro para fazer uma cópia de segurança.</p>
      </Section>

      <p className="text-center text-xs text-muted">Handly v{version.data ?? "…"}</p>
    </div>
  );
}
