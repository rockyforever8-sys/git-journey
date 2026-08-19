import type { MarketData, PriceBar, StockMeta, TimeRange } from '../types'

export const RANGE_OPTIONS: { value: TimeRange; label: string }[] = [
  { value: '1M', label: '1M' },
  { value: '3M', label: '3M' },
  { value: '6M', label: '6M' },
  { value: 'YTD', label: 'YTD' },
  { value: '1Y', label: '1Y' },
  { value: 'ALL', label: 'All' },
]

export function formatCurrency(value: number, currency = 'HKD'): string {
  return new Intl.NumberFormat('en-HK', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatCompact(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return '—'
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatPct(value: number, digits = 2): string {
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(digits)}%`
}

export function formatDateLabel(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`)
  return date.toLocaleDateString('en-HK', { month: 'short', day: 'numeric' })
}

export function filterHistory(history: PriceBar[], range: TimeRange): PriceBar[] {
  if (history.length === 0) return []
  if (range === 'ALL') return history

  const end = new Date(`${history[history.length - 1].date}T00:00:00`)
  const start = new Date(end)

  if (range === 'YTD') {
    start.setMonth(0, 1)
  } else {
    const months = range === '1M' ? 1 : range === '3M' ? 3 : range === '6M' ? 6 : 12
    start.setMonth(start.getMonth() - months)
  }

  return history.filter((bar) => new Date(`${bar.date}T00:00:00`) >= start)
}

export function getStockById(data: MarketData, id: string): StockMeta | undefined {
  return data.stocks.find((stock) => stock.id === id)
}

export function pctChange(current: number, previous: number): number {
  if (previous === 0) return 0
  return ((current - previous) / previous) * 100
}

export function dailyChangePct(stock: StockMeta): number {
  return pctChange(stock.lastPrice, stock.previousClose)
}
