# Hong Kong Stocks Performance Dashboard

An interactive dashboard for tracking performance and trend statistics of five preferred Hong Kong blue-chip stocks.

## Featured stocks

| Code | Company | Sector |
|------|---------|--------|
| 0700 | Tencent Holdings | Technology |
| 0005 | HSBC Holdings | Financials |
| 9988 | Alibaba Group | Consumer Discretionary |
| 1299 | AIA Group | Financials |
| 3690 | Meituan | Consumer Discretionary |

## Features

- **Price & indexed performance charts** — compare selected stocks vs the Hang Seng Index
- **Time ranges** — 1M, 3M, 6M, YTD, 1Y, and full history
- **Risk metrics** — volatility, Sharpe ratio, max drawdown, beta vs HSI
- **Trend signals** — RSI, SMA 20/50 crossover, bullish/neutral/bearish label
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
