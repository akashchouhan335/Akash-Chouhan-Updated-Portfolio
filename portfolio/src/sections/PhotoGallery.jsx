import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SqueezeCarousel from '@/components/ui/carousel-squeeze'

gsap.registerPlugin(ScrollTrigger)

const mark = (text) => (
  <span className="text-sm font-[var(--font-display)] font-medium tracking-tight text-white">
    {text}
  </span>
)

const SLIDES = [
  // ─── E-Cell ───
  {
    id: 'ecell-1',
    title: 'E-Cell — Event Head.',
    description: 'Leading national-level tech and entrepreneurial fests as Event Head for the Entrepreneurship Cell.',
    image: '/Ecell/h1.webp',
    imageAlt: 'E-Cell event highlight',
    overlay: mark('E-Cell'),
  },
  {
    id: 'ecell-2',
    title: 'E-Cell — Behind the Scenes.',
    description: 'Coordinating teams and logistics for large-scale entrepreneurship events.',
    image: '/Ecell/1.webp',
    imageAlt: 'E-Cell event coordination',
    overlay: mark('E-Cell'),
  },
  {
    id: 'ecell-3',
    title: 'E-Cell — Event Day.',
    description: 'The energy of hundreds of participants converging for a shared mission.',
    image: '/Ecell/2.webp',
    imageAlt: 'E-Cell event day',
    overlay: mark('E-Cell'),
  },
  {
    id: 'ecell-4',
    title: 'E-Cell — Poster & Branding.',
    description: 'Every detail of the visual identity, designed to inspire.',
    image: '/Ecell/poster.webp',
    imageAlt: 'E-Cell event poster',
    overlay: mark('E-Cell'),
  },
  {
    id: 'ecell-5',
    title: 'E-Cell — On Stage.',
    description: 'Moments captured during keynotes and panel discussions.',
    image: '/Ecell/5.webp',
    imageAlt: 'E-Cell stage moment',
    overlay: mark('E-Cell'),
  },
  {
    id: 'ecell-6',
    title: 'E-Cell — The Community.',
    description: 'Building a network of aspiring entrepreneurs and innovators.',
    image: '/Ecell/6.webp',
    imageAlt: 'E-Cell community gathering',
    overlay: mark('E-Cell'),
  },

  // ─── NSS Camp ───
  {
    id: 'nss-camp-1',
    title: 'NSS Camp — Day One.',
    description: 'Seven-day residential camp in rural India, serving the community hands-on.',
    image: '/NSS/Camp/1.webp',
    imageAlt: 'NSS Camp day one',
    overlay: mark('NSS Camp'),
  },
  {
    id: 'nss-camp-2',
    title: 'NSS Camp — Volunteering.',
    description: 'Working alongside 100+ volunteers to create real impact.',
    image: '/NSS/Camp/2.webp',
    imageAlt: 'NSS Camp volunteers',
    overlay: mark('NSS Camp'),
  },
  {
    id: 'nss-camp-3',
    title: 'NSS Camp — Fieldwork.',
    description: 'Hands in the dirt — building, painting, and restoring community spaces.',
    image: '/NSS/Camp/3.webp',
    imageAlt: 'NSS Camp fieldwork',
    overlay: mark('NSS Camp'),
  },
  {
    id: 'nss-camp-4',
    title: 'NSS Camp — Cultural Night.',
    description: 'Celebrating the local culture with music, dance, and shared meals.',
    image: '/NSS/Camp/4.webp',
    imageAlt: 'NSS Camp cultural event',
    overlay: mark('NSS Camp'),
  },
  {
    id: 'nss-camp-5',
    title: 'NSS Camp — Team Spirit.',
    description: 'The bonds forged through shared service last a lifetime.',
    image: '/NSS/Camp/5.webp',
    imageAlt: 'NSS Camp team',
    overlay: mark('NSS Camp'),
  },
  {
    id: 'nss-camp-6',
    title: 'NSS Camp — Community Outreach.',
    description: 'Engaging with local families and understanding their needs.',
    image: '/NSS/Camp/6.webp',
    imageAlt: 'NSS Camp outreach',
    overlay: mark('NSS Camp'),
  },
  {
    id: 'nss-camp-7',
    title: 'NSS Camp — Workshop.',
    description: 'Teaching and learning from the community — a two-way exchange.',
    image: '/NSS/Camp/7.webp',
    imageAlt: 'NSS Camp workshop',
    overlay: mark('NSS Camp'),
  },
  {
    id: 'nss-camp-8',
    title: 'NSS Camp — Group Activity.',
    description: 'Team-building exercises that strengthen purpose and camaraderie.',
    image: '/NSS/Camp/8.webp',
    imageAlt: 'NSS Camp group activity',
    overlay: mark('NSS Camp'),
  },
  {
    id: 'nss-camp-9',
    title: 'NSS Camp — Morning Assembly.',
    description: 'Every camp day starts with alignment, gratitude, and a plan.',
    image: '/NSS/Camp/9.webp',
    imageAlt: 'NSS Camp morning assembly',
    overlay: mark('NSS Camp'),
  },
  {
    id: 'nss-camp-10',
    title: 'NSS Camp — Closing Ceremony.',
    description: 'Wrapping up with recognition, reflection, and renewed commitment.',
    image: '/NSS/Camp/10.webp',
    imageAlt: 'NSS Camp closing ceremony',
    overlay: mark('NSS Camp'),
  },

  // ─── NSS Orientation 2026 ───
  {
    id: 'nss-orient-1',
    title: 'NSS Orientation 2026 — Welcome.',
    description: 'Introducing the next batch of NSS volunteers to the mission.',
    image: '/NSS/Orientation 2026/1.webp',
    imageAlt: 'NSS Orientation welcome',
    overlay: mark('NSS Orientation'),
  },
  {
    id: 'nss-orient-2',
    title: 'NSS Orientation — Kickoff.',
    description: 'Setting the tone for a year of service, leadership, and growth.',
    image: '/NSS/Orientation 2026/2.webp',
    imageAlt: 'NSS Orientation kickoff',
    overlay: mark('NSS Orientation'),
  },
  {
    id: 'nss-orient-3',
    title: 'NSS Orientation — Briefing.',
    description: 'Sharing the roadmap, values, and expectations for the year ahead.',
    image: '/NSS/Orientation 2026/3.webp',
    imageAlt: 'NSS Orientation briefing',
    overlay: mark('NSS Orientation'),
  },
  {
    id: 'nss-orient-4',
    title: 'NSS Orientation — The Team.',
    description: 'A first look at the people who will drive change together.',
    image: '/NSS/Orientation 2026/4.webp',
    imageAlt: 'NSS Orientation team photo',
    overlay: mark('NSS Orientation'),
  },

  // ─── NSS B Certificate ───
  {
    id: 'nss-bcert',
    title: 'NSS B Certificate — Recognition.',
    description: 'Official NSS B Certificate recognising sustained service and leadership.',
    image: '/NSS/NSS B Certificate/Bcertificate.webp',
    imageAlt: 'NSS B Certificate',
    overlay: mark('NSS Certificate'),
  },
]

export default function PhotoGallery() {
  const comp = useRef()

  useGSAP(() => {
    gsap.from('.photo-gallery-inner', {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: comp.current,
        start: 'top 85%',
        once: true,
      },
    })
  }, { scope: comp })

  return (
    <section ref={comp} id="gallery" className="py-16 md:py-24 px-6 bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xs uppercase tracking-[0.2em] font-mono text-gray-500 mb-16">
          Photo Gallery
        </h2>

        <div className="photo-gallery-inner">
          <SqueezeCarousel
            slides={SLIDES}
            label="Photo Gallery"
            height="clamp(220px, 36cqi, 400px)"
            gap={16}
            slatGap={8}
            slatWidth={8}
            radius={8}
            duration={1000}
            hoverGrow
            autoplay
            interval={4000}
            controls
            accent="var(--color-accent)"
            accentForeground="var(--color-bg)"
          />
        </div>
      </div>
    </section>
  )
}
