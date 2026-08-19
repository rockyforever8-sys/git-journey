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

### 1. Install Expo Go on your phone

- **Android**: [Google Play — Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent)
- **iPhone**: [App Store — Expo Go](https://apps.apple.com/app/expo-go/id982107779)

### 2. Start the dev server on your computer

The QR code appears **in the terminal**, not in Cursor or a browser tab.

```bash
cd ml-agent-dashboard
npm install
npm start
```

Wait until you see **“Metro waiting on…”** and a **square QR code made of text characters** in that same terminal window.

If the QR looks cut off, widen the terminal or scroll up a few lines.

### 3. Scan the QR code

**Android**

1. Open the **Expo Go** app.
2. Tap **Scan QR code** on the home screen.
3. Point your camera at the QR in the terminal.
4. The ML Agent Dashboard should load.

**iPhone**

1. Open the **Camera** app (or Expo Go → Scan QR code).
2. Point at the QR in the terminal.
3. Tap the banner **“Open in Expo Go”**.

### 4. If you still cannot see or scan the QR

**Option A — same Wi‑Fi (easiest)**

- Put phone and computer on the **same Wi‑Fi network**.
- Run `npm start` (default LAN mode).

**Option B — tunnel (different networks / VPN)**

```bash
npx expo start --tunnel
```

Use the new QR or copy the `exp://…` URL printed under the QR.

**Option C — enter URL manually**

1. In Expo Go, tap **Enter URL manually**.
2. Paste the line that looks like: `exp://192.168.x.x:8081` or `exp://….exp.direct`

### 5. Emulator alternative (no phone scan)

```bash
npm run android   # Android emulator
npm run ios       # iOS simulator (macOS only)
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
