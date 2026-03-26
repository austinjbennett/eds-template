import { readBlockConfig } from '../../scripts/aem.js';

const DEFAULT_CHANNELS = [
  {
    id: 'paid-search',
    name: 'Paid Search',
    budget: 14000,
    cpl: 120,
    conversionRate: 0.12,
  },
  {
    id: 'linkedin-ads',
    name: 'LinkedIn Ads',
    budget: 10000,
    cpl: 165,
    conversionRate: 0.10,
  },
  {
    id: 'webinars',
    name: 'Webinars',
    budget: 7000,
    cpl: 95,
    conversionRate: 0.16,
  },
];

function getConfigValue(config, ...keys) {
  const matchedKey = keys.find((key) => config[key] !== undefined);
  return matchedKey ? config[matchedKey] : undefined;
}

function toPositiveNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

function toPercentDecimal(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return undefined;
  }

  return parsed > 1 ? parsed / 100 : parsed;
}

function buildChannels(config) {
  return DEFAULT_CHANNELS.map((fallback, index) => {
    const slot = index + 1;
    const name = getConfigValue(config, `channel${slot}-name`, `channel${slot}Name`);
    const budget = toPositiveNumber(getConfigValue(config, `channel${slot}-budget`, `channel${slot}Budget`));
    const cpl = toPositiveNumber(getConfigValue(config, `channel${slot}-cpl`, `channel${slot}Cpl`));
    const conversionRate = toPercentDecimal(
      getConfigValue(config, `channel${slot}-conversion-rate`, `channel${slot}ConversionRate`),
    );

    return {
      id: fallback.id,
      name: typeof name === 'string' && name.trim() ? name.trim() : fallback.name,
      budget: budget ?? fallback.budget,
      cpl: cpl ?? fallback.cpl,
      conversionRate: conversionRate ?? fallback.conversionRate,
    };
  });
}

export default async function decorate(block) {
  const moduleUrl = new URL('../../react/dist/budget-planner/budget-planner.js', import.meta.url).toString();
  const module = await import(/* @vite-ignore */ moduleUrl);

  const config = readBlockConfig(block);
  const averageDealValue = toPositiveNumber(
    getConfigValue(config, 'average-deal-value', 'averageDealValue') ?? block.dataset.averageDealValue,
  );

  const title = getConfigValue(config, 'title');
  const description = getConfigValue(config, 'description');

  module.mount(block, {
    averageDealValue,
    title: typeof title === 'string' ? title : undefined,
    description: typeof description === 'string' ? description : undefined,
    initialChannels: buildChannels(config),
  });
}
