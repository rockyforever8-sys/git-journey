import { useState } from 'react'
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useRouter } from 'expo-router'
import { PipelineProgress } from '@/components/PipelineProgress'
import { ALGORITHMS } from '@/data/algorithms'
import { listIndustries } from '@/data/caseStudies'
import { runComparisonPipeline } from '@/services/agentPipeline'
import {
  getSessionSeenCaseStudyIds,
  markCaseStudySeen,
  saveReport,
} from '@/storage/appStorage'
import type { PipelineStepId } from '@/types/report'
import { useTheme } from '@/theme/ThemeContext'

export default function CompareScreen() {
  const router = useRouter()
  const { colors } = useTheme()
  const industries = listIndustries()

  const [leftId, setLeftId] = useState(ALGORITHMS[0].id)
  const [rightId, setRightId] = useState(ALGORITHMS[1].id)
  const [industry, setIndustry] = useState<string | undefined>(undefined)
  const [running, setRunning] = useState(false)
  const [step, setStep] = useState<PipelineStepId>('scraping')
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('')
  const [sublabel, setSublabel] = useState<string | undefined>()

  const runCompare = async () => {
    if (leftId === rightId || running) return
    setRunning(true)
    setStep('scraping')
    setProgress(0)
    setMessage('Starting comparison pipeline…')

    const seen = await getSessionSeenCaseStudyIds()
    const [reportA, reportB] = await runComparisonPipeline(
      [leftId, rightId],
      seen,
      industry,
      (nextStep, nextProgress, nextMessage, algorithmLabel) => {
        setStep(nextStep)
        setProgress(nextProgress)
        setMessage(nextMessage)
        setSublabel(algorithmLabel)
      },
    )

    await markCaseStudySeen(reportA.caseStudy.id)
    await markCaseStudySeen(reportB.caseStudy.id)
    await saveReport(reportA)
    await saveReport(reportB)
    setRunning(false)
    router.push(`/report/${reportA.id}?compareWith=${reportB.id}`)
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.lead, { color: colors.textMuted }]}>
        Compare two algorithms on the same industry when possible. Both reports are cached offline with citations.
      </Text>

      <SelectorBlock
        title="Algorithm A"
        selectedId={leftId}
        onSelect={setLeftId}
        disabledId={rightId}
      />
      <SelectorBlock
        title="Algorithm B"
        selectedId={rightId}
        onSelect={setRightId}
        disabledId={leftId}
      />

      <Text style={[styles.label, { color: colors.text }]}>Optional shared industry</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        <Chip label="Any industry" active={!industry} onPress={() => setIndustry(undefined)} />
        {industries.map((item) => (
          <Chip key={item} label={item} active={industry === item} onPress={() => setIndustry(item)} />
        ))}
      </ScrollView>

      {running ? (
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <PipelineProgress
            currentStep={step}
            stepProgress={progress}
            message={message}
            sublabel={sublabel}
          />
          <ActivityIndicator color={colors.accent} style={{ marginTop: 8 }} />
        </View>
      ) : (
        <Pressable
          onPress={() => void runCompare()}
          disabled={leftId === rightId}
          style={[
            styles.runButton,
            {
              backgroundColor: leftId === rightId ? colors.surfaceMuted : colors.accent,
            },
          ]}
        >
          <Text style={styles.runText}>Run comparison pipeline</Text>
        </Pressable>
      )}
    </ScrollView>
  )
}

function SelectorBlock({
  title,
  selectedId,
  onSelect,
  disabledId,
}: {
  title: string
  selectedId: string
  onSelect: (id: string) => void
  disabledId: string
}) {
  const { colors } = useTheme()

  return (
    <View style={styles.selectorBlock}>
      <Text style={[styles.label, { color: colors.text }]}>{title}</Text>
      <View style={styles.selectorGrid}>
        {ALGORITHMS.map((algorithm) => {
          const active = selectedId === algorithm.id
          const disabled = disabledId === algorithm.id
          return (
            <Pressable
              key={algorithm.id}
              disabled={disabled}
              onPress={() => onSelect(algorithm.id)}
              style={[
                styles.selectorChip,
                {
                  opacity: disabled ? 0.35 : 1,
                  backgroundColor: active ? `${algorithm.accent}33` : colors.surfaceMuted,
                  borderColor: active ? algorithm.accent : colors.border,
                },
              ]}
            >
              <Text style={{ color: colors.text, fontWeight: '700' }}>{algorithm.name}</Text>
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}

function Chip({
  label,
  active,
  onPress,
}: {
  label: string
  active: boolean
  onPress: () => void
}) {
  const { colors } = useTheme()
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: active ? colors.accent : colors.surfaceMuted,
          borderColor: active ? colors.accent : colors.border,
        },
      ]}
    >
      <Text style={{ color: active ? '#0b1220' : colors.textMuted, fontSize: 12, fontWeight: '600' }}>
        {label}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
    paddingBottom: 32,
  },
  lead: {
    fontSize: 14,
    lineHeight: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
  },
  selectorBlock: {
    gap: 8,
  },
  selectorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectorChip: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  chips: {
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
  },
  runButton: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  runText: {
    color: '#0b1220',
    fontWeight: '700',
    fontSize: 15,
  },
})
