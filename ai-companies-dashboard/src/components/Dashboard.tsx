import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell,
} from 'recharts';
import {
  companies, METRIC_LABELS,
  BENCHMARK_METRICS, CAPABILITY_METRICS, normalizeMetric,
} from '../data/companies';
import type { Company, CompanyMetrics, Region } from '../data/companies';

type MetricKey = keyof CompanyMetrics;

interface Props {
  selectedIds: string[];
  region: Region | 'all';
}

function getFilteredCompanies(region: Region | 'all'): Company[] {
  if (region === 'all') return companies;
  return companies.filter((c) => c.region === region);
}

function getSelectedCompanies(ids: string[]): Company[] {
  return companies.filter((c) => ids.includes(c.id));
}

export default function Dashboard({ selectedIds, region }: Props) {
  const filtered = getFilteredCompanies(region);
  const selected = getSelectedCompanies(selectedIds);

  const radarMetrics: MetricKey[] = [
    'arenaElo', 'gpqa', 'sweBench', 'math', 'costEfficiency', 'openSource',
  ];

  const radarData = radarMetrics.map((key) => {
    const entry: Record<string, string | number> = {
      metric: METRIC_LABELS[key].label,
    };
    selected.forEach((c) => {
      entry[c.name] = normalizeMetric(key, c.metrics[key]);
    });
    return entry;
  });

  const benchmarkData = BENCHMARK_METRICS.map((key) => {
    const entry: Record<string, string | number> = {
      name: METRIC_LABELS[key].label,
      key,
    };
    selected.forEach((c) => {
      entry[c.name] = c.metrics[key];
    });
    return entry;
  });

  const capabilityData = CAPABILITY_METRICS.map((key) => {
    const entry: Record<string, string | number> = {
      name: METRIC_LABELS[key].label,
      key,
    };
    selected.forEach((c) => {
      entry[c.name] = normalizeMetric(key, c.metrics[key]);
    });
    return entry;
  });

  const regionLabel = region === 'all' ? 'All Regions' : region === 'usa' ? '🇺🇸 United States' : region === 'china' ? '🇨🇳 China' : '🌍 Global';

  return (
    <>
      <header className="header">
        <h1>AI Model Companies Dashboard</h1>
        <p>
          Compare the world's leading AI labs across benchmark scores, capabilities,
          and strategic positioning — with focus on America and China.
        </p>
      </header>

      <CompanySelector filtered={filtered} selectedIds={selectedIds} />

      {selected.length === 0 ? (
        <div className="empty-state">
          <p>Select up to 4 companies above to start comparing</p>
        </div>
      ) : (
        <>
          <section className="comparison-section">
            <p className="selection-hint">
              Comparing <span className="selection-count">{selected.length}</span> companies
              in <strong>{regionLabel}</strong>
            </p>
            <div className="comparison-cards">
              {selected.map((c) => (
                <div
                  key={c.id}
                  className="comparison-card"
                  style={{ '--company-color': c.color } as React.CSSProperties}
                >
                  <h4>
                    <span>{c.flag}</span> {c.name}
                  </h4>
                  <div className="strength-weakness">
                    <div className="sw-list strengths">
                      <h5>Strengths</h5>
                      <ul>
                        {c.strengths.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="sw-list weaknesses">
                      <h5>Weaknesses</h5>
                      <ul>
                        {c.weaknesses.map((w) => (
                          <li key={w}>{w}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="charts-section">
            <div className="chart-card">
              <h3>Capability Radar</h3>
              <p className="subtitle">Normalized scores across 6 key dimensions (0–100)</p>
              <ResponsiveContainer width="100%" height={380}>
                <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                  <PolarGrid stroke="#2a3548" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} />
                  {selected.map((c) => (
                    <Radar
                      key={c.id}
                      name={c.name}
                      dataKey={c.name}
                      stroke={c.color}
                      fill={c.color}
                      fillOpacity={0.15}
                      strokeWidth={2}
                    />
                  ))}
                  <Legend />
                  <Tooltip
                    contentStyle={{ background: '#111827', border: '1px solid #2a3548', borderRadius: 8 }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <h3>Benchmark Scores</h3>
              <p className="subtitle">Raw scores on standard LLM evaluation suites</p>
              <ResponsiveContainer width="100%" height={380}>
                <BarChart data={benchmarkData} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a3548" />
                  <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={110}
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                  />
                  {selected.map((c) => (
                    <Bar key={c.id} dataKey={c.name} fill={c.color} radius={[0, 4, 4, 0]} />
                  ))}
                  <Legend />
                  <Tooltip
                    contentStyle={{ background: '#111827', border: '1px solid #2a3548', borderRadius: 8 }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="charts-section">
            <div className="chart-card">
              <h3>Operational Capabilities</h3>
              <p className="subtitle">Speed, context, cost, ecosystem & openness (normalized 0–100)</p>
              <ResponsiveContainer width="100%" height={380}>
                <BarChart data={capabilityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a3548" />
                  <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} angle={-20} textAnchor="end" height={60} />
                  <YAxis domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  {selected.map((c) => (
                    <Bar key={c.id} dataKey={c.name} fill={c.color} radius={[4, 4, 0, 0]} />
                  ))}
                  <Legend />
                  <Tooltip
                    contentStyle={{ background: '#111827', border: '1px solid #2a3548', borderRadius: 8 }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <h3>Arena Elo Ranking</h3>
              <p className="subtitle">LMArena human preference leaderboard position</p>
              <ResponsiveContainer width="100%" height={380}>
                <BarChart
                  data={[...selected]
                    .sort((a, b) => b.metrics.arenaElo - a.metrics.arenaElo)
                    .map((c) => ({ name: c.name, elo: c.metrics.arenaElo, color: c.color }))}
                  layout="vertical"
                  margin={{ left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a3548" />
                  <XAxis type="number" domain={[1300, 1600]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" width={100} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <Bar dataKey="elo" radius={[0, 4, 4, 0]}>
                    {[...selected]
                      .sort((a, b) => b.metrics.arenaElo - a.metrics.arenaElo)
                      .map((c) => (
                        <Cell key={c.id} fill={c.color} />
                      ))}
                  </Bar>
                  <Tooltip
                    contentStyle={{ background: '#111827', border: '1px solid #2a3548', borderRadius: 8 }}
                    formatter={(value) => [`${value} Elo`, 'Arena Score']}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <MetricsTable selected={selected} />
        </>
      )}

      <footer className="footer">
        <p>
          Data synthesized from LMArena, MMLU, GPQA, HumanEval, SWE-bench, and public reports (Aug 2026).
          Benchmarks are directional — scores within 2–3% should be treated as ties.
        </p>
      </footer>
    </>
  );
}

function CompanySelector({
  filtered,
  selectedIds,
}: {
  filtered: Company[];
  selectedIds: string[];
}) {
  return (
    <div className="company-grid">
      {filtered.map((c) => {
        const isSelected = selectedIds.includes(c.id);
        return (
          <div
            key={c.id}
            className={`company-card ${isSelected ? 'selected' : ''}`}
            style={{ '--company-color': c.color } as React.CSSProperties}
            data-company-id={c.id}
          >
            <div className="company-card-header">
              <span className="company-flag">{c.flag}</span>
              <div>
                <div className="company-name">{c.name}</div>
                <div className="company-model">{c.flagshipModel}</div>
              </div>
            </div>
            <div className="company-stats">
              <div className="stat">
                <div className="stat-label">Arena Elo</div>
                <div className="stat-value">{c.metrics.arenaElo}</div>
              </div>
              <div className="stat">
                <div className="stat-label">GPQA</div>
                <div className="stat-value">{c.metrics.gpqa}%</div>
              </div>
              <div className="stat">
                <div className="stat-label">SWE-bench</div>
                <div className="stat-value">{c.metrics.sweBench}%</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MetricsTable({ selected }: { selected: Company[] }) {
  const allMetrics: MetricKey[] = [...BENCHMARK_METRICS, ...CAPABILITY_METRICS];

  const getMax = (key: MetricKey) =>
    Math.max(...selected.map((c) => c.metrics[key]));

  return (
    <section className="table-section">
      <div className="table-header">
        <h3>Full Metrics Comparison</h3>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="metrics-table">
          <thead>
            <tr>
              <th>Metric</th>
              {selected.map((c) => (
                <th key={c.id}>{c.flag} {c.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allMetrics.map((key) => {
              const max = getMax(key);
              const info = METRIC_LABELS[key];
              return (
                <tr key={key}>
                  <td title={info.description}>{info.label}</td>
                  {selected.map((c) => {
                    const val = c.metrics[key];
                    const isMax = val === max;
                    const normalized = normalizeMetric(key, val);
                    return (
                      <td key={c.id}>
                        <div className="metric-bar">
                          <div className="bar-track">
                            <div
                              className="bar-fill"
                              style={{
                                width: `${normalized}%`,
                                background: isMax ? c.color : '#475569',
                              }}
                            />
                          </div>
                          <span className="bar-value" style={{ color: isMax ? c.color : undefined }}>
                            {key === 'contextWindow' ? `${val}M` : key === 'inferenceSpeed' ? `${val}` : key === 'arenaElo' ? val : `${val}${info.unit === '/100' ? '' : info.unit}`}
                          </span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
