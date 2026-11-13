import { useEffect } from "react";

import type { AppSettings } from "./settings";

/** Applies theme (light/dark/system) and accent colour to <html>. */
export function useApplyTheme({ theme, accent }: Pick<AppSettings, "theme" | "accent">) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", accent);
  }, [accent]);

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const apply = () => {
      const dark = theme === "dark" || (theme === "system" && media.matches);
      root.classList.toggle("dark", dark);
    };

    apply();
    if (theme !== "system") return;
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [theme]);
}
