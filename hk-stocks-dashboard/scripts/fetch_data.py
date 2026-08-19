#!/usr/bin/env python3
"""Fetch Hong Kong stock market data and write JSON for the dashboard."""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path

import yfinance as yf

STOCKS = [
    {
        "id": "2476",
        "ticker": "2476.HK",
        "name": "Victory Giant Technology",
        "sector": "Technology",
        "color": "#38bdf8",
    },
    {
        "id": "0823",
        "ticker": "0823.HK",
        "name": "Link REIT",
        "sector": "Real Estate",
        "color": "#34d399",
    },
    {
        "id": "9988",
        "ticker": "9988.HK",
        "name": "Alibaba Group",
        "sector": "Consumer Discretionary",
        "color": "#fb923c",
    },
    {
        "id": "9618",
        "ticker": "9618.HK",
        "name": "JD.com",
        "sector": "Consumer Discretionary",
        "color": "#f472b6",
    },
    {
        "id": "6809",
        "ticker": "6809.HK",
        "name": "Montage Technology",
        "sector": "Technology",
        "color": "#a78bfa",
    },
    {
        "id": "0981",
        "ticker": "0981.HK",
        "name": "SMIC",
        "sector": "Technology",
        "color": "#fbbf24",
    },
    {
        "id": "1211",
        "ticker": "1211.HK",
        "name": "BYD Company",
        "sector": "Consumer Discretionary",
        "color": "#22d3ee",
    },
]

BENCHMARK = {
    "id": "HSI",
    "ticker": "^HSI",
    "name": "Hang Seng Index",
    "sector": "Benchmark",
    "color": "#94a3b8",
}


def series_from_history(df) -> list[dict]:
    rows = []
    for idx, row in df.iterrows():
        rows.append(
            {
                "date": idx.strftime("%Y-%m-%d"),
                "open": round(float(row["Open"]), 4),
                "high": round(float(row["High"]), 4),
                "low": round(float(row["Low"]), 4),
                "close": round(float(row["Close"]), 4),
                "volume": int(row["Volume"]) if row["Volume"] == row["Volume"] else 0,
            }
        )
    return rows


def main() -> None:
    output_path = Path(__file__).resolve().parent.parent / "src" / "data" / "marketData.json"
    output_path.parent.mkdir(parents=True, exist_ok=True)

    payload: dict = {
        "updatedAt": datetime.now(timezone.utc).isoformat(),
        "stocks": [],
        "benchmark": None,
    }

    for stock in STOCKS:
        history = yf.Ticker(stock["ticker"]).history(period="2y", auto_adjust=True)
        if history.empty:
            raise RuntimeError(f"No data returned for {stock['ticker']}")

        info = yf.Ticker(stock["ticker"]).info
        latest = history.iloc[-1]
        previous = history.iloc[-2] if len(history) > 1 else latest

        payload["stocks"].append(
            {
                **stock,
                "currency": info.get("currency", "HKD"),
                "marketCap": info.get("marketCap"),
                "trailingPE": info.get("trailingPE"),
                "dividendYield": info.get("dividendYield"),
                "fiftyTwoWeekHigh": info.get("fiftyTwoWeekHigh"),
                "fiftyTwoWeekLow": info.get("fiftyTwoWeekLow"),
                "lastPrice": round(float(latest["Close"]), 4),
                "previousClose": round(float(previous["Close"]), 4),
                "history": series_from_history(history),
            }
        )

    benchmark_history = yf.Ticker(BENCHMARK["ticker"]).history(period="2y", auto_adjust=True)
    if not benchmark_history.empty:
        latest = benchmark_history.iloc[-1]
        previous = benchmark_history.iloc[-2] if len(benchmark_history) > 1 else latest
        payload["benchmark"] = {
            **BENCHMARK,
            "lastPrice": round(float(latest["Close"]), 4),
            "previousClose": round(float(previous["Close"]), 4),
            "history": series_from_history(benchmark_history),
        }

    output_path.write_text(json.dumps(payload, indent=2))
    print(f"Wrote market data for {len(payload['stocks'])} stocks to {output_path}")


if __name__ == "__main__":
    main()
