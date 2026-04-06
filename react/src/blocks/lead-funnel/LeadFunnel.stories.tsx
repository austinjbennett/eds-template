import type {Meta, StoryObj} from '@storybook/react-vite';
import {LeadFunnel} from './LeadFunnel';

const meta = {
  title: 'Blocks/LeadFunnel',
  component: LeadFunnel,
  args: {
    title: 'Lead Funnel Simulator',
    description: 'Model conversion rates and compare optimization scenarios in real time.',
    monthlyTraffic: 50000,
    visitorToLeadRate: 0.028,
    leadToMqlRate: 0.38,
    mqlToSqlRate: 0.45,
    sqlToDealRate: 0.22,
    averageDealValue: 18000,
    salesCycleDays: 45,
    showScenarioComparison: true,
    optimizationLiftPercent: 20,
  },
} satisfies Meta<typeof LeadFunnel>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const HighTrafficScenario: Story = {
  args: {
    monthlyTraffic: 90000,
    optimizationLiftPercent: 30,
  },
};
