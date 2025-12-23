# Unhooked

Unhooked is a Vite + React + TypeScript single-page app for cleaning up your feed.
The current focus is YouTube subscription cleanup (unsubscribe/keep), with more
platforms planned.

## Requirements

- Node.js + npm
- A YouTube access token with the `youtube` scope

## Quick start

```bash
npm install
npm run dev
```

Then open the local URL that Vite prints.

## Environment variables

Create a local `.env` file (see `.env.example`).

Required:
- `YOUTUBE_ACCESS_TOKEN`

Optional:
- `YOUTUBE_API_KEY` (not required for subscription reads when using access tokens)
- `YOUTUBE_CLIENT_ID`

Vite exposes these values at build time. Restart the dev server after changes.

## Scripts

- `npm run dev` - start the Vite dev server
- `npm run build` - build a production bundle
- `npm run preview` - preview the production build
- `npm run lint` - run ESLint
- `npm run format` - run Prettier

## Project structure

- `index.html` - entry HTML
- `src/main.tsx` - React bootstrap
- `src/App.tsx` - top-level app state and orchestration
- `src/components/` - UI components
- `src/apis/` - API clients
- `src/services/` - service layer
- `src/types/` - shared types

## Notes

- Do not commit secrets or `.env` files.
