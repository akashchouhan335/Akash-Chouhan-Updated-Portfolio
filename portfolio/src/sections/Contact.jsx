import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GithubIcon, LinkedinIcon } from '@/components/SocialIcons'
import { Mail, Send } from 'lucide-react'

import { GradientButton } from '@/components/ui/gradient-button'

gsap.registerPlugin(ScrollTrigger)

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default function Contact() {
  const comp = useRef()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle, loading, success, error

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.contact-reveal', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: comp.current,
          start: 'top 75%'
        }
      })
    }, comp)
    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...form })
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClasses = "w-full bg-transparent border-b border-[#333] py-4 text-white focus:outline-none focus:border-white transition-colors placeholder:text-gray-600 font-light text-lg"

  return (
    <section ref={comp} id="contact" className="py-16 md:py-24 px-6 bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24">
        
        {/* Left: Info */}
        <div>
          <h2 className="contact-reveal text-6xl md:text-8xl font-bold font-[var(--font-display)] tracking-tighter uppercase mb-8">
            Let's <br/>Connect.
          </h2>
          <p className="contact-reveal text-xl text-gray-400 font-light mb-16 max-w-md leading-relaxed">
            I am currently open to full-time SDE roles and impactful internships. Reach out to discuss opportunities.
          </p>

          <div className="contact-reveal flex flex-col gap-6">
            <a href="mailto:akashchouhan939@gmail.com" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors w-fit">
              <Mail size={20} /> <span className="font-mono text-sm tracking-wider">akashchouhan939@gmail.com</span>
            </a>
            <a href="https://github.com/akashchouhan335" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors w-fit">
              <GithubIcon size={20} /> <span className="font-mono text-sm tracking-wider">github.com/akashchouhan335</span>
            </a>
            <a href="https://www.linkedin.com/in/akashchouhan335/" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors w-fit">
              <LinkedinIcon size={20} /> <span className="font-mono text-sm tracking-wider">linkedin.com/in/akashchouhan335</span>
            </a>
          </div>
        </div>

        {/* Right: Minimal Form */}
        <div className="contact-reveal">
          {status === 'success' ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 border border-[#1a1a1a]">
              <h3 className="text-3xl font-[var(--font-display)] font-bold mb-4">Received.</h3>
              <p className="text-gray-400 font-light">I will get back to you shortly.</p>
              <button onClick={() => setStatus('idle')} className="mt-8 text-xs font-mono tracking-widest uppercase border-b border-white pb-1 hover:text-gray-400 transition-colors">
                Send another
              </button>
            </div>
          ) : (
            <form 
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit} 
              className="flex flex-col gap-8"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p hidden>
                <label>
                  Don't fill this out: <input name="bot-field" onChange={() => {}} />
                </label>
              </p>
              <input 
                type="text" 
                name="name"
                placeholder="Name" 
                required
                className={inputClasses}
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
              />
              <input 
                type="email" 
                name="email"
                placeholder="Email Address" 
                required
                className={inputClasses}
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
              />
              <textarea 
                name="message"
                placeholder="Your Message..." 
                required
                rows={4}
                className={`${inputClasses} resize-none`}
                value={form.message}
                onChange={e => setForm({...form, message: e.target.value})}
              />
              
              {status === 'error' && (
                <p className="text-red-400 text-sm font-mono">Failed to send. Please email me directly.</p>
              )}

              <GradientButton 
                type="submit" 
                disabled={status === 'loading'}
                className="mt-6 self-start gap-2 font-mono uppercase tracking-widest text-sm"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
                <Send size={16} />
              </GradientButton>
            </form>
          )}
        </div>
      </div>
      
      <div className="mt-32 text-center contact-reveal">
        <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
          © {new Date().getFullYear()} Akash Chouhan. 
        </p>
      </div>
    </section>
  )
}
