# CSV Converter

Web tool that converts CSV files by replacing semicolons (`;`) with commas (`,`).

Built with [Next.js](https://nextjs.org/) (App Router) and [Tailwind CSS](https://tailwindcss.com/), it compiles to a static site and is automatically published to GitHub Pages via GitHub Actions.

## Features

- CSV file upload from the browser.
- Replaces all `;` with `,` in the content.
- Downloads the converted file without sending data to any server (everything runs client-side).

## Requirements

- Node.js 20 or higher
- pnpm (or npm/yarn/bun)

## Getting Started

```bash
pnpm install
pnpm run dev
# or
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command          | Description                                   |
| ---------------- | --------------------------------------------- |
| `pnpm run dev`   | Starts the development server                 |
| `pnpm run build` | Generates the static export in `out/`         |
| `pnpm run start` | Serves the static export                      |
| `pnpm run lint`  | Runs ESLint                                   |

## Deployment

The project is deployed to GitHub Pages through `.github/workflows/nextjs.yml`. Any `push` to the `main` branch triggers the build and deployment. For this, the Next.js config (`next.config.mjs`) sets `output: 'export'`, `basePath`, and `assetPrefix` to `/csv-converter`.