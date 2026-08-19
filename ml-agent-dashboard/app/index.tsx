import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { AlgorithmCard } from '@/components/AlgorithmCard'
import { ALGORITHMS, APPROVED_SOURCES } from '@/data/algorithms'
import { useTheme } from '@/theme/ThemeContext'

const QUICK_LINKS = [
  { href: '/compare' as const, label: 'Compare', icon: 'git-compare-outline' as const },
  { href: '/history' as const, label: 'History', icon: 'time-outline' as const },
  { href: '/favorites' as const, label: 'Favorites', icon: 'heart-outline' as const },
  { href: '/search' as const, label: 'Search', icon: 'search-outline' as const },
]

export default function HomeScreen() {
  const router = useRouter()
  const { colors } = useTheme()

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.hero, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.heroTitle, { color: colors.text }]}>
          Practitioner ML intelligence in ~2 minutes
        </Text>
        <Text style={[styles.heroBody, { color: colors.textMuted }]}>
          Tap an algorithm to run scraping, standardizing, and analyze agents over curated public sources.
          No training or validation—just structured insights with citations.
        </Text>
      </View>

      <View style={styles.quickRow}>
        {QUICK_LINKS.map((link) => (
          <Pressable
            key={link.href}
            onPress={() => router.push(link.href)}
            style={[styles.quickLink, { backgroundColor: colors.surfaceMuted, borderColor: colors.border }]}
          >
            <Ionicons name={link.icon} size={18} color={colors.accent} />
            <Text style={[styles.quickLabel, { color: colors.text }]}>{link.label}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Algorithms</Text>
      <View style={styles.cards}>
        {ALGORITHMS.map((algorithm) => (
          <AlgorithmCard
            key={algorithm.id}
            algorithm={algorithm}
            onPress={() => router.push(`/pipeline/${algorithm.id}`)}
          />
        ))}
      </View>

      <View style={[styles.sources, { borderColor: colors.border }]}>
        <Text style={[styles.sourcesTitle, { color: colors.text }]}>Approved public sources</Text>
        <Text style={[styles.sourcesBody, { color: colors.textMuted }]}>
          {APPROVED_SOURCES.join(' · ')}
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
    paddingBottom: 32,
  },
  hero: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    gap: 8,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 28,
  },
  heroBody: {
    fontSize: 14,
    lineHeight: 21,
  },
  quickRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  quickLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  cards: {
    gap: 10,
  },
  sources: {
    borderTopWidth: 1,
    paddingTop: 14,
    gap: 6,
  },
  sourcesTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  sourcesBody: {
    fontSize: 12,
    lineHeight: 18,
  },
})
