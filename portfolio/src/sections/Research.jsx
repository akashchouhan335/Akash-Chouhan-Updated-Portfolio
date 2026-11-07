import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FileText, Users, Award, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const INVENTORS = [
  { name: "Akash Chouhan", role: "Lead Inventor" },
  { name: "Anurag Kumar Singh", role: "Co-Inventor" },
  { name: "Anshika Sahu", role: "Co-Inventor" },
  { name: "Ashirwad Singh", role: "Co-Inventor" },
  { name: "Prof. Harshita Jain", role: "Faculty / Co-Inventor" },
]

const KEY_SPECS = [
  { label: "Application No.", val: "202521100865 A", sub: "Indian Patent Office (IPO)" },
  { label: "Publication Date", val: "14 / 11 / 2025", sub: "Journal No. 46/2025" },
  { label: "Filing Status", val: "Published", sub: "26 Pages • 10 Claims" },
  { label: "Your Role", val: "Lead Inventor", sub: "Jai Narain College of Tech." },
]

export default function Research() {
  const comp = useRef(null)
  const [showFullAbstract, setShowFullAbstract] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.rs-reveal', {
        y: 25,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: comp.current,
          start: 'top 80%',
          once: true,
        },
      })
    }, comp)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={comp}
      id="research"
      className="py-14 md:py-20 px-6 bg-[#050505] text-white border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="rs-reveal mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono uppercase tracking-[0.2em] text-emerald-400 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Official Patent Publication • IPO India
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[var(--font-display)] tracking-tight leading-tight max-w-3xl">
            Wearable System for Adaptive Mental Health Support
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 font-light leading-relaxed max-w-2xl">
            Multi-modal biomedical architecture integrating real-time autonomic stress sensing, localized ERM vibrotactile feedback, rotary dial haptic breathing pacing, and deep-pressure pneumatic compression.
          </p>
        </div>

        {/* Specs Grid */}
        <div className="rs-reveal grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {KEY_SPECS.map((spec, idx) => (
            <div
              key={idx}
              className="p-3.5 sm:p-4 rounded-xl bg-[#0a0a0a] border border-white/5"
            >
              <p className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider">
                {spec.label}
              </p>
              <p className="text-sm sm:text-base font-mono font-semibold text-white mt-1">
                {spec.val}
              </p>
              <p className="text-[11px] text-neutral-400 mt-0.5">{spec.sub}</p>
            </div>
          ))}
        </div>

        {/* Compact Content: Abstract & Inventors */}
        <div className="rs-reveal grid md:grid-cols-12 gap-5">
          {/* Abstract Box */}
          <div className="md:col-span-7 p-5 sm:p-6 rounded-xl bg-[#0a0a0a] border border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase text-neutral-400 tracking-widest flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-neutral-500" />
                  Official Abstract
                </span>
                <button
                  type="button"
                  onClick={() => setShowFullAbstract(!showFullAbstract)}
                  className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {showFullAbstract ? 'Collapse' : 'Read Full'}
                  {showFullAbstract ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <p
                className={`text-xs sm:text-sm text-neutral-300 font-light leading-relaxed ${
                  !showFullAbstract ? 'line-clamp-4' : ''
                }`}
              >
                &ldquo;A wearable system for adaptive mental health support, comprises of a wearable jacket 101 developed to be worn by a user over torso portion, a sensor suite 102 configured to monitor physiological and behavioral indicators of stress and anxiety in real-time, a plurality of grooves 103 housing eccentric rotating mass (ERM) vibration motors 104 for delivering targeted vibrational stimuli, a processing module operatively connected to sensor suite 102 and ERM vibration motors 104 to deliver personalized calming vibration patterns, a wearable wristband 105 integrating a sensing module 106 to detect physiological and emotional indicators of stress, a rotary feedback dial unit 111 to facilitate paced breathing exercises via haptic feedback, an air compression unit 107 to provide rhythmic compression over user&apos;s body, and a pair of wearable gloves 108 equipped with linear actuators 109 and hinge joints 110 along finger portion to provide rhythmic compressive stimuli.&rdquo;
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-500">
              <span>Jurisdiction: Republic of India</span>
              <span>Ref: 202521100865</span>
            </div>
          </div>

          {/* Inventors Box */}
          <div className="md:col-span-5 p-5 sm:p-6 rounded-xl bg-[#0a0a0a] border border-white/5">
            <h3 className="text-xs font-mono uppercase text-neutral-400 tracking-widest mb-3 flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-neutral-500" />
              Named Inventors
            </h3>
            <div className="divide-y divide-white/5">
              {INVENTORS.map((inv, idx) => (
                <div
                  key={idx}
                  className="py-2 first:pt-0 last:pb-0 flex items-center justify-between"
                >
                  <span
                    className={`text-xs sm:text-sm ${
                      idx === 0
                        ? 'text-white font-semibold flex items-center gap-1.5'
                        : 'text-neutral-300'
                    }`}
                  >
                    {inv.name}
                    {idx === 0 && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20 font-mono">
                        Lead
                      </span>
                    )}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">
                    {inv.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
