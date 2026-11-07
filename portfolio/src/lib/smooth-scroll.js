import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance = null

/**
 * Initializes physical smooth momentum scrolling (House of Honey / Awwwards standard).
 * Uses physical lerp damping (0.09) so wheel input reacts INSTANTLY on frame 1 with zero input lag,
 * then glides with natural exponential deceleration into a soft stop.
 * Synchronized with GSAP's ticker to completely eliminate pin jitter and dropped frames.
 */
export function initSmoothScroll(options = {}) {
  if (typeof window === 'undefined') return null

  if (lenisInstance) {
    return lenisInstance
  }

  const lenis = new Lenis({
    lerp: 0.09, // Instantaneous response on wheel touch + buttery physical coasting
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
    infinite: false,
    autoRaf: false, // GSAP ticker drives it in perfect lockstep
    ...options,
  })

  lenisInstance = lenis

  // Synchronize ScrollTrigger on every Lenis scroll tick
  lenis.on('scroll', ScrollTrigger.update)

  // Drive Lenis strictly through GSAP's ticker (100% lockstep frame sync)
  const tickerHandler = (time) => {
    lenis.raf(time * 1000)
  }
  gsap.ticker.add(tickerHandler)
  gsap.ticker.lagSmoothing(0)

  // Smoothly update top reading progress bar
  lenis.on('scroll', (e) => {
    const scrollVal = e.scroll ?? window.scrollY ?? 0
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = docHeight > 0 ? Math.min(Math.max(scrollVal / docHeight, 0), 1) : 0
    document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(4))
  })

  // Smooth gliding for anchor links (#about, #projects, #leadership, #contact)
  const handleAnchorClick = (event) => {
    const anchor = event.target.closest('a[href^="#"]')
    if (!anchor) return

    const hash = anchor.getAttribute('href')
    if (!hash || hash === '#') return

    const targetEl = document.querySelector(hash)
    if (targetEl) {
      event.preventDefault()
      lenis.scrollTo(targetEl, {
        offset: 0,
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    }
  }

  document.addEventListener('click', handleAnchorClick)

  lenis._destroyCleanup = () => {
    document.removeEventListener('click', handleAnchorClick)
    gsap.ticker.remove(tickerHandler)
    lenis.destroy()
    lenisInstance = null
  }

  return lenis
}

export function getLenis() {
  return lenisInstance
}

export function scrollTo(target, options = {}) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset: 0,
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      ...options,
    })
  } else {
    const elem = typeof target === 'string' ? document.querySelector(target) : target
    elem?.scrollIntoView({ behavior: 'smooth' })
  }
}

export function destroySmoothScroll() {
  if (lenisInstance?._destroyCleanup) {
    lenisInstance._destroyCleanup()
  } else if (lenisInstance) {
    lenisInstance.destroy()
    lenisInstance = null
  }
}
