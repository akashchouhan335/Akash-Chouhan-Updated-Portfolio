import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ExternalLink } from 'lucide-react'
import { GithubIcon } from '@/components/SocialIcons'
import { projects } from '@/data/projects'
import { Badge } from '@/components/Badge'
import StarButton from '@/components/ui/star-button'
import TactileButton from '@/components/ui/tactile-button'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const sectionRef = useRef(null)
  const containerRef = useRef(null)

  useGSAP(() => {
    let panels = gsap.utils.toArray('.project-panel')
    
    gsap.to(containerRef.current, {
      x: () => -(containerRef.current.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1.5,
        snap: {
          snapTo: 1 / (panels.length - 1),
          duration: { min: 0.3, max: 0.8 },
          delay: 0.1,
          ease: 'power3.inOut'
        },
        end: () => '+=' + (containerRef.current.scrollWidth * 1.5),
        invalidateOnRefresh: true,
      }
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="projects" className="relative h-screen bg-[var(--color-bg)] overflow-hidden flex flex-col">
      {/* Static Header */}
      <div className="w-full max-w-7xl mx-auto px-6 pt-20 md:pt-24 z-10 pointer-events-none shrink-0">
        <h2 className="text-3xl md:text-5xl font-bold font-[var(--font-display)] tracking-tighter uppercase text-white">
          Selected Works
        </h2>
      </div>

      {/* Scrolling Content */}
      <div ref={containerRef} className="flex-1 flex w-max">
        {projects.map((project, i) => (
          <div 
            key={project.id} 
            className="project-panel w-screen h-full shrink-0 flex flex-col justify-start pt-4 md:pt-8 pb-8 overflow-y-auto"
          >
            <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
              {/* Project Info */}
              <div className="order-2 lg:order-1">
                <p className="text-sm font-mono text-gray-500 mb-2 md:mb-3">0{i + 1} / 0{projects.length}</p>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[var(--font-display)] mb-2">
                  {project.title}
                </h3>
                <p className="text-base md:text-lg text-gray-400 mb-3 max-w-lg">
                  {project.subtitle}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.technologies.slice(0, 5).map(tech => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                  {project.technologies.length > 5 && (
                    <Badge>+{project.technologies.length - 5}</Badge>
                  )}
                </div>
                
                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 max-w-lg">
                  {project.summary}
                </p>

                <div className="flex items-center gap-4">
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
              <div className="order-1 lg:order-2 w-full aspect-video relative bg-[#0a0a0a] border border-[#1f1f1f] flex items-center justify-center overflow-hidden group mt-2 md:mt-0 rounded-lg">
                <img 
                  src={project.image || [
                    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
                    "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1200",
                    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200"
                  ][i % 3]} 
                  alt={project.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 mix-blend-screen grayscale group-hover:grayscale-0"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
