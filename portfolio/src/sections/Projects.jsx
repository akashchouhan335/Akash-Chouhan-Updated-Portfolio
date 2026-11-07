import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { GithubIcon } from '@/components/SocialIcons'
import { projects } from '@/data/projects'
import { Badge } from '@/components/Badge'
import StarButton from '@/components/ui/star-button'
import TactileButton from '@/components/ui/tactile-button'
import { scrollTo } from '@/lib/smooth-scroll'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const activeProjectRef = useRef(0)
  const [activeProject, setActiveProject] = useState(0)

  useGSAP(() => {
    const section = sectionRef.current
    const container = containerRef.current
    if (!section || !container) return

    const getScrollDistance = () => container.scrollWidth - window.innerWidth

    const tween = gsap.to(container, {
      x: () => -getScrollDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.1, // Follows Lenis's smooth momentum in real-time with zero lag
        start: 'top top',
        end: () => '+=' + getScrollDistance(),
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.min(
            projects.length - 1,
            Math.max(0, Math.round(self.progress * (projects.length - 1)))
          )
          if (idx !== activeProjectRef.current) {
            activeProjectRef.current = idx
            setActiveProject(idx)
          }
        },
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, { scope: sectionRef })

  // Smoothly glide to any project
  const goToProject = (index) => {
    const section = sectionRef.current
    const container = containerRef.current
    if (!section || !container) return

    const trigger = ScrollTrigger.getAll().find((st) => st.trigger === section)
    if (trigger) {
      const scrollDistance = container.scrollWidth - window.innerWidth
      const targetScroll = trigger.start + (index / (projects.length - 1)) * scrollDistance
      scrollTo(targetScroll)
    }
  }

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative h-screen bg-[var(--color-bg)] overflow-hidden flex flex-col justify-between"
    >
      {/* Top Header & Project Indicators */}
      <div className="w-full max-w-7xl mx-auto px-6 pt-16 md:pt-20 z-20 shrink-0 flex items-center justify-between">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500 mb-1">
            Portfolio Showcase
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[var(--font-display)] tracking-tighter uppercase text-white">
            Selected Works
          </h2>
        </div>

        {/* Interactive Indicator Pills */}
        <div className="flex items-center gap-2 font-mono text-xs">
          {projects.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => goToProject(idx)}
              aria-label={`Go to project ${idx + 1}: ${proj.title}`}
              className={`px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeProject === idx
                  ? 'bg-white text-black font-semibold shadow-lg shadow-white/10 scale-105'
                  : 'bg-white/5 text-neutral-400 hover:bg-white/15 hover:text-white'
              }`}
            >
              0{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Scrolling Track */}
      <div ref={containerRef} className="flex-1 flex w-max items-center">
        {projects.map((project, i) => (
          <div
            key={project.id}
            className="project-panel w-screen h-full shrink-0 flex items-center justify-center px-6 overflow-hidden"
          >
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-4">
              
              {/* Project Info */}
              <div className="order-2 lg:order-1 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wider">
                    0{i + 1} / 0{projects.length}
                  </span>
                  <div className="h-px w-8 bg-neutral-800" />
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[var(--font-display)] mb-2 text-white">
                  {project.title}
                </h3>
                <p className="text-base sm:text-lg text-neutral-400 mb-4 max-w-lg font-light">
                  {project.subtitle}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                  {project.technologies.length > 5 && (
                    <Badge>+{project.technologies.length - 5}</Badge>
                  )}
                </div>

                <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-6 max-w-lg font-light line-clamp-4">
                  {project.summary}
                </p>

                <div className="flex items-center gap-4 flex-wrap">
                  {project.github && (
                    <StarButton
                      onClick={() => window.open(project.github, '_blank', 'noreferrer')}
                      className="font-mono uppercase tracking-widest text-xs"
                    >
                      <GithubIcon size={16} /> Source Code
                    </StarButton>
                  )}
                  {project.liveDemo && (
                    <div className="w-[230px] h-[75px] -ml-2 -mt-2 pointer-events-auto">
                      <TactileButton href={project.liveDemo} className="w-full h-full" />
                    </div>
                  )}
                </div>
              </div>

              {/* Project Visual Image */}
              <div className="order-1 lg:order-2 w-full aspect-video relative bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden group shadow-2xl">
                <img
                  src={
                    project.image ||
                    [
                      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
                      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1200',
                      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200',
                    ][i % 3]
                  }
                  alt={project.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 mix-blend-screen grayscale group-hover:grayscale-0"
                />
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Subtle bottom cue */}
      <div className="w-full max-w-7xl mx-auto px-6 pb-6 z-20 flex items-center justify-between text-xs font-mono text-neutral-600">
        <span>Scroll down to continue</span>
        <span>{activeProject + 1} of {projects.length}</span>
      </div>
    </section>
  )
}
