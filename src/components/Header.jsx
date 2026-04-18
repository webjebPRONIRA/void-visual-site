import { useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from '../context/LenisContext'

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
  const lenis = useLenis()

  const handleDesktopNavClick = (href) => (event) => {
    if (window.innerWidth < 1024 || !lenis) return

    event.preventDefault()

    if (href === '#') {
      lenis.scrollTo(0, { duration: 1.2 })
      return
    }

    lenis.scrollTo(href, { duration: 1.2 })
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isScrolled || isMobileMenuOpen) {
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
  }, [isScrolled, isMobileMenuOpen])

  useEffect(() => {
    if (isMobileMenuOpen) {
      lenis?.stop()
      document.documentElement.style.overflow = 'hidden'
      document.documentElement.style.touchAction = 'none'
      document.body.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.documentElement.style.overflow = ''
      document.documentElement.style.touchAction = ''
      document.body.style.overflow = ''
    }

    return () => {
      lenis?.start()
      document.documentElement.style.overflow = ''
      document.documentElement.style.touchAction = ''
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen, lenis])

  return (
    <header className="header fixed top-0 left-0 right-0 z-50 border-b border-transparent transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="#" className="flex items-center">
            <img
              src="/лого.png"
              alt="VOID VISUAL"
              className="h-7 sm:h-11 w-auto"
            />
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={handleDesktopNavClick(item.href)}
                className="text-sm font-light text-white/70 hover:text-white hover:scale-105 transition-all duration-300 tracking-wide relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            onClick={handleDesktopNavClick('#contact')}
            className="hidden lg:flex items-center px-6 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-medium rounded-full hover:from-violet-500 hover:to-purple-500 hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] active:scale-95 transition-all duration-300"
          >
            ОБСУДИТЬ ПРОЕКТ
          </a>

          <button
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="mobile-tap-target lg:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm"
            aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden fixed inset-0 z-[60] transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="absolute inset-0 bg-black/82" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(20,12,44,0.96),rgba(4,4,8,0.99))] backdrop-blur-2xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
            <img
              src="/лого.png"
              alt="VOID VISUAL"
              className="h-7 w-auto"
            />
          </a>

          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="mobile-tap-target w-12 h-12 flex flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-sm"
            aria-label="Закрыть меню"
          >
            <span className="w-6 h-0.5 bg-white rotate-45 translate-y-2" />
            <span className="w-6 h-0.5 bg-white opacity-0" />
            <span className="w-6 h-0.5 bg-white -rotate-45 -translate-y-2" />
          </button>
        </div>

        <nav className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100dvh-4rem)] gap-5 px-4 pb-8">
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-[24rem] rounded-[2rem] bg-black/60 blur-2xl pointer-events-none" />

          {navItems.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-tap-target relative z-10 flex items-center justify-center w-full max-w-xs rounded-2xl bg-black/38 px-6 text-2xl sm:text-3xl font-bold text-white shadow-[0_0_30px_rgba(0,0,0,0.4)] transition-colors"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {item.label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mobile-tap-target relative z-10 mt-2 w-full max-w-xs px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-lg font-semibold rounded-full text-center shadow-[0_0_40px_rgba(0,0,0,0.45)]"
          >
            ОБСУДИТЬ ПРОЕКТ
          </a>
        </nav>
      </div>
    </header>
  )
}
