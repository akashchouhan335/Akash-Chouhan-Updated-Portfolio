import { useState, useEffect } from 'react'
import { Menu, X, Mail, FileText } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/SocialIcons'
import { ShinyButton } from '@/components/ui/shiny-button'
import { RandomLetterSwap } from "@/components/ui/random-letter-swap"

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    // Show navbar after scrolling down 100px
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled 
          ? 'translate-y-0 opacity-100 bg-black/80 backdrop-blur-lg border-b border-white/5 py-4' 
          : '-translate-y-full opacity-0 pointer-events-none py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="text-xl font-bold font-[var(--font-display)] tracking-tighter uppercase">
          AC.
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center text-sm font-mono tracking-widest uppercase">
          {NAV_LINKS.map(link => (
            <a key={link.href} href={link.href} className="text-gray-400 hover:text-white transition-colors">
              <RandomLetterSwap
                className="cursor-pointer font-medium text-[var(--color-muted)] text-sm hover:text-[var(--color-accent)]"
                label={link.label}
                staggerDuration={0.025}
                transition={{ duration: 0.6, type: "spring" }}
              />
            </a>
          ))}
        </nav>

        {/* Desktop Socials */}
        <div className="hidden md:flex gap-5 items-center">
          <a href="https://github.com/akashchouhan335" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <GithubIcon size={18} />
          </a>
          <a href="https://www.linkedin.com/in/akashchouhan335/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <LinkedinIcon size={18} />
          </a>
          <ShinyButton asChild>
            <a href="/Akash Chouhan Resume.pdf" download className="text-[11px] font-mono tracking-widest">
              <span>RESUME <FileText size={14} /></span>
            </a>
          </ShinyButton>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-black border-b border-white/10 p-6 flex flex-col gap-6 md:hidden">
          {NAV_LINKS.map(link => (
            <a 
              key={link.href} 
              href={link.href} 
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-[var(--font-display)] font-bold uppercase tracking-tighter"
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-6 mt-4">
            <a href="https://github.com/akashchouhan335" className="text-gray-400 hover:text-white"><GithubIcon size={24} /></a>
            <a href="https://www.linkedin.com/in/akashchouhan335/" className="text-gray-400 hover:text-white"><LinkedinIcon size={24} /></a>
          </div>
        </div>
      )}
    </header>
  )
}
