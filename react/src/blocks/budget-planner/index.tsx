import { createRoot, type Root } from 'react-dom/client';
import { BudgetPlanner, type Channel } from './BudgetPlanner';
import './budget-planner.css';

const roots = new WeakMap<Element, Root>();

const DEFAULT_CHANNELS: Channel[] = [
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
    conversionRate: 0.1,
  },
  {
    id: 'webinars',
    name: 'Webinars',
    budget: 7000,
    cpl: 95,
    conversionRate: 0.16,
  },
];

type MountOptions = {
  averageDealValue?: number;
  initialChannels?: Channel[];
};

export function mount(target: Element, options: MountOptions = {}): void {
  const root = roots.get(target) ?? createRoot(target);

  if (!roots.has(target)) {
    roots.set(target, root);
  }

  root.render(
    <BudgetPlanner
      averageDealValue={options.averageDealValue ?? 18000}
      initialChannels={options.initialChannels ?? DEFAULT_CHANNELS}
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

