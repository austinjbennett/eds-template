type BudgetChannelCardProps = {
  channelId: string;
  name: string;
  budget: number;
  cpl: number;
  conversionRate: number;
  onBudgetChange: (value: number) => void;
  onCplChange: (value: number) => void;
  onConversionRateChange: (value: number) => void;
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function BudgetChannelCard({
  channelId,
  name,
  budget,
  cpl,
  conversionRate,
  onBudgetChange,
  onCplChange,
  onConversionRateChange,
}: BudgetChannelCardProps) {
  const leads = budget / cpl;
  const deals = leads * conversionRate;

  return (
    <li className="budget-planner-channel-card">
      <h3>{name}</h3>
      <div className="budget-planner-field">
        <label htmlFor={`${channelId}-budget`}>Monthly budget</label>
        <input
          id={`${channelId}-budget`}
          type="range"
          min={1000}
          max={50000}
          step={500}
          value={budget}
          onChange={(event) => onBudgetChange(Number(event.target.value))}
        />
        <output>{formatCurrency(budget)}</output>
      </div>

      <div className="budget-planner-field-grid">
        <div>
          <label htmlFor={`${channelId}-cpl`}>Cost per lead</label>
          <input
            id={`${channelId}-cpl`}
            type="number"
            min={10}
            step={5}
            value={cpl}
            onChange={(event) => onCplChange(Number(event.target.value) || 0)}
          />
        </div>
        <div>
          <label htmlFor={`${channelId}-conversion`}>Lead-to-deal conversion %</label>
          <input
            id={`${channelId}-conversion`}
            type="number"
            min={1}
            max={100}
            step={1}
            value={Math.round(conversionRate * 100)}
            onChange={(event) => onConversionRateChange(Number(event.target.value) || 0)}
          />
        </div>
      </div>

      <p className="budget-planner-metrics">
        {Math.round(leads)} leads/month, {deals.toFixed(1)} deals/month
      </p>
    </li>
  );
}

