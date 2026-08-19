import { useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  LineChart as LineChartIcon,
  RefreshCw,
  TrendingUp,
} from 'lucide-react'
import {
  buildStockStats,
  correlationMatrix,
  dailyReturns,
  normalizedSeries,
  rollingVolatility,
} from './lib/analytics'
import {
  RANGE_OPTIONS,
  dailyChangePct,
  filterHistory,
  formatCompact,
  formatCurrency,
  formatDateLabel,
  formatPct,
} from './lib/format'
import { data, PREFERRED_STOCK_IDS } from './data/stocks'
import type { ChartPoint, StockMeta, StockStats, TimeRange } from './types'

const TREND_STYLES = {
  Bullish: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
  Neutral: 'bg-slate-500/15 text-slate-300 border-slate-500/40',
  Bearish: 'bg-rose-500/15 text-rose-300 border-rose-500/40',
}

function StatCard({
  label,
  value,
  sub,
  positive,
}: {
  label: string
  value: string
  sub?: string
  positive?: boolean | null
}) {
  const tone =
    positive == null
      ? 'text-white'
      : positive
        ? 'text-emerald-300'
        : 'text-rose-300'

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-4 backdrop-blur-sm">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{label}</p>
      <p className={`mt-1 font-display text-2xl font-semibold ${tone}`}>{value}</p>
      {sub && <p className="mt-0.5 text-xs text-slate-500">{sub}</p>}
    </div>
  )
}

function ChangeBadge({ value }: { value: number }) {
  const positive = value >= 0
  const Icon = positive ? ArrowUpRight : ArrowDownRight
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
        positive ? 'bg-emerald-500/15 text-emerald-300' : 'bg-rose-500/15 text-rose-300'
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {formatPct(value)}
    </span>
  )
}

