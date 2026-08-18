import { useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Radar,
  RadarChart,
  PolarAngleAxis,
  PolarGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts'
import {
  BookOpen,
  Building2,
  GraduationCap,
  MapPin,
  Scale,
  Stethoscope,
  TrendingUp,
} from 'lucide-react'
import {
  FACULTIES,
  type Faculty,
  type University,
  formatCurrency,
  getFitLevel,
  universities,
} from './data/universities'

const FIT_STYLES = {
  safety: { label: 'Safety', bg: 'bg-emerald-500/20', text: 'text-emerald-300', border: 'border-emerald-500/40' },
  target: { label: 'Target', bg: 'bg-sky-500/20', text: 'text-sky-300', border: 'border-sky-500/40' },
  reach: { label: 'Reach', bg: 'bg-amber-500/20', text: 'text-amber-300', border: 'border-amber-500/40' },
  unlikely: { label: 'Unlikely', bg: 'bg-rose-500/20', text: 'text-rose-300', border: 'border-rose-500/40' },
}

const FACULTY_ICONS: Record<Faculty, typeof BookOpen> = {
  'Arts & Humanities': BookOpen,
  Business: TrendingUp,
  Engineering: Building2,
  Science: GraduationCap,
  Medicine: Stethoscope,
  Law: Scale,
  'Social Sciences': MapPin,
}

function FitBadge({ level }: { level: keyof typeof FIT_STYLES }) {
  const style = FIT_STYLES[level]
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${style.bg} ${style.text} ${style.border}`}>
      {style.label}
    </span>
  )
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-4 backdrop-blur-sm">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold text-white">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-slate-500">{sub}</p>}
    </div>
  )
}

export default function App() {
  const [ibScore, setIbScore] = useState(36)
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | 'All'>('All')
  const [selectedUnis, setSelectedUnis] = useState<string[]>(universities.map((u) => u.id))
  const [showNonLocal, setShowNonLocal] = useState(true)

  const filteredUniversities = useMemo(
    () => universities.filter((u) => selectedUnis.includes(u.id)),
    [selectedUnis]
  )

  const ibChartData = useMemo(
    () =>
      filteredUniversities.map((u) => ({
        name: u.shortName,
        minimum: u.minIb,
        competitiveLow: u.competitiveIbLow,
        competitiveHigh: u.competitiveIbHigh,
        color: u.color,
      })),
    [filteredUniversities]
  )

  const rankingData = useMemo(
    () =>
      [...filteredUniversities]
        .sort((a, b) => a.qsRanking2025 - b.qsRanking2025)
        .map((u) => ({
          name: u.shortName,
          rank2025: u.qsRanking2025,
          rank2024: u.qsRanking2024,
          color: u.color,
        })),
    [filteredUniversities]
  )

  const tuitionData = useMemo(
    () =>
      filteredUniversities.map((u) => ({
        name: u.shortName,
        tuition: showNonLocal ? u.tuitionNonLocal : u.tuitionLocal,
        color: u.color,
      })),
    [filteredUniversities, showNonLocal]
  )

  const scatterData = useMemo(
    () =>
      filteredUniversities.map((u) => ({
        name: u.shortName,
        rank: u.qsRanking2025,
        competitive: (u.competitiveIbLow + u.competitiveIbHigh) / 2,
        minIb: u.minIb,
        color: u.color,
      })),
    [filteredUniversities]
  )

  const radarData = useMemo(() => {
    const metrics = ['Ranking', 'Accessibility', 'STEM', 'Business', 'Arts', 'Value']
    const maxRank = Math.max(...universities.map((u) => u.qsRanking2025))

    return metrics.map((metric) => {
      const entry: Record<string, string | number> = { metric }
      filteredUniversities.forEach((u) => {
        let score = 50
        switch (metric) {
          case 'Ranking':
            score = Math.round((1 - u.qsRanking2025 / maxRank) * 100)
            break
          case 'Accessibility':
            score = Math.round((1 - u.competitiveIbLow / 45) * 100)
            break
          case 'STEM':
            score = u.programs.filter((p) => p.faculty === 'Engineering' || p.faculty === 'Science').length * 15
            break
          case 'Business':
            score = u.programs.filter((p) => p.faculty === 'Business').length * 20
            break
          case 'Arts':
            score = u.programs.filter((p) => p.faculty === 'Arts & Humanities').length * 25
            break
          case 'Value':
            score = Math.round((1 - u.tuitionNonLocal / 224000) * 100)
            break
        }
        entry[u.shortName] = Math.min(100, Math.max(10, score))
      })
      return entry
    })
  }, [filteredUniversities])

  const programRows = useMemo(() => {
    const rows: Array<{
      university: University
      program: (typeof universities)[0]['programs'][0]
      fit: keyof typeof FIT_STYLES
    }> = []

    filteredUniversities.forEach((u) => {
      u.programs
        .filter((p) => selectedFaculty === 'All' || p.faculty === selectedFaculty)
        .forEach((program) => {
          const fit = getFitLevel(ibScore, u, program.faculty)
          rows.push({ university: u, program, fit })
        })
    })

    return rows.sort((a, b) => a.program.competitiveIb - b.program.competitiveIb)
  }, [filteredUniversities, selectedFaculty, ibScore])

  const toggleUni = (id: string) => {
    setSelectedUnis((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const eligibleCount = filteredUniversities.filter(
    (u) => getFitLevel(ibScore, u, selectedFaculty === 'All' ? undefined : selectedFaculty) !== 'unlikely'
  ).length

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded bg-hk-red px-2 py-0.5 text-xs font-bold text-white">IB</span>
                <span className="text-sm text-slate-400">2026 Entry Guide</span>
              </div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Hong Kong Universities
                <span className="block text-hk-gold">IB Graduate Comparison</span>
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">
                Compare admission requirements, rankings, tuition, and programme fit across Hong Kong&apos;s top universities for International Baccalaureate graduates.
              </p>
            </div>
            <div className="flex gap-3">
              <StatCard label="Universities" value={`${filteredUniversities.length}`} sub="selected" />
              <StatCard label="Eligible" value={`${eligibleCount}`} sub={`at IB ${ibScore}`} />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Controls */}
        <section className="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-6 backdrop-blur-sm">
          <h2 className="mb-6 font-display text-xl font-semibold text-white">Your Profile</h2>
          <div className="grid gap-8 lg:grid-cols-3">
            {/* IB Score Slider */}
            <div>
              <label className="mb-3 flex items-center justify-between text-sm font-medium text-slate-300">
                <span>Your IB Score</span>
                <span className="rounded-lg bg-hk-red/20 px-3 py-1 font-display text-2xl font-bold text-hk-red">
                  {ibScore}
                </span>
              </label>
              <input
                type="range"
                min={24}
                max={45}
                value={ibScore}
                onChange={(e) => setIbScore(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-hk-red"
              />
              <div className="mt-1 flex justify-between text-xs text-slate-500">
                <span>24</span>
                <span>30</span>
                <span>36</span>
                <span>42</span>
                <span>45</span>
              </div>
            </div>

            {/* Faculty Filter */}
            <div>
              <label className="mb-3 block text-sm font-medium text-slate-300">Faculty Interest</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedFaculty('All')}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    selectedFaculty === 'All'
                      ? 'bg-hk-gold text-slate-900'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                  }`}
                >
                  All Faculties
                </button>
                {FACULTIES.map((f) => {
                  const Icon = FACULTY_ICONS[f]
                  return (
                    <button
                      key={f}
                      onClick={() => setSelectedFaculty(f)}
                      className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                        selectedFaculty === f
                          ? 'bg-hk-gold text-slate-900'
                          : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                      }`}
                    >
                      <Icon className="h-3 w-3" />
                      {f.split(' ')[0]}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* University Selection */}
            <div>
              <label className="mb-3 block text-sm font-medium text-slate-300">Compare Universities</label>
              <div className="flex flex-wrap gap-2">
                {universities.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => toggleUni(u.id)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                      selectedUnis.includes(u.id)
                        ? 'border-transparent text-white shadow-lg'
                        : 'border-slate-600 bg-transparent text-slate-500 hover:border-slate-500'
                    }`}
                    style={
                      selectedUnis.includes(u.id)
                        ? { backgroundColor: u.color }
                        : undefined
                    }
                  >
                    {u.shortName}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* University Cards */}
        <section>
          <h2 className="mb-4 font-display text-xl font-semibold text-white">University Overview</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredUniversities.map((u) => {
              const fit = getFitLevel(
                ibScore,
                u,
                selectedFaculty === 'All' ? undefined : selectedFaculty
              )
              return (
                <article
                  key={u.id}
                  className="group relative overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800/50 p-5 transition-all hover:border-slate-600 hover:shadow-xl"
                >
                  <div
                    className="absolute inset-x-0 top-0 h-1"
                    style={{ backgroundColor: u.color }}
                  />
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">{u.shortName}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2">{u.name}</p>
                    </div>
                    <FitBadge level={fit} />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">QS Rank 2025</span>
                      <span className="font-semibold text-white">#{u.qsRanking2025}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">IB Range</span>
                      <span className="font-semibold text-white">
                        {u.minIb}–{u.competitiveIbHigh}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tuition (intl)</span>
                      <span className="font-semibold text-white">
                        {formatCurrency(u.tuitionNonLocal)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {u.strengths.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="rounded bg-slate-700/50 px-2 py-0.5 text-[10px] text-slate-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <a
                    href={u.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-xs font-medium text-hk-gold hover:underline"
                  >
                    Visit admissions →
                  </a>
                </article>
              )
            })}
          </div>
        </section>

        {/* Charts Row 1 */}
        <section className="grid gap-6 lg:grid-cols-2">
          {/* IB Score Comparison */}
          <div className="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-6">
            <h3 className="mb-1 font-display text-lg font-semibold text-white">IB Score Requirements</h3>
            <p className="mb-4 text-xs text-slate-400">
              Minimum vs competitive range (official &amp; historical data)
            </p>
            <div className="relative">
              <div
                className="absolute top-0 bottom-8 w-0.5 bg-hk-red/60 z-10 pointer-events-none"
                style={{ left: `${((ibScore - 24) / 21) * 100}%` }}
              />
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ibChartData} layout="vertical" margin={{ left: 10, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                  <XAxis type="number" domain={[24, 45]} stroke="#94a3b8" fontSize={11} />
                  <YAxis type="category" dataKey="name" stroke="#94a3b8" fontSize={12} width={60} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="minimum" name="Minimum" fill="#64748b" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="competitiveLow" name="Competitive (low)" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="competitiveHigh" name="Competitive (high)" fill="#1d4ed8" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-xs text-hk-red">↑ Your score: {ibScore}</p>
          </div>

          {/* QS Rankings */}
          <div className="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-6">
            <h3 className="mb-1 font-display text-lg font-semibold text-white">QS World Rankings</h3>
            <p className="mb-4 text-xs text-slate-400">Lower is better — 2024 vs 2025</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={rankingData} margin={{ bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis reversed domain={[0, 'dataMax + 50']} stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Legend />
                <Bar dataKey="rank2025" name="2025" radius={[4, 4, 0, 0]}>
                  {rankingData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Bar>
                <Bar dataKey="rank2024" name="2024" fill="#475569" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Charts Row 2 */}
        <section className="grid gap-6 lg:grid-cols-2">
          {/* Tuition */}
          <div className="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-semibold text-white">Annual Tuition (HKD)</h3>
                <p className="text-xs text-slate-400">2025/26 academic year</p>
              </div>
              <div className="flex rounded-lg bg-slate-700/50 p-0.5">
                <button
                  onClick={() => setShowNonLocal(false)}
                  className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                    !showNonLocal ? 'bg-slate-600 text-white' : 'text-slate-400'
                  }`}
                >
                  Local
                </button>
                <button
                  onClick={() => setShowNonLocal(true)}
                  className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                    showNonLocal ? 'bg-slate-600 text-white' : 'text-slate-400'
                  }`}
                >
                  Non-local
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={tuitionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value) => [formatCurrency(Number(value ?? 0)), 'Tuition']}
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="tuition" radius={[4, 4, 0, 0]}>
                  {tuitionData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Rank vs IB Scatter */}
          <div className="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-6">
            <h3 className="mb-1 font-display text-lg font-semibold text-white">Prestige vs Selectivity</h3>
            <p className="mb-4 text-xs text-slate-400">
              QS ranking (lower = better) vs average competitive IB score
            </p>
            <ResponsiveContainer width="100%" height={280}>
              <ScatterChart margin={{ bottom: 10, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  type="number"
                  dataKey="competitive"
                  name="Competitive IB"
                  domain={[28, 44]}
                  stroke="#94a3b8"
                  fontSize={11}
                  label={{ value: 'Competitive IB', position: 'bottom', fill: '#94a3b8', fontSize: 11 }}
                />
                <YAxis
                  type="number"
                  dataKey="rank"
                  name="QS Rank"
                  reversed
                  domain={[0, 750]}
                  stroke="#94a3b8"
                  fontSize={11}
                  label={{ value: 'QS Rank', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 11 }}
                />
                <ZAxis range={[120, 120]} />
                <Tooltip
                  content={({ payload }) => {
                    if (!payload?.length) return null
                    const d = payload[0].payload
                    return (
                      <div className="rounded-lg border border-slate-600 bg-slate-800 p-3 text-xs shadow-xl">
                        <p className="font-bold text-white">{d.name}</p>
                        <p className="text-slate-300">QS Rank: #{d.rank}</p>
                        <p className="text-slate-300">Avg competitive IB: {d.competitive}</p>
                        <p className="text-slate-300">Minimum IB: {d.minIb}</p>
                      </div>
                    )
                  }}
                />
                <Scatter data={scatterData}>
                  {scatterData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Radar Chart */}
        <section className="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-6">
          <h3 className="mb-1 font-display text-lg font-semibold text-white">Multi-Dimensional Comparison</h3>
          <p className="mb-4 text-xs text-slate-400">
            Normalized scores across ranking, accessibility, programme breadth, and value
          </p>
          <ResponsiveContainer width="100%" height={380}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#475569" />
              <PolarAngleAxis dataKey="metric" stroke="#94a3b8" fontSize={11} />
              {filteredUniversities.map((u) => (
                <Radar
                  key={u.id}
                  name={u.shortName}
                  dataKey={u.shortName}
                  stroke={u.color}
                  fill={u.color}
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              ))}
              <Legend />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </section>

        {/* Program Table */}
        <section className="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-6">
          <h3 className="mb-1 font-display text-lg font-semibold text-white">Programme Fit Analysis</h3>
          <p className="mb-4 text-xs text-slate-400">
            Based on your IB score of {ibScore}
            {selectedFaculty !== 'All' && ` and ${selectedFaculty} interest`}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-xs uppercase tracking-wider text-slate-400">
                  <th className="pb-3 pr-4">University</th>
                  <th className="pb-3 pr-4">Programme</th>
                  <th className="pb-3 pr-4">Faculty</th>
                  <th className="pb-3 pr-4 text-center">Min IB</th>
                  <th className="pb-3 pr-4 text-center">Competitive</th>
                  <th className="pb-3 pr-4">Your Fit</th>
                  <th className="pb-3">Notes</th>
                </tr>
              </thead>
              <tbody>
                {programRows.map(({ university, program, fit }) => (
                  <tr
                    key={`${university.id}-${program.name}`}
                    className="border-b border-slate-700/50 transition-colors hover:bg-slate-700/20"
                  >
                    <td className="py-3 pr-4">
                      <span
                        className="inline-block h-2 w-2 rounded-full mr-2"
                        style={{ backgroundColor: university.color }}
                      />
                      <span className="font-semibold text-white">{university.shortName}</span>
                    </td>
                    <td className="py-3 pr-4 text-slate-300">{program.name}</td>
                    <td className="py-3 pr-4 text-slate-400">{program.faculty}</td>
                    <td className="py-3 pr-4 text-center text-slate-300">{program.minIb}</td>
                    <td className="py-3 pr-4 text-center font-semibold text-white">
                      {program.competitiveIb}
                    </td>
                    <td className="py-3 pr-4">
                      <FitBadge level={fit} />
                    </td>
                    <td className="py-3 text-xs text-slate-500">{program.subjectNotes || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Requirements Summary */}
        <section className="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-6">
          <h3 className="mb-4 font-display text-lg font-semibold text-white">General IB Requirements</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredUniversities.map((u) => (
              <div
                key={u.id}
                className="rounded-xl border border-slate-700/40 bg-slate-900/50 p-4"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white"
                    style={{ backgroundColor: u.color }}
                  >
                    {u.shortName.slice(0, 2)}
                  </span>
                  <div>
                    <p className="font-semibold text-white">{u.shortName}</p>
                    <p className="text-[10px] text-slate-500">{u.campus}</p>
                  </div>
                </div>
                <dl className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <dt className="text-slate-400">English</dt>
                    <dd className="text-slate-300">{u.englishReq}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-400">Chinese</dt>
                    <dd className="text-slate-300">{u.chineseReq}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-400">Interview</dt>
                    <dd className="text-slate-300">{u.interviewLikely ? 'Often required' : 'Sometimes'}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-400">Assessment</dt>
                    <dd className="text-slate-300">{u.holistic ? 'Holistic' : 'Score-based'}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-700/50 pt-6 text-center text-xs text-slate-500">
          <p>
            Data compiled from official university admissions pages (2025–2026 entry).
            Requirements are indicative — admission is competitive and holistic.
          </p>
          <p className="mt-1">
            Always verify current requirements on each university&apos;s official admissions website.
          </p>
        </footer>
      </main>
    </div>
  )
}
