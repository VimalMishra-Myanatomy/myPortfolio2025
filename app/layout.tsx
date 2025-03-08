import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "./theme-provider"
import { BackgroundBubbles } from "./components/background-bubbles"

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Vimal Mishra - Senior Software Developer",
  description:
    "Portfolio website of Vimal Mishra, a Senior Software Developer specializing in React, Redux, and modern web technologies.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.className} min-h-screen bg-background`}>
        <ThemeProvider>
          <BackgroundBubbles />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'