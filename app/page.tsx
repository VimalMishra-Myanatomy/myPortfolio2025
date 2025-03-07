"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Header from "./components/header"
import Hero from "./components/hero"
import Experience from "./components/experience"
import Projects from "./components/projects"
import Certifications from "./components/certifications"
import Contact from "./components/contact"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [scrollY, setScrollY] = useState(0)

  // Refs for sections
  const sectionRefs = {
    home: useRef(null),
    experience: useRef(null),
    projects: useRef(null),
    certifications: useRef(null),
    contact: useRef(null),
  }

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Determine which section is in view
      const currentPosition = window.scrollY + 100

      Object.entries(sectionRefs).forEach(([section, ref]) => {
        if (ref.current) {
          const element = ref.current as HTMLElement
          const { offsetTop, offsetHeight } = element

          if (currentPosition >= offsetTop && currentPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-slate-900">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} scrollY={scrollY} />
      <main className="w-full">
        <Hero sectionRef={sectionRefs.home as unknown as React.RefObject<HTMLElement>} />
        <Experience sectionRef={sectionRefs.experience as unknown as React.RefObject<HTMLElement>} />
        <Projects sectionRef={sectionRefs.projects as unknown as React.RefObject<HTMLElement>} />
        <Certifications sectionRef={sectionRefs.certifications as unknown as React.RefObject<HTMLElement>} />
        <Contact sectionRef={sectionRefs.contact as unknown as React.RefObject<HTMLElement>} />
      </main>
    </div>
  )
}

