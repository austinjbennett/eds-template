import { useMemo, useState } from 'react';
import BlockHeader from '../../components/BlockHeader';
import Card from '../../components/Card';
import BudgetChannelCard from '../../components/BudgetChannelCard';
import './budget-planner.css';

export type Channel = {
  id: string;
  name: string;
  budget: number;
  cpl: number;
  conversionRate: number;
};

type BudgetPlannerProps = {
  title?: string;
  description?: string;
  initialChannels: Channel[];
  averageDealValue: number;
};

type Totals = {
  totalBudget: number;
  totalLeads: number;
  totalDeals: number;
  projectedRevenue: number;
  projectedRoi: number;
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function calculateTotals(channels: Channel[], averageDealValue: number): Totals {
  const totalBudget = channels.reduce((sum, channel) => sum + channel.budget, 0);
  const totalLeads = channels.reduce((sum, channel) => sum + channel.budget / channel.cpl, 0);
  const totalDeals = channels.reduce(
    (sum, channel) => sum + (channel.budget / channel.cpl) * channel.conversionRate,
    0,
  );
  const projectedRevenue = totalDeals * averageDealValue;
  const projectedRoi = totalBudget === 0 ? 0 : ((projectedRevenue - totalBudget) / totalBudget) * 100;

  return {
    totalBudget,
    totalLeads,
    totalDeals,
    projectedRevenue,
    projectedRoi,
  };
}

export function BudgetPlanner({
  title = 'Budget Planner',
  description = 'Adjust channel spend and assumptions to forecast leads, pipeline, and ROI in real time.',
  initialChannels,
  averageDealValue,
}: BudgetPlannerProps) {
  const [channels, setChannels] = useState<Channel[]>(initialChannels);
  const [dealValue, setDealValue] = useState<number>(averageDealValue);

  const totals = useMemo(() => calculateTotals(channels, dealValue), [channels, dealValue]);

  const updateChannel = (id: string, partial: Partial<Channel>) => {
    setChannels((current) =>
      current.map((channel) =>
        channel.id === id
          ? {
              ...channel,
              ...partial,
            }
          : channel,
      ),
    );
  };

  return (
    <section className="budget-planner-r" aria-label="Marketing budget planner">
      <BlockHeader title={title} description={description} className="budget-planner-header" />

      <div className="budget-planner-deal-value">
        <label htmlFor="deal-value">Average deal value</label>
        <input
          id="deal-value"
          type="number"
          min={1000}
          step={500}
          value={dealValue}
          onChange={(event) => setDealValue(clamp(Number(event.target.value) || 0, 1000, 100000))}
        />
      </div>

      <ul className="budget-planner-channels">
        {channels.map((channel) => (
          <BudgetChannelCard
            key={channel.id}
            channelId={channel.id}
            name={channel.name}
            budget={channel.budget}
            cpl={channel.cpl}
            conversionRate={channel.conversionRate}
            onBudgetChange={(value) => updateChannel(channel.id, { budget: value })}
            onCplChange={(value) => updateChannel(channel.id, { cpl: clamp(value, 10, 1000) })}
            onConversionRateChange={(value) =>
              updateChannel(channel.id, { conversionRate: clamp(value, 1, 100) / 100 })
            }
          />
        ))}
      </ul>

      <section className="budget-planner-summary" aria-label="Budget planner summary metrics">
        <Card title="Total budget" value={formatCurrency(totals.totalBudget)} />
        <Card title="Projected leads" value={Math.round(totals.totalLeads).toLocaleString()} />
        <Card title="Projected revenue" value={formatCurrency(totals.projectedRevenue)} />
        <Card
          title="Projected ROI"
          value={`${totals.projectedRoi.toFixed(1)}%`}
          tone={totals.projectedRoi >= 0 ? 'positive' : 'negative'}
        />
      </section>
    </section>
  );
}

