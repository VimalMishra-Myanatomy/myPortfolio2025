import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "./theme-provider"
import { BackgroundBubbles } from "./components/background-bubbles"

const inter = Inter({ subsets: ["latin"] })

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
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <BackgroundBubbles />
        <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'