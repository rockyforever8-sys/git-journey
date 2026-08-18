import { useState, useCallback } from 'react';
import Dashboard from './components/Dashboard';
import type { Region } from './data/companies';
import './App.css';

const MAX_SELECTION = 4;

const DEFAULT_SELECTION = ['anthropic', 'openai', 'google', 'deepseek'];

export default function App() {
  const [region, setRegion] = useState<Region | 'all'>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>(DEFAULT_SELECTION);

  const toggleCompany = useCallback((id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      if (prev.length >= MAX_SELECTION) {
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
  }, []);

  const handleCardClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = (e.target as HTMLElement).closest('[data-company-id]');
      if (card) {
        const id = card.getAttribute('data-company-id');
        if (id) toggleCompany(id);
      }
    },
    [toggleCompany],
  );

  return (
    <div className="dashboard">
      <div className="controls">
        <div className="region-tabs">
          {([
            ['all', '🌐 All Regions'],
            ['usa', '🇺🇸 United States'],
            ['china', '🇨🇳 China'],
            ['global', '🌍 Other Global'],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={`region-tab ${region === key ? 'active' : ''} ${key !== 'all' ? key : ''}`}
              onClick={() => setRegion(key)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="metric-selector">
          <label>
            Selected: {selectedIds.length}/{MAX_SELECTION} — click cards to compare
          </label>
        </div>
      </div>

      <div onClick={handleCardClick}>
        <Dashboard selectedIds={selectedIds} region={region} />
      </div>
    </div>
  );
}
