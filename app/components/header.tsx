"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Briefcase, Code, Award, Mail, Moon, Sun, Menu, X } from 'lucide-react'
import { useTheme } from "../theme-provider"

interface HeaderProps {
  activeSection: string
  setActiveSection: (section: string) => void
  scrollY: number
}

export default function Header({ activeSection, setActiveSection, scrollY }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setScrolled(scrollY > 50)
  }, [scrollY])

  const navItems = [
    { name: "Home", icon: <Sparkles size={16} />, tooltip: "Welcome to my portfolio!" },
    { name: "Experience", icon: <Briefcase size={16} />, tooltip: "My professional journey" },
    { name: "Projects", icon: <Code size={16} />, tooltip: "Check out my work" },
    { name: "Certifications", icon: <Award size={16} />, tooltip: "My achievements" },
    { name: "Contact", icon: <Mail size={16} />, tooltip: "Let's connect!" },
  ]

  const handleNavClick = (itemName: string) => {
    const section = document.getElementById(itemName.toLowerCase());
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(itemName.toLowerCase());
      setMenuOpen(false);
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled 
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold gradient-text hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={() => handleNavClick("Home")}
        >
          Vimal Mishra
        </motion.div>

        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <motion.button 
                  onClick={() => handleNavClick(item.name)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-tooltip={item.tooltip}
                  className={`group flex items-center gap-1.5 px-3 py-2 rounded-full transition-all duration-300 ${
                    activeSection === item.name.toLowerCase()
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium shadow-lg"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <motion.span 
                    className="transition-transform duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.icon}
                  </motion.span>
                  {item.name}
                </motion.button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <motion.button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative p-2 overflow-hidden rounded-full transition-all duration-500 hover:shadow-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:ring-2 hover:ring-blue-400 dark:hover:ring-blue-500"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ y: -30, opacity: 0, rotate: -180 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: 30, opacity: 0, rotate: 180 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          <div className="md:hidden">
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -180, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute top-20 left-0 right-0 mx-4 glass rounded-xl shadow-xl p-4"
                >
                  <ul className="space-y-2">
                    {navItems.map((item) => (
                      <motion.li 
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.button 
                          onClick={() => handleNavClick(item.name)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`flex w-full items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                            activeSection === item.name.toLowerCase()
                              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium shadow-lg"
                              : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50"
                          }`}
                        >
                          <motion.span
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            {item.icon}
                          </motion.span>
                          {item.name}
                        </motion.button>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  )
} 