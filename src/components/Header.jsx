import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

const languageOptions = [
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
]

function LanguageSwitcher({ className = '' }) {
  const { language, setLanguage, copy } = useLanguage()

  return (
    <div className={`language-switcher ${className}`.trim()} aria-label={copy.header.languageLabel} role="group">
      {languageOptions.map((option) => (
        <button
          key={option.code}
          type="button"
          onClick={() => setLanguage(option.code)}
          className={language === option.code ? 'is-active' : ''}
          aria-pressed={language === option.code}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(
    () => typeof window !== 'undefined' && window.scrollY > 24
  )
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { copy } = useLanguage()

  const handleDesktopNavClick = (href) => (event) => {
    if (window.innerWidth < 1024) return

    event.preventDefault()
    const target = href === '#' ? null : document.querySelector(href)
    const targetTop = target
      ? target.getBoundingClientRect().top + window.scrollY - 76
      : 0

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }

  useEffect(() => {
    let frame = null
    let previousState = window.scrollY > 24

    const handleScroll = () => {
      if (frame !== null) return

      frame = window.requestAnimationFrame(() => {
        const nextState = window.scrollY > 24
        if (nextState !== previousState) {
          previousState = nextState
          setIsScrolled(nextState)
        }
        frame = null
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frame !== null) window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
    } else {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }

    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className={`site-header ${isScrolled ? 'is-scrolled' : ''} ${isMobileMenuOpen ? 'is-menu-open' : ''}`}>
        <div className="content-container header-inner">
          <a href="#" className="brand-link" onClick={handleDesktopNavClick('#')} aria-label="VOID VISUAL">
            <img src="/лого.png" alt="VOID VISUAL" width="280" height="56" />
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {copy.header.nav.map((item) => (
              <a key={item.href} href={item.href} onClick={handleDesktopNavClick(item.href)}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <LanguageSwitcher />
            <a className="button button-compact header-cta" href="#contact" onClick={handleDesktopNavClick('#contact')}>
              {copy.header.discuss}
            </a>
          </div>

          <div className="mobile-actions">
            <LanguageSwitcher />
            <button
              type="button"
              className="menu-toggle"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label={isMobileMenuOpen ? copy.header.closeMenu : copy.header.openMenu}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-navigation" className={`mobile-menu ${isMobileMenuOpen ? 'is-open' : ''}`} aria-hidden={!isMobileMenuOpen}>
        <div className="mobile-menu-top content-container">
          <a href="#" className="brand-link" onClick={() => setIsMobileMenuOpen(false)} aria-label="VOID VISUAL">
            <img src="/лого.png" alt="VOID VISUAL" width="280" height="56" />
          </a>
          <button type="button" className="menu-toggle is-active" onClick={() => setIsMobileMenuOpen(false)} aria-label={copy.header.closeMenu}>
            <span />
            <span />
          </button>
        </div>

        <nav className="mobile-nav" aria-label="Mobile navigation">
          {copy.header.nav.map((item, index) => (
            <a key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item.label}
            </a>
          ))}
          <a className="button mobile-menu-cta" href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
            {copy.header.discuss}
          </a>
        </nav>
      </div>
    </>
  )
}