function CorrelationHeatmap({
  ids,
  labels,
  cells,
}: {
  ids: string[]
  labels: Record<string, string>
  cells: { x: string; y: string; value: number }[]
}) {
  const lookup = new Map(cells.map((cell) => [`${cell.x}:${cell.y}`, cell.value]))

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-1 text-xs">
        <thead>
          <tr>
            <th />
            {ids.map((id) => (
              <th key={id} className="px-2 py-1 font-medium text-slate-400">
                {labels[id]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ids.map((rowId) => (
            <tr key={rowId}>
              <th className="px-2 py-1 text-left font-medium text-slate-400">{labels[rowId]}</th>
              {ids.map((colId) => {
                const value = lookup.get(`${rowId}:${colId}`) ?? 0
                const intensity = Math.abs(value)
                const bg =
                  value >= 0
                    ? `rgba(52, 211, 153, ${0.15 + intensity * 0.55})`
                    : `rgba(251, 113, 133, ${0.15 + intensity * 0.55})`
                return (
                  <td key={colId} className="p-0">
                    <div
                      className="rounded-md px-2 py-2 text-center font-semibold text-slate-100"
                      style={{ backgroundColor: bg }}
                      title={`${labels[rowId]} vs ${labels[colId]}`}
                    >
                      {value.toFixed(2)}
                    </div>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function App() {
  const [range, setRange] = useState<TimeRange>('1Y')
  const [selectedIds, setSelectedIds] = useState<string[]>(PREFERRED_STOCK_IDS)
  const [focusId, setFocusId] = useState<string>(PREFERRED_STOCK_IDS[0])
  const [showNormalized, setShowNormalized] = useState(true)

  const stocks = data.stocks
  const benchmark = data.benchmark

  const filteredByStock = useMemo(() => {
    const map = new Map<string, ReturnType<typeof filterHistory>>()
    for (const stock of stocks) {
      map.set(stock.id, filterHistory(stock.history, range))
    }
    return map
  }, [range, stocks])

  const benchmarkHistory = useMemo(
    () => (benchmark ? filterHistory(benchmark.history, range) : []),
    [benchmark, range],
  )

  const statsById = useMemo(() => {
    const map = new Map<string, StockStats>()
    for (const stock of stocks) {
      const history = filteredByStock.get(stock.id) ?? []
      map.set(
        stock.id,
        buildStockStats(
          stock.id,
          history,
          benchmarkHistory,
          dailyChangePct(stock),
        ),
      )
    }
    return map
  }, [benchmarkHistory, filteredByStock, stocks])

  const priceChartData = useMemo(() => {
    const dates = filteredByStock.get(selectedIds[0])?.map((bar) => bar.date) ?? []
    return dates.map((date) => {
      const point: ChartPoint = {
        date,
        label: formatDateLabel(date),
      }
      for (const id of selectedIds) {
        const bar = filteredByStock.get(id)?.find((item) => item.date === date)
        if (bar) point[id] = bar.close
      }
      if (benchmark && benchmarkHistory.length) {
        const benchBar = benchmarkHistory.find((item) => item.date === date)
        if (benchBar) point.HSI = benchBar.close
      }
      return point
    })
  }, [benchmark, benchmarkHistory, filteredByStock, selectedIds])

  const normalizedChartData = useMemo(() => {
    const series = selectedIds.map((id) => ({
      id,
      points: normalizedSeries(filteredByStock.get(id) ?? []),
    }))
    const dates = series[0]?.points.map((point) => point.date) ?? []
    return dates.map((date, index) => {
      const point: ChartPoint = { date, label: formatDateLabel(date) }
      for (const item of series) {
        point[item.id] = item.points[index]?.value ?? 100
      }
      if (benchmarkHistory.length) {
        const bench = normalizedSeries(benchmarkHistory)
        point.HSI = bench[index]?.value ?? 100
      }
      return point
    })
  }, [benchmarkHistory, filteredByStock, selectedIds])

  const returnComparison = useMemo(
    () =>
      stocks.map((stock) => ({
        id: stock.id,
        name: stock.name.split(' ')[0],
        returnPct: statsById.get(stock.id)?.returnPct ?? 0,
        color: stock.color,
      })),
    [statsById, stocks],
  )

  const correlation = useMemo(() => {
    const series: Record<string, number[]> = {}
    for (const stock of stocks) {
      series[stock.id] = dailyReturns(filteredByStock.get(stock.id) ?? [])
    }
    return correlationMatrix(series, PREFERRED_STOCK_IDS)
  }, [filteredByStock, stocks])

  const focusStock = stocks.find((stock) => stock.id === focusId) ?? stocks[0]
  const focusHistory = filteredByStock.get(focusId) ?? []
  const focusStats = statsById.get(focusId)
  const volatilitySeries = useMemo(
    () => rollingVolatility(focusHistory, 20),
    [focusHistory],
  )

  const portfolioReturn =
    selectedIds.reduce((sum, id) => sum + (statsById.get(id)?.returnPct ?? 0), 0) /
    Math.max(selectedIds.length, 1)

  const avgVolatility =
    selectedIds.reduce((sum, id) => sum + (statsById.get(id)?.volatility ?? 0), 0) /
    Math.max(selectedIds.length, 1)

  const toggleStock = (id: string) => {
    setSelectedIds((current) => {
      if (current.includes(id)) {
        if (current.length === 1) return current
        return current.filter((item) => item !== id)
      }
      return [...current, id]
    })
  }

  const updatedLabel = new Date(data.updatedAt).toLocaleString('en-HK', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-hk-gold/30 bg-hk-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-hk-gold">
              <TrendingUp className="h-3.5 w-3.5" />
              HK Watchlist
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              HK Stocks Performance Dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
              Track price trends, risk metrics, and return statistics for your seven preferred Hong Kong
              equities. Data refreshes on each build via Yahoo Finance.
            </p>
          </div>
          <div className="rounded-xl border border-slate-700/60 bg-slate-900/50 px-4 py-3 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-sky-400" />
              <span>Last updated {updatedLabel}</span>
            </div>
            {benchmark && (
              <p className="mt-1 text-xs text-slate-500">
                HSI {formatCurrency(benchmark.lastPrice)} ·{' '}
                <span className={benchmark.lastPrice >= benchmark.previousClose ? 'text-emerald-300' : 'text-rose-300'}>
                  {formatPct(
                    ((benchmark.lastPrice - benchmark.previousClose) / benchmark.previousClose) * 100,
                  )}
                </span>
              </p>
            )}
          </div>
        </div>
      </header>

      <section className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {stocks.map((stock) => {
            const active = selectedIds.includes(stock.id)
            const stats = statsById.get(stock.id)
            return (
              <button
                key={stock.id}
                type="button"
                onClick={() => toggleStock(stock.id)}
                onDoubleClick={() => setFocusId(stock.id)}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                  active
                    ? 'border-sky-500/50 bg-sky-500/15 text-sky-100'
                    : 'border-slate-700 bg-slate-900/40 text-slate-400 hover:border-slate-600'
                }`}
              >
                <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: stock.color }} />
                {stock.id} · {stock.name.split(' ')[0]}
                {stats && (
                  <span className={`ml-2 ${stats.returnPct >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                    {formatPct(stats.returnPct)}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-xl border border-slate-700/60 bg-slate-900/50 p-1">
            {RANGE_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setRange(option.value)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  range === option.value
                    ? 'bg-sky-500 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setShowNormalized((value) => !value)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-900/50 px-3 py-2 text-sm text-slate-300 hover:text-white"
          >
            {showNormalized ? <LineChartIcon className="h-4 w-4" /> : <BarChart3 className="h-4 w-4" />}
            {showNormalized ? 'Indexed view' : 'Price view'}
          </button>
        </div>
      </section>

      <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Portfolio return"
          value={formatPct(portfolioReturn)}
          sub={`Equal-weight · ${range}`}
          positive={portfolioReturn >= 0}
        />
        <StatCard
          label="Avg volatility"
          value={`${avgVolatility.toFixed(1)}%`}
          sub="Annualized · 252-day"
        />
        <StatCard
          label="Focus stock"
          value={formatCurrency(focusStock.lastPrice, focusStock.currency)}
          sub={`${focusStock.name} · ${focusStock.ticker}`}
        />
        <StatCard
          label="Focus trend"
          value={focusStats?.trend ?? '—'}
          sub={`RSI ${focusStats?.rsi.toFixed(1) ?? '—'} · β ${focusStats?.beta?.toFixed(2) ?? '—'}`}
          positive={focusStats?.trend === 'Bullish' ? true : focusStats?.trend === 'Bearish' ? false : null}
        />
      </section>

      <section className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {stocks.map((stock) => (
          <StockCard
            key={stock.id}
            stock={stock}
            stats={statsById.get(stock.id)}
            active={focusId === stock.id}
            onFocus={() => setFocusId(stock.id)}
          />
        ))}
      </section>

      <section className="mb-8 grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-2xl border border-slate-700/60 bg-slate-900/40 p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-semibold text-white">
                {showNormalized ? 'Indexed performance (base 100)' : 'Closing prices'}
              </h2>
              <p className="text-sm text-slate-400">
                Compare selected stocks against the Hang Seng Index over {range.toLowerCase()}.
              </p>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {showNormalized ? (
                <LineChart data={normalizedChartData}>
                  <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                  <XAxis dataKey="label" tick={{ fill: '#94a3b8', fontSize: 12 }} minTickGap={24} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} domain={['auto', 'auto']} />
                  <Tooltip
                    contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 12 }}
                    labelStyle={{ color: '#cbd5e1' }}
                  />
                  <Legend />
                  {selectedIds.map((id) => {
                    const stock = stocks.find((item) => item.id === id)
                    return (
                      <Line
                        key={id}
                        type="monotone"
                        dataKey={id}
                        name={stock?.name ?? id}
                        stroke={stock?.color}
                        strokeWidth={2}
                        dot={false}
                      />
                    )
                  })}
                  {benchmark && (
                    <Line type="monotone" dataKey="HSI" name="Hang Seng" stroke="#94a3b8" strokeDasharray="5 5" dot={false} />
                  )}
                </LineChart>
              ) : (
                <AreaChart data={priceChartData}>
                  <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                  <XAxis dataKey="label" tick={{ fill: '#94a3b8', fontSize: 12 }} minTickGap={24} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 12 }}
                    labelStyle={{ color: '#cbd5e1' }}
                    formatter={(value, name) => [
                      formatCurrency(Number(value ?? 0)),
                      stocks.find((item) => item.id === String(name))?.name ?? String(name),
                    ]}
                  />
                  <Legend />
                  {selectedIds.map((id) => {
                    const stock = stocks.find((item) => item.id === id)
                    return (
                      <Area
                        key={id}
                        type="monotone"
                        dataKey={id}
                        name={stock?.name ?? id}
                        stroke={stock?.color}
                        fill={stock?.color}
                        fillOpacity={0.08}
                        strokeWidth={2}
                      />
                    )
                  })}
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/40 p-5">
          <h2 className="font-display text-xl font-semibold text-white">Period returns</h2>
          <p className="mb-4 text-sm text-slate-400">Total return over the selected window.</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={returnComparison} layout="vertical" margin={{ left: 12, right: 12 }}>
                <CartesianGrid stroke="#334155" strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
                <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} width={70} />
                <Tooltip
                  contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 12 }}
                  formatter={(value) => [formatPct(Number(value ?? 0)), 'Return']}
                />
                <Bar dataKey="returnPct" radius={[0, 8, 8, 0]}>
                  {returnComparison.map((entry) => (
                    <Cell key={entry.id} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="mb-8 grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/40 p-5">
          <div className="mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-violet-400" />
            <div>
              <h2 className="font-display text-xl font-semibold text-white">Rolling volatility</h2>
              <p className="text-sm text-slate-400">
                20-day annualized volatility for {focusStock.name}.
              </p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={volatilitySeries}>
                <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  tickFormatter={formatDateLabel}
                  minTickGap={28}
                />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 12 }}
                  formatter={(value) => [`${Number(value ?? 0).toFixed(2)}%`, 'Volatility']}
                  labelFormatter={(label) => formatDateLabel(String(label))}
                />
                <Area type="monotone" dataKey="value" stroke="#a78bfa" fill="#a78bfa" fillOpacity={0.15} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/40 p-5">
          <h2 className="font-display text-xl font-semibold text-white">Return correlations</h2>
          <p className="mb-4 text-sm text-slate-400">Daily return correlation across your seven stocks.</p>
          <CorrelationHeatmap
            ids={PREFERRED_STOCK_IDS}
            labels={Object.fromEntries(stocks.map((stock) => [stock.id, stock.id]))}
            cells={correlation}
          />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-700/60 bg-slate-900/40 p-5">
        <h2 className="mb-4 font-display text-xl font-semibold text-white">Risk & trend statistics</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700/80 text-xs uppercase tracking-wider text-slate-400">
                <th className="px-3 py-3">Stock</th>
                <th className="px-3 py-3">Last</th>
                <th className="px-3 py-3">Day</th>
                <th className="px-3 py-3">{range} return</th>
                <th className="px-3 py-3">Volatility</th>
                <th className="px-3 py-3">Sharpe</th>
                <th className="px-3 py-3">Max DD</th>
                <th className="px-3 py-3">Beta</th>
                <th className="px-3 py-3">RSI</th>
                <th className="px-3 py-3">SMA 20/50</th>
                <th className="px-3 py-3">Trend</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => {
                const stats = statsById.get(stock.id)
                if (!stats) return null
                return (
                  <tr
                    key={stock.id}
                    className="border-b border-slate-800/80 hover:bg-slate-800/30"
                    onClick={() => setFocusId(stock.id)}
                  >
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: stock.color }} />
                        <div>
                          <p className="font-medium text-white">{stock.name}</p>
                          <p className="text-xs text-slate-500">{stock.ticker} · {stock.sector}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-slate-200">{formatCurrency(stock.lastPrice)}</td>
                    <td className="px-3 py-3"><ChangeBadge value={stats.dailyChangePct} /></td>
                    <td className={`px-3 py-3 font-medium ${stats.returnPct >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                      {formatPct(stats.returnPct)}
                    </td>
                    <td className="px-3 py-3 text-slate-300">{stats.volatility.toFixed(1)}%</td>
                    <td className="px-3 py-3 text-slate-300">{stats.sharpe.toFixed(2)}</td>
                    <td className="px-3 py-3 text-rose-300">{stats.maxDrawdown.toFixed(1)}%</td>
                    <td className="px-3 py-3 text-slate-300">{stats.beta?.toFixed(2) ?? '—'}</td>
                    <td className="px-3 py-3 text-slate-300">{stats.rsi.toFixed(1)}</td>
                    <td className="px-3 py-3 text-slate-400">
                      {stats.sma20.toFixed(1)} / {stats.sma50.toFixed(1)}
                    </td>
                    <td className="px-3 py-3">
                      <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${TREND_STYLES[stats.trend]}`}>
                        {stats.trend}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="mt-8 border-t border-slate-800 pt-6 text-xs text-slate-500">
        <p>
          Watchlist: VGT (2476), Link REIT (0823), Alibaba (9988), JD.com (9618), Montage Technology (6809),
          SMIC (0981), and BYD (1211). Metrics are indicative; not investment advice.
        </p>
      </footer>
    </div>
  )
}

function StockCard({
  stock,
  stats,
  active,
  onFocus,
}: {
  stock: StockMeta
  stats?: StockStats
  active: boolean
  onFocus: () => void
}) {
  const rangePosition =
    stock.fiftyTwoWeekHigh && stock.fiftyTwoWeekLow
      ? ((stock.lastPrice - stock.fiftyTwoWeekLow) /
          (stock.fiftyTwoWeekHigh - stock.fiftyTwoWeekLow)) *
        100
      : null

  return (
    <button
      type="button"
      onClick={onFocus}
      className={`rounded-2xl border p-4 text-left transition ${
        active
          ? 'border-sky-500/50 bg-sky-500/10'
          : 'border-slate-700/60 bg-slate-900/40 hover:border-slate-600'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500">{stock.ticker}</p>
          <h3 className="font-display text-lg font-semibold text-white">{stock.name}</h3>
          <p className="text-xs text-slate-400">{stock.sector}</p>
        </div>
        {stats && <ChangeBadge value={stats.dailyChangePct} />}
      </div>

      <p className="mt-3 font-display text-2xl font-semibold text-white">
        {formatCurrency(stock.lastPrice, stock.currency)}
      </p>

      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div>
          <p className="text-slate-500">Mkt cap</p>
          <p className="font-medium text-slate-200">{formatCompact(stock.marketCap)}</p>
        </div>
        <div>
          <p className="text-slate-500">P/E</p>
          <p className="font-medium text-slate-200">{stock.trailingPE?.toFixed(1) ?? '—'}</p>
        </div>
        <div>
          <p className="text-slate-500">Div yield</p>
          <p className="font-medium text-slate-200">
            {stock.dividendYield != null ? `${(stock.dividendYield * 100).toFixed(2)}%` : '—'}
          </p>
        </div>
        <div>
          <p className="text-slate-500">{stats ? 'Period return' : 'Return'}</p>
          <p className={`font-medium ${stats && stats.returnPct >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
            {stats ? formatPct(stats.returnPct) : '—'}
          </p>
        </div>
      </div>

      {rangePosition != null && (
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-[10px] text-slate-500">
            <span>52W low</span>
            <span>52W high</span>
          </div>
          <div className="relative h-2 rounded-full bg-slate-800">
            <div
              className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-slate-950"
              style={{ left: `${Math.min(100, Math.max(0, rangePosition))}%`, backgroundColor: stock.color }}
            />
          </div>
        </div>
      )}
    </button>
  )
}
