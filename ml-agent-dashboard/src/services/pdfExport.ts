import * as Print from 'expo-print'
import * as Sharing from 'expo-sharing'
import type { MLReport } from '@/types/report'

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function listItems(items: string[]): string {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')
}

export function buildReportHtml(report: MLReport): string {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #0f172a; padding: 24px; }
      h1 { font-size: 24px; margin-bottom: 4px; }
      h2 { font-size: 16px; margin-top: 24px; color: #334155; }
      .meta { color: #64748b; font-size: 12px; margin-bottom: 16px; }
      .pill { display: inline-block; background: #e2e8f0; padding: 4px 8px; border-radius: 999px; font-size: 11px; margin-right: 6px; }
      ul { padding-left: 18px; }
      a { color: #0284c7; }
      .disclaimer { margin-top: 24px; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 12px; }
    </style>
  </head>
  <body>
    <h1>${escapeHtml(report.algorithm)} — ${escapeHtml(report.caseStudy.title)}</h1>
    <p class="meta">Generated ${escapeHtml(new Date(report.generatedAt).toLocaleString())}</p>
    <p>
      <span class="pill">${escapeHtml(report.randomAxes.industry)}</span>
      <span class="pill">${escapeHtml(report.randomAxes.datasetType)}</span>
      <span class="pill">${escapeHtml(report.randomAxes.problemType)}</span>
    </p>
    <h2>2-Minute Summary</h2>
    <p>${escapeHtml(report.beginnerSummary)}</p>
    <h2>Dataset</h2>
    <p><strong>${escapeHtml(report.datasetSummary.name)}</strong> (${escapeHtml(report.datasetSummary.source)}) — ${escapeHtml(report.datasetSummary.size)}</p>
    <p><a href="${escapeHtml(report.datasetSummary.url)}">${escapeHtml(report.datasetSummary.url)}</a></p>
    <h2>Architecture Rationale</h2>
    <p>${escapeHtml(report.architectureRationale)}</p>
    <h2>Predictive Strength</h2>
    <p>${escapeHtml(report.predictiveStrength)}</p>
    <h2>Strengths</h2>
    <ul>${listItems(report.strengths)}</ul>
    <h2>Weaknesses</h2>
    <ul>${listItems(report.weaknesses)}</ul>
    <h2>Future Improvements</h2>
    <ul>${listItems(report.futureImprovements)}</ul>
    <h2>Cross-Industry Usage</h2>
    <ul>${report.crossIndustryUsage
      .map(
        (item) =>
          `<li><strong>${escapeHtml(item.field)}</strong>: ${escapeHtml(item.why)} (${escapeHtml(item.example)})</li>`,
      )
      .join('')}</ul>
    <h2>Compute Tradeoffs</h2>
    <p>${escapeHtml(report.computeTradeoffs.summary)}</p>
    <p>Accuracy: ${escapeHtml(report.computeTradeoffs.accuracy)} · Speed: ${escapeHtml(report.computeTradeoffs.speed)} · Cost: ${escapeHtml(report.computeTradeoffs.cost)}</p>
    <h2>Citations</h2>
    <ul>${report.citations
      .map(
        (citation) =>
          `<li><a href="${escapeHtml(citation.url)}">${escapeHtml(citation.title)}</a> — ${escapeHtml(citation.source)}</li>`,
      )
      .join('')}</ul>
    <p class="disclaimer">Informational only. This report synthesizes public-domain references and does not provide training, validation, or professional advice.</p>
  </body>
</html>`
}

export async function exportReportPdf(report: MLReport): Promise<void> {
  const html = buildReportHtml(report)
  const { uri } = await Print.printToFileAsync({ html })
  const canShare = await Sharing.isAvailableAsync()

  if (canShare) {
    await Sharing.shareAsync(uri, {
      mimeType: 'application/pdf',
      dialogTitle: `${report.algorithm} report`,
      UTI: 'com.adobe.pdf',
    })
  }
}
