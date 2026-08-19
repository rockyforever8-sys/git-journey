import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { PIPELINE_STEPS } from '@/services/agentPipeline'
import type { PipelineStepId } from '@/types/report'
import { useTheme } from '@/theme/ThemeContext'

interface PipelineProgressProps {
  currentStep: PipelineStepId
  stepProgress: number
  message: string
  sublabel?: string
}

const STEP_ICONS: Record<PipelineStepId, keyof typeof Ionicons.glyphMap> = {
  scraping: 'globe-outline',
  parsing: 'code-slash-outline',
  analyzing: 'analytics-outline',
  complete: 'checkmark-circle-outline',
}

export function PipelineProgress({
  currentStep,
  stepProgress,
  message,
  sublabel,
}: PipelineProgressProps) {
  const { colors } = useTheme()
  const activeIndex = PIPELINE_STEPS.findIndex((step) => step.id === currentStep)

  return (
    <View style={styles.wrap}>
      {sublabel ? (
        <Text style={[styles.sublabel, { color: colors.accent }]}>{sublabel}</Text>
      ) : null}
      <Text style={[styles.title, { color: colors.text }]}>Agent pipeline running</Text>
      <Text style={[styles.message, { color: colors.textMuted }]}>{message}</Text>

      <View style={styles.steps}>
        {PIPELINE_STEPS.map((step, index) => {
          const isActive = step.id === currentStep
          const isComplete = activeIndex > index || currentStep === 'complete'
          const progress = isActive ? stepProgress : isComplete ? 1 : 0

          return (
            <View key={step.id} style={styles.stepRow}>
              <View
                style={[
                  styles.stepIcon,
                  {
                    backgroundColor: isComplete
                      ? `${colors.success}22`
                      : isActive
                        ? `${colors.accent}22`
                        : colors.surfaceMuted,
                  },
                ]}
              >
                <Ionicons
                  name={STEP_ICONS[step.id]}
                  size={18}
                  color={isComplete ? colors.success : isActive ? colors.accent : colors.textSubtle}
                />
              </View>
              <View style={styles.stepContent}>
                <Text style={[styles.stepLabel, { color: colors.text }]}>{step.label}</Text>
                <View style={[styles.track, { backgroundColor: colors.surfaceMuted }]}>
                  <View
                    style={[
                      styles.fill,
                      {
                        width: `${Math.round(progress * 100)}%`,
                        backgroundColor: isComplete ? colors.success : colors.accent,
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    gap: 12,
  },
  sublabel: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
  },
  steps: {
    gap: 14,
    marginTop: 8,
  },
  stepRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  stepIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepContent: {
    flex: 1,
    gap: 6,
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  track: {
    height: 6,
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
  },
})
