import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { timelineEntries } from '@/data/timeline'

gsap.registerPlugin(ScrollTrigger)

/* ─── Tag color mapping with glowing aura ─────────────────────── */
const TAG_THEMES = {
  Leadership: {
    accent: '#a3e635', // lime green
    glow: 'rgba(163, 230, 53, 0.55)',
    border: 'rgba(163, 230, 53, 0.35)',
    bg: 'rgba(163, 230, 53, 0.08)',
  },
  Achievement: {
    accent: '#facc15', // amber / gold
    glow: 'rgba(250, 204, 21, 0.55)',
    border: 'rgba(250, 204, 21, 0.35)',
    bg: 'rgba(250, 204, 21, 0.08)',
  },
  Education: {
    accent: '#38bdf8', // sky blue
    glow: 'rgba(56, 189, 248, 0.55)',
    border: 'rgba(56, 189, 248, 0.35)',
    bg: 'rgba(56, 189, 248, 0.08)',
  },
}

/* ─── Main Leadership / My Story Section ─────────────────────── */
export default function Leadership() {
  const sectionRef = useRef(null)
  const rightColRef = useRef(null)
  const trackRef = useRef(null)
  const dotRefs = useRef([])

  const total = timelineEntries.length
  const [activeIndex, setActiveIndex] = useState(0)
  const activeIndexRef = useRef(0)

  // Spine horizontal positioning class used by Spine line, Focal Ball, and Dots
  const spinePosClass = "left-6 sm:left-10 md:left-14 lg:left-16"

  useGSAP(() => {
    const section = sectionRef.current
    const rightCol = rightColRef.current
    const track = trackRef.current
    if (!section || !rightCol || !track) return

    const focalCenterY = rightCol.offsetHeight * 0.5
    const trackRect = track.getBoundingClientRect()
    const dotOffsets = dotRefs.current.map((dotEl) => {
      if (!dotEl) return 0
      const dotRect = dotEl.getBoundingClientRect()
      return (dotRect.top - trackRect.top) + (dotRect.height / 2)
    })

    const maxIdx = total - 1

    // Initial position setup
    if (dotOffsets[0]) {
      track.style.transform = `translate3d(0, ${focalCenterY - dotOffsets[0]}px, 0)`
    }

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const virtualIdx = self.progress * maxIdx
        const currentActive = Math.min(maxIdx, Math.round(virtualIdx))

        if (currentActive !== activeIndexRef.current) {
          activeIndexRef.current = currentActive
          setActiveIndex(currentActive)
        }

        const baseIdx = Math.floor(virtualIdx)
        const nextIdx = Math.min(maxIdx, baseIdx + 1)
        const fraction = virtualIdx - baseIdx

        const offsetA = dotOffsets[baseIdx] || 0
        const offsetB = dotOffsets[nextIdx] ?? offsetA
        const interpolatedOffset = offsetA + (offsetB - offsetA) * fraction

        const targetY = focalCenterY - interpolatedOffset
        track.style.transform = `translate3d(0, ${targetY}px, 0)`
      },
    })

    return () => st.kill()
  }, { scope: sectionRef, dependencies: [total] })

  const activeEntry = timelineEntries[activeIndex] || timelineEntries[0]
  const activeTheme = TAG_THEMES[activeEntry.tag] || TAG_THEMES.Leadership

  return (
    <section
      id="leadership"
      ref={sectionRef}
      className="relative bg-[var(--color-bg)] text-[var(--color-text)]"
      style={{
        // 95vh scroll per card ensures comfortable, paced scrolling
        minHeight: `${Math.max(2, total) * 95}vh`,
      }}
    >
      {/* ── Sticky 100vh Viewport ── */}
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row overflow-hidden border-t border-b border-white/5">
        
        {/* ════ LEFT PANEL: Sticky Header / Story Info ════ */}
        <div className="w-full md:w-[42%] lg:w-[38%] shrink-0 flex flex-col justify-between md:justify-center px-6 sm:px-10 md:px-12 lg:px-16 py-8 md:py-16 relative z-20 md:border-r border-white/5 bg-[var(--color-bg)]/80 backdrop-blur-sm md:bg-transparent">
          {/* Subtle noise grain texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.04) 0%, transparent 60%)',
            }}
          />

          <div className="relative z-10 max-w-sm">
            {/* Tag / Category */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
                My Story
              </span>
            </div>

            {/* Sub-headline */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-neutral-200 tracking-tight leading-snug mb-3 sm:mb-6">
              Let&apos;s go back in time.
            </h2>

            {/* Giant Year Counter with smooth slide/fade */}
            <div className="overflow-hidden py-1 mb-2 sm:mb-4">
              <div
                key={activeEntry.year}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white font-[var(--font-display)] leading-none select-none transition-transform duration-500 ease-out"
                style={{
                  animation: 'leadershipYearSlide 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
                }}
              >
                {activeEntry.year}
              </div>
            </div>

            {/* Current period subtitle */}
            <p className="text-xs sm:text-sm font-mono tracking-widest text-neutral-400 uppercase mb-6 sm:mb-8 transition-opacity duration-300">
              {activeEntry.period}
            </p>

            {/* Progress indicator */}
            <div className="flex items-center gap-3.5 pt-1">
              <span className="text-[11px] sm:text-xs font-mono text-neutral-400 tracking-wider">
                ◎ {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
              <div className="w-28 sm:w-36 h-[2px] bg-neutral-800 rounded-full overflow-hidden relative">
                <div
                  className="absolute inset-y-0 left-0 bg-white rounded-full transition-all duration-300 ease-out"
                  style={{
                    width: `${((activeIndex + 1) / total) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Scroll hint on desktop */}
          <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-neutral-400 tracking-widest uppercase mt-8">
            <span className="inline-block w-3 h-[1px] bg-neutral-700" />
            Scroll to traverse timeline
          </div>
        </div>

        {/* ════ RIGHT PANEL: Sliding Timeline Track ════ */}
        <div
          ref={rightColRef}
          className="flex-1 relative flex flex-col justify-start overflow-hidden"
        >
          {/* Top & Bottom Vignette masks for seamless edge fading */}
          <div
            className="absolute top-0 inset-x-0 h-20 sm:h-28 md:h-36 z-30 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, #030303 15%, transparent 100%)',
            }}
          />
          <div
            className="absolute bottom-0 inset-x-0 h-20 sm:h-28 md:h-36 z-30 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, #030303 15%, transparent 100%)',
            }}
          />

          {/* Continuous vertical timeline spine line */}
          <div
            className={`absolute ${spinePosClass} top-0 bottom-0 w-[1px] pointer-events-none z-10 -translate-x-1/2`}
            style={{
              background:
                'linear-gradient(to bottom, transparent, rgba(255,255,255,0.18) 12%, rgba(255,255,255,0.18) 88%, transparent)',
            }}
          />

          {/* ✦ Stationed Glowing Focal Aura at exactly 50% middle ✦ */}
          <div
            className={`absolute ${spinePosClass} -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none transition-all duration-500`}
            style={{
              top: '50%',
            }}
          >
            {/* Radiant pulsing glow */}
            <div
              className="absolute -inset-3.5 sm:-inset-4 rounded-full blur-md opacity-80 animate-pulse transition-all duration-500"
              style={{
                background: `radial-gradient(circle, ${activeTheme.glow} 0%, rgba(250,204,21,0.4) 50%, transparent 70%)`,
              }}
            />
            {/* Stationary Golden focal core ring */}
            <div
              className="w-4 h-4 sm:w-5 sm:h-5 rounded-full relative z-10 transition-colors duration-500"
              style={{
                background:
                  'radial-gradient(circle at 35% 30%, #fef08a, #eab308 60%, #a16207)',
                boxShadow:
                  '0 0 16px 4px rgba(250,204,21,0.65), 0 0 32px 8px rgba(234,179,8,0.3)',
                border: '1.5px solid #ffffff',
              }}
            />
          </div>

          {/* ── Sliding Cards Track ── */}
          <div
            ref={trackRef}
            className="relative z-10 will-change-transform"
          >
            {timelineEntries.map((entry, idx) => {
              const theme = TAG_THEMES[entry.tag] || TAG_THEMES.Leadership
              const isActive = idx === activeIndex
              const distanceToActive = Math.abs(idx - activeIndex)
              const cardOpacity = Math.max(0.2, 1 - distanceToActive * 0.75)
              const cardScale = Math.max(0.96, 1 - distanceToActive * 0.04)

              return (
                <div
                  key={entry.id}
                  className="relative py-16 sm:py-20 md:py-28"
                  style={{
                    opacity: cardOpacity,
                    transform: `scale(${cardScale})`,
                    transition: 'opacity 0.4s ease, transform 0.4s ease',
                  }}
                >
                  {/* Period label */}
                  <div className="pl-14 sm:pl-20 md:pl-28 lg:pl-32 mb-1.5">
                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-neutral-400">
                      {entry.period}
                    </span>
                  </div>

                  {/* Title Row with aligned Dot on the exact Spine coordinate */}
                  <div className="relative pl-14 sm:pl-20 md:pl-28 lg:pl-32 mb-2 flex items-center">
                    {/* The Dot on the Spine: exactly matches spinePosClass and translates -50%, -50% */}
                    <div
                      ref={(el) => {
                        dotRefs.current[idx] = el
                      }}
                      className={`timeline-dot absolute ${spinePosClass} -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 z-10`}
                      style={{
                        top: '50%',
                        width: isActive ? '12px' : '8px',
                        height: isActive ? '12px' : '8px',
                        backgroundColor: isActive ? theme.accent : '#262626',
                        boxShadow: isActive ? `0 0 14px 4px ${theme.glow}` : 'none',
                        border: isActive ? '2px solid #ffffff' : '1.5px solid #141414',
                      }}
                    />

                    {/* Role Title */}
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white font-[var(--font-display)] leading-snug">
                      {entry.role}
                    </h3>
                  </div>

                  {/* Card Body Details */}
                  <div className="pl-14 sm:pl-20 md:pl-28 lg:pl-32 max-w-xl">
                    {/* Organization */}
                    <p className="text-xs sm:text-sm font-medium text-neutral-400 tracking-wide mb-3">
                      {entry.organization}
                    </p>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
                      {entry.description}
                    </p>

                    {/* Bullet Highlights */}
                    {entry.highlights && entry.highlights.length > 0 && (
                      <ul className="space-y-2 mb-5">
                        {entry.highlights.map((item, hIdx) => (
                          <li
                            key={hIdx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-400 leading-normal"
                          >
                            <span
                              className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-300"
                              style={{
                                background: isActive ? theme.accent : '#525252',
                              }}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Tag Pill */}
                    <div>
                      <span
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest font-semibold transition-all duration-300"
                        style={{
                          color: theme.accent,
                          backgroundColor: theme.bg,
                          border: `1px solid ${theme.border}`,
                        }}
                      >
                        {entry.tag}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Embedded CSS Keyframes for Year Slide */}
      <style>{`
        @keyframes leadershipYearSlide {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.97);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  )
}
