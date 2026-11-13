import { invoke } from "@tauri-apps/api/core";

export type Theme = "light" | "dark" | "system";

/** Order + visibility of a module in the sidebar. */
export interface ModulePref {
  id: string;
  enabled: boolean;
}

export interface AppSettings {
  theme: Theme;
  accent: string;
  modules: ModulePref[];
}

export type SettingKey = keyof AppSettings;

export const ACCENTS = [
  { name: "Índigo", value: "#6366f1" },
  { name: "Azul", value: "#3b82f6" },
  { name: "Verde", value: "#10b981" },
  { name: "Âmbar", value: "#f59e0b" },
  { name: "Rosa", value: "#ec4899" },
  { name: "Vermelho", value: "#ef4444" },
] as const;

export type RawSettings = Partial<Record<SettingKey, unknown>>;

export function fetchSettings(): Promise<RawSettings> {
  return invoke<RawSettings>("get_settings");
}

export function saveSetting(key: SettingKey, value: AppSettings[SettingKey]): Promise<void> {
  return invoke("set_setting", { key, value });
}

export function fetchDbPath(): Promise<string> {
  return invoke<string>("get_db_path");
}

/**
 * Turns whatever is stored in the DB into a complete, valid AppSettings object.
 * `moduleIds` is the list of registered modules (in default order): modules
 * added in a new version are appended, unknown ones are dropped.
 */
export function normalizeSettings(raw: RawSettings | undefined, moduleIds: string[]): AppSettings {
  const theme: Theme =
    raw?.theme === "light" || raw?.theme === "dark" || raw?.theme === "system" ? raw.theme : "system";

  const accent =
    typeof raw?.accent === "string" && /^#[0-9a-f]{6}$/i.test(raw.accent) ? raw.accent : ACCENTS[0].value;

  const stored = Array.isArray(raw?.modules) ? (raw.modules as ModulePref[]) : [];
  const known = new Set(moduleIds);
  const modules: ModulePref[] = stored
    .filter((m) => m && typeof m.id === "string" && known.has(m.id))
    .map((m) => ({ id: m.id, enabled: m.enabled !== false }));
  for (const id of moduleIds) {
    if (!modules.some((m) => m.id === id)) modules.push({ id, enabled: true });
  }

  return { theme, accent, modules };
}
