"use client"

import { useRef, useEffect } from "react"
import { useTheme } from "../theme-provider"

interface ParticlesProps {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
  refresh?: boolean
}

export default function Particles({
  className = "",
  quantity = 30,
  staticity = 50,
  ease = 50,
  refresh = false,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const circles = useRef<any[]>([])
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 })
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1
  const { theme } = useTheme()

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d")
    }
    initCanvas()
    animate()
    window.addEventListener("resize", initCanvas)

    return () => {
      window.removeEventListener("resize", initCanvas)
    }
  }, [])

  useEffect(() => {
    initCanvas()
  }, [refresh])

  useEffect(() => {
    onMouseMove({ clientX: 0, clientY: 0 })
  }, [])

  const initCanvas = () => {
    resizeCanvas()
    drawParticles()
  }

  const onMouseMove = (e: { clientX: number; clientY: number }) => {
    if (canvasContainerRef.current) {
      const rect = canvasContainerRef.current.getBoundingClientRect()
      const { w, h } = canvasSize.current
      const x = e.clientX - rect.left - w / 2
      const y = e.clientY - rect.top - h / 2
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2
      if (inside) {
        mouse.current.x = x
        mouse.current.y = y
      }
    }
  }

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current = []
      canvasSize.current.w = canvasContainerRef.current.offsetWidth
      canvasSize.current.h = canvasContainerRef.current.offsetHeight
      canvasRef.current.width = canvasSize.current.w * dpr
      canvasRef.current.height = canvasSize.current.h * dpr
      canvasRef.current.style.width = `${canvasSize.current.w}px`
      canvasRef.current.style.height = `${canvasSize.current.h}px`
      context.current.scale(dpr, dpr)
    }
  }

  const circleParams = () => {
    const x = Math.floor(Math.random() * canvasSize.current.w)
    const y = Math.floor(Math.random() * canvasSize.current.h)
    const translateX = 0
    const translateY = 0
    const size = Math.floor(Math.random() * 3) + 1.5 // Larger particles
    const alpha = 0
    const targetAlpha = parseFloat((Math.random() * 0.8 + 0.2).toFixed(1)) // Higher opacity
    const dx = (Math.random() - 0.5) * 0.3 // Slightly faster movement
    const dy = (Math.random() - 0.5) * 0.3
    const magnetism = 0.1 + Math.random() * 5 // More magnetic
    return {
      x,
      y,
      translateX,
      translateY,
      size,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    }
  }

  const drawCircle = (circle: any, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha } = circle
      context.current.translate(translateX, translateY)
      context.current.beginPath()
      context.current.arc(x, y, size, 0, 2 * Math.PI)

      // Use gradient colors based on position for more visual interest
      const gradientPosition = (x / canvasSize.current.w) * 100

      if (theme === "dark") {
        // In dark mode, use brighter colors
        if (gradientPosition < 33) {
          context.current.fillStyle = `rgba(147, 197, 253, ${alpha})` // blue-300
        } else if (gradientPosition < 66) {
          context.current.fillStyle = `rgba(196, 181, 253, ${alpha})` // violet-300
        } else {
          context.current.fillStyle = `rgba(254, 240, 138, ${alpha})` // yellow-200
        }
      } else {
        // In light mode, use darker colors
        if (gradientPosition < 33) {
          context.current.fillStyle = `rgba(37, 99, 235, ${alpha})` // blue-600
        } else if (gradientPosition < 66) {
          context.current.fillStyle = `rgba(124, 58, 237, ${alpha})` // violet-600
        } else {
          context.current.fillStyle = `rgba(59, 130, 246, ${alpha})` // blue-500
        }
      }

      context.current.fill()
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (!update) {
        circles.current.push(circle)
      }
    }
  }

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h)
    }
  }

  const drawParticles = () => {
    clearContext()
    const particleCount = quantity
    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams()
      drawCircle(circle)
    }
  }

  const remapValue = (value: number, start1: number, end1: number, start2: number, end2: number): number => {
    const remapped = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2
    return remapped > 0 ? remapped : 0
  }

  const animate = () => {
    clearContext()
    circles.current.forEach((circle: any, i: number) => {
      // Handle the alpha value
      const edge = [
        circle.x + circle.translateX - circle.size, // distance from left edge
        canvasSize.current.w - circle.x - circle.translateX - circle.size, // distance from right edge
        circle.y + circle.translateY - circle.size, // distance from top edge
        canvasSize.current.h - circle.y - circle.translateY - circle.size, // distance from bottom edge
      ]
      const closestEdge = edge.reduce((a, b) => Math.min(a, b))
      const remapClosestEdge = Number.parseFloat(remapValue(closestEdge, 0, 20, 0, 1).toFixed(2))
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02
        if (circle.alpha > circle.targetAlpha) {
          circle.alpha = circle.targetAlpha
        }
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge
      }
      circle.x += circle.dx
      circle.y += circle.dy
      if (circle.x < 0 || circle.x > canvasSize.current.w) {
        circle.dx *= -1
      }
      if (circle.y < 0 || circle.y > canvasSize.current.h) {
        circle.dy *= -1
      }
      // Mouse magnetism
      const mouseDistance = Math.sqrt(
        Math.pow(mouse.current.x - (circle.x - canvasSize.current.w / 2), 2) +
          Math.pow(mouse.current.y - (circle.y - canvasSize.current.h / 2), 2),
      )
      const remapMouse = Number.parseFloat(remapValue(mouseDistance, 0, 100, 0, 1).toFixed(2))
      if (remapMouse > 1) {
        // Gravity
        mousePosition.current.x = 0
        mousePosition.current.y = 0
      } else {
        const angle = Math.atan2(
          mouse.current.y - (circle.y - canvasSize.current.h / 2),
          mouse.current.x - (circle.x - canvasSize.current.w / 2),
        )
        const remapStaticity = 1 - Number.parseFloat(remapValue(staticity, 0, 100, 0, 1).toFixed(2))
        const magnetism = circle.magnetism * remapStaticity * (1 - remapMouse)
        mousePosition.current.x = Math.cos(angle) * magnetism
        mousePosition.current.y = Math.sin(angle) * magnetism
      }
      const easing = Number.parseFloat(remapValue(ease, 0, 100, 0, 1).toFixed(2))
      circle.translateX += (mousePosition.current.x - circle.translateX) * easing
      circle.translateY += (mousePosition.current.y - circle.translateY) * easing
      drawCircle(circle, true)
    })
    window.requestAnimationFrame(animate)
  }

  return (
    <div className={className} ref={canvasContainerRef} onMouseMove={onMouseMove}>
      <canvas ref={canvasRef} />
    </div>
  )
}

