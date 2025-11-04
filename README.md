# Bread Factory Dashboard
Industrial dashboard for a bread factory.

## Stack
- Backend: .NET 8 Web API + EF Core + PostgreSQL
- Frontend: Next.js (App Router) + Tailwind + Shadcn UI + Recharts
- Docker: Postgres + Backend
- CI: GitHub Actions (build, test, EF migrations)

## Structure
- `backend/` — Minimal API + EF Core (PostgreSQL). Dev seeding via `--seed`.
- `frontend-app/` — Next.js app (uses SWR to call the API).
- `scripts/` — Dev scripts (`reset-db.ps1`, `populate-db.ps1`, `dev-run.ps1`).

## Getting Started (Dev)
1) Database and Backend
- Copy `backend/.env.example` to an environment (or keep `appsettings.json` defaults).
- Start Postgres and apply migrations:
  - `./scripts/reset-db.ps1` or `./scripts/populate-db.ps1` (applies migrations and runs seeder).
- Alternatively, with Docker: `docker compose up -d db` then in `backend/`: `dotnet ef database update`.

2) Frontend
- Copy `frontend-app/.env.example` to `frontend-app/.env.local` and set `NEXT_PUBLIC_API_URL` (default `http://localhost:8080`).
- Install deps and run dev:
  - `cd frontend-app && npm i && npm run dev`
- Open `http://localhost:3000` (dashboard at `/dashboard`).

3) One‑shot Dev (optional)
- `./scripts/dev-run.ps1` starts Postgres, `dotnet watch` for backend, and `next dev` for frontend.

## API Notes
- Health: `GET /health`
- Production: `GET /api/production/lines`
- More modules (Quality, Maintenance, Alerts) will be added incrementally.

## CI
- See `.github/workflows/ci.yml` — builds backend and frontend, applies EF migrations against a Postgres service, runs tests.
