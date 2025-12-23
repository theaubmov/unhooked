# Repository Guidelines

## Project Structure & Module Organization
This is a Vite + React + TypeScript SPA. Current layout:
- `index.html` is the HTML entry point.
- `README.md` covers setup and environment variables.
- `vite.config.js` configures the build and plugins.
- `tsconfig.json` defines TypeScript compiler settings.
- `src/main.tsx` boots the app and mounts React.
- `src/App.tsx` is the top-level component.
- `src/app.constants.ts` holds app-wide constants (e.g., platforms).
- `src/app.types.ts` holds app-wide types (including CSS variables).
- `src/index.css` holds global styles.
- `src/components/` holds UI components split by view/role.
- `src/apis/` holds API client implementations.
- `src/services/` holds service-layer wrappers and business logic.
- `src/types/` holds shared TypeScript types and interfaces.

If you add more modules, group by feature under `src/` and keep test files alongside or in a future `tests/` directory.

## Build, Test, and Development Commands
Use npm from the repository root:
- `npm install` — install dependencies.
- `npm run dev` — start the Vite dev server.
- `npm run build` — create a production build in `dist/`.
- `npm run preview` — preview the production build locally.
- `npm run lint` — run ESLint on TS/TSX sources.
- `npm run format` — format supported files with Prettier.

## Coding Style & Naming Conventions
ESLint and Prettier are configured:
- ESLint config: `.eslintrc.cjs`
- Prettier config: `.prettierrc.json`

Follow existing conventions:
- Use 2-space indentation and semicolons in TS/TSX.
- Component names and files use `PascalCase` (e.g., `ProfileCard.tsx`).
- Hooks use `camelCase` with a `use` prefix (e.g., `useUser.ts`).
- Styles live in CSS files like `index.css`.
- Keep `src/App.tsx` focused on orchestration (state, handlers, data flow); move UI sections into `src/components/`.
- Prefer small, typed components and typed props.
- Put shared app constants in `src/app.constants.ts` and shared app types in `src/app.types.ts`.

## Testing Guidelines
No test framework is configured yet. If you add one, document:
- Test location and naming (e.g., `src/components/ProfileCard.test.tsx`).
- How to run unit and integration tests.
- Coverage targets, if any.

## Commit & Pull Request Guidelines
No commit-message convention is established. Until one exists, use Conventional Commits:
- `feat: add profile serializer`
- `fix: handle empty user list`

Pull requests should include:
- A clear description of changes and motivation.
- Linked issues (if applicable).
- Test evidence or rationale for no tests.

## Configuration & Secrets
Do not commit credentials or environment files. Use `.env.example` to document required variables and keep secrets in your local environment or secret manager.
The YouTube subscription flow uses `YOUTUBE_ACCESS_TOKEN` from the environment; `YOUTUBE_API_KEY` is optional.
