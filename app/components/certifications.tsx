"use client"

import { motion } from "framer-motion"
import { Award, ExternalLink, Calendar, Building2, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface CertificationsProps {
  sectionRef: React.RefObject<HTMLElement>
}

interface CertificationItem {
  title: string
  issuer: string
  date: string
  credentialUrl?: string
}

const certifications: CertificationItem[] = [
  {
    title: "OpenAI API: Building Assistants",
    issuer: "LinkedIn",
    date: "2024",
    credentialUrl: "https://www.linkedin.com/learning/certificates/8ab572b156fd536576f91ba5c354088f91ae6d9cc34bb37a6c994860b8ba87f8?u=222097778",
  },
  {
    title: "Introduction to Prompt Engineering for Generative AI",
    issuer: "LinkedIn",
    date: "2024",
    credentialUrl: "https://www.linkedin.com/learning/certificates/31b08bfcb0562dd6acb773822142be60eff38a2ad0dbc5561336de4d0bd298b3",
  },
  {
    title: "Career Essentials in Generative AI by Microsoft and LinkedIn",
    issuer: "LinkedIn",
    date: "2024",
    credentialUrl: "https://www.linkedin.com/learning/certificates/431dcf10226379e44a86460c9c93fc33b6b73d1ace059e43951dbbb02b5f35e8",
  },
  {
    title: "Build Your Generative AI Productivity Skills with Microsoft and LinkedIn",
    issuer: "LinkedIn",
    date: "2024",
    credentialUrl: "https://www.linkedin.com/learning/certificates/c11b3f7ae2929b75e6ac993395cf0dab620f9a16c9a8db8b8418a52e94b39ac5",
  },
]

export default function Certifications({ sectionRef }: CertificationsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % certifications.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + certifications.length) % certifications.length)
  }

  return (
    <section id="certifications" ref={sectionRef} className="section-container py-16 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-violet-50/50 to-purple-50/50 dark:from-blue-950/50 dark:via-violet-950/50 dark:to-purple-950/50 backdrop-blur-3xl" />
      
      <div className="max-w-6xl mx-auto relative px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-12 px-4"
        >
          <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-3xl font-bold gradient-text">Certifications</h2>
        </motion.div>

        <div className="relative">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="glass rounded-xl p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold gradient-text">{certifications[currentIndex].title}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-500">
                    <div className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      {certifications[currentIndex].issuer}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {certifications[currentIndex].date}
                    </div>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                >
                  <Award className="w-5 h-5" />
                </motion.div>
              </div>

              {certifications[currentIndex].credentialUrl && (
                <motion.a
                  href={certifications[currentIndex].credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors group"
                  whileHover={{ x: 5 }}
                >
                  <span>View Credential</span>
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </motion.a>
              )}
            </div>
          </motion.div>

          {/* Navigation buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              onClick={prevSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              onClick={nextSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {certifications.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-blue-600 dark:bg-blue-400 w-4"
                    : "bg-slate-300 dark:bg-slate-600"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 