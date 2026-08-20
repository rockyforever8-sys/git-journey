# AI Model Companies Dashboard

An interactive dashboard comparing the world's leading AI model companies across benchmark scores, operational capabilities, and strategic strengths/weaknesses — with special focus on **United States** and **China**.

## Features

- **14 companies** across US, China, and global markets
- **13 metrics** including Arena Elo, MMLU, GPQA, HumanEval, SWE-bench, MATH, and more
- **Interactive comparison** — select up to 4 companies side-by-side
- **Regional filters** — view All, US-only, China-only, or other global players
- **Radar charts** for multi-dimensional capability comparison
- **Bar charts** for benchmark scores and Arena Elo rankings
- **Strengths & weaknesses** cards for each selected company
- **Full metrics table** with visual bar indicators

## Companies Included

| Region | Companies |
|--------|-----------|
| 🇺🇸 USA | Anthropic, OpenAI, Google DeepMind, Meta, xAI, Microsoft |
| 🇨🇳 China | DeepSeek, Alibaba (Qwen), Moonshot AI, ByteDance, Baidu, Zhipu AI, Tencent |
| 🌍 Global | Mistral AI (France) |

## Quick Start

```bash
cd ai-companies-dashboard
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Build

```bash
npm run build
npm run preview
```

## Data Sources

Metrics are synthesized from public benchmarks and reports (August 2026):

- **LMArena** (formerly LMSYS Chatbot Arena) — human preference Elo ratings
- **MMLU** — Massive Multitask Language Understanding
- **GPQA Diamond** — graduate-level science reasoning
- **HumanEval** — Python code generation
- **SWE-bench Verified** — real-world software engineering
- **MATH** — competition mathematics

> Scores within 2–3% should be treated as ties. Benchmarks are directional, not absolute.
