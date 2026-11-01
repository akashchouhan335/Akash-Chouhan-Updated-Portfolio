import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { X } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const CERTIFICATES = [
  { id: 'ecell',   title: 'E-Cell Event Head',           issuer: 'Entrepreneurship Cell',        description: 'Official certification as Event Head for national-level tech and entrepreneurial fests.' },
  { id: 'nss',     title: 'NSS Co-Head',                  issuer: 'National Service Scheme',      description: 'Official recognition as Co-Head of the NSS Unit, leading 100+ volunteers.' },
  { id: 'patent',  title: 'Patent Published',             issuer: 'Research Publication',         description: 'Published patent for Wearable System for Adaptive Mental Health Support.' },
  { id: 'java',    title: 'Minor Project — Java',         issuer: 'Academic Certification',       description: 'Completed minor project certification in Java software development.' },
]

export default function Certificates() {
  const comp = useRef()
  const [active, setActive] = useState(null)
  useGSAP(() => {
    gsap.from('.cert-item', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: comp.current,
        start: 'top 85%'
      }
    })
  }, { scope: comp })

  return (
    <section ref={comp} id="certificates" className="py-16 md:py-24 px-6 bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xs uppercase tracking-[0.2em] font-mono text-gray-500 mb-16">Verified Credentials</h2>
        
        <div className="border-t border-[#1a1a1a]">
          {CERTIFICATES.map((cert) => (
            <div key={cert.id} className="cert-item group border-b border-[#1a1a1a]">
              <button 
                onClick={() => setActive(active === cert.id ? null : cert.id)}
                className="w-full text-left py-8 flex flex-col md:flex-row md:items-center justify-between hover:px-4 transition-all duration-300"
              >
                <div className="flex-1">
                  <h3 className="text-2xl md:text-4xl font-[var(--font-display)] font-bold group-hover:text-white text-gray-300 transition-colors">
                    {cert.title}
                  </h3>
                </div>
                <div className="mt-4 md:mt-0 flex items-center justify-between md:w-1/3">
                  <span className="text-sm font-mono text-gray-500">{cert.issuer}</span>
                  <span className="text-xl text-gray-600 group-hover:text-white transition-colors">
                    {active === cert.id ? '−' : '+'}
                  </span>
                </div>
              </button>
              
              {/* Accordion Content */}
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  active === cert.id ? 'max-h-40 opacity-100 pb-8 px-4' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-gray-400 font-light max-w-2xl">{cert.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
