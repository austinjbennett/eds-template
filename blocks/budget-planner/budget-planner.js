import { readBlockConfig } from '../../scripts/aem.js';

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

  const module = await import(/* @vite-ignore */ moduleUrl);

  // Support both UE block config rows and data-* attributes.
  const config = readBlockConfig(block);
  const averageDealValue = Number(
    config['average-deal-value']
    ?? config.averageDealValue
    ?? block.dataset.averageDealValue,
  );

  module.mount(block, {
    averageDealValue: Number.isFinite(averageDealValue) && averageDealValue > 0
      ? averageDealValue
      : undefined,
  });
}
