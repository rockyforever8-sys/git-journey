import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import type { AlgorithmDefinition } from '@/types/report'
import { useTheme } from '@/theme/ThemeContext'

const ICON_MAP = {
  layers: 'layers-outline',
  'git-branch': 'git-branch-outline',
  tree: 'leaf-outline',
  users: 'people-outline',
  repeat: 'repeat-outline',
} as const

interface AlgorithmCardProps {
  algorithm: AlgorithmDefinition
  onPress: () => void
}

export function AlgorithmCard({ algorithm, onPress }: AlgorithmCardProps) {
  const { colors } = useTheme()

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          opacity: pressed ? 0.88 : 1,
        },
      ]}
    >
      <View style={[styles.iconWrap, { backgroundColor: `${algorithm.accent}22` }]}>
        <Ionicons
          name={ICON_MAP[algorithm.icon]}
          size={22}
          color={algorithm.accent}
        />
      </View>
      <View style={styles.content}>
        <Text style={[styles.name, { color: colors.text }]}>{algorithm.name}</Text>
        <Text style={[styles.fullName, { color: colors.textMuted }]} numberOfLines={1}>
          {algorithm.fullName}
        </Text>
        <Text style={[styles.tagline, { color: colors.textSubtle }]} numberOfLines={2}>
          {algorithm.tagline}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.textSubtle} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
  },
  fullName: {
    fontSize: 12,
  },
  tagline: {
    fontSize: 12,
    marginTop: 4,
  },
})
