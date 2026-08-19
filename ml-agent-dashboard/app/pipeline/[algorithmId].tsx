import { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { PipelineProgress } from '@/components/PipelineProgress'
import { getAlgorithm } from '@/data/algorithms'
import { runAgentPipeline } from '@/services/agentPipeline'
import {
  getSessionSeenCaseStudyIds,
  markCaseStudySeen,
  saveReport,
} from '@/storage/appStorage'
import type { PipelineStepId } from '@/types/report'
import { useTheme } from '@/theme/ThemeContext'

export default function PipelineScreen() {
  const { algorithmId } = useLocalSearchParams<{ algorithmId: string }>()
  const router = useRouter()
  const { colors } = useTheme()
  const algorithm = getAlgorithm(String(algorithmId))
  const started = useRef(false)

  const [step, setStep] = useState<PipelineStepId>('scraping')
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('Initializing agents…')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!algorithm || started.current) return
    started.current = true

    const run = async () => {
      try {
        const seen = await getSessionSeenCaseStudyIds()
        const report = await runAgentPipeline(
          {
            algorithmId: algorithm.id,
            seenCaseStudyIds: seen,
          },
          (nextStep, nextProgress, nextMessage) => {
            setStep(nextStep)
            setProgress(nextProgress)
            setMessage(nextMessage)
          },
        )

        await markCaseStudySeen(report.caseStudy.id)
        await saveReport(report)
        router.replace(`/report/${report.id}`)
      } catch (pipelineError) {
        setError(pipelineError instanceof Error ? pipelineError.message : 'Pipeline failed')
      }
    }

    void run()
  }, [algorithm, router])

  if (!algorithm) {
    return (
      <View style={styles.center}>
        <Text style={{ color: colors.text }}>Unknown algorithm.</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: colors.danger, marginBottom: 12 }}>{error}</Text>
        <Pressable onPress={() => router.back()} style={[styles.retry, { backgroundColor: colors.accent }]}>
          <Text style={styles.retryText}>Go back</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.algorithm, { color: colors.accent }]}>{algorithm.name}</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Curated cache mode · ~30s orchestration
        </Text>
        <PipelineProgress currentStep={step} stepProgress={progress} message={message} />
        {step !== 'complete' ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator color={colors.accent} />
            <Text style={{ color: colors.textSubtle, fontSize: 12 }}>Offline-ready report will be cached locally</Text>
          </View>
        ) : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    gap: 12,
  },
  algorithm: {
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 13,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  retry: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  retryText: {
    color: '#0b1220',
    fontWeight: '700',
  },
})
