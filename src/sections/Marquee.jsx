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
  return (
    <div className="marquee" aria-hidden="true">
      <MarqueeTrack reverse={reverse} />
      <MarqueeTrack reverse={reverse} />
    </div>
  )
}
