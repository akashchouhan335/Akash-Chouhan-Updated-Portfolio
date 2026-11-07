import Navbar from '@/components/Navbar'
import Hero from '@/sections/Hero'
import About from '@/sections/About'
import TechStack from '@/sections/TechStack'
import Projects from '@/sections/Projects'
import Leadership from '@/sections/Leadership'
import Research from '@/sections/Research'
import Certificates from '@/sections/Certificates'
import Contact from '@/sections/Contact'
import { EyeTracking } from '@/components/ui/eye-tracking'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'

export default function App() {
  return (
    <SmoothScrollProvider>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--color-accent)] focus:text-[var(--color-bg)] focus:rounded-[var(--radius-md)] focus:font-semibold"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Leadership />
        <Research />
        <Certificates />
        <Contact />
      </main>

      <div className="fixed bottom-4 right-4 z-50 pointer-events-none drop-shadow-lg hidden md:block">
        <EyeTracking 
          eyeSize={48} 
          gap={12} 
          variant="minimal"
          scleraColor="#f5f5f5"         /* --color-text */
          irisColor="#888888"           /* --color-muted */
          irisColorSecondary="#1f1f1f"  /* --color-border */
          pupilColor="#030303"          /* --color-bg */
        />
      </div>
    </SmoothScrollProvider>
  )
}
