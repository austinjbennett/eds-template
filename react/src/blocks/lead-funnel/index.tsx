import { createRoot, type Root } from 'react-dom/client';
import { LeadFunnel } from './LeadFunnel';

const roots = new WeakMap<Element, Root>();

type MountOptions = {
  title?: string;
  description?: string;
  monthlyTraffic?: number;
  visitorToLeadRate?: number;
  leadToMqlRate?: number;
  mqlToSqlRate?: number;
  sqlToDealRate?: number;
  averageDealValue?: number;
  salesCycleDays?: number;
  showScenarioComparison?: boolean;
  optimizationLiftPercent?: number;
};

export function mount(target: Element, options: MountOptions = {}): void {
  const root = roots.get(target) ?? createRoot(target);

  if (!roots.has(target)) {
    roots.set(target, root);
  }

  root.render(
    <LeadFunnel
      title={options.title ?? 'Lead Funnel Simulator'}
      description={options.description ?? 'Model conversion rates and compare optimization scenarios in real time.'}
      monthlyTraffic={options.monthlyTraffic ?? 50000}
      visitorToLeadRate={options.visitorToLeadRate ?? 0.028}
      leadToMqlRate={options.leadToMqlRate ?? 0.38}
      mqlToSqlRate={options.mqlToSqlRate ?? 0.45}
      sqlToDealRate={options.sqlToDealRate ?? 0.22}
      averageDealValue={options.averageDealValue ?? 18000}
      salesCycleDays={options.salesCycleDays ?? 45}
      showScenarioComparison={options.showScenarioComparison ?? true}
      optimizationLiftPercent={options.optimizationLiftPercent ?? 20}
    />,
  );
}

export function unmount(target: Element): void {
  const root = roots.get(target);

  if (!root) {
    return;
  }

  root.unmount();
  roots.delete(target);
}

