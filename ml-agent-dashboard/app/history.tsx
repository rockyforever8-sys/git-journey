import { useCallback, useState } from 'react'
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { useFocusEffect, useRouter } from 'expo-router'
import { getHistoryReports } from '@/storage/appStorage'
import type { MLReport } from '@/types/report'
import { useTheme } from '@/theme/ThemeContext'

export default function HistoryScreen() {
  const router = useRouter()
  const { colors } = useTheme()
  const [reports, setReports] = useState<MLReport[]>([])
  const [loading, setLoading] = useState(true)

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        setLoading(true)
        setReports(await getHistoryReports())
        setLoading(false)
      }
      void load()
    }, []),
  )

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.accent} />
      </View>
    )
  }

  if (reports.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={{ color: colors.textMuted }}>No cached reports yet. Run an algorithm from home.</Text>
      </View>
    )
  }

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={reports}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => router.push(`/report/${item.id}`)}
          style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <Text style={[styles.algorithm, { color: colors.accent }]}>{item.algorithm}</Text>
          <Text style={[styles.title, { color: colors.text }]}>{item.caseStudy.title}</Text>
          <Text style={[styles.meta, { color: colors.textMuted }]}>
            {item.caseStudy.industry} · {new Date(item.generatedAt).toLocaleString()}
          </Text>
        </Pressable>
      )}
    />
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  list: {
    padding: 16,
    gap: 10,
  },
  card: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    gap: 4,
    marginBottom: 10,
  },
  algorithm: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  meta: {
    fontSize: 12,
  },
})
