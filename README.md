# Parallax

Parallax is a local multi-perspective research workspace. It probes a concept
or source from independent lenses, identifies convergence and fault lines, and
presents the result as both readable research artifacts and an explorable 3D
map.

## Requirements

- Node.js 18 or newer
- An OpenRouter API key for new analyses

Loading an included example does not require an API key.

## Run locally

Set `OPENROUTER_API_KEY` in your environment, then run:

```bash
npm run start
```

Open `http://localhost:8787`. The port can be changed with the `PORT`
environment variable.

## Validate

```bash
npm run check
npm test
npm run smoke
npm run quality:strict
```

There are no runtime npm dependencies or build step; `package.json` provides
stable command aliases.

## Project direction

See [the product plan](improvements/PRODUCT_PLAN.md),
[roadmap](improvements/ROADMAP.md), and
[run schema](improvements/RUN_SCHEMA.md).
