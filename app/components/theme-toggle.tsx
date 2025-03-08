"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "../theme-provider"

export function ThemeToggle() {
  const { theme, setTheme, isDark } = useTheme()

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="fixed top-4 right-4 p-2 rounded-full bg-white/90 dark:bg-slate-800/90 shadow-lg hover:scale-110 transition-all duration-200 z-50"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-slate-800" />
      )}
    </button>
  )
} 