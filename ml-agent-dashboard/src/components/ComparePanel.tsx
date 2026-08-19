import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import type { MLReport } from '@/types/report'
import { useTheme } from '@/theme/ThemeContext'

interface ComparePanelProps {
  left: MLReport
  right: MLReport
}

export function ComparePanel({ left, right }: ComparePanelProps) {
  const { colors } = useTheme()
  const router = useRouter()

  const rows = [
    {
      label: 'Industry',
      left: left.randomAxes.industry,
      right: right.randomAxes.industry,
    },
    {
      label: 'Dataset type',
      left: left.randomAxes.datasetType,
      right: right.randomAxes.datasetType,
    },
    {
      label: 'Problem',
      left: left.randomAxes.problemType,
      right: right.randomAxes.problemType,
    },
    {
      label: 'Accuracy',
      left: left.computeTradeoffs.accuracy,
      right: right.computeTradeoffs.accuracy,
    },
    {
      label: 'Speed',
      left: left.computeTradeoffs.speed,
      right: right.computeTradeoffs.speed,
    },
  ]

  return (
    <View style={[styles.wrap, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.text }]}>Comparison mode</Text>
      <View style={styles.headerRow}>
        <Text style={[styles.colTitle, { color: colors.accent }]}>{left.algorithm}</Text>
        <Text style={[styles.colTitle, { color: colors.warning }]}>{right.algorithm}</Text>
      </View>
      {rows.map((row) => (
        <View key={row.label} style={[styles.row, { borderTopColor: colors.border }]}>
          <Text style={[styles.rowLabel, { color: colors.textSubtle }]}>{row.label}</Text>
          <View style={styles.headerRow}>
            <Text style={[styles.cell, { color: colors.textMuted }]}>{row.left}</Text>
            <Text style={[styles.cell, { color: colors.textMuted }]}>{row.right}</Text>
          </View>
        </View>
      ))}
      <Pressable onPress={() => router.push(`/report/${right.id}`)}>
        <Text style={[styles.link, { color: colors.accent }]}>Open full {right.algorithm} report →</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    gap: 8,
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  headerRow: {
    flexDirection: 'row',
    gap: 8,
  },
  colTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
  },
  row: {
    borderTopWidth: 1,
    paddingTop: 8,
    gap: 4,
  },
  rowLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  cell: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
  link: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '600',
  },
})
