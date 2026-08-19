import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { ThemeProvider, useTheme } from '@/theme/ThemeContext'

SplashScreen.preventAutoHideAsync().catch(() => undefined)

function RootLayoutNav() {
  const { colors, isDark } = useTheme()

  useEffect(() => {
    SplashScreen.hideAsync().catch(() => undefined)
  }, [])

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="index" options={{ title: 'ML Agent Dashboard' }} />
        <Stack.Screen name="pipeline/[algorithmId]" options={{ title: 'Agent Pipeline' }} />
        <Stack.Screen name="report/[reportId]" options={{ title: 'Insight Report' }} />
        <Stack.Screen name="compare" options={{ title: 'Compare Algorithms' }} />
        <Stack.Screen name="history" options={{ title: 'History' }} />
        <Stack.Screen name="favorites" options={{ title: 'Favorites' }} />
        <Stack.Screen name="search" options={{ title: 'Search Reports' }} />
      </Stack>
    </>
  )
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  )
}
