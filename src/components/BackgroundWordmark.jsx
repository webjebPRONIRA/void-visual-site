const viewBoxWidths = {
  VOID: 880,
  VISUAL: 1180,
  STUDIO: 1220,
  METHOD: 1400,
  CONTACT: 1540,
}

export default function BackgroundWordmark({ word, className = '' }) {
  const viewBoxWidth = viewBoxWidths[word] ?? 1200
  const hasCustomV = word.startsWith('V')

  return (
    <svg
      className={`background-wordmark ${className}`.trim()}
      viewBox={`0 0 ${viewBoxWidth} 320`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      {hasCustomV && (
        <path d="M24 45H78L134 211L190 45H244L162 265H106Z" />
      )}
      <text x={hasCustomV ? 258 : 24} y="265">
        {hasCustomV ? word.slice(1) : word}
      </text>
    </svg>
  )
}
