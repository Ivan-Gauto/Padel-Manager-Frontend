# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # dev server at localhost:5173 (Vite + SWC)
npm run build     # tsc -b && vite build
npm run lint      # ESLint
npm run preview   # preview production build
```

## Architecture

**Stack:** React 19, Vite 7 (SWC), TypeScript 5.9 strict, React Router 7.

**Backend:** .NET 10 Clean Architecture — separate repo `Padel-Manager-Backend`. CORS is configured to accept `localhost:5173`. HTTP calls use native `fetch` (no Axios).

**Source layout:**

| Folder | Purpose |
|---|---|
| `src/services/` | `fetch` wrappers — one file per backend controller (e.g. `tournamentService.ts`) |
| `src/types/` | TypeScript interfaces mirroring C# DTOs from the backend |
| `src/components/` | Reusable UI pieces (buttons, inputs, cards) |
| `src/layouts/` | Structural wrappers repeated across screens (navbar, footer) |
| `src/pages/` | One file per route (e.g. `/torneos`, `/jugadores`, `/partidos`) |
| `src/hooks/` | Custom React hooks (`useX`) — extract complex state and API logic out of components |
| `src/context/` | React Context for global state — `AuthContext` owns JWT tokens, current user, and role |
| `src/utils/` | Pure helper functions — JWT decoding, date formatting, HTTP error handling |
| `public/` | Static assets served as-is (logos, icons). Use `src/assets/` for Vite-processed imports |

## Conventions

- **Git flow:** `main` (production) → `development` (integration) → `feature/name` (tasks). Branch from `development`, not `main`.
- **Types:** All backend response shapes go in `src/types/`. Match C# DTO names exactly so the compiler catches front/back mismatches.
- **Auth:** JWT access token (8 h) + refresh token (7 d). `AuthContext` handles storage and refresh. No component should touch tokens directly.
- **Roles:** `Admin`, `Organizador`, `Jugador`, `Invitado` — use these strings for route guards and conditional UI.
- **TypeScript strict:** `noUnusedLocals` and `noUnusedParameters` are enforced — remove unused imports/variables before committing.
