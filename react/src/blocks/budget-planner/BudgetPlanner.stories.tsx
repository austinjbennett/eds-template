import type { Meta, StoryObj } from '@storybook/react-vite';
import { BudgetPlanner } from './BudgetPlanner';

const DEMO_CHANNELS = [
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

const meta = {
  title: 'Blocks/BudgetPlanner',
  component: BudgetPlanner,
  args: {
    title: 'Budget Planner',
    description: 'Adjust channel spend and assumptions to forecast leads, pipeline, and ROI in real time.',
    initialChannels: DEMO_CHANNELS,
    averageDealValue: 18000,
  },
} satisfies Meta<typeof BudgetPlanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EnterpriseDealSize: Story = {
  args: {
    averageDealValue: 32000,
  },
};

