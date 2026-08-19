import type { PriceBar, StockStats } from '../types'
import { pctChange } from './format'

const TRADING_DAYS = 252
const RISK_FREE_RATE = 0.035

export function dailyReturns(history: PriceBar[]): number[] {
  const returns: number[] = []
  for (let i = 1; i < history.length; i += 1) {
    const prev = history[i - 1].close
    if (prev === 0) continue
    returns.push((history[i].close - prev) / prev)
  }
  return returns
}

export function totalReturn(history: PriceBar[]): number {
  if (history.length < 2) return 0
  return pctChange(history[history.length - 1].close, history[0].close)
}

export function annualizedVolatility(returns: number[]): number {
  if (returns.length < 2) return 0
  const mean = returns.reduce((sum, value) => sum + value, 0) / returns.length
  const variance =
    returns.reduce((sum, value) => sum + (value - mean) ** 2, 0) / (returns.length - 1)
  return Math.sqrt(variance) * Math.sqrt(TRADING_DAYS) * 100
}

export function sharpeRatio(returns: number[]): number {
  if (returns.length < 2) return 0
  const meanDaily = returns.reduce((sum, value) => sum + value, 0) / returns.length
  const annualizedReturn = meanDaily * TRADING_DAYS
  const vol = annualizedVolatility(returns) / 100
  if (vol === 0) return 0
  return (annualizedReturn - RISK_FREE_RATE) / vol
}

export function maxDrawdown(history: PriceBar[]): number {
  if (history.length === 0) return 0
  let peak = history[0].close
  let worst = 0
  for (const bar of history) {
    peak = Math.max(peak, bar.close)
    const drawdown = (bar.close - peak) / peak
    worst = Math.min(worst, drawdown)
  }
  return worst * 100
}

export function simpleMovingAverage(history: PriceBar[], window: number): number {
  if (history.length === 0) return 0
  const slice = history.slice(-window)
  const total = slice.reduce((sum, bar) => sum + bar.close, 0)
  return total / slice.length
}

export function rsi(history: PriceBar[], period = 14): number {
  if (history.length <= period) return 50
  const changes: number[] = []
  for (let i = 1; i < history.length; i += 1) {
    changes.push(history[i].close - history[i - 1].close)
  }
  const recent = changes.slice(-period)
  const gains = recent.filter((value) => value > 0)
  const losses = recent.filter((value) => value < 0).map((value) => Math.abs(value))
  const avgGain = gains.length ? gains.reduce((a, b) => a + b, 0) / period : 0
  const avgLoss = losses.length ? losses.reduce((a, b) => a + b, 0) / period : 0
  if (avgLoss === 0) return 100
  const rs = avgGain / avgLoss
  return 100 - 100 / (1 + rs)
}

export function beta(stockReturns: number[], benchmarkReturns: number[]): number | null {
  const length = Math.min(stockReturns.length, benchmarkReturns.length)
  if (length < 10) return null

  const stock = stockReturns.slice(-length)
  const bench = benchmarkReturns.slice(-length)
  const stockMean = stock.reduce((sum, value) => sum + value, 0) / length
  const benchMean = bench.reduce((sum, value) => sum + value, 0) / length

  let covariance = 0
  let benchVariance = 0
  for (let i = 0; i < length; i += 1) {
    covariance += (stock[i] - stockMean) * (bench[i] - benchMean)
    benchVariance += (bench[i] - benchMean) ** 2
  }
  if (benchVariance === 0) return null
  return covariance / benchVariance
}

export function trendLabel(history: PriceBar[]): 'Bullish' | 'Neutral' | 'Bearish' {
  const sma20 = simpleMovingAverage(history, 20)
  const sma50 = simpleMovingAverage(history, 50)
  const last = history[history.length - 1]?.close ?? 0
  if (last > sma20 && sma20 > sma50) return 'Bullish'
  if (last < sma20 && sma20 < sma50) return 'Bearish'
  return 'Neutral'
}

export function buildStockStats(
  id: string,
  history: PriceBar[],
  benchmarkHistory: PriceBar[] | null,
  dailyChange: number,
): StockStats {
  const returns = dailyReturns(history)
  const benchmarkReturns = benchmarkHistory ? dailyReturns(benchmarkHistory) : []

  return {
    id,
    returnPct: totalReturn(history),
    volatility: annualizedVolatility(returns),
    sharpe: sharpeRatio(returns),
    maxDrawdown: maxDrawdown(history),
    beta: benchmarkHistory ? beta(returns, benchmarkReturns) : null,
    rsi: rsi(history),
    sma20: simpleMovingAverage(history, 20),
    sma50: simpleMovingAverage(history, 50),
    trend: trendLabel(history),
    dailyChangePct: dailyChange,
  }
}

export function correlationMatrix(
  series: Record<string, number[]>,
  ids: string[],
): { x: string; y: string; value: number }[] {
  const cells: { x: string; y: string; value: number }[] = []

  for (const x of ids) {
    for (const y of ids) {
      const a = series[x]
      const b = series[y]
      const length = Math.min(a.length, b.length)
      if (length < 5) {
        cells.push({ x, y, value: x === y ? 1 : 0 })
        continue
      }
      const sliceA = a.slice(-length)
      const sliceB = b.slice(-length)
      const meanA = sliceA.reduce((sum, value) => sum + value, 0) / length
      const meanB = sliceB.reduce((sum, value) => sum + value, 0) / length
      let numerator = 0
      let denomA = 0
      let denomB = 0
      for (let i = 0; i < length; i += 1) {
        const da = sliceA[i] - meanA
        const db = sliceB[i] - meanB
        numerator += da * db
        denomA += da ** 2
        denomB += db ** 2
      }
      const value = denomA === 0 || denomB === 0 ? (x === y ? 1 : 0) : numerator / Math.sqrt(denomA * denomB)
      cells.push({ x, y, value: Number(value.toFixed(3)) })
    }
  }

  return cells
}

export function normalizedSeries(history: PriceBar[]): { date: string; value: number }[] {
  if (history.length === 0) return []
  const base = history[0].close
  return history.map((bar) => ({
    date: bar.date,
    value: Number(((bar.close / base) * 100).toFixed(2)),
  }))
}

export function rollingVolatility(history: PriceBar[], window = 20): { date: string; value: number }[] {
  const returns = dailyReturns(history)
  const points: { date: string; value: number }[] = []
  for (let i = window; i < history.length; i += 1) {
    const slice = returns.slice(i - window, i)
    const vol = annualizedVolatility(slice)
    points.push({ date: history[i].date, value: Number(vol.toFixed(2)) })
  }
  return points
}
