import AsyncStorage from '@react-native-async-storage/async-storage'
import type { MLReport } from '@/types/report'

const KEYS = {
  history: '@ml-dashboard/history',
  favorites: '@ml-dashboard/favorites',
  reports: '@ml-dashboard/reports',
  sessionSeen: '@ml-dashboard/session-seen',
} as const

async function readJson<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

async function writeJson<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value))
}

export async function getReportsMap(): Promise<Record<string, MLReport>> {
  return readJson(KEYS.reports, {})
}

export async function saveReport(report: MLReport): Promise<void> {
  const reports = await getReportsMap()
  reports[report.id] = report
  await writeJson(KEYS.reports, reports)

  const history = await getHistory()
  const nextHistory = [report.id, ...history.filter((id) => id !== report.id)].slice(0, 50)
  await writeJson(KEYS.history, nextHistory)
}

export async function getReport(id: string): Promise<MLReport | null> {
  const reports = await getReportsMap()
  return reports[id] ?? null
}

export async function getHistory(): Promise<string[]> {
  return readJson(KEYS.history, [])
}

export async function getHistoryReports(): Promise<MLReport[]> {
  const [history, reports] = await Promise.all([getHistory(), getReportsMap()])
  return history.map((id) => reports[id]).filter(Boolean) as MLReport[]
}

export async function getFavoriteIds(): Promise<string[]> {
  return readJson(KEYS.favorites, [])
}

export async function getFavoriteReports(): Promise<MLReport[]> {
  const [favoriteIds, reports] = await Promise.all([getFavoriteIds(), getReportsMap()])
  return favoriteIds.map((id) => reports[id]).filter(Boolean) as MLReport[]
}

export async function toggleFavorite(reportId: string): Promise<boolean> {
  const favorites = await getFavoriteIds()
  const isFavorite = favorites.includes(reportId)
  const next = isFavorite ? favorites.filter((id) => id !== reportId) : [reportId, ...favorites]
  await writeJson(KEYS.favorites, next)
  return !isFavorite
}

export async function isFavorite(reportId: string): Promise<boolean> {
  const favorites = await getFavoriteIds()
  return favorites.includes(reportId)
}

export async function getSessionSeenCaseStudyIds(): Promise<string[]> {
  return readJson(KEYS.sessionSeen, [])
}

export async function markCaseStudySeen(caseStudyId: string): Promise<void> {
  const seen = await getSessionSeenCaseStudyIds()
  if (!seen.includes(caseStudyId)) {
    await writeJson(KEYS.sessionSeen, [...seen, caseStudyId])
  }
}

export async function clearSessionSeen(): Promise<void> {
  await AsyncStorage.removeItem(KEYS.sessionSeen)
}

export async function searchReports(query: string): Promise<MLReport[]> {
  const reports = await getHistoryReports()
  const normalized = query.trim().toLowerCase()
  if (!normalized) return reports

  return reports.filter((report) => {
    const haystack = [
      report.algorithm,
      report.caseStudy.title,
      report.caseStudy.industry,
      report.caseStudy.datasetType,
      report.caseStudy.problemType,
      report.beginnerSummary,
      ...report.crossIndustryUsage.map((item) => item.field),
    ]
      .join(' ')
      .toLowerCase()

    return haystack.includes(normalized)
  })
}
