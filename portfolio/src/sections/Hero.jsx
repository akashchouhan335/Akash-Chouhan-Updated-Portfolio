import React, { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowDown } from 'lucide-react'
import ProfileCard from '@/components/ProfileCard'
import Beams from '@/components/Beams'

export default function Hero() {
  const heroRef = useRef(null)
  const [isFlipped, setIsFlipped] = useState(false)

  const isMounted = useRef(false)

  useGSAP(() => {
    // Background Infinite Marquee
    gsap.to('.marquee-part', {
      xPercent: -100,
      repeat: -1,
      duration: 15,
      ease: 'none'
    })

    // Card Entrance Animation (animating the wrapper so it doesn't fight the inner flip)
    gsap.from('.flip-card-container', {
      y: 150,
      opacity: 0,
      rotationX: 25,
      duration: 1.5,
      ease: 'power4.out',
      delay: 0.2
    })

    // Scroll Indicator Fade In
    gsap.from('.scroll-indicator', {
      opacity: 0,
      duration: 1.5,
      delay: 1.2
    })
  }, { scope: heroRef })

  // Flip Animation triggered by click
  useGSAP(() => {
    if (!isMounted.current) {
      isMounted.current = true
      return
    }

    if (isFlipped) {
      gsap.to('.card-inner', { rotateY: 180, duration: 0.8, ease: 'power3.inOut' })
    } else {
      gsap.to('.card-inner', { rotateY: 0, duration: 0.8, ease: 'power3.inOut' })
    }
  }, { dependencies: [isFlipped], scope: heroRef })

  return (
    <section ref={heroRef} id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">

      {/* Beams Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor="#ffffff"
          beamColor="#0a0a0a"
          backgroundColor="#030303"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={0}
        />
      </div>

      {/* Background Marquee */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center pointer-events-none select-none overflow-hidden">
        <div className="flex whitespace-nowrap transform -rotate-2">
          <div className="marquee-part flex shrink-0 whitespace-nowrap text-[12rem] md:text-[20rem] font-[var(--font-display)] font-bold uppercase tracking-tighter leading-none text-[#2a2a2a]">
            <span className="px-8 flex shrink-0 pointer-events-auto">
              {"AKASH CHOUHAN".split('').map((char, index) => (
                <span key={index} className="hover:text-[var(--color-accent)] transition-colors duration-300 cursor-default">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
            <span className="px-8 flex shrink-0 pointer-events-auto">
              {"AKASH CHOUHAN".split('').map((char, index) => (
                <span key={index} className="hover:text-[var(--color-accent)] transition-colors duration-300 cursor-default">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
          </div>
          <div className="marquee-part flex shrink-0 whitespace-nowrap text-[12rem] md:text-[20rem] font-[var(--font-display)] font-bold uppercase tracking-tighter leading-none text-[#2a2a2a]">
            <span className="px-8 flex shrink-0 pointer-events-auto">
              {"AKASH CHOUHAN".split('').map((char, index) => (
                <span key={index} className="hover:text-[var(--color-accent)] transition-colors duration-300 cursor-default">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
            <span className="px-8 flex shrink-0 pointer-events-auto">
              {"AKASH CHOUHAN".split('').map((char, index) => (
                <span key={index} className="hover:text-[var(--color-accent)] transition-colors duration-300 cursor-default">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>

      {/* The 3D Flip Container wrapping the Exact ProfileCard */}
      <div 
        className="flip-card-container relative z-30 cursor-pointer"
        style={{ perspective: '1500px' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className="card-inner w-[300px] h-[478px] md:w-[360px] md:h-[573px] relative"
          style={{ transformStyle: 'preserve-3d' }}
        >

          {/* FRONT SIDE (The exact React Bits component) */}
          <div
            className="absolute inset-0 w-full h-full rounded-[30px]"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            {/* 
              This is the EXACT component code you provided. 
              We're just passing your details into it.
            */}
            <ProfileCard
              name="Akash Chouhan"
              title="Software Engineer"
              handle="akashchouhan"
              status="Online"
              contactText="Click to Flip"
              avatarUrl="/Akash Phot.png"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => setIsFlipped(true)}
              behindGlowColor="rgba(255, 255, 255, 0.15)"
              behindGlowEnabled={true}
              innerGradient="linear-gradient(145deg, #1a1a1a 0%, #030303 100%)"
            />
          </div>

          {/* BACK SIDE (Details page) */}
          <div
            className="absolute inset-0 w-full h-full rounded-[30px] overflow-hidden border border-white/10 bg-[#0a0a0a] flex flex-col items-center justify-center p-8 shadow-2xl backdrop-blur-xl"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >

            <h3 className="text-3xl font-bold font-[var(--font-display)] mb-1 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#71C4FF] tracking-tighter text-center">
              Akash Chouhan
            </h3>
            <p className="text-gray-400 font-mono text-xs mb-8 uppercase tracking-widest text-center">
              Software Engineer
            </p>

            <div className="w-full flex-1 space-y-4 text-sm font-mono text-gray-400">
              <div className="flex justify-between items-center group/item hover:text-white transition-colors">
                <span className="uppercase text-xs tracking-widest">College</span>
                <span className="text-right text-white/80">B.Tech 6th Sem</span>
              </div>
              <div className="flex justify-between items-center group/item hover:text-white transition-colors">
                <span className="uppercase text-xs tracking-widest">Focus</span>
                <span className="text-right text-white/80">Full Stack & AI</span>
              </div>
              <div className="flex justify-between items-center group/item hover:text-white transition-colors">
                <span className="uppercase text-xs tracking-widest">Leadership</span>
                <span className="text-right text-white/80">NSS & E-Cell Head</span>
              </div>
            </div>

          </div>

        </div>

        {/* Scroll Indicator - positioned directly AFTER the card without altering card's center */}
        <a
          href="#about"
          onClick={(e) => e.stopPropagation()}
          className="scroll-indicator absolute top-[calc(100%+1.25rem)] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white pointer-events-auto cursor-pointer group whitespace-nowrap"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-mono opacity-40 group-hover:opacity-90 transition-opacity">
            Scroll to Explore
          </span>
          <ArrowDown size={14} className="opacity-40 group-hover:opacity-90 animate-bounce transition-opacity" />
        </a>
      </div>
    </section>
  )
}
