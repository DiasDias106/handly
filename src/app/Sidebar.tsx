import { NavLink } from "react-router";
import clsx from "clsx";
import { Settings, type LucideIcon } from "lucide-react";

import type { ModuleDef } from "../core/moduleRegistry";

function NavItem({ to, name, icon: Icon }: { to: string; name: string; icon: LucideIcon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
          isActive ? "bg-accent/12 text-accent" : "text-muted hover:bg-surface-2 hover:text-text",
        )
      }
    >
      <Icon className="size-4.5 shrink-0" />
      <span className="truncate">{name}</span>
    </NavLink>
  );
}

export function Sidebar({ modules }: { modules: ModuleDef[] }) {
  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-surface">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="grid size-8 place-items-center rounded-lg bg-accent text-sm font-bold text-white">H</div>
        <span className="text-lg font-semibold tracking-tight">Handly</span>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3">
        {modules.map((m) => (
          <NavItem key={m.id} to={m.path} name={m.name} icon={m.icon} />
        ))}
      </nav>

      <div className="border-t border-border p-3">
        <NavItem to="/settings" name="Definições" icon={Settings} />
      </div>
    </aside>
  );
}
