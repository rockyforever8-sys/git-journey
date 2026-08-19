# Hong Kong Stocks Performance Dashboard

An interactive dashboard for tracking performance and trend statistics of seven preferred Hong Kong stocks.

## Featured stocks

| Code | Company | Sector |
|------|---------|--------|
| 2476 | Victory Giant Technology (VGT) | Technology |
| 0823 | Link REIT | Real Estate |
| 9988 | Alibaba Group | Consumer Discretionary |
| 9618 | JD.com | Consumer Discretionary |
| 6809 | Montage Technology | Technology |
| 0981 | SMIC | Technology |
| 1211 | BYD Company | Consumer Discretionary |

## Features

- **Price & indexed performance charts** — compare selected stocks vs the Hang Seng Index
- **Time ranges** — 1M, 3M, 6M, YTD, 1Y, and full history
- **Risk metrics** — volatility, Sharpe ratio, max drawdown, beta vs HSI
- **Trend signals** — RSI, SMA 20/50 crossover, bullish/neutral/bearish labels
- **Correlation heatmap** — daily return correlations across the portfolio
- **Rolling volatility** — 20-day annualized vol for the focused stock

## Development

```bash
cd hk-stocks-dashboard
npm install
npm run fetch-data   # refresh market data (requires Python + yfinance)
npm run dev
```

## Data

Market data is fetched from Yahoo Finance via [yfinance](https://github.com/ranaroussi/yfinance) during `npm run build` and can be refreshed manually with `npm run fetch-data`.

> Metrics are indicative and for research purposes only — not investment advice.
