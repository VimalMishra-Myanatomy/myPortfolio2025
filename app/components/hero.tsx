"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Download, ExternalLink, Sparkles, Code, Rocket } from 'lucide-react'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import AnimatedAvatar from './animated-avatar'

interface HeroProps {
  sectionRef: React.RefObject<HTMLElement>
}

export default function Hero({ sectionRef }: HeroProps) {
  const [easterEggCount, setEasterEggCount] = useState(0)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const triggerEasterEgg = () => {
    setEasterEggCount((prev) => prev + 1)
    if (easterEggCount === 4) {
      setShowEasterEgg(true)
      setTimeout(() => setShowEasterEgg(false), 3000)
      setEasterEggCount(0)
    }
  }

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" ref={sectionRef} className="section-container py-20 md:py-32 relative overflow-hidden">
      {/* Background effects */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-violet-50/50 to-purple-50/50 dark:from-blue-950/50 dark:via-violet-950/50 dark:to-purple-950/50 backdrop-blur-3xl"
        style={{
          backgroundPosition: `${mousePosition.x / 50}% ${mousePosition.y / 50}%`,
          transition: 'background-position 0.5s ease-out'
        }}
      />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2 md:gap-16 items-center relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium text-sm shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Sparkles className="w-4 h-4" />
            Senior Software Developer
          </motion.div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              Hi, I'm{" "}
              <motion.span
                className="gradient-text relative inline-block cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                onClick={triggerEasterEgg}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Vimal Mishra
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-violet-500 to-purple-600 dark:from-blue-400 dark:via-violet-400 dark:to-purple-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                />
              </motion.span>
            </h1>

            <motion.p
              className="text-lg text-slate-600 dark:text-slate-300 max-w-md leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Experienced developer specializing in React, Redux, and modern web technologies with a passion for
              building efficient and user-friendly applications.
            </motion.p>
          </div>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.a
                    onClick={handleContactClick}
                    href="#contact"
                    className="modern-button inline-flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail size={20} />
                    Let's Build Something Amazing
                  </motion.a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ready to create something awesome together?</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 dark:bg-white/5 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download size={20} />
                    View Resume
                  </motion.a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Check out my full experience</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>

          <motion.div
            className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              <span>5+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <Rocket className="w-4 h-4" />
              <span>20+ Projects Completed</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-full blur-3xl animate-pulse-slow" />
          <AnimatedAvatar />
        </motion.div>
      </div>

      {/* Easter Egg */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 glass p-6 rounded-xl shadow-2xl"
          >
            <p className="text-lg font-semibold text-center gradient-text">
              🎉 You found the easter egg! 🎉
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 text-center">
              You're as curious as I am persistent. We'd make a great team! 😉
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
} 