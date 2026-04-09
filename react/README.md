# React Blocks for EDS

This workspace builds React-powered UI modules that can be mounted by Edge Delivery Services blocks.

## Included PoC component

- `budget-planner`: interactive marketing budget planner with linked controls, derived totals, and ROI forecasting.
- Why React here: multiple form controls update shared state and live aggregate metrics without manual DOM synchronization.

## Project structure

- `src/blocks/budget-planner/index.tsx`: exports `mount(target, options)` and `unmount(target)`.
- `src/blocks/budget-planner/BudgetPlanner.tsx`: component logic and derived calculations.
- `src/blocks/budget-planner/budget-planner.css`: component styles.
- `dist/budget-planner.css`: built stylesheet loaded by the EDS block bridge.
- `dist/budget-planner/budget-planner.js`: build artifact consumed by EDS block loader.

## Build output contract

`vite.config.ts` is configured so block entry keys map to stable output paths:

- input key: `budget-planner/budget-planner`
- output file: `react/dist/budget-planner/budget-planner.js`

## Local development

```zsh
cd react
npm run dev
```

The dev app (`src/main.tsx`) renders the same component as a playground.

## Build for EDS usage

```zsh
cd react
npm run build
```

Then EDS block code can load the built module from `react/dist`.

Example bridge (`blocks/budget-planner/budget-planner.js`):

```js
export default async function decorate(block) {
  const cssUrl = new URL('../../react/dist/budget-planner.css', import.meta.url).toString();
  const moduleUrl = new URL('../../react/dist/budget-planner/budget-planner.js', import.meta.url).toString();

  if (!document.querySelector('link[data-react-block="budget-planner"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssUrl;
    link.dataset.reactBlock = 'budget-planner';
    document.head.append(link);
  }

  const module = await import(moduleUrl);
  module.mount(block);
}
```
