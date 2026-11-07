import React, { createContext, useContext, useEffect, useMemo } from 'react'
import { initSmoothScroll, destroySmoothScroll, scrollTo, getLenis } from '@/lib/smooth-scroll'

const SmoothScrollContext = createContext({
  lenis: null,
  scrollTo,
})

export function useLenis() {
  return useContext(SmoothScrollContext)
}

/**
 * Editorial Scroll Progress Bar (House of Honey aesthetic)
 * Minimal 2px glowing top line that tracks scroll progress with zero latency.
 */
function ScrollProgressBar() {
  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] pointer-events-none origin-left"
      style={{
        transform: 'scaleX(var(--scroll-progress, 0))',
        transformOrigin: '0% 50%',
        willChange: 'transform',
        background: 'linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.85) 70%, #ffffff 100%)',
        boxShadow: '0 0 12px rgba(255, 255, 255, 0.45)',
      }}
    />
  )
}

export default function SmoothScrollProvider({ children, options }) {
  useEffect(() => {
    // Only initialize smooth scroll on client devices that don't prefer reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      return
    }

    const instance = initSmoothScroll(options)

    return () => {
      destroySmoothScroll()
    }
  }, [options])

  const contextValue = useMemo(() => ({
    get lenis() {
      return getLenis()
    },
    scrollTo,
  }), [])

  return (
    <SmoothScrollContext.Provider value={contextValue}>
      <ScrollProgressBar />
      {children}
    </SmoothScrollContext.Provider>
  )
}
