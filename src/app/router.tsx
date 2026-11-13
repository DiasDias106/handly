import { Navigate, createHashRouter } from "react-router";

import { MODULES } from "../core/moduleRegistry";
import { SettingsPage } from "../modules/settings/SettingsPage";
import { Layout } from "./Layout";

// Hash routing works the same in `tauri dev` and in the packaged app.
export const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      ...MODULES.map(({ path, Component }) => ({ path, element: <Component /> })),
      { path: "/settings", element: <SettingsPage /> },
      { path: "*", element: <Navigate to="/dashboard" replace /> },
    ],
  },
]);
