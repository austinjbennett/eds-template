# AGENTS Guide for `eds-react`

## Big Picture
- This is an Adobe Edge Delivery Services (EDS) site with a hybrid block model:
  - Vanilla EDS block loaders in `blocks/<block>/<block>.js`
  - React UI implementations in `react/src/blocks/<block>/`
  - Built React artifacts committed in `react/dist/` and loaded by EDS at runtime
- Universal Editor (UE) block models are authored in `blocks/*/_*.json`; root `component-*.json` files are generated from `models/_*.json` via `npm run build:json`.

## Runtime/Data Flow (Critical)
- EDS discovers a block and executes `blocks/<name>/<name>.js`.
- Loader reads authored row values (not model key names) and maps them to props.
  - Grouped parser: `blocks/utils/grouped-block-config.js`
  - Example grouped key maps: `blocks/budget-planner/budget-planner.js`, `blocks/lead-funnel/lead-funnel.js`
- Loader injects CSS + dynamically imports module using `new URL(..., import.meta.url)` and `import()`.
- React entry exports `mount(target, options)` / `unmount(target)` and uses `createRoot` with a `WeakMap` per block root.

## Build/Dev Workflows
- Install:
  - `npm install`
  - `cd react && npm install`
- Main workflows:
  - `npm run react:dev` (Vite dev in `react/`)
  - `npm run lint:js`
  - `npm run lint:css`
  - `npm run build:json`
  - `npm run react:build`
- Pre-merge expectation in this repo: run lint + `build:json` + `react:build` and commit generated outputs.

## Project-Specific Conventions
- Do not remove user-added `console.log` statements unless explicitly asked.
- Keep changes minimal and scoped; avoid broad refactors. If needed, ask the user first.
- In block scripts, keep explicit `.js` import extensions (enforced by `.eslintrc.js`).
- CSS classes should stay kebab-case (stylelint is strict).
- `xwalk/max-cells` is enforced with overrides (`budget-planner` and `lead-funnel` allow 5).

## React Build Contract
- Block entries are registered centrally in `react/vite.config.ts` (`blockEntries`).
- Output paths are intentionally stable (e.g., `react/dist/budget-planner/budget-planner.js`).
- Shared chunks must emit to `react/dist/shared/` (not underscore-prefixed paths) to avoid `aem.page` 404 behavior.
- If shared chunk names change, commit corresponding `react/dist/shared/*` files with entry files.

## When Adding/Changing Blocks
- Keep source + generated artifacts together in one change set:
  - `blocks/<name>/*`
  - `react/src/blocks/<name>/*`
  - `react/dist/<name>/*` and any `react/dist/shared/*` changes
  - regenerated root `component-definition.json`, `component-models.json`, `component-filters.json` (when models change)
- Add new block availability to section filters in `models/_section.json`.
- For grouped UE blocks, keep `GROUPED_FIELD_KEYS` order aligned with authored UE row/value order.
