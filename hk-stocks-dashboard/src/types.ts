export interface PriceBar {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface StockMeta {
  id: string
  ticker: string
  name: string
  sector: string
  color: string
  currency: string
  marketCap?: number | null
  trailingPE?: number | null
  dividendYield?: number | null
  fiftyTwoWeekHigh?: number | null
  fiftyTwoWeekLow?: number | null
  lastPrice: number
  previousClose: number
  history: PriceBar[]
}

export interface BenchmarkMeta {
  id: string
  ticker: string
  name: string
  sector: string
  color: string
  lastPrice: number
  previousClose: number
  history: PriceBar[]
}

export interface MarketData {
  updatedAt: string
  stocks: StockMeta[]
  benchmark: BenchmarkMeta | null
}

export type TimeRange = '1M' | '3M' | '6M' | 'YTD' | '1Y' | 'ALL'

export interface StockStats {
  id: string
  returnPct: number
  volatility: number
  sharpe: number
  maxDrawdown: number
  beta: number | null
  rsi: number
  sma20: number
  sma50: number
  trend: 'Bullish' | 'Neutral' | 'Bearish'
  dailyChangePct: number
}

export interface ChartPoint {
  date: string
  label: string
  [key: string]: string | number
}
