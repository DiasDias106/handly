# Handly

A personal, modular desktop app for everyday life — notes, calendar, finances, tasks and habits, all in one place and stored locally on your machine.

## Modules (planned)

- 🏠 **Dashboard** — customizable widgets from every module
- 📝 **Notes** — Markdown notes with folders, tags and search
- 📅 **Calendar** — yearly / monthly / weekly planning with categories
- 💰 **Finance** — expenses, budgets, charts and bank CSV import
- ✅ **Tasks & Habits** — to-dos and daily habit tracking
- 🧰 **Tools** — file converters (images, PDF, ...)

## Tech stack

- [Tauri v2](https://tauri.app/) (Rust backend)
- React + TypeScript + Vite
- SQLite (local data)

## Development

Requirements: [Rust](https://rustup.rs/), [Node.js](https://nodejs.org/) and the [Tauri prerequisites](https://tauri.app/start/prerequisites/).

```bash
npm install
npm run tauri dev     # run in development
npm run tauri build   # build an installer
```
