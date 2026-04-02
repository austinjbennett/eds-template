import { useMemo, useState } from 'react';
import BlockHeader from '../../components/BlockHeader';
import Card from '../../components/Card';

type FunnelProps = {
  title?: string;
  description?: string;
  monthlyTraffic: number;
  visitorToLeadRate: number;
  leadToMqlRate: number;
  mqlToSqlRate: number;
  sqlToDealRate: number;
  averageDealValue: number;
  salesCycleDays: number;
  showScenarioComparison: boolean;
  optimizationLiftPercent: number;
};

type FunnelTotals = {
  leads: number;
  mqls: number;
  sqls: number;
  deals: number;
  revenue: number;
};

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatRate(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

function calculateFunnel(
  monthlyTraffic: number,
  visitorToLeadRate: number,
  leadToMqlRate: number,
  mqlToSqlRate: number,
  sqlToDealRate: number,
  averageDealValue: number,
  multiplier: number,
): FunnelTotals {
  const leads = monthlyTraffic * visitorToLeadRate * multiplier;
  const mqls = leads * leadToMqlRate;
  const sqls = mqls * mqlToSqlRate;
  const deals = sqls * sqlToDealRate;
  const revenue = deals * averageDealValue;

  return {
    leads,
    mqls,
    sqls,
    deals,
    revenue,
  };
}

export function LeadFunnel({
  title = 'Lead Funnel Simulator',
  description = 'Model conversion rates and compare optimization scenarios in real time.',
  monthlyTraffic,
  visitorToLeadRate,
  leadToMqlRate,
  mqlToSqlRate,
  sqlToDealRate,
  averageDealValue,
  salesCycleDays,
  showScenarioComparison,
  optimizationLiftPercent,
}: FunnelProps) {
  const [period, setPeriod] = useState<'month' | 'quarter'>('month');
  const [traffic, setTraffic] = useState(monthlyTraffic);
  const [v2l, setV2l] = useState(visitorToLeadRate);
  const [l2m, setL2m] = useState(leadToMqlRate);
  const [m2s, setM2s] = useState(mqlToSqlRate);
  const [s2d, setS2d] = useState(sqlToDealRate);
  const [dealValue, setDealValue] = useState(averageDealValue);
  const [liftPercent, setLiftPercent] = useState(optimizationLiftPercent);
  const [compareEnabled, setCompareEnabled] = useState(showScenarioComparison);

  const multiplier = period === 'month' ? 1 : 3;

  const baseline = useMemo(
    () => calculateFunnel(traffic, v2l, l2m, m2s, s2d, dealValue, multiplier),
    [traffic, v2l, l2m, m2s, s2d, dealValue, multiplier],
  );

  const comparison = useMemo(() => {
    if (!compareEnabled) {
      return null;
    }

    const lift = 1 + liftPercent / 100;

    const lifted = calculateFunnel(
      traffic,
      clamp(v2l * lift, 0, 1),
      clamp(l2m * lift, 0, 1),
      clamp(m2s * lift, 0, 1),
      clamp(s2d * lift, 0, 1),
      dealValue,
      multiplier,
    );

    return {
      lifted,
      dealDelta: lifted.deals - baseline.deals,
      revenueDelta: lifted.revenue - baseline.revenue,
    };
  }, [compareEnabled, liftPercent, traffic, v2l, l2m, m2s, s2d, dealValue, multiplier, baseline]);

  return (
    <section className="lead-funnel-r" aria-label="Lead funnel simulator">
      <BlockHeader title={title} description={description} className="lead-funnel-header" />

      <div className="lead-funnel-toolbar">
        <button type="button" className={period === 'month' ? 'is-active' : ''} onClick={() => setPeriod('month')}>
          Monthly
        </button>
        <button type="button" className={period === 'quarter' ? 'is-active' : ''} onClick={() => setPeriod('quarter')}>
          Quarterly
        </button>
      </div>

      <div className="lead-funnel-grid">
        <label className="lead-funnel-field">
          Monthly traffic
          <input
            type="number"
            min={1000}
            step={1000}
            value={traffic}
            onChange={(event) => setTraffic(clamp(Number(event.target.value) || 0, 1000, 5000000))}
          />
        </label>

        <label className="lead-funnel-field">
          Visitor to lead
          <input
            type="range"
            min={0.1}
            max={20}
            step={0.1}
            value={v2l * 100}
            onChange={(event) => setV2l(clamp(Number(event.target.value) || 0, 0.1, 20) / 100)}
          />
          <span className="lead-funnel-field-value">{formatRate(v2l)}</span>
        </label>

        <label className="lead-funnel-field">
          Lead to MQL
          <input
            type="range"
            min={1}
            max={100}
            step={1}
            value={l2m * 100}
            onChange={(event) => setL2m(clamp(Number(event.target.value) || 0, 1, 100) / 100)}
          />
          <span className="lead-funnel-field-value">{formatRate(l2m)}</span>
        </label>

        <label className="lead-funnel-field">
          MQL to SQL
          <input
            type="range"
            min={1}
            max={100}
            step={1}
            value={m2s * 100}
            onChange={(event) => setM2s(clamp(Number(event.target.value) || 0, 1, 100) / 100)}
          />
          <span className="lead-funnel-field-value">{formatRate(m2s)}</span>
        </label>

        <label className="lead-funnel-field">
          SQL to deal
          <input
            type="range"
            min={1}
            max={100}
            step={1}
            value={s2d * 100}
            onChange={(event) => setS2d(clamp(Number(event.target.value) || 0, 1, 100) / 100)}
          />
          <span className="lead-funnel-field-value">{formatRate(s2d)}</span>
        </label>

        <label className="lead-funnel-field">
          Average deal value
          <input
            type="number"
            min={1000}
            step={500}
            value={dealValue}
            onChange={(event) => setDealValue(clamp(Number(event.target.value) || 0, 1000, 1000000))}
          />
        </label>
      </div>

      <section className="lead-funnel-summary" aria-label="Lead funnel summary metrics">
        <Card title="Leads" value={Math.round(baseline.leads).toLocaleString()} />
        <Card title="MQLs" value={Math.round(baseline.mqls).toLocaleString()} />
        <Card title="SQLs" value={Math.round(baseline.sqls).toLocaleString()} />
        <Card title="Deals" value={baseline.deals.toFixed(1)} />
        <Card title={`Revenue (${period})`} value={formatCurrency(baseline.revenue)} />
        <Card title="Sales cycle" value={`${Math.round(salesCycleDays)} days`} />
      </section>

      <div className="lead-funnel-field" style={{ marginTop: '16px' }}>
        <label>
          <input
            type="checkbox"
            checked={compareEnabled}
            onChange={(event) => setCompareEnabled(event.target.checked)}
          />{' '}
          Show optimization scenario
        </label>
        <label>
          Lift percent
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={liftPercent}
            onChange={(event) => setLiftPercent(clamp(Number(event.target.value) || 0, 0, 100))}
          />
          <span className="lead-funnel-field-value">{liftPercent}%</span>
        </label>
      </div>

      {comparison && (
        <section className="lead-funnel-comparison" aria-label="Optimization scenario">
          <h3>Optimization scenario</h3>
          <p>
            Deals: {comparison.lifted.deals.toFixed(1)}{' '}
            <span className="lead-funnel-delta">(+{comparison.dealDelta.toFixed(1)})</span>
          </p>
          <p>
            Revenue: {formatCurrency(comparison.lifted.revenue)}{' '}
            <span className="lead-funnel-delta">(+{formatCurrency(comparison.revenueDelta)})</span>
          </p>
        </section>
      )}
    </section>
  );
}

