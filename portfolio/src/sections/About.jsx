import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const CAPABILITIES = [
  "Building robust backend architectures.",
  "Developing intuitive, high-performance frontends.",
  "Solving complex algorithmic challenges.",
  "Integrating AI solutions into real-world products."
]

const SplitText = ({ text, className = '', hoverColorClass = 'hover:text-white' }) => {
  return (
    <span className="whitespace-nowrap">
      {text.split(' ').map((word, wordIndex, wordsArray) => (
        <span key={wordIndex}>
          <span className="inline-block">
            {word.split('').map((char, i) => (
              <span 
                key={i} 
                className={`inline-block transition-all duration-1000 ease-out hover:duration-[50ms] hover:-skew-x-12 ${hoverColorClass} cursor-default origin-bottom ${className}`}
              >
                {char}
              </span>
            ))}
          </span>
          {wordIndex !== wordsArray.length - 1 && (
            <span 
              className={`inline-block transition-all duration-1000 ease-out hover:duration-[50ms] hover:-skew-x-12 ${hoverColorClass} cursor-default origin-bottom ${className}`}
              style={{ width: '0.3em' }}
            >
              &nbsp;
            </span>
          )}
        </span>
      ))}
    </span>
  )
}

export default function About() {
  const comp = useRef()

  useGSAP(() => {
    gsap.from('.about-reveal', {
      y: 40,
      opacity: 0,
      duration: 1.0,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: comp.current,
        start: 'top 75%',
        once: true,
      }
    })

    // Subtle editorial parallax offset between columns (House of Honey feel)
    gsap.to('.about-parallax-col', {
      y: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: comp.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    })
  }, { scope: comp })

  return (
    <section ref={comp} id="about" className="pt-32 pb-16 px-6 bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 md:gap-32 items-center">
        
        {/* Left: Massive Typography */}
        <div className="about-reveal">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold font-[var(--font-display)] tracking-tighter leading-tight flex flex-wrap">
            <div className="w-full">
              <SplitText text="I engineer" hoverColorClass="hover:text-gray-600" />
            </div>
            <div className="w-full text-gray-600">
              <SplitText text="scalable systems" hoverColorClass="hover:text-white" />
            </div>
            <div className="w-full">
              <SplitText text="for modern web." hoverColorClass="hover:text-gray-600" />
            </div>
          </h2>
        </div>

        {/* Right: Editorial List with Parallax Depth */}
        <div className="about-parallax-col space-y-12">
          <div className="about-reveal">
            <p className="text-xl text-gray-300 font-light leading-relaxed mb-8">
              B.Tech student heavily focused on Java, Data Structures, Algorithms, and Full-Stack development. I thrive in building efficient products that solve real problems.
            </p>
          </div>
          
          <div className="about-reveal border-t border-[#1f1f1f] pt-8">
            <h3 className="text-xs uppercase tracking-[0.2em] font-mono text-gray-500 mb-6">Core Capabilities</h3>
            <ul className="space-y-4">
              {CAPABILITIES.map((cap, i) => (
                <li key={i} className="flex gap-4 text-lg text-gray-300 items-start">
                  <span className="font-mono text-gray-600 text-sm mt-1">0{i+1}</span>
                  {cap}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  )
}
