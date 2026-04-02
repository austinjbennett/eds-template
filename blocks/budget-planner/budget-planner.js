import readGroupedBlockProperties from '../utils/grouped-block-config.js';

const DEFAULT_CHANNELS = [
  {
    id: 'paid-search',
    name: 'Paid Search Default',
    budget: 14000,
    cpl: 120,
    conversionRate: 0.12,
  },
  {
    id: 'linkedin-ads',
    name: 'LinkedIn Ads Default',
    budget: 10000,
    cpl: 165,
    conversionRate: 0.10,
  },
  {
    id: 'webinars',
    name: 'Webinars Default',
    budget: 7000,
    cpl: 95,
    conversionRate: 0.16,
  },
];

const GROUPED_FIELD_KEYS = [
  ['title', 'description'], // textContent field group
  ['averageDealValue'],
  ['channel1Name', 'channel1Budget', 'channel1Cpl', 'channel1ConversionRate'], // channel1 field group
  ['channel2Name', 'channel2Budget', 'channel2Cpl', 'channel2ConversionRate'], // channel2 field group
  ['channel3Name', 'channel3Budget', 'channel3Cpl', 'channel3ConversionRate'], // channel3 field group
];

function readBlockProperties(block) {
  return readGroupedBlockProperties(block, GROUPED_FIELD_KEYS);
}

function buildChannels(config) {
  return DEFAULT_CHANNELS.map((fallback, index) => {
    const slot = index + 1;
    const name = config[`channel${slot}Name`];

    const budgetValue = Number(config[`channel${slot}Budget`]);
    const budget = Number.isFinite(budgetValue) && budgetValue > 0 ? budgetValue : undefined;

    const cplValue = Number(config[`channel${slot}Cpl`]);
    const cpl = Number.isFinite(cplValue) && cplValue > 0 ? cplValue : undefined;

    const rateValue = Number(config[`channel${slot}ConversionRate`]);
    let conversionRate;
    if (Number.isFinite(rateValue) && rateValue > 0) {
      conversionRate = rateValue > 1 ? rateValue / 100 : rateValue;
    }

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
  const config = readBlockProperties(block);

  const moduleUrl = new URL('../../react/dist/budget-planner/budget-planner.js', import.meta.url).toString();
  const module = await import(/* @vite-ignore */ moduleUrl);

  const averageDealValueRaw = config.averageDealValue ?? block.dataset.averageDealValue;
  const averageDealValueParsed = Number(averageDealValueRaw);
  const averageDealValue = Number.isFinite(averageDealValueParsed) && averageDealValueParsed > 0
    ? averageDealValueParsed
    : undefined;

  const { title, description } = config;

  module.mount(block, {
    averageDealValue,
    title,
    description,
    initialChannels: buildChannels(config),
  });
}
