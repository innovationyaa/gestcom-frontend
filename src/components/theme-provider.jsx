"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes"

export function ThemeProvider({ children, ...props }) {
  return React.createElement(NextThemesProvider, {
    attribute: "class",
    defaultTheme: "light",
    enableSystem: true,
    disableTransitionOnChange: true,
    ...props
  }, children)
}

export const useTheme = () => {
  const { theme, setTheme, systemTheme } = useNextTheme()
  
  // Helper to check if current theme is dark
  const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark')
  
  return {
    theme,
    setTheme,
    isDark,
    // Aliases for easier usage
    currentTheme: theme,
    toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark')
  }
}
