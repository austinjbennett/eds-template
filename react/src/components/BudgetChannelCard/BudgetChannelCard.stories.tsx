import type {Meta, StoryObj} from '@storybook/react-vite';
import BudgetChannelCard from './BudgetChannelCard';

const meta = {
  title: 'Components/BudgetChannelCard',
  component: BudgetChannelCard,
  decorators: [
    (Story) => (
        <ul className="budget-planner-channels" style={{padding: 0, margin: 0, listStyle: 'none'}}>
          <Story/>
        </ul>
    ),
  ],
  args: {
    channelId: 'paid-search',
    name: 'Paid Search',
    budget: 14000,
    cpl: 120,
    conversionRate: 0.12,
    onBudgetChange: () => undefined,
    onCplChange: () => undefined,
    onConversionRateChange: () => undefined,
  },
} satisfies Meta<typeof BudgetChannelCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const HighBudget: Story = {
  args: {
    name: 'LinkedIn Ads',
    channelId: 'linkedin-ads',
    budget: 28000,
    cpl: 165,
    conversionRate: 0.1,
  },
};
