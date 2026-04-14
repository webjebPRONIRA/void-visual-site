import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useRevealOnScroll(options = {}) {
  const ref = useRef(null)
  const {
    y = 60,
    opacity = 0,
    duration = 0.8,
    stagger = 0.1,
    delay = 0,
    start = 'top 85%',
    markers = false,
  } = options

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const children = element.children

    gsap.fromTo(
      children,
      { y, opacity },
      {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start,
          markers,
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === element) st.kill()
      })
    }
  }, [y, opacity, duration, stagger, delay, start, markers])

  return ref
}

export function useTextReveal(text, options = {}) {
  const ref = useRef(null)
  const { duration = 0.8, stagger = 0.03, delay = 0, start = 'top 85%' } = options

  useEffect(() => {
    const element = ref.current
    if (!element || !text) return

    const chars = text.split('')
    element.innerHTML = chars
      .map((char) => `<span class="inline-block overflow-hidden"><span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span></span>`)
      .join('')

    const spans = element.querySelectorAll('span > span')

    gsap.fromTo(
      spans,
      { y: '100%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration,
        stagger,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start,
        },
      }
    )
  }, [text, duration, stagger, delay, start])

  return ref
}

export function useCardAnimation() {
  const ref = useRef(null)

  useEffect(() => {
    const cards = ref.current?.querySelectorAll('.portfolio-card')
    if (!cards) return

    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          rotateY: 0,
          duration: 0.4,
          ease: 'power2.out',
        })
      })

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
        })
      })
    })
  }, [])

  return ref
}
