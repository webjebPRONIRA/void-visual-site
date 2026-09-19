import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import BackgroundWordmark from '../components/BackgroundWordmark'

function Counter({ value, suffix, isVisible }) {
  const counterRef = useRef(null)

  useEffect(() => {
    if (!isVisible || !counterRef.current) return undefined

    const counter = counterRef.current
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      counter.textContent = `${value}${suffix}`
      return undefined
    }

    const duration = 1600
    let startTime
    let frame
    let lastCount = -1

    const animate = (timestamp) => {
      startTime ??= timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(eased * value)

      if (current !== lastCount) {
        counter.textContent = `${current}${suffix}`
        lastCount = current
      }

      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      }
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [isVisible, suffix, value])

  return <span ref={counterRef}>0{suffix}</span>
}

export default function StatsSection() {
  const sectionRef = useRef()
  const [isVisible, setIsVisible] = useState(false)
  const { copy } = useLanguage()

  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="stats-section" aria-label="Statistics">
      <BackgroundWordmark word="STUDIO" className="section-wordmark section-wordmark-secondary" />
      <div className="content-container stats-grid">
        {copy.stats.map((stat, index) => (
          <div key={`${stat.label}-${index}`} className="stat-item">
            <div className="stat-value">
              <Counter value={stat.value} suffix={stat.suffix} isVisible={isVisible} />
            </div>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
