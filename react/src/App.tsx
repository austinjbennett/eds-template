import { BudgetPlanner } from './blocks/budget-planner/BudgetPlanner';
import './App.css';

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
    </main>
  );
}

export default App;
