# Recipe Hub – Frontend (React)

Minimal, production-minded React app for browsing, searching, viewing, submitting, and bookmarking recipes. It supports mock data or a real backend via environment variables, with a small env utility to keep configuration centralized.

## Quick Start

- Development: `npm start` then open http://localhost:3000
- Tests: `npm test`
- Production build: `npm run build`

Preview notes:
- The app runs on port 3000 in dev. Make sure nothing else is listening on 3000.

## Environment and Configuration

All runtime configuration is read from environment variables that must be prefixed with REACT_APP_. This project centralizes env access in `src/utils/env.js`.

Core variables supported:
- REACT_APP_API_BASE: Base path or URL for API, e.g. `/api` or `http://localhost:4000/api`
- REACT_APP_BACKEND_URL: Full backend URL; if set, it takes precedence over REACT_APP_API_BASE
- REACT_APP_LOG_LEVEL: App log level string (e.g., `debug`, `info`, `warn`, `error`). Default: `info`
- REACT_APP_NODE_ENV: Explicit runtime env override; falls back to `process.env.NODE_ENV`. Expected values: `development`, `production`, `test`
- REACT_APP_FEATURE_FLAGS: Optional CSV/JSON of feature flags (not currently enforced in code, but reserved for future toggles)

Also present (from the container .env): 
REACT_APP_FRONTEND_URL, REACT_APP_WS_URL, REACT_APP_NEXT_TELEMETRY_DISABLED, REACT_APP_ENABLE_SOURCE_MAPS, REACT_APP_PORT, REACT_APP_TRUST_PROXY, REACT_APP_HEALTHCHECK_PATH, REACT_APP_EXPERIMENTS_ENABLED. These are not required by the current UI but remain available for platform deployment consistency.

Recommended: see .env.example (if present in project root or this folder) for a sample of typical variables.

### How env.js works

src/utils/env.js exposes:
- getEnv(): returns { apiBase, backendUrl, nodeEnv, logLevel, useMock }
- isProduction(): boolean
- getApiBaseUrl(): resolves the effective base URL by preferring REACT_APP_BACKEND_URL over REACT_APP_API_BASE and normalizes trailing slashes

Mock-vs-Real switching logic:
- If both REACT_APP_API_BASE and REACT_APP_BACKEND_URL are unset AND the environment is not production, `useMock` becomes true and the app uses local mock data.
- If either REACT_APP_API_BASE or REACT_APP_BACKEND_URL is set, the app uses the real HTTP client pointing at that base.

You can inspect usage at:
- src/api/recipes.js: calls `getEnv()`; `useMock` selects between mock API (`src/mocks/mockApi.js`) and real client (`src/api/client.js`)
- src/api/client.js: uses `getApiBaseUrl()` to bind fetch calls to the configured backend
- src/pages/SubmitRecipe.jsx: uses `getApiBaseUrl()` to show whether you’re using a real API or mock mode

This ensures there is a single source of truth for environment configuration.

## Using Mock Mode

When REACT_APP_API_BASE and REACT_APP_BACKEND_URL are not provided (and not production), the app automatically:
- Serves recipe data from `src/mocks/recipes.sample.json`
- Simulates latency (~250ms) for realism
- Persists created recipes only in memory (lost on refresh)

To deliberately use mock mode in development, leave both REACT_APP_API_BASE and REACT_APP_BACKEND_URL unset.

To confirm mock mode:
- The Submit page shows: “No API configured. Using local mock store; your recipe will persist until refresh.”
- Network panel won’t show outgoing requests to a backend

## Using a Real Backend

Set one of the following:
- REACT_APP_BACKEND_URL=https://your-backend.example.com (preferred)
- OR REACT_APP_API_BASE=/api (if your dev server proxies to a backend)

The app will:
- Use the HTTP client (`src/api/client.js`) to call `${base}/recipes`, `${base}/recipes/:id`, etc.
- Treat HTTP errors with simple error messages surfaced in UI

Notes:
- REACT_APP_BACKEND_URL takes precedence if both are supplied.
- Ensure CORS is configured on your backend or use a dev proxy if using a different host/port.

## .env example

Example values for local development:

REACT_APP_NODE_ENV=development
REACT_APP_LOG_LEVEL=debug
# Leave the two below empty to use mock mode:
# REACT_APP_BACKEND_URL=
# REACT_APP_API_BASE=

# If you have a real backend, uncomment and set one of these:
# REACT_APP_BACKEND_URL=http://localhost:4000
# REACT_APP_API_BASE=/api

You can create a `.env` file at the project root or within this folder (depending on your tooling). Do not commit real secrets. For CRA, environment variables are embedded at build time.

## Project Structure Highlights

- src/utils/env.js: single source of truth for env/config
- src/api/client.js: minimal fetch wrapper using getApiBaseUrl()
- src/api/recipes.js: selects mock or real API based on env
- src/mocks/mockApi.js: mock dataset and endpoints
- src/contexts/*.jsx: app state (Theme, Recipes, Bookmarks)
- src/pages/*.jsx: pages (Home, Search, Detail, Submit, Bookmarks)
- src/components/*: presentational/reusable components
- src/App.css: Ocean Professional minimalist theme

## Accessibility and Theme

- Light/dark theme toggle via ThemeContext
- Focus-visible outlines, semantic ARIA labels, and accessible components
- Minimalist Ocean Professional style in App.css

## Development and Preview

- Start: `npm start` -> http://localhost:3000
- In dev, if REACT_APP_API_BASE/REACT_APP_BACKEND_URL are not set, mock mode is active.
- In production builds where both are missing, `useMock` is false by design—set a backend URL for real deployments.

## Troubleshooting

- 404s or CORS errors: verify REACT_APP_BACKEND_URL/REACT_APP_API_BASE and backend CORS/proxy settings
- App still in mock mode: check that at least one of REACT_APP_BACKEND_URL or REACT_APP_API_BASE is set and that you’ve restarted the dev server after env changes
- Port conflicts on 3000: stop the other process or change the dev server port
