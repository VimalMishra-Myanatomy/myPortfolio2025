"use client"

import { motion } from "framer-motion"
import { Briefcase, MapPin, Calendar, Code2 } from 'lucide-react'

interface ExperienceProps {
  sectionRef: React.RefObject<HTMLElement>
}

interface ExperienceItem {
  title: string
  company: string
  period: string
  location: string
  description: string[]
  technologies: string[]
}

const experiences: ExperienceItem[] = [
  {
    title: "Senior Software Developer",
    company: "MYANATOMY",
    period: "October 2024 - Present",
    location: "Remote",
    description: [
      "Lead and manage across-functional team of developers and QA engineers, ensuring seamless collaboration and efficient feature development.",
      "Collaborate with business teams and stakeholders to gather requirements, define features, and oversee implementation from design to deployment.",
      "Exploring and integrating AI tools, including building an Ask Me Anything chatbot using Zapier and experimenting with OpenAI for job recommendations based on NCET scores.",
    ],
    technologies: ["React", "Redux", "AI", "Zapier", "OpenAI"],
  },
  {
    title: "Software Developer",
    company: "MYANATOMY",
    period: "August 2022 - September 2024",
    location: "Remote",
    description: [
      "Spearheaded cross-functional collaboration with UI/UX designers, development team, and system architects to ideate and deliver comprehensive software solutions, resulting in a 25% acceleration in project turnaround time.",
      "Facilitated an average of 20 code reviews, providing incisive feedback to ensure superior code quality, sustainability, and alignment with industry best practices.",
      "Led across-functional team of more than 10 individuals in product development and design, overseeing task delegation and ensuring seamless collaboration with the QA team to address and resolve an average of 20 bugs per sprint effectively.",
    ],
    technologies: ["React", "Redux", "Jest", "Material UI", "React-Ag-Grid"],
  },
  {
    title: "Technical Intern",
    company: "MYANATOMY",
    period: "June 2021 - July 2022",
    location: "Remote",
    description: [
      "Implemented BlogPost, a sophisticated React-Redux CRUD application, incorporating rigorous Jest snapshot testing to ensure robust functionality and reliability, reducing bug reports by 30%.",
      "Leveraged cutting-edge third-party libraries including Material UI, React-Ag-Grid, and Redux to optimize application performance, enhancing user experience and reducing load times by 40%.",
      "Pioneered adoption of bleeding-edge technologies, resulting in a 100% adherence to deadlines while enhancing productivity and efficiency.",
    ],
    technologies: ["React", "Redux", "Jest", "Material UI", "React-Ag-Grid"],
  },
  {
    title: "AI Trainer",
    company: "OUTLIER.AI",
    period: "June 2024 - Present",
    location: "Remote",
    description: [
      "Evaluated and rated 100+ machine learning model responses generated by various prompts, assessing quality, accuracy, and coherence based on established criteria.",
      "Provided comparative feedback on LLM outputs, identifying strengths and weaknesses in over 50 model response comparisons, informing model development efforts.",
      "Contributed to improved LLM training data by providing feedback on training prompts and data for 5+ projects, enhancing the quality and effectiveness of future LLM training datasets.",
    ],
    technologies: ["AI", "Machine Learning", "LLM", "Data Analysis"],
  },
]

export default function Experience({ sectionRef }: ExperienceProps) {
  return (
    <section id="experience" ref={sectionRef} className="section-container py-16 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-violet-50/50 to-purple-50/50 dark:from-blue-950/50 dark:via-violet-950/50 dark:to-purple-950/50 backdrop-blur-3xl" />
      
      <div className="max-w-6xl mx-auto relative px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-12 px-4"
        >
          <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-3xl font-bold gradient-text">Experience</h2>
        </motion.div>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.period}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-xl p-6 hover:shadow-xl transition-all duration-300 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold gradient-text">{exp.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">{exp.company}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm text-slate-500 dark:text-slate-500">
                      {exp.technologies.length} technologies
                    </span>
                  </div>
                </div>

                <ul className="space-y-3">
                  {exp.description.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-2 text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors duration-300"
                    >
                      <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.technologies.map((tech, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="px-3 py-1 text-sm rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 