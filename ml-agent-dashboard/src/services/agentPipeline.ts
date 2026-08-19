import { APPROVED_SOURCES } from '@/data/algorithms'
import { pickRandomCaseStudy } from '@/data/caseStudies'
import type { MLReport, PipelineStep, PipelineStepId } from '@/types/report'

export const PIPELINE_STEPS: PipelineStep[] = [
  { id: 'scraping', label: 'Scraping Agent', durationMs: 10000 },
  { id: 'parsing', label: 'Standardizing Agent', durationMs: 10000 },
  { id: 'analyzing', label: 'Analyze Agent', durationMs: 10000 },
]

const SCRAPE_MESSAGES = [
  'Querying arXiv and Semantic Scholar indexes…',
  'Collecting dataset metadata from Kaggle and UCI…',
  'Pulling benchmark references from Papers With Code…',
  'Reading NOAA / OpenWeather documentation summaries…',
  'Gathering case study abstracts from approved domains…',
]

const PARSE_MESSAGES = [
  'Mapping fields to MLReport JSON schema…',
  'Normalizing dataset size, modalities, and URLs…',
  'Linking citations with titles and source domains…',
  'Tagging industry, dataset type, and problem type axes…',
  'Validating beginner-level summary length (~2 min read)…',
]

const ANALYZE_MESSAGES = [
  'Scoring predictive strength for practitioner context…',
  'Drafting architecture rationale with compute tradeoffs…',
  'Listing cross-industry usage patterns…',
  'Summarizing strengths, weaknesses, and improvements…',
  'Packaging insights for mobile dashboard rendering…',
]

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function createReportId(): string {
  return `report-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

async function runStep(
  stepId: PipelineStepId,
  durationMs: number,
  messages: string[],
  onProgress: (step: PipelineStepId, progress: number, message: string) => void,
): Promise<void> {
  const tickMs = 500
  const ticks = Math.ceil(durationMs / tickMs)

  for (let i = 0; i < ticks; i += 1) {
    const progress = Math.min(1, (i + 1) / ticks)
    const message = messages[i % messages.length]
    onProgress(stepId, progress, message)
    await wait(tickMs)
  }
}

export interface PipelineOptions {
  algorithmId: string
  seenCaseStudyIds: string[]
  industry?: string
  excludeCaseStudyIds?: string[]
}

export async function runAgentPipeline(
  options: PipelineOptions,
  onProgress: (step: PipelineStepId, progress: number, message: string) => void,
): Promise<MLReport> {
  onProgress('scraping', 0, `Initializing approved sources: ${APPROVED_SOURCES.slice(0, 4).join(', ')}…`)
  await runStep('scraping', PIPELINE_STEPS[0].durationMs, SCRAPE_MESSAGES, onProgress)

  onProgress('parsing', 0, 'Starting schema normalization…')
  await runStep('parsing', PIPELINE_STEPS[1].durationMs, PARSE_MESSAGES, onProgress)

  onProgress('analyzing', 0, 'Starting insight synthesis…')
  await runStep('analyzing', PIPELINE_STEPS[2].durationMs, ANALYZE_MESSAGES, onProgress)

  const template = pickRandomCaseStudy(options.algorithmId, options.seenCaseStudyIds, {
    industry: options.industry,
    excludeIds: options.excludeCaseStudyIds,
  })

  const report: MLReport = {
    ...template,
    id: createReportId(),
    generatedAt: new Date().toISOString(),
  }

  onProgress('complete', 1, 'Report ready.')
  return report
}

export async function runComparisonPipeline(
  algorithmIds: [string, string],
  seenCaseStudyIds: string[],
  industry: string | undefined,
  onProgress: (step: PipelineStepId, progress: number, message: string, algorithmLabel?: string) => void,
): Promise<[MLReport, MLReport]> {
  onProgress('scraping', 0, 'Running dual-algorithm source sweep…')
  await runStep('scraping', 7000, SCRAPE_MESSAGES, (step, progress, message) =>
    onProgress(step, progress * 0.5, message, algorithmIds[0].toUpperCase()),
  )
  await runStep('scraping', 7000, SCRAPE_MESSAGES, (step, progress, message) =>
    onProgress(step, 0.5 + progress * 0.5, message, algorithmIds[1].toUpperCase()),
  )

  onProgress('parsing', 0, 'Aligning both reports to shared schema…')
  await runStep('parsing', 8000, PARSE_MESSAGES, onProgress)

  onProgress('analyzing', 0, 'Generating comparable insights…')
  await runStep('analyzing', 8000, ANALYZE_MESSAGES, onProgress)

  const first = pickRandomCaseStudy(algorithmIds[0], seenCaseStudyIds, { industry })
  const second = pickRandomCaseStudy(algorithmIds[1], seenCaseStudyIds, {
    industry: industry ?? first.caseStudy.industry,
    excludeIds: [first.caseStudy.id],
  })

  const reportA: MLReport = {
    ...first,
    id: createReportId(),
    generatedAt: new Date().toISOString(),
  }

  const reportB: MLReport = {
    ...second,
    id: createReportId(),
    generatedAt: new Date().toISOString(),
  }

  onProgress('complete', 1, 'Comparison ready.')
  return [reportA, reportB]
}
