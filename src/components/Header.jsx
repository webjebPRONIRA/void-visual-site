import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useLenis } from '../context/LenisContext'

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
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { copy } = useLanguage()
  const lenis = useLenis()

  const handleDesktopNavClick = (href) => (event) => {
    if (window.innerWidth < 1024 || !lenis) return

    event.preventDefault()
    lenis.scrollTo(href === '#' ? 0 : href, { duration: 1.05 })
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      lenis?.stop()
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }

    return () => {
      lenis?.start()
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen, lenis])

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
