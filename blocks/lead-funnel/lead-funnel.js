import readGroupedBlockProperties from '../utils/grouped-block-config.js';

const GROUPED_FIELD_KEYS = [
  ['title', 'description'],
  ['monthlyTraffic', 'visitorToLeadRate', 'leadToMqlRate', 'mqlToSqlRate', 'sqlToDealRate', 'averageDealValue', 'salesCycleDays', 'showScenarioComparison', 'optimizationLiftPercent'],
];

function readBlockProperties(block) {
  return readGroupedBlockProperties(block, GROUPED_FIELD_KEYS);
}

function toPositiveNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

function toRate(value) {
  const parsed = toPositiveNumber(value);
  if (!parsed) {
    return undefined;
  }

  return parsed > 1 ? parsed / 100 : parsed;
}

function toBoolean(value) {
  if (typeof value !== 'string') {
    return undefined;
  }

  const normalized = value.trim().toLowerCase();

  if (['true', 'yes', '1', 'on'].includes(normalized)) {
    return true;
  }

  if (['false', 'no', '0', 'off'].includes(normalized)) {
    return false;
  }

  return undefined;
}

export default async function decorate(block) {
  const config = readBlockProperties(block);

  const moduleUrl = new URL('../../react/dist/lead-funnel/lead-funnel.js', import.meta.url).toString();
  const module = await import(/* @vite-ignore */ moduleUrl);

  module.mount(block, {
    title: config.title,
    description: config.description,
    monthlyTraffic: toPositiveNumber(config.monthlyTraffic),
    visitorToLeadRate: toRate(config.visitorToLeadRate),
    leadToMqlRate: toRate(config.leadToMqlRate),
    mqlToSqlRate: toRate(config.mqlToSqlRate),
    sqlToDealRate: toRate(config.sqlToDealRate),
    averageDealValue: toPositiveNumber(config.averageDealValue),
    salesCycleDays: toPositiveNumber(config.salesCycleDays),
    showScenarioComparison: toBoolean(config.showScenarioComparison),
    optimizationLiftPercent: toPositiveNumber(config.optimizationLiftPercent),
  });
}
