import { useState } from 'react'
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { ComparePanel } from '@/components/ComparePanel'
import type { MLReport } from '@/types/report'
import { useTheme } from '@/theme/ThemeContext'

interface ReportViewProps {
  report: MLReport
  compareReport?: MLReport | null
  onExportPdf?: () => void
  onToggleFavorite?: () => void
  isFavorite?: boolean
}

type TabKey = 'overview' | 'dataset' | 'architecture' | 'insights' | 'cross' | 'tradeoffs'

const TABS: { key: TabKey; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'dataset', label: 'Dataset' },
  { key: 'architecture', label: 'Architecture' },
  { key: 'insights', label: 'Insights' },
  { key: 'cross', label: 'Cross-field' },
  { key: 'tradeoffs', label: 'Tradeoffs' },
]

export function ReportView({
  report,
  compareReport,
  onExportPdf,
  onToggleFavorite,
  isFavorite = false,
}: ReportViewProps) {
  const { colors } = useTheme()
  const [tab, setTab] = useState<TabKey>('overview')

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {compareReport ? <ComparePanel left={report} right={compareReport} /> : null}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.algorithm, { color: colors.accent }]}>{report.algorithm}</Text>
          <Text style={[styles.title, { color: colors.text }]}>{report.caseStudy.title}</Text>
          <Text style={[styles.summary, { color: colors.textMuted }]}>{report.caseStudy.summary}</Text>
        </View>
        <View style={styles.actions}>
          {onToggleFavorite ? (
            <Pressable onPress={onToggleFavorite} style={[styles.actionBtn, { borderColor: colors.border }]}>
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={18}
                color={isFavorite ? colors.danger : colors.textMuted}
              />
            </Pressable>
          ) : null}
          {onExportPdf ? (
            <Pressable onPress={onExportPdf} style={[styles.actionBtn, { borderColor: colors.border }]}>
              <Ionicons name="document-text-outline" size={18} color={colors.textMuted} />
            </Pressable>
          ) : null}
        </View>
      </View>

      <View style={styles.axisRow}>
        <AxisPill label="Industry" value={report.randomAxes.industry} />
        <AxisPill label="Dataset" value={report.randomAxes.datasetType} />
        <AxisPill label="Problem" value={report.randomAxes.problemType} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
        {TABS.map((item) => {
          const active = tab === item.key
          return (
            <Pressable
              key={item.key}
              onPress={() => setTab(item.key)}
              style={[
                styles.tab,
                {
                  backgroundColor: active ? colors.accent : colors.surfaceMuted,
                  borderColor: active ? colors.accent : colors.border,
                },
              ]}
            >
              <Text style={{ color: active ? '#0b1220' : colors.textMuted, fontWeight: '600', fontSize: 12 }}>
                {item.label}
              </Text>
            </Pressable>
          )
        })}
      </ScrollView>

      <View style={[styles.panel, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        {tab === 'overview' && (
          <>
            <Section title="2-minute read" colors={colors} body={report.beginnerSummary} />
            <Section title="Predictive strength" colors={colors} body={report.predictiveStrength} />
          </>
        )}
        {tab === 'dataset' && (
          <>
            <Section
              title={report.datasetSummary.name}
              colors={colors}
              body={`Source: ${report.datasetSummary.source}
Size: ${report.datasetSummary.size}
Modalities: ${report.datasetSummary.modalities.join(', ')}
Problem: ${report.datasetSummary.problemType}`}
            />
            <CitationLink url={report.datasetSummary.url} label="Open dataset reference" colors={colors} />
          </>
        )}
        {tab === 'architecture' && (
          <Section title="Why this architecture?" colors={colors} body={report.architectureRationale} />
        )}
        {tab === 'insights' && (
          <>
            <BulletSection title="Strengths" items={report.strengths} colors={colors} />
            <BulletSection title="Weaknesses" items={report.weaknesses} colors={colors} />
            <BulletSection title="Future improvements" items={report.futureImprovements} colors={colors} />
          </>
        )}
        {tab === 'cross' && (
          <>
            {report.crossIndustryUsage.map((item) => (
              <View key={item.field} style={styles.crossItem}>
                <Text style={[styles.crossField, { color: colors.text }]}>{item.field}</Text>
                <Text style={[styles.crossBody, { color: colors.textMuted }]}>{item.why}</Text>
                <Text style={[styles.crossExample, { color: colors.textSubtle }]}>{item.example}</Text>
              </View>
            ))}
          </>
        )}
        {tab === 'tradeoffs' && (
          <>
            <MetricRow label="Accuracy" value={report.computeTradeoffs.accuracy} colors={colors} />
            <MetricRow label="Speed" value={report.computeTradeoffs.speed} colors={colors} />
            <Section title="Compute cost" colors={colors} body={report.computeTradeoffs.cost} />
            <Section title="Balanced summary" colors={colors} body={report.computeTradeoffs.summary} />
          </>
        )}
      </View>

      <View style={[styles.citations, { borderColor: colors.border }]}>
        <Text style={[styles.citationsTitle, { color: colors.text }]}>Citations</Text>
        {report.citations.map((citation) => (
          <Pressable
            key={citation.url}
            onPress={() => Linking.openURL(citation.url)}
            style={styles.citationRow}
          >
            <Ionicons name="link-outline" size={16} color={colors.accent} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.citationTitle, { color: colors.accent }]}>{citation.title}</Text>
              <Text style={[styles.citationSource, { color: colors.textSubtle }]}>{citation.source}</Text>
            </View>
          </Pressable>
        ))}
      </View>

      <Text style={[styles.disclaimer, { color: colors.textSubtle }]}>
        Informational only. Synthesizes approved public sources. Not training, validation, testing, or professional advice.
      </Text>
    </ScrollView>
  )
}

