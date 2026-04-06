import { BudgetPlanner } from './blocks/budget-planner/BudgetPlanner';
import './App.css';
import {LeadFunnel} from "./blocks/lead-funnel/LeadFunnel.tsx";

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

function App() {
  return (
    <main className="app-shell">
      <h1>React Block Playground</h1>
      <p>
        This component demonstrates tightly-coupled state updates across multiple controls.
        It is a strong fit for React vs imperative DOM updates.
      </p>
      <BudgetPlanner initialChannels={DEMO_CHANNELS} averageDealValue={18000} />
      <LeadFunnel monthlyTraffic={50000} visitorToLeadRate={2.8} leadToMqlRate={35} mqlToSqlRate={45} sqlToDealRate={22} averageDealValue={12000} salesCycleDays={45} showScenarioComparison={true} optimizationLiftPercent={20} />
    </main>
  );
}

export default App;
