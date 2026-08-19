import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useColorScheme } from 'react-native'
import { darkColors, lightColors, type ThemeColors } from '@/theme/colors'

interface ThemeContextValue {
  colors: ThemeColors
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextValue>({
  colors: darkColors,
  isDark: true,
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const scheme = useColorScheme()
  const isDark = scheme !== 'light'
  const colors = isDark ? darkColors : lightColors

  const value = useMemo(() => ({ colors, isDark }), [colors, isDark])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