function AxisPill({ label, value }: { label: string; value: string }) {
  const { colors } = useTheme()
  return (
    <View style={[styles.pill, { backgroundColor: colors.surfaceMuted, borderColor: colors.border }]}>
      <Text style={[styles.pillLabel, { color: colors.textSubtle }]}>{label}</Text>
      <Text style={[styles.pillValue, { color: colors.text }]} numberOfLines={1}>
        {value}
      </Text>
    </View>
  )
}

function Section({
  title,
  body,
  colors,
}: {
  title: string
  body: string
  colors: ReturnType<typeof useTheme>['colors']
}) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.sectionBody, { color: colors.textMuted }]}>{body}</Text>
    </View>
  )
}

function BulletSection({
  title,
  items,
  colors,
}: {
  title: string
  items: string[]
  colors: ReturnType<typeof useTheme>['colors']
}) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
      {items.map((item) => (
        <Text key={item} style={[styles.bullet, { color: colors.textMuted }]}>
          • {item}
        </Text>
      ))}
    </View>
  )
}

function MetricRow({
  label,
  value,
  colors,
}: {
  label: string
  value: string
  colors: ReturnType<typeof useTheme>['colors']
}) {
  return (
    <View style={styles.metricRow}>
      <Text style={[styles.metricLabel, { color: colors.textSubtle }]}>{label}</Text>
      <Text style={[styles.metricValue, { color: colors.text }]}>{value}</Text>
    </View>
  )
}

function CitationLink({
  url,
  label,
  colors,
}: {
  url: string
  label: string
  colors: ReturnType<typeof useTheme>['colors']
}) {
  return (
    <Pressable onPress={() => Linking.openURL(url)} style={styles.citationRow}>
      <Ionicons name="open-outline" size={16} color={colors.accent} />
      <Text style={{ color: colors.accent, flex: 1 }}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    gap: 14,
  },
  header: {
    flexDirection: 'row',
    gap: 12,
  },
  algorithm: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 4,
  },
  summary: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  axisRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    minWidth: '30%',
    flexGrow: 1,
  },
  pillLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  pillValue: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  tabs: {
    gap: 8,
    paddingVertical: 2,
  },
  tab: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  panel: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    gap: 12,
  },
  section: {
    gap: 6,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  sectionBody: {
    fontSize: 14,
    lineHeight: 21,
  },
  bullet: {
    fontSize: 14,
    lineHeight: 21,
  },
  crossItem: {
    gap: 4,
    marginBottom: 8,
  },
  crossField: {
    fontSize: 15,
    fontWeight: '700',
  },
  crossBody: {
    fontSize: 14,
    lineHeight: 20,
  },
  crossExample: {
    fontSize: 12,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  citations: {
    borderTopWidth: 1,
    paddingTop: 12,
    gap: 10,
  },
  citationsTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  citationRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
  },
  citationTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  citationSource: {
    fontSize: 12,
    marginTop: 2,
  },
  disclaimer: {
    fontSize: 11,
    lineHeight: 16,
  },
})
