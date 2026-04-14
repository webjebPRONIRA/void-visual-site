import { useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const navItems = [
  { label: 'Оформление', href: '#channels' },
  { label: 'Превью', href: '#previews' },
  { label: 'Инфографика', href: '#creatives' },
  { label: 'Прочее', href: '#other' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isScrolled) {
      gsap.to('.header', {
        backgroundColor: 'rgba(8, 8, 16, 0.95)',
        backdropFilter: 'blur(20px)',
        borderColor: 'rgba(139, 92, 246, 0.2)',
        duration: 0.3,
      })
    } else {
      gsap.to('.header', {
        backgroundColor: 'transparent',
        backdropFilter: 'none',
        borderColor: 'transparent',
        duration: 0.3,
      })
    }
  }, [isScrolled])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  return (
    <header className="header fixed top-0 left-0 right-0 z-50 border-b border-transparent transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="#" className="flex items-center">
            <img 
              src="/лого.png" 
              alt="VOID VISUAL" 
              className="h-8 sm:h-11 w-auto"
            />
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-light text-white/70 hover:text-white hover:scale-105 transition-all duration-300 tracking-wide relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="hidden lg:flex items-center px-6 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-medium rounded-full hover:from-violet-500 hover:to-purple-500 hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] active:scale-95 transition-all duration-300"
          >
            ОБСУДИТЬ ПРОЕКТ
          </a>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          >
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      <div className={`lg:hidden fixed inset-0 top-16 bg-[#080810]/98 backdrop-blur-2xl transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <nav className="flex flex-col items-center justify-center h-full gap-8 px-4">
          {navItems.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl sm:text-3xl font-bold text-white/80 hover:text-white transition-colors"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-lg font-semibold rounded-full"
          >
            ОБСУДИТЬ ПРОЕКТ
          </a>
        </nav>
      </div>
    </header>
  )
}