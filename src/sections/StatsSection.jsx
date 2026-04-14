import { useRef, useEffect, useState } from 'react'

const stats = [
  { value: 150, suffix: '+', label: 'проектов' },
  { value: 50, suffix: '+', label: 'клиентов' },
  { value: 98, suffix: '%', label: 'довольных' },
  { value: 3, suffix: '', label: 'года опыта' },
]

function Counter({ value, suffix, isVisible }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const duration = 3000
    const startTime = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(eased * value)
      setCount(current)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [isVisible, value])

  return <span>{count}{suffix}</span>
}

export default function StatsSection() {
  const sectionRef = useRef()
  const [isVisible, setIsVisible] = useState(false)

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
    <section ref={sectionRef} className="py-20 lg:py-28 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div 
                className="text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-2"
                style={{
                  background: 'linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0.7) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 40px rgba(255,255,255,0.3)',
                }}
              >
                <Counter value={stat.value} suffix={stat.suffix} isVisible={isVisible} />
              </div>
              <p className="text-sm lg:text-base text-white/50 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
