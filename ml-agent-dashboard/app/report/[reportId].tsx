import { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { ReportView } from '@/components/ReportView'
import { exportReportPdf } from '@/services/pdfExport'
import { getReport, isFavorite, toggleFavorite } from '@/storage/appStorage'
import type { MLReport } from '@/types/report'
import { useTheme } from '@/theme/ThemeContext'

export default function ReportScreen() {
  const { reportId, compareWith } = useLocalSearchParams<{ reportId: string; compareWith?: string }>()
  const router = useRouter()
  const { colors } = useTheme()
  const [report, setReport] = useState<MLReport | null>(null)
  const [compareReport, setCompareReport] = useState<MLReport | null>(null)
  const [favorite, setFavorite] = useState(false)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    const loaded = await getReport(String(reportId))
    setReport(loaded)
    if (compareWith) {
      setCompareReport(await getReport(String(compareWith)))
    } else {
      setCompareReport(null)
    }
    if (loaded) {
      setFavorite(await isFavorite(loaded.id))
    }
    setLoading(false)
  }, [reportId, compareWith])

  useEffect(() => {
    void load()
  }, [load])

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.accent} />
      </View>
    )
  }

  if (!report) {
    return (
      <View style={styles.center}>
        <Text style={{ color: colors.textMuted, marginBottom: 12 }}>Report not found offline.</Text>
        <Pressable onPress={() => router.replace('/')} style={[styles.button, { backgroundColor: colors.accent }]}>
          <Text style={styles.buttonText}>Back home</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <ReportView
        report={report}
        compareReport={compareReport}
        isFavorite={favorite}
        onToggleFavorite={async () => {
          const next = await toggleFavorite(report.id)
          setFavorite(next)
        }}
        onExportPdf={() => exportReportPdf(report)}
      />

      <View style={[styles.footer, { borderTopColor: colors.border, backgroundColor: colors.background }]}>
        <Pressable
          onPress={() => router.push(`/pipeline/${report.algorithmId}`)}
          style={[styles.button, { backgroundColor: colors.accent }]}
        >
          <Text style={styles.buttonText}>Generate another case study</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  footer: {
    borderTopWidth: 1,
    padding: 12,
  },
  button: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#0b1220',
    fontWeight: '700',
    fontSize: 15,
  },
})
