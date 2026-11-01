import { useEffect, useRef } from 'react'
import { useSpring } from 'framer-motion'

/**
 * useMouseParallax — returns spring-animated x, y values based on mouse position.
 * @param {number} strength — how much the parallax shifts (default 20)
 */
export function useMouseParallax(strength = 20) {
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 })
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * strength
      const y = (e.clientY / window.innerHeight - 0.5) * strength
      mouseX.set(x)
      mouseY.set(y)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY, strength])

  return { mouseX, mouseY }
}

/**
 * useReducedMotion — detects prefers-reduced-motion media query.
 */
export function useReducedMotion() {
  const mq = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null
  return mq?.matches ?? false
}

/**
 * useScrollY — returns current scroll Y as a reactive value.
 */
export function useScrollY() {
  const scrollY = useSpring(0, { stiffness: 100, damping: 30 })
  useEffect(() => {
    const update = () => scrollY.set(window.scrollY)
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [scrollY])
  return scrollY
}
