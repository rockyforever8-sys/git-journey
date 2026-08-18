# Hong Kong Universities IB Dashboard

An interactive comparison dashboard for International Baccalaureate (IB) graduates exploring undergraduate options at Hong Kong's top universities.

## Features

- **IB Score Simulator** — Slide your predicted/final IB score (24–45) to see real-time fit analysis
- **Faculty Filter** — Focus on Arts, Business, Engineering, Science, Medicine, Law, or Social Sciences
- **7 Universities** — HKU, CUHK, HKUST, CityU, PolyU, HKBU, and Lingnan
- **Interactive Charts** — IB requirements, QS rankings, tuition comparison, prestige vs selectivity scatter, and multi-dimensional radar
- **Programme Fit Table** — Per-programme minimum and competitive IB scores with reach/target/safety labels
- **Requirements Summary** — English, Chinese, interview, and assessment policies

## Quick Start

```bash
cd hk-ib-dashboard
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

Admission data is compiled from official university admissions pages for 2025–2026 entry:

- [HKU International Admissions](https://admissions.hku.hk/apply/international-qualifications)
- [CUHK Non-JUPAS Requirements](https://admission.cuhk.edu.hk/application/overseas-other-qualifications-non-local-international-team/requirements/)
- [HKUST International Qualifications](https://join.hkust.edu.hk/admissions/international-qualifications)
- [CityU Non-JUPAS Admissions](https://www.cityu.edu.hk/admo/admissions/non-jupas-year-1-admission)
- [PolyU International Requirements](https://www.polyu.edu.hk/study/ug/admissions/international-other-qualifications/)
- [HKBU Admissions](https://admissions.hkbu.edu.hk/)
- [Lingnan Admissions](https://www.ln.edu.hk/admissions)

> Requirements are indicative. Hong Kong universities use holistic assessment — meeting minimum scores does not guarantee admission.

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Recharts
- Lucide React icons
