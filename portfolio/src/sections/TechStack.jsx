import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skillGroups } from '@/data/skills'

gsap.registerPlugin(ScrollTrigger)

const allSkills = skillGroups.flatMap(g => g.skills)
// Duplicate to ensure smooth infinite scroll
const marqueeItems = [...allSkills, ...allSkills, ...allSkills]

export default function TechStack() {
  const container = useRef()
  const marqueeInner = useRef()
  const marqueeInner2 = useRef()

  useGSAP(() => {
    // Reveal
    gsap.from(container.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%'
      }
    })
    
    // Infinite Marquee 1 (Right to Left)
    gsap.to(marqueeInner.current, {
      xPercent: -33.33,
      ease: "none",
      duration: 25,
      repeat: -1,
    })
    
    // Infinite Marquee 2 (Left to Right)
    gsap.to(marqueeInner2.current, {
      xPercent: 0, // Move to 0
      ease: "none",
      duration: 25, // Match speed of row 1
      repeat: -1,
    })
    
    // Set initial position for row 2
    gsap.set(marqueeInner2.current, {
      xPercent: -33.33
    })
  }, { scope: container })

  return (
    <section ref={container} id="skills" className="pt-12 pb-24 bg-[var(--color-bg)] overflow-hidden border-y border-[#111]">
      <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col items-center text-center">
        <h2 className="text-xs uppercase tracking-[0.3em] font-mono text-[var(--color-muted)] mb-4">Technology Arsenal</h2>
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-muted)] to-transparent"></div>
      </div>
      
      <div className="flex flex-col gap-6 md:gap-10">
        <div className="relative w-full overflow-hidden flex whitespace-nowrap mask-edges">
          <div ref={marqueeInner} className="flex gap-8 md:gap-16 items-center px-4 w-max">
            {marqueeItems.map((skill, i) => (
              <div 
                key={`row1-${i}`} 
                className={`text-4xl sm:text-5xl md:text-7xl font-bold font-[var(--font-display)] uppercase tracking-tighter transition-all duration-300 hover:scale-[1.03] cursor-default ${
                  i % 2 === 0 
                    ? 'text-stroke' 
                    : 'text-white opacity-80 hover:opacity-100 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                }`}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-full overflow-hidden flex whitespace-nowrap mask-edges">
          <div ref={marqueeInner2} className="flex gap-8 md:gap-16 items-center px-4 w-max">
            {marqueeItems.map((skill, i) => (
              <div 
                key={`row2-${i}`} 
                className={`text-4xl sm:text-5xl md:text-7xl font-bold font-[var(--font-display)] uppercase tracking-tighter transition-all duration-300 hover:scale-[1.03] cursor-default ${
                  i % 2 !== 0 
                    ? 'text-stroke' 
                    : 'text-white opacity-80 hover:opacity-100 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                }`}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .mask-edges {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}} />
    </section>
  )
}
