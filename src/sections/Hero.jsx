import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useLanguage } from '../context/LanguageContext'
import BackgroundWordmark from '../components/BackgroundWordmark'

export default function Hero() {
  const titleRef = useRef()
  const textBlockRef = useRef()
  const ctaRef = useRef()
  const { copy, language } = useLanguage()
  const visualLine = copy.hero.lines[3]

  const renderVisualLine = () => {
    if (language !== 'ru') return visualLine

    return Array.from(visualLine).map((letter, index) => (
      <span
        key={`${letter}-${index}`}
        className={`hero-visual-letter ${
          index === 2 ? 'hero-visual-letter-z' : index === 4 ? 'hero-visual-letter-a' : index === 5 ? 'hero-visual-letter-l' : ''
        }`.trim()}
      >
        {letter}
      </span>
    ))
  }

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      gsap.set([titleRef.current?.querySelectorAll('.title-line'), textBlockRef.current, ctaRef.current?.children], { opacity: 1, y: 0 })
      return undefined
    }

    const tl = gsap.timeline({ delay: 0.3 })

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current.querySelectorAll('.title-line'),
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.1, ease: 'power3.out' }
      )
    }

    if (textBlockRef.current) {
      tl.fromTo(
        textBlockRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
        '-=0.6'
      )
    }

    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current.children,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
        '-=0.4'
      )
    }
    return () => tl.kill()
  }, [copy.hero.lines])

  return (
    <section className="hero-section">
      <div className="hero-canvas" aria-hidden="true">
        <span className="hero-ambient-glow" />
        <BackgroundWordmark word="VOID" className="hero-background-wordmark hero-background-wordmark-void" />
        <BackgroundWordmark word="VISUAL" className="hero-background-wordmark hero-background-wordmark-visual" />
      </div>
      <div className="content-container hero-inner">
        <div className="hero-layout">
          <div className="hero-title-wrap">
              <h1
                ref={titleRef}
                className={`hero-title ${language === 'en' ? 'hero-title-en tracking-normal' : 'tracking-tighter'} font-bold uppercase flex flex-col`}
              >
                <span
                  className={`title-line hero-line-dominate ${language === 'en' ? 'hero-line-dominate-en' : ''} block text-left`}
                >
                  {copy.hero.lines[0]}
                </span>
                <span
                  className={`title-line ${language === 'en' ? 'hero-line-market-en' : ''} block text-left`}
                >
                  {copy.hero.lines[1]}
                </span>
                <span
                  className={`title-line hero-line-through ${language === 'en' ? 'hero-line-through-en' : ''} block text-right`}
                >
                  {copy.hero.lines[2]}
                </span>
                <span
                  className={`title-line hero-line-visual ${language === 'en' ? 'hero-line-visual-en' : ''} block text-left`}
                >
                  {renderVisualLine()}
                </span>
              </h1>
          </div>

          <div ref={textBlockRef} className="hero-copy">
              <p className="hero-copy-text">
                {copy.hero.copy}
              </p>

              <div ref={ctaRef} className="hero-actions">
                <a
                  href="#contact"
                  className="button hero-cta"
                >
                  {copy.hero.primaryCta}
                </a>

                <a
                  href="#channels"
                  className="button button-secondary hero-cta"
                >
                  {copy.hero.secondaryCta}
                </a>
              </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator" aria-hidden="true"><span /></div>
    </section>
  )
}
