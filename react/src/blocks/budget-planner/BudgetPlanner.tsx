import { useMemo, useState } from 'react';

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
      <header className="budget-planner-header">
        <h2>{title}</h2>
        <p>{description}</p>
      </header>

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
        {channels.map((channel) => {
          const leads = channel.budget / channel.cpl;
          const deals = leads * channel.conversionRate;

          return (
            <li key={channel.id} className="budget-planner-channel-card">
              <h3>{channel.name}</h3>
              <div className="budget-planner-field">
                <label htmlFor={`${channel.id}-budget`}>Monthly budget</label>
                <input
                  id={`${channel.id}-budget`}
                  type="range"
                  min={1000}
                  max={50000}
                  step={500}
                  value={channel.budget}
                  onChange={(event) =>
                    updateChannel(channel.id, {
                      budget: Number(event.target.value),
                    })
                  }
                />
                <output>{formatCurrency(channel.budget)}</output>
              </div>

              <div className="budget-planner-field-grid">
                <div>
                  <label htmlFor={`${channel.id}-cpl`}>Cost per lead</label>
                  <input
                    id={`${channel.id}-cpl`}
                    type="number"
                    min={10}
                    step={5}
                    value={channel.cpl}
                    onChange={(event) =>
                      updateChannel(channel.id, {
                        cpl: clamp(Number(event.target.value) || 0, 10, 1000),
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor={`${channel.id}-conversion`}>Lead-to-deal conversion %</label>
                  <input
                    id={`${channel.id}-conversion`}
                    type="number"
                    min={1}
                    max={100}
                    step={1}
                    value={Math.round(channel.conversionRate * 100)}
                    onChange={(event) =>
                      updateChannel(channel.id, {
                        conversionRate: clamp(Number(event.target.value) || 0, 1, 100) / 100,
                      })
                    }
                  />
                </div>
              </div>

              <p className="budget-planner-metrics">
                {Math.round(leads)} leads/month, {deals.toFixed(1)} deals/month
              </p>
            </li>
          );
        })}
      </ul>

      <dl className="budget-planner-summary">
        <div>
          <dt>Total budget</dt>
          <dd>{formatCurrency(totals.totalBudget)}</dd>
        </div>
        <div>
          <dt>Projected leads</dt>
          <dd>{Math.round(totals.totalLeads).toLocaleString()}</dd>
        </div>
        <div>
          <dt>Projected revenue</dt>
          <dd>{formatCurrency(totals.projectedRevenue)}</dd>
        </div>
        <div>
          <dt>Projected ROI</dt>
          <dd className={totals.projectedRoi >= 0 ? 'is-positive' : 'is-negative'}>
            {totals.projectedRoi.toFixed(1)}%
          </dd>
        </div>
      </dl>
    </section>
  );
}

