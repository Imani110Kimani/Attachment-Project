# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Docker + Backend with PostgreSQL

This repository now includes a backend service and PostgreSQL database configured with Docker Compose.

- `backend/`: Express API service with user signup/login and PostgreSQL connection
- `docker-compose.yml`: runs `db` and `api` together
- `backend/.env.example`: database URL and port configuration

### Run with Docker

1. Install Docker Desktop / Docker Engine.
2. Run:

```bash
docker compose up --build
```

3. Backend API will be available at `http://localhost:4000`.
4. PostgreSQL listens on `localhost:5432`.

### Backend API endpoints

- `GET /health`
- `POST /auth/signup`
- `POST /auth/login`
- `GET /users`

The backend will automatically create a `users` table in the PostgreSQL database.
