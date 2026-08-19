# ML Agent Dashboard

Cross-platform mobile dashboard (iOS + Android) for practitioners exploring machine learning algorithms through a **three-agent orchestration flow**—without running training, validation, or testing.

Built with **Expo (React Native)** for a single codebase, dark-minimal UI, system theme support, and offline cached reports.

## Features

- **5 algorithm categories**: CNN, SVM, Random Forest, KNN, RNN
- **Simulated agent pipeline** (~30s): Scraping → Standardizing → Analyze
- **Curated public-source pool** (Option B): arXiv, Semantic Scholar, Papers With Code, Kaggle, UCI, Hugging Face, NOAA, OpenWeather
- **Structured JSON reports** with beginner-level ~2-minute summaries
- **Random case studies** from a seeded pool (industry, dataset type, problem type shown explicitly)
- **Session de-duplication** so repeats are avoided until the pool cycles
- **Comparison mode** for two algorithms (optional shared industry)
- **History, favorites, search** over offline cached reports
- **PDF export** via share sheet
- **Clickable citations** to approved public references

## Quick start

```bash
cd ml-agent-dashboard
npm install
npm start
```

Scan the QR code with **Expo Go** on Android/iOS, or run:

```bash
npm run android
npm run ios
```

## Architecture

| Layer | Role |
|-------|------|
| `src/data/caseStudies.ts` | Seeded practitioner case studies + random picker |
| `src/services/agentPipeline.ts` | Simulated 3-step orchestration (~10s per step) |
| `src/storage/appStorage.ts` | AsyncStorage for offline history/favorites/search |
| `src/services/pdfExport.ts` | HTML → PDF export |
| `app/` | Expo Router screens |

No backend is required: reports are synthesized from curated local content (aligned with your “no backend” preference). A future version could swap the analyze step for a hosted LLM API while keeping the same JSON schema.

## Disclaimer

Informational only. Reports summarize public-domain references and do not constitute professional, medical, or financial advice.
