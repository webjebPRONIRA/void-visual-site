import { useEffect, useRef } from 'react'

const platforms = ['OZON', 'WILDBERRIES', 'YOUTUBE', 'TWITCH', 'VK', 'TELEGRAM']

function MarqueeTrack({ reverse }) {
  const repeated = [...platforms, ...platforms, ...platforms]

  return (
    <div className={`marquee-track ${reverse ? 'is-reverse' : ''}`}>
      {repeated.map((label, index) => (
        <span key={`${label}-${index}`}>
          {label}
          <i>·</i>
        </span>
      ))}
    </div>
  )
}

export default function Marquee({ reverse = false }) {
  const marqueeRef = useRef(null)

  useEffect(() => {
    const marquee = marqueeRef.current
    if (!marquee) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      marquee.classList.toggle('is-visible', entry.isIntersecting)
    })

    observer.observe(marquee)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={marqueeRef} className="marquee" aria-hidden="true">
      <MarqueeTrack reverse={reverse} />
      <MarqueeTrack reverse={reverse} />
    </div>
  )
}
