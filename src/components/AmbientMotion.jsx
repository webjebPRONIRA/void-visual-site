import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AmbientMotion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const shell = document.querySelector('.site-shell')
    if (!shell) return undefined

    const context = gsap.context(() => {
      gsap.utils.toArray('.background-wordmark').forEach((wordmark, index) => {
        const trigger = wordmark.closest('.hero-section, .stats-section, .portfolio-section, .process-section, .site-footer')
        const isHero = wordmark.classList.contains('hero-background-wordmark')
        const distance = isHero ? 34 : 46
        const direction = index % 2 === 0 ? 1 : -1

        gsap.fromTo(
          wordmark,
          { y: -distance * 0.45, x: -direction * 4 },
          {
            y: distance * 0.55,
            x: direction * 6,
            ease: 'none',
            scrollTrigger: {
              trigger,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.6,
            },
          }
        )
      })

      gsap.fromTo(
        '.hero-ambient-glow',
        { x: -18, y: -24 },
        {
          x: 20,
          y: 32,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 2,
          },
        }
      )

      gsap.utils.toArray('.portfolio-section, .process-section, .site-footer').forEach((section, index) => {
        const direction = index % 2 === 0 ? 1 : -1

        gsap.fromTo(
          section,
          {
            '--glow-shift-x': `${-direction * 12}px`,
            '--glow-shift-y': '-28px',
          },
          {
            '--glow-shift-x': `${direction * 18}px`,
            '--glow-shift-y': '34px',
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2.2,
            },
          }
        )
      })
    }, shell)

    ScrollTrigger.refresh()
    return () => context.revert()
  }, [])

  return null
}
