"use client"

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { useEffect, useState } from "react"

export default function AnimatedAvatar() {
  const [isHovered, setIsHovered] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-100, 100], [30, -30])
  const rotateY = useTransform(mouseX, [-100, 100], [-30, 30])

  const springConfig = { damping: 20, stiffness: 300 }
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById('avatar-container')?.getBoundingClientRect()
      if (rect) {
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        mouseX.set(e.clientX - centerX)
        mouseY.set(e.clientY - centerY)
      }
    }

    const handleMouseLeave = () => {
      mouseX.set(0)
      mouseY.set(0)
    }

    const container = document.getElementById('avatar-container')
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [mouseX, mouseY])

  return (
    <motion.div
      id="avatar-container"
      className="relative w-64 h-64 mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Avatar container with 3D effect */}
      <motion.div
        className="relative w-full h-full"
        style={{
          perspective: 1000,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Main avatar image */}
        <motion.div
          className="w-full h-full rounded-full overflow-hidden glass shadow-2xl"
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
          }}
          animate={{
            scale: isHovered ? 1.05 : 1,
            boxShadow: isHovered 
              ? "0 20px 40px rgba(59, 130, 246, 0.2)" 
              : "0 10px 20px rgba(59, 130, 246, 0.1)",
          }}
          transition={{ duration: 0.3 }}
        >
          <img
            src="/avatar.jpg"
            alt="Vimal Mishra"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Animated rings */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-blue-500/20"
          animate={{
            scale: isHovered ? 1.1 : 1,
            opacity: isHovered ? 0.5 : 0.2,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-violet-500/20"
          animate={{
            scale: isHovered ? 1.15 : 1,
            opacity: isHovered ? 0.3 : 0.1,
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        />

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-violet-500/20 blur-xl"
          animate={{
            opacity: isHovered ? 0.5 : 0.2,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Interactive elements */}
        <motion.div
          className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold"
          animate={{
            scale: isHovered ? 1.2 : 1,
            rotate: isHovered ? 360 : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          5+
        </motion.div>
        <motion.div
          className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center text-white text-sm font-bold"
          animate={{
            scale: isHovered ? 1.2 : 1,
            rotate: isHovered ? -360 : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          20+
        </motion.div>
      </motion.div>
    </motion.div>
  )
} 