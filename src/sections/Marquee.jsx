const BASE = [
  { label: 'OZON',         color: '#005BFF' },
  { label: 'WILDBERRIES',  color: '#CB11AB' },
  { label: 'YOUTUBE',      color: '#FF0000' },
  { label: 'TWITCH',       color: '#9146FF' },
  { label: 'VK',           color: '#0077FF' },
  { label: 'TELEGRAM',     color: '#29B6F6' },
]

function MarqueeTrack({ reverse }) {
  const repeated = [...BASE, ...BASE, ...BASE, ...BASE]

  return (
    <div
      className="flex shrink-0 whitespace-nowrap"
      style={{
        animation: `${reverse ? 'marqueeRev' : 'marqueeFwd'} 30s linear infinite`,
        willChange: 'transform',
      }}
    >
      {repeated.map((item, i) => (
        <span key={i} className="inline-flex items-center">
          <span
            className="text-sm font-semibold tracking-[0.2em] uppercase px-1 cursor-default transition-opacity duration-200 hover:opacity-100 opacity-60"
            style={{ color: item.color }}
          >
            {item.label}
          </span>
          <span className="text-white/20 mx-3 text-sm select-none">·</span>
        </span>
      ))}
    </div>
  )
}

export default function Marquee({ reverse = false }) {
  return (
    <div className="relative w-full overflow-hidden py-5 border-y border-white/5 bg-white/[0.02]">
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #080810, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #080810, transparent)' }} />

      <div className="flex">
        <MarqueeTrack reverse={reverse} />
        <MarqueeTrack reverse={reverse} />
      </div>
    </div>
  )
}
