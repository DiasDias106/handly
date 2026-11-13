import { Link } from "react-router";

import { MODULES_BY_ID } from "../../core/moduleRegistry";
import { useSettings } from "../../core/useSettings";

function greeting(hour: number) {
  if (hour < 6) return "Boa noite";
  if (hour < 13) return "Bom dia";
  if (hour < 20) return "Boa tarde";
  return "Boa noite";
}

export function DashboardPage() {
  const { settings } = useSettings();
  const now = new Date();
  const today = now.toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const shortcuts = settings.modules
    .filter((m) => m.enabled && m.id !== "dashboard")
    .map((m) => MODULES_BY_ID.get(m.id))
    .filter((m) => m !== undefined);

  return (
    <div className="mx-auto max-w-5xl px-8 py-8">
      <p className="text-sm capitalize text-muted">{today}</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight">{greeting(now.getHours())} 👋</h1>

      <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shortcuts.map(({ id, name, description, icon: Icon, path }) => (
          <Link
            key={id}
            to={path}
            className="group rounded-2xl border border-border bg-surface p-5 transition hover:border-accent/50 hover:shadow-sm"
          >
            <div className="grid size-10 place-items-center rounded-xl bg-accent/12 text-accent transition group-hover:bg-accent group-hover:text-white">
              <Icon className="size-5" />
            </div>
            <h2 className="mt-4 font-medium">{name}</h2>
            <p className="mt-1 text-sm text-muted">{description}</p>
          </Link>
        ))}
      </section>

      <p className="mt-10 text-center text-xs text-muted">
        Os widgets personalizáveis do Início chegam numa fase seguinte.
      </p>
    </div>
  );
}
