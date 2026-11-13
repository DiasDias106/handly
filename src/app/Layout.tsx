import { Outlet } from "react-router";

import { MODULES_BY_ID } from "../core/moduleRegistry";
import { useApplyTheme } from "../core/theme";
import { useSettings } from "../core/useSettings";
import { Sidebar } from "./Sidebar";

export function Layout() {
  const { settings } = useSettings();
  useApplyTheme(settings);

  const visibleModules = settings.modules
    .filter((m) => m.enabled)
    .map((m) => MODULES_BY_ID.get(m.id))
    .filter((m) => m !== undefined);

  return (
    <div className="flex h-full">
      <Sidebar modules={visibleModules} />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
