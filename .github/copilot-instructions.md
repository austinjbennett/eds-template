# Copilot Instructions for `eds-template`

This repository is an Adobe Edge Delivery Services (EDS) project with React used for interactive block experiences. Follow these instructions when proposing or making changes.

## Project Context

- EDS blocks live under `blocks/<block-name>/`.
- React source lives under `react/src/blocks/<block-name>/`.
- React build output is committed under `react/dist/` and loaded by EDS block scripts.
- Universal Editor (UE) models are defined in `blocks/*/_*.json`, then merged into root files via `npm run build:json`.

## Non-Negotiable Conventions

- Do not remove user-added `console.log` debug statements unless explicitly asked.
- Keep edits minimal and scoped; avoid broad refactors unless requested.
- Prefer strict lint compliance by changing code, not weakening rules.
- Use kebab-case CSS class names (no BEM `__` selectors) to satisfy stylelint.
- Keep imports with explicit `.js` extensions in block scripts where required by ESLint.

## EDS + React Integration Rules

- Block loader scripts (`blocks/*/*.js`) must import React bundles with `new URL(..., import.meta.url)` and dynamic `import()`.
- React entries are defined in `react/vite.config.ts` under `blockEntries`.
- Shared chunks must be emitted to a non-underscore folder (use `shared/`, not `_shared/`) because underscore-prefixed paths can 404 on `aem.page`.
- Commit all related `react/dist/*` outputs together after a build. Do not partially commit entry files without their shared chunk(s).

## UE Model and Block Parsing Rules

- UE element grouping (`group_key`) is used to reduce logical cell count for `xwalk/max-cells`.
- Do not assume UE outputs key names in block HTML; block scripts parse row order and value order.
- Grouped parsing is shared in `blocks/utils/grouped-block-config.js`.
- For grouped blocks:
  - Define `GROUPED_FIELD_KEYS` in block script.
  - Use `readGroupedBlockProperties(block, GROUPED_FIELD_KEYS)`.
  - Keep `GROUPED_FIELD_KEYS` order aligned with UE output row order.

## Linting and Build Guardrails

- JS lint config is in `.eslintrc.js` with `xwalk/max-cells` overrides:
  - default: 4
  - `budget-planner`: 5
  - `lead-funnel`: 5
- CSS lint is strict via `stylelint-config-standard`.
- Before finalizing changes, run:

```bash
npm run lint:js
npm run lint:css
npm run build:json
npm run react:build
```

If lint warnings are only from intentional `console.log` debug statements, do not remove logs unless requested.

## Safe Change Patterns

- When adding a new React block:
  1. Add `blocks/<name>/<name>.js` and `<name>.css`.
  2. Add `blocks/<name>/_<name>.json` model.
  3. Add React entry `react/src/blocks/<name>/index.tsx` and component(s).
  4. Register entry in `react/vite.config.ts`.
  5. Add block to `models/_section.json` filter list.
  6. Run `npm run build:json` and commit merged JSON files.
  7. Run `npm run react:build` and commit `react/dist/*` outputs.

- Prefer extracting shared React UI into `react/src/components/` when used by 2+ blocks.
- Prefer extracting shared EDS parsing helpers into `blocks/utils/` when used by 2+ block scripts.

## Things to Avoid

- Do not change runtime paths in a way that produces underscore-prefixed shared asset directories.
- Do not assume local dev behavior guarantees `aem.page` behavior; keep paths explicit and committed.
- Do not introduce over-engineered parsing when UE output structure is known and stable.
- Do not revert unrelated user changes.

## Commit Hygiene

- Keep related source + generated artifacts in the same commit.
- If React output changes shared chunk names, ensure corresponding `react/dist/shared/*` files are included.
- For model changes, always include regenerated root `component-*.json` files.

