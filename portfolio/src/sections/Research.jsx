import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  "Biometric stress markers (HRV, GSR)",
  "Personalized non-invasive haptic feedback",
  "Synchronized breathing guidance",
  "Adaptive AI intervention algorithms"
]

export default function Research() {
  const comp = useRef()

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.rs-reveal', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: comp.current,
          start: 'top 80%'
        }
      })
    }, comp)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={comp} id="research" className="py-16 md:py-24 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Massive Typographic Number or Graphic */}
          <div className="lg:col-span-4 rs-reveal">
            <div className="text-[12rem] font-bold font-[var(--font-display)] leading-none text-stroke opacity-30 select-none">
              R&D
            </div>
          </div>

          <div className="lg:col-span-8 rs-reveal">
            <h3 className="text-xs uppercase tracking-[0.2em] font-mono text-gray-500 mb-6">Published Patent</h3>
            <h2 className="text-4xl md:text-5xl font-bold font-[var(--font-display)] mb-8 leading-tight">
              Wearable System for Adaptive Mental Health Support
            </h2>
            
            <p className="text-xl text-gray-300 font-light leading-relaxed mb-10 max-w-3xl">
              A bio-medical engineering contribution exploring intelligent wearable technology. Designed to provide adaptive support through real-time stress detection and intelligent haptic feedback.
            </p>

            <div className="grid sm:grid-cols-2 gap-8 border-t border-[#1a1a1a] pt-10">
              <div>
                <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Core Architecture</p>
                <ul className="space-y-3">
                  {FEATURES.map(f => (
                    <li key={f} className="text-sm text-gray-400 font-light flex items-center gap-3">
                      <div className="w-1 h-1 bg-white rounded-full opacity-50" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Context</p>
                <p className="text-sm text-gray-500 font-mono leading-relaxed">
                  Type: Biomedical Engineering<br/>
                  Domain: Mental Health Tech<br/>
                  Status: Published<br/><br/>
                  <span className="italic opacity-50">* Engineering research contribution. No medical effectiveness claims are made.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
