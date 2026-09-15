import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import BackgroundWordmark from '../components/BackgroundWordmark'

function Counter({ value, suffix, isVisible }) {
  const [count, setCount] = useState(0)
  const [prefersReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    if (!isVisible || prefersReducedMotion) return undefined

    const duration = 1600
    const startTime = Date.now()
    let frame

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(eased * value)
      setCount(current)

      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      }
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [isVisible, prefersReducedMotion, value])

  return <span>{isVisible && prefersReducedMotion ? value : count}{suffix}</span>
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
