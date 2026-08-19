import marketData from './marketData.json'
import type { MarketData } from '../types'

export const data = marketData as MarketData

export const PREFERRED_STOCK_IDS = data.stocks.map((stock) => stock.id)
