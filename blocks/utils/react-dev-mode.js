/**
 * Utilities for loading React block modules from the Vite dev server during local development.
 *
 * Usage: append `?react-dev` to any localhost AEM page URL while `npm run react:dev` is running.
 * Block loaders will import from http://localhost:5173 instead of the committed react/dist build,
 * enabling Vite HMR without rebuilding the production bundle on every change.
 */

const VITE_DEV_ORIGIN = 'http://localhost:5173';

/**
 * Returns true when the page URL contains the `?react-dev` parameter,
 * indicating the Vite dev server should be used for React modules.
 *
 * @returns {boolean}
 */
export function isReactDevMode() {
  return new URLSearchParams(window.location.search).has('react-dev');
}

/**
 * Returns the appropriate module URL for the current environment.
 * - Normal: the pre-built `react/dist` artifact URL (from `new URL(..., import.meta.url)`)
 * - Dev (`?react-dev`): a URL pointing to the Vite dev server src path for HMR
 *
 * @param {string} prodUrl - Resolved dist URL from new URL('../../react/dist/...', import.meta.url)
 * @param {string} devPath - Vite src path, e.g. '/src/blocks/budget-planner/index.tsx'
 * @returns {string}
 */
export function resolveReactModuleUrl(prodUrl, devPath) {
  return isReactDevMode() ? `${VITE_DEV_ORIGIN}${devPath}` : prodUrl;
}
