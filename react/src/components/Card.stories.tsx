import type { Meta, StoryObj } from '@storybook/react-vite';
import Card from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  args: {
    title: 'Projected Revenue',
    value: '$126,000',
    tone: 'default',
  },
  argTypes: {
    tone: {
      control: 'radio',
      options: ['default', 'positive', 'negative'],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Positive: Story = {
  args: {
    title: 'Projected ROI',
    value: '18.5%',
    tone: 'positive',
  },
};

export const Negative: Story = {
  args: {
    title: 'Projected ROI',
    value: '-8.2%',
    tone: 'negative',
  },
};

