import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { MODULES } from "./moduleRegistry";
import {
  type AppSettings,
  type RawSettings,
  type SettingKey,
  fetchSettings,
  normalizeSettings,
  saveSetting,
} from "./settings";

/** `{ key, value }` pair where `value` is typed according to `key`. */
export type SettingUpdate = { [K in SettingKey]: { key: K; value: AppSettings[K] } }[SettingKey];

const SETTINGS_KEY = ["settings"] as const;

export function useSettings() {
  const query = useQuery({ queryKey: SETTINGS_KEY, queryFn: fetchSettings });
  // MODULES is read lazily (not at import time) because module pages import this hook.
  const settings = useMemo(
    () => normalizeSettings(query.data, MODULES.map((m) => m.id)),
    [query.data],
  );
  return { settings, isLoading: query.isLoading, error: query.error };
}

/** Updates one setting with an optimistic UI update (rolled back on error). */
export function useUpdateSetting() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (vars: SettingUpdate) => saveSetting(vars.key, vars.value),
    onMutate: async ({ key, value }) => {
      await qc.cancelQueries({ queryKey: SETTINGS_KEY });
      const previous = qc.getQueryData<RawSettings>(SETTINGS_KEY);
      qc.setQueryData<RawSettings>(SETTINGS_KEY, (old) => ({ ...old, [key]: value }));
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      qc.setQueryData(SETTINGS_KEY, ctx?.previous);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: SETTINGS_KEY }),
  });
}
