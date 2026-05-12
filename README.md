# Healthcare Premium Demos

Premium healthcare demo website for LinkedIn outreach.

## Tech Stack

- React + Vite
- Tailwind CSS
- Framer Motion
- Lucide React icons
- CSV-driven static demo generation

## Local Development

```bash
npm ci
npm run dev
```

## Build

```bash
npm run build
```

## Batch Generation

```bash
npm run generate:batch batch_1
```

Generated demo pages are written to `publish/{slug}/index.html`.

## Deployment

This project is configured for GitHub Pages using GitHub Actions. The Vite base path is:

```js
base: '/healthcare-premium-demos/'
```

After pushing to `main`, enable GitHub Pages with:

GitHub repo -> Settings -> Pages -> Build and deployment -> Source -> GitHub Actions

## Disclaimer

Unofficial sample concept — created for design preview only.

This is an unofficial sample redesign concept for preview and outreach use. It is not an official healthcare provider website and does not make medical claims.
