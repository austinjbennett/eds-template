import type {Meta, StoryObj} from '@storybook/react-vite';
import BlockHeader from './BlockHeader';

const meta = {
  title: 'Components/BlockHeader',
  component: BlockHeader,
  args: {
    title: 'Budget Planner',
    description: 'Adjust channel spend and assumptions to forecast leads and pipeline.',
    className: 'budget-planner-header',
  },
} satisfies Meta<typeof BlockHeader>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const WithoutDescription: Story = {
  args: {
    description: undefined,
  },
};
