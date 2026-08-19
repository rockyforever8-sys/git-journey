export type TradeoffLevel = 'low' | 'medium' | 'high'
export type SpeedLevel = 'slow' | 'medium' | 'fast'

export interface Citation {
  url: string
  title: string
  source: string
}

export interface CrossIndustryUsage {
  field: string
  why: string
  example: string
}

export interface ComputeTradeoffs {
  accuracy: TradeoffLevel
  speed: SpeedLevel
  cost: string
  summary: string
}

export interface DatasetSummary {
  name: string
  source: string
  size: string
  modalities: string[]
  problemType: string
  url: string
}

export interface CaseStudyMeta {
  id: string
  title: string
  industry: string
  datasetType: string
  problemType: string
  summary: string
}

export interface MLReport {
  id: string
  generatedAt: string
  algorithm: string
  algorithmId: string
  caseStudy: CaseStudyMeta
  datasetSummary: DatasetSummary
  architectureRationale: string
  predictiveStrength: string
  strengths: string[]
  weaknesses: string[]
  futureImprovements: string[]
  crossIndustryUsage: CrossIndustryUsage[]
  computeTradeoffs: ComputeTradeoffs
  citations: Citation[]
  beginnerSummary: string
  randomAxes: {
    industry: string
    datasetType: string
    problemType: string
  }
}

export type CaseStudyTemplate = Omit<MLReport, 'id' | 'generatedAt'>

export type PipelineStepId = 'scraping' | 'parsing' | 'analyzing' | 'complete'

export interface PipelineStep {
  id: PipelineStepId
  label: string
  durationMs: number
}

export interface AlgorithmDefinition {
  id: string
  name: string
  fullName: string
  tagline: string
  accent: string
  icon: 'layers' | 'git-branch' | 'tree' | 'users' | 'repeat'
}
