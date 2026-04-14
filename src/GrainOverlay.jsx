export default function GrainOverlay() {
  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          opacity: 0.04,
          filter: 'url(#grain-filter)',
          width: '100%',
          height: '100%',
        }}
      />
    </>
  )
}
