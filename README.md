# EDS with React

This repository is an Adobe Edge Delivery Services (EDS) project that combines:

- standard EDS blocks under `blocks/`
- React-powered interactive blocks under `react/src/blocks/`
- Universal Editor (UE) component models under `blocks/*/_*.json` and `models/`

Use this guide to understand how code is organized and how to safely add new blocks/components.

Copilot guidance for this repo lives in `.github/copilot-instructions.md`.
AI Agent guidance for this repo lives in `AGENTS.md`.

## Environments

- Preview: `https://main--eds-react--rightpoint.aem.page/`
- Live: `https://main--eds-react--rightpoint.aem.live/`

## Repository Structure

```text
blocks/
  <block-name>/
	<block-name>.js        # EDS block loader/decorator
	<block-name>.css       # EDS block styles
	_<block-name>.json     # UE model definition for the block
  utils/
	grouped-block-config.js # Shared grouped-row parsing helpers

react/
  src/
	blocks/
	  <block-name>/
		index.tsx          # React mount/unmount entry for Vite
		<Block>.tsx        # React UI implementation
    <block-name>.css   # Block-scoped styles
	components/
    <component-name>/
      <Component>.tsx    # Component implementation
      <Component>.css    # Component styles
      index.tsx          # Export for clean imports
  dist/
	<block-name>/<block-name>.js
  <block-name>/<block-name>.css
	shared/*.js            # Shared runtime/chunks (must be committed)

models/
  _component-definition.json
  _component-models.json
  _component-filters.json
  _section.json

component-definition.json  # generated from models/
component-models.json      # generated from models/
component-filters.json     # generated from models/
```

## How EDS + React Works Here

1. EDS executes `blocks/<name>/<name>.js` when a block is found on the page.
2. That loader parses authored block rows and dynamically imports the React bundle from `react/dist` using:
   - `new URL(..., import.meta.url)`
   - dynamic `import()`
3. The React entry (`react/src/blocks/<name>/index.tsx`) exports `mount()`/`unmount()` and renders into the block root.
4. Shared React chunks are emitted to `react/dist/shared/`.

## Universal Editor Modeling Notes

- UE grouping is used to keep logical cell counts manageable for `xwalk/max-cells`.
- Block HTML does not include model key names; parsing depends on row and value order.
- Grouped parsing is centralized in `blocks/utils/grouped-block-config.js`.

For grouped blocks:

1. Define `GROUPED_FIELD_KEYS` in the block script.
2. Keep array order aligned to authored UE row order.
3. Parse with `readGroupedBlockProperties(block, GROUPED_FIELD_KEYS)`.

## Setup

```bash
npm install
cd react && npm install
```

## Development Commands

```bash
npm run react:dev
npm run lint:js
npm run lint:css
npm run build:json
npm run react:build
```

Recommended pre-merge validation:

```bash
npm run lint:js
npm run lint:css
npm run build:json
npm run react:build
```

## Adding a New React Block

1. Create EDS files:
   - `blocks/<name>/<name>.js`
   - `blocks/<name>/<name>.css`
2. Create UE model:
   - `blocks/<name>/_<name>.json`
3. Create React files:
   - `react/src/blocks/<name>/index.tsx`
   - `react/src/blocks/<name>/<Component>.tsx`
4. Register entry in `react/vite.config.ts` (`blockEntries`).
5. Add `<name>` to `models/_section.json` filters.
6. Regenerate component JSON:
   - `npm run build:json`
7. Build React output:
   - `npm run react:build`
8. Commit source + generated files together:
   - `blocks/...`
   - `react/src/...`
   - `react/dist/...`
   - `component-*.json`

## Helpful Docs

- [AEM Live Docs](https://www.aem.live/docs/)
- [Anatomy of an EDS Project](https://www.aem.live/developer/anatomy-of-a-project)
- [Creating Blocks](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/edge-delivery/wysiwyg-authoring/create-block)
- [Content Modeling](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/edge-delivery/wysiwyg-authoring/content-modeling)
