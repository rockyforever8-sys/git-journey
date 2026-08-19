import { useMemo, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useRouter } from 'expo-router'
import { searchReports } from '@/storage/appStorage'
import type { MLReport } from '@/types/report'
import { useTheme } from '@/theme/ThemeContext'

export default function SearchScreen() {
  const router = useRouter()
  const { colors } = useTheme()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<MLReport[]>([])

  const placeholder = useMemo(
    () => 'Search algorithm, industry, dataset, or cross-field usage…',
    [],
  )

  const onSearch = async (value: string) => {
    setQuery(value)
    setResults(await searchReports(value))
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        onChangeText={(value) => void onSearch(value)}
        placeholder={placeholder}
        placeholderTextColor={colors.textSubtle}
        style={[
          styles.input,
          {
            color: colors.text,
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      />

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.textMuted }]}>
            {query ? 'No offline matches.' : 'Search cached reports from your device history.'}
          </Text>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/report/${item.id}`)}
            style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
          >
            <Text style={[styles.algorithm, { color: colors.accent }]}>{item.algorithm}</Text>
            <Text style={[styles.title, { color: colors.text }]}>{item.caseStudy.title}</Text>
            <Text style={[styles.meta, { color: colors.textMuted }]}>
              {item.caseStudy.industry} · {item.caseStudy.datasetType}
            </Text>
          </Pressable>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  empty: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 14,
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
