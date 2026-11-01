import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline'
import { impactTimelineData } from '@/data/impact'

export default function Leadership() {
  return (
    <section id="leadership" className="relative bg-[var(--color-bg)] py-16 md:py-24 flex flex-col">
      {/* Section header */}
      <div className="w-full z-20 px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold font-[var(--font-display)] tracking-tighter uppercase text-stroke cursor-default">
            Impact &amp; Recognition
          </h2>
          <p className="text-xs uppercase tracking-[0.2em] font-mono text-gray-500 mt-4">
            Hover a node to explore
          </p>
        </div>
      </div>

      {/* Orbital timeline */}
      <div className="flex-1 w-full relative">
        <RadialOrbitalTimeline timelineData={impactTimelineData} />
      </div>
    </section>
  )
}
