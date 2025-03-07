"use client"

import { motion } from "framer-motion"
import { Code, Trophy, Sparkles, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface ProjectsProps {
  sectionRef: React.RefObject<HTMLElement>
}

interface ProjectItem {
  title: string
  description: string[]
  technologies: string[]
  achievements: string[]
}

const projects: ProjectItem[] = [
  {
    title: "Learning Management System",
    description: [
      "Developed critical components utilizing React and Redux, pivotal in the successful launch of several major features, while also providing mentorship to junior team members, driving the completion of 1 project sprint almost every month.",
      "Conducted code reviews of junior developers, providing feedback and guidance to ensure code quality and adherence to best practices. Resolved over 50 critical bugs through rigorous regression testing, ensuring robust stability of the system.",
      "Facilitated collaboration between developers, designers, architects, and stakeholders, resulting in 2 significant feature enhancements under LMS (Discussion Forum and Feedback System).",
    ],
    technologies: ["React", "Redux", "Jest", "Material UI"],
    achievements: [
      "Reduced bug reports by 30%",
      "Completed 1 project sprint per month",
      "Resolved 50+ critical bugs",
    ],
  },
  {
    title: "Video Transcoding, Streaming, and Media Player",
    description: [
      "Spearheaded the creation of a transcoding service capable of converting uploaded videos into multiple formats, ensuring optimal streaming across diverse devices and network conditions, resulting in a 45% reduction in buffering incidents.",
      "Implemented a responsive media player (Video.js) with adaptive playback adjustments based on real-time network strength, elevating end-user viewing experience and driving a 30% increase in user engagement.",
      "Implemented a streamlined video watermarking process using FFmpeg, resulting in a 40% increase in brand visibility and safeguarding intellectual property rights from unauthorized distribution.",
    ],
    technologies: ["Video.js", "FFmpeg", "Streaming", "Transcoding"],
    achievements: [
      "45% reduction in buffering incidents",
      "30% increase in user engagement",
      "40% increase in brand visibility",
    ],
  },
]

export default function Projects({ sectionRef }: ProjectsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <section id="projects" ref={sectionRef} className="section-container py-16 relative overflow-hidden">
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
          <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-3xl font-bold gradient-text">Projects</h2>
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
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold gradient-text">{projects[currentIndex].title}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-500">
                    <div className="flex items-center gap-1">
                      <Trophy className="w-4 h-4" />
                      {projects[currentIndex].achievements.length} achievements
                    </div>
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-4 h-4" />
                      {projects[currentIndex].technologies.length} technologies
                    </div>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </motion.div>
              </div>

              <div>
                <h4 className="font-medium mb-3 text-slate-700 dark:text-slate-300">Description:</h4>
                <ul className="space-y-3">
                  {projects[currentIndex].description.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-2 text-slate-600 dark:text-slate-300"
                    >
                      <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-3 text-slate-700 dark:text-slate-300">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {projects[currentIndex].technologies.map((tech, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="px-3 py-1 text-sm rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-300 cursor-pointer"
                      onMouseEnter={() => setHoveredTech(tech)}
                      onMouseLeave={() => setHoveredTech(null)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3 text-slate-700 dark:text-slate-300">Key Achievements:</h4>
                <ul className="space-y-2">
                  {projects[currentIndex].achievements.map((achievement, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2 text-slate-600 dark:text-slate-300"
                    >
                      <Trophy className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      {achievement}
                    </motion.li>
                  ))}
                </ul>
              </div>
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
            {projects.map((_, index) => (
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